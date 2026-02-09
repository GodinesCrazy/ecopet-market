import Link from "next/link";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center">
        <div className="flex flex-1 flex-col gap-6">
          <span className="w-fit rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Bienestar global para mascotas
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Contenido digital para cuidar a tu mascota con amor, ciencia y
            calma.
          </h1>
          <p className="text-lg text-slate-600">
            Descarga guías, plantillas y calendarios creados por expertos para
            mejorar la salud y el vínculo con tu compañero de vida.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Ver catálogo
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              Hablar con el equipo
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-slate-500">
            <div>
              <p className="text-base font-semibold text-slate-900">+12K</p>
              Descargas felices
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">4.9/5</p>
              Valoración promedio
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">24/7</p>
              Acceso inmediato
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-200 via-sky-200 to-blue-200 p-6">
            <img
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1400&q=80"
              alt="Mascotas felices en un ambiente acogedor"
              className="h-[360px] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-slate-900">
              Productos destacados
            </h2>
            <p className="text-slate-600">
              Recursos digitales listos para descargar y aplicar en casa.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
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
                  <h3 className="text-lg font-semibold text-slate-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-sm font-semibold text-emerald-700"
                    >
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-8 rounded-3xl bg-slate-900 px-8 py-12 text-white md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Entrega inmediata</h3>
            <p className="text-sm text-slate-300">
              Accede al contenido al confirmar tu pago, sin esperas.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Soporte experto</h3>
            <p className="text-sm text-slate-300">
              Equipo veterinario y de bienestar digital para acompañarte.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Pago seguro</h3>
            <p className="text-sm text-slate-300">
              Integramos PayPal y MercadoPago para vender globalmente.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
