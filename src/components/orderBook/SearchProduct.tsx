"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/Command";
import { Product } from "@/src/libs/constant/orderbook";
import useProductStore from "@/src/libs/stores/products";

export default function SearchProduct() {
  const [open, setOpen] = React.useState(false);
  const { products, selectedProduct, setSelectedProduct } = useProductStore(
    (state) => state
  );
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = (product: Product) => {
    setOpen(false);
    setSelectedProduct(product);
  };

  return (
    <>
      <button
        className="text-sm text-white w-full p-2 rounded-md border border-zinc-400 flex justify-between items-center"
        onClick={() => setOpen(true)}
      >
        <span>{selectedProduct?.display_name}</span>
        <div className="flex gap-2 items-center">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search a product here" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {products.map((product) => (
              <CommandItem
                key={product.product_id}
                onSelect={() => handleSearch(product)}
              >
                <span>{product.display_name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
