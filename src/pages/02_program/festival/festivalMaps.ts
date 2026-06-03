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
        d: "M2110 633L2546 636L2546 809L2811 812L2808 633L3151 633L3152 1947L2811 1947L2808 1770L2810 1509L2548 1512L2548 1771L2109 1768Z",
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
    shapes: [{ d: "M2113 1771L2811 1774L2811 2280L2549 2280L2546 2036L2110 2033Z" }],
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
    shapes: [{ d: "M1144 638L1144 1162L1412 1165L1412 1775L1756 1769L1756 632Z" }],
  },
  {
    id: "06",
    name: "Patios exteriores",
    activity: "Talleres de instrumento",
    location: "Patio 1 y Patio 2",
    description:
      "Los talleres de instrumento en rotación continua ocurren aquí: batería, djembé, ukelele, flauta, percusión latina y teclado. El domingo acoge también la batucada de cierre.",
    shapes: [{ d: "M1756 197H2110V2279H1756Z" }],
  },
  {
    id: "07",
    name: "Patios exteriores",
    activity: "Talleres de instrumento",
    location: "Patio 1 y Patio 2",
    description:
      "Los talleres de instrumento en rotación continua ocurren aquí: batería, djembé, ukelele, flauta, percusión latina y teclado. El domingo acoge también la batucada de cierre.",
    shapes: [{ d: "M7 198H702V2281H7Z" }],
  },
  {
    id: "08",
    name: "Sala de proyecciones",
    activity: "Películas",
    location: "Nave 1, planta baja",
    description:
      "Dos proyecciones por día - documentales y ficción - con debate opcional al terminar. Aforo limitado a 40 personas.",
    shapes: [{ d: "M1318 1948H1757V2283H1318Z" }],
  },
  {
    id: "09",
    name: "Sala de podcast",
    activity: "Entrevistas",
    location: "Nave 1, planta baja",
    description: "Espacio para podcasts y entrevistas.",
    shapes: [{ d: "M2112 2037H2548V2281H2112Z" }],
  },
  {
    id: "INFO",
    name: "Información",
    activity: "Ventanilla",
    location: "Nave 2, planta baja",
    description: "Punto de información en ventanilla para resolver dudas del festival.",
    shapes: [{ d: "M703 1946H1059V2281H703Z" }],
  },
  {
    id: "CAFÉ",
    name: "Cafetería",
    activity: "Cafetería",
    location: "Nave 2, planta baja",
    description: "Zona de cafetería.",
    shapes: [{ d: "M702 634H1059V1773H702Z" }],
  },
  {
    id: "WC",
    name: "Servicios",
    activity: "Baños",
    location: "Naves 1 y 2, planta baja",
    description: servicesDescription,
    shapes: [
      { d: "M1141 1159H1409V1510H1141Z" },
      { d: "M2816 1949H3155V2282H2816Z" },
      { d: "M2547 636H2809V807H2547Z" },
    ],
  },
  {
    id: "ESC",
    name: "Escaleras",
    activity: "Conexión vertical",
    location: "Naves 1 y 2, planta baja",
    description: stairsDescription,
    shapes: [
      { d: "M1142 1509H1410V1771H1142Z" },
      { d: "M1143 197H1408V462H1143Z" },
      { d: "M2548 197H2810V462H2548Z" },
      { d: "M2548 1513H2807V1769H2548Z" },
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
    shapes: [{ d: "M1386 1134H1734V1754H1386Z" }],
  },
  {
    id: "04",
    name: "Sala Visual Room",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: visualRoomDescription,
    shapes: [{ d: "M1387 616H1733V1132H1387Z" }],
  },
  {
    id: "WC",
    name: "Servicios",
    activity: "Baños",
    location: "Naves 1 y 2, planta superior",
    description: servicesDescription,
    shapes: [
      { d: "M428 1135H691V1489H428Z" },
      { d: "M1834 616H2093V1046H1834Z" },
    ],
  },
  {
    id: "ESC",
    name: "Escaleras",
    activity: "Conexión vertical",
    location: "Naves 1 y 2, planta superior",
    description: stairsDescription,
    shapes: [
      { d: "M426 1489H690V1755H426Z" },
      { d: "M1833 1492H2094V1755H1833Z" },
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
    shapes: [
      {
        d: "M4 1779L249 1775L253 1904L555 1907L555 1779L687 1779L687 1904L982 1907L978 1779L1227 1779L1227 2057L1014 2057L1014 2270L914 2270L914 2057L701 2057L701 2270L477 2270L477 2103L256 2103L256 2035L4 2039Z",
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
    shapes: [
      { d: "M700 2058H913V2271H700Z" },
      { d: "M1017 2060H1231V2274H1017Z" },
    ],
  },
  {
    id: "03",
    name: "Sala Factoria",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: factoriaDescription,
    shapes: [
      { d: "M159 766H557V1595H159Z" },
      { d: "M687 769H1074V1594H687Z" },
    ],
  },
  {
    id: "04",
    name: "Sala Visual Room",
    activity: "Talleres",
    location: "Nave 1, planta superior",
    description: visualRoomDescription,
    shapes: [
      { d: "M1383 772H1475V1569H1383Z" },
      { d: "M1475 1593H2389V1678H1475Z" },
      { d: "M2391 779H2483V1579H2391Z" },
    ],
  },
  {
    id: "05",
    name: "Sala de exposiciones",
    activity: "Fotografías y álbumes",
    location: "Nave 1, planta baja",
    description: exposicionesDescription,
    shapes: [
      { d: "M2697 771H2796V1689H2697Z" },
      { d: "M3708 772H3801V1688H3708Z" },
    ],
  },
  {
    id: "WC",
    name: "Servicios",
    activity: "Baños",
    location: "Nave 3",
    description: servicesDescription,
    shapes: [
      { d: "M256 2108H477V2275H256Z" },
      { d: "M2887 2110H3108V2277H2887Z" },
    ],
  },
  {
    id: "ESC",
    name: "Escaleras",
    activity: "Conexión vertical",
    location: "Nave 3",
    description: stairsDescription,
    shapes: [
      { d: "M253 1780H551V1908H253Z" },
      { d: "M687 1783H978V1907H687Z" },
      { d: "M1563 1789H1871V1919H1563Z" },
      { d: "M1999 1789H2291V1917H1999Z" },
      { d: "M2877 1785H3168V1913H2877Z" },
      { d: "M3317 1784H3608V1912H3317Z" },
    ],
  },
  {
    id: "ASC",
    name: "Ascensores",
    activity: "Conexión vertical",
    location: "Nave 3",
    description: liftsDescription,
    shapes: [
      { d: "M5 2040H257V2275H5Z" },
      { d: "M1317 2047H1570V2282H1317Z" },
      { d: "M2632 2045H2885V2276H2632Z" },
    ],
  },
]

// Lista final de planos que FestivalPage recorre con v-for.
export const festivalMaps: FestivalMapConfig[] = [
  {
    id: "level-one",
    image: "/img/spaces/naves-1-y2-nivel-1.png",
    alt: "Mapa de Las Naves 1 y 2, planta baja",
    viewBox: "0 0 3334 2290",
    width: 3334,
    height: 2290,
    ariaLabel: "Mapa interactivo de Las Naves 1 y 2, planta baja",
    infoOffset: "2.375rem",
    defaultZoneId: "01",
    zones: levelOneZones,
  },
  {
    id: "level-two",
    image: "/img/spaces/naves-1-y2-nivel-2.png",
    alt: "Mapa de Las Naves 1 y 2, planta superior",
    viewBox: "0 0 2614 1758",
    width: 2614,
    height: 1758,
    ariaLabel: "Mapa interactivo de Las Naves 1 y 2, planta superior",
    infoOffset: "2.3rem",
    defaultZoneId: "03",
    zones: levelTwoZones,
  },
  {
    id: "nave-three",
    image: "/img/spaces/nave3.png",
    alt: "Mapa de Nave 3",
    viewBox: "0 0 4027 2391",
    width: 4027,
    height: 2391,
    ariaLabel: "Mapa interactivo de Nave 3",
    infoOffset: "2.1rem",
    defaultZoneId: "01",
    zones: naveThreeZones,
  },
]
