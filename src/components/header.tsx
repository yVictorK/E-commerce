import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartWidget } from "./cart-widget";
import { SearchForm } from "./search-form";

export default function Header() {



  return (
    <div className="flex flex-2 items-start sm:items-center justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <Link
          href="/"
          className="text-md md:text-2xl font-extrabold text-white"
        >
          E<span className="text-green-700">commerce</span>
        </Link>

        <SearchForm />
      </div>

      <div className="absolute sm:static top-8 right-4 flex items-center gap-2 md:gap-4">
        <CartWidget />

        <div className="w-px h-4 bg-zinc-700 hidden sm:block" />

        <Link
          href="./"
          className="flex items-center gap-2 hover:underline"
        >
          <span className="hidden sm:block text-sm ">
            Conta
          </span>
          <Image
            src="https://github.com/yvictork.png"
            className="h-6 w-6 rounded-full border-1 border-green-800 outline"
            width={24}
            height={24}
            alt="Foto de perfil do usuário "
          />
        </Link>
      </div>
    </div>
  );
}