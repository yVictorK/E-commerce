import Link from "next/link";
import { Frown, Undo2 } from "lucide-react";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-screen gap-6 px-4">
      <Frown size={200} className="text-zinc-500" />
      <h1 className="text-2xl font-bold">Página não encontrada</h1>
      <p className="text-lg text-zinc-400">
        A página que você está procurando não existe.
      </p>

      <Link
        href="/"
        className="text-green-400 border border-transparent hover:border-green-500 rounded-full p-2 duration-300 flex gap-2 items-center"
      >
        <Undo2 /> Voltar à loja
      </Link>
    </div>
  );
}
