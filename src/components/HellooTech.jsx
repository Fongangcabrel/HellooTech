import { useState, useEffect, useRef } from "react";
import {
  Globe, Smartphone, Brain, Rocket, Database, ClipboardList,
  Activity, Layers, Wrench, Server, Menu, X, Mail, Phone, MapPin,
  ArrowRight, ArrowUpRight, MessageCircle, ChevronDown, Plus, Minus,
  Check, Star, Zap, Shield, Clock, Award, Search, PenTool, Code2,
  BarChart2, Rocket as RocketIcon, Linkedin, Facebook, Instagram
} from "lucide-react";

/* ============================ TOKENS ============================ */
const SKY      = "#0EA5E9";
const SKY_L    = "#38BDF8";
const SKY_D    = "#0284C7";
const SKY_50   = "#F0F9FF";
const SKY_100  = "#E0F2FE";
const INK      = "#0B1220";
const BODY     = "#475569";
const MUTED    = "#94A3B8";
const BORDER   = "#E6EDF5";
const SURFACE  = "#F6FAFD";
const WHITE    = "#FFFFFF";

/* ============================ STATIC (language-independent) ============================ */
const SVC_ICONS    = [Globe, Smartphone, Brain, Rocket, Database, ClipboardList, Activity, Layers, Wrench, Server];
const SVC_TAGS     = [["React.js","TypeScript","PWA"],["React Native","Android","iOS"],["Python","Pandas","Power BI"],["FastAPI","REST API","AsyncIO"],["SQL Server","PostgreSQL","MySQL"],["Scrum","Kanban","UML"],["WebSockets","Redis","Chart.js"],["FastAPI","SQLAlchemy","React"],["VPS","SSH","Linux"],["Hostinger","GitHub Actions","CI/CD"]];
const PROC_ICONS   = [Search, PenTool, Code2, RocketIcon];
const PILLAR_ICONS = [Award, Zap, Shield, Clock];

const PROJECTS = [
  { name:"KPIFlow",           cat:"web",    stack:["FastAPI","PostgreSQL","SQLAlchemy","Jinja2","Nginx","Debian"],                      url:null },
  { name:"VYNTIX",            cat:"data",   stack:["FastAPI","SQL Server","SQLite","Redis","WebSockets","Pandas"],                      url:null },
  { name:"SMARTY",            cat:"mobile", stack:["React Native","TypeScript","FastAPI","SQLAlchemy","PostgreSQL","Redis"],            url:null },
  { name:"cocosecret.shop",   cat:"web",    stack:["PHP","Notchpay API"],                                                              url:"https://cocosecret.store/landing.php" },
  { name:"FlowI",             cat:"reseau", stack:["Python","FastAPI","React"],                                                         url:null },
  { name:"SSAS",              cat:"data",   stack:["Python","Flask","SQL Server"],                                                      url:null },
  { name:"SCRIPX",            cat:"reseau", stack:["PowerShell"],                                                                       url:null },
  { name:"Hospiconnect",      cat:"mobile", stack:["React Native","FastAPI","PostgreSQL"],                                              url:null },
  { name:"Coco Italia Beach", cat:"web",    stack:["PHP","Stripe API"],                                                                 url:"https://www.cocoitaliabeach.com" },
];
const CAT_KEYS = ["all","web","mobile","data","reseau"];

const CERTS = [
  "IBM Data Science Professional Certificate · En cours",
  "AWS Cloud Practitioner CLF-C02 · En cours",
  "SAP Certified Associate · BTP · En cours",
  "BTS Informatique · Génie logiciel · IME 2025",
  "Licence Génie logiciel · Data Science · IME",
  "Scrum · Kanban · Docker · CI/CD · DevOps",
];

const LANGS = ["fr","en"];

const TECH_NAMES   = ["Python","FastAPI","React.js","TypeScript","SQL Server","PostgreSQL","Redis","Power BI","PowerShell","Docker","WebSockets","Pandas"];
const TECH_COLORS  = ["#3776AB","#009688","#61DAFB","#3178C6","#CC2927","#336791","#DC382D","#F2C811","#5391FE","#2496ED","#8B5CF6","#E70488"];

/* ============================ TRANSLATIONS ============================ */
const TR = {
  fr: {
    nav: [["services","Services"],["methode","Méthode"],["projets","Projets"],["apropos","À propos"],["contact","Contact"]],
    nav_cta: "Obtenez un devis",

    hero_badge: "Douala, Cameroun · Remote",
    hero_h1a: "Atteignez vos objectifs avec des ",
    hero_h1b: "solutions numériques",
    hero_h1c: " sur mesure",
    hero_desc: "De la transformation digitale à l'hébergement cloud, HellooTech conçoit et déploie des solutions complètes, fiables et adaptées à votre entreprise.",
    hero_cta1: "Démarrer un projet",
    hero_cta2: "Voir nos réalisations",
    hero_tagline: "Accompagnement de bout en bout, de la conception à la livraison",

    trust_label: "Technologies & expertises maîtrisées",
    techs: [
      "Langage N°1 en Data Science, IA, automatisation et backend web. Cœur de la stack HellooTech pour les ETL et APIs.",
      "Framework Python ultra-rapide pour des APIs RESTful modernes avec WebSockets, validation auto et doc intégrée.",
      "Bibliothèque JavaScript de Meta pour des interfaces composables et réactives. Utilisée dans SMARTY et FlowI.",
      "Sur-ensemble typé de JavaScript qui détecte les erreurs à la compilation et fiabilise le code à grande échelle.",
      "SGBD Microsoft robuste pour les entreprises. Idéal pour les grandes volumétries transactionnelles et la BI.",
      "SGBD open-source avancé avec JSON, indexation puissante et haute dispo — backbone de SMARTY et des apps critiques.",
      "Store clé-valeur en mémoire ultra-rapide pour le cache, les sessions et le pub/sub temps réel dans VYNTIX et SMARTY.",
      "Outil Microsoft de Business Intelligence : transforme les données brutes en dashboards interactifs et rapports visuels.",
      "Shell Microsoft pour l'automatisation système, la gestion réseau et le scripting DevOps — moteur de SCRIPX.",
      "Plateforme de conteneurisation — isolation des environnements, déploiements reproductibles et gestion simplifiée des dépendances en production.",
      "Protocole de communication bidirectionnel temps réel client-serveur — moteur du monitoring live dans VYNTIX.",
      "Bibliothèque Python d'analyse et manipulation de données — essentielle pour les pipelines ETL, le nettoyage et la préparation avant visualisation.",
    ],

    svc_eyebrow: "Nos services",
    svc_h2: "Tout ce dont vous avez besoin",
    svc_desc: "Des applications web aux plateformes cloud, nous couvrons l'ensemble de vos besoins technologiques.",
    services: [
      { title:"Développement Web & PWA",      desc:"Applications web modernes et Progressive Web Apps rapides, fiables, installables sur tous les appareils." },
      { title:"Développement Mobile",          desc:"Applications mobiles performantes pour Android et iOS, avec des expériences utilisateur exceptionnelles." },
      { title:"Data Science & IA",             desc:"Analyse prédictive et intégration de l'IA pour automatiser et optimiser vos processus métier." },
      { title:"Transformation Digitale",       desc:"Digitalisation de vos processus et modernisation de votre système d'information." },
      { title:"Bases de Données SQL",          desc:"Conception, optimisation et administration SQL Server & MySQL pour des performances maximales." },
      { title:"Gestion de Projet & SDLC",      desc:"Pilotage de vos projets IT de bout en bout, de la conception à la livraison." },
      { title:"Monitoring d'Infrastructure",   desc:"Surveillance temps réel de vos serveurs et applications pour garantir disponibilité et performance." },
      { title:"Plateformes SaaS",              desc:"Produits SaaS scalables avec architectures multi-tenant, API et tableaux de bord." },
      { title:"Maintenance Informatique",      desc:"Support technique et maintenance préventive & corrective de vos systèmes." },
      { title:"Hébergement & VPS",             desc:"Déploiement de serveurs VPS sécurisés et gestion de vos environnements de production." },
    ],

    proc_eyebrow: "Notre méthode",
    proc_h2: "Une démarche claire, du début à la fin",
    proc_desc: "Une méthodologie éprouvée pour livrer des projets fiables, dans les délais.",
    process: [
      { n:"01", title:"Découverte",    desc:"On analyse votre besoin, vos contraintes et vos objectifs réels." },
      { n:"02", title:"Conception",    desc:"Architecture, maquettes et cahier des charges validés ensemble." },
      { n:"03", title:"Développement", desc:"Code rigoureux, tests et points d'avancement transparents." },
      { n:"04", title:"Livraison",     desc:"Déploiement, formation et support continu après mise en ligne." },
    ],

    stats: [
      { value:10, suffix:"+", label:"Services proposés" },
      { value:8,  suffix:"+", label:"Projets livrés" },
      { value:2,  suffix:"+", label:"Années d'expérience" },
      { value:100,suffix:"%", label:"Sur mesure" },
    ],

    why_eyebrow: "Votre partenaire tech",
    why_h2: "Pourquoi choisir HellooTech ?",
    why_p1: "HellooTech est fondée par un développeur Full-Stack · Data · Infrastructure passionné, basé à Douala-Yassa. Une maîtrise complète de la chaîne : React/TypeScript en front, FastAPI/Python en back, SQL Server/PostgreSQL/Redis en data, PowerShell & CI/CD pour l'infra.",
    why_p2: "De la conception au déploiement, chaque client est accompagné avec rigueur et transparence. 9+ projets livrés dont une plateforme SaaS en production — une expertise technique solide et une vision claire : des solutions numériques de qualité, accessibles à toutes les entreprises.",
    why_cta: "Discutons de votre projet",
    pillars: [
      { title:"Solutions sur mesure",  desc:"Chaque projet est unique. On adapte nos solutions à vos contraintes et ambitions." },
      { title:"Qualité & performance", desc:"Code propre, architecture solide, résultats mesurables à chaque livraison." },
      { title:"Fiabilité & sécurité",  desc:"Systèmes robustes conçus avec les meilleures pratiques de sécurité." },
      { title:"Livraison à temps",     desc:"Respect strict des délais avec une communication transparente." },
    ],

    proj_eyebrow: "Nos réalisations",
    proj_h2: "Des projets concrets, livrés",
    proj_desc: "Une sélection de solutions conçues et déployées pour de vrais besoins métier.",
    categories: { all:"Tous", web:"Web & E-commerce", mobile:"Mobile & PWA", data:"Data & Monitoring", reseau:"Réseau & Automatisation" },
    projects: [
      { desc:"Plateforme SaaS interne de digitalisation des KPI, déployée en production chez BEETLE HERITAGE HOLDING. Cycle complet : définition, affectation, calcul automatique du score et validation multi-niveaux — en remplacement d'un suivi Excel manuel." },
      { desc:"Système de monitoring d'infrastructure IT en temps réel. Architecture hybride avec traitement des données TTL pour une visibilité complète des serveurs, réseaux et services — reporting live et aide à la décision." },
      { desc:"Application de covoiturage PWA (v1) migrée vers une app mobile Android/iOS (v2). Interface admin web, backend temps réel, gestion des réservations et des utilisateurs." },
      { desc:"Plateforme e-commerce commercialisée avec succès. Interface dynamique, tunnel de vente hybride et paiement mobile intégré." },
      { desc:"Automatisation de procédures métier modulaire. Pipeline intelligent avec interface de suivi pour les workflows d'entreprise." },
      { desc:"Application web de gestion d'inventaire multi-magasins. Interface de saisie des mouvements de stock en temps réel, alertes email automatiques en cas d'anomalie ou de rupture, génération et export de rapports Excel et tableau de bord centralisé." },
      { desc:"Script de monitoring réseau permettant de tester simultanément la connectivité de plusieurs équipements. Visibilité infrastructure et affichage de la latence en temps réel." },
      { desc:"Application mobile de mise en relation entre patients et établissements de santé. Prise de rendez-vous en ligne, suivi des dossiers patients et gestion des soins à distance." },
      { desc:"Site événementiel officiel d'un beach resort à Parme, Italie. Billetterie en ligne sécurisée, génération de billets numériques avec QR code et formulaire de contact automatisé." },
    ],

    cert_eyebrow: "Compétences & certifications",
    cert_h2: "Une expertise certifiée",

    test_eyebrow: "Ils nous font confiance",
    test_h2: "Ce que disent nos clients",
    testimonials: [
      { quote:"HellooTech a complètement restructuré notre système de données. Les rapports sont devenus clairs, fiables et accessibles à tous nos décideurs. Un travail méthodique et remarquablement professionnel.", name:"Directeur Système et Information", role:"Beetle Heritage Holding · Douala" },
      { quote:"Notre boutique en ligne a été livrée dans les délais avec toutes les fonctionnalités demandées. Dès le lancement, les commandes ont afflué. Une équipe réactive et à l'écoute.", name:"Développeur de Marché", role:"Commerce · cocosecret.shop" },
      { quote:"Notre équipe réseau dispose enfin d'une vue d'ensemble en temps réel. Les incidents sont détectés et traités bien plus rapidement qu'avant. Travail rigoureux, résultats concrets.", name:"Administrateur Réseau", role:"Beetle Heritage Holding · Douala" },
      { quote:"Le site a été livré rapidement avec tout ce qu'il fallait pour gérer nos soirées et nos réservations. Nos clients adorent l'expérience en ligne !", name:"Event Planner", role:"Événement · CoCo Italia Beach" },
    ],

    faq_eyebrow: "FAQ",
    faq_h2: "Questions fréquentes",
    faq: [
      { q:"Combien coûte un projet chez HellooTech ?", a:"Chaque projet est unique. Après un premier échange gratuit pour comprendre votre besoin, nous établissons un devis clair et détaillé, sans surprise." },
      { q:"Travaillez-vous avec les petites entreprises ?", a:"Absolument. Nous accompagnons aussi bien les PME, les commerces que les startups, avec des solutions adaptées à votre taille et à votre budget." },
      { q:"Quels sont vos délais de livraison ?", a:"Les délais dépendent de la complexité du projet. Nous fixons ensemble un planning réaliste dès le départ et le respectons, avec des points d'avancement réguliers." },
      { q:"Assurez-vous la maintenance après livraison ?", a:"Oui. Nous proposons un support technique et une maintenance préventive et corrective pour garantir le bon fonctionnement de vos systèmes dans la durée." },
      { q:"Où êtes-vous situés ?", a:"Nous sommes basés à Douala-Yassa, au Cameroun, et travaillons avec des clients partout. Premier contact rapide via WhatsApp, téléphone ou email." },
    ],

    form_title: "Parlez-nous de votre projet",
    form_sub: "Remplissez ce formulaire — votre message WhatsApp sera préparé automatiquement.",
    form_name: "Nom complet *",
    form_contact: "Email ou numéro WhatsApp *",
    form_type: "Type de projet *",
    form_type_opts: ["-- Choisir --","Site web / PWA","Application mobile","Data & IA","E-commerce","Automatisation","Autre"],
    form_desc: "Décrivez votre besoin *",
    form_desc_ph: "Ex : Je veux une boutique en ligne avec paiement mobile money...",
    form_budget: "Budget estimé",
    form_budget_opts: ["-- Budget --","< 100 000 XAF","100 000 – 500 000 XAF","500 000 – 1 000 000 XAF","> 1 000 000 XAF","À discuter"],
    form_submit: "Continuer vers WhatsApp",
    form_cancel: "Annuler",
    form_err: "Veuillez remplir les champs obligatoires (*)",
    form_wa_intro: "Bonjour HellooTech ! 👋\n\nVoici mon projet :\n",
    form_wa_fields: ["Nom","Contact","Type de projet","Description","Budget estimé"],

    cta_h2: "Prêt à concrétiser votre projet ?",
    cta_desc: "Décrivez-nous votre besoin. Premier échange gratuit et sans engagement, réponse rapide.",
    cta_call: "Appeler",

    foot_tagline: "Votre partenaire tech à Douala & en remote. Nous concevons, déployons et transformons.",
    foot_expertise: "Expertise",
    foot_expertise_links: ["Développement Web","Mobile & PWA","Data Science & IA","Bases de données SQL","Hébergement VPS"],
    foot_links: "Liens",
    foot_contact: "Contact",
    foot_location: "Douala-Yassa, Cameroun · Remote",
    foot_copy: "© 2026 HellooTech · Tous droits réservés",
    foot_motto: "NOUS CONCEVONS · DÉPLOYONS · TRANSFORMONS",

    monitor_title: "Monitoring temps réel",
    monitor_live: "En ligne",
    monitor_keys: ["Uptime","Latence","Serveurs","Alertes"],
    dash_title: "Rapport consolidé",
    dash_keys: ["Qualité données","Enregistrements","Tables sync","Anomalies"],
    dash_sync: "Dernière sync",
    datafusion_sub: "SQL + temps réel",
  },

  en: {
    nav: [["services","Services"],["methode","Method"],["projets","Projects"],["apropos","About"],["contact","Contact"]],
    nav_cta: "Get a quote",

    hero_badge: "Douala, Cameroon · Remote",
    hero_h1a: "Reach your goals with ",
    hero_h1b: "tailored digital",
    hero_h1c: " solutions",
    hero_desc: "From digital transformation to cloud hosting, HellooTech designs and deploys complete, reliable solutions adapted to your business.",
    hero_cta1: "Start a project",
    hero_cta2: "View our work",
    hero_tagline: "End-to-end support, from conception to delivery",

    trust_label: "Technologies & expertise",
    techs: [
      "The #1 language for Data Science, AI, automation and web backends. Core of the HellooTech stack for ETL and APIs.",
      "Ultra-fast Python framework for modern RESTful APIs with WebSockets, automatic validation and built-in documentation.",
      "Meta's JavaScript library for composable and reactive interfaces. Used in SMARTY and FlowI.",
      "Typed superset of JavaScript that catches errors at compile time and makes large-scale code more reliable.",
      "Microsoft's enterprise-grade RDBMS. Built for high-volume transactional data and business intelligence.",
      "Advanced open-source RDBMS with JSON, powerful indexing and high availability — backbone of SMARTY and critical apps.",
      "Ultra-fast in-memory key-value store for caching, sessions and real-time pub/sub — powering VYNTIX and SMARTY.",
      "Microsoft's Business Intelligence tool: turns raw data into interactive dashboards and visual reports.",
      "Microsoft's shell for system automation, network management and DevOps scripting — engine behind SCRIPX.",
      "Containerisation platform — environment isolation, reproducible deployments and simplified dependency management in production.",
      "Bidirectional real-time client-server communication protocol — engine of the live monitoring in VYNTIX.",
      "Python data analysis and manipulation library — essential for ETL pipelines, data cleaning and preparation before visualization.",
    ],

    svc_eyebrow: "Our services",
    svc_h2: "Everything you need",
    svc_desc: "From web applications to cloud platforms, we cover all your technology needs.",
    services: [
      { title:"Web & PWA Development",         desc:"Modern web applications and Progressive Web Apps — fast, reliable, installable on any device." },
      { title:"Mobile Development",            desc:"High-performance mobile apps for Android and iOS, delivering exceptional user experiences." },
      { title:"Data Science & AI",             desc:"Predictive analytics and AI integration to automate and optimize your business processes." },
      { title:"Digital Transformation",        desc:"Digitizing your processes and modernizing your information systems." },
      { title:"SQL Databases",                 desc:"Design, optimization and administration of SQL Server & MySQL for peak performance." },
      { title:"Project Management & SDLC",     desc:"End-to-end IT project management from conception to delivery." },
      { title:"Infrastructure Monitoring",     desc:"Real-time surveillance of your servers and applications to ensure uptime and performance." },
      { title:"SaaS Platforms",                desc:"Scalable SaaS products with multi-tenant architectures, APIs and dashboards." },
      { title:"IT Maintenance",                desc:"Technical support and preventive & corrective maintenance for your systems." },
      { title:"Hosting & VPS",                 desc:"Secure VPS server deployment and production environment management." },
    ],

    proc_eyebrow: "Our method",
    proc_h2: "A clear process, start to finish",
    proc_desc: "A proven methodology to deliver reliable projects on time.",
    process: [
      { n:"01", title:"Discovery",     desc:"We analyse your needs, constraints and real objectives." },
      { n:"02", title:"Design",        desc:"Architecture, wireframes and specs validated together." },
      { n:"03", title:"Development",   desc:"Rigorous code, testing and transparent progress updates." },
      { n:"04", title:"Delivery",      desc:"Deployment, training and ongoing support after launch." },
    ],

    stats: [
      { value:10, suffix:"+", label:"Services offered" },
      { value:8,  suffix:"+", label:"Projects delivered" },
      { value:2,  suffix:"+", label:"Years of experience" },
      { value:100,suffix:"%", label:"Custom-built" },
    ],

    why_eyebrow: "Your tech partner",
    why_h2: "Why choose HellooTech?",
    why_p1: "HellooTech was founded by a passionate Full-Stack · Data · Infrastructure developer based in Douala-Yassa. He masters the full chain: React/TypeScript front-end, FastAPI/Python back-end, SQL Server/PostgreSQL/Redis for data, PowerShell & CI/CD for infrastructure.",
    why_p2: "From design to deployment, every client is supported with rigour and transparency. 9+ projects delivered including a SaaS platform in production — solid technical expertise, and a clear vision: quality digital solutions accessible to businesses of all sizes.",
    why_cta: "Discuss your project",
    pillars: [
      { title:"Custom solutions",       desc:"Every project is unique. We adapt our solutions to your constraints and ambitions." },
      { title:"Quality & performance",  desc:"Clean code, solid architecture, measurable results at every delivery." },
      { title:"Reliability & security", desc:"Robust systems built with best security practices." },
      { title:"On-time delivery",       desc:"Strict deadline adherence with transparent communication." },
    ],

    proj_eyebrow: "Our work",
    proj_h2: "Real projects, delivered",
    proj_desc: "A selection of solutions designed and deployed for real business needs.",
    categories: { all:"All", web:"Web & E-commerce", mobile:"Mobile & PWA", data:"Data & Monitoring", reseau:"Network & Automation" },
    projects: [
      { desc:"Internal KPI digitalisation SaaS platform deployed in production at BEETLE HERITAGE HOLDING. Full cycle: definition, assignment, automatic score calculation and multi-level validation — replacing a manual Excel-based process." },
      { desc:"Real-time IT infrastructure monitoring system. Hybrid architecture with TTL data processing for complete visibility of servers, networks and services — live reporting and decision support." },
      { desc:"Ride-hailing PWA (v1) migrated to an Android/iOS mobile app (v2). Web admin interface, real-time backend, booking and user management." },
      { desc:"Successfully commercialised e-commerce platform. Dynamic interface, hybrid sales funnel with integrated mobile payment." },
      { desc:"Modular business process automation. Intelligent pipeline with a tracking interface for enterprise workflows." },
      { desc:"Multi-store inventory management web application. Real-time stock movement entry interface, automated email alerts for anomalies or stockouts, automatic Excel report generation and export, and centralised dashboard." },
      { desc:"Network monitoring script to simultaneously test the connectivity of multiple devices. Infrastructure visibility and real-time latency display." },
      { desc:"Mobile app connecting patients and healthcare facilities. Online appointment booking, patient record tracking and remote care management." },
      { desc:"Official event website for a beach resort in Parma, Italy. Secure online ticketing, digital ticket generation with QR codes and automated contact form." },
    ],

    cert_eyebrow: "Skills & certifications",
    cert_h2: "Certified expertise",

    test_eyebrow: "Trusted by clients",
    test_h2: "What our clients say",
    testimonials: [
      { quote:"HellooTech completely restructured our data system. Reports are now clear, reliable and accessible to all our decision-makers. Methodical and remarkably professional work.", name:"Director of Information Systems", role:"Beetle Heritage Holding · Douala" },
      { quote:"Our online store was delivered on time with every feature we asked for. Orders started coming in from day one. A responsive and attentive team.", name:"Market Developer", role:"Commerce · cocosecret.shop" },
      { quote:"Our network team finally has a real-time overview of everything. Incidents are detected and handled far faster than before. Rigorous work, concrete results.", name:"Network Administrator", role:"Beetle Heritage Holding · Douala" },
      { quote:"The website was delivered quickly with everything needed to manage our events and bookings. Our clients love the online experience!", name:"Event Planner", role:"Events · CoCo Italia Beach" },
    ],

    faq_eyebrow: "FAQ",
    faq_h2: "Frequently asked questions",
    faq: [
      { q:"How much does a HellooTech project cost?", a:"Every project is unique. After a free initial consultation to understand your needs, we provide a clear, detailed quote with no surprises." },
      { q:"Do you work with small businesses?", a:"Absolutely. We support SMEs, shops and startups alike, with solutions tailored to your size and budget." },
      { q:"What are your delivery timelines?", a:"Timelines depend on project complexity. We set a realistic schedule together from the start and stick to it, with regular progress updates." },
      { q:"Do you provide maintenance after delivery?", a:"Yes. We offer technical support and preventive & corrective maintenance to keep your systems running smoothly long-term." },
      { q:"Where are you located?", a:"We are based in Douala-Yassa, Cameroon, and work with clients everywhere. Quick first contact via WhatsApp, phone or email." },
    ],

    form_title: "Tell us about your project",
    form_sub: "Fill in this form — your WhatsApp message will be prepared automatically.",
    form_name: "Full name *",
    form_contact: "Email or WhatsApp number *",
    form_type: "Project type *",
    form_type_opts: ["-- Select --","Website / PWA","Mobile app","Data & AI","E-commerce","Automation","Other"],
    form_desc: "Describe your need *",
    form_desc_ph: "E.g. I want an online store with mobile money payments...",
    form_budget: "Estimated budget",
    form_budget_opts: ["-- Budget --","< 100 000 XAF","100 000 – 500 000 XAF","500 000 – 1 000 000 XAF","> 1 000 000 XAF","To discuss"],
    form_submit: "Continue to WhatsApp",
    form_cancel: "Cancel",
    form_err: "Please fill in the required fields (*)",
    form_wa_intro: "Hello HellooTech! 👋\n\nHere's my project:\n",
    form_wa_fields: ["Name","Contact","Project type","Description","Estimated budget"],

    cta_h2: "Ready to bring your project to life?",
    cta_desc: "Tell us about your needs. Free first consultation, no commitment, quick response.",
    cta_call: "Call us",

    foot_tagline: "Your tech partner in Douala & remote-friendly. We design, deploy and transform.",
    foot_expertise: "Expertise",
    foot_expertise_links: ["Web Development","Mobile & PWA","Data Science & AI","SQL Databases","VPS Hosting"],
    foot_links: "Links",
    foot_contact: "Contact",
    foot_location: "Douala-Yassa, Cameroon · Remote",
    foot_copy: "© 2026 HellooTech · All rights reserved",
    foot_motto: "WE DESIGN · DEPLOY · TRANSFORM",

    monitor_title: "Real-time monitoring",
    monitor_live: "Online",
    monitor_keys: ["Uptime","Latency","Servers","Alerts"],
    dash_title: "Consolidated report",
    dash_keys: ["Data quality","Records","Tables sync","Anomalies"],
    dash_sync: "Last sync",
    datafusion_sub: "SQL + real-time",
  },
};

/* ============================ CSS ============================ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
.h-root{font-family:'Inter',sans-serif;background:${WHITE};color:${BODY};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
.h-root h1,.h-root h2,.h-root h3,.h-root h4{font-family:'Sora',sans-serif;color:${INK};letter-spacing:-0.02em;}

.eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:${SKY_D};font-weight:500;}

.btn-p{background:${SKY};color:#fff;font-family:'Sora',sans-serif;font-weight:600;font-size:14px;padding:13px 26px;border-radius:10px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all .22s ease;text-decoration:none;}
.btn-p:hover{background:${SKY_D};transform:translateY(-2px);box-shadow:0 10px 28px rgba(14,165,233,.28);}
.btn-g{background:${WHITE};color:${INK};font-family:'Sora',sans-serif;font-weight:600;font-size:14px;padding:12px 26px;border-radius:10px;border:1.5px solid ${BORDER};cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all .22s ease;text-decoration:none;}
.btn-g:hover{border-color:${SKY};color:${SKY_D};transform:translateY(-2px);}

.nlink{font-family:'Sora',sans-serif;color:${INK};font-size:14px;font-weight:500;background:none;border:none;cursor:pointer;transition:color .2s;padding:0;text-decoration:none;}
.nlink:hover{color:${SKY};}

.s-card{background:${WHITE};border:1px solid ${BORDER};border-radius:16px;padding:26px;transition:all .28s ease;cursor:default;height:100%;}
.s-card:hover{border-color:${SKY_L};transform:translateY(-5px);box-shadow:0 18px 44px rgba(11,18,32,.07);}

.chip{font-size:11px;font-weight:500;padding:4px 11px;border-radius:999px;background:${SKY_50};color:${SKY_D};border:1px solid ${SKY_100};}

.filt{font-family:'Sora',sans-serif;font-size:13px;font-weight:500;padding:9px 18px;border-radius:999px;border:1.5px solid ${BORDER};background:${WHITE};color:${BODY};cursor:pointer;transition:all .2s ease;}
.filt:hover{border-color:${SKY_L};color:${INK};}
.filt.on{background:${INK};border-color:${INK};color:#fff;}

.p-card{background:${WHITE};border:1px solid ${BORDER};border-radius:16px;overflow:hidden;transition:all .28s ease;}
.p-card:hover{border-color:${SKY_L};transform:translateY(-5px);box-shadow:0 18px 44px rgba(11,18,32,.08);}

.faq-item{border:1px solid ${BORDER};border-radius:14px;overflow:hidden;transition:border-color .2s;background:${WHITE};}
.faq-item.open{border-color:${SKY_L};}
.faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 22px;background:none;border:none;cursor:pointer;text-align:left;font-family:'Sora',sans-serif;font-weight:600;font-size:15px;color:${INK};}

.flink{color:${BODY};font-size:14px;text-decoration:none;transition:color .2s;display:inline-flex;align-items:center;gap:6px;}
.flink:hover{color:${SKY};}

.fab{position:fixed;bottom:24px;right:24px;z-index:90;width:58px;height:58px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 28px rgba(37,211,102,.4);text-decoration:none;transition:transform .2s;}
.fab:hover{transform:scale(1.08);}

.lang-btn{font-family:'Sora',sans-serif;font-size:11px;font-weight:700;padding:4px 9px;border-radius:6px;border:none;cursor:pointer;letter-spacing:.06em;transition:all .2s;}
.modal-ov{position:fixed;inset:0;background:rgba(11,18,32,.65);backdrop-filter:blur(8px);z-index:300;display:flex;align-items:center;justify-content:center;padding:20px;}
.modal-box{background:#fff;border-radius:20px;padding:36px 32px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;animation:rise .25s both ease;box-shadow:0 32px 80px rgba(11,18,32,.22);}
.f-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
.f-label{font-family:'Sora',sans-serif;font-size:13px;font-weight:600;color:${INK};}
.f-inp{font-family:'Inter',sans-serif;font-size:14px;padding:11px 14px;border-radius:10px;border:1.5px solid ${BORDER};color:${INK};outline:none;transition:border-color .2s;background:#fff;width:100%;box-sizing:border-box;}
.f-inp:focus{border-color:${SKY};}
.f-inp.ferr{border-color:#EF4444;}
.f-select{appearance:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:36px;}
.f-ta{resize:vertical;min-height:88px;}
@media(max-width:540px){.modal-box{padding:24px 18px;}}

@keyframes pulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}}
.live-dot{width:8px;height:8px;border-radius:50%;background:#22C55E;animation:pulse 1.8s ease-in-out infinite;}
@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.floaty{animation:floaty 5s ease-in-out infinite;}
@keyframes rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.rise{animation:rise .7s both ease;}

@keyframes barGrow{from{height:6px}}
.bar{animation:barGrow 1s ease both;}

.mq{display:flex;gap:20px;width:max-content;animation:marq 32s linear infinite;align-items:center;}
.mq-paused{animation-play-state:paused!important;}
@keyframes marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

@media(max-width:980px){
  .sg{grid-template-columns:1fr 1fr !important;}
  .pg{grid-template-columns:1fr 1fr !important;}
  .hero-grid{grid-template-columns:1fr !important;}
  .hero-visual{display:none !important;}
  .nd{display:none !important;}
  .nm{display:flex !important;}
  .foot-grid{grid-template-columns:1fr 1fr !important;}
}
@media(max-width:640px){
  .sg{grid-template-columns:1fr !important;}
  .pg{grid-template-columns:1fr !important;}
  .statg{grid-template-columns:1fr 1fr !important;}
  .procg{grid-template-columns:1fr !important;}
  .pillg{grid-template-columns:1fr !important;}
  .foot-grid{grid-template-columns:1fr !important;}
  .h1{font-size:2.3rem !important;}
  .h2{font-size:1.7rem !important;}
  .hb{flex-direction:column;}
  .hb a,.hb button{width:100%;justify-content:center;}
}
`;

/* ============================ HELPERS ============================ */
function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); ob.disconnect(); }
    }, { threshold });
    ob.observe(el);
    return () => ob.disconnect();
  }, [threshold]);
  return [ref, seen];
}

function Counter({ value, suffix }) {
  const [ref, seen] = useInView(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf, start;
    const dur = 1400;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ============================ APP ============================ */
export default function HellooTech() {
  const [lang, setLang]         = useState("fr");
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu]         = useState(false);
  const [svcOpen, setSvcOpen]   = useState(false);
  const [filter, setFilter]     = useState("all");
  const [faqOpen, setFaqOpen]   = useState(0);
  const [tIdx, setTIdx]         = useState(0);
  const [progress, setProgress] = useState(0);
  const [hovTech, setHovTech]   = useState(null);
  const [marqPaused, setMarqPaused] = useState(false);
  const [vizIdx, setVizIdx]       = useState(0);
  const [showForm, setShowForm]   = useState(false);
  const [formData, setFormData]   = useState({ name:"", contact:"", type:"", desc:"", budget:"" });
  const [formErr, setFormErr]     = useState(false);

  const tr = TR[lang];

  const changeLang = (l) => { setLang(l); setTIdx(0); setFilter("all"); setFaqOpen(-1); };

  const buildWAMsg = () => {
    const f = tr.form_wa_fields;
    const d = formData;
    return encodeURIComponent(
      tr.form_wa_intro +
      `• ${f[0]}: ${d.name}\n` +
      `• ${f[1]}: ${d.contact}\n` +
      `• ${f[2]}: ${d.type}\n` +
      `• ${f[3]}: ${d.desc}\n` +
      (d.budget ? `• ${f[4]}: ${d.budget}\n` : "")
    );
  };

  const submitForm = () => {
    if (!formData.name.trim() || !formData.contact.trim() || !formData.type || !formData.desc.trim()) {
      setFormErr(true);
      return;
    }
    const msg = buildWAMsg();
    window.open(`https://wa.me/237680929265?text=${msg}`, "_blank", "noopener,noreferrer");
    setShowForm(false);
    setFormData({ name:"", contact:"", type:"", desc:"", budget:"" });
    setFormErr(false);
  };

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement;
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTIdx(i => (i + 1) % tr.testimonials.length), 5500);
    return () => clearInterval(id);
  }, [tr.testimonials.length]);

  useEffect(() => {
    const id = setInterval(() => setVizIdx(i => (i + 1) % 2), 4000);
    return () => clearInterval(id);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenu(false); };
  const WA = "https://wa.me/237680929265";
  const shown = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

  return (
    <div className="h-root">
      <style>{CSS}</style>

      <div style={{position:"fixed",top:0,left:0,height:3,width:`${progress}%`,background:SKY,zIndex:200,transition:"width .1s"}}/>

      {/* ───── NAVBAR ───── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:scrolled?"rgba(255,255,255,.88)":"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:`1px solid ${scrolled?BORDER:"transparent"}`,transition:"all .3s ease"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",height:68,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:11,cursor:"pointer"}} onClick={()=>go("top")}>
            <div style={{width:36,height:36,borderRadius:10,background:SKY,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Sora",fontWeight:700,fontSize:18,color:"#fff"}}>H</div>
            <span style={{fontFamily:"Sora",fontSize:20,fontWeight:700,color:INK}}>Helloo<span style={{color:SKY}}>Tech</span></span>
          </div>

          <div className="nd" style={{display:"flex",gap:30,alignItems:"center"}}>
            {tr.nav.map(([id,l]) => (
              id==="services" ? (
                <div key={id} style={{position:"relative"}} onMouseEnter={()=>setSvcOpen(true)} onMouseLeave={()=>setSvcOpen(false)}>
                  <button className="nlink" style={{display:"flex",alignItems:"center",gap:4}} onClick={()=>go(id)}>
                    {l} <ChevronDown size={14} style={{transform:svcOpen?"rotate(180deg)":"none",transition:"transform .2s"}}/>
                  </button>
                  {svcOpen && (
                    <div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",paddingTop:14}}>
                      <div style={{width:430,background:WHITE,border:`1px solid ${BORDER}`,borderRadius:16,boxShadow:"0 24px 60px rgba(11,18,32,.12)",padding:14,display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                        {SVC_ICONS.slice(0,8).map((Icon,i)=>(
                          <button key={i} onClick={()=>go("services")} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:10,border:"none",background:"none",cursor:"pointer",textAlign:"left",transition:"background .15s"}}
                            onMouseEnter={e=>e.currentTarget.style.background=SKY_50} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                            <Icon size={16} color={SKY_D} style={{flexShrink:0}}/>
                            <span style={{fontFamily:"Sora",fontSize:12.5,fontWeight:500,color:INK,lineHeight:1.3}}>{tr.services[i].title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : <button key={id} className="nlink" onClick={()=>go(id)}>{l}</button>
            ))}

            {/* Language switcher */}
            <div style={{display:"flex",gap:2,background:SURFACE,borderRadius:8,padding:3,border:`1px solid ${BORDER}`}}>
              {LANGS.map(l => (
                <button key={l} className="lang-btn" onClick={()=>changeLang(l)}
                  style={{background:lang===l?SKY:"none",color:lang===l?"#fff":MUTED}}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-p" style={{padding:"10px 20px",fontSize:13}}>{tr.nav_cta}</a>
          </div>

          <button className="nm" onClick={()=>setMenu(!menu)} style={{display:"none",background:"none",border:"none",color:INK,cursor:"pointer",padding:4}}>
            {menu ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
        {menu && (
          <div style={{background:WHITE,borderBottom:`1px solid ${BORDER}`,padding:"18px 24px",display:"flex",flexDirection:"column",gap:16}}>
            {tr.nav.map(([id,l])=> <button key={id} className="nlink" onClick={()=>go(id)} style={{fontSize:16,textAlign:"left"}}>{l}</button>)}
            <div style={{display:"flex",gap:6}}>
              {LANGS.map(l => (
                <button key={l} className="lang-btn" onClick={()=>changeLang(l)}
                  style={{background:lang===l?SKY:SURFACE,color:lang===l?"#fff":BODY,border:`1px solid ${lang===l?SKY:BORDER}`,flex:1,padding:"8px"}}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-p" style={{justifyContent:"center"}}>{tr.nav_cta}</a>
          </div>
        )}
      </nav>

      {/* ───── HERO ───── */}
      <section id="top" style={{position:"relative",paddingTop:140,paddingBottom:90,overflow:"hidden",background:`linear-gradient(180deg,${SKY_50} 0%,${WHITE} 100%)`}}>
        <div style={{position:"absolute",top:-120,right:-80,width:480,height:480,background:`radial-gradient(circle,${SKY_100},transparent 70%)`,borderRadius:"50%",filter:"blur(20px)",pointerEvents:"none"}}/>
        <div className="hero-grid" style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"grid",gridTemplateColumns:"1.05fr .95fr",gap:56,alignItems:"center",position:"relative"}}>
          <div className="rise">
            <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:999,background:WHITE,border:`1px solid ${SKY_100}`,marginBottom:24}}>
              <MapPin size={13} color={SKY_D}/>
              <span className="eyebrow" style={{letterSpacing:".1em"}}>{tr.hero_badge}</span>
            </div>
            <h1 className="h1" style={{fontSize:"3.3rem",fontWeight:700,lineHeight:1.08,marginBottom:22}}>
              {tr.hero_h1a}<span style={{color:SKY}}>{tr.hero_h1b}</span>{tr.hero_h1c}
            </h1>
            <p style={{fontSize:"1.06rem",lineHeight:1.75,color:BODY,maxWidth:520,marginBottom:36}}>{tr.hero_desc}</p>
            <div className="hb" style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:38}}>
              <button onClick={()=>setShowForm(true)} className="btn-p" style={{border:"none",cursor:"pointer"}}>{tr.hero_cta1} <ArrowRight size={16}/></button>
              <button className="btn-g" onClick={()=>go("projets")}>{tr.hero_cta2}</button>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(i=><Star key={i} size={16} fill={SKY} color={SKY}/>)}</div>
              <span style={{fontSize:13,color:BODY}}>{tr.hero_tagline}</span>
            </div>
          </div>

          <div className="hero-visual floaty" style={{position:"relative"}}>

            {/* ── Slide wrapper ── */}
            <div style={{position:"relative",minHeight:272}}>

              {/* Card 0 — Monitoring VYNTIX */}
              <div style={{background:WHITE,border:`1px solid ${BORDER}`,borderRadius:20,boxShadow:"0 30px 70px rgba(11,18,32,.10)",padding:22,
                           position:"absolute",inset:0,
                           opacity:vizIdx===0?1:0,transform:vizIdx===0?"translateY(0)":"translateY(8px)",
                           transition:"opacity .45s ease,transform .45s ease",pointerEvents:vizIdx===0?"auto":"none"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <Activity size={16} color={SKY_D}/>
                    <span style={{fontFamily:"Sora",fontWeight:600,fontSize:13,color:INK}}>{tr.monitor_title}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}><span className="live-dot"/><span style={{fontSize:11,color:"#16A34A",fontWeight:500}}>{tr.monitor_live}</span></div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
                  {[["99.9%",SKY_D],["8ms",INK],["12/12","#16A34A"],["0",MUTED]].map(([v,c],i)=>(
                    <div key={i} style={{background:SURFACE,borderRadius:12,padding:"12px 14px"}}>
                      <div style={{fontSize:10,color:MUTED,textTransform:"uppercase",letterSpacing:".06em",marginBottom:4}}>{tr.monitor_keys[i]}</div>
                      <div style={{fontFamily:"Sora",fontWeight:700,fontSize:18,color:c}}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",alignItems:"flex-end",gap:7,height:72,padding:"0 2px"}}>
                  {[40,62,48,75,55,82,68,90,72,60].map((h,i)=>(
                    <div key={i} className="bar" style={{flex:1,height:`${h}%`,background:i%2?SKY:SKY_L,borderRadius:"5px 5px 0 0",animationDelay:`${i*0.06}s`}}/>
                  ))}
                </div>
              </div>

              {/* Card 1 — Dashboard rapport consolidé (SSAS) */}
              <div style={{background:WHITE,border:`1px solid ${BORDER}`,borderRadius:20,boxShadow:"0 30px 70px rgba(11,18,32,.10)",padding:22,
                           position:"absolute",inset:0,
                           opacity:vizIdx===1?1:0,transform:vizIdx===1?"translateY(0)":"translateY(8px)",
                           transition:"opacity .45s ease,transform .45s ease",pointerEvents:vizIdx===1?"auto":"none"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <BarChart2 size={16} color="#16A34A"/>
                    <span style={{fontFamily:"Sora",fontWeight:600,fontSize:13,color:INK}}>{tr.dash_title}</span>
                  </div>
                  <span style={{fontSize:10,color:MUTED,background:SURFACE,borderRadius:6,padding:"3px 8px"}}>{tr.dash_sync} · 2m</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
                  {[["98.4%","#16A34A"],["1.2M",SKY_D],["8 / 8","#16A34A"],["0",MUTED]].map(([v,c],i)=>(
                    <div key={i} style={{background:SURFACE,borderRadius:12,padding:"12px 14px"}}>
                      <div style={{fontSize:10,color:MUTED,textTransform:"uppercase",letterSpacing:".06em",marginBottom:4}}>{tr.dash_keys[i]}</div>
                      <div style={{fontFamily:"Sora",fontWeight:700,fontSize:18,color:c}}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",alignItems:"flex-end",gap:7,height:72,padding:"0 2px"}}>
                  {[55,70,48,85,60,78,65,90,58,75].map((h,i)=>(
                    <div key={i} className="bar" style={{flex:1,height:`${h}%`,background:i%2?"#16A34A":"#4ADE80",borderRadius:"5px 5px 0 0",animationDelay:`${i*0.06}s`}}/>
                  ))}
                </div>
              </div>

            </div>

            {/* Dots */}
            <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:14,position:"relative",zIndex:2}}>
              {[0,1].map(i=>(
                <div key={i} onClick={()=>setVizIdx(i)}
                  style={{height:5,width:vizIdx===i?20:5,borderRadius:3,
                          background:vizIdx===i?SKY:BORDER,
                          cursor:"pointer",transition:"all .35s ease"}}/>
              ))}
            </div>

            {/* Floating badge */}
            <div style={{position:"absolute",bottom:-18,left:-18,background:WHITE,border:`1px solid ${BORDER}`,borderRadius:14,boxShadow:"0 16px 40px rgba(11,18,32,.10)",padding:"12px 16px",display:"flex",alignItems:"center",gap:10,zIndex:3}}>
              <div style={{width:34,height:34,borderRadius:9,background:SKY_50,display:"flex",alignItems:"center",justifyContent:"center"}}><Database size={16} color={SKY_D}/></div>
              <div><div style={{fontFamily:"Sora",fontWeight:600,fontSize:12,color:INK}}>Data Fusion</div><div style={{fontSize:10,color:MUTED}}>{tr.datafusion_sub}</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── TRUST / MARQUEE ───── */}
      <section style={{borderTop:`1px solid ${BORDER}`,borderBottom:`1px solid ${BORDER}`,background:WHITE,overflow:"hidden",paddingTop:24}}>
        <p style={{textAlign:"center",fontSize:12,color:MUTED,marginBottom:16,letterSpacing:".04em"}}>{tr.trust_label}</p>

        <div style={{position:"relative",maskImage:"linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)",WebkitMaskImage:"linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)"}}
          onMouseEnter={()=>setMarqPaused(true)} onMouseLeave={()=>{setMarqPaused(false);setHovTech(null);}}>
          <div className={marqPaused?"mq mq-paused":"mq"}>
            {[...TECH_NAMES,...TECH_NAMES].map((name,i)=>{
              const idx = i % TECH_NAMES.length;
              const col = TECH_COLORS[idx];
              const active = hovTech===idx;
              return (
                <div key={i} onMouseEnter={()=>setHovTech(idx)} onMouseLeave={()=>setHovTech(null)}
                  style={{display:"inline-flex",alignItems:"center",gap:7,padding:"6px 15px",borderRadius:999,
                          background:active?`${col}18`:SURFACE,
                          border:`1.5px solid ${active?col:BORDER}`,
                          cursor:"default",transition:"all .2s",whiteSpace:"nowrap",userSelect:"none"}}>
                  <span style={{width:8,height:8,borderRadius:"50%",background:col,flexShrink:0,
                                boxShadow:active?`0 0 8px ${col}99`:"none",transition:"box-shadow .2s"}}/>
                  <span style={{fontFamily:"Sora",fontWeight:600,fontSize:14,
                                color:active?col:MUTED,transition:"color .2s"}}>{name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tooltip area — fixed height to avoid layout shift */}
        <div style={{height:68,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
          {hovTech!==null && (
            <div className="rise" style={{display:"flex",alignItems:"flex-start",gap:10,maxWidth:580,
                                          background:WHITE,border:`1.5px solid ${TECH_COLORS[hovTech]}40`,
                                          borderLeft:`3px solid ${TECH_COLORS[hovTech]}`,
                                          borderRadius:10,padding:"10px 16px",
                                          boxShadow:`0 4px 20px ${TECH_COLORS[hovTech]}1A`}}>
              <span style={{width:9,height:9,borderRadius:"50%",background:TECH_COLORS[hovTech],
                            flexShrink:0,marginTop:4,boxShadow:`0 0 8px ${TECH_COLORS[hovTech]}88`}}/>
              <p style={{fontSize:13,lineHeight:1.6,color:BODY}}>
                <span style={{fontFamily:"Sora",fontWeight:700,color:TECH_COLORS[hovTech],marginRight:6}}>{TECH_NAMES[hovTech]}</span>
                {tr.techs[hovTech]}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ───── SERVICES ───── */}
      <section id="services" style={{padding:"96px 24px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <span className="eyebrow">{tr.svc_eyebrow}</span>
          <h2 className="h2" style={{fontSize:"2.4rem",fontWeight:700,margin:"14px 0 14px"}}>{tr.svc_h2}</h2>
          <p style={{color:BODY,fontSize:"1rem",maxWidth:540,margin:"0 auto",lineHeight:1.7}}>{tr.svc_desc}</p>
        </div>
        <div className="sg" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
          {tr.services.map((s,i)=>{
            const Icon = SVC_ICONS[i];
            return (
              <div key={i} className="s-card">
                <div style={{width:48,height:48,borderRadius:13,background:SKY_50,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>
                  <Icon size={22} color={SKY_D}/>
                </div>
                <h3 style={{fontSize:"1.05rem",fontWeight:600,marginBottom:10}}>{s.title}</h3>
                <p style={{fontSize:".9rem",lineHeight:1.65,color:BODY,marginBottom:18}}>{s.desc}</p>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{SVC_TAGS[i].map(tag=><span key={tag} className="chip">{tag}</span>)}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ───── MÉTHODE ───── */}
      <section id="methode" style={{padding:"96px 24px",background:INK,color:"#fff"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <span className="eyebrow" style={{color:SKY_L}}>{tr.proc_eyebrow}</span>
            <h2 className="h2" style={{fontSize:"2.4rem",fontWeight:700,margin:"14px 0 14px",color:"#fff"}}>{tr.proc_h2}</h2>
            <p style={{color:"rgba(255,255,255,.6)",fontSize:"1rem",maxWidth:540,margin:"0 auto",lineHeight:1.7}}>{tr.proc_desc}</p>
          </div>
          <div className="procg" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>
            {tr.process.map((p,i)=>{
              const Icon = PROC_ICONS[i];
              return (
                <div key={i} style={{position:"relative"}}>
                  {i<3 && <div className="nd" style={{position:"absolute",top:26,left:"60%",right:"-40%",height:1,background:"rgba(255,255,255,.12)"}}/>}
                  <div style={{width:54,height:54,borderRadius:15,background:"rgba(14,165,233,.14)",border:"1px solid rgba(56,189,248,.3)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18,position:"relative",zIndex:1}}>
                    <Icon size={22} color={SKY_L}/>
                  </div>
                  <div style={{fontFamily:"JetBrains Mono",fontSize:12,color:SKY_L,marginBottom:8,letterSpacing:".1em"}}>{p.n}</div>
                  <h3 style={{fontSize:"1.1rem",fontWeight:600,marginBottom:10,color:"#fff"}}>{p.title}</h3>
                  <p style={{fontSize:".88rem",lineHeight:1.65,color:"rgba(255,255,255,.6)"}}>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── STATS ───── */}
      <section style={{padding:"80px 24px",background:WHITE}}>
        <div className="statg" style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}}>
          {tr.stats.map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontFamily:"Sora",fontSize:"2.8rem",fontWeight:700,color:SKY,letterSpacing:"-.03em"}}>
                <Counter value={s.value} suffix={s.suffix}/>
              </div>
              <div style={{fontSize:13.5,color:BODY,marginTop:6}}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── POURQUOI NOUS ───── */}
      <section id="apropos" style={{padding:"96px 24px",background:SURFACE}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="hero-grid" style={{display:"grid",gridTemplateColumns:".95fr 1.05fr",gap:56,alignItems:"center"}}>
            <div>
              <span className="eyebrow">{tr.why_eyebrow}</span>
              <h2 className="h2" style={{fontSize:"2.3rem",fontWeight:700,margin:"14px 0 20px",lineHeight:1.18}}>{tr.why_h2}</h2>
              <p style={{fontSize:".98rem",lineHeight:1.8,color:BODY,marginBottom:18}}>{tr.why_p1}</p>
              <p style={{fontSize:".98rem",lineHeight:1.8,color:BODY,marginBottom:30}}>{tr.why_p2}</p>
              <button onClick={()=>setShowForm(true)} className="btn-p" style={{border:"none",cursor:"pointer"}}>{tr.why_cta} <ArrowRight size={16}/></button>
            </div>
            <div className="pillg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              {tr.pillars.map((p,i)=>{
                const Icon = PILLAR_ICONS[i];
                return (
                  <div key={i} style={{background:WHITE,border:`1px solid ${BORDER}`,borderRadius:16,padding:24}}>
                    <div style={{width:44,height:44,borderRadius:12,background:SKY_50,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}><Icon size={20} color={SKY_D}/></div>
                    <h3 style={{fontSize:".98rem",fontWeight:600,marginBottom:9}}>{p.title}</h3>
                    <p style={{fontSize:".84rem",lineHeight:1.6,color:BODY}}>{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ───── PROJETS ───── */}
      <section id="projets" style={{padding:"96px 24px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <span className="eyebrow">{tr.proj_eyebrow}</span>
          <h2 className="h2" style={{fontSize:"2.4rem",fontWeight:700,margin:"14px 0 14px"}}>{tr.proj_h2}</h2>
          <p style={{color:BODY,fontSize:"1rem",maxWidth:540,margin:"0 auto",lineHeight:1.7}}>{tr.proj_desc}</p>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:36}}>
          {CAT_KEYS.map(k=>(
            <button key={k} className={`filt ${filter===k?"on":""}`} onClick={()=>setFilter(k)}>{tr.categories[k]}</button>
          ))}
        </div>
        <div className="pg" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
          {shown.map((p,i)=>(
            <div key={p.name} className="p-card rise" style={{animationDelay:`${i*0.06}s`}}>
              <div style={{height:120,background:`linear-gradient(135deg,${SKY} 0%,${SKY_D} 100%)`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                <span style={{fontFamily:"Sora",fontWeight:700,fontSize:24,color:"#fff",letterSpacing:".02em"}}>{p.name}</span>
                {p.url
                  ? <a href={p.url} target="_blank" rel="noopener noreferrer" style={{position:"absolute",top:14,right:14,display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:8,background:"rgba(255,255,255,.18)",transition:"background .2s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.35)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.18)"}><ArrowUpRight size={18} color="#fff"/></a>
                  : <ArrowUpRight size={18} color="#fff" style={{position:"absolute",top:14,right:14,opacity:.25}}/>
                }
              </div>
              <div style={{padding:22}}>
                <span className="chip" style={{marginBottom:12,display:"inline-block"}}>{tr.categories[p.cat]}</span>
                <p style={{fontSize:".88rem",lineHeight:1.65,color:BODY,margin:"4px 0 16px"}}>{tr.projects[PROJECTS.indexOf(p)].desc}</p>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{p.stack.map(s=>(
                  <span key={s} style={{fontSize:11,fontFamily:"JetBrains Mono",color:MUTED,padding:"3px 9px",border:`1px solid ${BORDER}`,borderRadius:6}}>{s}</span>
                ))}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── CERTIFICATIONS ───── */}
      <section style={{padding:"70px 24px",background:SURFACE,borderTop:`1px solid ${BORDER}`,borderBottom:`1px solid ${BORDER}`}}>
        <div style={{maxWidth:1100,margin:"0 auto",textAlign:"center"}}>
          <span className="eyebrow">{tr.cert_eyebrow}</span>
          <h2 className="h2" style={{fontSize:"1.8rem",fontWeight:700,margin:"12px 0 32px"}}>{tr.cert_h2}</h2>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
            {CERTS.map((c,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:9,background:WHITE,border:`1px solid ${BORDER}`,borderRadius:12,padding:"13px 18px"}}>
                <div style={{width:22,height:22,borderRadius:6,background:SKY_50,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Check size={13} color={SKY_D}/></div>
                <span style={{fontFamily:"Sora",fontSize:13.5,fontWeight:500,color:INK}}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TÉMOIGNAGES ───── */}
      <section style={{padding:"96px 24px",maxWidth:880,margin:"0 auto",textAlign:"center"}}>
        <span className="eyebrow">{tr.test_eyebrow}</span>
        <h2 className="h2" style={{fontSize:"2.2rem",fontWeight:700,margin:"14px 0 44px"}}>{tr.test_h2}</h2>
        <div style={{background:WHITE,border:`1px solid ${BORDER}`,borderRadius:20,padding:"44px 40px",boxShadow:"0 18px 50px rgba(11,18,32,.05)",minHeight:230,display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div style={{display:"flex",gap:3,justifyContent:"center",marginBottom:22}}>{[1,2,3,4,5].map(i=><Star key={i} size={18} fill={SKY} color={SKY}/>)}</div>
          <p style={{fontFamily:"Sora",fontSize:"1.2rem",lineHeight:1.6,color:INK,fontWeight:500,marginBottom:26}}>« {tr.testimonials[tIdx].quote} »</p>
          <div>
            <div style={{fontFamily:"Sora",fontWeight:600,fontSize:14,color:INK}}>{tr.testimonials[tIdx].name}</div>
            <div style={{fontSize:12.5,color:MUTED,marginTop:3}}>{tr.testimonials[tIdx].role}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:24}}>
          {tr.testimonials.map((_,i)=>(
            <button key={i} onClick={()=>setTIdx(i)} style={{width:i===tIdx?28:8,height:8,borderRadius:999,border:"none",background:i===tIdx?SKY:BORDER,cursor:"pointer",transition:"all .3s",padding:0}}/>
          ))}
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section style={{padding:"40px 24px 96px",maxWidth:780,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:44}}>
          <span className="eyebrow">{tr.faq_eyebrow}</span>
          <h2 className="h2" style={{fontSize:"2.2rem",fontWeight:700,margin:"14px 0 0"}}>{tr.faq_h2}</h2>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {tr.faq.map((f,i)=>(
            <div key={i} className={`faq-item ${faqOpen===i?"open":""}`}>
              <button className="faq-q" onClick={()=>setFaqOpen(faqOpen===i?-1:i)}>
                {f.q}
                <span style={{flexShrink:0,width:28,height:28,borderRadius:8,background:faqOpen===i?SKY:SKY_50,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>
                  {faqOpen===i ? <Minus size={15} color="#fff"/> : <Plus size={15} color={SKY_D}/>}
                </span>
              </button>
              {faqOpen===i && <div style={{padding:"0 22px 20px",fontSize:".92rem",lineHeight:1.7,color:BODY}}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section id="contact" style={{padding:"24px 24px 90px"}}>
        <div style={{maxWidth:1100,margin:"0 auto",background:`linear-gradient(135deg,${SKY} 0%,${SKY_D} 100%)`,borderRadius:28,padding:"64px 48px",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-60,right:-40,width:260,height:260,background:"rgba(255,255,255,.1)",borderRadius:"50%"}}/>
          <div style={{position:"absolute",bottom:-80,left:-30,width:240,height:240,background:"rgba(255,255,255,.08)",borderRadius:"50%"}}/>
          <div style={{position:"relative"}}>
            <h2 style={{fontSize:"2.4rem",fontWeight:700,color:"#fff",marginBottom:16,letterSpacing:"-.02em"}}>{tr.cta_h2}</h2>
            <p style={{fontSize:"1.05rem",color:"rgba(255,255,255,.92)",maxWidth:520,margin:"0 auto 36px",lineHeight:1.7}}>{tr.cta_desc}</p>
            <div className="hb" style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:40}}>
              <a href={WA} target="_blank" rel="noopener noreferrer" style={{background:"#fff",color:SKY_D,fontFamily:"Sora",fontWeight:600,fontSize:15,padding:"15px 32px",borderRadius:12,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:10}}>
                <MessageCircle size={19}/> WhatsApp
              </a>
              <a href="tel:+237680929265" style={{background:"rgba(255,255,255,.14)",color:"#fff",border:"1.5px solid rgba(255,255,255,.4)",fontFamily:"Sora",fontWeight:600,fontSize:15,padding:"15px 32px",borderRadius:12,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:10}}>
                <Phone size={18}/> {tr.cta_call}
              </a>
            </div>
            <div style={{display:"flex",gap:30,justifyContent:"center",flexWrap:"wrap",fontSize:14,color:"rgba(255,255,255,.95)"}}>
              <span style={{display:"flex",alignItems:"center",gap:8}}><Phone size={15}/> +237 680 92 92 65</span>
              <span style={{display:"flex",alignItems:"center",gap:8}}><Mail size={15}/> Fongangcabrel2007@gmail.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer style={{background:INK,color:"rgba(255,255,255,.7)",padding:"64px 24px 30px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="foot-grid" style={{display:"grid",gridTemplateColumns:"1.6fr 1fr 1fr 1.2fr",gap:40,paddingBottom:44,borderBottom:"1px solid rgba(255,255,255,.1)"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
                <div style={{width:34,height:34,borderRadius:9,background:SKY,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Sora",fontWeight:700,fontSize:16,color:"#fff"}}>H</div>
                <span style={{fontFamily:"Sora",fontSize:19,fontWeight:700,color:"#fff"}}>Helloo<span style={{color:SKY_L}}>Tech</span></span>
              </div>
              <p style={{fontSize:14,lineHeight:1.7,maxWidth:280,marginBottom:20}}>{tr.foot_tagline}</p>
              <div style={{display:"flex",gap:10}}>
                {[[Linkedin,"https://www.linkedin.com/in/fongang-cabrel-81b9b83aa"],[Facebook,"#"],[Instagram,"#"]].map(([Ic,href],i)=>(
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{width:36,height:36,borderRadius:9,background:"rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",textDecoration:"none",transition:"background .2s"}}
                    onMouseEnter={e=>e.currentTarget.style.background=SKY} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.08)"}>
                    <Ic size={16}/>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{fontFamily:"Sora",fontSize:14,fontWeight:600,color:"#fff",marginBottom:16}}>{tr.foot_expertise}</h4>
              <div style={{display:"flex",flexDirection:"column",gap:11}}>
                {tr.foot_expertise_links.map(l=>(
                  <button key={l} className="flink" onClick={()=>go("services")} style={{background:"none",border:"none",cursor:"pointer",padding:0,textAlign:"left",fontFamily:"Inter"}}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{fontFamily:"Sora",fontSize:14,fontWeight:600,color:"#fff",marginBottom:16}}>{tr.foot_links}</h4>
              <div style={{display:"flex",flexDirection:"column",gap:11}}>
                {tr.nav.filter(([id])=>["apropos","projets","methode","contact"].includes(id)).map(([id,l])=>(
                  <button key={id} className="flink" onClick={()=>go(id)} style={{background:"none",border:"none",cursor:"pointer",padding:0,textAlign:"left",fontFamily:"Inter"}}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{fontFamily:"Sora",fontSize:14,fontWeight:600,color:"#fff",marginBottom:16}}>{tr.foot_contact}</h4>
              <div style={{display:"flex",flexDirection:"column",gap:13,fontSize:14}}>
                <span style={{display:"flex",gap:9,alignItems:"flex-start"}}><MapPin size={16} color={SKY_L} style={{flexShrink:0,marginTop:2}}/> {tr.foot_location}</span>
                <a href="tel:+237680929265" className="flink"><Phone size={16} color={SKY_L}/> +237 680 92 92 65</a>
                <a href="mailto:Fongangcabrel2007@gmail.com" className="flink" style={{wordBreak:"break-all"}}><Mail size={16} color={SKY_L} style={{flexShrink:0}}/> Fongangcabrel2007@gmail.com</a>
              </div>
            </div>
          </div>
          <div style={{paddingTop:26,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
            <span style={{fontSize:13,color:"rgba(255,255,255,.5)"}}>{tr.foot_copy}</span>
            <span style={{fontFamily:"JetBrains Mono",fontSize:11,letterSpacing:".12em",color:SKY_L}}>{tr.foot_motto}</span>
          </div>
        </div>
      </footer>

      <a href={WA} target="_blank" rel="noopener noreferrer" className="fab" aria-label="WhatsApp">
        <MessageCircle size={26} color="#fff"/>
      </a>

      {showForm && (
        <div className="modal-ov" onClick={e=>{if(e.target===e.currentTarget){setShowForm(false);setFormErr(false);}}}>
          <div className="modal-box">
            <h2 style={{fontFamily:"'Sora',sans-serif",fontSize:22,fontWeight:700,color:INK,marginBottom:4}}>{tr.form_title}</h2>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:14,color:MUTED,marginBottom:24}}>{tr.form_sub}</p>

            <div className="f-field">
              <label className="f-label">{tr.form_name}</label>
              <input className={`f-inp${formErr&&!formData.name.trim()?" ferr":""}`}
                value={formData.name}
                onChange={e=>setFormData(p=>({...p,name:e.target.value}))}
                placeholder="Fongang Cabrel" />
            </div>

            <div className="f-field">
              <label className="f-label">{tr.form_contact}</label>
              <input className={`f-inp${formErr&&!formData.contact.trim()?" ferr":""}`}
                value={formData.contact}
                onChange={e=>setFormData(p=>({...p,contact:e.target.value}))}
                placeholder="+237 6XX XXX XXX" />
            </div>

            <div className="f-field">
              <label className="f-label">{tr.form_type}</label>
              <select className={`f-inp f-select${formErr&&!formData.type?" ferr":""}`}
                value={formData.type}
                onChange={e=>setFormData(p=>({...p,type:e.target.value}))}>
                {tr.form_type_opts.map((o,i)=><option key={i} value={i===0?"":o}>{o}</option>)}
              </select>
            </div>

            <div className="f-field">
              <label className="f-label">{tr.form_desc}</label>
              <textarea className={`f-inp f-ta${formErr&&!formData.desc.trim()?" ferr":""}`}
                value={formData.desc}
                onChange={e=>setFormData(p=>({...p,desc:e.target.value}))}
                placeholder={tr.form_desc_ph} />
            </div>

            <div className="f-field">
              <label className="f-label">{tr.form_budget}</label>
              <select className="f-inp f-select"
                value={formData.budget}
                onChange={e=>setFormData(p=>({...p,budget:e.target.value}))}>
                {tr.form_budget_opts.map((o,i)=><option key={i} value={i===0?"":o}>{o}</option>)}
              </select>
            </div>

            {formErr && <p style={{color:"#EF4444",fontSize:13,fontFamily:"'Inter',sans-serif",marginBottom:12}}>{tr.form_err}</p>}

            <div style={{display:"flex",gap:12,marginTop:8}}>
              <button onClick={submitForm} className="btn-p" style={{flex:1,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                {tr.form_submit} <ArrowRight size={15}/>
              </button>
              <button onClick={()=>{setShowForm(false);setFormErr(false);}} style={{flex:"0 0 auto",padding:"12px 20px",borderRadius:12,border:`1.5px solid ${BORDER}`,background:"transparent",color:MUTED,fontFamily:"'Sora',sans-serif",fontWeight:600,fontSize:14,cursor:"pointer"}}>
                {tr.form_cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
