# ✅ Checklist: Redeploy del Backend en Railway

## Pasos a Seguir

- [ ] **1. Abrir Railway Dashboard**
  - URL: https://railway.app/dashboard
  - Iniciar sesión si es necesario

- [ ] **2. Seleccionar Proyecto**
  - Buscar: `ecopet-market-backend`
  - Click en el proyecto

- [ ] **3. Verificar Settings**
  - [ ] Root Directory: `backend` ✅
  - [ ] Branch: `main` ✅
  - [ ] Auto-deploy: **ON** ✅
  - [ ] Repository: `GodinesCrazy/ecopet-market` ✅

- [ ] **4. Hacer Redeploy**
  - Ir a pestaña **"Deployments"**
  - Click en **"Redeploy"** o **"Deploy"**
  - Esperar 2-5 minutos

- [ ] **5. Verificar Deploy**
  - [ ] Estado: **ACTIVE** (verde)
  - [ ] URL pública visible
  - [ ] Probar endpoint: `/api/products` → Debe devolver 6 productos
  - [ ] Probar endpoint: `/health` → Debe responder OK

- [ ] **6. Verificar Logs**
  - Ir a pestaña **"Logs"**
  - Verificar que no haya errores
  - Verificar mensaje: "🚀 Server running on port 4000"

---

## Comandos de Verificación

```bash
# Health check
curl https://ecopet-market-backend-production.up.railway.app/health

# Productos (debe devolver 6)
curl https://ecopet-market-backend-production.up.railway.app/api/products

# Producto individual
curl https://ecopet-market-backend-production.up.railway.app/api/products/p1
```

---

## Si Algo Falla

1. Revisar logs en Railway Dashboard
2. Verificar variables de entorno
3. Verificar que `package.json` tenga `"start": "node server.js"`
4. Verificar que el Root Directory sea `backend`

---

**Fecha**: 9 de Febrero, 2026
