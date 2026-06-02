# Esclat Festival

Aplicación web responsive para presentar ESCLAT: festival de música, pensamiento y creatividad (Las Naves, Valencia). La app centraliza información del festival, programa por días, artistas, actividades, entradas, tienda y FAQs.

## Descripción breve

Sitio construido con Vue 3 y TypeScript (Composition API). Utiliza Vite como bundler y Tailwind CSS para estilos. Los datos principales están embebidos en el frontend en `src/data/festival.ts` y se renderizan con componentes y rutas definidas en `src/router`.

## Tecnologías

- Vue 3 + TypeScript
- Vite
- Tailwind CSS v4
- Vue Router
- Reka UI + componentes Shadcn/ui
- Lucide icons

## Requisitos

- Node.js (recomendado: 18+)
- npm o yarn

## Instalación

```bash
npm install
```

## Desarrollo

Inicia el servidor de desarrollo con recarga en caliente:

```bash
npm run dev
```

## Build y vista previa de producción

Genera la build de producción (incluye chequeo de tipos con `vue-tsc`):

```bash
npm run build
```

Ver la build localmente:

```bash
npm run preview
```

## Scripts (extraídos de package.json)

- `dev`: inicia Vite en modo desarrollo.
- `build`: ejecuta `vue-tsc -b` y construye la app con Vite.
- `preview`: sirve la build de producción localmente.

## Estructura principal

La estructura relevante del proyecto:

```
public/                # Assets públicos: fuentes, imágenes, vídeos
src/                   # Código fuente
    ├─ main.ts            # Punto de entrada
    ├─ App.vue
    ├─ style.css
    ├─ router/            # Rutas de la aplicación
    ├─ pages/             # Vistas por sección (home, program, artists, etc.)
    ├─ components/        # Componentes UI y layouts (Header/Footer)
    ├─ composables/       # Reutilizables (useTheme, useMusic, etc.)
    └─ data/              # Datos embebidos (festival.ts)
```

## Assets

- Fuentes: `public/fonts/` (Outfit, Questrial)
- Imágenes: `public/img/` (artists, logos, spaces, merch...)
- Vídeos: `public/video/` (hero)

Las rutas públicas sirven assets con rutas absolutas como `/img/...` o `/video/...`.

## Notas de implementación

- El `build` incluye un paso de verificación de tipos (`vue-tsc -b`).
- Vite está configurado con alias `@` apuntando a `./src` (ver `vite.config.ts`).
- Tailwind está integrado vía plugin `@tailwindcss/vite`.

## Cómo contribuir

1. Haz fork/branch de la rama principal.
2. Crea una rama descriptiva: `feature/tu-cambio`.
3. Añade cambios y tests (si procede).
4. Abre un pull request describiendo los cambios.

## Sugerencias / Próximos pasos

- Añadir checks en CI (build + vue-tsc).
- Añadir tests unitarios y de integración.

## Licencia

No se especifica una licencia en `package.json`. Añade un archivo `LICENSE` o establece el campo `license` si procede.
