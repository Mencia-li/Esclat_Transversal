export interface ProgramEvent {
  id: string
  time: string
  category: string
  title: string
  summary: string
  space: string
  meta: string
  tags: string[]
}

export interface FestivalDay {
  id: string
  date: string
  weekday: string
  theme: string
  title: string
  summary: string
  highlight: string
  detail: string
  activities: string[]
  schedule: ProgramEvent[]
}

export interface Artist {
  id: string
  name: string
  date: string
  time: string
  stage: string
  summary: string
  isPlaceholder?: boolean
}

export interface ArtistRecommendedSong {
  title: string
  description: string
}

export interface ArtistDetail {
  artisticName: string
  realName: string
  realNameLabel?: string
  origin: string
  discipline: string
  genre: string
  themeAxis: string
  shortBio: string
  dayRelation: string
  recommendedSongs: ArtistRecommendedSong[]
  festivalReason: string
  spotifyUrl?: string
  videoEmbedUrl?: string
  videoTitle?: string
}

export interface ProgramBlock {
  id: string
  title: string
  summary: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface TicketOption {
  id: string
  name: string
  description: string
  access: string
}

export interface FestivalPillar {
  id: string
  title: string
  summary: string
}

export interface FestivalSpace {
  id: string
  name: string
  location: string
  summary: string
  capacity: string
  use: string
  assetHint: string
}

export interface AccessStep {
  id: string
  title: string
  summary: string
}

export interface SafetyRule {
  id: string
  title: string
  summary: string
}

export const festivalInfo = {
  name: "Esclat",
  claim: "Festival de música, pensament i creativitat.",
  dates: "23-25 octubre 2026",
  hours: "16:00-00:00 h",
  place: "Las Naves, Valencia",
  venueAddress: "Las Naves · Juan Verdeguer, 16 · Valencia",
  email: "hola@esclat.es",
  instagram: "@esclatfestival",
  producer: "Festival de música, pensamiento y creatividad en Las Naves.",
}

export const festivalPillars: FestivalPillar[] = [
  {
    id: "musica",
    title: "Música en directo",
    summary: "La puerta emocional de entrada a los temas del festival.",
  },
  {
    id: "talleres",
    title: "Talleres",
    summary: "Herramientas prácticas para profundizar en lo que se escucha y se vive.",
  },
  {
    id: "conversaciones",
    title: "Conversaciones",
    summary: "Espacios de debate para decir en voz alta lo que normalmente se evita.",
  },
]

export const festivalDays: FestivalDay[] = [
  {
    id: "23-10",
    date: "23/10",
    weekday: "Viernes",
    theme: "Amor propio, salud mental y presión social",
    title: "¿Cómo me siento por dentro?",
    summary: "Salud mental, amor propio, ansiedad y presión social.",
    highlight: "Exposición, cine, talleres, instrumentos y charla principal.",
    detail:
      "El primer día mira hacia dentro: cómo nos sentimos realmente, qué escondemos detrás de la fachada y cómo la música puede abrir una conversación honesta sobre ansiedad, autoestima y presión social.",
    activities: [
      "Backstage: la otra cara",
      "Eighth Grade",
      "Amy",
      "Produce tu estado de ánimo",
      "Adivina quién eres",
      "Cómo suena la ansiedad",
    ],
    schedule: [
      {
        id: "backstage",
        time: "16:00-20:00",
        category: "Exposición",
        title: "Backstage: la otra cara",
        summary:
          "Fotografías de gira que muestran espera, cansancio, soledad y todo lo que queda fuera de la imagen pulida del cartel.",
        space: "Sala de Exposiciones · Nave 1",
        meta: "Libre acceso · 10-15 fotografías",
        tags: ["salud mental", "fama", "realidad vs imagen"],
      },
      {
        id: "eighth-grade",
        time: "16:00-17:45",
        category: "Cine / Doc",
        title: "Eighth Grade (2018)",
        summary:
          "Una historia sobre redes sociales, presión de grupo y la ansiedad de no encajar, con debate opcional al terminar.",
        space: "Sala de proyecciones · Nave 1",
        meta: "93 min · ficción · debate opcional",
        tags: ["presión social", "redes", "autoestima"],
      },
      {
        id: "amy",
        time: "18:00-20:00",
        category: "Cine / Doc",
        title: "Amy (2015)",
        summary:
          "Documental sobre presión pública, adicción y falta de apoyo real alrededor de una figura musical convertida en producto.",
        space: "Sala de proyecciones · Nave 1",
        meta: "128 min · documental · debate opcional",
        tags: ["salud mental", "fama", "autenticidad"],
      },
      {
        id: "produce-estado",
        time: "16:15 y 17:25",
        category: "Taller",
        title: "Produce tu estado de ánimo",
        summary:
          "Taller de iniciación a la producción musical donde cada participante crea un loop breve desde una intuición emocional.",
        space: "Sala Factoría · Nave 1",
        meta: "40 min · hasta 48 personas · con ordenadores",
        tags: ["producción", "emoción", "iniciación musical"],
      },
      {
        id: "adivina",
        time: "16:25 y 17:35",
        category: "Taller",
        title: "Adivina quién eres",
        summary:
          "Versión musical del juego de los post-its para abrir una conversación sobre etiquetas, comportamiento e identidad.",
        space: "Sala Visual Room · Nave 1",
        meta: "40 min · hasta 30 personas · participativo",
        tags: ["etiquetas", "presión social", "identidad"],
      },
      {
        id: "ansiedad",
        time: "18:30-19:30",
        category: "Charla",
        title: "Cómo suena la ansiedad",
        summary:
          "Un psicólogo y un músico hablan de por qué la música nos afecta emocionalmente y por qué buscamos canciones tristes cuando estamos mal.",
        space: "La Polivalent · Nave 1",
        meta: "60 min · hasta 80 personas · preguntas abiertas",
        tags: ["salud mental", "neurociencia sonora", "accesible"],
      },
    ],
  },
  {
    id: "24-10",
    date: "24/10",
    weekday: "Sábado",
    theme: "Feminismo, identidad femenina y estándares de belleza",
    title: "¿Cómo me ven por fuera?",
    summary: "Cuerpo, imagen, mirada externa y construcción de identidad.",
    highlight: "Exposición fotográfica, cine, collage, maquillaje y debate.",
    detail:
      "El segundo día sale del mundo interior hacia el cuerpo como campo de batalla. La jornada cruza belleza, representación, música y mirada mediática para cuestionar qué cuerpos se celebran y cuáles se silencian.",
    activities: [
      "Cuerpos sin filtro",
      "Miss Americana",
      "Frida",
      "Pinta caras",
      "Crea tu portada de álbum",
      "La imagen del artista",
    ],
    schedule: [
      {
        id: "cuerpos-sin-filtro",
        time: "16:00-20:00",
        category: "Exposición",
        title: "Cuerpos sin filtro",
        summary:
          "Veinte retratos sin retoque ni posado dirigido, acompañados por frases escritas por sus protagonistas.",
        space: "Sala de Exposiciones · Nave 1",
        meta: "Libre acceso · 20 piezas",
        tags: ["cuerpo", "belleza", "representación"],
      },
      {
        id: "miss-americana",
        time: "16:00-17:30",
        category: "Cine / Doc",
        title: "Miss Americana (2020)",
        summary:
          "Documental sobre mandatos de imagen, aprobación constante y el momento de dejar de cumplir expectativas externas.",
        space: "Sala de proyecciones · Nave 1",
        meta: "85 min · documental · debate opcional",
        tags: ["identidad femenina", "imagen", "industria"],
      },
      {
        id: "frida",
        time: "17:45-20:00",
        category: "Cine / Doc",
        title: "Frida (2002)",
        summary:
          "Una mirada a la construcción de una identidad visual y artística propia en un mundo que miraba el cuerpo desde fuera.",
        space: "Sala de proyecciones · Nave 1",
        meta: "123 min · ficción biográfica",
        tags: ["feminismo", "cuerpo", "arte"],
      },
      {
        id: "pinta-caras",
        time: "16:15 y 17:25",
        category: "Taller",
        title: "Pinta caras",
        summary:
          "Maquillaje compartido, música e improvisación sin referencias visuales: escuchar una canción y traducirla a rostro.",
        space: "Sala Factoría · Nave 1",
        meta: "40 min · grupos de 10",
        tags: ["belleza", "música", "juego"],
      },
      {
        id: "portada-album",
        time: "16:25 y 17:35",
        category: "Taller",
        title: "Crea tu portada de álbum",
        summary:
          "Collage analógico con revistas de moda y música para imaginar la portada que te habría gustado ver a los quince años.",
        space: "Sala Visual Room · Nave 1",
        meta: "40 min · grupos de 12 · pieza para llevar",
        tags: ["representación", "collage", "medios"],
      },
      {
        id: "imagen-artista",
        time: "18:30-19:30",
        category: "Charla",
        title: "La imagen del artista en la industria musical",
        summary:
          "Debate sobre qué parte de la imagen en escena es decisión artística y qué parte responde a instrucciones de la industria.",
        space: "La Polivalent · Nave 1",
        meta: "60 min · hasta 80 personas · debate abierto",
        tags: ["imagen", "belleza", "industria"],
      },
    ],
  },
  {
    id: "25-10",
    date: "25/10",
    weekday: "Domingo",
    theme: "Industria, fama y el precio de ser famoso",
    title: "¿Quién construye ese sistema?",
    summary: "Industria musical, fama, poder mediático y cultura de la exposición.",
    highlight: "Privacidad, cancelación, industria, talleres y batucada de cierre.",
    detail:
      "El tercer día señala al sistema que fabrica las reglas: industrias que construyen imágenes, imponen narrativas y consumen personas públicas a una velocidad que casi nunca se cuestiona.",
    activities: [
      "Lo que no sale en la foto",
      "Shut Up and Sing",
      "Hit o descarte",
      "Pinta tu camiseta",
      "Ser famoso cuesta más de lo que cobras",
      "Batucada colectiva",
    ],
    schedule: [
      {
        id: "no-sale-foto",
        time: "16:00-20:00",
        category: "Exposición",
        title: "Lo que no sale en la foto",
        summary:
          "Dos series sobre privacidad, estética paparazzi y artistas descartados por la industria, con QR interactivo.",
        space: "Sala de Exposiciones · Nave 1",
        meta: "Libre acceso · 25 piezas + QR",
        tags: ["fama", "privacidad", "memoria"],
      },
      {
        id: "shut-up",
        time: "16:00-17:35",
        category: "Cine / Doc",
        title: "Shut Up and Sing (2006)",
        summary:
          "Documental sobre cancelación, amenazas, boicots y odio organizado antes de que existiera Twitter.",
        space: "Sala de proyecciones · Nave 1",
        meta: "93 min · documental · debate opcional",
        tags: ["cancelación", "odio", "libertad de expresión"],
      },
      {
        id: "hit-descarte",
        time: "16:00-18:30",
        category: "Juego",
        title: "Hit o descarte",
        summary:
          "Rondas abiertas para votar fragmentos de canciones rechazadas por sellos antes de convertirse en éxitos.",
        space: "Patio 2",
        meta: "Rondas de 20 min · rotación continua",
        tags: ["historia musical", "industria", "sesgo estético"],
      },
      {
        id: "camiseta",
        time: "16:15 y 17:15",
        category: "Taller",
        title: "Pinta tu camiseta",
        summary:
          "Painting ligero sobre camiseta para diseñar una pieza propia a partir de la impresión que deja la música.",
        space: "Sala Factoría · Nave 1",
        meta: "60 min · grupos de 20",
        tags: ["cuerpo", "arte", "expresión"],
      },
      {
        id: "famoso-cuesta",
        time: "18:30-19:30",
        category: "Charla",
        title: "Ser famoso cuesta más de lo que cobras",
        summary:
          "Exartistas y managers hablan de burnout, cancelaciones, exposición constante y soledad detrás de los números.",
        space: "La Polivalent · Nave 1",
        meta: "60 min · hasta 80 personas · formato abierto",
        tags: ["fama", "salud mental", "industria"],
      },
      {
        id: "batucada",
        time: "19:00-19:30",
        category: "Instrumento",
        title: "Batucada colectiva",
        summary:
          "Cierre del festival con participantes de talleres de percusión durante los tres días y público como espectadores.",
        space: "Patio 2",
        meta: "30 min · abierto al público",
        tags: ["comunidad", "colectivo", "cierre"],
      },
    ],
  },
]

export const artists: Artist[] = [
  {
    id: "bts",
    name: "BTS",
    date: "23/10",
    time: "22:30",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "Su repertorio conecta salud mental, ansiedad y amor propio con una escala emocional capaz de cerrar el primer capítulo del festival.",
  },
  {
    id: "olivia-rodrigo",
    name: "Olivia Rodrigo",
    date: "23/10",
    time: "21:20",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "Canciones sobre presión, fragilidad y rabia adolescente que encajan con la pregunta del primer día: cómo nos sentimos por dentro.",
  },
  {
    id: "aurora",
    name: "AURORA",
    date: "23/10",
    time: "20:20",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "Una propuesta íntima y expansiva para pensar el cuerpo, la emoción y la vulnerabilidad como lugares de escucha.",
  },
  {
    id: "laufey",
    name: "Laufey",
    date: "23/10",
    time: "19:30",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "Su sensibilidad jazz-pop abre un espacio tranquilo para hablar de expectativas, amor propio y relatos personales.",
  },
  {
    id: "amaia",
    name: "Amaia",
    date: "23/10",
    time: "18:45",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "Una voz cercana al contexto hispanohablante para cerrar la parte más íntima y cotidiana del primer día.",
  },
  {
    id: "meghan-trainor",
    name: "Meghan Trainor",
    date: "24/10",
    time: "18:45",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "Su pop celebra el cuerpo desde un lugar directo y accesible, perfecto para abrir la conversación sobre belleza.",
  },
  {
    id: "hwasa",
    name: "Hwasa",
    date: "24/10",
    time: "19:30",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "Una artista que tensiona los mandatos de género e imagen dentro de una industria altamente normativizada.",
  },
  {
    id: "olivia-dean",
    name: "Olivia Dean",
    date: "24/10",
    time: "20:20",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "Una voz soul-pop que defiende la vulnerabilidad, la autenticidad y una belleza menos rígida y más humana.",
  },
  {
    id: "raye",
    name: "RAYE",
    date: "24/10",
    time: "21:20",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "Una voz clave para hablar de dismorfia, industria musical y heridas que se esconden detrás del éxito.",
  },
  {
    id: "gidle",
    name: "(G)I-DLE",
    date: "24/10",
    time: "22:30",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "El cierre explosivo del segundo día: identidad, rechazo del molde y una energía colectiva de ruptura.",
  },
  {
    id: "iu",
    name: "IU",
    date: "25/10",
    time: "18:45",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "Su trayectoria permite hablar desde dentro de la fama, la exposición pública y la relación entre artista e industria.",
  },
  {
    id: "pablo-alboran",
    name: "Pablo Alborán",
    date: "25/10",
    time: "19:30",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "Aporta una presencia cercana al público local para pensar vulnerabilidad, masculinidad y expectativas mediáticas.",
  },
  {
    id: "benson-boone",
    name: "Benson Boone",
    date: "25/10",
    time: "20:20",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "Una propuesta pop emocional para observar cómo se construyen nuevos ídolos en tiempo de redes y viralidad.",
  },
  {
    id: "the-marias",
    name: "The Marías",
    date: "25/10",
    time: "21:20",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "Su imaginario sonoro y visual conecta con la fabricación de atmósferas, deseo e imagen en la cultura pop.",
  },
  {
    id: "lana-del-rey",
    name: "Lana Del Rey",
    date: "25/10",
    time: "22:30",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary:
      "Cierra el relato del festival mirando el glamour vacío de la fama y preguntando si el sistema nos ve como personas.",
  },
]
export const artistsCarouselItems: Artist[] = [
  ...artists,
  {
    id: "sorpresa",
    name: "Sorpresa",
    date: "25/10",
    time: "Próximamente",
    stage: "NAVE 3 - ESCENARIO PRINCIPAL",
    summary: "Último hueco reservado para una confirmación especial.",
    isPlaceholder: true,
  },
]

export const artistDetails: Partial<Record<string, ArtistDetail>> = {
  bts: {
    artisticName: "BTS",
    realName: "Bangtan Sonyeondan / Beyond The Scene",
    origin: "Seúl, Corea del Sur",
    discipline: "Grupo musical, compositores, intérpretes y performers",
    genre: "K-pop, pop, hip-hop, R&B y pop alternativo",
    themeAxis: "Ansiedad, presión académica, soledad, expectativas sociales y amor propio",
    shortBio:
      "BTS es un grupo surcoreano formado por RM, Jin, SUGA, j-hope, Jimin, V y Jung Kook. Desde su debut en 2013, el grupo ha construido una carrera internacional marcada por la mezcla de pop, hip-hop y mensajes emocionales dirigidos especialmente a la juventud. A través de álbumes como The Most Beautiful Moment in Life, Wings, Love Yourself y Map of the Soul, BTS ha tratado temas como la presión social, el miedo al fracaso, la ansiedad, la identidad y la necesidad de aprender a quererse.",
    dayRelation:
      "BTS encaja en el primer día de ESCLAT porque su música habla de forma directa de muchas preocupaciones que afectan a la juventud: la presión académica, la competitividad, la soledad, la autoexigencia y la dificultad de aceptarse a uno mismo. Sus canciones no presentan el amor propio como algo simple o inmediato, sino como un proceso lleno de dudas, caídas y aprendizaje. Por eso funcionan como cierre del Día 1: después de atravesar la vulnerabilidad, la inseguridad y el crecimiento, BTS plantea que amarse a uno mismo sigue siendo posible.",
    recommendedSongs: [
      {
        title: "Spring Day",
        description: "La soledad, el duelo y la espera de que algo mejor llegue.",
      },
      {
        title: "Fake Love",
        description: "Las máscaras sociales que uno construye para encajar y la pérdida de identidad que eso genera.",
      },
      {
        title: "Black Swan",
        description: "El miedo a perder la pasión y el propósito que dan sentido a la vida.",
      },
      {
        title: "NOT TODAY",
        description: "La resistencia colectiva frente a las expectativas que aplasta la sociedad.",
      },
      {
        title: "Epiphany",
        description: "Una declaración de amor propio sin condiciones ni justificaciones.",
      },
      {
        title: "Magic Shop",
        description: "La idea de un espacio interior seguro al que acudir en los momentos más oscuros.",
      },
      {
        title: "Answer: Love Myself",
        description: "El proceso de aprender a quererse a uno mismo, con todo lo que eso implica.",
      },
      {
        title: "Life Goes On",
        description: "La resiliencia y la aceptación de lo que no podemos controlar.",
      },
      {
        title: "Young Forever",
        description: "La juventud entendida como estado emocional, no como una edad concreta.",
      },
      {
        title: "DNA",
        description: "Cierre eufórico y colectivo para despedir el primer día del festival con energía.",
      },
    ],
    festivalReason:
      "BTS representa el cierre emocional del primer día del festival. Su propuesta conecta la experiencia individual con una dimensión colectiva: no se trata solo de sentirse mal, sino de descubrir que muchas otras personas están pasando por emociones parecidas. Dentro de ESCLAT, BTS aporta un mensaje de consuelo y resistencia, recordando que la ansiedad, la soledad o la presión no definen por completo a una persona. El Día 1 termina con una idea clara: reconocerse, cuidarse y aprender a quererse también puede ser un acto de fuerza.",
    spotifyUrl: "https://open.spotify.com/search/BTS",
    videoEmbedUrl: "https://www.youtube.com/embed/MBdVXkSdhwU",
    videoTitle: "BTS - DNA",
  },
  "olivia-rodrigo": {
    artisticName: "Olivia Rodrigo",
    realName: "Olivia Isabel Rodrigo",
    origin: "Temecula, California, Estados Unidos",
    discipline: "Cantante, compositora y actriz",
    genre: "Pop-rock, pop alternativo y bedroom pop",
    themeAxis: "Autoestima, emociones intensas, desamor, comparación y presión de crecer",
    shortBio:
      "Olivia Rodrigo es una artista estadounidense que se convirtió en una de las voces más representativas de su generación tras el lanzamiento de drivers license en 2021. Su primer álbum, SOUR, conectó con millones de jóvenes por su forma directa de hablar del desamor, la inseguridad, los celos y la confusión emocional. Más tarde, con GUTS (2023), reforzó una identidad musical más cercana al pop-rock, abordando con ironía y rabia la presión de madurar, la exposición pública y la sensación de no estar a la altura de lo que se espera de una misma.",
    dayRelation:
      "Olivia Rodrigo encaja en el primer día de ESCLAT porque sus canciones expresan emociones juveniles sin suavizarlas ni pedir perdón por ellas. En su música aparecen la tristeza, la rabia, la envidia, la inseguridad y la necesidad de ser querida, emociones que muchas veces se juzgan como exageradas cuando las viven las personas jóvenes. Su obra valida esa intensidad emocional y la transforma en un lenguaje compartido.",
    recommendedSongs: [
      {
        title: "brutal",
        description: "La angustia de la adolescencia y la presión de tenerlo todo bajo control.",
      },
      {
        title: "drivers license",
        description: "El duelo emocional narrado sin dramatismo, como algo completamente real.",
      },
      {
        title: "good 4 u",
        description: "La rabia como forma legítima y sana de procesar el dolor.",
      },
      {
        title: "traitor",
        description: "La traición como experiencia que pone a prueba la confianza en una misma.",
      },
      {
        title: "vampire",
        description: "Las relaciones que drenan la autoestima sin que nos demos cuenta.",
      },
      {
        title: "lacy",
        description: "La envidia y la comparación con otras mujeres como reflejo de la propia inseguridad.",
      },
      {
        title: "the grudge",
        description: "El proceso de perdonarse a una misma, no solo a los demás.",
      },
      {
        title: "logical",
        description: "La sensación de estar atrapada en un patrón que sabes que está mal pero del que no puedes salir.",
      },
      {
        title: "making the bed",
        description: "Asumir la responsabilidad sobre el propio bienestar.",
      },
      {
        title: "all-american bitch",
        description: "Cierre explosivo contra todas las expectativas que se acumulan sobre las mujeres jóvenes.",
      },
    ],
    festivalReason:
      "Olivia Rodrigo representa la dimensión más generacional y explosiva del Día 1. Su presencia permite hablar de autoestima, comparación y presión social desde una perspectiva joven, directa y emocionalmente honesta. Dentro de ESCLAT, aporta la idea de que crecer no siempre es un proceso ordenado: a veces implica sentirse rota, enfadada o perdida, y aun así seguir construyendo una identidad propia.",
    spotifyUrl: "https://open.spotify.com/search/Olivia%20Rodrigo",
    videoEmbedUrl: "https://www.youtube.com/embed/ZmDBbnmKpqQ",
    videoTitle: "Olivia Rodrigo - drivers license",
  },
  aurora: {
    artisticName: "AURORA",
    realName: "Aurora Aksnes",
    origin: "Stavanger, Noruega",
    discipline: "Cantante, compositora y productora",
    genre: "Folk-pop etéreo, pop alternativo, synth-pop e indie pop",
    themeAxis: "Autoaceptación, sensibilidad, salud mental y sentirse diferente",
    shortBio:
      "AURORA es una artista noruega conocida por su voz delicada, su imaginario casi mágico y una forma de componer muy vinculada a la introspección emocional. Su música combina elementos de folk, pop alternativo y electrónica suave, creando un universo sonoro íntimo y envolvente. Alcanzó reconocimiento internacional con canciones como Runaway y con su primer álbum, All My Demons Greeting Me as a Friend (2016). En 2024 publicó What Happened to the Heart?, un trabajo centrado en la conexión emocional, la empatía y la vulnerabilidad.",
    dayRelation:
      "AURORA encaja en el primer día de ESCLAT porque su obra habla directamente de la diferencia, la fragilidad y la necesidad de aceptar aquello que nos hace únicos. Sus canciones suelen construir espacios seguros para quienes se sienten fuera de lugar, demasiado sensibles o incapaces de encajar en los moldes sociales. Su presencia abre el festival desde un lugar íntimo: antes de hablar del cuerpo o del sistema, ESCLAT empieza preguntando cómo nos sentimos por dentro.",
    recommendedSongs: [
      {
        title: "Runaway",
        description: "Sentirse fuera de lugar y la búsqueda de uno mismo.",
      },
      {
        title: "Exist for Love",
        description: "El amor propio como algo incondicional, no negociable.",
      },
      {
        title: "Animal",
        description: "Conectar con la propia naturaleza emocional más allá de las expectativas.",
      },
      {
        title: "Through the Eyes of a Child",
        description: "La inocencia y la autenticidad que el mundo adulto nos pide que abandonemos.",
      },
    ],
    festivalReason:
      "AURORA representa la idea de que la sensibilidad no es una debilidad, sino una forma de resistencia. Su propuesta artística convierte la rareza, la vulnerabilidad y la diferencia en belleza, conectando con el mensaje central del Día 1: aprender a mirarse con menos juicio y más compasión.",
    spotifyUrl: "https://open.spotify.com/search/AURORA",
    videoEmbedUrl: "https://www.youtube.com/embed/d_HlPboLRL8",
    videoTitle: "AURORA - Runaway",
  },
  laufey: {
    artisticName: "Laufey",
    realName: "Laufey Lín Jónsdóttir",
    origin: "Reikiavik, Islandia",
    discipline: "Cantante, compositora, multiinstrumentista y productora",
    genre: "Jazz-pop, pop clásico, bedroom pop y bossa nova",
    themeAxis: "Inseguridad, soledad juvenil, idealización del amor y vulnerabilidad emocional",
    shortBio:
      "Laufey es una artista islandesa-china que ha renovado el interés del público joven por el jazz y los sonidos clásicos. Formada en piano y violonchelo, combina referencias del jazz tradicional con letras cercanas a la experiencia adolescente y juvenil. Su música habla de enamoramientos idealizados, inseguridades, nostalgia y soledad desde una sensibilidad íntima y elegante. Con álbumes como Everything I Know About Love (2022), Bewitched (2023) y A Matter of Time (2025), ha construido una identidad artística reconocible basada en la delicadeza, la melancolía y la honestidad emocional.",
    dayRelation:
      "Laufey encaja en el primer día de ESCLAT porque sus canciones muestran una forma de malestar menos explosiva, pero igualmente importante: la soledad silenciosa, la inseguridad afectiva y la sensación de no ser suficiente. Su música retrata momentos íntimos que muchas personas jóvenes reconocen, como sentirse desplazadas, amar sin ser correspondidas o comparar la propia vida con una versión idealizada de la felicidad.",
    recommendedSongs: [
      {
        title: "Valentine",
        description: "La inseguridad romántica y la comparación con los demás como fuente de sufrimiento.",
      },
      {
        title: "From the Start",
        description: "La vulnerabilidad emocional que se guarda por miedo al rechazo.",
      },
      {
        title: "Bewitched",
        description: "La idealización del otro como forma de no mirarse a uno mismo.",
      },
      {
        title: "Everything I Know About Love",
        description: "Aprender sobre una misma a través de las relaciones que no funcionan.",
      },
    ],
    festivalReason:
      "Laufey aporta al festival una mirada suave y vulnerable sobre la salud emocional juvenil. Su propuesta demuestra que la tristeza, la timidez o la inseguridad también merecen ser escuchadas, sin necesidad de dramatizarlas ni esconderlas. Dentro del Día 1, representa ese momento íntimo en el que el público puede reconocer sus propias dudas y sentirse acompañado.",
    spotifyUrl: "https://open.spotify.com/search/Laufey",
    videoEmbedUrl: "https://www.youtube.com/embed/lSD_L-xic9o",
    videoTitle: "Laufey - From the Start",
  },
  amaia: {
    artisticName: "Amaia",
    realName: "Amaia Romero Arbizu",
    origin: "Pamplona, España",
    discipline: "Cantante, compositora y pianista",
    genre: "Indie-pop, pop alternativo y canción de autor",
    themeAxis: "Identidad, crecimiento personal, vulnerabilidad y transición a la vida adulta",
    shortBio:
      "Amaia es una artista española que se dio a conocer al gran público tras su paso por Operación Triunfo 2017, donde destacó por su naturalidad, sensibilidad musical y personalidad propia. Desde entonces ha construido una carrera alejada del pop prefabricado, apostando por una propuesta más íntima, honesta y cercana al indie-pop. En trabajos como Pero no pasa nada (2019), Cuando no sé quién soy (2022) y Si abro los ojos no es real (2025), Amaia explora dudas, contradicciones, vínculos afectivos y procesos de madurez desde una mirada sencilla pero emocionalmente precisa.",
    dayRelation:
      "Amaia encaja en el primer día de ESCLAT porque su música habla de crecer sin tener todas las respuestas. Sus canciones retratan la identidad como algo en construcción, atravesado por inseguridades, cambios y momentos de confusión. Frente a la presión de mostrarse segura o perfecta, Amaia propone una forma de honestidad más cotidiana: aceptar que no saber quién eres todavía también forma parte del proceso.",
    recommendedSongs: [
      {
        title: "El Reencuentro",
        description: "Volver a una misma después de haberse perdido por el camino.",
      },
      {
        title: "Mariana",
        description: "La vulnerabilidad y las emociones sin filtro como forma de honestidad.",
      },
      {
        title: "Nadie",
        description: "La soledad y la necesidad de conexión real en un mundo hiperconectado.",
      },
      {
        title: "La Canción Que No Quiero Cantarte",
        description: "La autodefensa emocional como acto de cuidado propio.",
      },
    ],
    festivalReason:
      "Amaia aporta al festival una perspectiva cercana y generacional sobre la búsqueda de identidad. Su presencia conecta especialmente con el público joven español, al representar el tránsito entre la adolescencia, la exposición pública y la construcción de una voz propia. Dentro del Día 1, funciona como una artista puente entre la vulnerabilidad íntima y el reconocimiento de que crecer también implica perderse.",
    spotifyUrl: "https://open.spotify.com/search/Amaia",
    videoEmbedUrl: "https://www.youtube.com/embed/TtZdKaMecHY",
    videoTitle: "Amaia, Aitana - La Canción Que No Quiero Cantarte",
  },
  "meghan-trainor": {
    artisticName: "Meghan Trainor",
    realName: "Meghan Elizabeth Trainor",
    origin: "Nantucket, Massachusetts, Estados Unidos",
    discipline: "Cantante, compositora y productora",
    genre: "Pop mainstream, doo-wop pop, dance-pop y R&B",
    themeAxis: "Aceptación corporal, confianza, autoestima y celebración del cuerpo real",
    shortBio:
      "Meghan Trainor es una artista estadounidense que alcanzó reconocimiento internacional con All About That Bass en 2014, una canción que la posicionó dentro del pop mainstream con un mensaje centrado en la aceptación corporal y la confianza en una misma. Su música se caracteriza por melodías pegadizas, estética colorida y letras directas que suelen reivindicar la autoestima, la seguridad personal y el rechazo a ciertos ideales de perfección física. A lo largo de su carrera, ha mantenido una propuesta accesible y festiva, orientada a transformar la inseguridad en energía positiva.",
    dayRelation:
      "Meghan Trainor encaja en el segundo día de ESCLAT porque introduce el tema del cuerpo desde una perspectiva celebratoria. Su música no aborda la imagen corporal desde la culpa o el dolor, sino desde la afirmación: sentirse bien, ocupar espacio y rechazar la vergüenza. En un día dedicado a los estándares de belleza, su presencia funciona como punto de partida luminoso, recordando que la aceptación corporal también puede expresarse con alegría, baile y humor.",
    recommendedSongs: [
      {
        title: "All About That Bass",
        description: "El himno de apertura perfecto: los cuerpos reales como algo que celebrar, no que esconder.",
      },
      {
        title: "Me Too",
        description: "La confianza radical en una misma como punto de partida, no como destino.",
      },
      {
        title: "Made You Look",
        description: "La belleza propia que no necesita validación ajena para existir.",
      },
      {
        title: "NO",
        description: "El rechazo de la presión externa con actitud, humor y sin dar explicaciones.",
      },
    ],
    festivalReason:
      "Meghan Trainor abre el Día 2 porque representa una primera respuesta a la presión estética: recuperar la confianza. Su propuesta conecta con un público amplio y permite iniciar la conversación sobre el cuerpo de forma accesible, pop y directa. Dentro de ESCLAT, aporta una energía positiva que prepara el terreno para discursos más críticos y combativos sobre la imagen, la belleza y los moldes que la sociedad impone.",
    spotifyUrl: "https://open.spotify.com/search/Meghan%20Trainor",
    videoEmbedUrl: "https://www.youtube.com/embed/7PCkvCPvDXk",
    videoTitle: "Meghan Trainor - All About That Bass",
  },
  hwasa: {
    artisticName: "Hwasa",
    realName: "Ahn Hye-jin",
    origin: "Jeonju, Corea del Sur",
    discipline: "Cantante, compositora, rapera y performer",
    genre: "K-pop, R&B, pop y hip-hop",
    themeAxis: "Ruptura de estándares de belleza, confianza corporal, libertad femenina y desafío a la norma",
    shortBio:
      "Hwasa es una artista surcoreana conocida tanto por su carrera en solitario como por formar parte del grupo MAMAMOO. Desde su debut, ha destacado por una presencia escénica poderosa y una imagen pública que desafía los cánones de belleza más rígidos de la industria del K-pop. Su propuesta mezcla pop, R&B y hip-hop con una actitud desafiante, sensual y segura de sí misma. A lo largo de su carrera, Hwasa se ha convertido en una figura especialmente significativa por defender una feminidad libre, no complaciente y alejada de la perfección impuesta.",
    dayRelation:
      "Hwasa encaja en el segundo día de ESCLAT porque representa una confrontación directa con los estándares de belleza, especialmente dentro del contexto asiático, donde la presión estética sobre las mujeres artistas es especialmente intensa. Su imagen y su música cuestionan la idea de que una mujer deba verse, comportarse o expresarse de una única manera para ser aceptada. En el recorrido del Día 2, su presencia marca el paso de la aceptación corporal hacia una postura más desafiante y liberadora.",
    recommendedSongs: [
      {
        title: "Maria",
        description: "La aceptación corporal radical de alguien a quien la industria intentó cambiar y no lo consiguió.",
      },
      {
        title: "Twit",
        description: "Una crítica directa al juicio constante sobre el cuerpo y las decisiones femeninas.",
      },
      {
        title: "I'm Bad",
        description: "La confianza en una misma sin pedir permiso ni ofrecer disculpas.",
      },
      {
        title: "Egotistic",
        description: "El llamado egoísmo de quererse y priorizarse como acto político y necesario.",
      },
    ],
    festivalReason:
      "Hwasa forma parte de ESCLAT porque convierte el cuerpo en un espacio de resistencia frente a la mirada ajena. Su presencia amplía la conversación del festival hacia una dimensión cultural e industrial, mostrando cómo los estándares de belleza también son mecanismos de control. Dentro del Día 2, aporta fuerza, provocación y libertad, defendiendo la idea de que romper el molde no solo es posible, sino necesario.",
    spotifyUrl: "https://open.spotify.com/search/Hwasa",
    videoEmbedUrl: "https://www.youtube.com/embed/brZRDjFIFJs",
    videoTitle: "Hwasa - Maria",
  },
  "olivia-dean": {
    artisticName: "Olivia Dean",
    realName: "Olivia Lauryn Dean",
    origin: "Londres, Reino Unido",
    discipline: "Cantante y compositora",
    genre: "Soul pop, neo-soul, R&B y pop alternativo",
    themeAxis: "Amor propio, vulnerabilidad emocional, identidad femenina, relaciones afectivas y belleza desde la autenticidad",
    shortBio:
      "Olivia Dean es una cantante y compositora británica nacida en Londres. Su música combina soul, pop y R&B con una sensibilidad cálida, elegante y profundamente emocional. Formada en la BRIT School, comenzó a ganar reconocimiento con canciones como The Hardest Part, Dive y Slowly, y consolidó su identidad artística con su álbum Messy, nominado al Mercury Prize. Más adelante, su segundo álbum, The Art of Loving, reforzó su imagen como una de las voces más destacadas del soul pop contemporáneo, centrada en explorar el amor, la vulnerabilidad y las relaciones humanas desde una mirada íntima y honesta.",
    dayRelation:
      "Olivia Dean encaja en el segundo día de ESCLAT porque propone una forma de belleza alejada de la perfección artificial y de los estándares rígidos. Su música habla de quererse, equivocarse, sanar, desear y sentirse insegura sin convertir esas emociones en debilidad. Frente a una cultura que muchas veces exige a las mujeres mostrarse siempre seguras, atractivas y emocionalmente controladas, Olivia Dean reivindica la vulnerabilidad como una forma de fuerza. Su estética suave, natural y elegante permite hablar del cuerpo y de la identidad femenina desde la calma, la sensibilidad y la autenticidad.",
    recommendedSongs: [
      {
        title: "Dive",
        description: "El deseo y la entrega afectiva desde una mirada luminosa, libre y segura.",
      },
      {
        title: "The Hardest Part",
        description: "El crecimiento personal después de una ruptura y la aceptación de una nueva versión de una misma.",
      },
      {
        title: "Slowly",
        description: "La importancia de respetar los propios tiempos emocionales en el amor y en la vida.",
      },
      {
        title: "Messy",
        description: "La reivindicación de ser imperfecta, contradictoria y humana sin pedir perdón por ello.",
      },
    ],
    festivalReason:
      "Olivia Dean aporta al Día 2 una perspectiva íntima, emocional y contemporánea sobre los estándares de belleza. Su presencia permite ampliar el discurso del festival más allá de la crítica directa al cuerpo femenino, incorporando también la presión emocional que existe sobre las mujeres: ser deseables, estar bien, amar correctamente y mostrarse siempre completas. Dentro de ESCLAT, Olivia Dean funciona como una voz que defiende la belleza de lo imperfecto, lo sensible y lo real, conectando con una generación que busca referentes más honestos y menos idealizados.",
    spotifyUrl: "https://open.spotify.com/search/Olivia%20Dean",
    videoEmbedUrl: "https://www.youtube.com/embed/NM4e606yFJg",
    videoTitle: "Olivia Dean - Dive",
  },
  raye: {
    artisticName: "RAYE",
    realName: "Rachel Agatha Keen",
    origin: "Londres, Reino Unido",
    discipline: "Cantante, compositora y productora",
    genre: "R&B-pop, soul, pop alternativo, dance-pop y jazz-pop",
    themeAxis: "Imagen corporal, abuso, industria musical, dismorfia, autoestima y reclamarse a una misma",
    shortBio:
      "RAYE es una artista británica que ha construido una carrera marcada por la honestidad emocional y la denuncia de las dinámicas abusivas dentro de la industria musical. Tras años escribiendo para otros artistas y enfrentarse a limitaciones por parte de su antigua discográfica, logró publicar de forma independiente su álbum My 21st Century Blues (2023), un trabajo profundamente personal en el que aborda temas como el abuso, la adicción, la explotación, la imagen corporal y la recuperación de la propia voz. Su música combina R&B, pop, soul y jazz con letras directas, vulnerables y muy críticas.",
    dayRelation:
      "RAYE encaja en el segundo día de ESCLAT porque lleva el discurso sobre el cuerpo a un lugar más oscuro y estructural. Su obra muestra cómo la industria no solo vende imágenes perfectas, sino que también moldea, presiona y consume los cuerpos de las artistas. Canciones como Body Dysmorphia permiten hablar de la relación dañina con la propia imagen, no como un problema individual, sino como consecuencia de un sistema que convierte el cuerpo en producto, comparación y exigencia constante.",
    recommendedSongs: [
      {
        title: "Hard Out Here",
        description: "Apertura que golpea: una crítica directa a la industria que controla y juzga la imagen femenina.",
      },
      {
        title: "Body Dysmorphia",
        description: "Nombrar el trastorno en voz alta, sin vergüenza y sin filtros, delante de miles de personas.",
      },
      {
        title: "Ice Cream Man",
        description: "El abuso que se esconde detrás de la industria que vende belleza y éxito.",
      },
      {
        title: "Black Mascara",
        description: "La autodestrucción como respuesta al trauma estético y emocional acumulado.",
      },
      {
        title: "Escapism",
        description: "Huir del espejo, de las expectativas y de una misma como única salida aparente.",
      },
      {
        title: "Flip a Switch",
        description: "La disociación emocional como mecanismo de supervivencia frente a la presión.",
      },
      {
        title: "Prada",
        description: "La belleza como mercancía que no define el valor real de una persona.",
      },
      {
        title: "Five Star Amenities",
        description: "El arte como único espacio donde el cuerpo deja de ser juzgado y medido.",
      },
      {
        title: "Worth It",
        description: "La convicción de que la lucha por reclamar el propio cuerpo y el propio arte tiene sentido.",
      },
      {
        title: "My 1st and Worst Heartbreak",
        description: "Cierre íntimo y catártico que deja espacio para respirar antes del tramo final.",
      },
    ],
    festivalReason:
      "RAYE forma parte de ESCLAT porque representa el momento en el que la aceptación corporal deja de ser solo una cuestión de confianza personal y se convierte en una denuncia. Su presencia conecta el Día 2 con el Día 3, ya que señala directamente a la industria y a sus mecanismos de control. Dentro del festival, aporta una voz cruda y necesaria: la de una artista que no solo habla de dolor, sino también de recuperar el poder sobre su cuerpo, su relato y su identidad.",
    spotifyUrl: "https://open.spotify.com/search/RAYE",
    videoEmbedUrl: "https://www.youtube.com/embed/Dll6VJ2C7wo",
    videoTitle: "RAYE, 070 Shake - Escapism.",
  },
  gidle: {
    artisticName: "(G)I-DLE",
    realName: "Miyeon, Minnie, Soyeon, Yuqi y Shuhua",
    realNameLabel: "Integrantes",
    origin: "Seúl, Corea del Sur",
    discipline: "Grupo musical, compositoras, intérpretes y performers",
    genre: "K-pop, pop, hip-hop, dance-pop y pop alternativo",
    themeAxis: "Sexualización, estándares impuestos, presión estética, autonomía femenina y rechazo colectivo",
    shortBio:
      "(G)I-DLE es un grupo femenino surcoreano formado por Miyeon, Minnie, Soyeon, Yuqi y Shuhua. Desde su debut en 2018, el grupo ha destacado dentro del K-pop por su fuerte implicación creativa, especialmente a través de Soyeon, líder y principal productora de muchas de sus canciones. Su propuesta combina pop, hip-hop, electrónica y teatralidad visual, con conceptos que suelen cuestionar la feminidad normativa, la sexualización y las expectativas impuestas sobre las mujeres. Canciones como TOMBOY, Nxde o Queencard han consolidado al grupo como una voz crítica y explosiva dentro del pop coreano.",
    dayRelation:
      "(G)I-DLE encaja en el segundo día de ESCLAT porque convierte la crítica a los estándares de belleza en una respuesta colectiva, directa y performativa. Su música no se limita a hablar de inseguridad corporal, sino que ataca los moldes que la producen: la obligación de ser deseable, perfecta, femenina de una forma concreta y constantemente disponible para la mirada ajena. Como cierre del Día 2, el grupo transforma la reflexión individual sobre el cuerpo en un rechazo compartido y contundente.",
    recommendedSongs: [
      {
        title: "TOMBOY",
        description: "Apertura explosiva: el rechazo frontal de la imagen femenina que la industria exige y el sistema premia.",
      },
      {
        title: "Nxde",
        description: "Una crítica directa y sin eufemismos a quien sexualiza y comercializa el cuerpo femenino.",
      },
      {
        title: "QUEENCARD",
        description: "La confianza corporal como respuesta política y cultural a los estándares impuestos.",
      },
      {
        title: "Wife",
        description: "La deconstrucción del ideal de mujer perfecta que la sociedad lleva siglos fabricando.",
      },
      {
        title: "VILLAIN DIES",
        description: "La industria que dicta cómo debemos vernos tratada como el villano que merece caer.",
      },
      {
        title: "Oh my god",
        description: "La dualidad entre la imagen que se proyecta hacia fuera y la persona real que hay dentro.",
      },
      {
        title: "FATE",
        description: "Decidir la propia imagen es decidir el propio destino, y eso nadie puede quitártelo.",
      },
      {
        title: "Super Lady",
        description: "Himno colectivo de empoderamiento sin matices, sin excusas y sin pedir permiso.",
      },
      {
        title: "Lion",
        description: "La fuerza que nace cuando las mujeres se unen frente a quien las quiere divididas y controladas.",
      },
      {
        title: "I AM",
        description: "Cierre del día: una declaración de identidad plena y libre frente a cualquier estándar externo.",
      },
    ],
    festivalReason:
      "(G)I-DLE cierra el segundo día porque representa la ruptura definitiva del molde. Después de pasar por la aceptación, la confianza, la crítica feminista y la denuncia de la industria, su propuesta lleva el discurso a una explosión colectiva: no se trata solo de aprender a quererse dentro del sistema, sino de cuestionar por qué ese sistema existe. Dentro de ESCLAT, (G)I-DLE aporta rabia, ironía y poder escénico, cerrando el Día 2 con una idea clara: los estándares impuestos no se negocian, se rompen.",
    spotifyUrl: "https://open.spotify.com/search/%28G%29I-DLE",
    videoEmbedUrl: "https://www.youtube.com/embed/Jh4QFaPmdss",
    videoTitle: "(G)I-DLE - TOMBOY",
  },
  iu: {
    artisticName: "IU",
    realName: "Lee Ji-eun",
    origin: "Seúl, Corea del Sur",
    discipline: "Cantante, compositora, actriz e intérprete",
    genre: "K-pop, pop, R&B, balada y folk-pop",
    themeAxis: "Odio en internet, celebridad, imagen pública, presión mediática y construcción externa de la identidad",
    shortBio:
      "IU es una artista surcoreana considerada una de las figuras más influyentes y respetadas de la industria musical coreana. Debutó siendo adolescente y ha desarrollado una carrera amplia como cantante, compositora y actriz, combinando popularidad masiva con una fuerte identidad artística. Su obra suele explorar la vulnerabilidad, el paso del tiempo, la soledad y la relación entre la persona real y la figura pública. Al haber crecido dentro de una industria altamente exigente y expuesta, IU representa de forma clara el impacto emocional de ser observada, juzgada y reinterpretada constantemente por el público y los medios.",
    dayRelation:
      "IU encaja en el tercer día de ESCLAT porque permite hablar del trato que reciben las celebridades, especialmente en contextos donde la imagen pública se vigila con enorme intensidad. Su trayectoria muestra cómo una artista puede ser convertida en símbolo, ideal o blanco de críticas, muchas veces más allá de su propia voluntad. En el marco del Día 3, IU ayuda a cuestionar cómo internet, los medios y los fans construyen narrativas sobre las personas famosas sin tener en cuenta su humanidad.",
    recommendedSongs: [
      {
        title: "Celebrity",
        description: "Apertura perfecta: el trato deshumanizante a las personas públicas narrado desde quien lo ha vivido en primera persona.",
      },
      {
        title: "BBIBBI",
        description: "Reclamar el propio espacio y la propia narrativa frente a quien opina sin que nadie le haya preguntado.",
      },
      {
        title: "Palette",
        description: "Crecer en público y aprender, con el tiempo, a no dejarse definir por lo que los demás esperan.",
      },
      {
        title: "Lilac",
        description: "Despedirse de una etapa impuesta por otros y elegir libremente la siguiente.",
      },
      {
        title: "strawberry moon",
        description: "La intimidad que la fama intenta arrebatarte y que merece la pena proteger.",
      },
      {
        title: "Through the Night",
        description: "La vulnerabilidad real que contrasta con la imagen perfecta y controlada que se proyecta.",
      },
      {
        title: "Good Day",
        description: "La alegría como acto de resistencia frente al escrutinio constante al que se somete a las celebridades.",
      },
      {
        title: "Blueming",
        description: "Florecer en los márgenes que el sistema no logra controlar ni colonizar.",
      },
      {
        title: "Above the Time",
        description: "La artista que permanece cuando el personaje mediático se desvanece con el paso del tiempo.",
      },
      {
        title: "Love wins all",
        description: "Cierre esperanzador: lo humano y lo genuino sobreviven al sistema que intenta borrarlo.",
      },
    ],
    festivalReason:
      "IU forma parte de ESCLAT porque encarna una de las preguntas centrales del tercer día: quién tiene derecho a definir la identidad de una persona pública. Su música y su trayectoria permiten reflexionar sobre el odio en internet, la presión de mantener una imagen perfecta y el desgaste de vivir bajo interpretación constante. Dentro del festival, IU aporta una mirada sensible y madura sobre la fama, recordando que detrás de cada celebridad hay una persona cuya identidad no debería ser fabricada únicamente desde fuera.",
    spotifyUrl: "https://open.spotify.com/search/IU",
    videoEmbedUrl: "https://www.youtube.com/embed/0-q1KafFCLU",
    videoTitle: "IU - Celebrity",
  },
  "pablo-alboran": {
    artisticName: "Pablo Alborán",
    realName: "Pablo Moreno de Alborán Ferrándiz",
    origin: "Málaga, España",
    discipline: "Cantante, compositor y músico",
    genre: "Pop español, pop latino, balada y canción de autor",
    themeAxis: "Presión mediática, identidad pública, exposición, vulnerabilidad y coste personal de la fama",
    shortBio:
      "Pablo Alborán es uno de los artistas más reconocidos del pop español contemporáneo. Se dio a conocer a comienzos de la década de 2010 gracias a canciones íntimas y emotivas como Solamente tú, construyendo una carrera basada en la sensibilidad vocal, la composición romántica y una relación cercana con el público. A lo largo de los años, su figura pública ha estado marcada por la exposición mediática, la expectativa constante y la gestión de una identidad personal observada por millones de personas. Su música, aunque muchas veces vinculada al amor y al desamor, también permite leer la vulnerabilidad de quien vive bajo una mirada pública continua.",
    dayRelation:
      "Pablo Alborán encaja en el tercer día de ESCLAT porque permite abordar el coste emocional de la exposición desde una perspectiva cercana al público español. Su trayectoria muestra cómo la fama no solo implica reconocimiento, sino también presión, vigilancia y dificultad para separar la persona del personaje público. En un día dedicado a cuestionar la industria y los sistemas mediáticos, su presencia introduce una mirada íntima sobre lo que significa ser observado constantemente.",
    recommendedSongs: [
      {
        title: "Saturno",
        description: "El peso invisible de cargarlo todo en silencio mientras el mundo te observa bajo los focos.",
      },
      {
        title: "Prometo",
        description: "La promesa de seguir siendo uno mismo pese a la presión constante de la exposición pública.",
      },
      {
        title: "Pasos de cero",
        description: "La necesidad de reiniciarse después de que el sistema te haya consumido por completo.",
      },
      {
        title: "Recuérdame",
        description: "La persona real que existe detrás del personaje mediático que otros han construido.",
      },
    ],
    festivalReason:
      "Pablo Alborán abre el Día 3 porque conecta el discurso sobre la industria con un referente cercano y reconocible. Su presencia permite iniciar la jornada desde una emoción accesible antes de avanzar hacia críticas más explícitas al sistema mediático y al consumo de celebridades. Dentro de ESCLAT, representa la idea de que detrás de una imagen pública hay una persona que también carga con expectativas, silencios y desgaste emocional.",
    spotifyUrl: "https://open.spotify.com/search/Pablo%20Albor%C3%A1n",
    videoEmbedUrl: "https://www.youtube.com/embed/yBAx5nBdJqU",
    videoTitle: "Pablo Alborán - Saturno",
  },
  "benson-boone": {
    artisticName: "Benson Boone",
    realName: "Benson James Boone",
    origin: "Monroe, Washington, Estados Unidos",
    discipline: "Cantante, compositor y músico",
    genre: "Pop-rock, pop alternativo y power ballad",
    themeAxis: "Fama joven, exposición viral, identidad pública, presión mediática y crecimiento bajo los focos",
    shortBio:
      "Benson Boone es un artista estadounidense que alcanzó gran visibilidad a través de las redes sociales y plataformas digitales, convirtiéndose en una de las voces emergentes del pop-rock contemporáneo. Su música combina grandes melodías emocionales, baladas intensas y una interpretación vocal muy expresiva. Con canciones como Ghost Town, In the Stars y Beautiful Things, ha conectado con un público joven que consume música de forma inmediata, viral y profundamente emocional. Su trayectoria representa una nueva forma de fama: rápida, global y muy ligada a la exposición constante en internet.",
    dayRelation:
      "Benson Boone encaja en el tercer día de ESCLAT porque permite hablar de cómo se construye una identidad artística en la era de la viralidad. Su figura muestra que la fama joven ya no depende únicamente de la industria tradicional, sino también de algoritmos, redes sociales, expectativas del público y consumo acelerado. En este contexto, el artista no solo debe cantar o componer, sino también sostener una imagen pública permanente ante millones de miradas.",
    recommendedSongs: [
      {
        title: "Beautiful Things",
        description: "El miedo a perder lo que eres cuando la fama llega de golpe y sin manual de instrucciones.",
      },
      {
        title: "Ghost Town",
        description: "La soledad profunda que se esconde detrás del éxito y de la imagen pública perfecta.",
      },
      {
        title: "In the Stars",
        description: "La búsqueda de autenticidad en un entorno donde todo el mundo te observa y te evalúa.",
      },
      {
        title: "Slow It Down",
        description: "La industria que te empuja más rápido de lo que cualquier persona puede procesar o asimilar.",
      },
    ],
    festivalReason:
      "Benson Boone forma parte del Día 3 porque representa la presión de convertirse en figura pública en muy poco tiempo. Su presencia introduce una dimensión generacional al debate sobre la fama: la exposición ya no llega solo a través de entrevistas o televisión, sino también mediante vídeos virales, comentarios, cifras y tendencias. Dentro de ESCLAT, aporta una mirada sobre el coste de crecer como artista cuando la identidad se construye bajo los focos desde el primer momento.",
    spotifyUrl: "https://open.spotify.com/search/Benson%20Boone",
    videoEmbedUrl: "https://www.youtube.com/embed/Oa_RSwwpPaA",
    videoTitle: "Benson Boone - Beautiful Things",
  },
  "the-marias": {
    artisticName: "The Marías",
    realName: "María Zardoya y Josh Conway",
    realNameLabel: "Integrantes",
    origin: "Los Ángeles, California, Estados Unidos",
    discipline: "Grupo musical, compositores, intérpretes y productores",
    genre: "Dream-pop, indie pop, psychedelic soul y pop alternativo",
    themeAxis: "Glamour, imagen construida, deseo, melancolía y lo que se esconde bajo la apariencia",
    shortBio:
      "The Marías es una banda estadounidense liderada por María Zardoya y Josh Conway, reconocida por su sonido elegante, atmosférico y cinematográfico. Su música mezcla dream-pop, soul psicodélico, indie y elementos latinos, creando una estética sofisticada donde el glamour aparece siempre acompañado de una sensación de distancia, misterio y vulnerabilidad. A través de álbumes como Cinema (2021) y Submarine (2024), el grupo ha construido un universo visual y sonoro muy marcado, en el que la belleza funciona tanto como refugio como máscara.",
    dayRelation:
      "The Marías encajan en el tercer día de ESCLAT porque permiten hablar de la imagen artística como una construcción cuidadosamente diseñada. Su propuesta juega con la elegancia, el deseo y la estética cinematográfica, pero bajo esa superficie aparece una emoción más frágil: soledad, nostalgia, desorientación y ruptura. En un día dedicado a cuestionar la industria y la fabricación de identidades públicas, The Marías muestran que el glamour puede ser una ilusión hermosa, pero también una capa que oculta lo que hay debajo.",
    recommendedSongs: [
      {
        title: "Ruthless",
        description: "La industria que te pide que te moldees o directamente desaparezcas sin dejar rastro.",
      },
      {
        title: "Calling U Back",
        description: "La nostalgia de quien eras antes de convertirte en un producto para el consumo masivo.",
      },
      {
        title: "All I Really Want Is You",
        description: "La conexión humana real como antídoto frente a la imagen fabricada y vacía.",
      },
      {
        title: "Buenos Aires",
        description: "La identidad que persiste y resiste pese a todo lo que el sistema intenta hacer de ti.",
      },
    ],
    festivalReason:
      "The Marías forman parte de ESCLAT porque aportan una lectura más estética y sensorial del sistema de la fama. Su música permite observar cómo la industria construye imágenes deseables, sofisticadas y aparentemente perfectas, mientras la experiencia emocional que las sostiene puede ser mucho más ambigua. Dentro del Día 3, funcionan como un puente entre la exposición mediática y la crítica final al glamour vacío que cerrará la jornada.",
    spotifyUrl: "https://open.spotify.com/search/The%20Mar%C3%ADas",
    videoEmbedUrl: "https://www.youtube.com/embed/3moMHMhiq7c",
    videoTitle: "The Marías - Ruthless",
  },
  "lana-del-rey": {
    artisticName: "Lana Del Rey",
    realName: "Elizabeth Woolridge Grant",
    origin: "Nueva York, Estados Unidos",
    discipline: "Cantante, compositora, poeta e intérprete",
    genre: "Art-pop, dream-pop, chamber pop, indie pop y pop alternativo",
    themeAxis: "Glamour vacío, fama triste, idealización tóxica, nostalgia mediática y construcción de la imagen pública",
    shortBio:
      "Lana Del Rey es una artista estadounidense reconocida por haber construido un universo musical y visual profundamente cinematográfico, melancólico y crítico con los imaginarios de la fama. Desde el impacto de Born to Die (2012), su obra ha explorado el glamour decadente, el deseo, la tristeza, la idealización romántica y la relación entre belleza y destrucción. A través de álbumes como Ultraviolence, Norman Fucking Rockwell! y Did you know that there’s a tunnel under Ocean Blvd, Lana ha convertido la estética de la celebridad, el sueño americano y la feminidad idealizada en materia artística compleja y ambigua.",
    dayRelation:
      "Lana Del Rey encaja en el cierre del tercer día de ESCLAT porque su obra sintetiza muchas de las preguntas del festival sobre fama, industria e imagen pública. Su música muestra cómo el glamour puede funcionar como una promesa vacía: una superficie bella que esconde soledad, dependencia, desgaste y tristeza. En sus canciones, la idealización no aparece como algo inocente, sino como una fuerza tóxica que consume tanto a quien mira como a quien es mirada.",
    recommendedSongs: [
      {
        title: "Video Games",
        description: "Apertura hipnótica: la idealización romántica y mediática como trampa de la que es casi imposible salir.",
      },
      {
        title: "Ride",
        description: "Vivir al margen del sistema que no te entiende y no tiene categoría para lo que eres.",
      },
      {
        title: "Born To Die",
        description: "El glamour como destino trágico fabricado desde fuera y asumido como propio.",
      },
      {
        title: "Pretty When You Cry",
        description: "La industria que consume y espectaculariza el dolor femenino como producto de entretenimiento.",
      },
      {
        title: "Gods and Monsters",
        description: "Hollywood y la maquinaria de la fama como sistema que devora personas y escupe iconos.",
      },
      {
        title: "Hope is a Dangerous Thing",
        description: "El coste psicológico real de sobrevivir durante años en el escaparate público.",
      },
      {
        title: "The Greatest",
        description: "El declive de una industria que prometió todo y no cumplió nada de lo que prometió.",
      },
      {
        title: "Chemtrails Over the Country Club",
        description: "Escapar del personaje que te han construido y volver, por fin, a ser una persona.",
      },
      {
        title: "Mariners Apartment Complex",
        description: "Reclamar la propia narrativa después de que otros la hayan escrito durante demasiado tiempo.",
      },
      {
        title: "Young and Beautiful",
        description: "Cierre del festival y del relato: me querrán cuando deje de ser el producto?",
      },
    ],
    festivalReason:
      "Lana Del Rey cierra ESCLAT porque representa el punto final del recorrido: después de mirar hacia dentro, hacia el cuerpo y hacia la industria, su propuesta muestra el resultado emocional de un sistema que convierte la belleza, el deseo y la fama en productos. Su presencia permite cerrar el festival con una pregunta incómoda: si la industria construye imágenes perfectas para consumirlas, en qué momento deja de ver a las personas que hay detrás? Dentro de ESCLAT, Lana aporta una conclusión melancólica y crítica: el glamour puede brillar mucho, pero también puede estar profundamente vacío.",
    spotifyUrl: "https://open.spotify.com/search/Lana%20Del%20Rey",
    videoEmbedUrl: "https://www.youtube.com/embed/cE6wxDqdOV0",
    videoTitle: "Lana Del Rey - Video Games",
  },
}

export const programBlocks: ProgramBlock[] = [
  {
    id: "talleres",
    title: "Talleres.",
    summary:
      "Producción musical, collage, maquillaje, movimiento y creación de objetos para transformar los temas del festival en práctica.",
  },
  {
    id: "cine-doc",
    title: "Cine y doc.",
    summary:
      "Proyecciones de ficción y documental con debate opcional para abrir conversación antes de las charlas.",
  },
  {
    id: "exposiciones",
    title: "Exposiciones.",
    summary:
      "Tres exposiciones fotográficas sobre salud mental, cuerpo, fama, privacidad e industria musical.",
  },
  {
    id: "charlas",
    title: "Charlas.",
    summary:
      "Conversaciones en La Polivalent con formato abierto, preguntas del público y enfoque accesible.",
  },
  {
    id: "instrumentos",
    title: "Instrumentos.",
    summary:
      "Talleres de batería reducida, djembé, ukulele, flauta, percusión latina, teclado y batucada final.",
  },
  {
    id: "escucha",
    title: "Cuarto de escucha.",
    summary:
      "Una instalación permanente: cinco minutos de audio, una palabra en el mural y una memoria colectiva en crecimiento.",
  },
]

export const festivalSpaces: FestivalSpace[] = [
  {
    id: "polivalent",
    name: "La Polivalent",
    location: "Nave 1, planta baja",
    summary: "El espacio principal para charlas y conversaciones con formato abierto al debate.",
    capacity: "Hasta 80 personas",
    use: "Charlas principales",
    assetHint: "public/img/spaces/polivalent.webp",
  },
  {
    id: "exposiciones",
    name: "Sala de Exposiciones",
    location: "Nave 1, planta baja",
    summary: "Acoge una exposición fotográfica diferente cada día, siempre vinculada al tema de la jornada.",
    capacity: "Hasta 60 personas",
    use: "Exposiciones",
    assetHint: "public/img/spaces/sala-exposiciones.webp",
  },
  {
    id: "proyecciones",
    name: "Sala de proyecciones",
    location: "Nave 1",
    summary: "Dos proyecciones por día con debate opcional al terminar.",
    capacity: "Hasta 40 personas",
    use: "Cine y documental",
    assetHint: "public/img/spaces/sala-proyecciones.webp",
  },
  {
    id: "factoria",
    name: "Sala Factoría",
    location: "Nave 1, 1ª planta",
    summary: "Talleres participativos de producción musical, maquillaje, juego y creación textil.",
    capacity: "Hasta 48 personas",
    use: "Talleres A",
    assetHint: "public/img/spaces/sala-factoria.webp",
  },
  {
    id: "visual-room",
    name: "Sala Visual Room",
    location: "Nave 1, 1ª planta",
    summary: "Talleres más íntimos y reflexivos, además de instalación interactiva.",
    capacity: "Hasta 30 personas",
    use: "Talleres B",
    assetHint: "public/img/spaces/visual-room.webp",
  },
  {
    id: "patios",
    name: "Patios exteriores",
    location: "Patio 1 y Patio 2",
    summary: "Instrumentos en rotación continua, juegos abiertos y batucada colectiva de cierre.",
    capacity: "Rotación continua",
    use: "Instrumentos y cierre",
    assetHint: "public/img/spaces/patios.webp",
  },
]

export const ticketOptions: TicketOption[] = [
  {
    id: "libre",
    name: "Acceso libre",
    description: "Conciertos, exposiciones, proyecciones, cuarto de escucha, stands y zonas comunes.",
    access: "Gratis · sin reserva",
  },
  {
    id: "talleres",
    name: "Talleres",
    description: "Talleres temáticos y talleres de instrumento con plazas limitadas.",
    access: "Gratis · inscripción previa",
  },
  {
    id: "grupo",
    name: "Grupo educativo",
    description: "Consulta de asistencia para grupos o necesidades concretas de accesibilidad.",
    access: "Gratis · contacto",
  },
]

export const accessSteps: AccessStep[] = [
  {
    id: "consulta",
    title: "Consulta el programa",
    summary: "Cada día tiene tema, talleres y charla propia. Elige lo que más te interesa.",
  },
  {
    id: "inscribete",
    title: "Inscríbete a talleres",
    summary: "Las plazas son gratuitas y limitadas. La inscripción abre una semana antes del festival.",
  },
  {
    id: "llega",
    title: "Llega a Las Naves",
    summary: "El festival abre a las 16:00 h. El acceso general es libre hasta completar aforo.",
  },
  {
    id: "participa",
    title: "Participa a tu ritmo",
    summary: "Puedes venir un día, dos o los tres, entrar y salir sin un recorrido obligatorio.",
  },
]

export const safetyRules: SafetyRule[] = [
  {
    id: "seguro",
    title: "Espacio seguro",
    summary: "No se toleran actitudes discriminatorias ni comportamientos que incomoden a otras personas.",
  },
  {
    id: "puntualidad",
    title: "Puntualidad en talleres",
    summary: "Si te has inscrito y no puedes venir, cancela tu plaza para que otra persona pueda asistir.",
  },
  {
    id: "movil",
    title: "Móvil en silencio",
    summary: "Durante talleres, charlas y proyecciones. En el cuarto de escucha, guardado del todo.",
  },
  {
    id: "foto",
    title: "Fotografía con respeto",
    summary: "Puedes fotografiar espacios y exposiciones, pero no a otras personas sin consentimiento.",
  },
  {
    id: "espacio",
    title: "Cuida el espacio",
    summary: "Usa los contenedores de reciclaje y trata el material del festival con cuidado.",
  },
  {
    id: "accesibilidad",
    title: "Accesibilidad",
    summary: "Si tienes una necesidad específica, escribe antes del festival para poder ayudarte.",
  },
]

export const faqs: FaqItem[] = [
  {
    id: "reserva",
    question: "¿Hay que reservar plaza para todo?",
    answer:
      "No. Los conciertos, exposiciones, proyecciones, el cuarto de escucha, la zona de stands y los espacios comunes son de libre acceso hasta completar aforo. Solo los talleres requieren inscripción previa.",
  },
  {
    id: "inscripciones",
    question: "¿Cuándo abren las inscripciones a los talleres?",
    answer:
      "Las inscripciones abren una semana antes del festival a través de esta web. Recomendamos no esperar al último momento porque las plazas son limitadas.",
  },
  {
    id: "experiencia",
    question: "¿Necesito experiencia para los talleres de instrumento?",
    answer:
      "No. Están diseñados para personas sin experiencia previa. Lo único que necesitas es ganas de participar.",
  },
  {
    id: "dia",
    question: "¿Puedo asistir solo un día?",
    answer:
      "Sí. Cada día funciona de forma independiente con su propio tema, talleres y charla. Puedes venir los tres días o solo el que más te interese.",
  },
  {
    id: "edad",
    question: "¿Hay límite de edad?",
    answer:
      "El festival es apto para mayores de 16 años. Menores de 16 pueden asistir acompañados de una persona adulta.",
  },
  {
    id: "comida",
    question: "¿Hay comida en el recinto?",
    answer:
      "Sí. Los food trucks y la zona de bebidas están abiertos durante todo el horario del festival en los pasillos entre Nave 1 y Nave 3.",
  },
  {
    id: "lluvia",
    question: "¿Qué pasa si llueve?",
    answer:
      "La mayoría de actividades son en interior. Los talleres de instrumento en patios exteriores se trasladarán a espacios cubiertos si el tiempo no acompaña.",
  },
  {
    id: "contacto",
    question: "¿Puedo contactar con la organización?",
    answer:
      "Sí. Escríbenos a hola@esclat.es o por Instagram. Respondemos en menos de 48 horas.",
  },
]
