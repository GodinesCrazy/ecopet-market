import Link from "next/link";
import { products } from "@/lib/products";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function CatalogPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="mb-10 flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-slate-900">
          Catálogo digital
        </h1>
        <p className="text-slate-600">
          Productos listos para descargar con enfoque en bienestar y prevención.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-44 w-full object-cover"
            />
            <div className="flex flex-1 flex-col gap-3 p-5">
              <p className="text-xs font-semibold uppercase text-emerald-600">
                {product.format}
              </p>
              <h2 className="text-lg font-semibold text-slate-900">
                {product.name}
              </h2>
              <p className="text-sm text-slate-600">{product.description}</p>
              <div className="mt-auto flex flex-col gap-3">
                <span className="text-sm font-semibold text-slate-900">
                  ${product.price.toFixed(2)} {product.currency}
                </span>
                <div className="flex flex-col gap-2 text-sm">
                  <Link
                    href={`/product/${product.slug}`}
                    className="rounded-full border border-emerald-200 px-4 py-2 text-center font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    Ver detalle
                  </Link>
                  <a
                    href={`${apiUrl}/api/create-order?provider=paypal&productId=${product.id}&mode=redirect`}
                    className="rounded-full bg-emerald-600 px-4 py-2 text-center font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Comprar con PayPal
                  </a>
                  <a
                    href={`${apiUrl}/api/create-order?provider=mercadopago&productId=${product.id}&mode=redirect`}
                    className="rounded-full border border-sky-200 px-4 py-2 text-center font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-50"
                  >
                    Comprar con MercadoPago
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
