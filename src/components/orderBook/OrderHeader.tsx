import { Product } from "@/src/libs/constant/orderbook";
import React from "react";

const OrderHeader = ({ product }: { product: Product | null }) => {
  return (
    <thead>
      <tr className="text-sm text-gray-400">
        <th className="text-left w-1/3">
          <span> Price</span>
          <span className="ml-1 rounded-md bg-zinc-700 py-0.5 px-1.5">
            {product?.quote_asset_symbol}
          </span>
        </th>
        <th className="text-right w-1/3">
          <span>Amount</span>
          <span className="ml-1 rounded-md bg-zinc-700 py-0.5 px-1.5">
            {product?.base_asset_symbol}
          </span>
        </th>
        <th className="text-right w-1/3">
          <span>Total</span>
          <span className="ml-1 rounded-md bg-zinc-700 py-0.5 px-1.5">
            {product?.quote_asset_symbol}
          </span>
        </th>
      </tr>
    </thead>
  );
};

export default OrderHeader;
