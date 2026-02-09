import express from "express";
import { createPayPalOrder } from "../controllers/paypalController.js";
import { createMercadoPagoOrder } from "../controllers/mercadopagoController.js";
import { validateProductId } from "../middlewares/validation.js";

const router = express.Router();

// POST /api/create-order/paypal - Crear orden PayPal
router.post("/create-order/paypal", validateProductId, createPayPalOrder);

// POST /api/create-order/mercadopago - Crear preferencia MercadoPago
router.post("/create-order/mercadopago", validateProductId, createMercadoPagoOrder);

export default router;
