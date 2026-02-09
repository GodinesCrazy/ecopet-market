// Middleware de logging
export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl || req.url;
  const ip = req.ip || req.connection.remoteAddress;
  
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  
  // Log del body si existe (excepto para webhooks que pueden ser grandes)
  if (req.body && Object.keys(req.body).length > 0 && !url.includes("/webhook")) {
    console.log(`[${timestamp}] Body:`, JSON.stringify(req.body));
  }
  
  next();
};

// Middleware de error logging
export const errorLogger = (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR:`, {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl || req.url,
    method: req.method,
  });
  
  next(err);
};
