import { updateMarketAsset } from "../features/portfolio/portfolioSlice";
import { AppDispatch } from "../store";
import { Asset } from "../types";

/*
https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/All-Market-Tickers-Streams
*/
interface TickerData {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  p: string; // Price change
  P: string; // Price change percent
  w: string; // Weighted average price
  c: string; // Last price
  Q: string; // Last quantity
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  v: string; // Total traded base asset volume
  q: string; // Total traded quote asset volume
  O: number; // Statistics open time
  C: number; // Statistics close time
  F: number; // First trade ID
  L: number; // Last trade ID
  n: number; // Total number of trades
}

/*
https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams
*/
interface WebSocketMessage {
  stream: string;
  data: TickerData;
}

const symbols = ["btcusdt", "ethusdt", "bnbusdt", "etcusdt"];

class WebSocketService {
  private socket: WebSocket | null = null;
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  connect() {
    const streams = symbols.map((symbol) => `${symbol}@ticker`).join("/");
    const wsUrl = `wss://fstream.binance.com/stream?streams=${streams}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log("WebSocket connected to Binance");
    };

    // Check if we received the correct data and update state with dispatch
    this.socket.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(event.data);
      if (message.stream.endsWith("@ticker") && message.data.e === "24hrTicker") {
        const data = message.data;
        const asset: Asset = {
          id: data.s.toLowerCase(),
          name: data.s.replace("USDT", ""),
          price: parseFloat(data.c),
          change24h: parseFloat(data.P),
          high24h: parseFloat(data.h),
          low24h: parseFloat(data.l),
          icon: this.getIcon(data.s),
        };
        this.dispatch(updateMarketAsset(asset));
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    this.socket.onerror = (error) => {
      console.log("Websocket error", error);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  // Temporary icon set
  private getIcon(symbol: string): string {
    const icons: { [key: string]: string } = {
      BTCUSDT: "🟡",
      ETHUSDT: "🔷",
      BNBUSDT: "🟧",
      ETCUSDT: "🟩",
    };
    return icons[symbol] || "⭐";
  }
}

export default WebSocketService;
