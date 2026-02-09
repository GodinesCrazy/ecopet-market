# 🐾 EcoPet Market

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

## 📝 Notas

- Los productos digitales actualmente usan URLs de ejemplo. Reemplázalas con enlaces reales de descarga en producción.
- Configura las claves de API de PayPal y MercadoPago en modo sandbox para pruebas.
- El backend simula la entrega de productos al confirmar el pago.

## 📄 Licencia

ISC
