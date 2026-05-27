export type WorkSize = "lg" | "md" | "sm";
export type ModelName =
  | "monolith"
  | "chair"
  | "lamp"
  | "vase"
  | "speaker"
  | "stool"
  | "kettle"
  | "bust";

export interface WorkItem {
  model: ModelName;
  dist: number;
  height: number;
  speed: number;
  bg?: number;
  category: string;
  year: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  specs: string[];
  size: WorkSize;
}

export const home = {
  nav: [
    { label: "Werk", href: "#werk" },
    { label: "Studio", href: "#studio" },
    { label: "Proces", href: "#proces" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    label: "№ 01 — Portfolio · Productontwerp · Rotterdam / Eindhoven",
    titleLines: ["Objecten", "om aan te", "raken"],
    meta: [
      { term: "Discipline", desc: "Industrieel ontwerp, meubel, verlichting" },
      { term: "Methode", desc: "Schets · CAD · Prototype · Productie" },
      { term: "Materialen", desc: "Hout, keramiek, metaal, kurk, textiel" },
      { term: "Status", desc: "Open voor opdrachten — najaar 2026" },
    ],
    scrollCue: "Scroll · 06 werken",
    dragHint: "Sleep om te draaien",
    availability: "Beschikbaar Q3 '26",
  },

  ticker: ["Lijn", "Volume", "Aanraking", "Materie", "Gewicht", "Schaduw", "Stilte"],

  werk: {
    label: { num: "№ 02", text: "Geselecteerd werk · 2021 — 2026", count: "06 stuks" },
    headingLines: ["Zes objecten,", "zes verhalen."],
    items: [
      {
        model: "chair" as ModelName,
        dist: 5, height: 0.9, speed: 0.6,
        category: "Meubel", year: "2026",
        title: "Halma", subtitle: "01",
        price: "€ 2.400 / oplage 40",
        description:
          "Een loungestoel gebouwd rond één continue rugcurve. De armleuningen lopen in één lijn door naar de zitting; geen las, geen scharnier. Ontwikkeld met Atelier Vlinders.",
        specs: ["Essenhout", "Linnen 320g", "Inklapbaar"],
        size: "lg" as WorkSize,
      },
      {
        model: "lamp" as ModelName,
        dist: 5, height: 1, speed: 0.7,
        category: "Verlichting", year: "2025",
        title: "Boog", subtitle: "vloerlamp",
        price: "€ 980",
        description:
          "Een 1,1 meter lange overhang in geanodiseerd aluminium. De lampkap kan met de hand in elke hoek vastklikken.",
        specs: ["Aluminium", "2700K LED", "3 standen"],
        size: "md" as WorkSize,
      },
      {
        model: "vase" as ModelName,
        dist: 5.5, height: 1.3, speed: 0.8,
        category: "Keramiek", year: "2025",
        title: "Knoop", subtitle: "vaas",
        price: "€ 320 / handgedraaid",
        description:
          "Drie volumes die elkaar onderbreken — een vorm die voortkomt uit het zoeken naar het kleinste contactpunt tussen klei en pottenbakkersschijf.",
        specs: ["Steengoed", "Mat glazuur", "1,2 kg"],
        size: "md" as WorkSize,
      },
      {
        model: "speaker" as ModelName,
        dist: 5, height: 1.1, speed: 0.7,
        category: "Elektronica", year: "2024",
        title: "Toren", subtitle: "speaker",
        price: "In productie — Klang Audio",
        description:
          "360° geluid in een cilinder van 12 cm breed. Eén knop, geen scherm, geen app. Zes maanden onderzoek naar de minimale interface voor luisteren.",
        specs: ["Massief eiken", "Messing", "Bluetooth 5.3"],
        size: "lg" as WorkSize,
      },
      {
        model: "stool" as ModelName,
        dist: 5, height: 0.9, speed: 0.7,
        category: "Meubel", year: "2023",
        title: "Cork", subtitle: "06",
        price: "€ 290",
        description:
          "Een lichte kruk uit één blok kurk, op drie eikenhouten poten. Drie poten omdat een kruk niet hoeft te wankelen om eerlijk te zijn.",
        specs: ["Kurk", "Eiken", "2,1 kg"],
        size: "sm" as WorkSize,
      },
      {
        model: "kettle" as ModelName,
        dist: 4.2, height: 0.7, speed: 0.6,
        category: "Object", year: "2022",
        title: "Theefluit", subtitle: "nº 3",
        price: "Prototype",
        description:
          "Een ketel die in plaats van te fluiten een lage toon zingt. Ontworpen in samenwerking met instrumentbouwer Annet Boon.",
        specs: ["Messing", "Walnoothout", "1,2 L"],
        size: "sm" as WorkSize,
      },
      {
        model: "monolith" as ModelName,
        dist: 5.6, height: 1.4, speed: 0.9, bg: 0xe2dccf,
        category: "Sculptuur", year: "2026",
        title: "Totem", subtitle: "0",
        price: "Unieke editie",
        description:
          "Een verticale studie in proportie en materiaal — terracotta, room en messing op één as. Onderdeel van een serie van drie.",
        specs: ["Keramiek", "Messing", "1/3"],
        size: "sm" as WorkSize,
      },
    ] as WorkItem[],
  },

  studio: {
    label: { num: "№ 03", text: "Over de ontwerper", since: "Sinds 2014" },
    headingLines: ["Een rustige", "vorm in een", "luide wereld."],
    lede: "Ik ben Michel Bekkers. Ik ontwerp objecten die vertragen — meubels, lampen, dingen die elke dag in je hand passen.",
    body: [
      "Mijn werk ontstaat in een atelier in Rotterdam, samen met een vaste kring van houtbewerkers, pottenbakkers en metaalwerkers in Eindhoven, Lissabon en Kyoto. Elk stuk is een onderhandeling tussen mijn tekening en hun materiaal.",
      "Voor opdrachten ben ik beschikbaar voor productontwerp, art direction van collecties en consultancy rond materiaalkeuze. Geen branding, geen apps, geen pitchdecks.",
    ],
    clients: [
      { name: "Klang Audio", period: "2024–" },
      { name: "Vlinders Atelier", period: "2022–" },
      { name: "Studio Pots NL", period: "2021–" },
      { name: "Muji × DDW", period: "2023" },
      { name: "Hella Jongerius", period: "2019–22" },
      { name: "Maarten Baas Studio", period: "2016–18" },
    ],
    bio: {
      portraitTag: "— Portret, in klei",
      portraitYear: "2026",
      details: [
        { term: "Geboren", desc: "Eindhoven, 1989" },
        { term: "Opgeleid", desc: "Design Academy Eindhoven, 2014" },
        { term: "Atelier", desc: "Rotterdam Noord" },
        { term: "Prijzen", desc: "Wallpaper* design '22, DDW honorable '23" },
        { term: "Publicaties", desc: "Dezeen, Frame, Damn°, Apartamento" },
        { term: "Talen", desc: "NL · EN · DE" },
      ],
    },
  },

  proces: {
    label: { num: "№ 04", text: "Werkwijze", sub: "Van schets tot oplage" },
    headingLines: ["Vijf stappen,", "één gesprek."],
    steps: [
      {
        num: "01 / Gesprek",
        title: "Onderzoek",
        body: "We praten over de plek waar het object zal leven. Over wie het zal aanraken, en hoe vaak. Geen briefing, een gesprek.",
      },
      {
        num: "02 / Schets",
        titleItalic: "Hand",
        body: "Alleen potlood. Twee weken in een schrift met kalkpapier. Vorm zoekt materiaal, materiaal zoekt vorm.",
      },
      {
        num: "03 / Model",
        title: "CAD & klei",
        body: "Digitaal model voor proportie, fysiek model voor gewicht. Beide bestaan naast elkaar — geen één zonder de ander.",
      },
      {
        num: "04 / Mockup",
        title: "Proto",
        titleItalicSuffix: "type",
        body: "Eerste exemplaar in eindmateriaal, gemaakt met de productiepartner. We slijpen samen aan elk detail.",
      },
      {
        num: "05 / Oplage",
        title: "Productie",
        body: "Kleine oplages, genummerd en gesigneerd. Geen voorraad — elk stuk wordt na bestelling gemaakt.",
      },
    ],
  },

  contact: {
    label: { num: "№ 05", text: "Aan tafel", location: "Rotterdam · NL" },
    headingLines: ["Laten we", "iets maken."],
    email: "michelblaas@caiway.net",
    reply: "Antwoord binnen 48 uur · Geen koude pitches a.u.b.",
    channels: [
      { code: "IG", label: "@michel.bekkers — studio dagboek", href: "#", arrow: "↗" },
      { code: "JE", label: "Are.na — referentiebibliotheek", href: "#", arrow: "↗" },
      { code: "LI", label: "LinkedIn — voor zakelijke opdrachten", href: "#", arrow: "↗" },
      { code: "T", label: "+31 · 6 · 12 34 56 78", href: "tel:+31612345678", arrow: "→" },
    ],
  },

  footer: {
    copy: "© 2026 Michel Bekkers",
    kvk: "KvK 87234561 · BTW NL00321B01",
    address: "Studio Hofbogen 84-D",
    city: "3032 PA Rotterdam · NL",
    built: "Site gebouwd 2026",
    tech: "Interactief 3D — sleep om te draaien",
  },
};
