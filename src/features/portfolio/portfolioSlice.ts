import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "../../types";

interface PortfolioState {
  myAssets: Asset[];
  marketAssets: Asset[];
}

const initialState: PortfolioState = {
  myAssets: [],
  marketAssets: [],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.myAssets.push(action.payload);
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      const assetId = action.payload;
      state.myAssets = state.myAssets.filter((asset) => asset.id !== assetId);
    },
    updateMarketAsset: (state, action: PayloadAction<Asset>) => {
      // check if the coin already exists
      const index = state.marketAssets.findIndex(
        (asset) => asset.id === action.payload.id
      );
      if (index === -1) {
        state.marketAssets.push(action.payload); // push if new coin
      } else {
        state.marketAssets[index] = action.payload; // update if coin exists
      }
      // update the prices in portfolio
      state.myAssets = state.myAssets.map((asset) =>
        asset.id === action.payload.id
          ? { ...asset, price: action.payload.price, change24h: action.payload.change24h }
          : asset
      );
    },
  },
});

export const { addAsset, removeAsset, updateMarketAsset } = portfolioSlice.actions;
export default portfolioSlice.reducer;
