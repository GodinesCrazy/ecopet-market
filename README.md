# 🐾 EcoPet Market

**Versión**: v1.0.0-release  
**Estado**: ✅ En Producción

Tienda online moderna especializada en la venta global de productos digitales para el bienestar de mascotas (ebooks, plantillas, descargables).

---

## 📁 Estructura del Proyecto

```
EcoPetMarket/
├── frontend/          # Next.js 14 App (Vercel)
│   ├── src/
│   │   ├── app/      # App Router pages
│   │   └── components/ # Componentes reutilizables
├── backend/           # Express API (Railway)
│   ├── routes/       # Rutas de la API
│   ├── controllers/  # Controladores
│   ├── middlewares/  # Middlewares
│   └── data/         # Datos de productos
└── README.md
```

---

## 🚀 Inicio Rápido

### Frontend (Next.js 14)

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

El servidor estará en [http://localhost:8080](http://localhost:8080)

---

## 🔧 Configuración

### Variables de Entorno Frontend

Crea `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
# En producción: https://ecopet-market-backend-production.up.railway.app
```

### Variables de Entorno Backend

Crea `backend/.env`:

```env
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# PayPal
PAYPAL_CLIENT_ID=tu_client_id
PAYPAL_CLIENT_SECRET=tu_client_secret
PAYPAL_MODE=sandbox

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=tu_access_token
```

---

## 📦 Productos Digitales

El catálogo incluye 6 productos digitales:

1. Kit de Primeros Auxilios para Mascotas - $19.99
2. Guía natural para el cuidado de perros - $9.99
3. Calendario de vacunas para gatos - $4.99
4. Plantilla editable de salud veterinaria - $7.49
5. Guía completa de entrenamiento para cachorros - $14.99
6. Recetario de nutrición natural para mascotas - $12.99

Ver catálogo completo en [`PRODUCTS.md`](./PRODUCTS.md)

---

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

Ver guía detallada en [`DEPLOY.md`](./DEPLOY.md)

---

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express, PayPal SDK, MercadoPago SDK
- **Despliegue**: Vercel (frontend), Railway (backend)

---

## 📚 Documentación

- [`README.md`](./README.md) - Este archivo
- [`DEPLOY.md`](./DEPLOY.md) - Guía de despliegue
- [`QUICK_START.md`](./QUICK_START.md) - Inicio rápido
- [`PRODUCTS.md`](./PRODUCTS.md) - Catálogo de productos
- [`WEBHOOKS_SETUP.md`](./WEBHOOKS_SETUP.md) - Configuración de webhooks

---

## 🔗 URLs de Producción

**Frontend**: `https://ecopet.vercel.app` (o tu dominio personalizado)  
**Backend API**: `https://ecopet-market-backend-production.up.railway.app`

---

## 📝 Notas

- Los productos digitales usan URLs de CDN. Reemplázalas con enlaces reales en producción.
- Configura las claves de API de PayPal y MercadoPago en modo sandbox para pruebas.
- Los webhooks validan pagos y autorizan descargas automáticamente.

---

## 📄 Licencia

ISC
