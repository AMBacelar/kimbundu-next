const tagMap = [
  {
    "index": 0,
    "en": "Adjective",
    "fr": "Adjectif",
    "pt": "Adjetivo"
  },
  {
    "index": 1,
    "en": "Verbal Adjective",
    "fr": "Adjectif verbal",
    "pt": "Adjetivo Verbal"
  },
  {
    "index": 2,
    "en": "Adverb",
    "fr": "Adverbe",
    "pt": "Advérbio"
  },
  {
    "index": 3,
    "en": "Adverb of Comparison",
    "fr": "Adverbe de comparaison",
    "pt": "Advérbio de Comparação"
  },
  {
    "index": 4,
    "en": "Interrogation Adverb",
    "fr": "Interrogation Adverbe",
    "pt": "Advérbio de Interrogação"
  },
  {
    "index": 5,
    "en": "Adverb of Denial",
    "fr": "Adverbe de refus",
    "pt": "Advérbio de Negação"
  },
  {
    "index": 6,
    "en": "Anatomy",
    "fr": "Anatomie",
    "pt": "Anatomia"
  },
  {
    "index": 7,
    "en": "arachnology",
    "fr": "arachnologie",
    "pt": "Aracnologia"
  },
  {
    "index": 8,
    "en": "Artifact/Object for ritual use",
    "fr": "Artefact/Objet à usage rituel",
    "pt": "Artefato/Objeto de uso ritualístico"
  },
  {
    "index": 9,
    "en": "Article",
    "fr": "Article",
    "pt": "Artigo"
  },
  {
    "index": 10,
    "en": "Astronomy",
    "fr": "Astronomie",
    "pt": "Astronomia"
  },
  {
    "index": 11,
    "en": "botany",
    "fr": "botanique",
    "pt": "Botânica"
  },
  {
    "index": 12,
    "en": "Brazilianism",
    "fr": "Brésilisme",
    "pt": "Brasileirismo"
  },
  {
    "index": 13,
    "en": "carpentry",
    "fr": "menuiserie",
    "pt": "carpintaria"
  },
  {
    "index": 14,
    "en": "Ritualistic Ceremony of a Religious Character",
    "fr": "Cérémonie rituelle à caractère religieux",
    "pt": "Cerimônia Ritualística de caráter religioso"
  },
  {
    "index": 15,
    "en": "Colloquial",
    "fr": "Familier",
    "pt": "Coloquial"
  },
  {
    "index": 16,
    "en": "Conjunction",
    "fr": "Conjonction",
    "pt": "Conjunção"
  },
  {
    "index": 17,
    "en": "Ritual Cuisine",
    "fr": "Cuisine rituelle",
    "pt": "Cozinha Ritualística"
  },
  {
    "index": 18,
    "en": "Diminutive",
    "fr": "Diminutif",
    "pt": "Diminutivo"
  },
  {
    "index": 19,
    "en": "Entomology",
    "fr": "Entomologie",
    "pt": "Entomologia"
  },
  {
    "index": 20,
    "en": "Expression",
    "fr": "Expression",
    "pt": "Expressão"
  },
  {
    "index": 21,
    "en": "Expression of Salutation to a deity, person of title",
    "fr": "Expression de salutation à une divinité, personne de titre",
    "pt": "Expressão de Saudação à uma divindade, pessoa de titulo"
  },
  {
    "index": 22,
    "en": "Feminine",
    "fr": "Féminin",
    "pt": "Feminino"
  },
  {
    "index": 23,
    "en": "Figured",
    "fr": "Chiffré",
    "pt": "Figurado"
  },
  {
    "index": 24,
    "en": "Phrase",
    "fr": "Phrase",
    "pt": "Frase"
  },
  {
    "index": 25,
    "en": "Gastronomy",
    "fr": "Gastronomie",
    "pt": "Gastronomia"
  },
  {
    "index": 26,
    "en": "Geometry",
    "fr": "Géométrie",
    "pt": "Geometria"
  },
  {
    "index": 27,
    "en": "Gynecology",
    "fr": "Gynécologie",
    "pt": "Ginecologia"
  },
  {
    "index": 28,
    "en": "Slang",
    "fr": "Argot",
    "pt": "Gíria"
  },
  {
    "index": 29,
    "en": "Grammar",
    "fr": "Grammaire",
    "pt": "Gramática"
  },
  {
    "index": 30,
    "en": "Herpetology",
    "fr": "Herpétologie",
    "pt": "Herpetologia"
  },
  {
    "index": 31,
    "en": "Ichthyology",
    "fr": "Ichtyologie",
    "pt": "Ictiologia"
  },
  {
    "index": 32,
    "en": "Computing",
    "fr": "Informatique",
    "pt": "Informática"
  },
  {
    "index": 33,
    "en": "Ritual Instrument",
    "fr": "Instrument rituel",
    "pt": "Instrumento Ritualístico"
  },
  {
    "index": 34,
    "en": "Interjection",
    "fr": "Interjection",
    "pt": "Interjeição"
  },
  {
    "index": 35,
    "en": "Liturgical",
    "fr": "Liturgique",
    "pt": "Litúrgico"
  },
  {
    "index": 36,
    "en": "Adverbial Voiceover",
    "fr": "Voix off adverbiale",
    "pt": "Locução Adverbial"
  },
  {
    "index": 37,
    "en": "Conjunctive utterance",
    "fr": "Énoncé conjonctif",
    "pt": "Locução Conjuntiva"
  },
  {
    "index": 38,
    "en": "Interjective Voiceover",
    "fr": "Voix off interjective",
    "pt": "Locução Interjetiva"
  },
  {
    "index": 39,
    "en": "Masculine",
    "fr": "Masculin",
    "pt": "Masculino"
  },
  {
    "index": 40,
    "en": "Medicine",
    "fr": "Médecine",
    "pt": "Medicina"
  },
  {
    "index": 41,
    "en": "Metal, Metallurgy",
    "fr": "Métal, Métallurgie",
    "pt": "Metal, Metalurgia"
  },
  {
    "index": 42,
    "en": "Meteorology",
    "fr": "Météorologie",
    "pt": "Meteorologia"
  },
  {
    "index": 43,
    "en": "Metrology",
    "fr": "Métrologie",
    "pt": "Metrologia"
  },
  {
    "index": 44,
    "en": "Mythology",
    "fr": "Mythologie",
    "pt": "Mitologia"
  },
  {
    "index": 45,
    "en": "Song",
    "fr": "Chanson",
    "pt": "Música"
  },
  {
    "index": 46,
    "en": "Denial",
    "fr": "Déni",
    "pt": "Negação"
  },
  {
    "index": 47,
    "en": "Own name",
    "fr": "Nom propre",
    "pt": "Nome próprio"
  },
  {
    "index": 48,
    "en": "Number",
    "fr": "Numéro",
    "pt": "Número"
  },
  {
    "index": 49,
    "en": "Ritual Offering",
    "fr": "Offrande rituelle",
    "pt": "Oferenda Ritualística"
  },
  {
    "index": 50,
    "en": "Ophthalmology",
    "fr": "Ophtalmologie",
    "pt": "Oftalmologia"
  },
  {
    "index": 51,
    "en": "Ornithology",
    "fr": "Ornithologie",
    "pt": "Ornitologia"
  },
  {
    "index": 52,
    "en": "Auxiliary Particle",
    "fr": "Particule Auxiliaire",
    "pt": "Partícula Auxiliar"
  },
  {
    "index": 53,
    "en": "Interrogative Particle",
    "fr": "Particule Interrogative",
    "pt": "Partícula Interrogativa"
  },
  {
    "index": 54,
    "en": "Pejorative",
    "fr": "Péjoratif",
    "pt": "Pejorativo"
  },
  {
    "index": 55,
    "en": "Plural",
    "fr": "Pluriel",
    "pt": "Plural"
  },
  {
    "index": 56,
    "en": "popular",
    "fr": "populaire",
    "pt": "popular"
  },
  {
    "index": 57,
    "en": "Auxiliary prefix",
    "fr": "Préfixe auxiliaire",
    "pt": "Prefixo Auxiliar"
  },
  {
    "index": 58,
    "en": "Interrogation Prefix",
    "fr": "Préfixe d'interrogation",
    "pt": "Prefixo de Interrogação"
  },
  {
    "index": 59,
    "en": "Preposition",
    "fr": "Préposition",
    "pt": "Preposição"
  },
  {
    "index": 60,
    "en": "Pronoun",
    "fr": "Pronom",
    "pt": "Pronome"
  },
  {
    "index": 61,
    "en": "Demonstrative pronoun",
    "fr": "Pronom démonstratif",
    "pt": "Pronome Demonstrativo"
  },
  {
    "index": 62,
    "en": "Interrogative Pronoun",
    "fr": "Pronom interrogatif",
    "pt": "Pronome Interrogativo"
  },
  {
    "index": 63,
    "en": "Personal pronoun",
    "fr": "Pronom personnel",
    "pt": "Pronome Pessoal"
  },
  {
    "index": 64,
    "en": "Possessive pronoun",
    "fr": "Pronom possessif",
    "pt": "Pronome Possessivo"
  },
  {
    "index": 65,
    "en": "Chemistry",
    "fr": "Chimie",
    "pt": "Química"
  },
  {
    "index": 66,
    "en": "Religious",
    "fr": "Religieux",
    "pt": "Religioso"
  },
  {
    "index": 67,
    "en": "Singular",
    "fr": "Singulier",
    "pt": "Singular"
  },
  {
    "index": 68,
    "en": "Substantive",
    "fr": "Substantiel",
    "pt": "Substantivo"
  },
  {
    "index": 69,
    "en": "female noun",
    "fr": "nom féminin",
    "pt": "Substantivo Feminino"
  },
  {
    "index": 70,
    "en": "masculine noun",
    "fr": "nom masculin",
    "pt": "Substantivo Masculino"
  },
  {
    "index": 71,
    "en": "term in english",
    "fr": "terme en anglais",
    "pt": "Termo em Inglês"
  },
  {
    "index": 72,
    "en": "Ritualistic Ring/Melody of a religious character",
    "fr": "Sonnerie/Mélodie rituelle à caractère religieux",
    "pt": "Toque/Melodia Ritualística de caráter religioso"
  },
  {
    "index": 73,
    "en": "mass unit",
    "fr": "unité de masse",
    "pt": "Unidade de Massa"
  },
  {
    "index": 74,
    "en": "Verb",
    "fr": "Verbe",
    "pt": "Verbo"
  },
  {
    "index": 75,
    "en": "Verb",
    "fr": "Verbe",
    "pt": "Verbo"
  },
  {
    "index": 76,
    "en": "Auxiliary verb",
    "fr": "Verbe auxiliaire",
    "pt": "Verbo auxiliar"
  },
  {
    "index": 77,
    "en": "Intransitive Verb",
    "fr": "Verbe intransitif",
    "pt": "Verbo Intransitivo"
  },
  {
    "index": 78,
    "en": "Transitive Verb",
    "fr": "Verbe transitif",
    "pt": "Verbo Transitivo"
  },
  {
    "index": 79,
    "en": "Direct Transitive Verb",
    "fr": "Verbe transitif direct",
    "pt": "Verbo Transitivo Direto"
  },
  {
    "index": 80,
    "en": "Indirect Transitive Verb",
    "fr": "Verbe transitif indirect",
    "pt": "Verbo Transitivo Indireto"
  },
  {
    "index": 81,
    "en": "Zoology",
    "fr": "Zoologie",
    "pt": "Zoologia"
  },
  {
    "index": 82,
    "en": "Clothing",
    "fr": "Vêtements",
    "pt": "Confecções"
  },
  {
    "index": 83,
    "en": "Military",
    "fr": "Militaire",
    "pt": "Militares"
  },
  {
    "index": 84,
    "en": "Legal",
    "fr": "Légal",
    "pt": "Jurídico"
  },
]

export const getTagObject = (tag: string) => tagMap[tag];
export const getTagString = (tag: string, locale: string) => tagMap[tag][locale];