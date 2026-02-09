# 🔗 Configuración de Webhooks - EcoPet Market

Esta guía explica cómo configurar los webhooks de PayPal y MercadoPago para recibir notificaciones de pagos completados.

## 📋 Prerrequisitos

1. Backend desplegado en Railway (o tu plataforma de hosting)
2. URL pública del backend (ej: `https://ecopet-api.railway.app`)
3. Credenciales de PayPal Developer y MercadoPago Developers

---

## 💳 Configurar Webhook de PayPal

### Paso 1: Acceder a PayPal Developer Dashboard

1. Ve a [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Inicia sesión con tu cuenta
3. Selecciona tu aplicación (o crea una nueva)

### Paso 2: Configurar Webhook

1. En el dashboard de tu aplicación, busca la sección **"Webhooks"**
2. Click en **"Add Webhook"**
3. Configura:
   - **Webhook URL**: `https://TU-BACKEND-URL.railway.app/api/webhook/paypal`
   - **Event Types**: Selecciona:
     - `PAYMENT.CAPTURE.COMPLETED`
     - `CHECKOUT.ORDER.APPROVED`
     - `PAYMENT.CAPTURE.REFUNDED` (opcional)

### Paso 3: Guardar Webhook ID

- PayPal te dará un **Webhook ID**
- Guarda este ID (puede ser útil para verificación adicional)

### Paso 4: Verificar Webhook

PayPal enviará un evento de prueba. El backend debería responder con `200 OK`.

---

## 💰 Configurar Webhook de MercadoPago

### Paso 1: Acceder a MercadoPago Developers

1. Ve a [MercadoPago Developers](https://www.mercadopago.com/developers/)
2. Inicia sesión
3. Selecciona tu aplicación

### Paso 2: Configurar Webhook

1. En el dashboard, busca **"Webhooks"** o **"Notificaciones"**
2. Click en **"Crear Webhook"** o **"Agregar URL"**
3. Configura:
   - **URL**: `https://TU-BACKEND-URL.railway.app/api/webhook/mercadopago`
   - **Eventos**: Selecciona:
     - `payment` (pagos)
     - `merchant_order` (opcional)

### Paso 3: Verificar Webhook

MercadoPago enviará una notificación de prueba. El backend debería responder correctamente.

---

## 🔍 Verificar que los Webhooks Funcionan

### Verificar Logs

Los webhooks registran las ventas en `backend/sales.log`. Verifica que se estén registrando:

```bash
# En Railway, verifica los logs
# O en local:
tail -f backend/sales.log
```

### Probar Manualmente

1. Realiza una compra de prueba en sandbox
2. Completa el pago
3. Verifica que el webhook se reciba:
   - Revisa los logs del backend
   - Verifica que `sales.log` tenga una entrada nueva

---

## 🛠️ Troubleshooting

### PayPal Webhook no se recibe

- Verifica que la URL sea accesible públicamente (no localhost)
- Asegúrate de que el backend esté corriendo
- Verifica que el endpoint responda con `200 OK`
- Revisa los logs de PayPal Developer Dashboard

### MercadoPago Webhook no se recibe

- Verifica que la URL sea HTTPS (requerido)
- Asegúrate de que el endpoint responda correctamente
- Revisa la configuración en MercadoPago Dashboard

### Webhook recibido pero no procesado

- Revisa los logs del backend
- Verifica que el formato del body sea correcto
- Asegúrate de que los productos existan en `data/products.js`

---

## 📝 Notas Importantes

- **En producción**: Usa HTTPS siempre (Railway lo proporciona automáticamente)
- **Verificación de firma**: En producción, implementa verificación de firma de PayPal para mayor seguridad
- **Logs**: El archivo `sales.log` crece con el tiempo, considera rotación de logs
- **Monitoreo**: Configura alertas para webhooks fallidos

---

## 🔐 Seguridad Adicional (Recomendado)

Para mayor seguridad en producción:

1. **Verificación de firma PayPal**: Implementa verificación de la firma del webhook
2. **Autenticación**: Considera agregar un token secreto en la URL del webhook
3. **Rate Limiting**: Implementa rate limiting para prevenir abuso
4. **Validación**: Valida siempre el estado del pago con la API antes de entregar el producto

---

**Última actualización**: Febrero 2026
