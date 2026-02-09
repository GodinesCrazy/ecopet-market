import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="EcoPet Market Logo"
            width={120}
            height={36}
            priority
            className="h-9 w-auto"
          />
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/products" className="hover:text-slate-900">
            Productos
          </Link>
          <Link href="/contact" className="hover:text-slate-900">
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
