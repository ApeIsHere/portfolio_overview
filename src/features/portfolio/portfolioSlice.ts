import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "../../types";

interface PortfolioState {
  assets: Asset[];
  marketAssets: Asset[];
}

const initialState: PortfolioState = {
  assets: [],
  marketAssets: [],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.assets.push(action.payload);
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
      state.assets = state.assets.map((asset) =>
        asset.id === action.payload.id
          ? { ...asset, price: action.payload.price, change24h: action.payload.change24h }
          : asset
      );
    },
  },
});

export const { addAsset, updateMarketAsset } = portfolioSlice.actions;
export default portfolioSlice.reducer;
