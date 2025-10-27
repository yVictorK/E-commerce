import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { CartProvider } from "@/context/cart-context";
import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div>
        <div className="mx-auto grid min-h-screen w-full max-w-[1608px]  grid-rows-[min-content_max-content] gap-5 p-8">
          <Header />
          <div className="flex items-center justify-center text-semibold w-full text-center text-md text-zinc-400 p-0.5 border border-zinc-800 rounded-full gap-6">
            <h1 className="flex items-center justify-center gap-6 bg-zinc-900 w-full p-2 rounded-full px-2"><AlertCircle /> Aplicação desenvolvida apenas para fins de estudo. Nenhum produto é comercializado. </h1>
          </div>
          {children}

        </div>
        <Footer />
      </div>
    </CartProvider>
  );
}