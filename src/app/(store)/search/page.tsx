import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/data/types/product'
import { api } from '@/data/api'
import { Frown, StepBack, Undo2 } from 'lucide-react'


interface SearchPros {
  searchParams: {
    q: string
  }
}

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60,
    },
  })

  const products = await response.json()

  return products
}

export default async function Search({ searchParams }: SearchPros) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  const products = await searchProducts(query)

  return (
    products.length > 0 ? (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Resultados para: <span className="font-semibold">{query}</span>
        </p>

        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => {
            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
              >
                <Image
                  src={product.image}
                  className="group-hover:scale-105 transition-transform duration-500"
                  width={480}
                  height={480}
                  quality={100}
                  alt=""
                />

                <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                  <span className="text-sm truncate">{product.title}</span>
                  <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
      : (
        <div className="flex flex-col items-center justify-center text-center">
          <Frown size={200} />
          <p className="text-lg mt-6">
            Nenhum resultado encontrado para <span className="font-semibold">"{query}"</span>.
          </p>
          <Link href="/" className="text-green-400 mt-4 border border-transparent hover:border-green-500 rounded-full p-2 duration-300 box-border flex gap-2">
            <Undo2 />  Voltar à loja
          </Link>
        </div>

      )
  )
}