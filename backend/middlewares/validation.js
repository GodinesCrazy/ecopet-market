// Middleware de validación de ID de producto
export const validateProductId = (req, res, next) => {
  const { productId } = req.body || req.query;
  
  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required",
    });
  }
  
  if (typeof productId !== "string" || productId.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID format",
    });
  }
  
  req.productId = productId.trim();
  next();
};
