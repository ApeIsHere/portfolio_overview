export interface Asset {
  id: string;
  name: string;
  amount?: number;
  price: number;
  icon?: string;
}

export const fakeAssets: Asset[] = [
  { id: "1", name: "Bitcoin", price: 63210.0, icon: "🔶" },
  { id: "2", name: "Ethereum", price: 1903.62, icon: "🔷" },
  { id: "3", name: "Tether", price: 0.999735, icon: "🔸" },
  { id: "4", name: "BNB", price: 580.45, icon: "🔹" },
  { id: "5", name: "XRP", price: 2.3, icon: "🔺" },
];
