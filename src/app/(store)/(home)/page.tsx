import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60,
    }
  })

  const products = await response.json()

  return products
}

export const metadata : Metadata = {
  title: 'Home'
}

export default async function Home() {

  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="group relative col-span-9 row-span-4 md:col-span-6 md:row-span-6 flex rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          src={highlightedProduct.image}
          width={680}
          height={680}
          quality={100}
          alt="casaco moletom cinza"
          className="group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute bottom-8 right-4 md:bottom-28 md:right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-[12px] md:text-sm truncate">
            {highlightedProduct.title}
          </span>
          <span className="text-[12px] md:text-sm flex h-full items-center justify-center rounded-full bg-green-700 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-BR',
              {
                style: 'currency',
                currency: 'BRL',
              }
            )}
          </span>
        </div>
      </Link>

      <div className="group col-span-9 row-span-2 md:col-span-3 md:row-span-6 flex sm:flex-col flex-wrap gap-4" >
        {otherProducts.map(product => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="flex-1 relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
            >
              <Image
                src={product.image}
                width={400}
                height={400}
                quality={100}
                alt={product.title}
                className="group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute bottom-4 right-2 md:bottom-10 md:right-10 h-8 sm:h-12 flex items-center gap-1 sm:gap-2 max-w-[220px] md:max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 sm:pl-5">
                <span className="text-sm truncate hidden sm:block">
                  {product.title}
                </span>
                <span className="text-[12px] md:text-sm flex h-full items-center justify-center rounded-full bg-green-700 px-4 font-semibold">
                  {product.price.toLocaleString('pt-BR',
                    {
                      style: 'currency',
                      currency: 'BRL',
                    }
                  )}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
