# 🔄 Redeploy Manual del Backend en Railway

## Problema
Railway no detectó automáticamente los últimos cambios del repositorio y necesita un redeploy manual.

---

## ✅ Solución: Redeploy desde el Dashboard (Recomendado)

### Paso 1: Acceder a Railway
1. Abre: https://railway.app/dashboard
2. Inicia sesión si es necesario

### Paso 2: Seleccionar el Proyecto
1. Busca y selecciona el proyecto **`ecopet-market-backend`**
2. Si no lo ves, verifica que estés en el workspace correcto

### Paso 3: Verificar Configuración en Settings
1. Ve a la pestaña **"Settings"** del proyecto
2. Verifica y corrige si es necesario:
   - **Root Directory**: Debe ser `backend`
   - **Branch**: Debe ser `main`
   - **Auto-deploy**: Debe estar **activado** (ON)
   - **Repository**: Debe ser `GodinesCrazy/ecopet-market`

### Paso 4: Hacer Redeploy
1. Ve a la pestaña **"Deployments"**
2. Verás el deployment más reciente (hace 16+ horas)
3. Haz clic en el botón **"Redeploy"** o **"Deploy"** (botón circular con flecha)
4. Espera a que compile y despliegue (2-5 minutos)

### Paso 5: Verificar el Deploy
1. Una vez completado, verifica que el estado sea **"ACTIVE"** (verde)
2. Copia la URL pública: `ecopet-market-backend-production.up.railway.app`
3. Prueba el endpoint:
   ```bash
   curl https://ecopet-market-backend-production.up.railway.app/api/products
   ```
4. Deberías ver **6 productos** en la respuesta JSON

---

## 🔧 Solución Alternativa: CLI de Railway

Si prefieres usar la CLI, necesitas especificar el servicio:

```bash
cd C:\EcoPetMarket\backend

# Listar servicios disponibles (interactivo)
railway service

# Seleccionar el servicio (interactivo)
railway service select ecopet-market-backend

# O especificar directamente
railway up --service ecopet-market-backend
```

**Nota**: La CLI puede requerir modo interactivo para seleccionar el servicio.

---

## 🔍 Verificar que el Deploy Funciona

Después del redeploy, verifica:

1. **Health Check**:
   ```bash
   curl https://ecopet-market-backend-production.up.railway.app/health
   ```
   Debe responder: `{"status":"ok","message":"EcoPet Market API is running"}`

2. **Productos**:
   ```bash
   curl https://ecopet-market-backend-production.up.railway.app/api/products
   ```
   Debe devolver un JSON con 6 productos.

3. **Producto Individual**:
   ```bash
   curl https://ecopet-market-backend-production.up.railway.app/api/products/p1
   ```
   Debe devolver el producto con ID "p1".

---

## ⚠️ Si el Redeploy Falla

1. **Revisa los Logs**:
   - En Railway Dashboard → Pestaña **"Logs"**
   - Busca errores de compilación o runtime

2. **Verifica Variables de Entorno**:
   - En Railway Dashboard → Pestaña **"Variables"**
   - Asegúrate de que todas las variables estén configuradas:
     - `PORT=4000`
     - `NODE_ENV=production`
     - `FRONTEND_URL=...`
     - `PAYPAL_CLIENT_ID=...`
     - `PAYPAL_CLIENT_SECRET=...`
     - `PAYPAL_MODE=...`
     - `MERCADOPAGO_ACCESS_TOKEN=...`

3. **Verifica package.json**:
   - Asegúrate de que `"start": "node server.js"` esté correcto
   - Asegúrate de que todas las dependencias estén listadas

---

## 📝 Nota sobre el Frontend

**El frontend NO se despliega en Railway**. El frontend debe desplegarse en **Vercel**.

Para desplegar el frontend:
1. Ve a https://vercel.com/dashboard
2. Conecta el repositorio `GodinesCrazy/ecopet-market`
3. Configura **Root Directory** como `frontend`
4. Añade la variable `NEXT_PUBLIC_API_URL` con la URL de Railway

---

**Última actualización**: 9 de Febrero, 2026
