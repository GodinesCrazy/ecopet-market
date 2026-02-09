"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  format: string;
  category: string;
  imageUrl: string;
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
