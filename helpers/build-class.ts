const classList = [
  {
    "index": 0,
    "display": "I",
    "description": {
      "pt": "Seres animados, entes racionais, pessoas.",
      "fr": "Des êtres animés, des êtres rationnels, des gens.",
      "en": "Animated beings, rational beings, people."
    },
    "prefix": { "singular": "mu", "plural": "a" },
    "singularExample": {
      "pt": "mutu – pessoa",
      "fr": "mutu – personnes",
      "en": "mutu – person"
    },
    "pluralExample": {
      "pt": "atu – pessoas",
      "fr": "atu – personnes",
      "en": "atu – people"
    }
  },
  {
    "index": 1,
    "display": "II",
    "description": {
      "pt": "Seres inanimados, abrange quase todos os nomes de animais e plantas.",
      "fr": "Les êtres inanimés, englobe presque tous les noms d'animaux et de plantes.",
      "en": "Inanimate beings, covers almost all the names of animals and plants."
    },
    "prefix": { "singular": "mu", "plural": "mi" },
    "singularExample": {
      "pt": "mutue – cabeça",
      "fr": "mutue – diriger",
      "en": "mutue – head"
    },
    "pluralExample": {
      "pt": "mitue – cabeças",
      "fr": "mitue – têtes",
      "en": "mitue – heads"
    }
  },
  {
    "index": 2,
    "display": "III",
    "description": {
      "pt": "Nomes de Pessoas, animais, aumentativos",
      "fr": "Noms de personnes, animaux, augmentatifs",
      "en": "Names of People, animals, augmentatives"
    },
    "prefix": { "singular": "ki", "plural": "i" },
    "singularExample": {
      "pt": "kima – coisa",
      "fr": "kima – chose",
      "en": "kima – thing"
    },
    "pluralExample": {
      "pt": "ima – coisas",
      "fr": "ima – des choses",
      "en": "ima – things"
    }
  },
  {
    "index": 3,
    "display": "IV",
    "description": {
      "pt": "Objetos de Grandeza",
      "fr": "objets de grandeur",
      "en": "objects of magnitude"
    },
    "prefix": { "singular": "ri", "plural": "ma" },
    "singularExample": {
      "pt": "ritari – pedra",
      "fr": "ritari – calcul",
      "en": "ritari – stone"
    },
    "pluralExample": {
      "pt": "matari – pedras",
      "fr": "matari – des pierres",
      "en": "matari – stones"
    }
  },
  {
    "index": 4,
    "display": "V",
    "description": {
      "pt": "Termos abstratos",
      "fr": "termes abstraits",
      "en": "abstract terms"
    },
    "prefix": { "singular": "u", "plural": "mau" },
    "singularExample": {
      "pt": "uta – arma",
      "fr": "uta – arme",
      "en": "uta – weapon"
    },
    "pluralExample": {
      "pt": "mauta – armas",
      "fr": "mauta – armes",
      "en": "mauta – weapons"
    }
  },
  {
    "index": 5,
    "display": "VI",
    "description": {
      "pt": "Objetos de extensão",
      "fr": "Objets d'extension",
      "en": "Extension objects"
    },
    "prefix": { "singular": "lu", "plural": "malu" },
    "singularExample": {
      "pt": "lumbu – muros",
      "fr": "lumbu – des murs",
      "en": "lumbu – walls"
    },
    "pluralExample": {
      "pt": "malumbu – muros",
      "fr": "malumbu – des murs",
      "en": "malumbu – walls"
    }
  },
  {
    "index": 6,
    "display": "VII",
    "description": {
      "pt": "Termos abstratos",
      "fr": "termes abstraits",
      "en": "abstract terms"
    },
    "prefix": { "singular": "tu", "plural": "matu" },
    "singularExample": {
      "pt": "tubia – fogo",
      "fr": "tubia – Feu",
      "en": "tubia – fire"
    },
    "pluralExample": {
      "pt": "matubia – fogos",
      "fr": "matubia – les feux",
      "en": "matubia – fires"
    }
  },
  {
    "index": 7,
    "display": "VIII",
    "description": {
      "pt": "Termos verbais",
      "fr": "termes verbaux",
      "en": "verbal terms"
    },
    "prefix": { "singular": "ku", "plural": "maku" },
    "singularExample": {
      "pt": "kuria – comida",
      "fr": "kuria – nourriture",
      "en": "kuria – food"
    },
    "pluralExample": {
      "pt": "makuria – comidas",
      "fr": "makuria – nourriture",
      "en": "makuria – food"
    }
  },
  {
    "index": 8,
    "display": "IX",
    "description": {
      "pt": "Animais, coisas, pessoas, linguas estrangeiras, etc...",
      "fr": "Animaux, choses, personnes, langues étrangères, etc...",
      "en": "Animals, things, people, foreign languages, etc..."
    },
    "prefix": { "singular": "--", "plural": "ji" },
    "singularExample": {
      "pt": "mbiji – peixe",
      "fr": "mbiji – poisson",
      "en": "mbiji – fish"
    },
    "pluralExample": {
      "pt": "jimbiji – peixes",
      "fr": "jimbiji – des poissons",
      "en": "jimbiji – fishes"
    }
  },
  {
    "index": 9,
    "display": "X",
    "description": {
      "pt": "Diminutivos",
      "fr": "Diminutif",
      "en": "Diminutive"
    },
    "prefix": { "singular": "ka", "plural": "tu" },
    "singularExample": {
      "pt": "",
      "fr": "",
      "en": ""
    },
    "pluralExample": {
      "pt": "",
      "fr": "",
      "en": ""
    }
  }
]

export const buildClass = (classNumber: string) => classList[Number(classNumber)]