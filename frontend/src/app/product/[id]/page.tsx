"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import ProductPage from "@/components/ProductPage";

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

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      </div>
    );
  }

  return <ProductPage product={product} />;
}
