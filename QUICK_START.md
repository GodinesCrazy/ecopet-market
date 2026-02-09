# ⚡ Inicio Rápido - EcoPet Market

## ✅ Estado del Proyecto

Tu tienda online **EcoPet Market** está completamente desarrollada y lista para desplegar.

### 📦 Lo que se ha creado:

✅ **Frontend (Next.js)**
- Landing page emocional con diseño verde/azul
- Catálogo de productos
- Páginas individuales de producto
- Página de contacto
- Página de confirmación de compra
- Integración con backend para pagos

✅ **Backend (Express)**
- API REST con productos mock
- Integración PayPal
- Integración MercadoPago
- Sistema de confirmación de pagos
- Entrega de productos digitales

✅ **Configuración**
- Archivos `.env.example` en ambos proyectos
- README.md completo
- Guía de despliegue (DEPLOY.md)
- GitHub Actions workflow
- .gitignore configurado

✅ **Productos Iniciales**
1. Guía natural para el cuidado de perros - $9.99
2. Calendario de vacunas para gatos - $4.99
3. Plantilla editable de salud veterinaria - $7.49

---

## 🚀 Próximos Pasos

### 1. Probar Localmente

**Frontend:**
```bash
cd frontend
npm install
cp env.example .env.local
# Edita .env.local: NEXT_PUBLIC_API_URL=http://localhost:4000
npm run dev
```

**Backend:**
```bash
cd backend
npm install
cp env.example .env
# Edita .env con tus claves (puedes usar valores de prueba)
npm start
```

Abre http://localhost:3000

### 2. Conectar a GitHub

```bash
# Crea un repositorio privado en GitHub llamado "ecopet-market"
git remote add origin https://github.com/TU_USUARIO/ecopet-market.git
git push -u origin main
```

### 3. Desplegar

Sigue las instrucciones detalladas en **DEPLOY.md**:

1. **Vercel** (Frontend)
   - Conecta el repo
   - Root: `frontend/`
   - Variable: `NEXT_PUBLIC_API_URL` (la obtendrás de Railway)

2. **Railway** (Backend)
   - Conecta el repo
   - Root: `backend/`
   - Configura todas las variables de entorno
   - Copia la URL y actualiza Vercel

### 4. Configurar Pagos

- **PayPal**: Obtén credenciales en https://developer.paypal.com/
- **MercadoPago**: Obtén access token en https://www.mercadopago.com/developers/

Usa modo **sandbox/test** para desarrollo.

---

## 📝 Notas Importantes

- Los productos usan URLs de descarga de ejemplo. Reemplázalas con enlaces reales en producción.
- El flujo de pago está simplificado. En producción, implementa webhooks de PayPal/MercadoPago.
- Las imágenes usan Unsplash. Considera usar tus propias imágenes en producción.

---

## 🎯 Resultado Final

Una tienda online completamente funcional:
- ✅ Diseño moderno y emocional
- ✅ Catálogo de productos
- ✅ Sistema de pagos (PayPal + MercadoPago)
- ✅ Entrega automática de productos digitales
- ✅ Lista para generar ingresos pasivos

¡Éxito con tu tienda! 🐾
