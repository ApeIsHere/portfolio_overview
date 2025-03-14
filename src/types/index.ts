export interface Asset {
  id: string;
  name: string;
  amount?: number;
  price: number;
  change24h?: number;
  high24h?: number;
  low24h?: number;
  icon?: string;
}
