import { cn } from "@/src/libs/ultis/cn";
import { formatNumberWithNumeral } from "@/src/libs/ultis/formatNumber";
import { useEffect, useRef, useState } from "react";

export const OrderRow = ({
  price,
  amount,
  total,
  type,
}: {
  price: string;
  amount: string;
  total: string;
  type: "bid" | "ask";
}) => {
  const [key, setKey] = useState(0);
  const prevValues = useRef({ price, amount });

  useEffect(() => {
    if (
      price !== prevValues.current.price ||
      amount !== prevValues.current.amount
    ) {
      setKey((prev) => prev + 1);
      prevValues.current = { price, amount };
    }
  }, [price, amount]);

  return (
    <tr
      key={key}
      className={cn(
        "md:text-sm text-xs animate-glow hover:border-white hover:border-dashed",
        type === "bid"
          ? "text-green-400 hover:border-b"
          : "text-red-400 hover:border-t"
      )}
    >
      <td className="py-1 w-1/3">{formatNumberWithNumeral(price)}</td>
      <td className="py-1 text-right w-1/3">
        {formatNumberWithNumeral(amount)}
      </td>
      <td className="py-1 text-right w-1/3">
        {formatNumberWithNumeral(total)}
      </td>
    </tr>
  );
};
