"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
  downloadUrl: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    fetch(`${apiUrl}/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
        } else {
          setError("Producto no encontrado");
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Error al cargar el producto");
      })
      .finally(() => setLoading(false));
  }, [productId]);

  const handlePurchase = async (provider: "paypal" | "mercadopago") => {
    setPurchasing(provider);

    try {
      const response = await fetch(`${apiUrl}/api/create-order/${provider}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product?.id }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirigir según el proveedor
        if (provider === "paypal" && data.links) {
          const approveLink = data.links.find(
            (link: { rel: string }) => link.rel === "approve"
          );
          if (approveLink) {
            window.location.href = approveLink.href;
            return;
          }
        } else if (provider === "mercadopago" && data.initPoint) {
          window.location.href = data.initPoint;
          return;
        } else if (provider === "mercadopago" && data.sandboxInitPoint) {
          window.location.href = data.sandboxInitPoint;
          return;
        }
      }

      alert("Error al crear la orden de pago");
      setPurchasing(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar el pago");
      setPurchasing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">{error || "Producto no encontrado"}</p>
        <Link href="/products" className="ml-4 text-emerald-600">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="relative h-96 w-full">
            <Image
              src={product.imageUrl || product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-xs font-semibold uppercase text-emerald-600">
            {product.format}
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">{product.name}</h1>
          <p className="text-slate-600">{product.description}</p>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Precio</p>
            <p className="text-2xl font-semibold text-slate-900">
              ${product.price.toFixed(2)} {product.currency || "USD"}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handlePurchase("paypal")}
              disabled={!!purchasing}
              className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {purchasing === "paypal"
                ? "Procesando..."
                : "Comprar ahora con PayPal"}
            </button>
            <button
              onClick={() => handlePurchase("mercadopago")}
              disabled={!!purchasing}
              className="rounded-full border border-sky-200 px-6 py-3 text-sm font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-50 disabled:opacity-50"
            >
              {purchasing === "mercadopago"
                ? "Procesando..."
                : "Comprar ahora con MercadoPago"}
            </button>
            <Link
              href="/products"
              className="text-center text-sm font-semibold text-slate-500 hover:text-slate-700"
            >
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
