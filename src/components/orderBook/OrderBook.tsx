"use client";
import React, { useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/Tab";
import Image from "next/image";
import SearchProduct from "./SearchProduct";
import OrderBookTableDefault from "./OrderBookTableDefault";
import OrderBookTableForType from "./OrderBookTableForType";
import { Product } from "@/src/libs/constant/orderbook";
import useProductStore from "@/src/libs/stores/products";
import { useWebSocket } from "@/src/libs/hooks/useWebSocket";

const OrderBook = ({ initialProduct }: { initialProduct: Product[] }) => {
  const { setProducts, selectedProduct, setSelectedProduct, products } =
    useProductStore((state) => state);

  const { bids, asks, isLoading } = useWebSocket(
    selectedProduct?.product_id ?? ""
  );

  useEffect(() => {
    setProducts(initialProduct);
  }, [initialProduct]);

  useEffect(() => {
    if (!selectedProduct?.product_id && products.length > 0) {
      setSelectedProduct(products[0]);
    }
  }, [products, selectedProduct]);

  return (
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
  );
};

export default OrderBook;
