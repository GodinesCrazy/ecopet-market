import express from "express";
import { createPayPalOrder, confirmPayPalOrder } from "../controllers/paypalController.js";
import { createMercadoPagoOrder, confirmMercadoPagoOrder } from "../controllers/mercadopagoController.js";
import { confirmPayment } from "../controllers/paymentController.js";
import { handlePayPalWebhook, handleMercadoPagoWebhook } from "../controllers/webhookController.js";

const router = express.Router();

// PayPal routes
router.get("/create-order", async (req, res) => {
  const { provider, productId, mode } = req.query;

  if (provider === "paypal") {
    return createPayPalOrder(req, res);
  } else if (provider === "mercadopago") {
    return createMercadoPagoOrder(req, res);
  }

  res.status(400).json({
    success: false,
    message: "Invalid payment provider",
  });
});

router.post("/create-order", async (req, res) => {
  const { provider, productId } = req.body;

  if (provider === "paypal") {
    return createPayPalOrder(req, res);
  } else if (provider === "mercadopago") {
    return createMercadoPagoOrder(req, res);
  }

  res.status(400).json({
    success: false,
    message: "Invalid payment provider",
  });
});

// Payment confirmation
router.get("/confirm-payment", confirmPayment);
router.post("/confirm-payment", confirmPayment);

// Webhooks (raw body ya aplicado en server.js para PayPal)
router.post("/webhook/paypal", handlePayPalWebhook);
router.post("/webhook/mercadopago", handleMercadoPagoWebhook);

export default router;
