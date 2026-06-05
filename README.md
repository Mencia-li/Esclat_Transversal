# Esclat Festival

Proyecto transversal desarrollado por el **Grupo 7**.

**Integrantes**

- Jiayi Li
- María José Pineda
- Lucía Li Miralles
- Jiaqi Ye

Aplicación web responsive para presentar **ESCLAT**, un festival de música, pensamiento y creatividad celebrado en Las Naves, Valencia. La web reúne la identidad visual del evento, el programa por días, artistas, actividades, entradas, tienda y FAQs en una experiencia navegable y adaptada a distintos formatos de pantalla.

## Descripción

Sitio construido con Vue 3 y TypeScript. Utiliza Vite como entorno de desarrollo y bundler, Tailwind CSS para estilos, Vue Router para navegación y componentes reutilizables para mantener una interfaz consistente.

Los datos principales están embebidos en el frontend en `src/data/festival.ts` y se renderizan con componentes y rutas definidas en `src/router`.

## Tecnologías

- Vue 3 + TypeScript
- Vite
- Tailwind CSS v4
- Vue Router
- Reka UI + componentes Shadcn/ui
- Lucide icons

## Identidad visual

La interfaz debe mantenerse dentro de la gama visual de ESCLAT:

| Uso | Token/clase recomendada | Valor base |
| --- | --- | --- |
| Blanco / fondo | `bg-background`, `text-background`, `bg-white` cuando sea literal | `--esclat-white` |
| Negro / gris oscuro | `text-foreground`, `bg-foreground`, `border-foreground`, `bg-black` cuando sea literal | `--esclat-dark-gray` |
| Turquesa | `bg-turquesa`, `text-turquesa`, `border-turquesa` | `#2ad9dd` |
| Blue ice | `bg-blue_ice`, `text-blue_ice` | `#b2f2f4` |
| Gris | `bg-grey`, `border-grey`, `text-grey` | `#D5D4D8` |

Evita colores arbitrarios (`text-[#...]`, `bg-[#...]`, hex directos o nuevos colores Tailwind) salvo que sean assets, swatches de producto o una excepción documentada. Si un componente necesita un matiz, primero intenta resolverlo con opacidades de los tokens existentes (`foreground/70`, `background/80`, etc.).

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

Previsualiza la build:

```bash
npm run preview
```

## Estructura principal

La estructura de `src/pages` sigue la posición real de las zonas en la web.  
Las carpetas `01_`, `02_`, `03_`, etc. no son tipos técnicos: indican el orden visual de la página.

Puntos importantes:

- `02_program` contiene el bloque de programa, las páginas de cada día y el bloque real de entradas del header.
- `04_experience` contiene los recuadros de experiencia: talleres, charlas, exposiciones y tienda.
- `/tienda` sigue siendo una ruta propia, pero su página vive dentro de `04_experience/store` porque nace desde ese hueco visual.
- `src/router/ProgramLayout.vue` es el layout propio de `/programa` y renderiza sus rutas hijas con su `RouterView`.

```
.
├── public/                              # Assets servidos directamente desde la web
│   ├── fonts/                           # Fuentes locales: Outfit y Questrial
│   ├── img/
│   │   ├── artists/                     # Fotos del cartel y artistas
│   │   ├── logos/                       # Logo ESCLAT, redes sociales, Spotify y partners
│   │   ├── merch/                       # Imágenes de productos de tienda
│   │   └── spaces/                      # Mapas e imágenes de Las Naves
│   └── video/
│       └── hero/                        # Vídeo de portada
│
├── referencia/                          # Material de referencia visual y PDFs originales
│   ├── images/                          # Capturas/maquetas usadas como guía visual
│   ├── pdfs/                            # Documentación base de contenido y artistas
│   └── src/                             # Código del proyecto de referencia, no forma parte de ESCLAT
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
│   │   ├── useContactFields.ts          # Validación y actualización común de formularios de contacto
│   │   └── useScrollReveal.ts           # Animaciones de aparición al hacer scroll
│
│   ├── data/
│   │   └── festival.ts                  # Datos centrales: festival, días, artistas, horarios, actividades, FAQs y acceso
│
│   ├── lib/
│   │   └── utils.ts                     # Helpers compartidos, como fusión de clases CSS
│
│   ├── router/
│   │   ├── index.ts                     # Rutas: home, festival, programa, artistas, talleres, charlas, exposiciones, entradas y tienda
│   │   └── ProgramLayout.vue            # Layout de /programa con RouterView propio para rutas hijas
│
│   └── pages/
│       ├── Home.vue                     # Ensambla la home: inicio, programa, artistas, experiencia, FAQs y partners
│       │
│       ├── 01_start/
│       │   └── HeroSection.vue          # Inicio: vídeo de portada con control de sonido
│       │
│       ├── 02_program/
│       │   ├── CalendarSection.vue      # Recuadros de programa en la home: Festival, 23/10, 24/10 y 25/10
│       │   ├── DayProgramPage.vue       # Plantilla común para los días 23/10, 24/10 y 25/10
│       │   ├── useDayProgram.ts         # Construye timeline, programa completo y conciertos por día
│       │   └── festival/
│       │       ├── FestivalPage.vue     # Página FESTIVAL: descripción, Las Naves, normas y mapas
│       │       ├── FestivalMap.vue      # Render de mapas/planos del recinto
│       │       └── festivalMaps.ts      # Datos de mapas, plantas y escenarios
│       │
│       ├── 03_artists/
│       │   ├── ArtistsSection.vue       # Recuadro ARTISTAS/CARTEL de la home
│       │   ├── useArtistsSection.ts     # Estado, filtros, carrusel y playlists de artistas
│       │   ├── ArtistDetail.vue         # Vista de ficha individual de cada artista
│       │   ├── useArtistDetail.ts       # Datos derivados de la ficha individual
│       │   └── useArtistImages.ts       # Ruta común de imágenes de artistas
│       │
│       ├── 04_experience/
│       │   ├── ActivitiesSection.vue    # Recuadro EXPERIENCIA/HORARIOS: talleres, charlas, exposiciones y tienda
│       │   ├── activitiesData.ts        # Datos de talleres, charlas y exposiciones
│       │   ├── _shared/
│       │   │   └── ActivityDetailPage.vue # Plantilla común para detalle de actividades
│       │   ├── charlas/
│       │   │   └── CharlasPage.vue      # Página de charlas
│       │   ├── exposiciones/
│       │   │   └── ExposicionesPage.vue # Página de exposiciones
│       │   ├── store/
│       │   │   └── StorePage.vue        # Página TIENDA: productos, categorías, carrito e IVA
│       │   └── talleres/
│       │       └── TalleresPage.vue     # Página de talleres
│       │
│       ├── 05_faqs/
│       │   └── FaqSection.vue           # FAQs en acordeón
│       │
│       └── 06_partners/
│           └── PartnersMarquee.vue      # Marquesina de colaboradores/patrocinadores
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
| Orden de secciones de la home | `src/pages/Home.vue` |
| Hero inicial | `src/pages/01_start/HeroSection.vue` |
| Programa, días, temas y horarios base | `src/data/festival.ts` |
| Recuadros Festival / 23/10 / 24/10 / 25/10 | `src/pages/02_program/CalendarSection.vue` |
| Páginas de cada día y bloque `ENTRADAS` del header | `src/pages/02_program/DayProgramPage.vue`; el `dayId` se pasa desde `src/router/index.ts` |
| Página Festival / Las Naves / normas | `src/pages/02_program/festival/FestivalPage.vue` |
| Mapas del recinto | `src/pages/02_program/festival/FestivalMap.vue` y `festivalMaps.ts` |
| Artistas y cartel de la home | `src/pages/03_artists/ArtistsSection.vue` y `src/pages/03_artists/useArtistsSection.ts` |
| Ficha de artista | `src/pages/03_artists/ArtistDetail.vue` y `src/pages/03_artists/useArtistDetail.ts` |
| Datos de artistas | `src/data/festival.ts` |
| Recuadros Talleres / Charlas / Exposiciones / Tienda | `src/pages/04_experience/ActivitiesSection.vue` |
| Horarios visuales de actividades | `src/pages/04_experience/ActivitiesSection.vue` |
| Datos de talleres, charlas y exposiciones | `src/pages/04_experience/activitiesData.ts` |
| Plantilla de detalle de actividades | `src/pages/04_experience/_shared/ActivityDetailPage.vue` |
| FAQs | `src/pages/05_faqs/FaqSection.vue` y datos en `src/data/festival.ts` |
| Sponsors/partners | `src/pages/06_partners/PartnersMarquee.vue` |
| Entradas del header | `src/pages/02_program/DayProgramPage.vue`, bloque `#entradas-dia` |
| Tienda, productos, categorías, carrito e IVA | `src/pages/04_experience/store/StorePage.vue` |
| Rutas de navegación | `src/router/index.ts` |
| Colores, fuentes, responsive global y clases comunes | `src/style.css` |

### Rutas principales

| Ruta | Renderiza |
| --- | --- |
| `/` | `src/pages/Home.vue` |
| `/festival` | `src/pages/02_program/festival/FestivalPage.vue` |
| `/programa/dia-23` | `src/pages/02_program/DayProgramPage.vue` con `dayId: "23-10"` |
| `/programa/dia-24` | `src/pages/02_program/DayProgramPage.vue` con `dayId: "24-10"` |
| `/programa/dia-25` | `src/pages/02_program/DayProgramPage.vue` con `dayId: "25-10"` |
| `/entradas` | Redirige a `/programa/dia-23#entradas-dia` |
| `/artistas/:id` | `src/pages/03_artists/ArtistDetail.vue` |
| `/talleres` | `src/pages/04_experience/talleres/TalleresPage.vue` |
| `/charlas` | `src/pages/04_experience/charlas/CharlasPage.vue` |
| `/exposiciones` | `src/pages/04_experience/exposiciones/ExposicionesPage.vue` |
| `/tienda` | `src/pages/04_experience/store/StorePage.vue` |

## Assets

- Fuentes: `public/fonts/` (Outfit, Questrial)
- Imágenes: `public/img/` (artists, logos, spaces, merch...)
- Vídeos: `public/video/` (hero)
- Carteles del carrusel: `public/img/artists/carteles/cartel-v1.jpg`, `cartel-v2.jpg`, `cartel-v3.jpg`

Las rutas públicas sirven assets con rutas absolutas como `/img/...` o `/video/...`.

Cuando añadas imágenes grandes, crea versiones optimizadas para web antes de referenciarlas desde Vue. Los archivos originales de trabajo pueden vivir fuera de `public`, pero lo que se sirve en la app debe estar en `public/img/...` con un peso razonable.

## Notas de mantenimiento

- Ejecuta `npm run build` antes de cerrar cambios de UI o rutas.
- La carpeta `dist/` se regenera con hashes de build; evita mezclar cambios de `dist/index.html` si solo estás tocando código fuente.
- Las páginas y componentes usan rutas absolutas para assets públicos (`/img/...`, `/video/...`).
- Para carruseles, reutiliza `src/components/ui/carousel` antes de crear un control propio.
