import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
// CORS: Permitir frontend de Vercel y localhost para desarrollo
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://ecopet-market-frontend.vercel.app",
  "http://localhost:3000",
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requests sin origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === "development") {
      callback(null, true);
    } else {
      callback(null, true); // Permitir todos en desarrollo, restringir en producción si es necesario
    }
  },
  credentials: true,
}));

// Middleware para webhooks (debe ir antes de express.json())
// PayPal webhook necesita raw body para verificación de firma
app.use("/api/webhook/paypal", express.raw({ type: "application/json" }));

// Middlewares generales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productsRouter);
app.use("/api", ordersRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "EcoPet Market API is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
});
