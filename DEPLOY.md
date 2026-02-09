# 🚀 Guía de Despliegue - EcoPet Market

Esta guía te ayudará a desplegar EcoPet Market en Vercel (frontend) y Railway (backend).

---

## 📋 Prerrequisitos

1. Cuenta en [GitHub](https://github.com)
2. Cuenta en [Vercel](https://vercel.com) (gratis)
3. Cuenta en [Railway](https://railway.app) (gratis con límites)
4. Cuentas de desarrollador en:
   - [PayPal Developer](https://developer.paypal.com/)
   - [MercadoPago Developers](https://www.mercadopago.com/developers/)

---

## 🚂 Paso 1: Desplegar Backend en Railway

### 1.1 Conectar Repositorio

1. Ve a [Railway Dashboard](https://railway.app/dashboard)
2. Click en **"New Project"** → **"Deploy from GitHub repo"**
3. Selecciona tu repositorio `ecopet-market`
4. Railway detectará automáticamente Node.js

### 1.2 Configurar Proyecto

1. En la configuración del servicio:
   - **Root Directory**: `backend`
   - **Start Command**: `node server.js`
   - **Build Command**: `npm install`

### 1.3 Variables de Entorno

Añade todas las variables en Railway:

```env
PORT=8080
NODE_ENV=production
FRONTEND_URL=https://ecopet.vercel.app

# PayPal (Producción)
PAYPAL_CLIENT_ID=tu_client_id_produccion
PAYPAL_CLIENT_SECRET=tu_client_secret_produccion
PAYPAL_MODE=production

# MercadoPago (Producción)
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_produccion
```

### 1.4 Obtener URL de Railway

Railway asignará una URL automáticamente, por ejemplo:
`https://ecopet-market-backend-production.up.railway.app`

**Copia esta URL** para usarla en el frontend.

---

## 🌐 Paso 2: Desplegar Frontend en Vercel

### 2.1 Conectar Repositorio

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en **"Add New Project"**
3. Importa tu repositorio `ecopet-market`
4. Configura el proyecto:
   - **Framework Preset**: Next.js (detectado automáticamente)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (automático)
   - **Output Directory**: `.next` (automático)

### 2.2 Variables de Entorno

En la configuración del proyecto, añade:

```
NEXT_PUBLIC_API_URL=https://ecopet-market-backend-production.up.railway.app
```

> ⚠️ **Nota**: Usa la URL real de Railway que obtuviste en el paso 1.

### 2.3 Deploy

Vercel desplegará automáticamente. Obtendrás una URL como:
`https://ecopet.vercel.app`

---

## 🔔 Paso 3: Configurar Webhooks

### 3.1 PayPal Webhook

1. Ve a [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Selecciona tu aplicación de producción
3. Ve a **"Webhooks"**
4. Click en **"Add Webhook"**
5. Configura:
   - **Webhook URL**: `https://TU-BACKEND-URL.railway.app/api/webhook/paypal`
   - **Event Types**:
     - `PAYMENT.CAPTURE.COMPLETED`
     - `CHECKOUT.ORDER.APPROVED`

### 3.2 MercadoPago Webhook

1. Ve a [MercadoPago Developers](https://www.mercadopago.com/developers/)
2. Selecciona tu aplicación de producción
3. Ve a **"Webhooks"** o **"Notificaciones"**
4. Click en **"Crear Webhook"**
5. Configura:
   - **URL**: `https://TU-BACKEND-URL.railway.app/api/webhook/mercadopago`
   - **Eventos**: `payment`

Ver guía detallada en [`WEBHOOKS_SETUP.md`](./WEBHOOKS_SETUP.md)

---

## ✅ Paso 4: Verificación

### 4.1 Verificar Backend

```bash
# Health check
curl https://TU-BACKEND-URL.railway.app/health

# Productos
curl https://TU-BACKEND-URL.railway.app/api/products
```

### 4.2 Verificar Frontend

1. Abre la URL de Vercel en el navegador
2. Verifica que la landing page carga
3. Navega a `/products` y verifica el catálogo
4. Selecciona un producto y verifica la página de detalle

### 4.3 Probar Flujo de Compra

1. Selecciona un producto
2. Click en "Comprar con PayPal" o "Comprar con MercadoPago"
3. Completa el pago en sandbox/test
4. Verifica que redirige a `/checkout/[orderId]`
5. Verifica que muestra `/success` con botón de descarga

---

## 🔄 Deploy Automático

Una vez configurado, cada push a `main` desplegará automáticamente:
- **Frontend**: Vercel detecta cambios y redeploya
- **Backend**: Railway detecta cambios y redeploya

---

## 🐛 Troubleshooting

### Backend no responde
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs de Railway
- Verifica que el puerto sea 8080

### Frontend no se conecta al backend
- Verifica que `NEXT_PUBLIC_API_URL` apunte a la URL correcta de Railway
- Verifica que Railway esté corriendo y accesible
- Revisa la consola del navegador para errores

### Pagos no funcionan
- Verifica que las credenciales de PayPal/MercadoPago sean correctas
- Usa modo sandbox/test para desarrollo
- Revisa los logs del backend en Railway

---

**Última actualización**: Febrero 2026
