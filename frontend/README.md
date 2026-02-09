# EcoPet Market - Frontend

Aplicación web del cliente construida con Next.js 15 (App Router), Tailwind CSS y TypeScript.

## 🚀 Desarrollo Local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📦 Scripts

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm start` - Servidor de producción
- `npm run lint` - Linter

## 🌐 Variables de Entorno

Crea `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

En producción, usa la URL de tu backend en Railway.

## 📁 Estructura

```
src/
├── app/              # App Router pages
│   ├── page.tsx      # Landing page
│   ├── catalog/      # Catálogo de productos
│   ├── product/       # Página individual de producto
│   ├── contact/       # Página de contacto
│   └── confirmation/  # Confirmación de compra
├── lib/              # Utilidades
│   └── products.ts   # Datos de productos
└── components/       # Componentes reutilizables (si los hay)
```

## 🎨 Diseño

- Colores principales: Verde esmeralda (#059669) y Azul cielo
- Diseño emocional y limpio
- Responsive y accesible
