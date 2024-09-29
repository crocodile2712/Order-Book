"use server";

import OrderBook from "@/src/components/orderBook/OrderBook";
import { fetchProducts } from "@/src/services/apiCall";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen p-4 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex justify-center items-center">
      <div className="max-w-[1200px] w-full bg-zinc-900 rounded-lg shadow-lg overflow-hidden text-white">
        <OrderBook initialProduct={products?.products} />
      </div>
    </div>
  );
}
