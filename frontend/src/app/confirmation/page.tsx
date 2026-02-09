"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      // Simular obtención de URL de descarga
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      fetch(`${apiUrl}/api/confirm-payment?orderId=${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.downloadUrl) {
            setDownloadUrl(data.downloadUrl);
          }
        })
        .catch(() => {
          // Fallback para demo
          setDownloadUrl("https://cdn.example.com/producto.pdf");
        });
    }
  }, [orderId]);

  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-12">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="rounded-full bg-emerald-100 p-5">
          <svg
            className="h-12 w-12 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="text-center">
          <h1 className="mb-3 text-3xl font-semibold text-slate-900">
            ¡Compra confirmada!
          </h1>
          <p className="text-slate-600">
            Gracias por tu compra. Tu producto digital está listo para
            descargar.
          </p>
        </div>

        {orderId && (
          <div className="w-full rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">ID de orden</p>
            <p className="font-mono text-sm font-semibold text-slate-900">
              {orderId}
            </p>
          </div>
        )}

        {downloadUrl && (
          <div className="flex w-full flex-col gap-3">
            <a
              href={downloadUrl}
              download
              className="rounded-full bg-emerald-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Descargar producto
            </a>
            <p className="text-center text-xs text-slate-500">
              El enlace de descarga también se ha enviado a tu correo
              electrónico.
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-3 text-center">
          <Link
            href="/catalog"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Ver más productos
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <section className="mx-auto w-full max-w-2xl px-6 py-12">
        <div className="flex items-center justify-center p-10">
          <p className="text-slate-600">Cargando...</p>
        </div>
      </section>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
