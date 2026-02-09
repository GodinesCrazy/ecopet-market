# 🚀 Guía Paso a Paso: Desplegar Frontend en Vercel

## Paso 1: Crear Nuevo Proyecto en Vercel

1. En el dashboard de Vercel, busca el botón **"Add New..."** (arriba a la derecha, cerca de "Projects")
2. Haz clic en **"Add New..."**
3. Selecciona **"Project"** del menú desplegable

---

## Paso 2: Importar Repositorio de GitHub

1. Vercel te mostrará una lista de repositorios de GitHub
2. Busca y selecciona: **`GodinesCrazy/ecopet-market`**
3. Si no aparece, haz clic en **"Adjust GitHub App Permissions"** y autoriza el acceso
4. Una vez seleccionado, haz clic en **"Import"**

---

## Paso 3: Configurar el Proyecto

Vercel te pedirá configurar el proyecto:

1. **Framework Preset**: 
   - Debe detectar automáticamente **"Next.js"**
   - Si no, selecciona **"Next.js"** manualmente

2. **Root Directory**:
   - Haz clic en **"Edit"** o **"Configure"**
   - Cambia de `./` a **`frontend`**
   - ⚠️ **MUY IMPORTANTE**: Debe ser `frontend` (no `./`)

3. **Build Command**: 
   - Debe ser: `npm run build` (automático)
   - Si no aparece, déjalo en blanco (Next.js lo detecta)

4. **Output Directory**: 
   - Debe ser: `.next` (automático)
   - No cambies esto

5. **Install Command**: 
   - Debe ser: `npm install` (automático)

---

## Paso 4: Configurar Variables de Entorno

**ANTES de hacer clic en "Deploy"**, configura la variable de entorno:

1. Haz clic en **"Environment Variables"** o busca la sección de variables
2. Haz clic en **"Add"** o **"Add New"**
3. Añade esta variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://ecopet-market-backend-production.up.railway.app`
   - **Environment**: Selecciona **"Production"**, **"Preview"**, y **"Development"** (las 3)
4. Haz clic en **"Save"**

---

## Paso 5: Deploy

1. Revisa que todo esté correcto:
   - ✅ Framework: Next.js
   - ✅ Root Directory: `frontend`
   - ✅ Variable `NEXT_PUBLIC_API_URL` configurada
2. Haz clic en el botón **"Deploy"**
3. Espera 2-5 minutos mientras Vercel:
   - Instala dependencias
   - Compila el proyecto
   - Despliega

---

## Paso 6: Verificar el Deploy

1. Una vez completado, verás:
   - ✅ Estado: **"Ready"** (verde)
   - 🌐 URL pública: Algo como `ecopet-market.vercel.app` o `ecopet-market-xxx.vercel.app`

2. Haz clic en la URL para abrir el sitio

3. Verifica que:
   - ✅ La página principal carga
   - ✅ El catálogo `/products` muestra productos
   - ✅ Los productos se cargan desde la API de Railway

---

## Paso 7: Actualizar Railway con URL de Vercel (Opcional)

Si quieres que el backend conozca la URL del frontend:

1. Ve a Railway Dashboard
2. Selecciona `ecopet-market-backend`
3. Ve a **"Variables"**
4. Actualiza `FRONTEND_URL` con la URL de Vercel (ej: `https://ecopet-market.vercel.app`)

---

## ✅ Checklist Final

- [ ] Proyecto creado en Vercel
- [ ] Repositorio `GodinesCrazy/ecopet-market` importado
- [ ] Root Directory configurado como `frontend`
- [ ] Variable `NEXT_PUBLIC_API_URL` configurada con URL de Railway
- [ ] Deploy completado exitosamente
- [ ] Sitio accesible y funcionando
- [ ] Catálogo de productos carga correctamente

---

## 🐛 Si Algo Falla

### Error: "Build Failed"
- Verifica que el Root Directory sea `frontend`
- Revisa los logs en Vercel para ver el error específico

### Error: "Cannot find module"
- Verifica que `package.json` esté en `frontend/`
- Verifica que todas las dependencias estén instaladas

### Los productos no cargan
- Verifica que `NEXT_PUBLIC_API_URL` esté configurada correctamente
- Verifica que el backend de Railway esté funcionando
- Abre la consola del navegador (F12) para ver errores

---

**Última actualización**: 9 de Febrero, 2026
