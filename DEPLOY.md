# 🚀 Guía de Despliegue - EcoPet Market

Esta guía te ayudará a desplegar EcoPet Market en Vercel (frontend) y Railway (backend).

## 📋 Prerrequisitos

1. Cuenta en [GitHub](https://github.com)
2. Cuenta en [Vercel](https://vercel.com) (gratis)
3. Cuenta en [Railway](https://railway.app) (gratis con límites)
4. Cuentas de desarrollador en:
   - [PayPal Developer](https://developer.paypal.com/)
   - [MercadoPago Developers](https://www.mercadopago.com/developers/)

---

## 🔧 Paso 1: Configurar GitHub

### 1.1 Crear repositorio en GitHub

```bash
cd C:\EcoPetMarket
git remote add origin https://github.com/TU_USUARIO/ecopet-market.git
git branch -M main
git push -u origin main
```

**Nota**: Crea el repositorio `ecopet-market` como **privado** en GitHub antes de hacer push.

---

## 🌐 Paso 2: Desplegar Frontend en Vercel

### 2.1 Conectar repositorio

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en **"Add New Project"**
3. Importa tu repositorio `ecopet-market`
4. Configura el proyecto:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (automático)
   - **Output Directory**: `.next` (automático)

### 2.2 Variables de entorno

En la configuración del proyecto, añade:

```
NEXT_PUBLIC_API_URL=https://tu-backend.railway.app
```

**Nota**: Usa la URL de Railway que obtendrás en el paso 3.

### 2.3 Deploy

Vercel desplegará automáticamente. Obtendrás una URL como:
`https://ecopet-market.vercel.app`

---

## 🚂 Paso 3: Desplegar Backend en Railway

### 3.1 Conectar repositorio

1. Ve a [Railway Dashboard](https://railway.app/dashboard)
2. Click en **"New Project"** → **"Deploy from GitHub repo"**
3. Selecciona tu repositorio `ecopet-market`
4. Railway detectará automáticamente Node.js

### 3.2 Configurar el proyecto

1. En la configuración del servicio, cambia:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`

### 3.3 Variables de entorno

Añade todas las variables en Railway:

```env
PORT=4000
NODE_ENV=production
FRONTEND_URL=https://tu-frontend.vercel.app

# PayPal (usa credenciales de sandbox para pruebas)
PAYPAL_CLIENT_ID=tu_client_id_sandbox
PAYPAL_CLIENT_SECRET=tu_client_secret_sandbox
PAYPAL_MODE=sandbox

# MercadoPago (usa access token de prueba)
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_test
```

### 3.4 Obtener URL de Railway

Railway asignará una URL automáticamente, por ejemplo:
`https://ecopet-market-production.up.railway.app`

**Copia esta URL** y actualiza `NEXT_PUBLIC_API_URL` en Vercel.

---

## 💳 Paso 4: Configurar Pagos

### 4.1 PayPal

1. Ve a [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Crea una nueva aplicación
3. Copia `Client ID` y `Client Secret`
4. Para producción, cambia `PAYPAL_MODE=production` y usa credenciales de producción

### 4.2 MercadoPago

1. Ve a [MercadoPago Developers](https://www.mercadopago.com/developers/)
2. Crea una aplicación
3. Copia tu `Access Token` (usa el de prueba para desarrollo)
4. Para producción, usa el token de producción

---

## 🔄 Paso 5: Deploy Automático

### 5.1 Configurar GitHub Actions (Opcional)

El archivo `.github/workflows/deploy.yml` ya está creado. Para que funcione completamente:

1. Vercel y Railway ya tienen integración con GitHub
2. Cada push a `main` desplegará automáticamente en ambos servicios
3. No necesitas configurar nada adicional si conectaste los repositorios correctamente

### 5.2 Verificar Deploy

```bash
# Hacer un cambio y push
git add .
git commit -m "chore: initial deployment setup"
git push origin main
```

Verifica que:
- ✅ Vercel despliega el frontend
- ✅ Railway despliega el backend
- ✅ Las URLs están correctamente configuradas

---

## ✅ Checklist Final

- [ ] Repositorio en GitHub (privado)
- [ ] Frontend desplegado en Vercel
- [ ] Backend desplegado en Railway
- [ ] Variables de entorno configuradas en ambos servicios
- [ ] URLs actualizadas (frontend → backend, backend → frontend)
- [ ] PayPal configurado (sandbox o producción)
- [ ] MercadoPago configurado (test o producción)
- [ ] Deploy automático funcionando

---

## 🐛 Troubleshooting

### Frontend no se conecta al backend

- Verifica que `NEXT_PUBLIC_API_URL` en Vercel apunte a la URL de Railway
- Verifica que Railway esté corriendo y accesible
- Revisa los logs en Railway

### Errores de CORS

- Verifica que `FRONTEND_URL` en Railway sea la URL correcta de Vercel
- Asegúrate de que el backend tenga `cors` configurado (ya está incluido)

### Pagos no funcionan

- Verifica que las credenciales de PayPal/MercadoPago sean correctas
- Usa modo sandbox/test para desarrollo
- Revisa los logs del backend en Railway

---

## 📞 Soporte

Si tienes problemas, revisa:
- Logs en Vercel Dashboard
- Logs en Railway Dashboard
- Console del navegador (F12)
- Network tab para ver requests

---

¡Listo! Tu tienda online está desplegada y lista para vender productos digitales globalmente. 🎉
