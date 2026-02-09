"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  format: string;
  category: string;
  imageUrl: string;
  downloadUrl: string;
}

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const handlePurchase = async (provider: "paypal" | "mercadopago") => {
    setLoading(true);
    setPaymentMethod(provider);

    try {
      const response = await fetch(`${apiUrl}/api/create-order/${provider}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product.id }),
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
        }
      }

      alert("Error al crear la orden de pago");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="relative h-96 w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-xs font-semibold uppercase text-emerald-600">
            {product.format} • {product.category}
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">{product.name}</h1>
          <p className="text-slate-600">{product.description}</p>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Precio</p>
            <p className="text-2xl font-semibold text-slate-900">
              ${product.price.toFixed(2)} USD
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handlePurchase("paypal")}
              disabled={loading}
              className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading && paymentMethod === "paypal"
                ? "Procesando..."
                : "Comprar con PayPal"}
            </button>
            <button
              onClick={() => handlePurchase("mercadopago")}
              disabled={loading}
              className="rounded-full border border-sky-200 px-6 py-3 text-sm font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-50 disabled:opacity-50"
            >
              {loading && paymentMethod === "mercadopago"
                ? "Procesando..."
                : "Comprar con MercadoPago"}
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
