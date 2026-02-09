# EcoPet Market - Backend

API REST construida con Express.js, integrando PayPal y MercadoPago para procesamiento de pagos.

## 🚀 Desarrollo Local

```bash
npm install
npm start
```

El servidor estará en [http://localhost:4000](http://localhost:4000)

## 📦 Scripts

- `npm start` - Inicia el servidor
- `npm run dev` - Modo desarrollo con watch

## 🌐 Variables de Entorno

Crea `.env`:

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

## 📁 Estructura

```
backend/
├── server.js              # Punto de entrada
├── routes/                # Rutas de la API
│   ├── products.js        # GET /api/products
│   └── orders.js          # POST /api/create-order
├── controllers/           # Lógica de negocio
│   ├── paypalController.js
│   ├── mercadopagoController.js
│   └── paymentController.js
└── data/                  # Datos mock
    └── products.js
```

## 🔌 Endpoints

- `GET /health` - Health check
- `GET /api/products` - Lista todos los productos
- `GET /api/products/:id` - Obtiene un producto
- `GET /api/create-order?provider=paypal&productId=...` - Crea orden PayPal
- `GET /api/create-order?provider=mercadopago&productId=...` - Crea orden MercadoPago
- `GET /api/confirm-payment?orderId=...` - Confirma pago y devuelve URL de descarga

## 💳 Integración de Pagos

### PayPal

1. Crea una app en [PayPal Developer](https://developer.paypal.com/)
2. Obtén `CLIENT_ID` y `CLIENT_SECRET`
3. Configura `PAYPAL_MODE=sandbox` para pruebas

### MercadoPago

1. Crea una app en [MercadoPago Developers](https://www.mercadopago.com/developers/)
2. Obtén tu `ACCESS_TOKEN`
3. Usa credenciales de prueba para desarrollo

## 📝 Notas

- Los productos usan URLs de descarga simuladas. Reemplázalas en producción.
- El flujo de confirmación de pago es simplificado. En producción, valida los webhooks de PayPal/MercadoPago.
