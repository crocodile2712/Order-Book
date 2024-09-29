"use client";

import React from "react";
import OrderHeader from "./OrderHeader";
import { OrderRow } from "./OrderRow";
import { Product } from "@/src/libs/constant/orderbook";
import { Skeleton } from "../ui/Skeleton";

const OrderBookTableDefault = ({
  asks,
  bids,
  product,
  loading,
}: {
  asks: [string, string][];
  bids: [string, string][];
  product: Product | null;
  loading?: boolean;
}) => {
  return (
    <div className="max-h-[340px] overflow-y-auto">
      <table className="w-full table-fixed">
        <OrderHeader product={product} />

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3}>
                <Skeleton className="h-[306px] w-full bg-slate-400" />
              </td>
            </tr>
          ) : (
            <>
              {asks.map((ask) => (
                <OrderRow
                  key={ask[0]}
                  price={ask[0]}
                  amount={ask[1]}
                  total={(parseFloat(ask[0]) * parseFloat(ask[1])).toFixed(4)}
                  type="ask"
                />
              ))}
              <tr>
                <td colSpan={3}>&nbsp;</td>
              </tr>
              {bids.map((bid) => (
                <OrderRow
                  key={bid[0]}
                  price={bid[0]}
                  amount={bid[1]}
                  total={(parseFloat(bid[0]) * parseFloat(bid[1])).toFixed(4)}
                  type="bid"
                />
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBookTableDefault;
