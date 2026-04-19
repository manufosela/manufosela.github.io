export const locales = ["en", "es"];
export const defaultLocale = "en";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.guide": "Guide",
    "nav.language": "Language",
    "theme.light": "Light mode",
    "theme.dark": "Dark mode",
    "footer.tagline": "Lightweight, accessible, standards-first.",
    "hero.eyebrow": "Web Components / Design Systems",
    "hero.titleLine1": "Design-focused",
    "hero.titleLine2": "web components",
    "hero.titleAccent": "built with care.",
    "section.catalogs.title": "Catalogs",
    "section.catalogs.description":
      "Design systems, utilities, and focused component libraries. Each catalog has live demos, playgrounds, and accessibility built-in.",
    "section.exampleApps.title": "Example Apps",
    "section.exampleApps.description":
      "Complete apps built using components from the catalogs above — real-world usage examples.",
    "section.learn.title": "Learn",
    "section.learn.description":
      "Guides and best practices from building 50+ production web components.",
    "tag.catalogFlagship": "Catalog / Flagship",
    "tag.catalog": "Catalog",
    "tag.demo": "Demo",
    "tag.guide": "Guide",
    "tag.workshop": "Workshop",
    "tag.tool": "Tool",
    "cta.explore": "Explore",
    "cta.open": "Open",
    "cta.read": "Read",
    "cta.openGithub": "Open on GitHub",
    "learn.guide.title": "Building Web Components — A Practical Guide",
    "learn.guide.description":
      "Principles, patterns, and best practices: when to build, naming, data flow, accessibility, performance, and more.",
    "learn.workshop.title": "Make a Simple Carousel with Lit",
    "learn.workshop.description":
      "Hands-on workshop walking through the creation of a carousel web component with LitElement, step by step.",
    "learn.generator.title": "generator-litelement-webcomponent",
    "learn.generator.description":
      "Yeoman generator (published on npm) to scaffold a new LitElement web component with a sensible structure out of the box.",
  },
  es: {
    "nav.home": "Inicio",
    "nav.guide": "Guía",
    "nav.language": "Idioma",
    "theme.light": "Modo claro",
    "theme.dark": "Modo oscuro",
    "footer.tagline": "Ligero, accesible y orientado a estándares.",
    "hero.eyebrow": "Web Components / Sistemas de diseño",
    "hero.titleLine1": "Web components",
    "hero.titleLine2": "con foco en diseño",
    "hero.titleAccent": "construidos con mimo.",
    "section.catalogs.title": "Catálogos",
    "section.catalogs.description":
      "Sistemas de diseño, utilidades y librerías de componentes centradas. Cada catálogo incluye demos en vivo, playgrounds y accesibilidad de serie.",
    "section.exampleApps.title": "Apps de ejemplo",
    "section.exampleApps.description":
      "Aplicaciones completas construidas con los componentes de los catálogos de arriba — ejemplos de uso real.",
    "section.learn.title": "Aprender",
    "section.learn.description":
      "Guías y buenas prácticas extraídas de construir más de 50 web components en producción.",
    "tag.catalogFlagship": "Catálogo / Destacado",
    "tag.catalog": "Catálogo",
    "tag.demo": "Demo",
    "tag.guide": "Guía",
    "tag.workshop": "Taller",
    "tag.tool": "Herramienta",
    "cta.explore": "Explorar",
    "cta.open": "Abrir",
    "cta.read": "Leer",
    "cta.openGithub": "Abrir en GitHub",
    "learn.guide.title": "Construir Web Components — Una guía práctica",
    "learn.guide.description":
      "Principios, patrones y buenas prácticas: cuándo construir, nomenclatura, flujo de datos, accesibilidad, rendimiento y más.",
    "learn.workshop.title": "Crea un carousel sencillo con Lit",
    "learn.workshop.description":
      "Taller paso a paso para construir un web component de tipo carousel con LitElement.",
    "learn.generator.title": "generator-litelement-webcomponent",
    "learn.generator.description":
      "Generador Yeoman (publicado en npm) para crear un nuevo web component con LitElement y una estructura sensata de partida.",
  },
};

export const t = (locale, key) => ui[locale]?.[key] ?? ui[defaultLocale][key] ?? key;

export const localizedPath = (locale, path) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  return `/${locale}${normalized}`;
};
