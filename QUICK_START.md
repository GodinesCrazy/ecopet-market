# ⚡ Inicio Rápido - EcoPet Market

Guía rápida para desarrolladores nuevos.

---

## 🚀 Setup Local (5 minutos)

### 1. Clonar Repositorio

```bash
git clone https://github.com/GodinesCrazy/ecopet-market.git
cd ecopet-market
```

### 2. Backend

```bash
cd backend
npm install
cp env.example .env
# Edita .env con tus credenciales (puedes usar valores de prueba)
npm start
```

Backend corriendo en: `http://localhost:8080`

### 3. Frontend

```bash
cd frontend
npm install
cp env.example .env.local
# Edita .env.local: NEXT_PUBLIC_API_URL=http://localhost:8080
npm run dev
```

Frontend corriendo en: `http://localhost:3000`

---

## 📝 Comandos Útiles

### Backend

```bash
npm start          # Inicia servidor
npm run dev        # Modo desarrollo con watch
```

### Frontend

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm start          # Servidor de producción
npm run lint       # Linter
```

---

## 🧪 Probar Localmente

1. Abre `http://localhost:3000`
2. Navega a `/products`
3. Selecciona un producto
4. Click en "Comprar" (usará sandbox/test)

---

## 📦 Estructura de Archivos Clave

```
backend/
├── server.js              # Punto de entrada
├── routes/
│   ├── products.js        # GET /api/products
│   └── payments.js        # POST /api/create-order/*
├── controllers/           # Lógica de negocio
├── middlewares/           # Validación y logging
└── data/
    └── products.json      # Catálogo de productos

frontend/
├── src/
│   ├── app/               # Páginas (App Router)
│   │   ├── page.tsx       # Landing
│   │   ├── products/      # Catálogo
│   │   ├── product/[id]/  # Detalle producto
│   │   ├── checkout/      # Confirmación
│   │   └── success/       # Descarga
│   └── components/        # Componentes reutilizables
```

---

## 🔧 Variables de Entorno Mínimas

### Backend (.env)
```env
PORT=8080
FRONTEND_URL=http://localhost:3000
PAYPAL_CLIENT_ID=tu_client_id_sandbox
PAYPAL_CLIENT_SECRET=tu_client_secret_sandbox
PAYPAL_MODE=sandbox
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_test
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## 🐛 Problemas Comunes

**Backend no inicia**
- Verifica que el puerto 8080 esté libre
- Verifica que las dependencias estén instaladas

**Frontend no carga productos**
- Verifica que el backend esté corriendo
- Verifica `NEXT_PUBLIC_API_URL` en `.env.local`

**Errores de CORS**
- Verifica que `FRONTEND_URL` en backend apunte a `http://localhost:3000`

---

## 📚 Más Información

- [`README.md`](./README.md) - Documentación completa
- [`DEPLOY.md`](./DEPLOY.md) - Guía de despliegue
- [`PRODUCTS.md`](./PRODUCTS.md) - Catálogo de productos

---

**Tiempo estimado de setup**: 5-10 minutos
