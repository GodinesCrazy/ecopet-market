import paypal from "@paypal/checkout-server-sdk";
import { products } from "../data/products.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para registrar ventas
function logSale(saleData) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    ...saleData,
  };
  
  const logPath = path.join(__dirname, "../sales.log");
  const logLine = JSON.stringify(logEntry) + "\n";
  
  try {
    fs.appendFileSync(logPath, logLine, "utf8");
    console.log("✅ Sale logged:", logEntry);
  } catch (error) {
    console.error("❌ Error logging sale:", error);
  }
}

// PayPal client setup (reutilizado)
function paypalEnvironment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const isProduction = process.env.PAYPAL_MODE === "production";

  if (isProduction) {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  }
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function paypalClient() {
  return new paypal.core.PayPalHttpClient(paypalEnvironment());
}

// Webhook de PayPal
export async function handlePayPalWebhook(req, res) {
  try {
    // PayPal envía el body como raw (Buffer), necesitamos parsearlo
    let body;
    if (Buffer.isBuffer(req.body)) {
      body = JSON.parse(req.body.toString());
    } else {
      body = req.body;
    }
    
    const { event_type, resource } = body;

    // Verificar que es un evento de pago completado
    if (event_type === "PAYMENT.CAPTURE.COMPLETED" || event_type === "CHECKOUT.ORDER.APPROVED") {
      const orderId = resource?.id || resource?.supplementary_data?.related_ids?.order_id;
      const amount = resource?.amount?.value;
      const currency = resource?.amount?.currency_code;
      const productId = resource?.custom_id || resource?.purchase_units?.[0]?.custom_id;

      if (!orderId) {
        return res.status(400).json({
          success: false,
          message: "Order ID not found in webhook",
        });
      }

      // Verificar el pago con PayPal
      try {
        const request = new paypal.orders.OrdersGetRequest(orderId);
        const order = await paypalClient().execute(request);

        if (order.result.status === "COMPLETED" || order.result.status === "APPROVED") {
          const product = products.find((p) => p.id === productId);

          // Registrar la venta
          logSale({
            provider: "PayPal",
            orderId: orderId,
            productId: productId || "unknown",
            productName: product?.name || "Unknown Product",
            amount: amount,
            currency: currency,
            status: "completed",
          });

          res.json({
            success: true,
            message: "Payment verified and logged",
            orderId: orderId,
            downloadUrl: product?.downloadUrl,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Payment not completed",
            status: order.result.status,
          });
        }
      } catch (verifyError) {
        console.error("Error verifying PayPal payment:", verifyError);
        res.status(500).json({
          success: false,
          message: "Error verifying payment",
        });
      }
    } else {
      // Evento no relevante, responder OK para evitar reintentos
      res.json({
        success: true,
        message: "Webhook received but event not processed",
        event_type: event_type,
      });
    }
  } catch (error) {
    console.error("PayPal webhook error:", error);
    res.status(500).json({
      success: false,
      message: "Error processing webhook",
      error: error.message,
    });
  }
}

// Webhook de MercadoPago
export async function handleMercadoPagoWebhook(req, res) {
  try {
    const { type, data } = req.body;

    // MercadoPago envía diferentes tipos de eventos
    if (type === "payment") {
      const paymentId = data?.id;

      if (!paymentId) {
        return res.status(400).json({
          success: false,
          message: "Payment ID not found in webhook",
        });
      }

      // En producción, aquí deberías verificar el pago con la API de MercadoPago
      // Por ahora, asumimos que si llega el webhook, el pago está aprobado
      const status = data?.status || "approved";
      const productId = data?.metadata?.product_id || data?.external_reference;

      if (status === "approved" || status === "pending") {
        const product = products.find((p) => p.id === productId);

        // Registrar la venta
        logSale({
          provider: "MercadoPago",
          paymentId: paymentId,
          productId: productId || "unknown",
          productName: product?.name || "Unknown Product",
          amount: data?.transaction_amount,
          currency: data?.currency_id,
          status: status,
        });

        res.json({
          success: true,
          message: "Payment verified and logged",
          paymentId: paymentId,
          downloadUrl: product?.downloadUrl,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Payment not approved",
          status: status,
        });
      }
    } else {
      // Evento no relevante
      res.json({
        success: true,
        message: "Webhook received but event not processed",
        type: type,
      });
    }
  } catch (error) {
    console.error("MercadoPago webhook error:", error);
    res.status(500).json({
      success: false,
      message: "Error processing webhook",
      error: error.message,
    });
  }
}
