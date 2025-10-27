'use client'

import { useCart } from "@/context/cart-context";
import { ShoppingBag } from "lucide-react";

export function CartWidget() {
  const { items } = useCart()

  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="w-5 h-5" />
      <span className="hidden sm:block text-sm ">
        Carrinho ({items.length})
      </span>
    </div>
  );
}