# 🤖 Despliegue Automatizado - EcoPet Market

Este documento explica cómo completar el despliegue usando las herramientas CLI.

## 📋 Prerrequisitos

Las CLIs de Vercel y Railway han sido instaladas. Ahora necesitas autenticarte.

---

## 🔐 Paso 1: Autenticación

### Vercel CLI

```bash
cd C:\EcoPetMarket\frontend
vercel login
```

Sigue las instrucciones para autenticarte con tu cuenta de Vercel.

### Railway CLI

```bash
railway login
```

Sigue las instrucciones para autenticarte con tu cuenta de Railway.

---

## 🚀 Paso 2: Desplegar Frontend (Vercel)

```bash
cd C:\EcoPetMarket\frontend

# Enlazar proyecto (primera vez)
vercel link

# Desplegar
vercel --prod
```

O si prefieres crear un nuevo proyecto:

```bash
cd C:\EcoPetMarket\frontend
vercel --prod
```

Cuando te pregunte:
- **Set up and deploy?** → Yes
- **Which scope?** → Tu cuenta
- **Link to existing project?** → No (primera vez)
- **Project name?** → `ecopet-market` (o el que prefieras)
- **Directory?** → `./` (ya estás en frontend/)
- **Override settings?** → No

### Configurar Variable de Entorno

Después del primer despliegue, configura la variable:

```bash
vercel env add NEXT_PUBLIC_API_URL production
# Ingresa: https://TU-BACKEND-URL.railway.app
```

O desde el dashboard de Vercel.

---

## 🚂 Paso 3: Desplegar Backend (Railway)

```bash
cd C:\EcoPetMarket\backend

# Inicializar proyecto Railway
railway init

# Desplegar
railway up
```

### Configurar Variables de Entorno

```bash
# Desde el directorio backend/
railway variables set PORT=4000
railway variables set NODE_ENV=production
railway variables set FRONTEND_URL=https://TU-FRONTEND-URL.vercel.app
railway variables set PAYPAL_CLIENT_ID=tu_client_id
railway variables set PAYPAL_CLIENT_SECRET=tu_client_secret
railway variables set PAYPAL_MODE=production
railway variables set MERCADOPAGO_ACCESS_TOKEN=tu_access_token
```

O desde el dashboard de Railway.

### Obtener URL del Backend

```bash
railway domain
```

Copia la URL y úsala para actualizar `NEXT_PUBLIC_API_URL` en Vercel.

---

## 🔄 Paso 4: Actualizar Frontend con URL del Backend

```bash
cd C:\EcoPetMarket\frontend
vercel env rm NEXT_PUBLIC_API_URL production
vercel env add NEXT_PUBLIC_API_URL production
# Ingresa la URL real de Railway
vercel --prod
```

---

## ✅ Verificación

### Frontend
```bash
vercel ls
# Verás tu proyecto desplegado
```

### Backend
```bash
railway status
# Verás el estado del servicio
```

---

## 📝 Notas

- Los archivos `vercel.json` y `railway.json` ya están creados
- El despliegue automático funcionará después de la primera configuración
- Cada push a `main` puede desplegar automáticamente si está configurado

---

**Última actualización**: Febrero 2026
