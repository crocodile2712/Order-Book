import { useEffect, useRef } from "react";
import useOrderBookStore from "../stores/orderbook";

export const useWebSocket = (productId: string) => {
  const wsRef = useRef<WebSocket | null>(null);
  const prevProductRef = useRef<string>(productId);
  const { setOrderBook, updateOrderBook, setLoading, bids, asks, isLoading } =
    useOrderBookStore();

  useEffect(() => {
    if (!productId) return;

    const subscribe = (prod: string) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({ op: "sub", channel: "book", product: prod })
        );
        setLoading(true);
      }
    };

    const unsubscribe = (prod: string) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({ op: "unsub", channel: "book", product: prod })
        );
      } else {
        console.warn("WebSocket is not open. Unable to unsubscribe.");
      }
    };

    if (!wsRef.current) {
      const ws = new WebSocket("wss://ws.bsx.exchange/ws");
      wsRef.current = ws;

      ws.onopen = () => subscribe(productId);

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);

        switch (message.type) {
          case "snapshot":
            setOrderBook(message.data.bids, message.data.asks);
            break;
          case "update":
            updateOrderBook(message.data.bids, message.data.asks);
            break;
          case "error":
            console.error("WebSocket Error:", message.message);
            setLoading(false);
            break;
          default:
            console.log("Unhandled message type:", message.type);
        }
      };
    } else if (prevProductRef.current !== productId) {
      unsubscribe(prevProductRef.current);
      subscribe(productId);
    }

    prevProductRef.current = productId;

    return () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        unsubscribe(productId);
      }
    };
  }, [productId]);

  return { socket: wsRef.current, bids, asks, isLoading };
};
