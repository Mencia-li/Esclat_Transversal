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
  claim: "Las cosas que crecen dentro hasta terminar por esclatar.",
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
    stage: "Escenario principal",
    summary:
      "Su repertorio conecta salud mental, ansiedad y amor propio con una escala emocional capaz de cerrar el primer capítulo del festival.",
  },
  {
    id: "olivia-rodrigo",
    name: "Olivia Rodrigo",
    date: "23/10",
    time: "21:20",
    stage: "Escenario principal",
    summary:
      "Canciones sobre presión, fragilidad y rabia adolescente que encajan con la pregunta del primer día: cómo nos sentimos por dentro.",
  },
  {
    id: "aurora",
    name: "AURORA",
    date: "23/10",
    time: "20:20",
    stage: "La Polivalent",
    summary:
      "Una propuesta íntima y expansiva para pensar el cuerpo, la emoción y la vulnerabilidad como lugares de escucha.",
  },
  {
    id: "laufey",
    name: "Laufey",
    date: "23/10",
    time: "19:30",
    stage: "La Polivalent",
    summary:
      "Su sensibilidad jazz-pop abre un espacio tranquilo para hablar de expectativas, amor propio y relatos personales.",
  },
  {
    id: "amaia",
    name: "Amaia",
    date: "23/10",
    time: "18:45",
    stage: "Escenario patio",
    summary:
      "Una voz cercana al contexto hispanohablante para cerrar la parte más íntima y cotidiana del primer día.",
  },
  {
    id: "meghan-trainor",
    name: "Meghan Trainor",
    date: "24/10",
    time: "18:45",
    stage: "Escenario patio",
    summary:
      "Su pop celebra el cuerpo desde un lugar directo y accesible, perfecto para abrir la conversación sobre belleza.",
  },
  {
    id: "hwasa",
    name: "Hwasa",
    date: "24/10",
    time: "19:30",
    stage: "La Polivalent",
    summary:
      "Una artista que tensiona los mandatos de género e imagen dentro de una industria altamente normativizada.",
  },
  {
    id: "rigoberta-bandini",
    name: "Rigoberta Bandini",
    date: "24/10",
    time: "20:20",
    stage: "La Polivalent",
    summary:
      "Su ironía y mirada política conectan feminismo, cultura pop y crítica de los discursos sobre el cuerpo.",
  },
  {
    id: "raye",
    name: "RAYE",
    date: "24/10",
    time: "21:20",
    stage: "Escenario principal",
    summary:
      "Una voz clave para hablar de dismorfia, industria musical y heridas que se esconden detrás del éxito.",
  },
  {
    id: "gidle",
    name: "(G)I-DLE",
    date: "24/10",
    time: "22:30",
    stage: "Escenario principal",
    summary:
      "El cierre explosivo del segundo día: identidad, rechazo del molde y una energía colectiva de ruptura.",
  },
  {
    id: "iu",
    name: "IU",
    date: "25/10",
    time: "18:45",
    stage: "Escenario patio",
    summary:
      "Su trayectoria permite hablar desde dentro de la fama, la exposición pública y la relación entre artista e industria.",
  },
  {
    id: "pablo-alboran",
    name: "Pablo Alborán",
    date: "25/10",
    time: "19:30",
    stage: "La Polivalent",
    summary:
      "Aporta una presencia cercana al público local para pensar vulnerabilidad, masculinidad y expectativas mediáticas.",
  },
  {
    id: "benson-boone",
    name: "Benson Boone",
    date: "25/10",
    time: "20:20",
    stage: "La Polivalent",
    summary:
      "Una propuesta pop emocional para observar cómo se construyen nuevos ídolos en tiempo de redes y viralidad.",
  },
  {
    id: "the-marias",
    name: "The Marías",
    date: "25/10",
    time: "21:20",
    stage: "Escenario principal",
    summary:
      "Su imaginario sonoro y visual conecta con la fabricación de atmósferas, deseo e imagen en la cultura pop.",
  },
  {
    id: "lana-del-rey",
    name: "Lana Del Rey",
    date: "25/10",
    time: "22:30",
    stage: "Escenario principal",
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
    stage: "Escenario secreto",
    summary: "Último hueco reservado para una confirmación especial.",
    isPlaceholder: true,
  },
]

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
