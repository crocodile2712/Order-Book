import { cn } from "@/src/libs/ultis/cn";
import React from "react";
import OrderHeader from "./OrderHeader";
import { OrderRow } from "./OrderRow";
import { Product } from "@/src/libs/constant/orderbook";
import { Skeleton } from "../ui/Skeleton";

const OrderBookTableForType = ({
  data,
  className,
  product,
  type,
  loading,
}: {
  data: [string, string][];
  className?: string;
  product: Product | null;
  type: "bid" | "ask";
  loading?: boolean;
}) => {
  return (
    <div className={cn("w-full table-fixed-header max-h-[340px] ", className)}>
      <table className="w-full table-fixed">
        <OrderHeader product={product} />
        <tbody className="">
          {loading ? (
            <tr>
              <td colSpan={3}>
                <Skeleton className="h-[306px] w-full bg-slate-400" />
              </td>
            </tr>
          ) : (
            data.map((ask) => (
              <OrderRow
                key={ask[0]}
                price={ask[0]}
                amount={ask[1]}
                total={(parseFloat(ask[0]) * parseFloat(ask[1])).toFixed(4)}
                type={type}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBookTableForType;
