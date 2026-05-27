import type { ModelName } from "@/lib/scene";

export const home = {
  meta: {
    title:       "Michel Blaas — Productontwerper",
    description: "Portfolio van Michel Blaas, productontwerper uit Delft. Meubel, verlichting, objecten.",
  },

  hero: {
    kicker: {
      nl: "№ 01 — Portfolio · Productontwerp · Delft / Den Haag",
      en: "№ 01 — Portfolio · Product design · Delft / The Hague",
    },
    headline: {
      nl: ["Objecten", "om aan te", "raken"],
      en: ["Objects", "you can", "touch"],
    },
    meta: [
      {
        label: "Discipline",
        value: {
          nl: "Industrieel ontwerp, meubel, verlichting",
          en: "Industrial design, furniture, lighting",
        },
      },
      {
        label: { nl: "Methode", en: "Method" },
        value: {
          nl: "Schets · CAD · 3D-print · Prototype",
          en: "Sketch · CAD · 3D print · Prototype",
        },
      },
      {
        label: { nl: "Materialen", en: "Materials" },
        value: {
          nl: "Kunststof, hout, metaal, textiel, elektronica",
          en: "Plastics, wood, metal, textile, electronics",
        },
      },
      {
        label: "Status",
        value: {
          nl: "Open voor opdrachten — najaar 2026",
          en: "Open for commissions — autumn 2026",
        },
      },
    ],
    scroll: { nl: "Scroll · 06 werken", en: "Scroll · 06 works" },
    dragHint: { nl: "Sleep om te draaien", en: "Drag to rotate" },
  },

  ticker: {
    nl: ["Lijn", "Volume", "Aanraking", "Materie", "Gewicht", "Schaduw", "Stilte"],
    en: ["Line", "Volume", "Touch",    "Matter",  "Weight",  "Shadow",  "Silence"],
  },

  works: {
    sectionLabel: {
      nl: "Geselecteerd werk · 2022 — 2026",
      en: "Selected work · 2022 — 2026",
    },
    count: { nl: "06 stuks", en: "06 pieces" },
    heading: { nl: ["Zes objecten,", "zes verhalen."], en: ["Six objects,", "six stories."] },
    items: [
      {
        id:    "chair",
        model: "chair" as ModelName,
        dist:  5, height: 0.9, speed: 0.6,
        size:  "lg",
        category: { nl: "Meubel",   en: "Furniture" },
        year: "2026",
        title: "Halma",
        subtitle: { nl: "01", en: "01" },
        status: { nl: "Bachelorproject — prototype", en: "Bachelor project — prototype" },
        body: {
          nl: "Een loungestoel gebouwd rond één continue rugcurve. De armleuningen lopen in één lijn door naar de zitting; geen las, geen scharnier. Ontwikkeld als afstudeerproject.",
          en: "A lounge chair built around one continuous back curve. The armrests flow uninterrupted into the seat — no weld, no hinge. Developed as a graduation project.",
        },
        specs: [
          { nl: "Essenhout", en: "Ash wood" },
          { nl: "Linnen 320g", en: "Linen 320g" },
          { nl: "Inklapbaar", en: "Foldable" },
        ],
      },
      {
        id:    "lamp",
        model: "lamp" as ModelName,
        dist:  5, height: 1.0, speed: 0.7,
        size:  "md",
        category: { nl: "Verlichting", en: "Lighting" },
        year: "2025",
        title: "Boog",
        subtitle: { nl: "vloerlamp", en: "floor lamp" },
        status: { nl: "Studieproject", en: "Student project" },
        body: {
          nl: "Een 1,1 meter lange overhang in geanodiseerd aluminium. De lampkap kan met de hand in elke hoek vastklikken.",
          en: "A 1.1 m overhanging arc in anodised aluminium. The shade clicks into any angle by hand.",
        },
        specs: [
          { nl: "Aluminium", en: "Aluminium" },
          { nl: "2700K LED", en: "2700K LED" },
          { nl: "3 standen", en: "3 modes" },
        ],
      },
      {
        id:    "vase",
        model: "vase" as ModelName,
        dist:  5.5, height: 1.3, speed: 0.8,
        size:  "md",
        category: { nl: "Keramiek", en: "Ceramics" },
        year: "2025",
        title: "Knoop",
        subtitle: { nl: "vaas", en: "vase" },
        status: { nl: "Handgedraaid", en: "Hand-thrown" },
        body: {
          nl: "Drie volumes die elkaar onderbreken — een vorm die voortkomt uit het zoeken naar het kleinste contactpunt tussen klei en pottenbakkersschijf.",
          en: "Three volumes interrupting each other — a form that emerges from searching for the smallest possible contact point between clay and wheel.",
        },
        specs: [
          { nl: "Steengoed", en: "Stoneware" },
          { nl: "Mat glazuur", en: "Matte glaze" },
          { nl: "1,2 kg", en: "1.2 kg" },
        ],
      },
      {
        id:    "speaker",
        model: "speaker" as ModelName,
        dist:  5, height: 1.1, speed: 0.7,
        size:  "lg",
        category: { nl: "Elektronica", en: "Electronics" },
        year: "2024",
        title: "Toren",
        subtitle: { nl: "speaker", en: "speaker" },
        status: { nl: "Concept", en: "Concept" },
        body: {
          nl: "360° geluid in een cilinder van 12 cm breed. Eén knop, geen scherm, geen app. Een onderzoek naar de minimale interface voor luisteren.",
          en: "360° sound in a 12 cm-wide cylinder. One knob, no screen, no app. A study in the minimal interface for listening.",
        },
        specs: [
          { nl: "Massief eiken", en: "Solid oak" },
          { nl: "Messing",       en: "Brass" },
          { nl: "Bluetooth 5.3", en: "Bluetooth 5.3" },
        ],
      },
      {
        id:    "stool",
        model: "stool" as ModelName,
        dist:  5, height: 0.9, speed: 0.7,
        size:  "sm",
        category: { nl: "Meubel", en: "Furniture" },
        year: "2023",
        title: "Cork",
        subtitle: { nl: "06", en: "06" },
        status: { nl: "Editie van 12", en: "Edition of 12" },
        body: {
          nl: "Een lichte kruk uit één blok kurk, op drie eikenhouten poten. Drie poten omdat een kruk niet hoeft te wankelen om eerlijk te zijn.",
          en: "A light stool from a single block of cork, on three oak legs. Three legs because a stool doesn't need to wobble to be honest.",
        },
        specs: [
          { nl: "Kurk",  en: "Cork" },
          { nl: "Eiken", en: "Oak" },
          { nl: "2,1 kg", en: "2.1 kg" },
        ],
      },
      {
        id:    "kettle",
        model: "kettle" as ModelName,
        dist:  4.2, height: 0.7, speed: 0.6,
        size:  "sm",
        category: { nl: "Object", en: "Object" },
        year: "2022",
        title: "Theefluit",
        subtitle: { nl: "nº 3", en: "nº 3" },
        status: { nl: "Prototype", en: "Prototype" },
        body: {
          nl: "Een ketel die in plaats van te fluiten een lage toon zingt. Een studie naar geluid als signaal.",
          en: "A kettle that, instead of whistling, sings a low tone. A study of sound as a signal.",
        },
        specs: [
          { nl: "Messing",      en: "Brass" },
          { nl: "Walnoothout",  en: "Walnut" },
          { nl: "1,2 L",        en: "1.2 L" },
        ],
      },
      {
        id:    "monolith",
        model: "monolith" as ModelName,
        dist:  5.6, height: 1.4, speed: 0.9,
        bg:    0xe2dccf,
        size:  "sm",
        category: { nl: "Sculptuur", en: "Sculpture" },
        year: "2026",
        title: "Totem",
        subtitle: { nl: "0", en: "0" },
        status: { nl: "Uniek", en: "Unique" },
        body: {
          nl: "Een verticale studie in proportie en materiaal — terracotta, room en messing op één as. Onderdeel van een serie van drie.",
          en: "A vertical study in proportion and material — terracotta, cream and brass on one axis. Part of a series of three.",
        },
        specs: [
          { nl: "Keramiek", en: "Ceramics" },
          { nl: "Messing",  en: "Brass" },
          { nl: "1/3",      en: "1/3" },
        ],
      },
    ],
  },

  studio: {
    label: {
      nl: "Over de ontwerper",
      en: "About the designer",
    },
    since: { nl: "Sinds 2022", en: "Since 2022" },
    heading: {
      nl: ["Een rustige", "vorm", "in een", "luide wereld."],
      en: ["A quiet", "form", "in a", "loud world."],
    },
    lede: {
      nl: "Ik ben Michel Blaas, 24 jaar, productontwerper uit Delft. Ik ontwerp objecten die werken — meubels, lampen, gereedschappen; dingen die je elke dag in je hand neemt omdat ze beter zijn dan wat er al lag.",
      en: "I'm Michel Blaas, 24, a product designer based in Delft. I design objects that actually work — furniture, lamps, tools; things you reach for every day because they're better than what came before.",
    },
    lede_em: { nl: "werken", en: "actually work" },
    body: [
      {
        nl: "Op dit moment heb ik nog geen vast atelier — ik ben op zoek naar een ruimte in Delft of omgeving. Tot dan ontstaat het werk in 3D-printlabs, gedeelde werkplaatsen en aan de keukentafel.",
        en: "I don't have a dedicated studio yet — I'm currently looking for a space in or around Delft. Until then, the work happens in 3D print labs, shared workshops, and at the kitchen table.",
      },
      {
        nl: "Voor opdrachten ben ik beschikbaar voor productontwerp, freelance design en consultancy rond materiaalkeuze. Geen branding, geen apps, geen pitchdecks.",
        en: "For commissions I'm available for product design, freelance design and material consultancy. No branding, no apps, no pitch decks.",
      },
    ],
    education: [
      { label: { nl: "Master · Next Level Engineering", en: "Master · Next Level Engineering" }, year: "2025–26" },
      { label: { nl: "Bachelor · IPO, Haagse Hogeschool", en: "Bachelor · IPD, THUAS" }, year: "2021–25" },
      { label: { nl: "Afstudeerproject", en: "Graduation project" }, year: "2025" },
      { label: { nl: "Meeloopstage", en: "Internship" }, year: "2024" },
      { label: { nl: "Minor in Polen · half jaar", en: "Minor in Poland · semester" }, year: "2023" },
    ],
    bioDetails: [
      { key: { nl: "Geboren",   en: "Born" },      value: { nl: "2002",                    en: "2002" } },
      { key: { nl: "Opleiding", en: "Education" },  value: { nl: "MSc Next Level Engineering · 2025–26\n\nBachelor Industrieel Product Ontwerpen (IPO) · 2021–25\n\nDe Haagse Hogeschool · Delft", en: "MSc Next Level Engineering · 2025–26\n\nBachelor Industrial Product Design (IPD) · 2021–25\n\nThe Hague Univ. of Applied Sciences · Delft" } },
      { key: { nl: "Locatie",   en: "Location" },   value: { nl: "Delft · op zoek naar atelier", en: "Delft · seeking studio" } },
      { key: { nl: "Talen",     en: "Languages" },  value: { nl: "NL · EN · PL",            en: "NL · EN · PL" } },
      { key: { nl: "Werkt met", en: "Works with" }, value: { nl: "Kunststof, hout, metaal, textiel en elektronica", en: "Plastics, wood, metal, textile and electronics" } },
    ],
  },

  process: {
    label: { nl: "Werkwijze", en: "Method" },
    subtitle: { nl: "Van schets tot oplage", en: "From sketch to edition" },
    heading: { nl: ["Vijf stappen,", "één gesprek."], en: ["Five steps,", "one conversation."] },
    steps: [
      {
        num: "01",
        numLabel: { nl: "Gesprek", en: "Talk" },
        title: { nl: "Onder­zoek", en: "Re­search" },
        body: {
          nl: "We praten over de plek waar het object zal leven. Over wie het zal aanraken, en hoe vaak. Geen briefing, een gesprek.",
          en: "We talk about where the object will live. About who will touch it, and how often. Not a briefing — a conversation.",
        },
      },
      {
        num: "02",
        numLabel: { nl: "Schets", en: "Sketch" },
        title: { nl: "Hand", en: "Hand" },
        titleEm: true,
        body: {
          nl: "Potlood, pen — eerst schetsen. Zoekend naar de beste oplossing en vormgeving. Een week of twee in een schrift met kalkpapier voordat er ook maar één lijn digitaal wordt.",
          en: "Pencil, pen — sketch first. Looking for the best solution and form. A week or two in a notebook with tracing paper before a single line goes digital.",
        },
      },
      {
        num: "03",
        numLabel: "Model",
        title: "CAD",
        titleSuffix: { nl: "& 3D-print", en: "& 3D print" },
        body: {
          nl: "Digitaal model voor proportie, 3D-print voor gewicht en gevoel. Beide bestaan naast elkaar — geen één zonder de ander.",
          en: "Digital model for proportion, 3D print for weight and feel. The two coexist — neither one without the other.",
        },
      },
      {
        num: "04",
        numLabel: { nl: "Mockup", en: "Mock-up" },
        title: "Proto",
        titleEm: "type",
        body: {
          nl: "Eerste exemplaar in eindmateriaal, gemaakt met de productiepartner. We slijpen samen aan elk detail.",
          en: "First piece in final material, made with the production partner. We polish every detail together.",
        },
      },
      {
        num: "05",
        numLabel: { nl: "Oplage", en: "Edition" },
        title: "Pro­ductie",
        body: {
          nl: "Kleine oplages, genummerd en gesigneerd. Geen voorraad — elk stuk wordt na bestelling gemaakt.",
          en: "Small editions, numbered and signed. No stock — each piece is made after ordering.",
        },
      },
    ],
  },

  contact: {
    label: { nl: "Aan tafel", en: "At the table" },
    location: "Delft · NL",
    heading: {
      nl: ["Laten we", "iets maken."],
      en: ["Let us", "make something."],
    },
    email: "michelblaas@caiway.net",
    reply: { nl: "Antwoord binnen 48 uur.", en: "Reply within 48 hours." },
    channels: [
      {
        abbr: "IG",
        label: { nl: "@miensjel — projecten en proces", en: "@miensjel — projects and process" },
        href:  "#",
        arrow: "↗",
      },
      {
        abbr: "LI",
        label: { nl: "LinkedIn — voor zakelijke opdrachten", en: "LinkedIn — for business inquiries" },
        href:  "#",
        arrow: "↗",
      },
      {
        abbr: "E",
        label: { nl: "michelblaas@caiway.net", en: "michelblaas@caiway.net" },
        href:  "mailto:michelblaas@caiway.net",
        arrow: "→",
      },
    ],
  },
};
