export type FestivalMapShape = {
  // Path SVG que define una zona clicable del plano.
  d: string
}

export type FestivalMapZone = {
  id: string
  name: string
  activity: string
  location: string
  description: string
  shapes: FestivalMapShape[]
}

export type FestivalMapConfig = {
  // Configuracion completa que recibe FestivalMap.vue para renderizar un plano.
  id: string
  image: string
  alt: string
  viewBox: string
  width: number
  height: number
  ariaLabel: string
  infoOffset: string
  defaultZoneId: string
  zones: FestivalMapZone[]
}

const factoriaDescription =
  "Los talleres más participativos del programa: producción musical, creación de personajes y maquillaje sonoro. Dos sesiones por taller cada día."
const visualRoomDescription =
  "Espacio para talleres más íntimos y reflexivos. También alberga la instalación interactiva del domingo sobre algoritmos."
const exposicionesDescription =
  "Cada día acoge una exposición fotográfica diferente vinculada al tema de la jornada. Acceso libre durante todo el horario del festival."
const servicesDescription = "Servicios disponibles durante todo el horario del festival."
const stairsDescription = "Accesos por escalera entre plantas del recinto."
const liftsDescription = "Ascensores disponibles para moverse entre plantas del recinto."

// Planta baja de Naves 1 y 2.
const levelOneZones: FestivalMapZone[] = [
  {
    id: "01",
    name: "La Polivalent",
    activity: "Charlas",
    location: "Nave 1, planta baja",
    description:
      "El espacio principal del festival. Aquí tienen lugar las charlas y conversaciones de cada día, con capacidad para 80 personas y formato abierto al debate.",
    shapes: [
      {
        d: "M2288 633L3329 636L3329 1949L2988 1952L2982 1512L2722 1512L2722 1776L2288 1776Z",
      },
    ],
  },
  {
    id: "02",
    name: "El cuarto de escucha",
    activity: "Instalación",
    location: "Hall La Polivalent",
    description:
      "Una instalación permanente los tres días: entras solo, escuchas cinco minutos y dejas una palabra en el mural. El mural crece durante todo el festival.",
    shapes: [{ d: "M2285 1776L2285 2036L2722 2036L2722 2281L2982 2278L2982 1770Z" }],
  },
  {
    id: "03",
    name: "Sala Factoria",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: factoriaDescription,
    shapes: [],
  },
  {
    id: "04",
    name: "Sala Visual Room",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: visualRoomDescription,
    shapes: [],
  },
  {
    id: "05",
    name: "Sala de exposiciones",
    activity: "Fotografías y álbumes",
    location: "Nave 1, planta baja",
    description: exposicionesDescription,
    shapes: [{ d: "M1318 637L1318 1160L1585 1164L1585 1777L1932 1774L1929 635Z" }],
  },
  {
    id: "06",
    name: "Patios exteriores",
    activity: "Talleres de instrumento",
    location: "Patio 1 y Patio 2",
    description:
      "Los talleres de instrumento en rotación continua ocurren aquí: batería, djembé, ukelele, flauta, percusión latina y teclado. El domingo acoge también la batucada de cierre.",
    shapes: [{ d: "M1935 199H2285V2283H1935Z" }],
  },
  {
    id: "07",
    name: "Patios exteriores",
    activity: "Talleres de instrumento",
    location: "Patio 1 y Patio 2",
    description:
      "Los talleres de instrumento en rotación continua ocurren aquí: batería, djembé, ukelele, flauta, percusión latina y teclado. El domingo acoge también la batucada de cierre.",
    shapes: [{ d: "M180 197H871V2279H180Z" }],
  },
  {
    id: "08",
    name: "Sala de proyecciones",
    activity: "Películas",
    location: "Nave 1, planta baja",
    description:
      "Dos proyecciones por día - documentales y ficción - con debate opcional al terminar. Aforo limitado a 40 personas.",
    shapes: [{ d: "M1493 1946H1930V2281H1493Z" }],
  },
  {
    id: "09",
    name: "Sala de podcast",
    activity: "Entrevistas",
    location: "Nave 1, planta baja",
    description: "Espacio para podcasts y entrevistas.",
    shapes: [{ d: "M2288 2037H2722V2279H2288Z" }],
  },
  {
    id: "INFO",
    name: "Información",
    activity: "Ventanilla",
    location: "Nave 2, planta baja",
    description: "Punto de información en ventanilla para resolver dudas del festival.",
    shapes: [{ d: "M875 1944H1231V2282H875Z" }],
  },
  {
    id: "CAFÉ",
    name: "Cafetería",
    activity: "Cafetería",
    location: "Nave 2, planta baja",
    description: "Zona de cafetería.",
    shapes: [{ d: "M878 632H1231V1775H878Z" }],
  },
  {
    id: "WC",
    name: "Servicios",
    activity: "Baños",
    location: "Naves 1 y 2, planta baja",
    description: servicesDescription,
    shapes: [
      { d: "M1317 1163H1580V1509H1317Z" },
      { d: "M2987 1951H3325V2283H2987Z" },
    ],
  },
  {
    id: "ESC",
    name: "Escaleras",
    activity: "Conexión vertical",
    location: "Naves 1 y 2, planta baja",
    description: stairsDescription,
    shapes: [
      { d: "M1318 1512H1585V1773H1318Z" },
      { d: "M2722 1514H2982V1768H2722Z" },
      { d: "M1316 197H1583V464H1316Z" },
      { d: "M2722 198H2982V458H2722Z" },
    ],
  },
]

// Planta superior de Naves 1 y 2.
const levelTwoZones: FestivalMapZone[] = [
  {
    id: "03",
    name: "Sala Factoria",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: factoriaDescription,
    shapes: [{ d: "M1041 517H1198V798H1041Z" }],
  },
  {
    id: "04",
    name: "Sala Visual Room",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: visualRoomDescription,
    shapes: [{ d: "M1041 281H1198V516H1041Z" }],
  },
  {
    id: "WC",
    name: "Servicios",
    activity: "Baños",
    location: "Naves 1 y 2, planta superior",
    description: servicesDescription,
    shapes: [
      { d: "M604 517H722V678H604Z" },
      { d: "M1244 281H1362V475H1244Z" },
    ],
  },
  {
    id: "ESC",
    name: "Escaleras",
    activity: "Conexión vertical",
    location: "Naves 1 y 2, planta superior",
    description: stairsDescription,
    shapes: [
      { d: "M604 679H721V798H604Z" },
      { d: "M1245 680H1363V799H1245Z" },
      { d: "M1241 85H1362V198H1241Z" },
    ],
  },
]

// Nave 3 usa otra imagen y escala, por eso vive en su propio grupo.
const naveThreeZones: FestivalMapZone[] = [
  {
    id: "01",
    name: "La Polivalent",
    activity: "Charlas",
    location: "Nave 1, planta baja",
    description:
      "El espacio principal del festival. Aquí tienen lugar las charlas y conversaciones de cada día, con capacidad para 80 personas y formato abierto al debate.",
    shapes: [{ d: "M280 787A20 20 0 1 0 240 787A20 20 0 1 0 280 787Z" }],
  },
  {
    id: "02",
    name: "El cuarto de escucha",
    activity: "Instalación",
    location: "Hall La Polivalent",
    description:
      "Una instalación permanente los tres días: entras solo, escuchas cinco minutos y dejas una palabra en el mural. El mural crece durante todo el festival.",
    shapes: [
      { d: "M309 802H392V886H309Z" },
      { d: "M431 803H513V886H431Z" },
    ],
  },
  {
    id: "03",
    name: "Sala Factoria",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: factoriaDescription,
    shapes: [
      { d: "M99 300H253V622H99Z" },
      { d: "M303 301H454V621H303Z" },
    ],
  },
  {
    id: "04",
    name: "Sala Visual Room",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: visualRoomDescription,
    shapes: [
      { d: "M573 303H608V612H573Z" },
      { d: "M611 621H965V655H611Z" },
      { d: "M965 305H1001V617H965Z" },
    ],
  },
  {
    id: "05",
    name: "Sala de exposiciones",
    activity: "Fotografías y álbumes",
    location: "Nave 1, planta baja",
    description: exposicionesDescription,
    shapes: [
      { d: "M1084 303H1122V658H1084Z" },
      { d: "M1476 304H1511V658H1476Z" },
    ],
  },
  {
    id: "WC",
    name: "Servicios",
    activity: "Baños",
    location: "Nave 3",
    description: servicesDescription,
    shapes: [
      { d: "M136 822H221V885H136Z" },
      { d: "M1159 823H1243V888H1159Z" },
    ],
  },
  {
    id: "ESC",
    name: "Escaleras",
    activity: "Conexión vertical",
    location: "Nave 3",
    description: stairsDescription,
    shapes: [
      { d: "M135 694H252V743H135Z" },
      { d: "M303 694H416V743H303Z" },
      { d: "M644 698H762V748H644Z" },
      { d: "M812 697H927V748H812Z" },
      { d: "M1153 697H1268V747H1153Z" },
      { d: "M1324 697H1438V747H1324Z" },
    ],
  },
  {
    id: "ASC",
    name: "Ascensores",
    activity: "Conexión vertical",
    location: "Nave 3",
    description: liftsDescription,
    shapes: [
      { d: "M39 796H136V885H39Z" },
      { d: "M548 798H647V888H548Z" },
      { d: "M1059 797H1157V888H1059Z" },
    ],
  },
]

// Lista final de planos que FestivalPage recorre con v-for.
export const festivalMaps: FestivalMapConfig[] = [
  {
    id: "level-one",
    image: "/img/spaces/naves-1-y2-nivel-1.png",
    alt: "Mapa de Las Naves 1 y 2, planta baja",
    viewBox: "0 0 3508 2481",
    width: 3508,
    height: 2481,
    ariaLabel: "Mapa interactivo de Las Naves 1 y 2, planta baja",
    infoOffset: "2.375rem",
    defaultZoneId: "01",
    zones: levelOneZones,
  },
  {
    id: "level-two",
    image: "/img/spaces/naves-1-y2-nivel-2.png",
    alt: "Mapa de Las Naves 1 y 2, planta superior",
    viewBox: "0 0 1600 1131",
    width: 1600,
    height: 1131,
    ariaLabel: "Mapa interactivo de Las Naves 1 y 2, planta superior",
    infoOffset: "2.3rem",
    defaultZoneId: "03",
    zones: levelTwoZones,
  },
  {
    id: "nave-three",
    image: "/img/spaces/nave3.png",
    alt: "Mapa de Nave 3",
    viewBox: "0 0 1600 963",
    width: 1600,
    height: 963,
    ariaLabel: "Mapa interactivo de Nave 3",
    infoOffset: "2.1rem",
    defaultZoneId: "01",
    zones: naveThreeZones,
  },
]
