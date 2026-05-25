// src/data/projects.ts

export interface Project {
    id: number
    title: string
    subtitle?: string
    description: string
    folder: string
    cover: string
    images: string[]
    contexto: string
    objetivo: string
    proceso: string
    resultado: string
    herramientas: string[]
}

export const projects: Project[] = [
    { 
        id: 1, 
        title: "Ilustración Narrativa", 
        subtitle: "Orgullo y Prejuicio",
        description: "Exploración visual a través de historias contadas mediante el dibujo.",
        folder: "1. Ilustracion narrativa",
        cover: "ilustracionNarrativa1.webp",
        images: Array.from({ length: 6 }, (_, i) => `ilustracionNarrativa${i + 1}.webp`),
        contexto: "Proyecto académico centrado en el diseño completo de una edición ilustrada de la obra clásica Orgullo y Prejuicio. El encargo consistía en desarrollar portada, contraportada, lomo, guardas y tres páginas ilustradas, buscando potenciar su carácter romántico y estética elegante.",
        objetivo: "Construir una propuesta editorial coherente en todos sus elementos, logrando que ilustración, ornamento y maquetación funcionen como un sistema visual unificado que refuerce la identidad del clásico literario.",
        proceso: "Comenzó con el diseño de personajes principales y múltiples pruebas de composición para la portada. Para las guardas se diseñó un patrón floral minimalista coherente con las piezas finales. Las ilustraciones se realizaron físicamente con rotuladores acrílicos, se escanearon y se ajustaron digitalmente para perfeccionar el acabado.",
        resultado: "Una edición completa donde todos los elementos visuales mantienen unidad estética. El proyecto permitió profundizar en el proceso editorial integral combinando técnicas tradicionales y ajustes digitales.",
        herramientas: ["Rotuladores acrílicos", "Edición digital", "Maquetación editorial"]
    },
    { 
        id: 2, 
        title: "Juego Interactivo", 
        subtitle: "Storytelling interactivo con minijuegos",
        description: "Diseño de interfaz y experiencia de usuario en entornos digitales.",
        folder: "2. Juego interactivo",
        cover: "juegoInteractivo1.webp",
        images: Array.from({ length: 20 }, (_, i) => `juegoInteractivo${i + 1}.webp`),
        contexto: "Proyecto transversal en equipo (3 integrantes) para crear una experiencia interactiva completa utilizando Processing. Consiste en un juego narrativo donde el usuario avanza a través de una historia superando distintos minijuegos.",
        objetivo: "Construir una experiencia cohesionada integrando narrativa, ilustración y programación, incorporando un trabajo consciente del color script para acompañar el desarrollo narrativo.",
        proceso: "Se estructuró como un storytelling dividido en fases jugables, centrando mi papel en la dirección visual y producción gráfica. Personajes y escenarios se ilustraron a mano con acuarela, se escanearon y adaptaron digitalmente para su integración funcional en Processing.",
        resultado: "Un juego completamente funcional en el que el usuario completa el recorrido narrativo superando los retos. Permitió aplicar ilustración tradicional en un entorno interactivo real y trabajar bajo un ritmo de producción exigente.",
        herramientas: ["Acuarela", "Ilustración tradicional", "Escaneado y edición digital", "Processing"]
    },
    { 
        id: 3, 
        title: "Juego de Mesa", 
        subtitle: "Diseño integral con enfoque social",
        description: "Creación de componentes y diseño editorial para juegos tradicionales.",
        folder: "3. Juego de mesa",
        cover: "juegoMesa1.webp",
        images: Array.from({ length: 22 }, (_, i) => `juegoMesa${i + 1}.webp`),
        contexto: "Proyecto transversal en equipo (4 integrantes) para diseñar un juego de mesa completo, incluyendo tablero, cartas, fichas 3D y manual de instrucciones. La temática se centra en el apoyo psicológico y social a personas afectadas por la DANA.",
        objetivo: "Diseñar una experiencia cooperativa que combine entretenimiento y reflexión, integrando diseño gráfico, modelado 3D y producción física en un sistema coherente.",
        proceso: "Desarrollo de mecánicas cooperativas y dinámicas de juego. Los elementos gráficos se realizaron en Illustrator, las fichas se modelaron en Blender para impresión 3D y el manual se maquetó en InDesign. Incluyó fases de testeo y fotografía de producto final.",
        resultado: "Un juego completamente jugable y producido físicamente donde narrativa, mecánica y sistema visual trabajan de forma integrada. Destaca por su carácter multidisciplinar al aplicar diversas áreas del diseño.",
        herramientas: ["Adobe Illustrator", "Blender", "Impresión 3D", "Adobe InDesign", "Fotografía"]
    },
    { 
        id: 4, 
        title: "36 Days of Type", 
        subtitle: "Exploración tipográfica en papel por capas",
        description: "Reto de experimentación tipográfica y creatividad visual.",
        folder: "4. 36 days of type",
        cover: "tipografia1.webp",
        images: ["tipografia1.webp", "tipografia2.webp", "tipografia3.webp"],
        contexto: "Proyecto para la asignatura de Tipografía donde se intervinieron las letras C, Q e I vinculándolas con festividades chinas: Año Nuevo, Festival de la Luna y Festival de los Farolillos.",
        objetivo: "Explorar la tipografía desde una dimensión experimental y volumétrica, alejándose del formato digital para trabajar la letra como un espacio narrativo e ilustrado.",
        proceso: "Planificación de composiciones por capas para generar profundidad. Se trabajó mediante ilustración en papel recortada manualmente y apilada con cinta de doble cara para crear volumen. Finalmente se fotografiaron las piezas y se ajustaron digitalmente.",
        resultado: "Transformación de caracteres tipográficos en escenas tridimensionales con identidad propia, combinando técnica artesanal y edición digital.",
        herramientas: ["Recorte y montaje en papel", "Fotografía", "Edición digital"]
    },
    { 
        id: 5, 
        title: "Kaoka", 
        subtitle: "Branding y diseño de packaging para marca de chocolate",
        description: "Branding y diseño de identidad para marcas sostenibles.",
        folder: "5. Kaoka",
        cover: "kaoka1.webp",
        images: Array.from({ length: 8 }, (_, i) => `kaoka${i + 1}.webp`),
        contexto: "Proyecto en equipo (4 integrantes) centrado en la creación de una marca ficticia de chocolate con cuatro sabores, desarrollando identidad visual, packaging, mock-ups y comunicación.",
        objetivo: "Construir una marca coherente y reconocible diferenciando cada sabor a través de un sistema gráfico y cromático adaptable a distintos soportes.",
        proceso: "Fase de conceptualización para definir tono y personalidad. Se utilizaron figuras humanas en actividades cotidianas para generar cercanía y paletas de color específicas para cada sabor. Desarrollo íntegro de ilustraciones y aplicaciones en Illustrator.",
        resultado: "Una marca sólida y visualmente consistente donde cada sabor mantiene su personalidad sin romper la unidad global de la identidad.",
        herramientas: ["Adobe Illustrator", "Identidad visual", "Diseño de packaging", "Aplicaciones digitales"]
    },
    { 
        id: 6, 
        title: "Campaña Publicitaria", 
        subtitle: "Brecha intergeneracional",
        description: "Campaña de comunicación integral.",
        folder: "6. Campanya publicitaria",
        cover: "campanya1.webp",
        images: Array.from({ length: 14 }, (_, i) => `campanya${i + 1}.webp`),
        contexto: "Proyecto en equipo (4 integrantes) de carácter social centrado en fomentar la interacción entre la Generación Z y personas mayores para reducir la brecha intergeneracional.",
        objetivo: "Conectar con el público joven mediante un lenguaje visual cercano y actual, transmitiendo un mensaje social claro y adaptable a distintos formatos.",
        proceso: "Desarrollo de piezas gráficas (cartel, tríptico, marquesina) y contenido audiovisual (reel y cortometraje). Me encargué de la dirección visual, ilustraciones y construcción de retículas para asegurar cohesión estética.",
        resultado: "Una campaña social estructurada y adaptable que demuestra cómo el lenguaje visual influye en la recepción de un mensaje estratégico y social.",
        herramientas: ["Ilustración digital", "Diseño editorial", "Desarrollo de retículas", "Producción audiovisual"]
    },
    { 
        id: 7, 
        title: "Revista", 
        subtitle: "Diseño y maquetación sobre salud mental en el diseño",
        description: "Maquetación y diseño editorial para publicaciones impresas.",
        folder: "7. Revista",
        cover: "articulo1.webp",
        images: Array.from({ length: 5 }, (_, i) => `articulo${i + 1}.webp`),
        contexto: "Proyecto individual centrado en la creación de una publicación de ocho caras sobre la salud mental de los diseñadores, aplicando criterios técnicos estrictos.",
        objetivo: "Aplicar principios de diseño editorial técnico trabajando la estructura, jerarquía y legibilidad para transmitir el tono reflexivo del contenido.",
        proceso: "Definición de retícula base y sistema tipográfico coherente. Búsqueda de equilibrio visual entre la densidad del texto y los espacios en blanco, incluyendo una ilustración original diseñada específicamente para el discurso.",
        resultado: "Una revista con estructura clara y técnicamente sólida que refuerza la comprensión del diseño editorial como un sistema estructural e impactante.",
        herramientas: ["Adobe InDesign", "Gestión tipográfica", "Preparación de archivos para impresión", "Ilustración original"]
    },
    { 
        id: 8, 
        title: "Carteles", 
        subtitle: "Exploraciones gráficas académicas",
        description: "Diseño de gran formato enfocado en la síntesis y el impacto visual.",
        folder: "8. Carteles",
        cover: "cartel1.webp",
        images: Array.from({ length: 5 }, (_, i) => `cartel${i + 1}.webp`),
        contexto: "Serie de carteles desarrollados en diversos proyectos académicos con enfoques tecnológicos, reinterpretaciones de obras clásicas y ejercicios experimentales.",
        objetivo: "Mostrar versatilidad y capacidad de adaptación visual a distintos contextos y estilos, entendiendo el cartel como un formato de impacto visual inmediato.",
        proceso: "Ajuste de estilo, técnica y lenguaje gráfico según el encargo. Incluye desde representaciones conceptuales (como la ira en una propuesta teatral) hasta experimentaciones formales e ilustradas de Macbeth.",
        resultado: "Una colección de piezas que reflejan versatilidad dentro del diseño gráfico y la capacidad de responder a planteamientos comunicativos diversos.",
        herramientas: ["Adobe Illustrator", "Adobe InDesign", "Ilustración", "Recorte en papel", "Composición tipográfica"]
    },
    { 
        id: 9, 
        title: "Fotografía", 
        subtitle: "Retrato y bodegón",
        description: "Composición fotográfica y edición digital creativa.",
        folder: "9. Fotografia",
        cover: "fotografia1.webp",
        images: Array.from({ length: 6 }, (_, i) => `fotografia${i + 1}.webp`),
        contexto: "Proyecto académico en equipo (4 integrantes) para crear una serie fotográfica compuesta por cuatro retratos y cuatro bodegones con una línea estética unificada.",
        objetivo: "Profundizar en la dirección de arte y composición para transmitir una sensación sutil de elegancia y delicadeza mediante el control de la luz.",
        proceso: "Uso de una estética limpia con tonos pastel y predominio del blanco. Los bodegones se centraron en flores y joyas, mientras que los retratos mantuvieron coherencia cromática con luz suave.",
        resultado: "Serie fotográfica con unidad estética y atmósfera serena, consolidando conocimientos en dirección de arte y estilismo colaborativo.",
        herramientas: ["Fotografía digital", "Dirección de arte", "Composición y estilismo", "Adobe Photoshop"]
    }
]