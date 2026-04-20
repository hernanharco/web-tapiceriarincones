# Tapicería Rincón

Sitio web profesional para Tapicería Rincón, un negocio de restauración y tapicería de muebles artesanal establecido en Asturias.

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15.3.8 con React 18.3.1
- **Estilos**: Tailwind CSS con componentes Radix UI
- **Animaciones**: Framer Motion y Canvas Confetti
- **Base de Datos**: MongoDB con Mongoose
- **IA**: Google GenAI con Genkit
- **Hosting**: Firebase App Hosting

## 🚀 Características Principales

- **Catálogo Interactivo**: Libro digital con efecto pageflip para mostrar proyectos antes/después
- **Galería Before/After**: Sliders interactivos para visualizar transformaciones
- **Diseño Responsivo**: Adaptado para móviles y desktop
- **Integración con IA**: Sistema de generación de contenido con Genkit
- **Contacto Directo**: Integración con WhatsApp para presupuestos

## 📦 Instalación

```bash
# Instalar dependencias
pnpm install

# Entorno de desarrollo
pnpm dev

# Build para producción
pnpm build

# Servidor de producción
pnpm start
```

## 🎯 Scripts Disponibles

- `pnpm dev` - Servidor de desarrollo en puerto 9002
- `pnpm genkit:dev` - Servidor de desarrollo de Genkit
- `pnpm build` - Build de producción
- `pnpm start` - Servidor de producción
- `pnpm lint` - Linting del código
- `pnpm typecheck` - Verificación de tipos TypeScript

## 📁 Estructura del Proyecto

```
src/
├── app/           # Páginas y layout de Next.js
├── components/    # Componentes UI reutilizables
├── lib/          # Utilidades y configuración
└── ai/           # Funciones de IA y Genkit
```

## 🎨 Componentes Destacados

- **BeforeAfterSlider**: Componente para comparar imágenes antes/después
- **Projects**: Catálogo interactivo con efecto pageflip
- **UI Components**: Sistema basado en Radix UI y shadcn/ui

## 🔧 Configuración

El proyecto utiliza variables de entorno para:
- Conexión a MongoDB
- Configuración de Firebase
- API keys de Google GenAI

## 📱 Despliegue

Configurado para despliegue automático en Firebase App Hosting con YAML configuration en `apphosting.yaml`.
