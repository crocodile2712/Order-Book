"use client";

import OrderBookTableDefault from "@/src/components/orderBook/OrderBookTableDefault";
import OrderBookTableForType from "@/src/components/orderBook/OrderBookTableForType";
import SearchProduct from "@/src/components/orderBook/SearchProduct";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/Tab";
import { useWebSocket } from "@/src/libs/hooks/useWebSocket";
import useProductStore, { ProductState } from "@/src/libs/stores/products";
import { fetchProducts } from "@/src/services/apiCall";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { setProducts, selectedProduct, setSelectedProduct } = useProductStore(
    (state) => state
  );

  const { bids, asks, isLoading } = useWebSocket(
    selectedProduct?.product_id ?? ""
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.products);
        const storeProducts = JSON.parse(
          localStorage.getItem("product-storage") ?? "[]"
        ) as {
          state: ProductState;
        };
        if (data.products.length > 0 && !storeProducts.state.selectedProduct) {
          setSelectedProduct(data.products[0]);
        } else if (storeProducts.state.selectedProduct) {
          const productStillExists =
            storeProducts.state.selectedProduct &&
            data.products.some(
              (p) =>
                p.product_id ===
                storeProducts?.state.selectedProduct?.product_id
            );
          if (!productStillExists) {
            setSelectedProduct(data.products[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
  }, [setProducts, setSelectedProduct, selectedProduct]);

  return (
    <div className="min-h-screen p-4 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex justify-center items-center">
      <div className="max-w-[1200px] w-full bg-zinc-900 rounded-lg shadow-lg overflow-hidden text-white">
        <div className="md:p-4 p-2">
          <SearchProduct />
          <h2 className="text-lg font-semibold mb-2">Order Book</h2>
          <Tabs defaultValue="default">
            <TabsList className="bg-zinc-600 w-fit px-0">
              <TabsTrigger value="default" className="p-2">
                <Image
                  src="/img/order-book-default.svg"
                  alt="default"
                  width={20}
                  height={20}
                />
              </TabsTrigger>
              <TabsTrigger value="ask" className="p-2">
                <Image
                  src="/img/order-book-ask.svg"
                  alt="ask"
                  width={20}
                  height={20}
                />
              </TabsTrigger>
              <TabsTrigger value="bid" className="p-2">
                <Image
                  src="/img/order-book-bid.svg"
                  alt="bid"
                  width={20}
                  height={20}
                />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="default">
              <OrderBookTableDefault
                asks={asks.slice(0, 5).reverse()}
                bids={bids.slice(0, 5)}
                product={selectedProduct}
                loading={isLoading}
              />
            </TabsContent>
            <TabsContent value="ask">
              <OrderBookTableForType
                data={asks}
                product={selectedProduct}
                type="ask"
              />
            </TabsContent>
            <TabsContent value="bid">
              <OrderBookTableForType
                data={bids}
                product={selectedProduct}
                type="bid"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
