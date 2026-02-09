"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function CheckoutPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setStatus("error");
      return;
    }

    // Simular verificación de pago
    // En producción, esto debería verificar con el backend
    fetch(`${apiUrl}/api/confirm-payment?orderId=${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.downloadUrl) {
          setStatus("success");
          setDownloadUrl(data.downloadUrl);
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        setStatus("error");
      });
  }, [orderId]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Verificando pago...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error al verificar el pago</p>
          <Link
            href="/products"
            className="text-emerald-600 hover:text-emerald-700"
          >
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  // Redirigir a success con el downloadUrl
  if (downloadUrl) {
    window.location.href = `/success?downloadUrl=${encodeURIComponent(downloadUrl)}`;
    return null;
  }

  return null;
}
