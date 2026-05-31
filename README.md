# Esclat Festival

Esclat es una web interactiva para presentar un festival centrado en salud mental, identidad, fama, música y cultura pop. La página reúne información del evento, programa, artistas, actividades, entradas, espacios, normas y preguntas frecuentes.

## Características principales

- **Inicio narrativo:** hero con vídeo, bloques de concepto y acceso directo a las principales secciones.
- **Programa del festival:** calendario por días y páginas de detalle para actividades, conciertos y talleres.
- **Artistas:** carrusel interactivo, vista ampliada por días, fichas individuales y playlists temáticas.
- **Festival y espacios:** página específica con mapas interactivos de Las Naves, acceso y normas.
- **Tienda y entradas:** sección de actividades/tienda y llamada a la compra o reserva.
- **FAQs y contacto:** preguntas frecuentes, datos de acceso y contacto en el footer.
- **Diseño responsive:** la interfaz se adapta a móvil, tablet y escritorio usando Grid, Flexbox y utilidades de Tailwind.

## Tecnologías utilizadas

- **Vue 3 + TypeScript:** componentes con Composition API, estado reactivo y eventos de interacción.
- **Vue Router:** rutas declarativas, rutas anidadas para detalles del programa y navegación por hash.
- **Tailwind CSS:** estilos principales, sistema responsive y variables visuales del proyecto.
- **Shadcn/ui + Reka UI:** componentes base accesibles como acordeones, menús, botones y carruseles.
- **Lucide Vue Next:** iconos de interfaz.
- **Datos embebidos:** el contenido principal se gestiona desde `src/data/festival.ts`.

## Estructura del proyecto

```txt
src/
├── components/
│   ├── layout/                 # Header y footer globales
│   └── ui/                     # Componentes base reutilizables de interfaz
│
├── composables/
│   └── useScrollReveal.ts      # Animaciones de entrada al hacer scroll
│
├── data/
│   └── festival.ts             # Información del festival, programa, artistas y FAQs
│
├── lib/
│   └── utils.ts                # Utilidades para fusionar clases CSS
│
├── pages/
│   ├── 01_home/                # Inicio, hero y secciones principales
│   ├── 02_program/             # Calendario y detalle de actividades
│   ├── 03_artists/             # Carrusel, cartel y fichas de artistas
│   ├── 04_activities/          # Actividades y tienda
│   ├── 05_shop/                # Página de tienda
│   ├── 06_faqs/                # Preguntas frecuentes
│   ├── 07_festival/            # Página del festival, mapas, acceso y normas
│   └── detail/                 # Shell para rutas anidadas
│
├── router/
│   └── index.ts                # Configuración de rutas y scroll
│
├── App.vue                     # Componente raíz
├── main.ts                     # Entrada de la aplicación
└── style.css                   # Variables globales, tema y estilos base
```

## Assets públicos

```txt
public/
├── img/
│   ├── artists/                # Imágenes de artistas y cartel
│   ├── logos/                  # Logos y redes sociales
│   └── spaces/                 # Mapas de Las Naves
└── video/
    └── hero/                   # Vídeo principal de portada
```

Los archivos de plantilla o sistema como `vite.svg`, `.gitkeep` y `.DS_Store` no forman parte de la web final.

## Rutas principales

- `/`: página principal con inicio, programa, artistas, actividades y FAQs.
- `/festival`: página del festival, mapas interactivos, acceso y normas.
- `/programa/:dia`: detalle de un día o actividad del programa.
- `/artistas/:id`: ficha individual de artista.
- `/tienda`: página de tienda.

## Comandos principales

- `npm install`: instala las dependencias del proyecto.
- `npm run dev`: inicia el servidor local de desarrollo.
- `npm run build`: comprueba TypeScript y genera la versión de producción.
- `npm run preview`: sirve localmente la build generada.

## Estado actual

La web ya contiene la estructura base, navegación, programa, artistas, FAQs, página de festival y mapas interactivos. Quedan pendientes de completar algunos textos finales, la sección de experiencia/horarios y determinados bloques de contenido del inicio.
