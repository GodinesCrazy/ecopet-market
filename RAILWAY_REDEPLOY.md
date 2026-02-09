# 🔄 Redeploy Manual en Railway

## Problema
Railway muestra el backend desplegado hace 16 horas, pero no se ha actualizado con los últimos cambios del repositorio.

## Solución: Redeploy Manual

### Opción 1: Desde el Dashboard de Railway (Recomendado)

1. Ve a [Railway Dashboard](https://railway.app/dashboard)
2. Selecciona el proyecto `ecopet-market-backend`
3. Ve a la pestaña **"Deployments"**
4. Click en el botón **"Redeploy"** o **"Deploy"** en el deployment más reciente
5. Railway tomará el último commit de la rama `main` y redeployará

### Opción 2: Desde CLI

```bash
cd C:\EcoPetMarket\backend

# Listar servicios
railway service list

# Seleccionar el servicio correcto
railway service select ecopet-market-backend

# Forzar redeploy
railway up --detach
```

### Opción 3: Verificar Conexión con GitHub

1. En Railway Dashboard, ve a **Settings** del proyecto
2. Verifica que el repositorio esté conectado: `GodinesCrazy/ecopet-market`
3. Verifica que la rama sea `main`
4. Verifica que el **Root Directory** sea `backend`
5. Si no está conectado, conecta el repositorio de GitHub

### Opción 4: Trigger Manual desde GitHub

Si Railway está conectado al repositorio, puedes hacer un commit vacío para trigger el deploy:

```bash
cd C:\EcoPetMarket
git commit --allow-empty -m "chore: trigger Railway redeploy"
git push origin main
```

## Verificar el Deploy

Después del redeploy, verifica que el backend tenga los 6 productos:

```bash
curl https://ecopet-market-backend-production.up.railway.app/api/products
```

Deberías ver 6 productos en la respuesta.

## Nota sobre el Frontend

**El frontend NO debe estar en Railway**. El frontend debe desplegarse en **Vercel**.

Railway solo despliega el backend (API).

Para desplegar el frontend:
1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Conecta el repositorio `GodinesCrazy/ecopet-market`
3. Configura el **Root Directory** como `frontend`
4. Añade la variable `NEXT_PUBLIC_API_URL` con la URL de Railway

---

**Última actualización**: 9 de Febrero, 2026
