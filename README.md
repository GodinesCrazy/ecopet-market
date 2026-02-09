# 🐾 EcoPet Market

**Versión**: v1.0.0-release  
**Estado**: ✅ En Producción

Tienda online moderna especializada en la venta global de productos digitales para el bienestar de mascotas (ebooks, plantillas, descargables).

## 📁 Estructura del Proyecto

```
EcoPetMarket/
├── frontend/          # Next.js App (Vercel)
├── backend/           # Express API (Railway)
└── README.md
```

## 🚀 Inicio Rápido

### Frontend (Next.js)

```bash
cd frontend
npm install
cp env.example .env.local
# Edita .env.local con tus variables
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### Backend (Express)

```bash
cd backend
npm install
cp env.example .env
# Edita .env con tus claves de API
npm start
```

El servidor estará en [http://localhost:4000](http://localhost:4000)

## 🔧 Configuración

### Variables de Entorno Frontend

Crea `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
# En producción: https://tu-app.railway.app
```

### Variables de Entorno Backend

Crea `backend/.env`:

```env
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# PayPal
PAYPAL_CLIENT_ID=tu_client_id
PAYPAL_CLIENT_SECRET=tu_client_secret
PAYPAL_MODE=sandbox

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=tu_access_token
```

## 📦 Productos Iniciales

1. **Guía natural para el cuidado de perros** - $9.99 (PDF)
2. **Calendario de vacunas para gatos** - $4.99 (PDF imprimible)
3. **Plantilla editable de salud veterinaria** - $7.49 (Word)

## 🌐 Despliegue

### Frontend en Vercel

1. Conecta tu repositorio de GitHub a Vercel
2. Selecciona el directorio `frontend/`
3. Configura la variable `NEXT_PUBLIC_API_URL` con la URL de Railway
4. Deploy automático en cada push a `main`

### Backend en Railway

1. Conecta tu repositorio de GitHub a Railway
2. Selecciona el directorio `backend/`
3. Configura todas las variables de entorno (ver `backend/env.example`)
4. Railway detectará automáticamente Node.js y desplegará

### GitHub Actions (Opcional)

El proyecto está preparado para CI/CD automático. Cada push a `main` puede desplegar automáticamente en ambos entornos si están conectados.

## 🛠️ Tecnologías

- **Frontend**: Next.js 15, React, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express, PayPal SDK, MercadoPago SDK
- **Despliegue**: Vercel (frontend), Railway (backend)

## 🔗 URLs de Producción

**Frontend**: `https://ecopet-market.vercel.app` (o tu dominio personalizado)  
**Backend API**: `https://ecopet-api.railway.app` (o tu URL de Railway)

> ⚠️ **Nota**: Actualiza estas URLs con las reales después del despliegue.

## 🔔 Webhooks

El proyecto incluye webhooks para confirmación automática de pagos:

- **PayPal**: `/api/webhook/paypal`
- **MercadoPago**: `/api/webhook/mercadopago`

Ver guía completa en [`WEBHOOKS_SETUP.md`](./WEBHOOKS_SETUP.md)

## 📦 Productos Digitales

Los productos usan URLs de CDN para descarga:
- Guía natural para perros: `https://cdn.example.com/guia-perros.pdf`
- Calendario de vacunas: `https://cdn.example.com/calendario-gatos.pdf`
- Plantilla de salud veterinaria: `https://cdn.example.com/plantilla-salud.docx`

> ⚠️ **Importante**: Reemplaza `cdn.example.com` con tu CDN real (S3, Cloudflare R2, etc.)

## 📝 Notas de Producción

- ✅ Webhooks implementados y funcionando
- ✅ URLs de descarga configuradas
- ✅ Validación de pagos implementada
- ✅ Logging de ventas en `backend/sales.log`
- ⚠️ Configura webhooks en PayPal y MercadoPago dashboards
- ⚠️ Reemplaza URLs de CDN con tus enlaces reales

## 📄 Licencia

ISC
