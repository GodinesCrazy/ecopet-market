# ✅ Checklist de Despliegue - EcoPet Market

Esta checklist te guía paso a paso para desplegar EcoPet Market en producción.

---

## 📋 Pre-Despliegue

### ✅ Completado Automáticamente

- ✅ URLs de descarga actualizadas
- ✅ Webhooks implementados
- ✅ Código compilado sin errores
- ✅ Documentación actualizada
- ✅ Versión actualizada a v1.0.0-release
- ✅ Commit de release creado

### ⚠️ Pendiente (Acción Manual Requerida)

- ⚠️ Subir archivos de productos a CDN real
- ⚠️ Obtener credenciales de producción de PayPal
- ⚠️ Obtener credenciales de producción de MercadoPago

---

## 🚀 Paso 1: Preparar Archivos de Productos

1. **Subir archivos a CDN** (S3, Cloudflare R2, etc.):
   - `guia-perros.pdf`
   - `calendario-gatos.pdf`
   - `plantilla-salud.docx`

2. **Actualizar URLs en el código**:
   - Reemplazar `https://cdn.example.com` con tu CDN real
   - Archivos a actualizar:
     - `backend/data/products.js`
     - `frontend/src/lib/products.ts`

3. **Hacer commit**:
   ```bash
   git add backend/data/products.js frontend/src/lib/products.ts
   git commit -m "feat: actualizar URLs de CDN reales"
   git push origin main
   ```

---

## 🌐 Paso 2: Desplegar Frontend en Vercel

### 2.1 Conectar Repositorio

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en **"Add New Project"**
3. Importa el repositorio `GodinesCrazy/ecopet-market`
4. Configura:
   - **Framework Preset**: Next.js (detectado automáticamente)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (automático)
   - **Output Directory**: `.next` (automático)

### 2.2 Variables de Entorno

En la configuración del proyecto, añade:

```
NEXT_PUBLIC_API_URL=https://TU-BACKEND-URL.railway.app
```

> ⚠️ **Nota**: Usa la URL real de Railway que obtendrás en el paso 3.

### 2.3 Desplegar

1. Click en **"Deploy"**
2. Espera a que el despliegue complete
3. Copia la URL generada (ej: `https://ecopet-market.vercel.app`)

---

## 🚂 Paso 3: Desplegar Backend en Railway

### 3.1 Conectar Repositorio

1. Ve a [Railway Dashboard](https://railway.app/dashboard)
2. Click en **"New Project"** → **"Deploy from GitHub repo"**
3. Selecciona el repositorio `GodinesCrazy/ecopet-market`
4. Railway detectará automáticamente Node.js

### 3.2 Configurar Proyecto

1. En la configuración del servicio:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`

### 3.3 Variables de Entorno

Añade todas las variables en Railway:

```env
PORT=4000
NODE_ENV=production
FRONTEND_URL=https://TU-FRONTEND-URL.vercel.app

# PayPal (Producción)
PAYPAL_CLIENT_ID=tu_client_id_produccion
PAYPAL_CLIENT_SECRET=tu_client_secret_produccion
PAYPAL_MODE=production

# MercadoPago (Producción)
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_produccion
```

> ⚠️ **Importante**: Usa credenciales de **producción**, no sandbox.

### 3.4 Desplegar

1. Railway desplegará automáticamente
2. Copia la URL pública generada (ej: `https://ecopet-api.railway.app`)

### 3.5 Actualizar Frontend

1. Vuelve a Vercel
2. Actualiza la variable `NEXT_PUBLIC_API_URL` con la URL real de Railway
3. Vercel redeployará automáticamente

---

## 🔔 Paso 4: Configurar Webhooks

### 4.1 PayPal Webhook

1. Ve a [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Selecciona tu aplicación de producción
3. Ve a **"Webhooks"**
4. Click en **"Add Webhook"**
5. Configura:
   - **Webhook URL**: `https://TU-BACKEND-URL.railway.app/api/webhook/paypal`
   - **Event Types**:
     - `PAYMENT.CAPTURE.COMPLETED`
     - `CHECKOUT.ORDER.APPROVED`
6. Guarda el Webhook ID

### 4.2 MercadoPago Webhook

1. Ve a [MercadoPago Developers](https://www.mercadopago.com/developers/)
2. Selecciona tu aplicación de producción
3. Ve a **"Webhooks"** o **"Notificaciones"**
4. Click en **"Crear Webhook"**
5. Configura:
   - **URL**: `https://TU-BACKEND-URL.railway.app/api/webhook/mercadopago`
   - **Eventos**: `payment`

Ver guía detallada en [`WEBHOOKS_SETUP.md`](./WEBHOOKS_SETUP.md)

---

## ✅ Paso 5: Verificación

### 5.1 Verificar Frontend

- [ ] Abre la URL de Vercel en el navegador
- [ ] Verifica que la landing page carga correctamente
- [ ] Verifica que el catálogo muestra los 3 productos
- [ ] Verifica que las imágenes se cargan
- [ ] Prueba en móvil (responsive)

### 5.2 Verificar Backend

- [ ] Abre `https://TU-BACKEND-URL.railway.app/health`
- [ ] Debe responder: `{"status":"ok","message":"EcoPet Market API is running"}`
- [ ] Abre `https://TU-BACKEND-URL.railway.app/api/products`
- [ ] Debe mostrar los 3 productos

### 5.3 Verificar Pagos (Sandbox/Test)

**PayPal:**
- [ ] Realiza una compra de prueba
- [ ] Completa el pago en sandbox
- [ ] Verifica que redirige a la página de confirmación
- [ ] Verifica que se muestra el enlace de descarga

**MercadoPago:**
- [ ] Realiza una compra de prueba
- [ ] Completa el pago en test
- [ ] Verifica que redirige a la página de confirmación
- [ ] Verifica que se muestra el enlace de descarga

### 5.4 Verificar Webhooks

- [ ] Revisa los logs de Railway
- [ ] Verifica que `sales.log` tenga entradas nuevas
- [ ] Verifica que los webhooks respondan con `200 OK`

### 5.5 Verificar Descargas

- [ ] Haz clic en el enlace de descarga
- [ ] Verifica que el archivo se descarga correctamente
- [ ] Verifica que el archivo es el correcto

---

## 📝 Paso 6: Actualizar Documentación

1. Actualiza `README.md` con las URLs reales:
   - Frontend URL
   - Backend URL

2. Actualiza `RELEASE_REPORT.md` con:
   - URLs reales de producción
   - Estado de webhooks
   - Resultados de pruebas

3. Haz commit y push:
   ```bash
   git add README.md RELEASE_REPORT.md
   git commit -m "docs: actualizar URLs de producción"
   git push origin main
   ```

---

## 🎉 Paso 7: Lanzamiento Público

Una vez verificados todos los pasos:

1. ✅ Cambia PayPal de sandbox a producción
2. ✅ Cambia MercadoPago de test a producción
3. ✅ Anuncia el lanzamiento
4. ✅ Monitorea logs y ventas

---

## 🐛 Troubleshooting

### Frontend no carga
- Verifica que `NEXT_PUBLIC_API_URL` esté configurada
- Verifica que el backend esté accesible
- Revisa los logs de Vercel

### Backend no responde
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs de Railway
- Verifica que el puerto esté correcto

### Webhooks no funcionan
- Verifica que las URLs sean HTTPS (requerido)
- Verifica que el backend esté accesible públicamente
- Revisa los logs del backend
- Verifica la configuración en los dashboards

### Pagos no completan
- Verifica credenciales de producción
- Verifica que los webhooks estén configurados
- Revisa los logs de PayPal/MercadoPago

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs en Vercel y Railway
2. Consulta `WEBHOOKS_SETUP.md` para webhooks
3. Consulta `DEPLOY.md` para despliegue general
4. Consulta `RELEASE_REPORT.md` para estado del proyecto

---

**Última actualización**: Febrero 2026  
**Versión**: v1.0.0-release
