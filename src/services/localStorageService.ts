import { STORAGE_KEY } from "../constants/appConstants";
import { Asset } from "../types";

interface localStorageAsset {
  id: string;
  name: string;
  amount?: string;
  price: string;
  change24h?: string;
  high24h?: string;
  low24h?: string;
  icon?: string;
}

interface PortfolioState {
  myAssets: Asset[];
  marketAssets: Asset[];
}

class localStorageService {
  private readonly STORAGE_KEY = STORAGE_KEY;

  // method to load from localStorage
  loadState(): PortfolioState {
    const loadedState = localStorage.getItem(this.STORAGE_KEY);
    if (loadedState) {
      const parsedState = JSON.parse(loadedState);

      // transform all the strings to numbers
      const transformAsset = (asset: localStorageAsset): Asset => ({
        ...asset,
        price: parseFloat(asset.price),
        change24h: asset.change24h ? parseFloat(asset.change24h) : undefined,
        high24h: asset.high24h ? parseFloat(asset.high24h) : undefined,
        low24h: asset.low24h ? parseFloat(asset.low24h) : undefined,
        amount: asset.amount ? parseFloat(asset.amount) : undefined,
      });

      return {
        myAssets: parsedState.myAssets.map(transformAsset),
        marketAssets: parsedState.marketAssets.map(transformAsset),
      };
    }
    return { myAssets: [], marketAssets: [] };
  }

  // Saving to localStorage
  saveState(state: PortfolioState) {
    const stateToSave = {
      myAssets: state.myAssets.map(
        ({ id, name, amount, price, change24h, high24h, low24h, icon }) => ({
          id,
          name,
          amount,
          price,
          change24h,
          high24h,
          low24h,
          icon,
        })
      ),
      marketAssets: state.marketAssets.map(
        ({ id, name, price, change24h, high24h, low24h, icon }) => ({
          id,
          name,
          price,
          change24h,
          high24h,
          low24h,
          icon,
        })
      ),
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stateToSave));
  }

  clearState() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export default new localStorageService();
