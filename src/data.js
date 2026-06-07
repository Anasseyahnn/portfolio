// src/data.js — all real content, FR/EN.
export const DATA = {
  identity: {
    name: 'Bouagba Anassé Yahanan',
    short: 'Anassé Yahanan',
    initials: 'AY',
    email: 'anasseyahanan@gmail.com',
    location: { fr: 'Abidjan, Côte d’Ivoire', en: 'Abidjan, Ivory Coast' },
    cv: 'assets/CV_BOUAGBA_Anasse_ATS_v2.pdf',
    social: {
      github: 'https://github.com/Anasseyahnn',
      linkedin: 'https://linkedin.com/in/anasse-yahanan-bouagba-3b39aa242/',
      x: 'https://x.com/anasse_yahanan',
      kaggle: 'https://kaggle.com/anasseyahanan',
      blog: 'https://anasseyahnn.github.io/Anasseyahnn-wbs/',
    },
  },

  role: { fr: 'Data Scientist · Ingénieur IA · Spécialiste LLM', en: 'Data Scientist · AI Engineer · LLM Specialist' },
  tagline: {
    fr: 'Je transforme des données complexes en décisions, et je déploie des applications LLM robustes en production.',
    en: 'I turn complex data into decisions, and ship robust LLM applications to production.',
  },

  nav: {
    fr: [['about', 'À propos'], ['stack', 'Expertises'], ['work', 'Portfolio'], ['experience', 'Expérience'], ['writing', 'Articles'], ['contact', 'Contact']],
    en: [['about', 'About'], ['stack', 'Tech Stack'], ['work', 'Portfolio'], ['experience', 'Experience'], ['writing', 'Writing'], ['contact', 'Contact']],
  },

  metrics: [
    { v: 3, suf: '+', fr: 'ans d’expérience', en: 'years experience' },
    { v: 15, suf: '+', fr: 'projets IA / data', en: 'AI / data projects' },
    { v: 50, suf: '+', fr: 'professionnels formés', en: 'professionals trained' },
    { v: 10, suf: '+', fr: 'applications LLM', en: 'LLM applications' },
  ],

  partners: ['ASMA', 'INSSEDS', 'OpinionWay', 'Banque Atlantique'],

  about: {
    fr: [
      'Bouagba Anassé Yahanan est un Data Scientist, Ingénieur IA et Spécialiste LLM basé à Abidjan, doté de plus de 3 ans d’expérience reconnue en développement de solutions d’IA, data science et suivi-évaluation (MEAL) de projets financés par l’USAID et l’Ambassade des États-Unis.',
      'Expert en Python, R et SQL, il conçoit et déploie des modèles d’IA avancés, des applications propulsées par les LLMs, et automatise des pipelines de données complexes avec FastAPI, Docker et Kubernetes. Il excelle à traduire des technologies de pointe en produits de données à forte valeur.',
      'Acteur de la transmission, il est Consultant Formateur R & Python à l’INSSEDS, et créateur de BRVM AI — une plateforme SaaS d’analyse financière de la Bourse Régionale propulsée par l’IA et développée sous Next.js.',
    ],
    en: [
      'Bouagba Anassé Yahanan is an Abidjan-based Data Scientist, AI Engineer and LLM Specialist with 3+ years of proven experience in AI development, data science and Monitoring, Evaluation, Accountability & Learning (MEAL) for USAID and US Embassy funded projects.',
      'Expert in Python, R and SQL, he designs and deploys advanced AI models and LLM-powered applications, and automates complex data pipelines with FastAPI, Docker and Kubernetes. He excels at turning cutting-edge tech into high-value data products.',
      'An active contributor to the ecosystem, he is a Consultant R & Python Trainer at INSSEDS and the lead developer of BRVM AI — a Next.js, AI-powered SaaS for semantic analysis of the regional stock exchange.',
    ],
  },

  skills: ['Python', 'R', 'SQL', 'LLM', 'RAG', 'LangChain', 'FastAPI', 'Docker', 'Kubernetes', 'PyTorch', 'Scikit-Learn', 'Ollama', 'Groq', 'Power BI', 'Next.js', 'Streamlit', 'ggplot2', 'Quarto'],

  // Live-chat persona context fed to the model
  chatSeed: {
    fr: `Tu es l'assistant IA du portfolio d'Anassé Yahanan Bouagba, Data Scientist, Ingénieur IA et Spécialiste LLM basé à Abidjan. Réponds à la première personne au nom d'Anassé, de façon concise (2-4 phrases), chaleureuse et professionnelle, en français. Faits: 3+ ans d'expérience; expert Python/R/SQL, LLM, RAG, FastAPI, Docker, Kubernetes; créateur de BRVM AI (SaaS d'analyse boursière Next.js + IA); Consultant Formateur R & Python à l'INSSEDS (50+ étudiants); Chargé MEAL pour des projets de l'Ambassade des USA / ASMA (Back To School, Binkélema); Chargé d'études statistiques chez OpinionWay. Projets: assistant juridique ivoirien (NLP), prédiction cancer du sein (ML), SQL-Chat (texte→SQL), Vision OCR locale (Gemma-3), intégration Groq+R. Email: anasseyahanan@gmail.com. Si on demande quelque chose que tu ne sais pas, invite à le contacter par email.`,
    en: `You are the AI assistant of Anassé Yahanan Bouagba's portfolio — a Data Scientist, AI Engineer and LLM Specialist based in Abidjan. Answer in the first person as Anassé, concise (2-4 sentences), warm and professional, in English. Facts: 3+ years experience; expert in Python/R/SQL, LLM, RAG, FastAPI, Docker, Kubernetes; creator of BRVM AI (Next.js + AI stock-analysis SaaS); R & Python trainer at INSSEDS (50+ students); MEAL Officer for US Embassy / ASMA projects (Back To School, Binkélema); statistical analyst at OpinionWay. Projects: Ivorian legal assistant (NLP), breast-cancer prediction (ML), SQL-Chat (text→SQL), local Vision OCR (Gemma-3), Groq+R integration. Email: anasseyahanan@gmail.com. If asked something you don't know, invite them to email.`,
  },
  chatSuggest: {
    fr: ['Quelle est ton expertise en LLM ?', 'Parle-moi de BRVM AI', 'Quels outils utilises-tu ?', 'Es-tu disponible pour une mission ?'],
    en: ['What’s your LLM expertise?', 'Tell me about BRVM AI', 'Which tools do you use?', 'Are you available for a project?'],
  },

  spotlight: {
    title: 'BRVM AI',
    kicker: { fr: 'SaaS à l’honneur', en: 'Featured SaaS' },
    desc: {
      fr: 'Plateforme SaaS complète d’analyse des données financières et boursières de la BRVM. Architecture full-stack moderne (Next.js + Vercel) et modèles de langage de pointe (LLMs) intégrés pour des insights stratégiques à latence minimale.',
      en: 'A full SaaS platform for financial & market-intelligence analysis on the BRVM exchange. Modern full-stack architecture (Next.js + Vercel) with integrated state-of-the-art LLMs for strategic insights at minimal latency.',
    },
    stack: ['Next.js', 'Vercel', 'LLM', 'Finance', 'RAG'],
    link: 'https://brvm-ai.vercel.app/',
    img: 'assets/portfolio/brvmai.png',
  },

  work: {
    science: [
      { id: 'assistant-droit', title: 'Assistant Droit Ivoirien AI', img: 'assets/portfolio/assistant-droit.png', link: 'https://assistant-droit-ivoirien-ai.streamlit.app/', github: 'https://github.com/Anasseyahnn', tags: ['Python', 'NLP', 'LlamaIndex', 'Streamlit'], fr: 'Assistant IA pour l’analyse des textes juridiques et lois ivoiriennes en langage naturel.', en: 'AI assistant for analyzing Ivorian legal texts and laws in natural language.' },
      { id: 'cancer-predict', title: 'Prédiction Cancer du Sein', img: 'assets/portfolio/cancer-predict.png', link: 'https://cancerduseinpredict-kuv44djfci4eadeuxmjsda.streamlit.app/', github: 'https://github.com/Anasseyahnn', tags: ['Python', 'Machine Learning', 'Scikit-Learn'], fr: 'Classificateur diagnostique interactif (ML) pour la prédiction précoce du cancer du sein.', en: 'Interactive ML diagnostic classifier for early breast-cancer prediction.' },
      { id: 'usa-arrest', title: 'USA Arrests Stats', img: 'assets/portfolio/usa-arrests.png', github: 'https://github.com/Anasseyahnn/usa_arrest', link: 'https://github.com/Anasseyahnn/usa_arrest', tags: ['R', 'Shiny', 'ggplot2'], fr: 'Tableau de bord statistique interactif analysant les données de criminalité aux USA.', en: 'Interactive statistical dashboard analyzing US crime data.' },
      { id: 'olympics', title: 'Tableau de Bord JO', img: 'assets/portfolio/olympics-dashboard.png', link: 'https://anasseyahnn.github.io/Anasseyahnn-wbs/posts/dashboard/index.html', tags: ['R', 'Quarto', 'Dataviz'], fr: 'Dashboard analytique des résultats historiques des Jeux Olympiques (été & hiver).', en: 'Analytical dashboard of historical Olympic Games results (summer & winter).' },
      { id: 'simputation', title: 'Package Simputation (R)', img: 'assets/portfolio/simputation-package.png', link: 'https://anasseyahnn.github.io/Anasseyahnn-wbs/posts/simputation/index.html', tags: ['R', 'Statistics', 'Imputation'], fr: 'Guide pratique du package Simputation pour l’imputation avancée des valeurs manquantes.', en: 'Practical guide to the Simputation package for advanced missing-value imputation.' },
      { id: 'mpg', title: 'Analyse MPG (ggplot2)', img: 'assets/portfolio/mpg-analysis.png', link: 'https://anasseyahnn.github.io/Anasseyahnn-wbs/posts/post-with-code/index.html', tags: ['R', 'ggplot2', 'EDA'], fr: 'Analyse exploratoire rigoureuse de la consommation de carburant avec visualisations avancées.', en: 'Rigorous exploratory fuel-efficiency analysis with advanced visualizations.' },
    ],
    llm: [
      { id: 'brvmai', title: 'BRVM AI (SaaS)', img: 'assets/portfolio/brvmai.png', link: 'https://brvm-ai.vercel.app/', github: 'https://github.com/Anasseyahnn/BRVM-AI', tags: ['Next.js', 'Vercel', 'AI', 'Finance'], fr: 'Plateforme SaaS d’analyse financière et boursière automatisée par l’IA.', en: 'SaaS platform automating financial & stock-market intelligence with AI.' },
      { id: 'sql-chat', title: 'SQL-Chat (Generator)', img: 'assets/portfolio/sql-query.png', github: 'https://github.com/Anasseyahnn/sql_query_llm', link: 'https://github.com/Anasseyahnn/sql_query_llm', tags: ['Python', 'Ollama', 'Streamlit'], fr: 'Traduit les questions en langage naturel en requêtes SQL exécutées localement.', en: 'Translates natural-language questions into locally-executed SQL queries.' },
      { id: 'groq-r', title: 'Groq R Integration', img: 'assets/portfolio/groq-r.png', github: 'https://github.com/Anasseyahnn/Groq_R', link: 'https://github.com/Anasseyahnn/Groq_R', tags: ['R', 'Groq LPU', 'API'], fr: 'Package connectant des scripts statistiques R aux puces LPU ultra-rapides de Groq.', en: 'Package connecting R statistical scripts to Groq’s high-speed LPU APIs.' },
      { id: 'ocr', title: 'Vision OCR Pro', img: 'assets/portfolio/text-extract.png', github: 'https://github.com/Anasseyahnn/ai_text_extract', link: 'https://github.com/Anasseyahnn/ai_text_extract', tags: ['Python', 'Ollama', 'Gemma-3'], fr: 'Extraction de texte depuis des images par IA 100% locale, confidentialité préservée.', en: 'Privacy-first, 100% local AI text extraction from images using Gemma-3.' },
    ],
  },

  experience: {
    tracks: {
      ai: { fr: 'Data / IA & Études', en: 'Data / AI & Research' },
      meal: { fr: 'MEAL & Enseignement', en: 'MEAL & Teaching' },
      edu: { fr: 'Formation & Diplômes', en: 'Education & Certifications' },
    },
    ai: [
      { org: 'OpinionWay Afrique Subsaharienne', date: '2025 — present', role: { fr: 'Chargé d’Études Statistique & Marketing Senior', en: 'Senior Statistical & Market Research Analyst' }, bullets: { fr: ['Pilote 10+ études de marché de bout en bout pour grands comptes.', 'Optimise la segmentation client via clustering K-means (−40% de temps d’analyse).', 'Conçoit des dashboards Power BI adoptés par les décideurs.', 'Automatise les pipelines ETL en R & Python (−40% de temps de reporting).'], en: ['Led 10+ end-to-end market-research projects for corporate clients.', 'Optimized client segmentation via K-means clustering (−40% analysis time).', 'Designed Power BI dashboards adopted by decision-makers.', 'Automated ETL pipelines in R & Python (−40% reporting time).'] } },
      { org: 'Cabinet InsightPlus', date: '2024', role: { fr: 'Consultant — Chargé d’Étude Statistique & Marketing', en: 'Consultant — Statistical & Marketing Analyst' }, bullets: { fr: ['3 études de marché complètes en 3 mois (régressions, tests d’hypothèses).', 'Recommandations stratégiques fondées sur les données.'], en: ['3 full market studies in 3 months (regression, hypothesis testing).', 'Data-driven strategic recommendations for client offerings.'] } },
      { org: 'Banque Atlantique Côte d’Ivoire', date: '2022', role: { fr: 'Analyste Revenu Assurance Junior', en: 'Junior Revenue Assurance Analyst' }, bullets: { fr: ['Contrôle des données financières mensuelles, fiabilité 100% des rapports.', 'Détection et correction d’écarts comptables récurrents.'], en: ['Analyzed & controlled monthly financial data with 100% reporting reliability.', 'Detected and corrected recurrent accounting discrepancies.'] } },
    ],
    meal: [
      { org: 'Ambassade des USA / ASMA', date: '2024 — 2025', role: { fr: 'Chargé MEAL — Projet « Back To School »', en: 'MEAL Officer — “Back To School” Project' }, bullets: { fr: ['Conçoit le cadre logique et 15+ indicateurs d’impact (PIRS).', 'Déploie un dashboard Power BI temps réel (décisions en <24h).', 'Produit les rapports d’impact soumis aux bailleurs.'], en: ['Designed the full logframe and 15+ performance indicators (PIRS).', 'Deployed a real-time Power BI dashboard (decisions in <24h).', 'Produced impact reports submitted to donors.'] } },
      { org: 'INSSEDS', date: '2024 — present', role: { fr: 'Consultant Formateur — R & Python', en: 'Consultant Trainer — R & Python' }, bullets: { fr: ['Forme 50+ étudiants aux outils R & Python (satisfaction >85%).', 'Programme pédagogique axé sur des cas réels.'], en: ['Trained 50+ students in R & Python data workflows (>85% satisfaction).', 'Designed a practical, case-study-driven curriculum.'] } },
      { org: 'Ambassade des USA / ASMA', date: '2022 — 2024', role: { fr: 'Assistant MEAL — Projet « Binkélema »', en: 'MEAL Assistant — “Binkélema” Project' }, bullets: { fr: ['Suivi de 2+ ans de données terrain dans 2 pays (bailleurs US).', 'Co-rédige les rapports trimestriels (zéro non-conformité).'], en: ['Monitored 2+ years of field data across 2 countries (US donors).', 'Co-authored quarterly reports with zero non-conformity.'] } },
    ],
    edu: [
      { org: 'Institut Supérieur de Statistique, Économétrie et Data Science (INSSEDS)', date: '2020 — 2022', role: { fr: 'Master en Data Science', en: 'Master’s in Data Science' }, bullets: { fr: ['Formation avancée en modélisation statistique, Machine Learning et Data Science.', 'Projets pratiques sur des données réelles.'], en: ['Advanced training in statistical modeling, Machine Learning, and Data Science.', 'Hands-on projects with real-world data.'] } },
      { org: 'Université Félix Houphouët-Boigny — Cocody', date: '2017 — 2020', role: { fr: 'Licence de Physique', en: 'Bachelor’s in Physics' }, bullets: { fr: ['Fondation scientifique et mathématique rigoureuse.', 'Développement d’une forte capacité d’analyse et de résolution de problèmes complexes.'], en: ['Rigorous scientific and mathematical foundation.', 'Developed strong analytical and complex problem-solving skills.'] } },
      { org: 'USAID / PELAII', date: 'Formation', role: { fr: 'Formation Spécialisée MEAL', en: 'Specialized MEAL Training' }, bullets: { fr: ['Conception de cadres logiques et définition de KPIs.', 'Collecte, analyse de données, et création d’outils de reporting et de visualisation.'], en: ['Logical framework design and KPI definition.', 'Data collection, analysis, and creation of reporting/visualization tools.'] } },
    ],
  },

  resources: [
    { title: 'Attention Is All You Need', tag: 'Research Paper', link: 'https://arxiv.org/abs/1706.03762', fr: 'Le papier fondateur de l’architecture Transformer, base de tous les LLMs modernes.', en: 'The founding Transformer paper — the basis of every modern LLM.' },
    { title: 'Llama 3 Technical Report', tag: 'Technical Report', link: 'https://ai.meta.com/research/publications/the-llama-3-herd-of-models/', fr: 'Architecture et développement des modèles open-weights de Meta.', en: 'Architecture and development of Meta’s open-weight models.' },
    { title: 'Hugging Face NLP Course', tag: 'Course', link: 'https://huggingface.co/learn/nlp-course/', fr: 'Formation avancée sur Transformers et l’optimisation des modèles.', en: 'Advanced training on Transformers and model optimization.' },
  ],

  writing: {
    fr: { title: 'Articles & études de cas', sub: 'Tutoriels et guides analytiques pour démocratiser la data science — sur mon blog Quarto.', cta: 'Lire sur le blog' },
    en: { title: 'Writing & case studies', sub: 'Tutorials and analytical guides to democratize data science — on my Quarto blog.', cta: 'Read on the blog' },
    posts: [
      { t: 'Tableau de bord JO', topic: { fr: 'Dataviz · R · Quarto', en: 'Dataviz · R · Quarto' }, link: 'https://anasseyahnn.github.io/Anasseyahnn-wbs/posts/dashboard/index.html' },
      { t: 'Imputation avec Simputation', topic: { fr: 'Statistiques · R', en: 'Statistics · R' }, link: 'https://anasseyahnn.github.io/Anasseyahnn-wbs/posts/simputation/index.html' },
      { t: 'Analyse MPG & ggplot2', topic: { fr: 'EDA · R', en: 'EDA · R' }, link: 'https://anasseyahnn.github.io/Anasseyahnn-wbs/posts/post-with-code/index.html' },
    ],
  },
};
