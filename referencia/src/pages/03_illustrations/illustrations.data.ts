export interface IllustrationImage {
    name: string;
    alt: string;
}

export interface IllustrationCategory {
    id: number;
    title: string;
    folder: string; // public/illustrations/<folder>/
    images: IllustrationImage[];
    }

    // Genera: prefix1..prefixN (y alt igual al name)
    const makeImages = (prefix: string, count: number): IllustrationImage[] =>
    Array.from({ length: count }, (_, i) => {
        const name = `${prefix}${i + 1}`;
        return { name, alt: name };
    });

    export const illustrationCategories: IllustrationCategory[] = [
    {
        id: 1,
        title: "Acuarelas",
        folder: "acuarela",
        images: makeImages("acuarela", 8), // acuarela1..8
    },
    {
        id: 2,
        title: "Académico",
        folder: "academico",
        images: makeImages("acad", 12), // acad1..acad12
    },
    {
        id: 3,
        title: "Rotuladores",
        folder: "rotuladores",
        images: makeImages("rotus", 11), // rotuladores1..11
    },
    {
        id: 4,
        title: "Gouache",
        folder: "gouache",
        images: makeImages("gouache", 5), // gouache1..5
    },
    {
        id: 5,
        title: "Tinta China",
        folder: "tinta",
        images: makeImages("tinta", 9), // tinta1..9
    },
    {
        id: 6,
        title: "Digital",
        folder: "digital",
        images: makeImages("digital", 8), // digital1..8
    },
];