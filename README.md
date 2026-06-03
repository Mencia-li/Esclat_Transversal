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

Inicia el servidor de desarrollo:

```bash
npm run dev
```

## Build y vista previa de producción

Genera la build de producción:

```bash
npm run build
```

## Estructura principal

La estructura está pensada para que cada zona visible de la web tenga su carpeta y sus archivos principales.  
Si necesitas cambiar un texto, dato, layout o ruta, esta es la referencia rápida:

```
.
├── public/                              # Assets servidos directamente desde la web
│   ├── fonts/                           # Fuentes locales: Outfit y Questrial
│   ├── img/
│   │   ├── artists/                     # Fotos del cartel y artistas
│   │   ├── logos/                       # Logo ESCLAT, redes sociales, Spotify y partners
│   │   └── spaces/                      # Mapas e imágenes de Las Naves
│   └── video/
│       └── hero/                        # Vídeo de portada
│
├── referencia/                          # Material de referencia visual y PDFs originales
│   ├── images/                          # Capturas/maquetas usadas como guía visual
│   └── pdfs/                            # Documentación base de contenido y artistas
│
├── src/
│   ├── App.vue                          # Layout raíz: header, router-view, footer
│   ├── main.ts                          # Entrada de Vue, router y estilos globales
│   ├── style.css                        # Variables CSS, Tailwind, estilos globales y clases comunes
│
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.vue           # Navegación superior, menú móvil y links principales
│   │   │   └── SiteFooter.vue           # Footer, contacto, redes y datos de acceso
│   │   └── ui/                          # Componentes base reutilizables de interfaz
│   │       ├── accordion/               # Acordeones de FAQs
│   │       ├── button/                  # Botones base
│   │       ├── card/                    # Cards base
│   │       ├── carousel/                # Carruseles de artistas/galerías
│   │       ├── dropdown-menu/           # Menús desplegables
│   │       ├── input/                   # Inputs
│   │       ├── label/                   # Labels
│   │       ├── select/                  # Selects
│   │       └── textarea/                # Textareas
│
│   ├── composables/
│   │   └── useScrollReveal.ts           # Animaciones de aparición al hacer scroll
│
│   ├── data/
│   │   └── festival.ts                  # Datos centrales: festival, días, artistas, horarios, FAQs y tickets
│
│   ├── lib/
│   │   └── utils.ts                     # Helpers compartidos, como fusión de clases CSS
│
│   ├── router/
│   │   └── index.ts                     # Rutas: home, festival, programa, artistas, actividades, entradas y tienda
│
│   └── pages/
│       ├── 01_home/
│       │   ├── Home.vue                 # Orden de secciones de la home: inicio, programa, artistas, actividades, FAQs
│       │   └── HeroSection.vue          # Portada inicial con vídeo y mensaje principal
│       │
│       ├── 02_program/
│       │   ├── CalendarSection.vue      # Bloque de programa en la home: días, temas, artistas/cartel
│       │   ├── ProgramDetail.vue        # Vista de detalle genérica de programa
│       │   ├── _shared/
│       │   │   └── DayProgramPage.vue   # Plantilla común para las páginas de cada día
│       │   ├── days/
│       │   │   ├── Day23Page.vue        # Programa del 23/10
│       │   │   ├── Day24Page.vue        # Programa del 24/10
│       │   │   └── Day25Page.vue        # Programa del 25/10
│       │   └── festival/
│       │       ├── FestivalPage.vue     # Página FESTIVAL: descripción, Las Naves, normas y mapas
│       │       ├── FestivalMap.vue      # Render de mapas/planos del recinto
│       │       └── festivalMaps.ts      # Datos de mapas, plantas y escenarios
│       │
│       ├── 03_artists/
│       │   ├── ArtistsSection.vue       # Sección ARTISTAS/CARTEL de la home
│       │   └── ArtistDetail.vue         # Ficha individual de cada artista
│       │
│       ├── 04_activities/
│       │   ├── ActivitiesSection.vue    # Sección EXPERIENCIA/HORARIOS de la home
│       │   ├── activitiesData.ts        # Datos de talleres, charlas y exposiciones
│       │   ├── _shared/
│       │   │   └── ActivityDetailPage.vue # Plantilla común para detalle de actividades
│       │   ├── charlas/
│       │   │   └── CharlasPage.vue      # Página de charlas
│       │   ├── exposiciones/
│       │   │   └── ExposicionesPage.vue # Página de exposiciones
│       │   └── talleres/
│       │       └── TalleresPage.vue     # Página de talleres
│       │
│       ├── 05_entries/
│       │   ├── EntriesPage.vue          # Página ENTRADAS completa
│       │   ├── TicketsBlock.vue         # Recuadro de tipos de entradas/precios
│       │   ├── AccessStepsBlock.vue     # Pasos de compra/acceso
│       │   ├── SafetyRulesBlock.vue     # Normas y seguridad
│       │   └── MerchBlock.vue           # Bloque que enlaza con tienda
│       │
│       ├── 06_faqs/
│       │   └── FaqSection.vue           # FAQs en acordeón
│       │
│       ├── 07_store/
│       │   └── StorePage.vue            # Página TIENDA: categorías, productos, carrito e IVA
│       │
│       ├── 08_partners/
│       │   └── PartnersMarquee.vue      # Marquesina de colaboradores/patrocinadores
│       │
│       └── detail/
│           └── RouteShell.vue           # Envoltorio para vistas hijas y transiciones
│
├── components.json                      # Configuración de componentes Shadcn/Reka
├── package.json                         # Scripts y dependencias
├── vite.config.ts                       # Configuración de Vite
├── tsconfig*.json                       # Configuración TypeScript
└── index.html                           # HTML base de Vite
```

### Localización rápida

| Quiero cambiar... | Archivo/carpeta |
| --- | --- |
| Navegación superior o menú móvil | `src/components/layout/SiteHeader.vue` |
| Footer, contacto, redes o acceso | `src/components/layout/SiteFooter.vue` |
| Orden de secciones de la home | `src/pages/01_home/Home.vue` |
| Hero inicial | `src/pages/01_home/HeroSection.vue` |
| Programa, días, temas y horarios base | `src/data/festival.ts` |
| Bloque de programa de la home | `src/pages/02_program/CalendarSection.vue` |
| Páginas de cada día | `src/pages/02_program/days/` y `src/pages/02_program/_shared/DayProgramPage.vue` |
| Página Festival / Las Naves / normas | `src/pages/02_program/festival/FestivalPage.vue` |
| Mapas del recinto | `src/pages/02_program/festival/FestivalMap.vue` y `festivalMaps.ts` |
| Artistas y cartel de la home | `src/pages/03_artists/ArtistsSection.vue` |
| Ficha de artista | `src/pages/03_artists/ArtistDetail.vue` |
| Datos de artistas | `src/data/festival.ts` |
| Actividades de la home | `src/pages/04_activities/ActivitiesSection.vue` |
| Datos de talleres, charlas y exposiciones | `src/pages/04_activities/activitiesData.ts` |
| Plantilla de detalle de actividades | `src/pages/04_activities/_shared/ActivityDetailPage.vue` |
| Entradas, accesos, normas y merch | `src/pages/05_entries/` |
| FAQs | `src/pages/06_faqs/FaqSection.vue` y datos en `src/data/festival.ts` |
| Tienda, productos, categorías, carrito e IVA | `src/pages/07_store/StorePage.vue` |
| Sponsors/partners | `src/pages/08_partners/PartnersMarquee.vue` |
| Rutas de navegación | `src/router/index.ts` |
| Colores, fuentes, responsive global y clases comunes | `src/style.css` |

## Assets

- Fuentes: `public/fonts/` (Outfit, Questrial)
- Imágenes: `public/img/` (artists, logos, spaces, merch...)
- Vídeos: `public/video/` (hero)

Las rutas públicas sirven assets con rutas absolutas como `/img/...` o `/video/...`.
