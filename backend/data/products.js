import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer productos desde JSON
const productsData = readFileSync(join(__dirname, "products.json"), "utf-8");
export const products = JSON.parse(productsData);
