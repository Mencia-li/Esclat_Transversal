export type ActivityDetailItem = {
  // Una tarjeta de actividad dentro de una subpagina: taller, charla o exposicion.
  id: string
  label: string
  title: string
  time: string
  space: string
  description: string
  meta: string
  tags: string
  labelClass?: string
}

export type ActivityDetailDay = {
  // Agrupa las tarjetas por dia para reutilizar ActivityDetailPage.vue.
  id: string
  weekday: string
  date: string
  timeRange: string
  sectionTitle: string
  activities: ActivityDetailItem[]
}

// Datos de /talleres.
export const workshopDays: ActivityDetailDay[] = [
  {
    id: "viernes",
    weekday: "Viernes",
    date: "23/10",
    timeRange: "16:15-18:15 h",
    sectionTitle: "Talleres simultáneos - 2 sesiones cada uno",
    activities: [
      {
        id: "viernes-produce",
        label: "Taller",
        labelClass: "bg-turquesa",
        title: "Taller A - Produce tu estado de ánimo ",
        time: "16:15-16:55 h y 17:25-18:05 h",
        space: "Sala Factoría · Nave 1, 1ª planta",
        description:
          "¿Qué sonaría si tradujéramos lo que sientes a un loop de cuatro compases? En este taller de iniciación a la producción musical cada participante crea una pieza breve usando solo su intuición emocional del momento, sin conocimientos técnicos previos. Al final se escuchan todas juntas. El resultado siempre sorprende. Sin experiencia necesaria, con ordenadores y software disponibles en sala.",
        meta: "40 min por sesión | Con ordenadores",
        tags: "producción · emoción · iniciación musical",
      },
      {
        id: "viernes-adivina",
        label: "Taller",
        labelClass: "bg-turquesa",
        title: "Taller B — Lo que mi canción dice",
        time: "16:25-17:05 h y 17:35-18:15 h",
        space: "Sala Visual Room · Nave 1, 1ª planta",
        description:
          "En círculo, cada participante pone 30 segundos de su canción favorita y el resto le devuelve qué le transmite esa canción sobre quien la ha puesto. Es como un espejo musical: descubres cómo te ven los demás a través de lo que escuchas. Funciona muy bien para gente que no se conoce.",
        meta: "40 min por sesión | Muy participativo",
        tags: "escucha · identidad · espejo",
      },
    ],
  },
  {
    id: "sabado",
    weekday: "Sábado",
    date: "24/10",
    timeRange: "16:15-18:15 h",
    sectionTitle: "Talleres simultáneos - 2 sesiones cada uno",
    activities: [
      {
        id: "sabado-pinta-caras",
        label: "Taller",
        labelClass: "bg-turquesa",
        title: "Taller A - Pinta caras ",
        time: "16:15-16:55 h y 17:25-18:05 h",
        space: "Sala Factoría · Nave 1, 1ª planta",
        description:
          "Suena una canción. Tienes quince minutos y una mesa llena de maquillaje compartido. La única regla es que no puedes mirar ninguna referencia visual: solo escuchas y te dejas llevar. ¿Cómo suena el indie folk en purpurina? ¿Y el techno en sombra de ojos? Un taller sin técnica ni objetivo estético que acaba siendo una de las experiencias más divertidas y sorprendentes del festival.",
        meta: "40 min por sesión | Maquillaje compartido en sala",
        tags: "belleza · música · improvisación · juego",
      },
      {
        id: "sabado-portada",
        label: "Taller",
        labelClass: "bg-turquesa",
        title: "Taller B - Crea tu portada de álbum ",
        time: "16:25-17:05 h y 17:35-18:15 h",
        space: "Sala Visual Room · Nave 1, 1ª planta",
        description:
          "Revistas viejas de moda y música, tijeras, pegamento y la pregunta: ¿qué portada te hubiera gustado ver cuando tenías quince años? Cada participante monta la suya con collage analógico, sin límite estético ni narrativo. Al final del día todas las portadas se exponen juntas en el espacio. Te llevas la tuya a casa.",
        meta: "40 min por sesión | Te llevas tu portada",
        tags: "representación · collage · creatividad · medios",
      },
    ],
  },
  {
    id: "domingo",
    weekday: "Domingo",
    date: "25/10",
    timeRange: "16:15-18:15 h",
    sectionTitle: "Talleres simultáneos - 2 sesiones cada uno",
    activities: [
      {
        id: "domingo-camiseta",
        label: "Taller",
        labelClass: "bg-turquesa",
        title: "Taller A - Pinta tu camiseta ",
        time: "16:15-17:15 h y 17:15-18:15 h",
        space: "Sala Factoría · Nave 1, 1ª planta",
        description:
          "Painting ligero sobre una camiseta: diseña tu propia camiseta según la impresión de la música. Sin experiencia previa.",
        meta: "60 min por sesión",
        tags: "cuerpo · arte · expresión",
      },
      {
        id: "domingo-cuerpo",
        label: "Taller",
        labelClass: "bg-turquesa",
        title: "Taller B - El cuerpo escucha ",
        time: "16:15-17:05 h y 17:15-18:05 h",
        space: "Sala Visual Room · Nave 1, 1ª planta",
        description:
          "Taller de movimiento y música que explora cómo el sonido se procesa corporalmente. Mezcla danza espontánea, respiración y sonoridades distintas.",
        meta: "50 min por sesión",
        tags: "cuerpo · bienestar · sensorialidad",
      },
    ],
  },
]

// Datos de /charlas.
export const talkDays: ActivityDetailDay[] = [
  {
    id: "viernes",
    weekday: "Viernes",
    date: "23/10",
    timeRange: "18:30-19:30 h",
    sectionTitle: "Charla principal - La Polivalent",
    activities: [
      {
        id: "viernes-ansiedad",
        label: "Conversación",
        title: "Cómo suena la ansiedad",
        time: "18:30-19:30 h",
        description:
          "Un psicólogo y un músico comparten escenario para hablar de algo que casi todo el mundo ha vivido pero pocos saben explicar: por qué la música nos afecta emocionalmente de formas que no controlamos, por qué elegimos canciones tristes cuando estamos mal y qué dice eso de cómo funciona nuestra mente. Una hora sin tecnicismos, con ejemplos en directo y muchas preguntas del público. No hace falta saber nada de música ni de psicología para entrar.",
        space: "La Polivalent · Nave 1, planta baja",
        meta: "60 min | Preguntas abiertas",
        tags: "salud mental · neurociencia sonora · accesible",
      },
    ],
  },
  {
    id: "sabado",
    weekday: "Sábado",
    date: "24/10",
    timeRange: "18:30-19:30 h",
    sectionTitle: "Charla principal - La Polivalent",
    activities: [
      {
        id: "sabado-imagen",
        label: "Conversación",
        title: "La imagen del artista en la industria musical",
        time: "18:30-19:30 h",
        description:
          "Cuánto de lo que vemos en el escenario es una decisión artística y cuánto es una instrucción del sello. Qué le pasa a una artista cuando decide no jugar ese juego y qué le pasa cuando sí. Un debate abierto con artistas, periodistas y público sobre la imagen femenina en la música, los mandatos que la rodean y los espacios que se están abriendo - y los que todavía cuesta ocupar. Una hora que puede ponerse interesante.",
        space: "La Polivalent · Nave 1, planta baja",
        meta: "60 min | Debate abierto",
        tags: "imagen · belleza · industria · autenticidad",
      },
    ],
  },
  {
    id: "domingo",
    weekday: "Domingo",
    date: "25/10",
    timeRange: "18:30-19:30 h",
    sectionTitle: "Charla principal + batucada de cierre",
    activities: [
      {
        id: "domingo-fama",
        label: "Conversación",
        title: "Ser famoso cuesta más de lo que cobras",
        time: "18:30-19:30 h",
        description:
          "Exartistas y managers hablan sin eufemismos de lo que la industria no te cuenta antes de que firmes: el burnout, las cancelaciones, la exposición que no puedes apagar, la soledad detrás de los números de streaming. Una conversación honesta sobre el precio real de la fama y por qué el sistema está diseñado para que no te salga rentable emocionalmente. Formato abierto, sin respuestas fáciles.",
        space: "La Polivalent · Nave 1, planta baja",
        meta: "60 min | Formato abierto",
        tags: "fama · salud mental · industria · honestidad",
      },
    ],
  },
]

// Datos de /exposiciones.
export const exhibitionDays: ActivityDetailDay[] = [
  {
    id: "viernes",
    weekday: "Viernes",
    date: "23/10",
    timeRange: "16:00 h",
    sectionTitle: "Apertura y llegada libre",
    activities: [
      {
        id: "viernes-backstage",
        label: "Instalación",
        title: "Exposición fotográfica - Backstage: la otra cara",
        time: "16:00-20:00 h",
        description:
          "Las imágenes que nunca salen en el cartel. Fotógrafos que han trabajado con artistas en gira muestran lo que ocurre entre bambalinas: la espera antes de salir, el cansancio después, la soledad de una habitación de hotel a las dos de la madrugada. Un contrapunto visual brutal a la imagen pulida que el público consume.",
        space: "Sala de Exposiciones · Nave 1, planta baja",
        meta: "Continua | Libre acceso | 10-15 fotografías",
        tags: "salud mental · fama · realidad vs imagen",
      },
    ],
  },
  {
    id: "sabado",
    weekday: "Sábado",
    date: "24/10",
    timeRange: "16:00 h",
    sectionTitle: "Apertura y llegada libre",
    activities: [
      {
        id: "sabado-cuerpos",
        label: "Instalación",
        title: "Exposición fotográfica - Cuerpos sin filtro",
        time: "16:00-20:00 h",
        description:
          "Veinte retratos de mujeres músicas, artistas visuales y asistentes al festival fotografiadas sin retoque y sin posado dirigido. El criterio de selección no es la perfección estética sino la diversidad: cuerpos, edades, contextos diferentes. Cada imagen lleva una frase escrita por la propia protagonista. Una exposición que invita a mirar de otra manera.",
        space: "Sala de Exposiciones · Nave 1, planta baja",
        meta: "Continua | Libre acceso | 20 piezas",
        tags: "cuerpo · belleza · representación",
      },
    ],
  },
  {
    id: "domingo",
    weekday: "Domingo",
    date: "25/10",
    timeRange: "16:00 h",
    sectionTitle: "Apertura y llegada libre",
    activities: [
      {
        id: "domingo-foto",
        label: "Instalación",
        title: "Exposición fotográfica - Lo que no sale en la foto",
        time: "16:00-20:00 h",
        description:
          "Dos series en una sala. La primera replica la estética del paparazzi con personas completamente anónimas en momentos cotidianos íntimos: el efecto es extraño e incómodo por razones que vale la pena explorar. La segunda recoge fichas de artistas que la industria desechó y que nunca llegaron al gran público, con un QR que lleva a un fragmento de su música. El visitante puede añadir su propia recomendación de artista desconocido.",
        space: "Sala de Exposiciones · Nave 1, planta baja",
        meta: "Continua | Libre acceso | 25 piezas + QR interactivo",
        tags: "fama · privacidad · industria · memoria",
      },
    ],
  },
]
