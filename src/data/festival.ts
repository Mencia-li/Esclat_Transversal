export interface FestivalDay {
  id: string
  date: string
  title: string
  summary: string
  highlight: string
  detail: string
  activities: string[]
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
  price: number
}

export const festivalInfo = {
  name: "Esclat",
  claim: "Las cosas que crecen dentro hasta terminar por esclatar.",
  dates: "23/10 - 25/10",
  place: "La Naves, Valencia",
  email: "somos@esclat.com",
  phone: "+34 6XX XX XX XX",
  producer: "Campaña, programación y experiencia de marca por Esclat Studio.",
}

export const festivalDays: FestivalDay[] = [
  {
    id: "23-10",
    date: "23/10",
    title: "Tres días para que todo lo que llevamos dentro estalle.",
    summary: "Amor propio. Aprender a escucharse entre tanto ruido.",
    highlight: "Apertura, talleres y primeros directos.",
    detail:
      "El primer día presenta la identidad del festival con sesiones participativas, espacios de escucha y conciertos de apertura.",
    activities: ["Acreditaciones", "Talleres de creación", "Escenario principal", "Sesión de bienvenida"],
  },
  {
    id: "24-10",
    date: "24/10",
    title: "Estándares de belleza.",
    summary: "Cuestionar la mirada para construir la propia.",
    highlight: "Charlas, exposiciones y directos nocturnos.",
    detail:
      "La segunda jornada cruza pensamiento, cultura visual y música en directo para abrir conversación con el público.",
    activities: ["Charlas invitadas", "Exposiciones", "Showcases", "Afterparty"],
  },
  {
    id: "25-10",
    date: "25/10",
    title: "Industria y fama.",
    summary: "Crecer entre la presión.",
    highlight: "Cierre del programa y actuaciones finales.",
    detail:
      "La última jornada concentra los conciertos de cierre, stands de merch y una programación pensada para despedir el festival.",
    activities: ["Mesa redonda", "Stands & Merch", "Conciertos finales", "Cierre colectivo"],
  },
]

export const artists: Artist[] = Array.from({ length: 15 }, (_, index) => {
  const day = festivalDays[index % festivalDays.length] ?? festivalDays[0]!

  return {
    id: `artista-${index + 1}`,
    name: `Artista ${index + 1}`,
    date: day.date,
    time: `${18 + (index % 5)}:00`,
    stage: index % 2 === 0 ? "Escenario Norte" : "Escenario Sur",
    summary:
      "Actuación principal con una propuesta visual pensada para conectar música, imagen y experiencia de festival.",
  }
})

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
      "Laboratorios breves para explorar cuerpo, imagen, sonido y formas de autoproducción creativa.",
  },
  {
    id: "charlas",
    title: "Charlas.",
    summary:
      "Conversaciones con profesionales de la cultura, la comunicación y la industria musical.",
  },
  {
    id: "exposiciones",
    title: "Exposiciones.",
    summary:
      "Piezas visuales y proyectos editoriales que amplían el relato del festival durante los tres días.",
  },
  {
    id: "stands-merch",
    title: "Stands & Merch.",
    summary:
      "Zona de marcas, publicaciones independientes, camisetas, prints y objetos de edición limitada.",
  },
]

export const ticketOptions: TicketOption[] = [
  {
    id: "dia",
    name: "Entrada de día",
    description: "Acceso a conciertos, exposiciones y actividades de una jornada.",
    price: 18,
  },
  {
    id: "abono",
    name: "Abono completo",
    description: "Acceso a los tres días del festival con prioridad de entrada.",
    price: 42,
  },
  {
    id: "pro",
    name: "Pase profesional",
    description: "Entrada completa, acreditación y acceso preferente a charlas.",
    price: 64,
  },
]

export const faqs: FaqItem[] = [
  {
    id: "reserva",
    question: "¿Hay que reservar plaza para todo?",
    answer:
      "Los conciertos, exposiciones, proyecciones y el cuarto de escucha son de libre acceso hasta completar aforo. Los talleres requieren inscripción previa.",
  },
  {
    id: "inscripciones",
    question: "¿Cuándo abren las inscripciones a los talleres?",
    answer:
      "Las inscripciones se abrirán dos semanas antes del festival y se comunicarán en la web y redes sociales.",
  },
  {
    id: "experiencia",
    question: "¿Necesito experiencia para los talleres?",
    answer:
      "No. Cada taller indicará su nivel, pero la programación está pensada para público curioso y perfiles creativos.",
  },
  {
    id: "dia",
    question: "¿Puedo asistir solo un día?",
    answer:
      "Sí. Puedes asistir a jornadas sueltas o vivir el festival completo con el abono de tres días.",
  },
  {
    id: "edad",
    question: "¿Hay límite de edad?",
    answer:
      "El festival está abierto a todos los públicos. Algunas actividades nocturnas pueden tener condiciones específicas de acceso.",
  },
]
