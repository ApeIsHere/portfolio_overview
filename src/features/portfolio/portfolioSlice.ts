import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "../../types";

interface PortfolioState {
  assets: Asset[];
}

const initialState: PortfolioState = {
  assets: [
    {
      id: "1",
      name: "TestCoin",
      amount: 10,
      price: 982,
    },
  ],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.assets.push(action.payload);
    },
  },
});

export const { addAsset } = portfolioSlice.actions;
export default portfolioSlice.reducer;
