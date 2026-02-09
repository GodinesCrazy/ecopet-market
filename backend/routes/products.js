import express from "express";
import { products } from "../data/products.js";

const router = express.Router();

// GET /api/products - List all products
router.get("/", (req, res) => {
  res.json({
    success: true,
    products,
  });
});

// GET /api/products/:id - Get single product
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    product,
  });
});

export default router;
