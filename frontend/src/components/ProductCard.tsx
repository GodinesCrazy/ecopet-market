import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  format: string;
  category: string;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs font-semibold uppercase text-emerald-600">
          {product.format} • {product.category}
        </p>
        <h2 className="text-lg font-semibold text-slate-900">{product.name}</h2>
        <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-900">
            ${product.price.toFixed(2)} USD
          </span>
          <Link
            href={`/product/${product.id}`}
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
}
