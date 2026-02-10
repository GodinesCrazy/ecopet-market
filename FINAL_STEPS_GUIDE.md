# 🚀 Guía Final - Completar Versión 1.0.0

Esta guía te ayudará a completar los últimos pasos para cerrar oficialmente la versión 1.0.0 de EcoPet Market.

---

## 📦 Paso 1: Subir Archivos Reales a CDN

### Opción A: Cloudflare R2 (Recomendado)

1. **Crear cuenta en Cloudflare R2**
   - Ve a: https://developers.cloudflare.com/r2/
   - Crea una cuenta o inicia sesión
   - Crea un bucket nuevo (ej: `ecopet-market-products`)

2. **Subir archivos**
   - Sube los 6 archivos de productos:
     - `primeros-auxilios.pdf`
     - `dieta-barf.mp4`
     - `imprimibles-cachorros.zip`
     - `informe-veterinario.docx`
     - `checklist-adopcion.pdf`
     - `calculadora-porciones.html`

3. **Configurar dominio público**
   - Configura un dominio personalizado o usa el dominio de R2
   - Habilita acceso público para los archivos
   - Copia las URLs públicas de cada archivo

4. **URLs esperadas**:
   ```
   https://tu-bucket.r2.cloudflarestorage.com/primeros-auxilios.pdf
   https://tu-bucket.r2.cloudflarestorage.com/dieta-barf.mp4
   https://tu-bucket.r2.cloudflarestorage.com/imprimibles-cachorros.zip
   https://tu-bucket.r2.cloudflarestorage.com/informe-veterinario.docx
   https://tu-bucket.r2.cloudflarestorage.com/checklist-adopcion.pdf
   https://tu-bucket.r2.cloudflarestorage.com/calculadora-porciones.html
   ```

### Opción B: Google Drive (Alternativa)

1. **Subir archivos a Google Drive**
   - Sube los 6 archivos a una carpeta en Google Drive
   - Haz clic derecho en cada archivo → "Obtener enlace"
   - Cambia permisos a "Cualquiera con el enlace"

2. **Convertir a enlace directo**
   - Para cada archivo, reemplaza en la URL:
     - `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
     - Por: `https://drive.google.com/uc?export=download&id=FILE_ID`

3. **Ejemplo**:
   ```
   https://drive.google.com/uc?export=download&id=1ABC123XYZ...
   ```

### Opción C: Dropbox (Alternativa)

1. **Subir archivos a Dropbox**
   - Sube los archivos a una carpeta pública
   - Haz clic derecho → "Copiar enlace"

2. **Convertir a enlace directo**
   - Reemplaza `?dl=0` por `?dl=1` en cada URL
   - Ejemplo: `https://www.dropbox.com/s/abc123/file.pdf?dl=1`

---

## 📝 Paso 2: Actualizar Backend con URLs Reales

Una vez que tengas las URLs reales:

1. **Abrir archivo de productos**:
   ```bash
   cd C:\EcoPetMarket\backend\data
   # Edita products.js
   ```

2. **Reemplazar URLs simuladas**:
   - Abre `backend/data/products.js`
   - Reemplaza cada `downloadUrl` con la URL real correspondiente
   - Asegúrate de que cada producto tenga su archivo correcto

3. **Ejemplo de actualización**:
   ```javascript
   {
     id: "kit-primeros-auxilios",
     name: "Kit de Primeros Auxilios para Mascotas",
     // ... otros campos
     downloadUrl: "https://tu-cdn.com/primeros-auxilios.pdf", // URL REAL
   }
   ```

4. **Verificar**:
   - Guarda el archivo
   - Reinicia el backend localmente para probar
   - Verifica que las URLs funcionan

5. **Commit y push**:
   ```bash
   git add backend/data/products.js
   git commit -m "feat: actualizar productos con URLs reales de CDN"
   git push origin main
   ```

6. **Redeploy en Railway**:
   - Railway detectará el cambio automáticamente
   - O haz redeploy manual desde el dashboard

---

## 🔐 Paso 3: Configurar Webhooks

### 3.1 PayPal Webhooks

1. **Acceder a PayPal Developer Dashboard**:
   - Ve a: https://developer.paypal.com/dashboard/
   - Inicia sesión con tu cuenta de PayPal

2. **Seleccionar aplicación**:
   - Selecciona tu aplicación de producción (o crea una nueva)
   - Ve a la pestaña **"Webhooks"**

3. **Crear webhook**:
   - Haz clic en **"Add Webhook"**
   - **Webhook URL**: `https://ecopet-market-backend-production.up.railway.app/api/webhook/paypal`
   - **Event Types**: Selecciona:
     - `CHECKOUT.ORDER.APPROVED`
     - `PAYMENT.CAPTURE.COMPLETED`
   - Haz clic en **"Save"**

4. **Copiar Webhook ID**:
   - Copia el Webhook ID generado
   - Guárdalo para referencia

5. **Probar webhook**:
   - Haz una compra de prueba en sandbox
   - Verifica en Railway logs que el webhook se recibió
   - Verifica que se procesó correctamente

### 3.2 MercadoPago Webhooks

1. **Acceder a MercadoPago Developers**:
   - Ve a: https://www.mercadopago.com/developers/
   - Inicia sesión con tu cuenta

2. **Seleccionar aplicación**:
   - Selecciona tu aplicación de producción
   - Ve a **"Webhooks"** o **"Notificaciones"**

3. **Crear webhook**:
   - Haz clic en **"Crear Webhook"** o **"Configurar notificaciones"**
   - **URL**: `https://ecopet-market-backend-production.up.railway.app/api/webhook/mercadopago`
   - **Eventos**: Selecciona:
     - `payment`
     - `merchant_order`
   - Guarda la configuración

4. **Probar webhook**:
   - Haz una compra de prueba
   - Verifica en Railway logs que el webhook se recibió
   - Verifica que se procesó correctamente

### 3.3 Verificar Webhooks en Backend

1. **Revisar logs de Railway**:
   - Ve a Railway Dashboard → Tu servicio → Logs
   - Busca mensajes como:
     - `Received PayPal webhook: ...`
     - `Received MercadoPago webhook: ...`
     - `Sale logged: ...`

2. **Verificar archivo de ventas**:
   - El backend debería crear un archivo `sales.log`
   - Verifica que las ventas se registran correctamente

---

## ✅ Paso 4: Actualizar Checklist

1. **Abrir `RELEASE_CHECKLIST.md`**

2. **Marcar como completados**:
   - ✅ Descarga disponible post-pago
   - ✅ Webhooks configurados en dashboards externos

3. **Commit**:
   ```bash
   git add RELEASE_CHECKLIST.md
   git commit -m "release: checklist completada, versión 1.0.0 cerrada"
   git push origin main
   ```

---

## 🏁 Paso 5: Declarar Cierre de Versión

1. **Actualizar `RELEASE_PLAN.md`**:
   - Al final del archivo, añade:
   ```markdown
   ---
   
   ## ✅ Cierre de Versión 1.0.0
   
   **Fecha de cierre**: [FECHA ACTUAL]
   **Estado**: ✅ Versión 1.0.0 oficialmente cerrada
   
   Todos los módulos están funcionales y la tienda está lista para producción.
   ```

2. **Verificar tag**:
   ```bash
   git tag -l
   # Debe mostrar: v1.0.0-release
   ```

3. **Commit final**:
   ```bash
   git add RELEASE_PLAN.md
   git commit -m "release: declarar cierre oficial de versión 1.0.0"
   git push origin main
   ```

---

## 🎉 Resultado Final

Una vez completados todos los pasos:

- ✅ Archivos reales subidos a CDN
- ✅ URLs actualizadas en backend
- ✅ Webhooks configurados y funcionando
- ✅ Checklist completado
- ✅ Versión 1.0.0 oficialmente cerrada

**La tienda EcoPet Market queda oficialmente lanzada y lista para producción.**

---

**Última actualización**: 9 de Febrero, 2026
