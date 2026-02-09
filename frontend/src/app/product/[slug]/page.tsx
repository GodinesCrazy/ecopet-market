import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type ProductPageProps = {
  params: { slug: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-96 w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-xs font-semibold uppercase text-emerald-600">
            {product.format}
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            {product.name}
          </h1>
          <p className="text-slate-600">{product.description}</p>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Precio</p>
            <p className="text-2xl font-semibold text-slate-900">
              ${product.price.toFixed(2)} {product.currency}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={`${apiUrl}/api/create-order?provider=paypal&productId=${product.id}&mode=redirect`}
              className="rounded-full bg-emerald-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Comprar ahora con PayPal
            </a>
            <a
              href={`${apiUrl}/api/create-order?provider=mercadopago&productId=${product.id}&mode=redirect`}
              className="rounded-full border border-sky-200 px-6 py-3 text-center text-sm font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-50"
            >
              Comprar ahora con MercadoPago
            </a>
            <Link
              href="/catalog"
              className="text-center text-sm font-semibold text-slate-500"
            >
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
