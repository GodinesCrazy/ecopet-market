import { products } from "../data/products.js";

export async function confirmPayment(req, res) {
  try {
    const { orderId, paymentId, productId } = req.query || req.body;

    // Simular confirmación de pago y devolver URL de descarga
    // En producción, aquí validarías el pago con PayPal/MercadoPago
    const product = products.find((p) => p.id === productId) || products[0];

    res.json({
      success: true,
      orderId: orderId || paymentId || "demo-order-123",
      downloadUrl: product.downloadUrl,
      message: "Payment confirmed. Download your product below.",
    });
  } catch (error) {
    console.error("Payment confirmation error:", error);
    res.status(500).json({
      success: false,
      message: "Error confirming payment",
      error: error.message,
    });
  }
}
