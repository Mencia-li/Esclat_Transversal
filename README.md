# Esclat Festival

Aplicación web responsive para presentar ESCLAT: festival de música, pensamiento y creatividad (Las Naves, Valencia). La app centraliza información del festival, programa por días, artistas, actividades, entradas, tienda y FAQs.

## Descripción breve

Sitio construido con Vue 3 y TypeScript, donde utiliza Vite como bundler y Tailwind CSS para estilos. 

Los datos principales están embebidos en el frontend en `src/data/festival.ts` y se renderizan con componentes y rutas definidas en `src/router`.

## Tecnologías

- Vue 3 + TypeScript
- Vite
- Tailwind CSS v4
- Vue Router
- Reka UI + componentes Shadcn/ui
- Lucide icons

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
public/                         # Assets públicos: fuentes, imágenes, vídeos
src/
├── components/                 # COMPONENTES REUTILIZABLES
│   ├── layout/                 # Componentes estructurales (SiteHeader, SiteFooter)
│   └── ui/                     # Componentes de interfaz (Accordion, Button, Card, Carousel, Dropdown, Input, etc.)
│
├── composables/                # LÓGICA REUTILIZABLE (COMPOSITION API)
│   └── useScrollReveal.ts      # Lógica para animaciones y aparición de elementos al hacer scroll
│
├── data/                       # NÚCLEO DE DATOS
│   └── festival.ts             # Base de datos local estática (artistas, horarios, actividades generales, FAQs)
│
├── lib/                        # UTILIDADES
│   └── utils.ts                # Funciones auxiliares (ej. fusión de clases de Tailwind)
│
├── pages/                      # VISTAS DE LA APLICACIÓN
│   ├── 01_home/                # Portada principal (HeroSection y presentación)
│   │
│   ├── 02_program/             # SECCIÓN DE PROGRAMA Y HORARIOS
│   │   ├── _shared/            # Plantilla reutilizable (DayProgramPage) para renderizar los días
│   │   ├── days/               # Vistas específicas para cada jornada (Day23, Day24, Day25)
│   │   ├── festival/           # Información del recinto, mapas de escenarios (FestivalMap)
│   │   └── ...                 # Componentes generales (CalendarSection, ProgramDetail)
│   │
│   ├── 03_artists/             # Cartel completo y páginas de detalle individual por artista
│   │
│   ├── 04_activities/          # SECCIÓN DE ACTIVIDADES PARALELAS
│   │   ├── _shared/            # Plantilla base (ActivityDetailPage) para el detalle de la actividad
│   │   ├── charlas/            # Vistas específicas del programa de charlas
│   │   ├── exposiciones/       # Vistas de la galería de exposiciones
│   │   ├── talleres/           # Vistas del área de talleres interactivos
│   │   └── activitiesData.ts   # Datos estructurados exclusivos de las actividades
│   │
│   ├── 05_entries/             # Información de tickets, normativas, accesos y promoción de merch
│   ├── 06_faqs/                # Preguntas frecuentes estructuradas en acordeones
│   ├── 07_store/               # Catálogo de la tienda oficial del festival
│   ├── 08_partners/            # Marquesina animada e información de patrocinadores
│   └── detail/                 # Envoltorio (RouteShell) para gestionar transiciones en vistas de detalle
│
├── router/                     # ENRUTAMIENTO
│   └── index.ts                # Configuración de Vue Router y comportamiento entre vistas
│
├── App.vue                     # Componente raíz de la aplicación
├── main.ts                     # Punto de entrada de la aplicación
└── style.css                   # Estilos globales y variables CSS principales
```

## Assets

- Fuentes: `public/fonts/` (Outfit, Questrial)
- Imágenes: `public/img/` (artists, logos, spaces, merch...)
- Vídeos: `public/video/` (hero)

Las rutas públicas sirven assets con rutas absolutas como `/img/...` o `/video/...`.
