export enum OrderBookType {
  BID = "bid",
  ASK = "ask",
}

export interface Product {
  product_id: string;
  base_asset_symbol: string;
  quote_asset_symbol: string;
  underlying: string;
  base_increment: string;
  quote_increment: string;
  display_name: string;
}
