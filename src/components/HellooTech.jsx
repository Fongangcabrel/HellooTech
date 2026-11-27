import { useState, useEffect, useRef } from "react";
import {
  Globe, Smartphone, Brain, Rocket, Database, ClipboardList,
  Activity, Layers, Wrench, Server, Menu, X, Mail, Phone, MapPin,
  ArrowRight, ArrowUpRight, MessageCircle, ChevronDown, Plus, Minus,
  Check, Star, Zap, Shield, Clock, Award, Search, PenTool, Code2,
  Rocket as RocketIcon, Linkedin, Github, LayoutGrid, GitBranch,
  ShieldCheck, CreditCard, Cloud, Workflow, XCircle, CheckCircle2
} from "lucide-react";
import HeroBubbles from "./HeroBubbles.jsx";

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
const GREEN    = "#16A34A";
const AMBER    = "#F59E0B";
const RED      = "#EF4444";

/* ============================ CONTACT ============================ */
const PHONE_RAW = "237680929265";
const PHONE_TXT = "+237 680 92 92 65";
const EMAIL     = "Fongangcabrel2007@gmail.com";
const WA        = `https://wa.me/${PHONE_RAW}`;
const LINKEDIN  = "https://www.linkedin.com/in/fongang-cabrel-81b9b83aa";
const GITHUB    = "https://github.com/Fongangcabrel";

/* ============================ HERO BUBBLES (three.js) ============================ */
// x / y : position normalisée (-1 → 1) dans le conteneur · r : rayon
const BACK_BUBBLES = [
  { x: 0.92,  y: 0.72,  r: 0.9,  color: SKY },
  { x: 0.55,  y: -0.86, r: 0.45, color: INK },
  { x: 0.98,  y: -0.42, r: 0.32, color: "#CBD5E1" },
  { x: -0.95, y: -0.6,  r: 0.5,  color: SKY_L },
  { x: -0.06, y: 0.62,  r: 0.2,  color: INK },
  { x: 0.08,  y: -0.7,  r: 0.16, color: SKY_D },
];
// Mobile : moins de bulles, gardées sur les bords pour ne pas gêner la lecture
const MOBILE_BUBBLES = [
  { x: 0.98,  y: 0.9,   r: 0.42, color: SKY },
  { x: 0.92,  y: -0.93, r: 0.26, color: INK },
  { x: -0.98, y: -0.97, r: 0.2,  color: SKY_L },
];
const FRONT_BUBBLES = [
  { x: -0.88, y: 0.5,   r: 0.38, color: INK },
  { x: 0.84,  y: 0.8,   r: 0.28, color: SKY },
  { x: 0.15,  y: -0.9,  r: 0.3,  color: "#CBD5E1" },
  { x: 0.93,  y: -0.22, r: 0.2,  color: SKY_D },
];

/* ============================ STATIC (language-independent) ============================ */
// Services : l'ordre doit correspondre à tr.services
const SERVICES = [
  { icon: Rocket,        tags: ["Audit","Processus","SI"], mother: true },
  { icon: LayoutGrid,    tags: ["Power Apps","Power Automate","Power BI"] },
  { icon: Globe,         tags: ["FastAPI","React","PWA"] },
  { icon: GitBranch,     tags: ["GitHub Actions","Docker","SSH"] },
  { icon: ShieldCheck,   tags: ["Accès","Secrets","Audit"] },
  { icon: CreditCard,    tags: ["Notchpay","Flutterwave","Stripe"] },
  { icon: Cloud,         tags: ["VPS","Debian","Nginx"] },
  { icon: Workflow,      tags: ["Python","Planification","ETL"] },
  { icon: Smartphone,    tags: ["React Native","Android","iOS"] },
  { icon: Brain,         tags: ["Pandas","Power BI","ML"] },
  { icon: Database,      tags: ["SQL Server","PostgreSQL","MySQL"] },
  { icon: Layers,        tags: ["Multi-tenant","API","Dashboards"] },
  { icon: Activity,      tags: ["Grafana","Alertes","Uptime"] },
  { icon: ClipboardList, tags: ["Scrum","Kanban","SDLC"] },
  { icon: Wrench,        tags: ["Préventif","Correctif","Support"] },
];
const PROC_ICONS   = [Search, PenTool, Code2, RocketIcon];
const PILLAR_ICONS = [Award, Zap, Shield, Clock];
const LEVER_IMGS   = ["levier-plateforme","levier-automatisation","levier-paiement","levier-infra"];

const PROJECTS = [
  { id:"kpiflow",      name:"KPIFlow",           cat:"web",    status:"prod",     featured:true, visual:"chart",  stack:["FastAPI","SQLAlchemy","PostgreSQL","Docker","Nginx","Grafana"] },
  { id:"bhhaccess",    name:"BHHaccess",         cat:"web",    status:"mvp",      featured:true, visual:"badge",  stack:["FastAPI","PostgreSQL","React","TypeScript","PWA","Ed25519"] },
  { id:"cocosecret",   name:"cocosecret.shop",   cat:"web",    status:"live",     featured:true, img:"/projects/cocosecret.webp",      url:"https://cocosecret.shop",        stack:["PHP","MySQL","Notchpay","Flutterwave","WhatsApp"] },
  { id:"cocoitalia",   name:"Coco Italia Beach", cat:"web",    status:"live",     img:"/projects/cocoitaliabeach.webp", url:"https://www.cocoitaliabeach.com", stack:["PHP","Stripe","JavaScript","MySQL"] },
  { id:"hospiconnect", name:"HospiConnect",      cat:"web",    status:"internal", visual:"queue",  stack:["PHP 8","Laravel","MySQL","WebSocket / SSE","PHPMailer"] },
  { id:"vyntix",       name:"VYNTIX",            cat:"infra",  status:"internal", visual:"uptime", stack:["FastAPI","SQL Server","SQLite","WebSockets","Redis","Chart.js"] },
  { id:"smarty",       name:"SMARTY",            cat:"mobile", status:"internal", visual:"map",    stack:["React Native","TypeScript","FastAPI","PostgreSQL","Redis"] },
  { id:"ssas",         name:"SSAS",              cat:"data",   status:"internal", visual:"alerts", stack:["Python","SQL Server","SQL Server Agent","T-SQL","Power BI"] },
  { id:"flowi",        name:"FlowI",             cat:"data",   status:"internal", visual:"flow",   stack:["Python","FastAPI","React.js","AsyncIO"] },
  { id:"scripx",       name:"SCRIPX",            cat:"infra",  status:"internal", visual:"ping",   stack:["PowerShell","Networking","Automation"] },
];
const CAT_KEYS = ["all","web","mobile","data","infra"];
const STATUS_COLORS = { prod: GREEN, live: GREEN, mvp: AMBER, internal: SKY_D };

const CLIENTS = ["BEETLE HERITAGE HOLDING","Clinique du Châtelet","cocosecret.shop","Coco Italia Beach"];

const GALLERY = [
  { src: "/coulisses/kpiflow-production.webp" },
  { src: "/coulisses/deploiement-docker.webp" },
  { src: "/coulisses/etl-sql-server.webp" },
];

const LANGS = ["fr","en"];

const TECH_NAMES   = ["Python","FastAPI","React.js","TypeScript","SQL Server","PostgreSQL","Redis","Power BI","PowerShell","Docker","WebSockets","Pandas"];
const TECH_COLORS  = ["#3776AB","#009688","#61DAFB","#3178C6","#CC2927","#336791","#DC382D","#F2C811","#5391FE","#2496ED","#8B5CF6","#E70488"];

/* ============================ TRANSLATIONS ============================ */
const TR = {
  fr: {
    nav: [["services","Services"],["methode","Méthode"],["projets","Projets"],["apropos","À propos"],["faq","FAQ"],["contact","Contact"]],
    nav_cta: "Obtenez un devis",
    nav_all_services: "Voir tous les services",

    hero_badge: "Douala, Cameroun · Remote",
    hero_h1a: "Atteignez vos objectifs avec des ",
    hero_h1b: "solutions numériques",
    hero_h1c: " sur mesure",
    hero_desc: "De la transformation digitale à l'hébergement cloud, HellooTech conçoit et déploie des solutions complètes, fiables et adaptées à votre entreprise.",
    hero_cta1: "Démarrer un projet",
    hero_cta2: "Voir nos réalisations",
    hero_tagline: "Accompagnement de bout en bout, de la conception à la livraison",
    mock_desktop_alt: "Site HellooTech affiché sur un ordinateur portable",
    mock_mobile_alt: "Site HellooTech affiché sur un smartphone",

    trust_label: "Technologies & expertises maîtrisées",
    techs: [
      "Langage N°1 en Data Science, IA, automatisation et backend web. Cœur de la stack HellooTech pour les ETL et APIs.",
      "Framework Python ultra-rapide pour des APIs RESTful modernes avec WebSockets, validation auto et doc intégrée.",
      "Bibliothèque JavaScript de Meta pour des interfaces composables et réactives. Utilisée dans FlowI et BHHaccess.",
      "Sur-ensemble typé de JavaScript qui détecte les erreurs à la compilation et fiabilise le code à grande échelle.",
      "SGBD Microsoft robuste pour les entreprises. Idéal pour les grandes volumétries transactionnelles et la BI.",
      "SGBD open-source avancé avec JSON, indexation puissante et haute dispo — backbone de KPIFlow et des apps critiques.",
      "Store clé-valeur en mémoire ultra-rapide pour le cache, les sessions et le pub/sub temps réel dans VYNTIX et SMARTY.",
      "Outil Microsoft de Business Intelligence : transforme les données brutes en dashboards interactifs et rapports visuels.",
      "Shell Microsoft pour l'automatisation système, la gestion réseau et le scripting DevOps — moteur de SCRIPX.",
      "Plateforme de conteneurisation — isolation des environnements, déploiements reproductibles et gestion simplifiée des dépendances en production.",
      "Protocole de communication bidirectionnel temps réel client-serveur — moteur du monitoring live dans VYNTIX.",
      "Bibliothèque Python d'analyse et manipulation de données — essentielle pour les pipelines ETL, le nettoyage et la préparation avant visualisation.",
    ],
    clients_label: "Ils nous font confiance",

    prob_eyebrow: "Vos défis actuels",
    prob_h2: "Vos outils freinent vos équipes au lieu de les aider.",
    prob_p1: "Des KPI suivis dans des fichiers Excel, des rapports refaits à la main chaque matin, des ventes perdues faute de paiement en ligne, des pannes découvertes par les clients…",
    prob_p2: "Ce bricolage coûte du temps, de l'argent et des opportunités — et il empêche vos équipes de se concentrer sur leur vrai métier.",
    appr_eyebrow: "L'approche HellooTech",
    appr_h2: "Un système d'information qui travaille pour vous.",
    appr_p1: "On commence toujours par la même question : quelle décision votre outil doit-il rendre possible ? On cartographie vos processus avant d'écrire la moindre ligne de code.",
    appr_p2: "Ensuite, on construit un ensemble cohérent — application, données, automatisation et serveurs — qu'on déploie, qu'on surveille et qu'on fait évoluer avec vous.",
    appr_points: ["Interlocuteur direct, du premier appel à la mise en production","Des solutions déjà en production dans de vraies entreprises","Formation et documentation pour que vous restiez autonomes"],

    lev_eyebrow: "Nos leviers",
    lev_h2: "Les leviers concrets pour faire avancer votre activité.",
    lev_desc: "Chaque obstacle est une opportunité. Voici comment nous transformons vos irritants quotidiens en avantages mesurables.",
    levers: [
      { title:"Remplacez vos fichiers Excel par une vraie plateforme.", desc:"Une application web sur mesure pour suivre vos indicateurs, valider à plusieurs niveaux et décider sur des chiffres fiables.", points:["Cycle complet : définition, saisie, calcul, validation","Rôles et permissions par département","Historique et traçabilité de chaque action"], proof:"Preuve : KPIFlow, utilisée dans toute l'entreprise chez BEETLE HERITAGE HOLDING." },
      { title:"Automatisez ce que vous refaites à la main.", desc:"Pipelines de données, tâches planifiées et flux Power Automate qui travaillent pendant que vos équipes se concentrent sur l'essentiel.", points:["Rapports générés et envoyés automatiquement","Alertes dès qu'un seuil critique est atteint","Tableaux de bord Power BI pour la direction"], proof:"Preuve : un rapport quotidien de 3 h transformé en tâche automatique de 5 min." },
      { title:"Vendez en ligne et encaissez en mobile money.", desc:"Boutiques et billetteries qui encaissent de vrais paiements — mobile money, carte bancaire ou commande directe sur WhatsApp.", points:["Notchpay, Flutterwave et Stripe intégrés","Confirmation de paiement en temps réel","Tunnel de vente pensé pour le mobile"], proof:"Preuve : cocosecret.shop et Coco Italia Beach vendent en ligne chaque jour." },
      { title:"Gardez vos systèmes en ligne, 24 h/24.", desc:"Serveurs sécurisés, déploiements automatiques et surveillance continue pour repérer une panne avant vos utilisateurs.", points:["VPS et serveurs Linux administrés","Déploiement automatique à chaque mise à jour","Monitoring temps réel et alertes (Grafana)"], proof:"Preuve : VYNTIX et SCRIPX surveillent l'infrastructure de BEETLE en direct." },
    ],

    svc_eyebrow: "Nos services",
    svc_h2: "Toutes les expertises pour votre transformation digitale",
    svc_desc: "Un seul partenaire, du conseil au serveur : on couvre l'ensemble de la chaîne pour que tout fonctionne ensemble.",
    svc_mother: "Le concept mère",
    services: [
      { title:"Transformation digitale",          desc:"L'idée qui relie tout le reste : on cartographie vos processus, puis on reconstruit votre système d'information autour." },
      { title:"Microsoft 365 & Power Platform",   desc:"Applications Power Apps, flux Power Automate et rapports Power BI sur les outils que votre équipe utilise déjà." },
      { title:"Web full-stack & PWA",             desc:"Des applications web rapides et installables, conçues, développées et maintenues de bout en bout." },
      { title:"DevOps & CI/CD",                   desc:"Build, tests et déploiement automatiques à chaque mise à jour, sans interruption de service." },
      { title:"DevSecOps",                        desc:"La sécurité intégrée au pipeline : contrôle d'accès, gestion des secrets, traçabilité, serveurs durcis." },
      { title:"Intégration de paiement",          desc:"Mobile money et carte bancaire, avec confirmation par webhook en temps réel." },
      { title:"Cloud & hébergement VPS",          desc:"On installe, sécurise et administre vos serveurs pour que vos applications restent en ligne." },
      { title:"Automatisation des processus",     desc:"Tâches planifiées et workflows qui remplacent le travail manuel répétitif." },
      { title:"Applications mobiles",             desc:"Apps Android & iOS en React Native : un seul code, une expérience native." },
      { title:"Data science & IA",                desc:"Analyse, tableaux de bord et modèles prédictifs pour mieux décider." },
      { title:"Bases de données SQL",             desc:"Conception, optimisation et administration de SQL Server, MySQL et PostgreSQL." },
      { title:"Plateformes SaaS",                 desc:"Produits multi-tenant avec APIs et tableaux de bord sur mesure." },
      { title:"Monitoring d'infrastructure",      desc:"Disponibilité, alertes et tableaux de bord : les pannes repérées avant vos utilisateurs." },
      { title:"Gestion de projet",                desc:"Livraison agile, bonnes pratiques SDLC et jalons clairs et partagés." },
      { title:"Maintenance informatique",         desc:"Support préventif et correctif pour que vos systèmes tournent sans accroc." },
    ],

    proc_eyebrow: "Notre méthode",
    proc_h2: "Une démarche claire, du début à la fin",
    proc_desc: "Une méthodologie éprouvée pour livrer des projets fiables, dans les délais.",
    process: [
      { n:"01", title:"Découverte",    desc:"On analyse votre besoin, vos processus et vos objectifs réels." },
      { n:"02", title:"Conception",    desc:"Architecture, maquettes et cahier des charges validés ensemble." },
      { n:"03", title:"Développement", desc:"Code rigoureux, tests et points d'avancement transparents." },
      { n:"04", title:"Livraison",     desc:"Déploiement, formation et support continu après mise en ligne." },
    ],

    res_eyebrow: "Nos résultats",
    res_h2a: "Les promesses, c'est bien.",
    res_h2b: "Les résultats, c'est mieux.",
    stats: [
      { value:10, suffix:"",      label:"Projets livrés, dont plusieurs en production" },
      { value:5,  prefix:"3 h → ", suffix:" min", label:"Un rapport quotidien manuel, automatisé" },
      { value:2,  suffix:"",      label:"Plateformes qui encaissent de vrais paiements" },
      { value:24, suffix:" h",    label:"Délai de réponse habituel à vos messages" },
    ],

    proj_eyebrow: "Nos réalisations",
    proj_h2: "Des projets concrets, livrés",
    proj_desc: "Chaque projet a résolu un vrai problème pour de vraies personnes. La plupart sont des outils internes : nous vous en faisons la démo lors d'un appel.",
    categories: { all:"Tous", web:"Web & E-commerce", mobile:"Mobile", data:"Data & Automatisation", infra:"Infrastructure & Réseau" },
    status: { prod:"En production", live:"En ligne", mvp:"MVP · en cours", internal:"Outil interne" },
    featured: "Projet phare",
    proj_demo: "Démo sur demande",
    proj_visit: "Voir le site",
    projects: {
      kpiflow:      { client:"BEETLE HERITAGE HOLDING · 2026", tag:"Plateforme KPI d'entreprise", desc:"Chaque département suivait ses KPI dans des fichiers Excel. KPIFlow a remplacé tout ce cycle par une seule plateforme, utilisée aujourd'hui dans toute l'entreprise.", points:["Cycle complet : définition → soumission → score automatique → validation multi-niveaux","Moteur de formules sécurisé, propre à chaque département","Docker sur serveur Debian, HTTPS, CI/CD et supervision Grafana"] },
      bhhaccess:    { client:"Initiative interne · 2026", tag:"Contrôle d'accès par badge QR", desc:"Les administrateurs définissent qui peut aller où ; à l'entrée, l'agent scanne le badge avec son téléphone et obtient la réponse en une seconde.", points:["Badges QR signés (Ed25519), droits vérifiés à chaque scan","Application agent en PWA, rien à installer","Journal d'audit complet, imports et exports Excel / PDF"] },
      cocosecret:   { client:"Projet client · E-commerce", tag:"Boutique bien-être en ligne", desc:"Une boutique de thés, bonbons et soins bien-être qui vend tous les jours. Le client choisit : commande sur WhatsApp ou paiement en ligne complet.", points:["Tunnel de vente hybride WhatsApp / paiement en ligne","Notchpay et Flutterwave (mobile money et carte)","Catalogue, panier, comptes clients et témoignages"] },
      cocoitalia:   { client:"Projet client · Événementiel · Italie", tag:"Billetterie de festival", desc:"La billetterie d'un festival de plage à Parme : trois formules, paiement Stripe et gestion des participants. Elle a encaissé de vraies ventes pour l'édition 2026.", points:["Billets numériques avec QR code","Paiement sécurisé par carte (Stripe)","Formulaire de contact automatisé"] },
      hospiconnect: { client:"Clinique du Châtelet", tag:"Gestion des files d'attente hospitalières", desc:"Remplace les tickets papier et les appels à voix haute par une file intelligente, avec écran de salle d'attente et annonces vocales.", points:["Priorités standard / prioritaire / urgence","Transferts entre services sans ressaisie","Statistiques d'affluence et journal d'audit sur 12 mois"] },
      vyntix:       { client:"Outil interne", tag:"Monitoring d'infrastructure IT", desc:"Monitoring réseau hybride en temps réel : visibilité en direct sur chaque équipement et score de santé pour décider vite.", points:["Tableaux de bord live via WebSockets","Écritures sans interruption (SQL Server + SQLite)","Score de santé calculé en continu"] },
      smarty:       { client:"Produit · Mobilité", tag:"Plateforme de VTC", desc:"Back-office web et applications Android / iOS, avec suivi des chauffeurs en temps réel. Née en PWA, migrée en application mobile native.", points:["Applications React Native (Android & iOS)","Back-end FastAPI asynchrone","Suivi temps réel avec Redis"] },
      ssas:         { client:"Outil interne", tag:"Système d'alerte de stock", desc:"Un pipeline ETL qui consolide les stocks dans SQL Server : les articles critiques sont détectés et les responsables reçoivent leur rapport chaque matin.", points:["Seuils d'alerte configurables","Traitements de nuit avec SQL Server Agent","Rapports Excel et tableaux de bord Power BI"] },
      flowi:        { client:"Outil interne", tag:"Automatisation des processus métier", desc:"Un framework modulaire pour cartographier, planifier et enchaîner des workflows métier depuis une interface visuelle.", points:["Interface React pour dessiner les workflows","Moteur d'orchestration FastAPI asynchrone","Modules Python enfichables"] },
      scripx:       { client:"BEETLE HERITAGE HOLDING", tag:"Monitoring réseau", desc:"Un outil PowerShell qui teste en même temps tous les équipements du réseau de production et affiche la latence en direct.", points:["Pannes repérées immédiatement","Interventions de l'équipe réseau plus rapides","Aucun logiciel à installer"] },
    },

    gal_eyebrow: "Dans les coulisses",
    gal_h2: "Pas de photos de banque d'images : notre vrai quotidien.",
    gal_desc: "Ce que vous voyez ici, ce sont nos postes de travail, pendant que nous construisons et déployons les projets de nos clients.",
    gallery: [
      "KPIFlow en préparation de mise en production",
      "Déploiement d'une application conteneurisée avec Docker",
      "Pipeline ETL et requêtes SQL Server pour un client",
    ],

    why_eyebrow: "Votre partenaire tech",
    why_h2: "Pourquoi choisir HellooTech ?",
    why_p1: "HellooTech est fondée par un développeur Full-Stack · Data · Infrastructure basé à Douala. Une maîtrise complète de la chaîne : interfaces web et mobiles, APIs Python, bases de données, Microsoft 365 & Power Platform, serveurs et CI/CD.",
    why_p2: "Petite équipe, contact direct, et on reste là après la mise en ligne. Dix projets livrés, dont une plateforme utilisée dans toute une entreprise : des solutions sérieuses, accessibles aux entreprises de toutes tailles.",
    why_cta: "Discutons de votre projet",
    pillars: [
      { title:"Solutions sur mesure",  desc:"Chaque projet est unique. On adapte nos solutions à vos contraintes et ambitions." },
      { title:"Qualité & performance", desc:"Code propre, architecture solide, résultats mesurables à chaque livraison." },
      { title:"Fiabilité & sécurité",  desc:"Systèmes robustes conçus avec les meilleures pratiques de sécurité." },
      { title:"Livraison à temps",     desc:"Respect des délais avec une communication transparente." },
    ],

    cmp_eyebrow: "Ce qui nous rend différents",
    cmp_h2: "Ce que nous faisons différemment",
    cmp_us: "Avec HellooTech",
    cmp_them: "Approche classique",
    cmp_rows: [
      ["On cartographie vos processus avant de coder", "On vend une solution toute faite"],
      ["Un interlocuteur direct, du devis à la production", "Des intermédiaires à chaque étape"],
      ["Le code et vos données vous appartiennent", "Vous restez dépendant du prestataire"],
      ["Déploiement, surveillance et suivi après livraison", "Livraison, puis plus de nouvelles"],
      ["Paiement mobile money intégré nativement", "Paiement en ligne en option, souvent oublié"],
      ["Formation et documentation incluses", "Formation facturée à part, ou inexistante"],
    ],

    cert_eyebrow: "Compétences & certifications",
    cert_h2: "Une expertise certifiée",
    certs: [
      "Licence Génie logiciel · Science des données · IME",
      "BTS / HND Informatique · IME",
      "IBM Data Science · en cours",
      "AWS Cloud Practitioner (CLF-C02) · en cours",
      "SAP Certified Associate · SAP BTP · en cours",
      "Scrum · Kanban · Docker · CI/CD · DevSecOps",
    ],

    test_eyebrow: "Ils nous font confiance",
    test_h2: "Ce que disent nos clients",
    testimonials: [
      { quote:"HellooTech a complètement restructuré notre système de données. Les rapports sont devenus clairs, fiables et accessibles à tous nos décideurs. Un travail méthodique et remarquablement professionnel.", name:"Directeur Système et Information", role:"Beetle Heritage Holding · Douala" },
      { quote:"Notre boutique en ligne a été livrée dans les délais avec toutes les fonctionnalités demandées. Dès le lancement, les commandes ont afflué. Une équipe réactive et à l'écoute.", name:"Développeur de Marché", role:"Commerce · cocosecret.shop" },
      { quote:"Notre équipe réseau dispose enfin d'une vue d'ensemble en temps réel. Les incidents sont détectés et traités bien plus rapidement qu'avant. Travail rigoureux, résultats concrets.", name:"Administrateur Réseau", role:"Beetle Heritage Holding · Douala" },
      { quote:"Le site a été livré rapidement avec tout ce qu'il fallait pour gérer nos soirées et nos réservations. Nos clients adorent l'expérience en ligne !", name:"Event Planner", role:"Événement · Coco Italia Beach" },
    ],

    faq_eyebrow: "FAQ",
    faq_h2: "Questions fréquemment posées par nos clients",
    faq: [
      { q:"Comment sont structurés vos tarifs ?", a:"Chaque projet est chiffré sur mesure après un premier échange gratuit. Vous recevez un devis clair et détaillé, découpé par étapes, sans frais cachés. Pour les petits budgets, nous proposons de démarrer par l'essentiel puis d'enrichir l'outil par la suite." },
      { q:"En combien de temps mon projet est-il livré ?", a:"Cela dépend de la complexité : un site vitrine se livre en quelques semaines, une plateforme métier en quelques mois. Nous fixons ensemble un planning réaliste dès le départ, avec des points d'avancement réguliers." },
      { q:"Vais-je dépendre de vous pour faire évoluer mon outil ?", a:"Non. Le code et vos données vous appartiennent. Nous documentons ce que nous livrons et formons vos équipes. Vous pouvez ensuite nous confier la maintenance… ou la reprendre vous-mêmes." },
      { q:"Comment se déroule le premier échange, et combien coûte-t-il ?", a:"Il est gratuit et sans engagement. Par WhatsApp, appel ou visio, nous écoutons votre besoin, vos contraintes et vos objectifs, puis nous vous proposons une approche et un devis." },
      { q:"Travaillez-vous avec les petites entreprises ?", a:"Absolument. Nous accompagnons aussi bien les PME, les commerces que les startups, avec des solutions adaptées à votre taille et à votre budget." },
      { q:"Assurez-vous la maintenance après livraison ?", a:"Oui. Nous déployons, surveillons et maintenons vos systèmes (maintenance préventive et corrective) pour garantir leur bon fonctionnement dans la durée." },
      { q:"Où êtes-vous situés ?", a:"Nous sommes basés à Douala-Yassa, au Cameroun, et travaillons avec des clients partout, en présentiel ou à distance." },
    ],

    form_title: "Parlez-nous de votre projet",
    form_sub: "Remplissez ce formulaire — votre message WhatsApp sera préparé automatiquement.",
    form_name: "Nom complet *",
    form_name_ph: "Ex : Marie Ngono",
    form_contact: "Email ou numéro WhatsApp *",
    form_type: "Type de projet *",
    form_type_opts: ["-- Choisir --","Site web / PWA","Application mobile","Plateforme métier / SaaS","Data & automatisation","Microsoft 365 / Power Platform","E-commerce / paiement","Serveurs & hébergement","Autre"],
    form_desc: "Décrivez votre besoin *",
    form_desc_ph: "Ex : Je veux une boutique en ligne avec paiement mobile money...",
    form_budget: "Budget estimé",
    form_budget_opts: ["-- Budget --","< 100 000 XAF","100 000 – 500 000 XAF","500 000 – 1 000 000 XAF","> 1 000 000 XAF","À discuter"],
    form_submit: "Continuer vers WhatsApp",
    form_cancel: "Annuler",
    form_err: "Veuillez remplir les champs obligatoires (*)",
    form_wa_intro: "Bonjour HellooTech ! 👋\n\nVoici mon projet :\n",
    form_wa_fields: ["Nom","Contact","Type de projet","Description","Budget estimé"],

    cta_h2: "Prêt à structurer votre croissance numérique ?",
    cta_desc: "Décrivez-nous votre besoin. Premier échange gratuit et sans engagement, réponse sous 24 h.",
    cta_form: "Décrire mon projet",
    cta_call: "Appeler",

    foot_tagline: "Votre partenaire tech à Douala & en remote. Nous concevons, déployons et transformons.",
    foot_expertise: "Expertise",
    foot_expertise_links: ["Transformation digitale","Web & mobile","Data & automatisation","Microsoft 365 & Power Platform","Cloud & DevOps"],
    foot_links: "Liens",
    foot_contact: "Contact",
    foot_location: "Douala-Yassa, Cameroun · Remote",
    foot_copy: "© 2026 HellooTech · Tous droits réservés",
    foot_credit: "Illustrations par",
    foot_motto: "NOUS CONCEVONS · DÉPLOYONS · TRANSFORMONS",
  },

  en: {
    nav: [["services","Services"],["methode","Method"],["projets","Projects"],["apropos","About"],["faq","FAQ"],["contact","Contact"]],
    nav_cta: "Get a quote",
    nav_all_services: "See all services",

    hero_badge: "Douala, Cameroon · Remote",
    hero_h1a: "Reach your goals with ",
    hero_h1b: "tailored digital",
    hero_h1c: " solutions",
    hero_desc: "From digital transformation to cloud hosting, HellooTech designs and deploys complete, reliable solutions adapted to your business.",
    hero_cta1: "Start a project",
    hero_cta2: "View our work",
    hero_tagline: "End-to-end support, from conception to delivery",
    mock_desktop_alt: "HellooTech website shown on a laptop",
    mock_mobile_alt: "HellooTech website shown on a smartphone",

    trust_label: "Technologies & expertise",
    techs: [
      "The #1 language for Data Science, AI, automation and web backends. Core of the HellooTech stack for ETL and APIs.",
      "Ultra-fast Python framework for modern RESTful APIs with WebSockets, automatic validation and built-in documentation.",
      "Meta's JavaScript library for composable and reactive interfaces. Used in FlowI and BHHaccess.",
      "Typed superset of JavaScript that catches errors at compile time and makes large-scale code more reliable.",
      "Microsoft's enterprise-grade RDBMS. Built for high-volume transactional data and business intelligence.",
      "Advanced open-source RDBMS with JSON, powerful indexing and high availability — backbone of KPIFlow and critical apps.",
      "Ultra-fast in-memory key-value store for caching, sessions and real-time pub/sub — powering VYNTIX and SMARTY.",
      "Microsoft's Business Intelligence tool: turns raw data into interactive dashboards and visual reports.",
      "Microsoft's shell for system automation, network management and DevOps scripting — engine behind SCRIPX.",
      "Containerisation platform — environment isolation, reproducible deployments and simplified dependency management in production.",
      "Bidirectional real-time client-server communication protocol — engine of the live monitoring in VYNTIX.",
      "Python data analysis and manipulation library — essential for ETL pipelines, data cleaning and preparation before visualization.",
    ],
    clients_label: "They trust us",

    prob_eyebrow: "Your current challenges",
    prob_h2: "Your tools slow your teams down instead of helping them.",
    prob_p1: "KPIs tracked in Excel files, reports rebuilt by hand every morning, sales lost for lack of online payment, outages discovered by customers…",
    prob_p2: "This patchwork costs time, money and opportunities — and keeps your teams from focusing on their real job.",
    appr_eyebrow: "The HellooTech approach",
    appr_h2: "An information system that works for you.",
    appr_p1: "We always start with the same question: what decision should your tool make possible? We map your processes before writing a single line of code.",
    appr_p2: "Then we build a coherent whole — application, data, automation and servers — that we deploy, monitor and evolve with you.",
    appr_points: ["One direct contact, from the first call to production","Solutions already running in real companies","Training and documentation so you stay independent"],

    lev_eyebrow: "Our levers",
    lev_h2: "Concrete levers to move your business forward.",
    lev_desc: "Every obstacle is an opportunity. Here is how we turn your daily pain points into measurable advantages.",
    levers: [
      { title:"Replace your Excel files with a real platform.", desc:"A custom web application to track your indicators, validate at several levels and decide on reliable figures.", points:["Full cycle: definition, input, scoring, validation","Roles and permissions per department","History and traceability of every action"], proof:"Proof: KPIFlow, used company-wide at BEETLE HERITAGE HOLDING." },
      { title:"Automate what you keep doing by hand.", desc:"Data pipelines, scheduled jobs and Power Automate flows that work while your teams focus on what matters.", points:["Reports generated and sent automatically","Alerts as soon as a critical threshold is reached","Power BI dashboards for management"], proof:"Proof: a 3-hour daily report turned into a 5-minute automated job." },
      { title:"Sell online and get paid with mobile money.", desc:"Shops and ticketing sites that collect real payments — mobile money, bank card or direct ordering on WhatsApp.", points:["Notchpay, Flutterwave and Stripe built in","Real-time payment confirmation","Mobile-first checkout"], proof:"Proof: cocosecret.shop and Coco Italia Beach sell online every day." },
      { title:"Keep your systems online, 24/7.", desc:"Secured servers, automated deployments and continuous monitoring to catch an outage before your users do.", points:["Managed VPS and Linux servers","Automatic deployment on every update","Real-time monitoring and alerts (Grafana)"], proof:"Proof: VYNTIX and SCRIPX monitor BEETLE's infrastructure live." },
    ],

    svc_eyebrow: "Our services",
    svc_h2: "Every skill your digital transformation needs",
    svc_desc: "One partner, from advice to server: we cover the whole chain so everything works together.",
    svc_mother: "The core concept",
    services: [
      { title:"Digital transformation",          desc:"The idea that ties everything together: we map your processes, then rebuild your information system around them." },
      { title:"Microsoft 365 & Power Platform",  desc:"Power Apps applications, Power Automate flows and Power BI reports on the tools your team already uses." },
      { title:"Full-stack web & PWA",            desc:"Fast, installable web applications, designed, built and maintained end to end." },
      { title:"DevOps & CI/CD",                  desc:"Automatic build, tests and deployment on every update, with no downtime." },
      { title:"DevSecOps",                       desc:"Security built into the pipeline: access control, secrets management, traceability, hardened servers." },
      { title:"Payment integration",             desc:"Mobile money and bank cards, with real-time webhook confirmation." },
      { title:"Cloud & VPS hosting",             desc:"We install, secure and manage your servers so your applications stay online." },
      { title:"Process automation",              desc:"Scheduled jobs and workflows that replace repetitive manual work." },
      { title:"Mobile apps",                     desc:"Android & iOS apps in React Native: one codebase, a native experience." },
      { title:"Data science & AI",               desc:"Analysis, dashboards and predictive models to make better decisions." },
      { title:"SQL databases",                   desc:"Design, optimization and administration of SQL Server, MySQL and PostgreSQL." },
      { title:"SaaS platforms",                  desc:"Multi-tenant products with APIs and custom dashboards." },
      { title:"Infrastructure monitoring",       desc:"Uptime, alerts and dashboards: outages caught before your users notice." },
      { title:"Project management",              desc:"Agile delivery, SDLC best practices and clear, shared milestones." },
      { title:"IT maintenance",                  desc:"Preventive and corrective support to keep your systems running smoothly." },
    ],

    proc_eyebrow: "Our method",
    proc_h2: "A clear process, start to finish",
    proc_desc: "A proven methodology to deliver reliable projects on time.",
    process: [
      { n:"01", title:"Discovery",     desc:"We analyse your needs, processes and real objectives." },
      { n:"02", title:"Design",        desc:"Architecture, wireframes and specs validated together." },
      { n:"03", title:"Development",   desc:"Rigorous code, testing and transparent progress updates." },
      { n:"04", title:"Delivery",      desc:"Deployment, training and ongoing support after launch." },
    ],

    res_eyebrow: "Our results",
    res_h2a: "Promises are nice.",
    res_h2b: "Results are better.",
    stats: [
      { value:10, suffix:"",      label:"Projects delivered, several in production" },
      { value:5,  prefix:"3 h → ", suffix:" min", label:"A manual daily report, automated" },
      { value:2,  suffix:"",      label:"Platforms collecting real payments" },
      { value:24, suffix:" h",    label:"Usual response time to your messages" },
    ],

    proj_eyebrow: "Our work",
    proj_h2: "Real projects, delivered",
    proj_desc: "Every project solved a real problem for real people. Most are internal tools: we'll gladly demo them on a call.",
    categories: { all:"All", web:"Web & E-commerce", mobile:"Mobile", data:"Data & Automation", infra:"Infrastructure & Network" },
    status: { prod:"In production", live:"Live", mvp:"MVP · in progress", internal:"Internal tool" },
    featured: "Flagship project",
    proj_demo: "Demo on request",
    proj_visit: "Visit the site",
    projects: {
      kpiflow:      { client:"BEETLE HERITAGE HOLDING · 2026", tag:"Company-wide KPI platform", desc:"Every department tracked its KPIs in Excel files. KPIFlow replaced that whole cycle with a single platform, now used across the entire company.", points:["Full cycle: definition → submission → automatic scoring → multi-level validation","Secure formula engine, specific to each department","Docker on a Debian server, HTTPS, CI/CD and Grafana monitoring"] },
      bhhaccess:    { client:"Internal initiative · 2026", tag:"QR badge access control", desc:"Admins define who can go where; at the door, the agent scans the badge with a phone and gets the answer in a second.", points:["Signed QR badges (Ed25519), rights checked on every scan","Agent app as a PWA, nothing to install","Full audit log, Excel / PDF imports and exports"] },
      cocosecret:   { client:"Client project · E-commerce", tag:"Wellness online shop", desc:"A shop for teas, sweets and wellness care that sells every day. Customers choose: order on WhatsApp or pay fully online.", points:["Hybrid WhatsApp / online payment funnel","Notchpay and Flutterwave (mobile money and card)","Catalogue, cart, customer accounts and reviews"] },
      cocoitalia:   { client:"Client project · Events · Italy", tag:"Festival ticketing", desc:"Ticketing for a beach festival in Parma: three passes, Stripe payment and attendee management. It collected real sales for the 2026 edition.", points:["Digital tickets with QR codes","Secure card payment (Stripe)","Automated contact form"] },
      hospiconnect: { client:"Clinique du Châtelet", tag:"Hospital queue management", desc:"Replaces paper tickets and shouted names with a smart queue, a waiting-room screen and voice announcements.", points:["Standard / priority / emergency levels","Inter-department transfers with no re-entry","Attendance statistics and a 12-month audit log"] },
      vyntix:       { client:"Internal tool", tag:"IT infrastructure monitoring", desc:"Real-time hybrid network monitoring: live visibility on every device and a health score to decide fast.", points:["Live dashboards via WebSockets","Uninterrupted writes (SQL Server + SQLite)","Continuously computed health score"] },
      smarty:       { client:"Product · Mobility", tag:"Ride-hailing platform", desc:"Web back-office and Android / iOS apps with real-time driver tracking. Born as a PWA, migrated to a native mobile app.", points:["React Native apps (Android & iOS)","Asynchronous FastAPI back-end","Real-time tracking with Redis"] },
      ssas:         { client:"Internal tool", tag:"Stock alert system", desc:"An ETL pipeline consolidating stock data in SQL Server: critical items are detected and managers get their report every morning.", points:["Configurable alert thresholds","Nightly jobs with SQL Server Agent","Excel reports and Power BI dashboards"] },
      flowi:        { client:"Internal tool", tag:"Business process automation", desc:"A modular framework to map, schedule and chain business workflows from a visual interface.", points:["React interface to draw workflows","Asynchronous FastAPI orchestration engine","Pluggable Python modules"] },
      scripx:       { client:"BEETLE HERITAGE HOLDING", tag:"Network monitoring", desc:"A PowerShell tool that pings every device on the production network at once and shows latency live.", points:["Outages spotted immediately","Faster network team interventions","Nothing to install"] },
    },

    gal_eyebrow: "Behind the scenes",
    gal_h2: "No stock photos: this is our real day-to-day.",
    gal_desc: "What you see here are our workstations, while we build and deploy our clients' projects.",
    gallery: [
      "KPIFlow being prepared for production",
      "Deploying a containerised application with Docker",
      "ETL pipeline and SQL Server queries for a client",
    ],

    why_eyebrow: "Your tech partner",
    why_h2: "Why choose HellooTech?",
    why_p1: "HellooTech was founded by a Full-Stack · Data · Infrastructure developer based in Douala. Full mastery of the chain: web and mobile interfaces, Python APIs, databases, Microsoft 365 & Power Platform, servers and CI/CD.",
    why_p2: "Small team, direct contact, and we stay after launch. Ten projects delivered, including a platform used across an entire company: serious solutions, accessible to businesses of all sizes.",
    why_cta: "Discuss your project",
    pillars: [
      { title:"Custom solutions",       desc:"Every project is unique. We adapt our solutions to your constraints and ambitions." },
      { title:"Quality & performance",  desc:"Clean code, solid architecture, measurable results at every delivery." },
      { title:"Reliability & security", desc:"Robust systems built with best security practices." },
      { title:"On-time delivery",       desc:"Deadlines respected, with transparent communication." },
    ],

    cmp_eyebrow: "What makes us different",
    cmp_h2: "What we do differently",
    cmp_us: "With HellooTech",
    cmp_them: "Typical approach",
    cmp_rows: [
      ["We map your processes before coding", "An off-the-shelf solution is sold"],
      ["One direct contact, from quote to production", "Intermediaries at every step"],
      ["The code and your data belong to you", "You stay dependent on the provider"],
      ["Deployment, monitoring and follow-up after delivery", "Delivery, then silence"],
      ["Mobile money payments built in natively", "Online payment optional, often forgotten"],
      ["Training and documentation included", "Training billed separately, or none"],
    ],

    cert_eyebrow: "Skills & certifications",
    cert_h2: "Certified expertise",
    certs: [
      "Bachelor in Software Engineering · Data Science · IME",
      "BTS / HND in Computer Science · IME",
      "IBM Data Science · in progress",
      "AWS Cloud Practitioner (CLF-C02) · in progress",
      "SAP Certified Associate · SAP BTP · in progress",
      "Scrum · Kanban · Docker · CI/CD · DevSecOps",
    ],

    test_eyebrow: "Trusted by clients",
    test_h2: "What our clients say",
    testimonials: [
      { quote:"HellooTech completely restructured our data system. Reports are now clear, reliable and accessible to all our decision-makers. Methodical and remarkably professional work.", name:"Director of Information Systems", role:"Beetle Heritage Holding · Douala" },
      { quote:"Our online store was delivered on time with every feature we asked for. Orders started coming in from day one. A responsive and attentive team.", name:"Market Developer", role:"Commerce · cocosecret.shop" },
      { quote:"Our network team finally has a real-time overview of everything. Incidents are detected and handled far faster than before. Rigorous work, concrete results.", name:"Network Administrator", role:"Beetle Heritage Holding · Douala" },
      { quote:"The website was delivered quickly with everything needed to manage our events and bookings. Our clients love the online experience!", name:"Event Planner", role:"Events · Coco Italia Beach" },
    ],

    faq_eyebrow: "FAQ",
    faq_h2: "Questions our clients often ask",
    faq: [
      { q:"How is your pricing structured?", a:"Every project is priced individually after a free first conversation. You receive a clear, detailed quote split into stages, with no hidden fees. For small budgets, we suggest starting with the essentials and enriching the tool later." },
      { q:"How long until my project is delivered?", a:"It depends on complexity: a showcase website takes a few weeks, a business platform a few months. We set a realistic schedule together from the start, with regular progress updates." },
      { q:"Will I depend on you to evolve my tool?", a:"No. The code and your data belong to you. We document what we deliver and train your teams. You can then entrust us with maintenance… or take it over yourselves." },
      { q:"How does the first conversation work, and what does it cost?", a:"It is free and with no commitment. Over WhatsApp, a call or video, we listen to your needs, constraints and goals, then propose an approach and a quote." },
      { q:"Do you work with small businesses?", a:"Absolutely. We support SMEs, shops and startups alike, with solutions tailored to your size and budget." },
      { q:"Do you provide maintenance after delivery?", a:"Yes. We deploy, monitor and maintain your systems (preventive and corrective maintenance) to keep them running smoothly over time." },
      { q:"Where are you located?", a:"We are based in Douala-Yassa, Cameroon, and work with clients everywhere, on site or remotely." },
    ],

    form_title: "Tell us about your project",
    form_sub: "Fill in this form — your WhatsApp message will be prepared automatically.",
    form_name: "Full name *",
    form_name_ph: "E.g. Marie Ngono",
    form_contact: "Email or WhatsApp number *",
    form_type: "Project type *",
    form_type_opts: ["-- Select --","Website / PWA","Mobile app","Business platform / SaaS","Data & automation","Microsoft 365 / Power Platform","E-commerce / payment","Servers & hosting","Other"],
    form_desc: "Describe your need *",
    form_desc_ph: "E.g. I want an online store with mobile money payments...",
    form_budget: "Estimated budget",
    form_budget_opts: ["-- Budget --","< 100 000 XAF","100 000 – 500 000 XAF","500 000 – 1 000 000 XAF","> 1 000 000 XAF","To discuss"],
    form_submit: "Continue to WhatsApp",
    form_cancel: "Cancel",
    form_err: "Please fill in the required fields (*)",
    form_wa_intro: "Hello HellooTech! 👋\n\nHere's my project:\n",
    form_wa_fields: ["Name","Contact","Project type","Description","Estimated budget"],

    cta_h2: "Ready to structure your digital growth?",
    cta_desc: "Tell us about your needs. Free first conversation, no commitment, reply within 24 h.",
    cta_form: "Describe my project",
    cta_call: "Call us",

    foot_tagline: "Your tech partner in Douala & remote-friendly. We design, deploy and transform.",
    foot_expertise: "Expertise",
    foot_expertise_links: ["Digital transformation","Web & mobile","Data & automation","Microsoft 365 & Power Platform","Cloud & DevOps"],
    foot_links: "Links",
    foot_contact: "Contact",
    foot_location: "Douala-Yassa, Cameroon · Remote",
    foot_copy: "© 2026 HellooTech · All rights reserved",
    foot_credit: "Illustrations by",
    foot_motto: "WE DESIGN · DEPLOY · TRANSFORM",
  },
};

/* ============================ CSS ============================ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
.h-root{font-family:'Inter',sans-serif;background:${WHITE};color:${BODY};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
.h-root h1,.h-root h2,.h-root h3,.h-root h4{font-family:'Sora',sans-serif;color:${INK};letter-spacing:-0.02em;}
.h-root img{max-width:100%;}

.eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:${SKY_D};font-weight:500;}
.sec-h2{font-size:2.4rem;font-weight:700;line-height:1.15;}

.btn-p{background:${SKY};color:#fff;font-family:'Sora',sans-serif;font-weight:600;font-size:14px;padding:13px 26px;border-radius:10px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all .22s ease;text-decoration:none;}
.btn-p:hover{background:${SKY_D};transform:translateY(-2px);box-shadow:0 10px 28px rgba(14,165,233,.28);}
.btn-g{background:${WHITE};color:${INK};font-family:'Sora',sans-serif;font-weight:600;font-size:14px;padding:12px 26px;border-radius:10px;border:1.5px solid ${BORDER};cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all .22s ease;text-decoration:none;}
.btn-g:hover{border-color:${SKY};color:${SKY_D};transform:translateY(-2px);}

.nlink{font-family:'Sora',sans-serif;color:${INK};font-size:14px;font-weight:500;background:none;border:none;cursor:pointer;transition:color .2s;padding:0;text-decoration:none;}
.nlink:hover{color:${SKY};}

.s-card{position:relative;background:${WHITE};border:1px solid ${BORDER};border-radius:16px;padding:26px;transition:all .28s ease;cursor:default;height:100%;}
.s-card:hover{border-color:${SKY_L};transform:translateY(-5px);box-shadow:0 18px 44px rgba(11,18,32,.07);}
.s-card.mother{background:linear-gradient(135deg,${SKY} 0%,${SKY_D} 100%);border-color:transparent;color:#fff;}
.s-card.mother h3{color:#fff;}

.chip{font-size:11px;font-weight:500;padding:4px 11px;border-radius:999px;background:${SKY_50};color:${SKY_D};border:1px solid ${SKY_100};}

.filt{font-family:'Sora',sans-serif;font-size:13px;font-weight:500;padding:9px 18px;border-radius:999px;border:1.5px solid ${BORDER};background:${WHITE};color:${BODY};cursor:pointer;transition:all .2s ease;}
.filt:hover{border-color:${SKY_L};color:${INK};}
.filt.on{background:${INK};border-color:${INK};color:#fff;}

.p-card{background:${WHITE};border:1px solid ${BORDER};border-radius:18px;overflow:hidden;transition:all .28s ease;display:flex;flex-direction:column;}
.p-card:hover{border-color:${SKY_L};transform:translateY(-5px);box-shadow:0 18px 44px rgba(11,18,32,.08);}

.faq-item{border:1px solid ${BORDER};border-radius:14px;overflow:hidden;transition:border-color .2s;background:${WHITE};}
.faq-item.open{border-color:${SKY_L};}
.faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 22px;background:none;border:none;cursor:pointer;text-align:left;font-family:'Sora',sans-serif;font-weight:600;font-size:15px;color:${INK};}

.flink{color:rgba(255,255,255,.7);font-size:14px;text-decoration:none;transition:color .2s;display:inline-flex;align-items:center;gap:6px;}
.flink:hover{color:${SKY_L};}

.fab{position:fixed;bottom:24px;right:24px;z-index:90;width:58px;height:58px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 28px rgba(37,211,102,.4);text-decoration:none;transition:transform .2s;}
.fab:hover{transform:scale(1.08);}

.lang-btn{font-family:'Sora',sans-serif;font-size:11px;font-weight:700;padding:4px 9px;border-radius:6px;border:none;cursor:pointer;letter-spacing:.06em;transition:all .2s;}
.modal-ov{position:fixed;inset:0;background:rgba(11,18,32,.65);backdrop-filter:blur(8px);z-index:300;display:flex;align-items:center;justify-content:center;padding:20px;}
.modal-box{background:#fff;border-radius:20px;padding:36px 32px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;animation:rise .25s both ease;box-shadow:0 32px 80px rgba(11,18,32,.22);}
.f-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
.f-label{font-family:'Sora',sans-serif;font-size:13px;font-weight:600;color:${INK};}
.f-inp{font-family:'Inter',sans-serif;font-size:14px;padding:11px 14px;border-radius:10px;border:1.5px solid ${BORDER};color:${INK};outline:none;transition:border-color .2s;background:#fff;width:100%;box-sizing:border-box;}
.f-inp:focus{border-color:${SKY};}
.f-inp.ferr{border-color:${RED};}
.f-select{appearance:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:36px;}
.f-ta{resize:vertical;min-height:88px;}
@media(max-width:540px){.modal-box{padding:24px 18px;}}

@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.floaty{animation:floaty 5s ease-in-out infinite;}
@keyframes rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.rise{animation:rise .7s both ease;}
@keyframes pulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}}
.live-dot{width:7px;height:7px;border-radius:50%;background:#22C55E;animation:pulse 1.8s ease-in-out infinite;display:inline-block;}

.mq{display:flex;gap:20px;width:max-content;animation:marq 32s linear infinite;align-items:center;}
.mq-paused{animation-play-state:paused!important;}
@keyframes marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

.illu{width:100%;height:auto;display:block;}
.lev-row{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
.lev-row.rev .lev-img{order:2;}
.gal-card{position:relative;border-radius:18px;overflow:hidden;aspect-ratio:3/4;background:${INK};}
.gal-card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;}
.gal-card:hover img{transform:scale(1.05);}

@media (prefers-reduced-motion: reduce){
  .floaty,.mq,.rise,.live-dot{animation:none!important;}
  html{scroll-behavior:auto;}
}

@media(max-width:980px){
  .sg{grid-template-columns:1fr 1fr !important;}
  .pg{grid-template-columns:1fr 1fr !important;}
  .hero-grid,.two-col{grid-template-columns:1fr !important;}
  .hero-visual{display:none !important;}
  .nd{display:none !important;}
  .nm{display:flex !important;}
  .foot-grid{grid-template-columns:1fr 1fr !important;}
  .lev-row{grid-template-columns:1fr;gap:28px;}
  .lev-row.rev .lev-img{order:0;}
  .lev-img{max-width:420px;margin:0 auto;}
  .faq-illu{display:none !important;}
  .galg{grid-template-columns:1fr 1fr !important;}
  .cta-illu{display:none !important;}
}
@media(max-width:640px){
  .sg,.pg,.galg{grid-template-columns:1fr !important;}
  .statg{grid-template-columns:1fr 1fr !important;}
  .procg{grid-template-columns:1fr !important;}
  .pillg{grid-template-columns:1fr !important;}
  .foot-grid{grid-template-columns:1fr !important;}
  .cmp-head{display:none !important;}
  .cmp-row{grid-template-columns:1fr !important;}
  .h1{font-size:2.3rem !important;}
  .sec-h2,.h2{font-size:1.75rem !important;}
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

function Counter({ value, prefix = "", suffix = "" }) {
  const [ref, seen] = useInView(0.5);
  // Valeur finale par défaut (robots, captures, mouvement réduit) ;
  // on repart de 0 uniquement si le compteur est encore hors écran au chargement.
  const [n, setN] = useState(value);
  const animate = useRef(false);
  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (el && !reduce && "IntersectionObserver" in window && el.getBoundingClientRect().top > window.innerHeight) {
      animate.current = true;
      setN(0);
    }
  }, [ref]);
  useEffect(() => {
    if (!seen || !animate.current) return;
    let raf, start;
    const dur = 1400;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, value]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

function SectionHead({ eyebrow, title, desc, light, align = "center", mb = 56 }) {
  return (
    <div style={{ textAlign: align, marginBottom: mb, maxWidth: align === "center" ? 720 : "none", marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>
      <span className="eyebrow" style={light ? { color: SKY_L } : undefined}>{eyebrow}</span>
      <h2 className="sec-h2" style={{ margin: "14px 0 14px", color: light ? "#fff" : INK }}>{title}</h2>
      {desc && <p style={{ color: light ? "rgba(255,255,255,.65)" : BODY, fontSize: "1rem", lineHeight: 1.7 }}>{desc}</p>}
    </div>
  );
}

function Illu({ name, alt = "", style }) {
  return <img className="illu" src={`/illustrations/${name}.webp`} alt={alt} loading="lazy" width="560" height="560" style={style} />;
}

/* Mini-maquettes illustratives pour les outils internes (aucune donnée réelle) */
function ProjectVisual({ p }) {
  const win = (children) => (
    <div style={{ width: "78%", background: WHITE, borderRadius: 10, boxShadow: "0 14px 34px rgba(11,18,32,.25)", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 10px", borderBottom: `1px solid ${BORDER}` }}>
        {[RED, AMBER, GREEN].map(c => <span key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c, opacity: .8 }} />)}
        <span style={{ marginLeft: 6, fontFamily: "JetBrains Mono", fontSize: 9, color: MUTED }}>{p.name.toLowerCase()}</span>
      </div>
      <div style={{ padding: 10 }}>{children}</div>
    </div>
  );
  const row = (left, right, color) => (
    <div key={left} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: `1px solid ${BORDER}`, fontSize: 10, fontFamily: "Inter", color: BODY }}>
      <span style={{ fontFamily: "JetBrains Mono" }}>{left}</span>
      <span style={{ fontWeight: 600, color, fontSize: 9.5 }}>{right}</span>
    </div>
  );
  let body;
  switch (p.visual) {
    case "chart":
      body = win(
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60 }}>
          {[62, 84, 71, 95, 78, 88].map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "4px 4px 0 0", background: h > 80 ? GREEN : AMBER }} />)}
        </div>
      );
      break;
    case "badge": {
      // Motif décoratif façon QR (non décodable)
      const cells = Array.from({ length: 49 }, (_, i) => ((i * 7919) % 11) % 3 === 0);
      body = (
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: WHITE, borderRadius: 12, padding: 12, boxShadow: "0 14px 34px rgba(11,18,32,.25)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,9px)", gap: 1.5, padding: 5, border: `1px solid ${BORDER}`, borderRadius: 6 }}>
            {cells.map((on, i) => <span key={i} style={{ width: 9, height: 9, borderRadius: 1.5, background: on ? INK : SKY_100 }} />)}
          </div>
          <div style={{ fontFamily: "Inter", fontSize: 10, color: BODY, lineHeight: 1.6 }}>
            <div style={{ fontFamily: "Sora", fontWeight: 700, fontSize: 12, color: INK }}>DEMO-001</div>
            <div>Zones A · C</div>
            <div style={{ color: GREEN, fontWeight: 600 }}>● Autorisé</div>
          </div>
        </div>
      );
      break;
    }
    case "queue":
      body = win([row("A-012", "URGENCE", RED), row("B-034", "PRIORITAIRE", AMBER), row("C-101", "STANDARD", SKY_D)]);
      break;
    case "uptime":
      body = win([row("SRV-01", "● 99.9%", GREEN), row("SRV-02", "● 99.7%", GREEN), row("SW-CORE", "● 100%", GREEN)]);
      break;
    case "alerts":
      body = win([row("SKU-2041", "▼ 3 u.", RED), row("SKU-1187", "▼ 12 u.", AMBER), row("SKU-0932", "OK", GREEN)]);
      break;
    case "ping":
      body = (
        <div style={{ width: "78%", background: INK, borderRadius: 10, padding: "12px 14px", fontFamily: "JetBrains Mono", fontSize: 10, lineHeight: 1.8, color: "#CBD5E1", boxShadow: "0 14px 34px rgba(0,0,0,.35)" }}>
          <div style={{ color: SKY_L }}>PS&gt; scripx --live</div>
          <div>SRV-01 <span style={{ color: "#4ADE80" }}>4 ms</span></div>
          <div>AP-03 &nbsp;<span style={{ color: "#4ADE80" }}>9 ms</span></div>
          <div>PRN-07 <span style={{ color: "#F87171" }}>timeout</span></div>
        </div>
      );
      break;
    case "map":
      body = (
        <div style={{ width: "78%", height: 110, background: WHITE, borderRadius: 12, overflow: "hidden", boxShadow: "0 14px 34px rgba(11,18,32,.25)" }}>
          <svg viewBox="0 0 200 110" width="100%" height="100%" aria-hidden="true">
            <rect width="200" height="110" fill={SKY_50} />
            {[20, 55, 90].map(y => <line key={y} x1="0" x2="200" y1={y} y2={y} stroke={BORDER} strokeWidth="6" />)}
            {[40, 110, 170].map(x => <line key={x} y1="0" y2="110" x1={x} x2={x} stroke={BORDER} strokeWidth="6" />)}
            <path d="M40 90 L40 55 L110 55 L110 20 L170 20" fill="none" stroke={SKY} strokeWidth="3" strokeDasharray="6 4" />
            <circle cx="40" cy="90" r="6" fill={INK} />
            <circle cx="170" cy="20" r="7" fill={SKY_D} />
            <circle cx="170" cy="20" r="3" fill="#fff" />
          </svg>
        </div>
      );
      break;
    case "flow":
      body = (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {["Extract", "Transform", "Notify"].map((t, i) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ background: WHITE, borderRadius: 8, padding: "9px 10px", fontFamily: "Sora", fontSize: 10, fontWeight: 600, color: INK, boxShadow: "0 10px 24px rgba(11,18,32,.25)" }}>{t}</div>
              {i < 2 && <ArrowRight size={14} color="#fff" />}
            </div>
          ))}
        </div>
      );
      break;
    default:
      body = null;
  }
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg,${SKY} 0%,${SKY_D} 100%)` }}>
      {body}
    </div>
  );
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
  const [showForm, setShowForm]   = useState(false);
  const [formData, setFormData]   = useState({ name:"", contact:"", type:"", desc:"", budget:"" });
  const [formErr, setFormErr]     = useState(false);
  const [smallScreen] = useState(() => typeof window !== "undefined" && window.innerWidth < 640);

  const tr = TR[lang];

  const changeLang = (l) => { setLang(l); setTIdx(0); setFilter("all"); setFaqOpen(0); };

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const closeForm = () => { setShowForm(false); setFormErr(false); };

  const submitForm = () => {
    if (!formData.name.trim() || !formData.contact.trim() || !formData.type || !formData.desc.trim()) {
      setFormErr(true);
      return;
    }
    const f = tr.form_wa_fields, d = formData;
    const msg = encodeURIComponent(
      tr.form_wa_intro +
      `• ${f[0]}: ${d.name}\n• ${f[1]}: ${d.contact}\n• ${f[2]}: ${d.type}\n• ${f[3]}: ${d.desc}\n` +
      (d.budget ? `• ${f[4]}: ${d.budget}\n` : "")
    );
    window.open(`${WA}?text=${msg}`, "_blank", "noopener,noreferrer");
    setFormData({ name:"", contact:"", type:"", desc:"", budget:"" });
    closeForm();
  };

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTIdx(i => (i + 1) % tr.testimonials.length), 5500);
    return () => clearInterval(id);
  }, [tr.testimonials.length]);

  // Fermer la fenêtre de devis avec Échap
  useEffect(() => {
    if (!showForm) return;
    const onKey = (e) => { if (e.key === "Escape") closeForm(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showForm]);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenu(false); setSvcOpen(false); };
  const shown = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

  return (
    <div className="h-root">
      <style>{CSS}</style>

      <div style={{position:"fixed",top:0,left:0,height:3,width:`${progress}%`,background:SKY,zIndex:200,transition:"width .1s"}}/>

      {/* ───── NAVBAR ───── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:scrolled?"rgba(255,255,255,.88)":"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:`1px solid ${scrolled?BORDER:"transparent"}`,transition:"all .3s ease"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",height:68,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <button onClick={()=>go("top")} aria-label="HellooTech" style={{display:"flex",alignItems:"center",gap:11,cursor:"pointer",background:"none",border:"none",padding:0}}>
            <div style={{width:36,height:36,borderRadius:10,background:SKY,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Sora",fontWeight:700,fontSize:18,color:"#fff"}}>H</div>
            <span style={{fontFamily:"Sora",fontSize:20,fontWeight:700,color:INK}}>Helloo<span style={{color:SKY}}>Tech</span></span>
          </button>

          <div className="nd" style={{display:"flex",gap:26,alignItems:"center"}}>
            {tr.nav.map(([id,l]) => (
              id==="services" ? (
                <div key={id} style={{position:"relative"}} onMouseEnter={()=>setSvcOpen(true)} onMouseLeave={()=>setSvcOpen(false)}>
                  <button className="nlink" aria-expanded={svcOpen} style={{display:"flex",alignItems:"center",gap:4}} onClick={()=>go(id)}>
                    {l} <ChevronDown size={14} style={{transform:svcOpen?"rotate(180deg)":"none",transition:"transform .2s"}}/>
                  </button>
                  {svcOpen && (
                    <div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",paddingTop:14}}>
                      <div style={{width:460,background:WHITE,border:`1px solid ${BORDER}`,borderRadius:16,boxShadow:"0 24px 60px rgba(11,18,32,.12)",padding:14}}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                          {SERVICES.slice(0,8).map((s,i)=>{
                            const Icon = s.icon;
                            return (
                              <button key={i} onClick={()=>go("services")} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:10,border:"none",background:"none",cursor:"pointer",textAlign:"left",transition:"background .15s"}}
                                onMouseEnter={e=>e.currentTarget.style.background=SKY_50} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                                <Icon size={16} color={SKY_D} style={{flexShrink:0}}/>
                                <span style={{fontFamily:"Sora",fontSize:12.5,fontWeight:500,color:INK,lineHeight:1.3}}>{tr.services[i].title}</span>
                              </button>
                            );
                          })}
                        </div>
                        <button onClick={()=>go("services")} className="nlink" style={{display:"flex",alignItems:"center",gap:6,marginTop:8,padding:"8px 10px",fontSize:12.5,color:SKY_D}}>
                          {tr.nav_all_services} <ArrowRight size={14}/>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : <button key={id} className="nlink" onClick={()=>go(id)}>{l}</button>
            ))}

            <div style={{display:"flex",gap:2,background:SURFACE,borderRadius:8,padding:3,border:`1px solid ${BORDER}`}}>
              {LANGS.map(l => (
                <button key={l} className="lang-btn" aria-pressed={lang===l} onClick={()=>changeLang(l)}
                  style={{background:lang===l?SKY:"none",color:lang===l?"#fff":MUTED}}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button onClick={()=>setShowForm(true)} className="btn-p" style={{padding:"10px 20px",fontSize:13}}>{tr.nav_cta}</button>
          </div>

          <button className="nm" aria-label="Menu" aria-expanded={menu} onClick={()=>setMenu(!menu)} style={{display:"none",background:"none",border:"none",color:INK,cursor:"pointer",padding:4}}>
            {menu ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
        {menu && (
          <div style={{background:WHITE,borderBottom:`1px solid ${BORDER}`,padding:"18px 24px",display:"flex",flexDirection:"column",gap:16}}>
            {tr.nav.map(([id,l])=> <button key={id} className="nlink" onClick={()=>go(id)} style={{fontSize:16,textAlign:"left"}}>{l}</button>)}
            <div style={{display:"flex",gap:6}}>
              {LANGS.map(l => (
                <button key={l} className="lang-btn" aria-pressed={lang===l} onClick={()=>changeLang(l)}
                  style={{background:lang===l?SKY:SURFACE,color:lang===l?"#fff":BODY,border:`1px solid ${lang===l?SKY:BORDER}`,flex:1,padding:"8px"}}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button onClick={()=>{setMenu(false);setShowForm(true);}} className="btn-p" style={{justifyContent:"center"}}>{tr.nav_cta}</button>
          </div>
        )}
      </nav>

      {/* ───── HERO ───── */}
      <section id="top" style={{position:"relative",paddingTop:140,paddingBottom:90,overflow:"hidden",background:`linear-gradient(180deg,${SKY_50} 0%,${WHITE} 100%)`}}>
        <div style={{position:"absolute",top:-120,right:-80,width:480,height:480,background:`radial-gradient(circle,${SKY_100},transparent 70%)`,borderRadius:"50%",filter:"blur(20px)",pointerEvents:"none"}}/>
        <HeroBubbles bubbles={smallScreen ? MOBILE_BUBBLES : BACK_BUBBLES} style={{zIndex:0}}/>
        <div className="hero-grid" style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"grid",gridTemplateColumns:"1.05fr .95fr",gap:56,alignItems:"center",position:"relative",zIndex:1}}>
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
              <button onClick={()=>setShowForm(true)} className="btn-p">{tr.hero_cta1} <ArrowRight size={16}/></button>
              <button className="btn-g" onClick={()=>go("projets")}>{tr.hero_cta2}</button>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{display:"flex",gap:2}} aria-hidden="true">{[1,2,3,4,5].map(i=><Star key={i} size={16} fill={SKY} color={SKY}/>)}</div>
              <span style={{fontSize:13,color:BODY}}>{tr.hero_tagline}</span>
            </div>
          </div>

          <div className="hero-visual floaty" style={{position:"relative"}}>
            <HeroBubbles bubbles={FRONT_BUBBLES} depth={0.6} style={{inset:-60,zIndex:3}}/>
            <div style={{position:"relative",paddingBottom:"7%",paddingRight:"9%"}}>
              <div style={{position:"relative",zIndex:1}}>
                <div style={{background:INK,borderRadius:"14px 14px 4px 4px",padding:"2.2% 2.2% 2.6%",boxShadow:"0 30px 70px rgba(11,18,32,.18)"}}>
                  <div style={{aspectRatio:"16/10",borderRadius:4,overflow:"hidden",background:WHITE}}>
                    <img src="/mockup/desktop.webp" alt={tr.mock_desktop_alt} fetchpriority="high"
                      style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",display:"block"}}/>
                  </div>
                </div>
                <div style={{position:"relative",height:14,margin:"0 -6%",background:"linear-gradient(180deg,#E2E8F0,#CBD5E1)",borderRadius:"0 0 14px 14px",boxShadow:"0 14px 30px rgba(11,18,32,.12)"}}>
                  <div style={{position:"absolute",left:"50%",top:0,transform:"translateX(-50%)",width:"16%",height:5,background:"#94A3B8",borderRadius:"0 0 6px 6px",opacity:.6}}/>
                </div>
              </div>
              <div style={{position:"absolute",right:0,bottom:0,width:"27%",zIndex:2,background:INK,borderRadius:26,padding:6,boxShadow:"0 24px 50px rgba(11,18,32,.25)"}}>
                <div style={{position:"relative",aspectRatio:"390/844",borderRadius:20,overflow:"hidden",background:WHITE}}>
                  <img src="/mockup/mobile.webp" alt={tr.mock_mobile_alt} loading="lazy"
                    style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",display:"block"}}/>
                  <div style={{position:"absolute",top:6,left:"50%",transform:"translateX(-50%)",width:"34%",height:12,background:INK,borderRadius:999}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── TECH MARQUEE + CLIENTS ───── */}
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
                  style={{display:"inline-flex",alignItems:"center",gap:7,padding:"6px 15px",borderRadius:999,background:active?`${col}18`:SURFACE,border:`1.5px solid ${active?col:BORDER}`,cursor:"default",transition:"all .2s",whiteSpace:"nowrap",userSelect:"none"}}>
                  <span style={{width:8,height:8,borderRadius:"50%",background:col,flexShrink:0,boxShadow:active?`0 0 8px ${col}99`:"none",transition:"box-shadow .2s"}}/>
                  <span style={{fontFamily:"Sora",fontWeight:600,fontSize:14,color:active?col:MUTED,transition:"color .2s"}}>{name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{minHeight:68,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
          {hovTech!==null && (
            <div className="rise" style={{display:"flex",alignItems:"flex-start",gap:10,maxWidth:580,background:WHITE,border:`1.5px solid ${TECH_COLORS[hovTech]}40`,borderLeft:`3px solid ${TECH_COLORS[hovTech]}`,borderRadius:10,padding:"10px 16px",boxShadow:`0 4px 20px ${TECH_COLORS[hovTech]}1A`}}>
              <p style={{fontSize:13,lineHeight:1.6,color:BODY}}>
                <span style={{fontFamily:"Sora",fontWeight:700,color:TECH_COLORS[hovTech],marginRight:6}}>{TECH_NAMES[hovTech]}</span>
                {tr.techs[hovTech]}
              </p>
            </div>
          )}
        </div>
        <div style={{background:SURFACE,borderTop:`1px solid ${BORDER}`,padding:"22px 24px"}}>
          <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",gap:"14px 40px",flexWrap:"wrap"}}>
            <span className="eyebrow" style={{color:MUTED}}>{tr.clients_label}</span>
            {CLIENTS.map(c => <span key={c} style={{fontFamily:"Sora",fontWeight:700,fontSize:15,color:"#64748B",letterSpacing:".02em"}}>{c}</span>)}
          </div>
        </div>
      </section>

      {/* ───── PROBLÈME → APPROCHE ───── */}
      <section style={{padding:"96px 24px",background:WHITE}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",flexDirection:"column",gap:72}}>
          <div className="lev-row">
            <div className="lev-img"><Illu name="probleme"/></div>
            <div>
              <span className="eyebrow" style={{color:RED}}>{tr.prob_eyebrow}</span>
              <h2 className="sec-h2" style={{margin:"14px 0 20px"}}>{tr.prob_h2}</h2>
              <p style={{fontSize:"1rem",lineHeight:1.8,marginBottom:14}}>{tr.prob_p1}</p>
              <p style={{fontSize:"1rem",lineHeight:1.8,fontWeight:500,color:INK}}>{tr.prob_p2}</p>
            </div>
          </div>
          <div className="lev-row rev">
            <div className="lev-img"><Illu name="approche"/></div>
            <div>
              <span className="eyebrow">{tr.appr_eyebrow}</span>
              <h2 className="sec-h2" style={{margin:"14px 0 20px"}}>{tr.appr_h2}</h2>
              <p style={{fontSize:"1rem",lineHeight:1.8,marginBottom:14}}>{tr.appr_p1}</p>
              <p style={{fontSize:"1rem",lineHeight:1.8,marginBottom:22}}>{tr.appr_p2}</p>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {tr.appr_points.map(pt => (
                  <div key={pt} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:".95rem",color:INK}}>
                    <CheckCircle2 size={18} color={SKY} style={{flexShrink:0,marginTop:2}}/> {pt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── LEVIERS ───── */}
      <section style={{padding:"96px 24px",background:SURFACE}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SectionHead eyebrow={tr.lev_eyebrow} title={tr.lev_h2} desc={tr.lev_desc} mb={64}/>
          <div style={{display:"flex",flexDirection:"column",gap:80}}>
            {tr.levers.map((lv,i)=>(
              <div key={i} className={`lev-row ${i%2?"rev":""}`}>
                <div className="lev-img"><Illu name={LEVER_IMGS[i]}/></div>
                <div>
                  <div style={{fontFamily:"JetBrains Mono",fontSize:13,color:SKY_D,marginBottom:10}}>0{i+1}</div>
                  <h3 style={{fontSize:"1.6rem",fontWeight:700,lineHeight:1.25,marginBottom:14}}>{lv.title}</h3>
                  <p style={{fontSize:"1rem",lineHeight:1.75,marginBottom:20}}>{lv.desc}</p>
                  <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:22}}>
                    {lv.points.map(pt => (
                      <div key={pt} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:".95rem",color:INK}}>
                        <Check size={17} color={SKY} style={{flexShrink:0,marginTop:2}}/> {pt}
                      </div>
                    ))}
                  </div>
                  <div style={{display:"inline-flex",alignItems:"center",gap:8,background:WHITE,border:`1px solid ${SKY_100}`,borderRadius:10,padding:"10px 14px",fontSize:13.5,color:SKY_D,fontWeight:500}}>
                    <Award size={16} style={{flexShrink:0}}/> {lv.proof}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SERVICES ───── */}
      <section id="services" style={{padding:"96px 24px",maxWidth:1200,margin:"0 auto"}}>
        <SectionHead eyebrow={tr.svc_eyebrow} title={tr.svc_h2} desc={tr.svc_desc}/>
        <div className="sg" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
          {tr.services.map((s,i)=>{
            const { icon: Icon, tags, mother } = SERVICES[i];
            return (
              <div key={i} className={`s-card ${mother?"mother":""}`}>
                {mother && <span className="eyebrow" style={{position:"absolute",top:22,right:22,color:"rgba(255,255,255,.85)",fontSize:10}}>{tr.svc_mother}</span>}
                <div style={{width:48,height:48,borderRadius:13,background:mother?"rgba(255,255,255,.18)":SKY_50,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>
                  <Icon size={22} color={mother?"#fff":SKY_D}/>
                </div>
                <h3 style={{fontSize:"1.05rem",fontWeight:600,marginBottom:10}}>{s.title}</h3>
                <p style={{fontSize:".9rem",lineHeight:1.65,color:mother?"rgba(255,255,255,.9)":BODY,marginBottom:18}}>{s.desc}</p>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                  {tags.map(tag=> <span key={tag} className="chip" style={mother?{background:"rgba(255,255,255,.15)",color:"#fff",borderColor:"rgba(255,255,255,.3)"}:undefined}>{tag}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ───── MÉTHODE ───── */}
      <section id="methode" style={{padding:"96px 24px",background:INK,color:"#fff"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SectionHead eyebrow={tr.proc_eyebrow} title={tr.proc_h2} desc={tr.proc_desc} light/>
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

      {/* ───── RÉSULTATS ───── */}
      <section style={{padding:"88px 24px",background:WHITE}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <span className="eyebrow">{tr.res_eyebrow}</span>
            <h2 className="sec-h2" style={{marginTop:14}}>{tr.res_h2a}<br/><span style={{color:SKY}}>{tr.res_h2b}</span></h2>
          </div>
          <div className="statg" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:18}}>
            {tr.stats.map((s,i)=>(
              <div key={i} style={{textAlign:"center",background:SURFACE,border:`1px solid ${BORDER}`,borderRadius:18,padding:"28px 18px"}}>
                <div style={{fontFamily:"Sora",fontSize:"2.4rem",fontWeight:700,color:SKY,letterSpacing:"-.03em",whiteSpace:"nowrap"}}>
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix}/>
                </div>
                <div style={{fontSize:13.5,color:BODY,marginTop:8,lineHeight:1.5}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PROJETS ───── */}
      <section id="projets" style={{padding:"96px 24px",background:SURFACE}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SectionHead eyebrow={tr.proj_eyebrow} title={tr.proj_h2} desc={tr.proj_desc} mb={36}/>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:36}}>
            {CAT_KEYS.map(k=>(
              <button key={k} aria-pressed={filter===k} className={`filt ${filter===k?"on":""}`} onClick={()=>setFilter(k)}>{tr.categories[k]}</button>
            ))}
          </div>
          <div className="pg" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {shown.map((p,i)=>{
              const t = tr.projects[p.id];
              return (
                <article key={p.id} className="p-card rise" style={{animationDelay:`${i*0.05}s`}}>
                  <div style={{height:190,position:"relative",background:INK}}>
                    {p.img
                      ? <img src={p.img} alt={p.name} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",display:"block"}}/>
                      : <ProjectVisual p={p}/>}
                    <div style={{position:"absolute",top:12,left:12,right:12,display:"flex",justifyContent:"space-between",gap:8}}>
                      <span style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.95)",borderRadius:999,padding:"4px 10px",fontSize:11,fontWeight:600,color:INK}}>
                        <span className={p.status==="prod"||p.status==="live"?"live-dot":""} style={{width:7,height:7,borderRadius:"50%",background:STATUS_COLORS[p.status],display:"inline-block"}}/>
                        {tr.status[p.status]}
                      </span>
                      {p.featured && <span style={{background:INK,color:"#fff",borderRadius:999,padding:"4px 10px",fontSize:11,fontWeight:600}}>★ {tr.featured}</span>}
                    </div>
                  </div>
                  <div style={{padding:22,display:"flex",flexDirection:"column",flex:1}}>
                    <div style={{fontSize:11,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",color:MUTED,marginBottom:6}}>{t.client}</div>
                    <h3 style={{fontSize:"1.2rem",fontWeight:700,marginBottom:4}}>{p.name}</h3>
                    <div style={{fontSize:13,fontWeight:600,color:SKY_D,marginBottom:10}}>{t.tag}</div>
                    <p style={{fontSize:".88rem",lineHeight:1.65,color:BODY,marginBottom:12}}>{t.desc}</p>
                    <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
                      {t.points.map(pt => (
                        <li key={pt} style={{display:"flex",gap:8,fontSize:12.5,lineHeight:1.5,color:INK}}>
                          <Check size={14} color={SKY} style={{flexShrink:0,marginTop:3}}/> {pt}
                        </li>
                      ))}
                    </ul>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
                      {p.stack.map(s=> <span key={s} style={{fontSize:11,fontFamily:"JetBrains Mono",color:BODY,padding:"3px 8px",border:`1px solid ${BORDER}`,borderRadius:6,background:SURFACE}}>{s}</span>)}
                    </div>
                    <div style={{marginTop:"auto"}}>
                      {p.url
                        ? <a href={p.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,fontFamily:"Sora",fontWeight:600,fontSize:13.5,color:SKY_D,textDecoration:"none"}}>{tr.proj_visit} <ArrowUpRight size={16}/></a>
                        : <button onClick={()=>setShowForm(true)} style={{display:"inline-flex",alignItems:"center",gap:6,fontFamily:"Sora",fontWeight:600,fontSize:13.5,color:SKY_D,background:"none",border:"none",cursor:"pointer",padding:0}}>{tr.proj_demo} <ArrowRight size={16}/></button>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── COULISSES ───── */}
      <section style={{padding:"96px 24px",background:WHITE}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SectionHead eyebrow={tr.gal_eyebrow} title={tr.gal_h2} desc={tr.gal_desc} mb={44}/>
          <div className="galg" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
            {GALLERY.map((g,i)=>(
              <figure key={g.src} className="gal-card">
                <img src={g.src} alt={tr.gallery[i]} loading="lazy"/>
                <figcaption style={{position:"absolute",left:0,right:0,bottom:0,padding:"40px 18px 16px",background:"linear-gradient(180deg,transparent,rgba(11,18,32,.85))",color:"#fff",fontSize:13.5,fontWeight:500,lineHeight:1.5}}>
                  {tr.gallery[i]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───── POURQUOI NOUS + DIFFÉRENCES ───── */}
      <section id="apropos" style={{padding:"96px 24px",background:SURFACE}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="two-col" style={{display:"grid",gridTemplateColumns:".95fr 1.05fr",gap:56,alignItems:"center",marginBottom:88}}>
            <div>
              <span className="eyebrow">{tr.why_eyebrow}</span>
              <h2 className="sec-h2" style={{margin:"14px 0 20px"}}>{tr.why_h2}</h2>
              <p style={{fontSize:".98rem",lineHeight:1.8,marginBottom:18}}>{tr.why_p1}</p>
              <p style={{fontSize:".98rem",lineHeight:1.8,marginBottom:30}}>{tr.why_p2}</p>
              <button onClick={()=>setShowForm(true)} className="btn-p">{tr.why_cta} <ArrowRight size={16}/></button>
            </div>
            <div className="pillg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              {tr.pillars.map((p,i)=>{
                const Icon = PILLAR_ICONS[i];
                return (
                  <div key={i} style={{background:WHITE,border:`1px solid ${BORDER}`,borderRadius:16,padding:24}}>
                    <div style={{width:44,height:44,borderRadius:12,background:SKY_50,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}><Icon size={20} color={SKY_D}/></div>
                    <h3 style={{fontSize:".98rem",fontWeight:600,marginBottom:9}}>{p.title}</h3>
                    <p style={{fontSize:".84rem",lineHeight:1.6}}>{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <SectionHead eyebrow={tr.cmp_eyebrow} title={tr.cmp_h2} mb={36}/>
          <div style={{maxWidth:960,margin:"0 auto",background:WHITE,border:`1px solid ${BORDER}`,borderRadius:20,overflow:"hidden",boxShadow:"0 18px 50px rgba(11,18,32,.05)"}}>
            <div className="cmp-head cmp-row" style={{display:"grid",gridTemplateColumns:"1fr 1fr",background:INK}}>
              <div style={{padding:"16px 22px",fontFamily:"Sora",fontWeight:700,color:"#fff"}}>{tr.cmp_us}</div>
              <div style={{padding:"16px 22px",fontFamily:"Sora",fontWeight:600,color:MUTED}}>{tr.cmp_them}</div>
            </div>
            {tr.cmp_rows.map(([us,them],i)=>(
              <div key={i} className="cmp-row" style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderTop:i?`1px solid ${BORDER}`:"none"}}>
                <div style={{padding:"16px 22px",display:"flex",gap:10,alignItems:"flex-start",fontSize:14.5,color:INK,fontWeight:500,background:SKY_50}}>
                  <CheckCircle2 size={18} color={GREEN} style={{flexShrink:0,marginTop:2}}/> {us}
                </div>
                <div style={{padding:"16px 22px",display:"flex",gap:10,alignItems:"flex-start",fontSize:14.5,color:BODY}}>
                  <XCircle size={18} color={RED} style={{flexShrink:0,marginTop:2,opacity:.8}}/> {them}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CERTIFICATIONS ───── */}
      <section style={{padding:"70px 24px",background:WHITE,borderBottom:`1px solid ${BORDER}`}}>
        <div style={{maxWidth:1100,margin:"0 auto",textAlign:"center"}}>
          <span className="eyebrow">{tr.cert_eyebrow}</span>
          <h2 className="h2" style={{fontSize:"1.8rem",fontWeight:700,margin:"12px 0 32px"}}>{tr.cert_h2}</h2>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
            {tr.certs.map((c,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:9,background:SURFACE,border:`1px solid ${BORDER}`,borderRadius:12,padding:"13px 18px"}}>
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
        <h2 className="sec-h2" style={{margin:"14px 0 44px"}}>{tr.test_h2}</h2>
        <div aria-live="polite" style={{background:WHITE,border:`1px solid ${BORDER}`,borderRadius:20,padding:"44px 40px",boxShadow:"0 18px 50px rgba(11,18,32,.05)",minHeight:230,display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div style={{display:"flex",gap:3,justifyContent:"center",marginBottom:22}} aria-hidden="true">{[1,2,3,4,5].map(i=><Star key={i} size={18} fill={SKY} color={SKY}/>)}</div>
          <p style={{fontFamily:"Sora",fontSize:"1.2rem",lineHeight:1.6,color:INK,fontWeight:500,marginBottom:26}}>« {tr.testimonials[tIdx].quote} »</p>
          <div>
            <div style={{fontFamily:"Sora",fontWeight:600,fontSize:14,color:INK}}>{tr.testimonials[tIdx].name}</div>
            <div style={{fontSize:12.5,color:MUTED,marginTop:3}}>{tr.testimonials[tIdx].role}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:24}}>
          {tr.testimonials.map((_,i)=>(
            <button key={i} aria-label={`${i+1}`} aria-current={i===tIdx} onClick={()=>setTIdx(i)} style={{width:i===tIdx?28:8,height:8,borderRadius:999,border:"none",background:i===tIdx?SKY:BORDER,cursor:"pointer",transition:"all .3s",padding:0}}/>
          ))}
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section id="faq" style={{padding:"40px 24px 96px",background:WHITE}}>
        <div className="two-col" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:".8fr 1.2fr",gap:56,alignItems:"start"}}>
          <div className="faq-illu" style={{position:"sticky",top:100}}>
            <span className="eyebrow">{tr.faq_eyebrow}</span>
            <h2 className="sec-h2" style={{margin:"14px 0 24px"}}>{tr.faq_h2}</h2>
            <Illu name="faq"/>
          </div>
          <div>
            <div className="nm" style={{display:"none",flexDirection:"column",marginBottom:28}}>
              <span className="eyebrow">{tr.faq_eyebrow}</span>
              <h2 className="sec-h2" style={{marginTop:14}}>{tr.faq_h2}</h2>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {tr.faq.map((f,i)=>(
                <div key={i} className={`faq-item ${faqOpen===i?"open":""}`}>
                  <button className="faq-q" aria-expanded={faqOpen===i} onClick={()=>setFaqOpen(faqOpen===i?-1:i)}>
                    {f.q}
                    <span style={{flexShrink:0,width:28,height:28,borderRadius:8,background:faqOpen===i?SKY:SKY_50,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>
                      {faqOpen===i ? <Minus size={15} color="#fff"/> : <Plus size={15} color={SKY_D}/>}
                    </span>
                  </button>
                  {faqOpen===i && <div style={{padding:"0 22px 20px",fontSize:".92rem",lineHeight:1.7}}>{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section id="contact" style={{padding:"24px 24px 90px"}}>
        <div style={{maxWidth:1100,margin:"0 auto",background:`linear-gradient(135deg,${SKY} 0%,${SKY_D} 100%)`,borderRadius:28,padding:"56px 48px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-60,right:-40,width:260,height:260,background:"rgba(255,255,255,.1)",borderRadius:"50%"}}/>
          <div className="two-col" style={{position:"relative",display:"grid",gridTemplateColumns:"1.2fr .8fr",gap:32,alignItems:"center"}}>
            <div>
              <h2 style={{fontSize:"2.3rem",fontWeight:700,color:"#fff",marginBottom:16,lineHeight:1.2}}>{tr.cta_h2}</h2>
              <p style={{fontSize:"1.05rem",color:"rgba(255,255,255,.92)",maxWidth:520,marginBottom:32,lineHeight:1.7}}>{tr.cta_desc}</p>
              <div className="hb" style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:30}}>
                <button onClick={()=>setShowForm(true)} style={{background:"#fff",color:SKY_D,fontFamily:"Sora",fontWeight:600,fontSize:15,padding:"14px 26px",borderRadius:12,border:"none",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:10}}>
                  {tr.cta_form} <ArrowRight size={18}/>
                </button>
                <a href={WA} target="_blank" rel="noopener noreferrer" style={{background:"rgba(255,255,255,.14)",color:"#fff",border:"1.5px solid rgba(255,255,255,.4)",fontFamily:"Sora",fontWeight:600,fontSize:15,padding:"14px 24px",borderRadius:12,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:10}}>
                  <MessageCircle size={18}/> WhatsApp
                </a>
                <a href={`tel:+${PHONE_RAW}`} style={{background:"rgba(255,255,255,.14)",color:"#fff",border:"1.5px solid rgba(255,255,255,.4)",fontFamily:"Sora",fontWeight:600,fontSize:15,padding:"14px 24px",borderRadius:12,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:10}}>
                  <Phone size={17}/> {tr.cta_call}
                </a>
              </div>
              <div style={{display:"flex",gap:"10px 28px",flexWrap:"wrap",fontSize:14,color:"rgba(255,255,255,.95)"}}>
                <span style={{display:"flex",alignItems:"center",gap:8}}><Phone size={15}/> {PHONE_TXT}</span>
                <span style={{display:"flex",alignItems:"center",gap:8}}><Mail size={15}/> {EMAIL}</span>
              </div>
            </div>
            <div className="cta-illu" style={{background:"rgba(255,255,255,.95)",borderRadius:24,padding:12}}>
              <Illu name="contact"/>
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
                {[[Linkedin,LINKEDIN,"LinkedIn"],[Github,GITHUB,"GitHub"],[MessageCircle,WA,"WhatsApp"]].map(([Ic,href,label])=>(
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{width:36,height:36,borderRadius:9,background:"rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",textDecoration:"none",transition:"background .2s"}}
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
                {tr.nav.filter(([id])=>id!=="services").map(([id,l])=>(
                  <button key={id} className="flink" onClick={()=>go(id)} style={{background:"none",border:"none",cursor:"pointer",padding:0,textAlign:"left",fontFamily:"Inter"}}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{fontFamily:"Sora",fontSize:14,fontWeight:600,color:"#fff",marginBottom:16}}>{tr.foot_contact}</h4>
              <div style={{display:"flex",flexDirection:"column",gap:13,fontSize:14}}>
                <span style={{display:"flex",gap:9,alignItems:"flex-start"}}><MapPin size={16} color={SKY_L} style={{flexShrink:0,marginTop:2}}/> {tr.foot_location}</span>
                <a href={`tel:+${PHONE_RAW}`} className="flink"><Phone size={16} color={SKY_L}/> {PHONE_TXT}</a>
                <a href={`mailto:${EMAIL}`} className="flink" style={{wordBreak:"break-all"}}><Mail size={16} color={SKY_L} style={{flexShrink:0}}/> {EMAIL}</a>
              </div>
            </div>
          </div>
          <div style={{paddingTop:26,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
            <span style={{fontSize:13,color:"rgba(255,255,255,.5)"}}>
              {tr.foot_copy} · {tr.foot_credit} <a href="https://storyset.com" target="_blank" rel="noopener noreferrer" style={{color:"rgba(255,255,255,.7)"}}>Storyset</a>
            </span>
            <span style={{fontFamily:"JetBrains Mono",fontSize:11,letterSpacing:".12em",color:SKY_L}}>{tr.foot_motto}</span>
          </div>
        </div>
      </footer>

      <a href={WA} target="_blank" rel="noopener noreferrer" className="fab" aria-label="WhatsApp">
        <MessageCircle size={26} color="#fff"/>
      </a>

      {showForm && (
        <div className="modal-ov" onClick={e=>{if(e.target===e.currentTarget) closeForm();}}>
          <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="form-title">
            <h2 id="form-title" style={{fontSize:22,fontWeight:700,marginBottom:4}}>{tr.form_title}</h2>
            <p style={{fontSize:14,color:MUTED,marginBottom:24}}>{tr.form_sub}</p>

            <div className="f-field">
              <label className="f-label" htmlFor="f-name">{tr.form_name}</label>
              <input id="f-name" autoFocus className={`f-inp${formErr&&!formData.name.trim()?" ferr":""}`}
                value={formData.name} onChange={e=>setFormData(p=>({...p,name:e.target.value}))} placeholder={tr.form_name_ph}/>
            </div>
            <div className="f-field">
              <label className="f-label" htmlFor="f-contact">{tr.form_contact}</label>
              <input id="f-contact" className={`f-inp${formErr&&!formData.contact.trim()?" ferr":""}`}
                value={formData.contact} onChange={e=>setFormData(p=>({...p,contact:e.target.value}))} placeholder="+237 6XX XXX XXX"/>
            </div>
            <div className="f-field">
              <label className="f-label" htmlFor="f-type">{tr.form_type}</label>
              <select id="f-type" className={`f-inp f-select${formErr&&!formData.type?" ferr":""}`}
                value={formData.type} onChange={e=>setFormData(p=>({...p,type:e.target.value}))}>
                {tr.form_type_opts.map((o,i)=><option key={i} value={i===0?"":o}>{o}</option>)}
              </select>
            </div>
            <div className="f-field">
              <label className="f-label" htmlFor="f-desc">{tr.form_desc}</label>
              <textarea id="f-desc" className={`f-inp f-ta${formErr&&!formData.desc.trim()?" ferr":""}`}
                value={formData.desc} onChange={e=>setFormData(p=>({...p,desc:e.target.value}))} placeholder={tr.form_desc_ph}/>
            </div>
            <div className="f-field">
              <label className="f-label" htmlFor="f-budget">{tr.form_budget}</label>
              <select id="f-budget" className="f-inp f-select"
                value={formData.budget} onChange={e=>setFormData(p=>({...p,budget:e.target.value}))}>
                {tr.form_budget_opts.map((o,i)=><option key={i} value={i===0?"":o}>{o}</option>)}
              </select>
            </div>

            {formErr && <p role="alert" style={{color:RED,fontSize:13,marginBottom:12}}>{tr.form_err}</p>}

            <div style={{display:"flex",gap:12,marginTop:8}}>
              <button onClick={submitForm} className="btn-p" style={{flex:1,justifyContent:"center"}}>
                {tr.form_submit} <ArrowRight size={15}/>
              </button>
              <button onClick={closeForm} style={{flex:"0 0 auto",padding:"12px 20px",borderRadius:12,border:`1.5px solid ${BORDER}`,background:"transparent",color:MUTED,fontFamily:"'Sora',sans-serif",fontWeight:600,fontSize:14,cursor:"pointer"}}>
                {tr.form_cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
