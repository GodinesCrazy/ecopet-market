import { MercadoPagoConfig, Preference } from "mercadopago";
import { products } from "../data/products.js";

// MercadoPago client setup
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
  options: {
    timeout: 5000,
    idempotencyKey: "abc",
  },
});

export async function createMercadoPagoOrder(req, res) {
  try {
    const productId = req.productId || req.body?.productId || req.query?.productId;
    
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const preference = new Preference(client);

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

    const preferenceData = {
      items: [
        {
          id: product.id,
          title: product.name,
          description: product.description,
          quantity: 1,
          currency_id: product.currency === "USD" ? "USD" : "ARS",
          unit_price: product.price,
        },
      ],
      back_urls: {
        success: `${frontendUrl}/confirmation`,
        failure: `${frontendUrl}/catalog`,
        pending: `${frontendUrl}/confirmation`,
      },
      auto_return: "approved",
      metadata: {
        product_id: product.id,
      },
    };

    const response = await preference.create({ body: preferenceData });

    // Si es modo redirect, redirigir a MercadoPago
    if (req.query?.mode === "redirect" && response.init_point) {
      return res.redirect(response.init_point);
    }

    res.json({
      success: true,
      preferenceId: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
    });
  } catch (error) {
    console.error("MercadoPago order creation error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating MercadoPago order",
      error: error.message,
    });
  }
}

export async function confirmMercadoPagoOrder(req, res) {
  try {
    const { payment_id, status, external_reference } = req.query || req.body;

    if (status === "approved" || status === "pending") {
      const product = products.find((p) => p.id === external_reference);

      res.json({
        success: true,
        paymentId: payment_id,
        status,
        downloadUrl: product?.downloadUrl || "https://cdn.example.com/producto.pdf",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment not approved",
        status,
      });
    }
  } catch (error) {
    console.error("MercadoPago confirmation error:", error);
    res.status(500).json({
      success: false,
      message: "Error confirming MercadoPago payment",
      error: error.message,
    });
  }
}
