import { create } from "zustand";

export type OrderBookState = {
  bids: Array<[string, string]>;
  asks: Array<[string, string]>;
  isLoading: boolean;
};

export type OrderBookActions = {
  setOrderBook: (
    bids: Array<[string, string]>,
    asks: Array<[string, string]>
  ) => void;
  updateOrderBook: (
    newBids: Array<[string, string]>,
    newAsks: Array<[string, string]>
  ) => void;
  setLoading: (isLoading: boolean) => void;
};

export type OrderBookStore = OrderBookState & OrderBookActions;

const defaultInitState: OrderBookState = {
  bids: [],
  asks: [],
  isLoading: true,
};

export const useOrderBookStore = create<OrderBookStore>((set) => ({
  ...defaultInitState,
  setOrderBook: (bids, asks) => set({ bids, asks, isLoading: false }),
  updateOrderBook: (newBids, newAsks) =>
    set((state) => {
      function updateOrders(
        currentOrders: Array<[string, string]>,
        newOrders: Array<[string, string]>,
        isAsk: boolean
      ) {
        const nextOrders = [...currentOrders];

        for (const [newPrice, newSize] of newOrders) {
          let low = 0;
          let high = nextOrders.length;

          while (low < high) {
            const mid = (low + high) >>> 1;
            const currentPrice = parseFloat(nextOrders[mid][0]);
            const newPriceFloat = parseFloat(newPrice);

            if (newPriceFloat === currentPrice) {
              if (newSize !== "0") {
                nextOrders[mid] = [newPrice, newSize];
              } else {
                nextOrders.splice(mid, 1);
              }
              break;
            }

            if (
              isAsk
                ? newPriceFloat > currentPrice
                : currentPrice > newPriceFloat
            ) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }

          if (low === high && newSize !== "0") {
            nextOrders.splice(low, 0, [newPrice, newSize]);
          }
        }

        return nextOrders;
      }

      return {
        bids: updateOrders(state.bids, newBids, false),
        asks: updateOrders(state.asks, newAsks, true),
      };
    }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useOrderBookStore;
