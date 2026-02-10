# ⚡ Pasos Rápidos para Cerrar v1.0.0

Guía rápida para completar los últimos pasos.

---

## 1️⃣ Subir Archivos (5 minutos)

**Opción más rápida: Google Drive**

1. Sube los 6 archivos a Google Drive
2. Para cada archivo:
   - Clic derecho → "Obtener enlace"
   - Cambia a "Cualquiera con el enlace"
   - Copia el ID del archivo (de la URL)
   - URL final: `https://drive.google.com/uc?export=download&id=FILE_ID`

---

## 2️⃣ Actualizar Backend (2 minutos)

1. Abre `backend/data/products.js`
2. Reemplaza cada `downloadUrl` con la URL real
3. Guarda y commit:
   ```bash
   git add backend/data/products.js
   git commit -m "feat: URLs reales de productos"
   git push origin main
   ```

---

## 3️⃣ Configurar Webhooks (10 minutos)

**PayPal:**
1. https://developer.paypal.com/dashboard/webhooks
2. Add Webhook → URL: `https://ecopet-market-backend-production.up.railway.app/api/webhook/paypal`
3. Eventos: `CHECKOUT.ORDER.APPROVED`, `PAYMENT.CAPTURE.COMPLETED`

**MercadoPago:**
1. https://www.mercadopago.com/developers/panel/webhooks
2. Crear Webhook → URL: `https://ecopet-market-backend-production.up.railway.app/api/webhook/mercadopago`
3. Eventos: `payment`

---

## 4️⃣ Marcar Checklist (1 minuto)

1. Abre `RELEASE_CHECKLIST.md`
2. Marca los 2 ítems pendientes como ✅
3. Commit:
   ```bash
   git add RELEASE_CHECKLIST.md
   git commit -m "release: v1.0.0 cerrada"
   git push origin main
   ```

---

## ✅ ¡Listo!

Versión 1.0.0 oficialmente cerrada y lista para producción.

---

**Tiempo total estimado**: ~20 minutos
