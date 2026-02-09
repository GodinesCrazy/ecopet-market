"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

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

    // Verificar pago con el backend
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

  useEffect(() => {
    // Si hay downloadUrl, redirigir a success
    if (status === "success" && downloadUrl) {
      const timer = setTimeout(() => {
        window.location.href = `/success?downloadUrl=${encodeURIComponent(downloadUrl)}`;
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status, downloadUrl]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
          <p className="text-slate-600">Verificando pago...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-red-600">Error al verificar el pago</p>
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

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-slate-600">Redirigiendo...</p>
      </div>
    </div>
  );
}
