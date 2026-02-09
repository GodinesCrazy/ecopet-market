"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  format: string;
  image: string;
  imageUrl?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        } else {
          setError("Error al cargar productos");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Error al conectar con el servidor");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="mb-10 flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-slate-900">
          Catálogo de Productos Digitales
        </h1>
        <p className="text-slate-600">
          Productos listos para descargar con enfoque en bienestar y prevención.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative h-48 w-full">
              <Image
                src={product.imageUrl || product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <p className="text-xs font-semibold uppercase text-emerald-600">
                {product.format}
              </p>
              <h2 className="text-lg font-semibold text-slate-900">
                {product.name}
              </h2>
              <p className="text-sm text-slate-600 line-clamp-2">
                {product.description}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-900">
                  ${product.price.toFixed(2)} {product.currency || "USD"}
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
        ))}
      </div>
    </section>
  );
}
