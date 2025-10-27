import { z } from "zod"
import data from "../data.json"
import { NextResponse } from "next/server"

interface Params {
  slug: string
}

export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const slug = z.string().parse(params.slug)

  const product = data.products.find((product) => product.slug === slug)

  if (!product) {
    return NextResponse.json({ message: "Produto não encontrado." }, { status: 400 })
  }

  return NextResponse.json(product)
}
