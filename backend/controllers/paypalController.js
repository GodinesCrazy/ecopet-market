import paypal from "@paypal/checkout-server-sdk";
import { products } from "../data/products.js";

// PayPal client setup
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const isProduction = process.env.PAYPAL_MODE === "production";

  if (isProduction) {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  }
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

export async function createPayPalOrder(req, res) {
  try {
    const productId = req.productId || req.body?.productId || req.query?.productId;
    
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: product.currency,
            value: product.price.toFixed(2),
          },
          description: product.name,
          custom_id: product.id,
        },
      ],
      application_context: {
        brand_name: "EcoPet Market",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
        return_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/confirmation?orderId={ORDER_ID}`,
        cancel_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/catalog`,
      },
    });

    const order = await client().execute(request);

    // Si es modo redirect, redirigir a PayPal
    if (req.query?.mode === "redirect" && order.result?.links) {
      const approveLink = order.result.links.find(
        (link) => link.rel === "approve"
      );
      if (approveLink) {
        return res.redirect(approveLink.href);
      }
    }

    res.json({
      success: true,
      orderId: order.result.id,
      links: order.result.links,
    });
  } catch (error) {
    console.error("PayPal order creation error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating PayPal order",
      error: error.message,
    });
  }
}

export async function confirmPayPalOrder(req, res) {
  try {
    const { orderId } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const capture = await client().execute(request);

    if (capture.result.status === "COMPLETED") {
      const productId = capture.result.purchase_units[0]?.custom_id;
      const product = products.find((p) => p.id === productId);

      res.json({
        success: true,
        orderId: capture.result.id,
        status: capture.result.status,
        downloadUrl: product?.downloadUrl || "https://cdn.example.com/producto.pdf",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }
  } catch (error) {
    console.error("PayPal confirmation error:", error);
    res.status(500).json({
      success: false,
      message: "Error confirming PayPal payment",
      error: error.message,
    });
  }
}
