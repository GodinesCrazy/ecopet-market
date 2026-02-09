"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const downloadUrl = searchParams.get("downloadUrl");
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    if (downloadUrl) {
      setDownloading(true);
      window.open(downloadUrl, "_blank");
      setTimeout(() => setDownloading(false), 1000);
    }
  };

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
            Gracias por tu compra. Tu producto digital está listo para descargar.
          </p>
        </div>

        {downloadUrl && (
          <div className="flex w-full flex-col gap-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="rounded-full bg-emerald-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {downloading ? "Descargando..." : "Descargar producto"}
            </button>
            <p className="text-center text-xs text-slate-500">
              El enlace de descarga también se ha enviado a tu correo electrónico.
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-3 text-center">
          <Link
            href="/products"
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

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-slate-600">Cargando...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
