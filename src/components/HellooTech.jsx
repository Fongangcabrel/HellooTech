import { useState, useEffect, useRef } from "react";
import {
  Globe, Smartphone, Brain, Rocket, Database, ClipboardList,
  Activity, Layers, Wrench, Server, Menu, X, Mail, Phone, MapPin,
  ArrowRight, ArrowUpRight, MessageCircle, ChevronDown, Plus, Minus,
  Check, Star, Zap, Shield, Clock, Award, Search, PenTool, Code2,
  Rocket as RocketIcon, Linkedin, Github, LayoutGrid, GitBranch,
  ShieldCheck, CreditCard, Cloud, Workflow, XCircle, CheckCircle2,
  Sun, Moon, DatabaseBackup, Lock, Calendar, FileSpreadsheet,
  ChevronLeft, ChevronRight, Quote
} from "lucide-react";
import HeroBubbles from "./HeroBubbles.jsx";

/* ============================ TOKENS ============================ */
const SKY      = "#0EA5E9";
const SKY_L    = "#38BDF8";
const SKY_D    = "#0284C7";
// Couleurs qui changent avec le mode clair / sombre (voir THEME_VARS)
const SKY_50   = "var(--sky50)";
const SKY_100  = "var(--sky100)";
const INK      = "var(--ink)";
const BODY     = "var(--body)";
const MUTED    = "var(--muted)";
const BORDER   = "var(--border)";
const SURFACE  = "var(--surface)";
const WHITE    = "var(--white)";
// Bleu nuit fixe (fonds sombres, bulles 3D) : identique dans les deux modes
const NAVY     = "#0B1220";
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
  { x: 0.55,  y: -0.86, r: 0.45, color: NAVY },
  { x: 0.98,  y: -0.42, r: 0.32, color: "#CBD5E1" },
  { x: -0.95, y: -0.6,  r: 0.5,  color: SKY_L },
  { x: -0.06, y: 0.62,  r: 0.2,  color: NAVY },
  { x: 0.08,  y: -0.7,  r: 0.16, color: SKY_D },
];
// Mobile : moins de bulles, gardées sur les bords pour ne pas gêner la lecture
const MOBILE_BUBBLES = [
  { x: 0.98,  y: 0.9,   r: 0.42, color: SKY },
  { x: 0.92,  y: -0.93, r: 0.26, color: NAVY },
  { x: -0.98, y: -0.97, r: 0.2,  color: SKY_L },
];
const FRONT_BUBBLES = [
  { x: -0.88, y: 0.5,   r: 0.38, color: NAVY },
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
  { id:"kpiflow",      name:"KPIFlow",           cat:"web",    status:"prod",     featured:true, img:"/projects/kpiflow.webp", stack:["FastAPI","SQLAlchemy","PostgreSQL","Docker","Nginx","Grafana"] },
  { id:"bhhaccess",    name:"BHHaccess",         cat:"web",    status:"mvp",      featured:true, img:"/projects/bhhaccess.webp", logo:"/projects/bhhaccess-icon.webp", stack:["FastAPI","PostgreSQL","React","TypeScript","PWA","Ed25519"] },
  { id:"cocosecret",   name:"cocosecret.shop",   cat:"web",    status:"live",     featured:true, img:"/projects/cocosecret.webp",      url:"https://cocosecret.shop",        stack:["PHP","MySQL","Notchpay","Flutterwave","WhatsApp"] },
  { id:"cocoitalia",   name:"Coco Italia Beach", cat:"web",    status:"live",     img:"/projects/cocoitaliabeach.webp", url:"https://www.cocoitaliabeach.com", stack:["PHP","Stripe","JavaScript","MySQL"] },
  { id:"hospiconnect", name:"HospiConnect",      cat:"web",    status:"internal", img:"/projects/hospiconnect.webp", stack:["PHP 8","Laravel","MySQL","WebSocket / SSE","PHPMailer"] },
  { id:"vyntix",       name:"VYNTIX",            cat:"infra",  status:"internal", img:"/projects/vyntix.webp", stack:["FastAPI","SQL Server","SQLite","WebSockets","Redis","Chart.js"] },
  { id:"smarty",       name:"SMARTY",            cat:"mobile", img:"/projects/smarty.webp", logo:"/projects/smarty-logo.webp", stack:["React Native","TypeScript","FastAPI","PostgreSQL","Redis"] },
  { id:"ssas",         name:"SSAS",              cat:"data",   img:"/projects/ssas.webp", stack:["Python","SQL Server","SQL Server Agent","T-SQL","Power BI"] },
  { id:"scripx",       name:"SCRIPX",            cat:"infra",  status:"internal", img:"/projects/scripx.webp", stack:["PowerShell","Networking","Automation"] },
];
const CAT_KEYS = ["all","web","mobile","data","infra"];
const STATUS_COLORS = { prod: GREEN, live: GREEN, mvp: AMBER, internal: SKY_D };


const GALLERY = [
  { src: "/coulisses/kpiflow-production.webp" },
  { src: "/coulisses/admin-linux.webp" },
  { src: "/coulisses/deploiement-docker.webp" },
  { src: "/coulisses/etl-sql-server.webp" },
  { src: "/coulisses/chargeur-etl.webp" },
  { src: "/coulisses/hebergement.webp", wide: true },
  { src: "/coulisses/planning.webp" },
];

const LANGS = ["fr","en"];

const TECH_NAMES   = ["Python","FastAPI","React.js","TypeScript","SQL Server","PostgreSQL","Redis","Power BI","PowerShell","Docker","WebSockets","Pandas","Grafana","Linux","Nginx","GitHub Actions","Laravel","PHP","MySQL","Microsoft 365","Power Platform"];
const TECH_COLORS  = ["#3776AB","#009688","#61DAFB","#3178C6","#CC2927","#336791","#DC382D","#F2C811","#5391FE","#2496ED","#8B5CF6","#E70488","#F46800","#FCC624","#009639","#2088FF","#FF2D20","#777BB4","#4479A1","#D83B01","#0F9D58"];
const TECH_LOGOS   = ["python.svg","fastapi.svg","react.svg","typescript.svg","sqlserver2025.png","postgresql.svg","redis.svg","powerbi-new.png","powershell.svg","docker.svg","socketio.svg","pandas.svg","grafana.svg","linux.png","nginx.svg","githubactions.svg","laravel.svg","php.svg","mysql.svg","microsoft365.png","powerplatform.png"];

// Partenaires phares : notre guide d'expertise
const MENTORS = [
  { id:"hellosem",   name:"helloSEM",    logo:"hellosem.webp",    bg:"#FFFFFF" },
  { id:"semhosting", name:"SEM Hosting", logo:"sem-hosting.webp", bg:"#FFFFFF" },
  { id:"zl",         name:"Zayn Londji", logo:"zl.webp",          bg:"#0A0D14" },
];

// Partenaires et clients (défilement)
const PARTNERS = [
  // h : hauteur du logo · label : nom affiché à côté quand le logo ne le contient pas
  { name:"BEETLE HERITAGE HOLDING", logo:"beetle.webp",            h:44 },
  { name:"Clinique du Châtelet",    logo:"clinique-chatelet.webp", h:38, round:true, label:true },
  { name:"Coco Secrets",            logo:"coco-secrets.webp",      h:30, bg:"#F7F0E6" },
  { name:"Coco Italia Beach",       logo:"coco-italia-beach.webp", h:48, round:true, label:true },
];

// Thème : variables CSS des modes clair et sombre
const THEME_VARS = {
  light: "--white:#FFFFFF;--surface:#F6FAFD;--ink:#0B1220;--body:#475569;--muted:#94A3B8;--border:#E6EDF5;--sky50:#F0F9FF;--sky100:#E0F2FE;--nav:rgba(255,255,255,.88);",
  dark:  "--white:#0F1A2E;--surface:#0A1324;--ink:#F1F5F9;--body:#C4CFDE;--muted:#8193AB;--border:#22324A;--sky50:rgba(14,165,233,.12);--sky100:rgba(56,189,248,.28);--nav:rgba(10,19,36,.88);",
};

const BLOG_IMGS = ["blog-transformation","blog-kpi","blog-paiement","blog-monitoring"];
const TIP_ICONS = [FileSpreadsheet, DatabaseBackup, Smartphone, Activity, Workflow, Lock];

/* ============================ TRANSLATIONS ============================ */
const TR = {
  fr: {
    nav: [["services","Services"],["projets","Projets"],["apropos","À propos"],["ressources","Ressources"],["contact","Contact"]],
    resources: [["partenaires","Partenaires"],["blog","Blog"],["conseils","Conseils"],["temoignages","Témoignages"],["faq","FAQ"]],
    foot_nav: [["methode","Méthode"],["projets","Projets"],["apropos","À propos"],["blog","Blog"],["conseils","Conseils"],["faq","FAQ"],["contact","Contact"]],
    nav_promo_eyebrow: "Agence tech · Douala",
    nav_promo_text: "L'agence qui accompagne les entreprises camerounaises vers une croissance numérique mesurable.",
    nav_promo_link: "Pourquoi HellooTech ?",
    theme_label: "Changer de mode d'affichage",
    lang_label: "Langue",
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
      "Bibliothèque JavaScript de Meta pour des interfaces composables et réactives. Utilisée dans BHHaccess.",
      "Sur-ensemble typé de JavaScript qui détecte les erreurs à la compilation et fiabilise le code à grande échelle.",
      "SGBD Microsoft robuste pour les entreprises. Idéal pour les grandes volumétries transactionnelles et la BI.",
      "SGBD open-source avancé avec JSON, indexation puissante et haute dispo — backbone de KPIFlow et des apps critiques.",
      "Store clé-valeur en mémoire ultra-rapide pour le cache, les sessions et le pub/sub temps réel dans VYNTIX et SMARTY.",
      "Outil Microsoft de Business Intelligence : transforme les données brutes en dashboards interactifs et rapports visuels.",
      "Shell Microsoft pour l'automatisation système, la gestion réseau et le scripting DevOps — moteur de SCRIPX.",
      "Plateforme de conteneurisation — isolation des environnements, déploiements reproductibles et gestion simplifiée des dépendances en production.",
      "Protocole de communication bidirectionnel temps réel client-serveur — moteur du monitoring live dans VYNTIX.",
      "Bibliothèque Python d'analyse et manipulation de données — essentielle pour les pipelines ETL, le nettoyage et la préparation avant visualisation.",
      "Plateforme de supervision : tableaux de bord et alertes sur les serveurs, les conteneurs Docker, la bande passante et le débit.",
      "Système d'exploitation de nos serveurs (Debian) : administration, sécurité, sauvegardes et déploiements.",
      "Serveur web et reverse proxy : HTTPS, mise en cache et répartition du trafic devant nos applications.",
      "Intégration et déploiement continus : tests, build et mise en production automatiques à chaque mise à jour.",
      "Framework PHP élégant pour des applications web robustes — utilisé dans HospiConnect.",
      "Langage du web côté serveur, derrière nos boutiques en ligne et billetteries.",
      "Base de données relationnelle populaire, fiable pour les sites e-commerce et applications web.",
      "La suite collaborative de Microsoft : Teams, SharePoint, Outlook et OneDrive, configurés et sécurisés pour votre équipe.",
      "Power Apps, Power Automate, Power BI, Power Pages et AI Builder : des applications, des automatisations et des rapports construits sur vos outils Microsoft.",
    ],
    clients_label: "Ils nous font confiance",

    prob_eyebrow: "Vos défis actuels",
    prob_h2: "Vos outils *freinent* vos équipes au lieu de les aider.",
    prob_p1: "Des KPI suivis dans des fichiers Excel, des rapports refaits à la main chaque matin, des ventes perdues faute de paiement en ligne, des pannes découvertes par les clients…",
    prob_p2: "Ce bricolage coûte du temps, de l'argent et des opportunités — et il empêche vos équipes de se concentrer sur leur vrai métier.",
    appr_eyebrow: "L'approche HellooTech",
    appr_h2: "Un système d'information qui *travaille pour vous*.",
    appr_p1: "On commence toujours par la même question : quelle décision votre outil doit-il rendre possible ? On cartographie vos processus avant d'écrire la moindre ligne de code.",
    appr_p2: "Ensuite, on construit un ensemble cohérent — application, données, automatisation et serveurs — qu'on déploie, qu'on surveille et qu'on fait évoluer avec vous.",
    appr_points: ["Interlocuteur direct, du premier appel à la mise en production","Des solutions déjà en production dans de vraies entreprises","Formation et documentation pour que vous restiez autonomes"],

    lev_eyebrow: "Nos leviers",
    lev_h2: "Les leviers concrets pour *faire avancer* votre activité.",
    lev_desc: "Chaque obstacle est une opportunité. Voici comment nous transformons vos irritants quotidiens en avantages mesurables.",
    levers: [
      { title:"Remplacez vos fichiers Excel par une vraie plateforme.", desc:"Une application web sur mesure pour suivre vos indicateurs, valider à plusieurs niveaux et décider sur des chiffres fiables.", points:["Cycle complet : définition, saisie, calcul, validation","Rôles et permissions par département","Historique et traçabilité de chaque action"], proof:"Preuve : KPIFlow, utilisée dans toute l'entreprise chez BEETLE HERITAGE HOLDING." },
      { title:"Automatisez ce que vous refaites à la main.", desc:"Pipelines de données, tâches planifiées et flux Power Automate qui travaillent pendant que vos équipes se concentrent sur l'essentiel.", points:["Rapports générés et envoyés automatiquement","Alertes dès qu'un seuil critique est atteint","Tableaux de bord Power BI pour la direction"], proof:"Preuve : un rapport quotidien de 3 h transformé en tâche automatique de 5 min." },
      { title:"Vendez en ligne et encaissez en mobile money.", desc:"Boutiques et billetteries qui encaissent de vrais paiements — mobile money, carte bancaire ou commande directe sur WhatsApp.", points:["Notchpay, Flutterwave et Stripe intégrés","Confirmation de paiement en temps réel","Tunnel de vente pensé pour le mobile"], proof:"Preuve : cocosecret.shop et Coco Italia Beach vendent en ligne chaque jour." },
      { title:"Gardez vos systèmes en ligne, 24 h/24.", desc:"Serveurs sécurisés, déploiements automatiques et surveillance continue pour repérer une panne avant vos utilisateurs.", points:["VPS et serveurs Linux administrés","Applications conteneurisées avec Docker et déployées automatiquement","Supervision Grafana : serveurs, conteneurs, bande passante et débit"], proof:"Preuve : chez BEETLE, Grafana supervise le serveur de KPIFlow, ses conteneurs Docker et la bande passante ; VYNTIX surveille le réseau en temps réel et alerte en cas de panne ; SCRIPX fait le contrôle quotidien en quelques secondes." },
    ],

    svc_eyebrow: "Nos services",
    svc_h2: "Toutes les expertises pour votre *transformation digitale*",
    svc_desc: "Un seul partenaire, du conseil au serveur : on couvre l'ensemble de la chaîne pour que tout fonctionne ensemble.",
    svc_mother: "Le concept mère",
    services: [
      { title:"Transformation digitale",          desc:"L'idée qui relie tout le reste : on cartographie vos processus, puis on reconstruit votre système d'information autour." },
      { title:"Microsoft 365 & Power Platform",   desc:"Applications Power Apps, flux Power Automate et rapports Power BI sur les outils que votre équipe utilise déjà." },
      { title:"Web full-stack & PWA",             desc:"Des applications web rapides et installables, conçues, développées et maintenues de bout en bout." },
      { title:"DevOps & CI/CD",                   desc:"Build, tests et déploiement automatiques à chaque mise à jour, sans interruption de service." },
      { title:"DevSecOps",                        desc:"La sécurité intégrée au pipeline : contrôle d'accès, gestion des secrets, traçabilité, serveurs durcis." },
      { title:"Intégration de paiement",          desc:"Mobile money et carte bancaire, avec confirmation par webhook en temps réel." },
      { title:"Cloud & hébergement VPS",          desc:"On installe, sécurise et administre vos serveurs pour que vos applications restent en ligne. Hébergement web avec notre partenaire SEM Hosting." },
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
    proc_h2: "Une démarche *claire*, du début à la fin",
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
    proj_h2: "Des projets *concrets*, livrés",
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
      vyntix:       { client:"Outil interne", tag:"Monitoring d'infrastructure IT", desc:"Monitoring réseau en temps réel : tableau de bord live de chaque équipement, alertes dès qu'un équipement tombe et historique des incidents.", points:["Alertes automatiques en cas de panne","Rapports d'incidents, disponibilité et temps d'arrêt","Tableau de bord live via WebSockets"] },
      smarty:       { client:"Produit · Mobilité", tag:"Plateforme de VTC", desc:"Back-office web et applications Android / iOS, avec suivi des chauffeurs en temps réel. Née en PWA, migrée en application mobile native.", points:["Applications React Native (Android & iOS)","Back-end FastAPI asynchrone","Suivi temps réel avec Redis"] },
      ssas:         { client:"Projet client · Data", tag:"Système d'alerte de stock", desc:"Un pipeline ETL qui consolide les stocks dans SQL Server : les articles critiques sont détectés et les responsables reçoivent leur rapport chaque matin.", points:["Seuils d'alerte configurables","Traitements de nuit avec SQL Server Agent","Rapports Excel et tableaux de bord Power BI"] },
      scripx:       { client:"BEETLE HERITAGE HOLDING", tag:"Contrôle quotidien du réseau", desc:"Un script PowerShell qui vérifie en quelques secondes que tous les équipements du réseau répondent : le check du matin, instantané.", points:["Les équipements testés en une commande","Résumé clair : joignables / hors ligne","Aucun logiciel à installer"] },
    },

    gal_eyebrow: "Dans les coulisses",
    gal_h2: "Notre *quotidien*, sans mise en scène.",
    gal_desc: "Développement, administration de serveurs, hébergement et planification : voici nos vrais postes de travail, pendant que nous construisons, déployons et maintenons les projets de nos clients.",
    gallery: [
      "KPIFlow en préparation de mise en production",
      "Administration du serveur Linux et déploiement continu de KPIFlow : sauvegarde, mise à jour et build Docker",
      "Déploiement d'une application conteneurisée avec Docker",
      "Pipeline ETL et requêtes SQL Server pour un client",
      "Développement d'un chargeur ETL Python vers SQL Server",
      "Hébergement de cocosecret.shop : SSL, CDN, protection et sauvegardes",
      "Planification du projet KPIFlow en tableau Kanban",
    ],

    why_eyebrow: "Votre partenaire tech",
    why_h2: "Pourquoi choisir *HellooTech ?*",
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
    cmp_h2: "Ce que nous faisons *différemment*",
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

    test_eyebrow: "Ils nous font confiance",
    test_h2: "Ce que disent *nos clients*",
    testimonials: [
      { quote:"Avec KPIFlow, nos départements ont abandonné les fichiers Excel. Les KPI sont saisis, calculés et validés au même endroit, et la direction suit les résultats en temps réel. Nous avons gagné en fiabilité et en temps à chaque clôture.", name:"Directeur des Systèmes d'Information", role:"Beetle Heritage Holding · Douala" },
      { quote:"Notre boutique en ligne a été livrée dans les délais avec toutes les fonctionnalités demandées. Dès le lancement, les commandes ont afflué. Une équipe réactive et à l'écoute.", name:"Développeur de Marché", role:"Commerce · cocosecret.shop" },
      { quote:"Notre équipe réseau dispose enfin d'une vue d'ensemble en temps réel. Les incidents sont détectés et traités bien plus rapidement qu'avant. Travail rigoureux, résultats concrets.", name:"Administrateur Réseau", role:"Beetle Heritage Holding · Douala" },
      { quote:"Le site a été livré rapidement avec tout ce qu'il fallait pour gérer nos soirées et nos réservations. Nos clients adorent l'expérience en ligne !", name:"Event Planner", role:"Événement · Coco Italia Beach" },
    ],

    faq_eyebrow: "FAQ",
    faq_h2: "Questions fréquemment posées par *nos clients*",
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

    cta_h2: "Prêt à structurer votre *croissance* numérique ?",
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

    mentor_eyebrow: "Notre écosystème",
    mentor_h2: "Un réseau d'experts, *un seul interlocuteur*",
    mentor_desc: "Pour certains besoins, nous nous appuyons sur des partenaires de confiance. Vous, vous ne traitez qu'avec HellooTech : nous coordonnons tout, du devis à la livraison.",
    mentor_single: "Un seul contrat, un seul contact, une seule facture : HellooTech reste responsable de votre projet de bout en bout.",
    mentor_story_t: "L'anecdote",
    mentor_story: "Derrière helloSEM et SEM Hosting, il y a un même dirigeant : Zayn Londji, notre mentor. C'est à ses côtés que HellooTech a appris l'exigence qui fait la différence : écouter le client, livrer du concret et mesurer les résultats.",
    mentor_with: "Ensemble",
    mentors: {
      hellosem:   { tag:"Partenaire référencement", desc:"Quand votre projet a besoin de visibilité, nous intégrons le référencement (SEO) et la publicité en ligne à notre offre.", with:"Inclus dans votre projet HellooTech, piloté par nous." },
      semhosting: { tag:"Partenaire infrastructure", desc:"Les sites que nous livrons sont hébergés sur des serveurs NVMe fiables, avec sauvegardes et support local.", with:"Hébergement, domaine et e-mails pro gérés par HellooTech." },
      zl:         { tag:"Mentor de l'équipe", desc:"Il accompagne HellooTech dans son développement et lui transmet son exigence : écouter, livrer du concret, mesurer les résultats.", with:"Notre guide d'expertise au quotidien." },
    },
    foot_motto: "NOUS CONCEVONS · DÉPLOYONS · TRANSFORMONS",

    about_eyebrow: "À propos",
    about_h2: "Notre *histoire*",
    about_p1: "HellooTech est née à Douala d'une conviction simple : les entreprises camerounaises méritent des outils numériques aussi solides que ceux des grands groupes, à un coût qui leur reste accessible.",
    about_p2: "Tout a commencé par des problèmes bien réels : des KPI suivis sur Excel, un réseau surveillé à la main, des rapports refaits chaque matin. Les outils construits pour les résoudre tournent aujourd'hui en production, tous les jours.",
    about_p3: "Notre façon de travailler n'a pas changé : comprendre votre métier avant d'écrire du code, livrer des solutions qui fonctionnent vraiment, et rester à vos côtés après la mise en ligne.",
    about_values: ["Écoute","Rigueur","Transparence","Proximité"],
    about_name: "Fongang Cabrel",
    about_role: "Fondateur · Full-Stack, Data & Infrastructure",
    about_badge: "Projets livrés",
    about_photo_alt: "Le fondateur de HellooTech à son poste de travail",

    tips_eyebrow: "Nos conseils",
    tips_h2: "Des *bonnes pratiques* simples pour votre entreprise",
    tips_desc: "Ce que nous recommandons à nos clients, avant même de parler de projet.",
    tips: [
      { title:"Sortez vos KPI d'Excel", desc:"Un fichier partagé n'a ni historique ni validation. Une plateforme centralisée évite les erreurs de version et les calculs faux." },
      { title:"Sauvegardez automatiquement", desc:"Une sauvegarde quotidienne, testée et stockée hors du serveur : c'est ce qui sépare un incident d'une catastrophe." },
      { title:"Acceptez le mobile money", desc:"Au Cameroun, une grande partie des paiements passe par le mobile. Proposer MTN MoMo et Orange Money augmente directement vos ventes." },
      { title:"Surveillez avant que ça casse", desc:"Un monitoring avec alertes détecte une panne en quelques secondes, avant que vos clients ne la remarquent." },
      { title:"Automatisez le répétitif", desc:"Un rapport refait chaque matin à la main peut tourner seul pendant la nuit. Vos équipes gagnent des heures chaque semaine." },
      { title:"Sécurisez les accès", desc:"Mots de passe uniques, double authentification et droits par rôle : beaucoup de fuites viennent d'accès mal gérés." },
    ],

    blog_eyebrow: "Blog",
    blog_h2: "Nos *derniers articles*",
    blog_desc: "Retours d'expérience et conseils concrets, tirés de nos projets.",
    blog_featured: "À la une",
    blog_read: "Lire l'article",
    blog_close: "Fermer",
    blog_by: "Par l'équipe HellooTech",
    blog_min: "min de lecture",
    posts: [
      { cat:"Transformation digitale", date:"18 nov. 2026", min:6, title:"Transformation digitale : par où commencer quand on est une PME ?", excerpt:"Pas besoin de tout changer d'un coup. Les entreprises qui réussissent commencent par un seul processus, celui qui coûte le plus cher au quotidien.",
        body:["La transformation digitale fait peur parce qu'on l'imagine comme un grand chantier. En réalité, les projets qui réussissent commencent petit : un seul processus, bien choisi, qui fait perdre du temps ou de l'argent chaque jour.","Première étape : cartographier. Qui fait quoi, avec quel outil, et où les informations se perdent-elles ? Cette cartographie révèle presque toujours une saisie en double, un fichier Excel central fragile ou une validation qui se fait par e-mail.","Deuxième étape : automatiser ce point précis, mesurer le gain, puis passer au suivant. C'est exactement ce que nous avons fait avec KPIFlow : on a commencé par le suivi des KPI d'un département, avant de l'étendre à toute l'entreprise.","Enfin, formez vos équipes. Un outil que personne n'utilise ne transforme rien. La documentation et l'accompagnement font partie du projet, pas d'un service en option."] },
      { cat:"Data", date:"4 nov. 2026", min:4, title:"KPI : pourquoi il est temps de quitter Excel", excerpt:"Versions multiples, formules cassées, aucune traçabilité : Excel atteint vite ses limites dès que plusieurs départements suivent leurs indicateurs.",
        body:["Excel est un excellent outil personnel, mais un mauvais système de suivi collectif. Dès que plusieurs personnes modifient le même fichier, les versions se multiplient et personne ne sait laquelle est la bonne.","Une plateforme dédiée apporte ce qu'Excel ne sait pas faire : des droits par rôle, un historique de chaque modification, des calculs verrouillés et une validation à plusieurs niveaux.","Résultat : la direction consulte des chiffres fiables en temps réel, au lieu d'attendre la consolidation de fin de mois."] },
      { cat:"E-commerce", date:"21 oct. 2026", min:5, title:"Mobile money : vendre en ligne au Cameroun", excerpt:"MTN MoMo, Orange Money, carte bancaire ou commande WhatsApp : comment proposer le bon moyen de paiement sans perdre de ventes.",
        body:["Une boutique en ligne qui n'accepte que la carte bancaire perd une grande partie de ses clients au Cameroun. Le mobile money est le réflexe de paiement de la majorité des acheteurs.","Des agrégateurs comme Notchpay ou Flutterwave permettent d'accepter MTN MoMo, Orange Money et la carte avec une seule intégration, et de confirmer chaque paiement en temps réel.","Sur cocosecret.shop, nous avons ajouté une option hybride : le client peut payer en ligne ou finaliser sa commande sur WhatsApp. Chacun choisit le parcours qui le rassure."] },
      { cat:"Infrastructure", date:"7 oct. 2026", min:5, title:"Docker et Grafana : garder ses serveurs sous contrôle", excerpt:"Conteneuriser ses applications et superviser ses serveurs, c'est savoir qu'il y a un problème avant que vos utilisateurs ne vous appellent.",
        body:["Docker isole chaque application dans un conteneur : les mises à jour deviennent reproductibles et un retour en arrière prend quelques secondes.","Grafana affiche en direct l'état des serveurs, des conteneurs, de la bande passante et du débit. Des alertes préviennent l'équipe dès qu'un seuil est dépassé.","Chez BEETLE, le serveur de KPIFlow et ses conteneurs sont supervisés ainsi. Chaque mise à jour passe par un script qui sauvegarde la base, récupère le code et reconstruit les conteneurs."] },
    ],
  },

  en: {
    nav: [["services","Services"],["projets","Projects"],["apropos","About"],["ressources","Resources"],["contact","Contact"]],
    resources: [["partenaires","Partners"],["blog","Blog"],["conseils","Tips"],["temoignages","Testimonials"],["faq","FAQ"]],
    foot_nav: [["methode","Method"],["projets","Projects"],["apropos","About"],["blog","Blog"],["conseils","Tips"],["faq","FAQ"],["contact","Contact"]],
    nav_promo_eyebrow: "Tech agency · Douala",
    nav_promo_text: "The agency helping Cameroonian businesses toward measurable digital growth.",
    nav_promo_link: "Why HellooTech?",
    theme_label: "Switch display mode",
    lang_label: "Language",
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
      "Meta's JavaScript library for composable and reactive interfaces. Used in BHHaccess.",
      "Typed superset of JavaScript that catches errors at compile time and makes large-scale code more reliable.",
      "Microsoft's enterprise-grade RDBMS. Built for high-volume transactional data and business intelligence.",
      "Advanced open-source RDBMS with JSON, powerful indexing and high availability — backbone of KPIFlow and critical apps.",
      "Ultra-fast in-memory key-value store for caching, sessions and real-time pub/sub — powering VYNTIX and SMARTY.",
      "Microsoft's Business Intelligence tool: turns raw data into interactive dashboards and visual reports.",
      "Microsoft's shell for system automation, network management and DevOps scripting — engine behind SCRIPX.",
      "Containerisation platform — environment isolation, reproducible deployments and simplified dependency management in production.",
      "Bidirectional real-time client-server communication protocol — engine of the live monitoring in VYNTIX.",
      "Python data analysis and manipulation library — essential for ETL pipelines, data cleaning and preparation before visualization.",
      "Monitoring platform: dashboards and alerts on servers, Docker containers, bandwidth and throughput.",
      "The operating system of our servers (Debian): administration, security, backups and deployments.",
      "Web server and reverse proxy: HTTPS, caching and traffic routing in front of our applications.",
      "Continuous integration and deployment: automatic tests, build and release on every update.",
      "Elegant PHP framework for robust web applications — used in HospiConnect.",
      "Server-side web language behind our online shops and ticketing sites.",
      "Popular relational database, reliable for e-commerce sites and web applications.",
      "Microsoft's collaboration suite: Teams, SharePoint, Outlook and OneDrive, set up and secured for your team.",
      "Power Apps, Power Automate, Power BI, Power Pages and AI Builder: apps, automations and reports built on your Microsoft tools.",
    ],
    clients_label: "They trust us",

    prob_eyebrow: "Your current challenges",
    prob_h2: "Your tools *slow your teams down* instead of helping them.",
    prob_p1: "KPIs tracked in Excel files, reports rebuilt by hand every morning, sales lost for lack of online payment, outages discovered by customers…",
    prob_p2: "This patchwork costs time, money and opportunities — and keeps your teams from focusing on their real job.",
    appr_eyebrow: "The HellooTech approach",
    appr_h2: "An information system that *works for you*.",
    appr_p1: "We always start with the same question: what decision should your tool make possible? We map your processes before writing a single line of code.",
    appr_p2: "Then we build a coherent whole — application, data, automation and servers — that we deploy, monitor and evolve with you.",
    appr_points: ["One direct contact, from the first call to production","Solutions already running in real companies","Training and documentation so you stay independent"],

    lev_eyebrow: "Our levers",
    lev_h2: "Concrete levers to *move your business* forward.",
    lev_desc: "Every obstacle is an opportunity. Here is how we turn your daily pain points into measurable advantages.",
    levers: [
      { title:"Replace your Excel files with a real platform.", desc:"A custom web application to track your indicators, validate at several levels and decide on reliable figures.", points:["Full cycle: definition, input, scoring, validation","Roles and permissions per department","History and traceability of every action"], proof:"Proof: KPIFlow, used company-wide at BEETLE HERITAGE HOLDING." },
      { title:"Automate what you keep doing by hand.", desc:"Data pipelines, scheduled jobs and Power Automate flows that work while your teams focus on what matters.", points:["Reports generated and sent automatically","Alerts as soon as a critical threshold is reached","Power BI dashboards for management"], proof:"Proof: a 3-hour daily report turned into a 5-minute automated job." },
      { title:"Sell online and get paid with mobile money.", desc:"Shops and ticketing sites that collect real payments — mobile money, bank card or direct ordering on WhatsApp.", points:["Notchpay, Flutterwave and Stripe built in","Real-time payment confirmation","Mobile-first checkout"], proof:"Proof: cocosecret.shop and Coco Italia Beach sell online every day." },
      { title:"Keep your systems online, 24/7.", desc:"Secured servers, automated deployments and continuous monitoring to catch an outage before your users do.", points:["Managed VPS and Linux servers","Docker-containerised apps with automatic deployment","Grafana monitoring: servers, containers, bandwidth and throughput"], proof:"Proof: at BEETLE, Grafana monitors the KPIFlow server, its Docker containers and bandwidth; VYNTIX watches the network in real time and alerts on outages; SCRIPX runs the daily check in seconds." },
    ],

    svc_eyebrow: "Our services",
    svc_h2: "Every skill your *digital transformation* needs",
    svc_desc: "One partner, from advice to server: we cover the whole chain so everything works together.",
    svc_mother: "The core concept",
    services: [
      { title:"Digital transformation",          desc:"The idea that ties everything together: we map your processes, then rebuild your information system around them." },
      { title:"Microsoft 365 & Power Platform",  desc:"Power Apps applications, Power Automate flows and Power BI reports on the tools your team already uses." },
      { title:"Full-stack web & PWA",            desc:"Fast, installable web applications, designed, built and maintained end to end." },
      { title:"DevOps & CI/CD",                  desc:"Automatic build, tests and deployment on every update, with no downtime." },
      { title:"DevSecOps",                       desc:"Security built into the pipeline: access control, secrets management, traceability, hardened servers." },
      { title:"Payment integration",             desc:"Mobile money and bank cards, with real-time webhook confirmation." },
      { title:"Cloud & VPS hosting",             desc:"We install, secure and manage your servers so your applications stay online. Web hosting with our partner SEM Hosting." },
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
    proc_h2: "A *clear* process, start to finish",
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
    proj_h2: "*Real* projects, delivered",
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
      vyntix:       { client:"Internal tool", tag:"IT infrastructure monitoring", desc:"Real-time network monitoring: a live dashboard of every device, alerts as soon as one goes down and a history of incidents.", points:["Automatic outage alerts","Incident reports, uptime and downtime","Live dashboard via WebSockets"] },
      smarty:       { client:"Product · Mobility", tag:"Ride-hailing platform", desc:"Web back-office and Android / iOS apps with real-time driver tracking. Born as a PWA, migrated to a native mobile app.", points:["React Native apps (Android & iOS)","Asynchronous FastAPI back-end","Real-time tracking with Redis"] },
      ssas:         { client:"Client project · Data", tag:"Stock alert system", desc:"An ETL pipeline consolidating stock data in SQL Server: critical items are detected and managers get their report every morning.", points:["Configurable alert thresholds","Nightly jobs with SQL Server Agent","Excel reports and Power BI dashboards"] },
      scripx:       { client:"BEETLE HERITAGE HOLDING", tag:"Daily network check", desc:"A PowerShell script that checks in seconds that every network device responds: the instant morning check.", points:["All devices tested in one command","Clear summary: reachable / offline","Nothing to install"] },
    },

    gal_eyebrow: "Behind the scenes",
    gal_h2: "Our *day-to-day*, unstaged.",
    gal_desc: "Development, server administration, hosting and planning: these are our real workstations, while we build, deploy and maintain our clients' projects.",
    gallery: [
      "KPIFlow being prepared for production",
      "Linux server administration and continuous deployment of KPIFlow: backup, update and Docker build",
      "Deploying a containerised application with Docker",
      "ETL pipeline and SQL Server queries for a client",
      "Building a Python ETL loader for SQL Server",
      "Hosting cocosecret.shop: SSL, CDN, protection and backups",
      "Planning the KPIFlow project on a Kanban board",
    ],

    why_eyebrow: "Your tech partner",
    why_h2: "Why choose *HellooTech?*",
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
    cmp_h2: "What we do *differently*",
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

    test_eyebrow: "Trusted by clients",
    test_h2: "What *our clients* say",
    testimonials: [
      { quote:"With KPIFlow, our departments left their Excel files behind. KPIs are entered, calculated and validated in one place, and management follows results in real time. We gained reliability and time at every closing.", name:"Director of Information Systems", role:"Beetle Heritage Holding · Douala" },
      { quote:"Our online store was delivered on time with every feature we asked for. Orders started coming in from day one. A responsive and attentive team.", name:"Market Developer", role:"Commerce · cocosecret.shop" },
      { quote:"Our network team finally has a real-time overview of everything. Incidents are detected and handled far faster than before. Rigorous work, concrete results.", name:"Network Administrator", role:"Beetle Heritage Holding · Douala" },
      { quote:"The website was delivered quickly with everything needed to manage our events and bookings. Our clients love the online experience!", name:"Event Planner", role:"Events · Coco Italia Beach" },
    ],

    faq_eyebrow: "FAQ",
    faq_h2: "Questions *our clients* often ask",
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

    cta_h2: "Ready to structure your digital *growth*?",
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

    mentor_eyebrow: "Our ecosystem",
    mentor_h2: "A network of experts, *one single contact*",
    mentor_desc: "For some needs we rely on trusted partners. You only ever deal with HellooTech: we coordinate everything, from quote to delivery.",
    mentor_single: "One contract, one contact, one invoice: HellooTech stays responsible for your project end to end.",
    mentor_story_t: "The story",
    mentor_story: "Behind helloSEM and SEM Hosting stands the same leader: Zayn Londji, our mentor. Working alongside him, HellooTech learned the standards that make the difference: listen to the client, deliver concrete results and measure them.",
    mentor_with: "Together",
    mentors: {
      hellosem:   { tag:"SEO partner", desc:"When your project needs visibility, we add search engine optimisation (SEO) and online advertising to our offer.", with:"Included in your HellooTech project, managed by us." },
      semhosting: { tag:"Infrastructure partner", desc:"The sites we deliver are hosted on reliable NVMe servers, with backups and local support.", with:"Hosting, domain and pro e-mail managed by HellooTech." },
      zl:         { tag:"Team mentor", desc:"He supports HellooTech's growth and passes on his standards: listen, deliver concrete results, measure them.", with:"Our day-to-day expertise guide." },
    },
    foot_motto: "WE DESIGN · DEPLOY · TRANSFORM",

    about_eyebrow: "About",
    about_h2: "Our *story*",
    about_p1: "HellooTech was born in Douala from a simple belief: Cameroonian businesses deserve digital tools as solid as those of large groups, at a cost they can afford.",
    about_p2: "It all started with very real problems: KPIs tracked in Excel, a network monitored by hand, reports rebuilt every morning. The tools built to solve them now run in production, every day.",
    about_p3: "Our way of working hasn't changed: understand your business before writing code, deliver solutions that actually work, and stay by your side after launch.",
    about_values: ["Listening","Rigour","Transparency","Proximity"],
    about_name: "Fongang Cabrel",
    about_role: "Founder · Full-Stack, Data & Infrastructure",
    about_badge: "Projects delivered",
    about_photo_alt: "The founder of HellooTech at his desk",

    tips_eyebrow: "Our tips",
    tips_h2: "Simple *best practices* for your business",
    tips_desc: "What we recommend to our clients, even before talking about a project.",
    tips: [
      { title:"Get your KPIs out of Excel", desc:"A shared file has no history and no validation. A central platform avoids version mix-ups and wrong calculations." },
      { title:"Back up automatically", desc:"A daily backup, tested and stored off the server: that's what separates an incident from a disaster." },
      { title:"Accept mobile money", desc:"In Cameroon, a large share of payments goes through mobile. Offering MTN MoMo and Orange Money directly increases your sales." },
      { title:"Monitor before it breaks", desc:"Monitoring with alerts detects an outage within seconds, before your customers notice it." },
      { title:"Automate the repetitive", desc:"A report rebuilt by hand every morning can run on its own overnight. Your teams save hours every week." },
      { title:"Secure your access", desc:"Unique passwords, two-factor authentication and role-based rights: many leaks come from poorly managed access." },
    ],

    blog_eyebrow: "Blog",
    blog_h2: "Our *latest articles*",
    blog_desc: "Lessons learned and practical advice, drawn from our projects.",
    blog_featured: "Featured",
    blog_read: "Read the article",
    blog_close: "Close",
    blog_by: "By the HellooTech team",
    blog_min: "min read",
    posts: [
      { cat:"Digital transformation", date:"Nov 18, 2026", min:6, title:"Digital transformation: where should an SME start?", excerpt:"No need to change everything at once. Successful companies start with a single process, the one that costs them the most every day.",
        body:["Digital transformation sounds scary because we picture it as a huge project. In reality, successful projects start small: a single, well-chosen process that wastes time or money every day.","Step one: map it. Who does what, with which tool, and where does information get lost? This mapping almost always reveals double entry, a fragile central Excel file or approvals done by e-mail.","Step two: automate that specific point, measure the gain, then move to the next one. That's exactly what we did with KPIFlow: we started with one department's KPI tracking before extending it company-wide.","Finally, train your teams. A tool nobody uses transforms nothing. Documentation and support are part of the project, not an optional extra."] },
      { cat:"Data", date:"Nov 4, 2026", min:4, title:"KPIs: why it's time to leave Excel", excerpt:"Multiple versions, broken formulas, no traceability: Excel quickly hits its limits once several departments track their indicators.",
        body:["Excel is a great personal tool but a poor shared tracking system. As soon as several people edit the same file, versions multiply and nobody knows which one is right.","A dedicated platform brings what Excel can't: role-based rights, a history of every change, locked calculations and multi-level validation.","The result: management reads reliable figures in real time, instead of waiting for the end-of-month consolidation."] },
      { cat:"E-commerce", date:"Oct 21, 2026", min:5, title:"Mobile money: selling online in Cameroon", excerpt:"MTN MoMo, Orange Money, bank card or WhatsApp ordering: how to offer the right payment method without losing sales.",
        body:["An online shop that only accepts bank cards loses a large share of its customers in Cameroon. Mobile money is the default payment habit of most buyers.","Aggregators such as Notchpay or Flutterwave accept MTN MoMo, Orange Money and cards through a single integration, and confirm every payment in real time.","On cocosecret.shop we added a hybrid option: customers can pay online or finish their order on WhatsApp. Everyone picks the path they trust."] },
      { cat:"Infrastructure", date:"Oct 7, 2026", min:5, title:"Docker and Grafana: keeping your servers under control", excerpt:"Containerising your apps and monitoring your servers means knowing about a problem before your users call you.",
        body:["Docker isolates each application in a container: updates become reproducible and rolling back takes seconds.","Grafana shows the live state of servers, containers, bandwidth and throughput. Alerts warn the team as soon as a threshold is crossed.","At BEETLE, the KPIFlow server and its containers are monitored this way. Every update goes through a script that backs up the database, pulls the code and rebuilds the containers."] },
    ],
  },
};

/* ============================ CSS ============================ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
.h-root{${THEME_VARS.light}}
.h-root.dark{${THEME_VARS.dark}color-scheme:dark;}
.h-root{font-family:'Inter',sans-serif;background:${WHITE};transition:background .3s ease,color .3s ease;color:${BODY};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
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
.filt.on{background:${INK};border-color:${INK};color:${WHITE};}

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
.modal-box{background:${WHITE};border-radius:20px;padding:36px 32px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;animation:rise .25s both ease;box-shadow:0 32px 80px rgba(11,18,32,.22);}
.f-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
.f-label{font-family:'Sora',sans-serif;font-size:13px;font-weight:600;color:${INK};}
.f-inp{font-family:'Inter',sans-serif;font-size:14px;padding:11px 14px;border-radius:10px;border:1.5px solid ${BORDER};color:${INK};outline:none;transition:border-color .2s;background:${WHITE};width:100%;box-sizing:border-box;}
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
.gal-card{position:relative;border-radius:18px;overflow:hidden;background:${NAVY};height:100%;}
.gal-wide{grid-column:span 2;}
.gal-card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;}
.gal-card:hover img{transform:scale(1.05);}

/* Mots surlignés (trait dessiné à la main) */
.mark{position:relative;display:inline-block;white-space:nowrap;z-index:0;}
.mark svg{position:absolute;left:-3%;bottom:-.24em;width:106%;height:.44em;overflow:visible;z-index:-1;pointer-events:none;}
.mark path{fill:none;stroke-linecap:round;stroke-dasharray:260;stroke-dashoffset:260;transition:stroke-dashoffset 1.1s cubic-bezier(.65,0,.35,1) .2s;}
.mark path+path{transition-delay:.6s;}
.mark.in path{stroke-dashoffset:0;}

/* Apparition au défilement */
.reveal{opacity:0;transform:translateY(26px);transition:opacity .75s ease,transform .75s cubic-bezier(.2,.7,.2,1);}
.reveal.zoom{transform:scale(.94);}
.reveal.in{opacity:1;transform:none;}

/* Illustrations qui flottent doucement */
@keyframes drift{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-10px) rotate(-.5deg)}}
/* (les illustrations SVG sont animées de l'intérieur : personnages, graphiques, objets) */

/* Logos des outils */
.tech-logo{width:22px;height:22px;object-fit:contain;background:#fff;border-radius:6px;padding:2px;flex-shrink:0;}

/* Partenaires */
.mq-slow{animation-duration:38s;gap:56px;}
.partner{display:inline-flex;align-items:center;gap:11px;height:66px;padding:0 18px;border-radius:14px;background:#fff;border:1px solid #E6EDF5;white-space:nowrap;filter:grayscale(1);opacity:.7;transition:all .3s ease;}
.partner:hover{filter:none;opacity:1;transform:translateY(-2px);box-shadow:0 10px 26px rgba(11,18,32,.08);}
.partner img{display:block;width:auto;object-fit:contain;}
.h-root.dark .partner{opacity:.9;border-color:transparent;}

/* Boutons de la barre de navigation */
.icon-btn{width:36px;height:36px;border-radius:10px;border:1px solid ${BORDER};background:${SURFACE};color:${INK};display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;}
.icon-btn:hover{border-color:${SKY};color:${SKY};}
.flag{width:18px;height:18px;border-radius:50%;overflow:hidden;display:inline-flex;flex-shrink:0;box-shadow:0 0 0 1px rgba(11,18,32,.12);}
.drop{background:${WHITE};border:1px solid ${BORDER};border-radius:16px;box-shadow:0 24px 60px rgba(11,18,32,.14);padding:14px;}
.drop-item{display:flex;align-items:center;gap:10px;width:100%;padding:9px 10px;border-radius:10px;border:none;background:none;cursor:pointer;text-align:left;transition:background .15s;font-family:'Sora',sans-serif;font-size:13px;font-weight:500;color:${INK};}
.drop-item:hover{background:${SKY_50};color:${SKY_D};}

/* Projets : zoom des captures */
.p-img{transition:transform .6s cubic-bezier(.2,.7,.2,1);}
.p-card:hover .p-img{transform:scale(1.06);}

/* Témoignages */
@keyframes tin{from{opacity:0;transform:translateX(26px)}to{opacity:1;transform:none}}
.t-slide{animation:tin .6s both ease;}
.t-grid{display:grid;grid-template-columns:auto 1fr;gap:36px;align-items:center;}
.t-avatar{width:150px;height:150px;border-radius:50%;background:linear-gradient(135deg,${SKY_L},${SKY_D});display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:700;font-size:40px;color:#fff;box-shadow:0 0 0 10px rgba(56,189,248,.14),0 0 0 22px rgba(56,189,248,.06);}
.t-nav{width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.06);color:#fff;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;}
.t-nav:hover{background:${SKY};border-color:${SKY};}

/* Conseils et blog */
.tip{background:${WHITE};border:1px solid ${BORDER};border-radius:16px;padding:22px;transition:all .28s ease;height:100%;}
.tip:hover{border-color:${SKY_L};transform:translateY(-4px);box-shadow:0 16px 40px rgba(11,18,32,.07);}
.b-card{background:${WHITE};border:1px solid ${BORDER};border-radius:18px;overflow:hidden;display:flex;flex-direction:column;cursor:pointer;transition:all .28s ease;text-align:left;width:100%;padding:0;font:inherit;color:inherit;}
.b-card:hover{border-color:${SKY_L};transform:translateY(-5px);box-shadow:0 18px 44px rgba(11,18,32,.08);}
.b-cover{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;}
.b-cover img{width:78%;height:auto;transition:transform .6s cubic-bezier(.2,.7,.2,1);}
.b-card:hover .b-cover img{transform:scale(1.07) rotate(-1deg);}
.b-badge{position:absolute;top:14px;left:14px;background:${SKY};color:#fff;font-size:11px;font-weight:600;padding:4px 11px;border-radius:999px;font-family:'Sora',sans-serif;}

/* À propos */
.about-photo{position:relative;border-radius:28px;overflow:hidden;aspect-ratio:4/5;box-shadow:0 30px 70px rgba(11,18,32,.18);}
.about-photo img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s ease;}
.about-photo:hover img{transform:scale(1.04);}

@media (prefers-reduced-motion: reduce){
  .floaty,.mq,.rise,.live-dot,.illu,.t-slide{animation:none!important;}
  .reveal{opacity:1;transform:none;transition:none;}
  .mark path{stroke-dashoffset:0;transition:none;}
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
  .blog-feat{grid-template-columns:1fr !important;}
  .bg3{grid-template-columns:1fr 1fr !important;}
  .cta-illu{display:none !important;}
}
@media(max-width:640px){
  .sg,.pg,.galg,.bg3,.tipg{grid-template-columns:1fr !important;}
  .galg{grid-auto-rows:260px !important;}
  .gal-wide{grid-column:auto;}
  .t-grid{grid-template-columns:1fr;text-align:center;gap:24px;}
  .t-avatar{width:96px;height:96px;font-size:28px;margin:0 auto;}
  .mark{white-space:normal;}
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
  const t = hl(title, light ? SKY_L : SKY);
  return (
    <div style={{ textAlign: align, marginBottom: mb, maxWidth: align === "center" ? 720 : "none", marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>
      <span className="eyebrow" style={light ? { color: SKY_L } : undefined}>{eyebrow}</span>
      <h2 className="sec-h2" style={{ margin: "14px 0 14px", color: light ? "#fff" : INK }}>{t}</h2>
      {desc && <p style={{ color: light ? "rgba(255,255,255,.65)" : BODY, fontSize: "1rem", lineHeight: 1.7 }}>{desc}</p>}
    </div>
  );
}

function Illu({ name, alt = "", style }) {
  return <img className="illu" src={`/illustrations/${name}.svg`} alt={alt} loading="lazy" width="560" height="560" style={style} />;
}

/* Mot surligné d'un trait dessiné, animé quand il apparaît à l'écran */
function Mark({ children, color = SKY }) {
  return (
    <span className="mark">
      {children}
      <svg viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true">
        <path d="M3 10 C 45 4, 120 3, 197 8" stroke={color} strokeWidth="5" />
        <path d="M16 14 C 70 9, 140 9, 188 12" stroke={color} strokeWidth="2.5" opacity=".65" />
      </svg>
    </span>
  );
}

/* "Texte avec *mots surlignés*" → éléments React */
function hl(text, color) {
  if (!text || !text.includes("*")) return text;
  return text.split(/\*(.+?)\*/g).map((part, i) => (i % 2 ? <Mark key={i} color={color}>{part}</Mark> : part));
}

function Flag({ code }) {
  return (
    <span className="flag" aria-hidden="true">
      {code === "fr" ? (
        <svg width="18" height="18" viewBox="0 0 30 30">
          <rect width="10" height="30" fill="#0055A4" /><rect x="10" width="10" height="30" fill="#fff" /><rect x="20" width="10" height="30" fill="#EF4135" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 60 60">
          <rect width="60" height="60" fill="#012169" />
          <path d="M0 0L60 60M60 0L0 60" stroke="#fff" strokeWidth="12" />
          <path d="M0 0L60 60M60 0L0 60" stroke="#C8102E" strokeWidth="5" />
          <path d="M30 0V60M0 30H60" stroke="#fff" strokeWidth="18" />
          <path d="M30 0V60M0 30H60" stroke="#C8102E" strokeWidth="10" />
        </svg>
      )}
    </span>
  );
}

const initials = (name) => name.split(/\s+/).map(w => w.replace(/^[dl]['’]/i, "")).filter(w => /^[A-ZÀ-Ý]/.test(w)).map(w => w[0]).join("").slice(0, 3);


/* ============================ APP ============================ */
export default function HellooTech() {
  const [lang, setLang]         = useState("fr");
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu]         = useState(false);
  const [svcOpen, setSvcOpen]   = useState(false);
  const [resOpen, setResOpen]   = useState(false);
  const [post, setPost]         = useState(null);
  const [theme, setTheme]       = useState(() => {
    try { const t = localStorage.getItem("ht-theme"); if (t === "dark" || t === "light") return t; } catch { /* stockage indisponible */ }
    return "light";
  });
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

  useEffect(() => {
    try { localStorage.setItem("ht-theme", theme); } catch { /* stockage indisponible */ }
    document.body.style.background = theme === "dark" ? "#0A1324" : "#FFFFFF";
  }, [theme]);

  // Apparition des blocs et tracé des surlignages quand ils entrent à l'écran
  useEffect(() => {
    const els = document.querySelectorAll(".h-root .reveal:not(.in), .h-root .mark:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const ob = new IntersectionObserver((entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); ob.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(e => ob.observe(e));
    return () => ob.disconnect();
  }, [lang, filter, theme, tIdx]);

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
    if (!showForm && post === null) return;
    const onKey = (e) => { if (e.key === "Escape") { closeForm(); setPost(null); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showForm, post]);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenu(false); setSvcOpen(false); setResOpen(false); };
  const ThemeIcon = theme === "dark" ? Sun : Moon;
  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));
  const t0 = tr.testimonials[tIdx];
  const tStep = (d) => setTIdx(i => (i + d + tr.testimonials.length) % tr.testimonials.length);
  const shown = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

  return (
    <div className={`h-root${theme === "dark" ? " dark" : ""}`}>
      <style>{CSS}</style>

      <div style={{position:"fixed",top:0,left:0,height:3,width:`${progress}%`,background:SKY,zIndex:200,transition:"width .1s"}}/>

      {/* ───── NAVBAR ───── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:scrolled?"var(--nav)":"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:`1px solid ${scrolled?BORDER:"transparent"}`,transition:"all .3s ease"}}>
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
                      <div className="drop" style={{width:760,display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:14}}>
                       <div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                          {SERVICES.slice(0,8).map((s,i)=>{
                            const Icon = s.icon;
                            return (
                              <button key={i} onClick={()=>go("services")} className="drop-item">
                                <Icon size={16} color={SKY_D} style={{flexShrink:0}}/>
                                <span style={{lineHeight:1.3}}>{tr.services[i].title}</span>
                              </button>
                            );
                          })}
                        </div>
                        <button onClick={()=>go("services")} className="nlink" style={{display:"flex",alignItems:"center",gap:6,marginTop:8,padding:"8px 10px",fontSize:12.5,color:SKY_D}}>
                          {tr.nav_all_services} <ArrowRight size={14}/>
                        </button>
                       </div>
                        <div style={{background:`linear-gradient(135deg,${SKY} 0%,${SKY_D} 100%)`,borderRadius:12,padding:20,display:"flex",flexDirection:"column",gap:12}}>
                          <span className="eyebrow" style={{color:"rgba(255,255,255,.85)"}}>{tr.nav_promo_eyebrow}</span>
                          <p style={{fontFamily:"Sora",fontSize:15,lineHeight:1.5,color:"#fff",fontWeight:500}}>{tr.nav_promo_text}</p>
                          <img src="/illustrations/approche.svg" alt="" style={{width:"72%",alignSelf:"flex-end",background:"rgba(255,255,255,.94)",borderRadius:12}}/>
                          <button onClick={()=>go("pourquoi")} style={{display:"inline-flex",alignItems:"center",gap:6,background:"none",border:"none",borderBottom:"1.5px solid rgba(255,255,255,.7)",color:"#fff",fontFamily:"Sora",fontWeight:600,fontSize:12.5,letterSpacing:".04em",cursor:"pointer",padding:"0 0 3px",alignSelf:"flex-start"}}>
                            {tr.nav_promo_link} <ArrowUpRight size={14}/>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : id==="ressources" ? (
                <div key={id} style={{position:"relative"}} onMouseEnter={()=>setResOpen(true)} onMouseLeave={()=>setResOpen(false)}>
                  <button className="nlink" aria-expanded={resOpen} style={{display:"flex",alignItems:"center",gap:4}} onClick={()=>setResOpen(o=>!o)}>
                    {l} <ChevronDown size={14} style={{transform:resOpen?"rotate(180deg)":"none",transition:"transform .2s"}}/>
                  </button>
                  {resOpen && (
                    <div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",paddingTop:14}}>
                      <div className="drop" style={{width:220}}>
                        {tr.resources.map(([rid,rl])=> <button key={rid} className="drop-item" onClick={()=>go(rid)}>{rl}</button>)}
                      </div>
                    </div>
                  )}
                </div>
              ) : <button key={id} className="nlink" onClick={()=>go(id)}>{l}</button>
            ))}

            <div role="group" aria-label={tr.lang_label} style={{display:"flex",gap:2,background:SURFACE,borderRadius:10,padding:3,border:`1px solid ${BORDER}`}}>
              {LANGS.map(l => (
                <button key={l} className="lang-btn" aria-pressed={lang===l} onClick={()=>changeLang(l)}
                  style={{display:"inline-flex",alignItems:"center",gap:6,background:lang===l?SKY:"none",color:lang===l?"#fff":MUTED,padding:"5px 9px"}}>
                  <Flag code={l}/> {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="icon-btn" onClick={toggleTheme} aria-label={tr.theme_label} title={tr.theme_label}><ThemeIcon size={17}/></button>

            <button onClick={()=>setShowForm(true)} className="btn-p" style={{padding:"10px 20px",fontSize:13}}>{tr.nav_cta}</button>
          </div>

          <button className="nm" aria-label="Menu" aria-expanded={menu} onClick={()=>setMenu(!menu)} style={{display:"none",background:"none",border:"none",color:INK,cursor:"pointer",padding:4}}>
            {menu ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
        {menu && (
          <div style={{background:WHITE,borderBottom:`1px solid ${BORDER}`,padding:"18px 24px",display:"flex",flexDirection:"column",gap:16}}>
            {tr.nav.flatMap(([id,l])=> id==="ressources" ? tr.resources : [[id,l]]).map(([id,l])=> <button key={id} className="nlink" onClick={()=>go(id)} style={{fontSize:16,textAlign:"left"}}>{l}</button>)}
            <div style={{display:"flex",gap:6}}>
              {LANGS.map(l => (
                <button key={l} className="lang-btn" aria-pressed={lang===l} onClick={()=>changeLang(l)}
                  style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:7,background:lang===l?SKY:SURFACE,color:lang===l?"#fff":BODY,border:`1px solid ${lang===l?SKY:BORDER}`,flex:1,padding:"8px"}}>
                  <Flag code={l}/> {l.toUpperCase()}
                </button>
              ))}
              <button className="icon-btn" onClick={toggleTheme} aria-label={tr.theme_label} style={{width:44,height:"auto"}}><ThemeIcon size={17}/></button>
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
              {tr.hero_h1a}<span style={{color:SKY}}><Mark>{tr.hero_h1b}</Mark></span>{tr.hero_h1c}
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
                <div style={{background:NAVY,borderRadius:"14px 14px 4px 4px",padding:"2.2% 2.2% 2.6%",boxShadow:"0 30px 70px rgba(11,18,32,.18)"}}>
                  <div style={{aspectRatio:"16/10",borderRadius:4,overflow:"hidden",background:WHITE}}>
                    <img src="/mockup/desktop.webp" alt={tr.mock_desktop_alt} fetchpriority="high"
                      style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",display:"block"}}/>
                  </div>
                </div>
                <div style={{position:"relative",height:14,margin:"0 -6%",background:"linear-gradient(180deg,#E2E8F0,#CBD5E1)",borderRadius:"0 0 14px 14px",boxShadow:"0 14px 30px rgba(11,18,32,.12)"}}>
                  <div style={{position:"absolute",left:"50%",top:0,transform:"translateX(-50%)",width:"16%",height:5,background:"#94A3B8",borderRadius:"0 0 6px 6px",opacity:.6}}/>
                </div>
              </div>
              <div style={{position:"absolute",right:0,bottom:0,width:"27%",zIndex:2,background:NAVY,borderRadius:26,padding:6,boxShadow:"0 24px 50px rgba(11,18,32,.25)"}}>
                <div style={{position:"relative",aspectRatio:"390/844",borderRadius:20,overflow:"hidden",background:WHITE}}>
                  <img src="/mockup/mobile.webp" alt={tr.mock_mobile_alt} loading="lazy"
                    style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",display:"block"}}/>
                  <div style={{position:"absolute",top:6,left:"50%",transform:"translateX(-50%)",width:"34%",height:12,background:NAVY,borderRadius:999}}/>
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
                  <img className="tech-logo" src={`/tech/${TECH_LOGOS[idx]}`} alt="" width="22" height="22" loading="lazy"/>
                  <span style={{fontFamily:"Sora",fontWeight:600,fontSize:14,color:active?col:BODY,transition:"color .2s"}}>{name}</span>
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
        <div style={{background:SURFACE,borderTop:`1px solid ${BORDER}`,padding:"24px 0 26px"}}>
          <p className="eyebrow" style={{textAlign:"center",color:MUTED,marginBottom:18}}>{tr.clients_label}</p>
          <div style={{overflow:"hidden",maskImage:"linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)",WebkitMaskImage:"linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)"}}>
            <div className="mq mq-slow">
              {[...PARTNERS,...PARTNERS,...PARTNERS,...PARTNERS,...PARTNERS,...PARTNERS].map((p,i)=>(
                <div key={i} className="partner" aria-hidden={i>=PARTNERS.length} style={p.bg?{background:p.bg}:undefined}>
                  <img src={`/partners/${p.logo}`} alt={i<PARTNERS.length?p.name:""} loading="lazy" style={{height:p.h,borderRadius:p.round?"50%":0}}/>
                  {p.label && <span style={{fontFamily:"Sora",fontWeight:700,fontSize:14.5,color:NAVY,letterSpacing:".02em"}}>{p.name}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── PROBLÈME → APPROCHE ───── */}
      <section style={{padding:"96px 24px",background:WHITE}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",flexDirection:"column",gap:72}}>
          <div className="lev-row">
            <div className="lev-img reveal zoom"><Illu name="probleme"/></div>
            <div>
              <span className="eyebrow" style={{color:RED}}>{tr.prob_eyebrow}</span>
              <h2 className="sec-h2" style={{margin:"14px 0 20px"}}>{hl(tr.prob_h2, RED)}</h2>
              <p style={{fontSize:"1rem",lineHeight:1.8,marginBottom:14}}>{tr.prob_p1}</p>
              <p style={{fontSize:"1rem",lineHeight:1.8,fontWeight:500,color:INK}}>{tr.prob_p2}</p>
            </div>
          </div>
          <div className="lev-row rev">
            <div className="lev-img reveal zoom"><Illu name="approche"/></div>
            <div>
              <span className="eyebrow">{tr.appr_eyebrow}</span>
              <h2 className="sec-h2" style={{margin:"14px 0 20px"}}>{hl(tr.appr_h2)}</h2>
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
                <div className="lev-img reveal zoom"><Illu name={LEVER_IMGS[i]}/></div>
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
      <section id="methode" style={{padding:"96px 24px",background:NAVY,color:"#fff"}}>
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
            <h2 className="sec-h2" style={{marginTop:14}}>{tr.res_h2a}<br/><span style={{color:SKY}}><Mark>{tr.res_h2b}</Mark></span></h2>
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
                  <div style={{height:190,position:"relative",background:NAVY,overflow:"hidden"}}>
                    <img className="p-img" src={p.img} alt={p.name} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",display:"block"}}/>
                    {p.logo && (
                      <img src={p.logo} alt={`Logo ${p.name}`} loading="lazy"
                        style={{position:"absolute",left:12,bottom:12,width:52,height:52,objectFit:"contain",background:WHITE,borderRadius:13,padding:4,boxShadow:"0 8px 20px rgba(11,18,32,.25)"}}/>
                    )}
                    <div style={{position:"absolute",top:12,left:12,right:12,display:"flex",justifyContent:"space-between",gap:8}}>
                      {p.status ? <span style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.95)",borderRadius:999,padding:"4px 10px",fontSize:11,fontWeight:600,color:NAVY}}>
                        <span className={p.status==="prod"||p.status==="live"?"live-dot":""} style={{width:7,height:7,borderRadius:"50%",background:STATUS_COLORS[p.status],display:"inline-block"}}/>
                        {tr.status[p.status]}
                      </span> : <span/>}
                      {p.featured && <span style={{background:NAVY,color:"#fff",borderRadius:999,padding:"4px 10px",fontSize:11,fontWeight:600}}>★ {tr.featured}</span>}
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
          <div className="galg" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gridAutoRows:300,gridAutoFlow:"dense",gap:16}}>
            {GALLERY.map((g,i)=>(
              <figure key={g.src} className={`gal-card reveal zoom${g.wide?" gal-wide":""}`} style={{transitionDelay:`${(i%4)*0.08}s`}}>
                <img src={g.src} alt={tr.gallery[i]} loading="lazy"/>
                <figcaption style={{position:"absolute",left:0,right:0,bottom:0,padding:"40px 18px 16px",background:"linear-gradient(180deg,transparent,rgba(11,18,32,.85))",color:"#fff",fontSize:13.5,fontWeight:500,lineHeight:1.5}}>
                  {tr.gallery[i]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───── À PROPOS ───── */}
      <section id="apropos" style={{padding:"96px 24px",background:WHITE,overflow:"hidden"}}>
        <div className="two-col" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:72,alignItems:"center"}}>
          <div className="reveal">
            <span className="eyebrow">{tr.about_eyebrow}</span>
            <h2 className="sec-h2" style={{margin:"14px 0 22px"}}>{hl(tr.about_h2)}</h2>
            <p style={{fontSize:"1rem",lineHeight:1.8,marginBottom:16}}>{tr.about_p1}</p>
            <p style={{fontSize:"1rem",lineHeight:1.8,marginBottom:16}}>{tr.about_p2}</p>
            <p style={{fontSize:"1rem",lineHeight:1.8,marginBottom:26,color:INK,fontWeight:500}}>{tr.about_p3}</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {tr.about_values.map(v=>(
                <span key={v} style={{display:"inline-flex",alignItems:"center",gap:7,padding:"8px 14px",borderRadius:999,background:SKY_50,border:`1px solid ${SKY_100}`,fontFamily:"Sora",fontSize:13,fontWeight:600,color:SKY_D}}>
                  <CheckCircle2 size={15}/> {v}
                </span>
              ))}
            </div>
          </div>
          <div className="reveal zoom" style={{position:"relative",maxWidth:460,justifySelf:"center",width:"100%"}}>
            <div aria-hidden="true" style={{position:"absolute",inset:"-18px -18px auto auto",width:"70%",height:"70%",borderRadius:28,background:`linear-gradient(135deg,${SKY_L},${SKY_D})`,opacity:.9,transform:"rotate(4deg)"}}/>
            <div className="about-photo">
              <img src="/about/fondateur.webp" alt={tr.about_photo_alt} loading="lazy"/>
            </div>
            <div className="floaty" style={{position:"absolute",top:28,left:-26,background:WHITE,border:`1px solid ${BORDER}`,borderRadius:16,padding:"12px 16px",boxShadow:"0 18px 40px rgba(11,18,32,.14)",textAlign:"center"}}>
              <div style={{fontFamily:"Sora",fontSize:"1.7rem",fontWeight:700,color:SKY,lineHeight:1}}>10</div>
              <div style={{fontSize:11.5,color:BODY,marginTop:4}}>{tr.about_badge}</div>
            </div>
            <div style={{position:"absolute",left:18,right:18,bottom:18,background:"rgba(255,255,255,.94)",backdropFilter:"blur(8px)",borderRadius:16,padding:"14px 18px",boxShadow:"0 14px 34px rgba(11,18,32,.16)"}}>
              <div style={{fontFamily:"Sora",fontWeight:700,fontSize:15,color:NAVY}}>{tr.about_name}</div>
              <div style={{fontSize:12.5,color:"#475569",marginTop:3}}>{tr.about_role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── PARTENAIRES PHARES ───── */}
      <section id="partenaires" style={{padding:"96px 24px",background:`linear-gradient(180deg,${SKY_50} 0%,${WHITE} 100%)`}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SectionHead eyebrow={tr.mentor_eyebrow} title={tr.mentor_h2} desc={tr.mentor_desc} mb={36}/>
          <div className="reveal" style={{maxWidth:860,margin:"0 auto 44px",display:"flex",gap:16,alignItems:"flex-start",background:WHITE,border:`1px solid ${SKY_100}`,borderLeft:`4px solid ${SKY}`,borderRadius:16,padding:"20px 24px",boxShadow:"0 14px 40px rgba(14,165,233,.08)"}}>
            <Quote size={28} color={SKY} fill={SKY} style={{flexShrink:0,opacity:.5,marginTop:2}} aria-hidden="true"/>
            <div>
              <div className="eyebrow" style={{marginBottom:6}}>{tr.mentor_story_t}</div>
              <p style={{fontSize:"1rem",lineHeight:1.75,color:INK}}>{tr.mentor_story}</p>
            </div>
          </div>
          <div className="pg" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {MENTORS.map((m,i)=>{
              const t = tr.mentors[m.id];
              return (
                <div key={m.id} className="p-card reveal" style={{transitionDelay:`${i*0.1}s`}}>
                  <div style={{height:150,background:m.bg,display:"flex",alignItems:"center",justifyContent:"center",borderBottom:`1px solid ${BORDER}`,overflow:"hidden"}}>
                    <img className="p-img" src={`/partners/${m.logo}`} alt={m.name} loading="lazy" style={{maxWidth:"72%",maxHeight:m.id==="zl"?84:56,objectFit:"contain"}}/>
                  </div>
                  <div style={{padding:22,display:"flex",flexDirection:"column",gap:10,flex:1}}>
                    <span className="chip" style={{alignSelf:"flex-start"}}>{t.tag}</span>
                    <h3 style={{fontSize:"1.2rem",fontWeight:700}}>{m.name}</h3>
                    <p style={{fontSize:".9rem",lineHeight:1.65}}>{t.desc}</p>
                    <div style={{display:"flex",gap:8,fontSize:13,color:INK,background:SURFACE,border:`1px solid ${BORDER}`,borderRadius:10,padding:"10px 12px"}}>
                      <CheckCircle2 size={16} color={SKY} style={{flexShrink:0,marginTop:1}}/>
                      <span><strong style={{fontFamily:"Sora"}}>{tr.mentor_with} :</strong> {t.with}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="reveal" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginTop:28,flexWrap:"wrap",textAlign:"center"}}>
            <ShieldCheck size={20} color={SKY_D} style={{flexShrink:0}}/>
            <span style={{fontFamily:"Sora",fontWeight:600,fontSize:14.5,color:INK}}>{tr.mentor_single}</span>
            <button onClick={()=>setShowForm(true)} className="btn-p" style={{padding:"10px 20px",fontSize:13}}>{tr.nav_cta} <ArrowRight size={15}/></button>
          </div>
        </div>
      </section>

      {/* ───── POURQUOI NOUS + DIFFÉRENCES ───── */}
      <section id="pourquoi" style={{padding:"96px 24px",background:SURFACE}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="two-col" style={{display:"grid",gridTemplateColumns:".95fr 1.05fr",gap:56,alignItems:"center",marginBottom:88}}>
            <div>
              <span className="eyebrow">{tr.why_eyebrow}</span>
              <h2 className="sec-h2" style={{margin:"14px 0 20px"}}>{hl(tr.why_h2)}</h2>
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
            <div className="cmp-head cmp-row" style={{display:"grid",gridTemplateColumns:"1fr 1fr",background:NAVY}}>
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


      {/* ───── TÉMOIGNAGES ───── */}
      <section id="temoignages" style={{padding:"96px 24px",background:`radial-gradient(circle at 12% 18%,rgba(14,165,233,.22),transparent 42%),radial-gradient(circle at 88% 90%,rgba(56,189,248,.12),transparent 40%),${NAVY}`,overflow:"hidden"}}>
        <div className="two-col" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:".8fr 1.2fr",gap:64,alignItems:"center"}}>
          <div>
            <span className="eyebrow" style={{color:SKY_L}}>{tr.test_eyebrow}</span>
            <h2 className="sec-h2" style={{margin:"14px 0 26px",color:"#fff"}}>{hl(tr.test_h2, SKY_L)}</h2>
            <div className="faq-illu" style={{background:"rgba(255,255,255,.96)",borderRadius:24,padding:12}}><Illu name="temoignages"/></div>
          </div>
          <div>
            <div key={tIdx} aria-live="polite" className="t-grid t-slide">
              <div className="t-avatar" aria-hidden="true">{initials(t0.name)}</div>
              <div>
                <Quote size={42} color={SKY_L} fill={SKY_L} style={{opacity:.45,marginBottom:14}} aria-hidden="true"/>
                <p style={{fontFamily:"Sora",fontSize:"1.28rem",lineHeight:1.6,color:"#fff",fontWeight:500,marginBottom:22}}>{t0.quote}</p>
                <div style={{display:"flex",gap:3,marginBottom:12}} className="t-stars" aria-hidden="true">{[1,2,3,4,5].map(i=><Star key={i} size={16} fill={AMBER} color={AMBER}/>)}</div>
                <div style={{fontFamily:"Sora",fontWeight:700,fontSize:13.5,letterSpacing:".08em",textTransform:"uppercase",color:"#fff"}}>{t0.name}</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginTop:4}}>{t0.role}</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:14,marginTop:36}}>
              <button className="t-nav" onClick={()=>tStep(-1)} aria-label="←"><ChevronLeft size={18}/></button>
              <div style={{display:"flex",gap:8}}>
                {tr.testimonials.map((_,i)=>(
                  <button key={i} aria-label={`${i+1}`} aria-current={i===tIdx} onClick={()=>setTIdx(i)} style={{width:i===tIdx?28:8,height:8,borderRadius:999,border:"none",background:i===tIdx?SKY_L:"rgba(255,255,255,.25)",cursor:"pointer",transition:"all .3s",padding:0}}/>
                ))}
              </div>
              <button className="t-nav" onClick={()=>tStep(1)} aria-label="→"><ChevronRight size={18}/></button>
            </div>
          </div>
        </div>
      </section>

      {/* ───── CONSEILS ───── */}
      <section id="conseils" style={{padding:"96px 24px",background:WHITE}}>
        <div className="two-col" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:".8fr 1.2fr",gap:56,alignItems:"center"}}>
          <div>
            <SectionHead eyebrow={tr.tips_eyebrow} title={tr.tips_h2} desc={tr.tips_desc} align="left" mb={24}/>
            <div className="faq-illu reveal zoom"><Illu name="conseils"/></div>
          </div>
          <div className="tipg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {tr.tips.map((t,i)=>{
              const Icon = TIP_ICONS[i];
              return (
                <div key={i} className="tip reveal" style={{transitionDelay:`${(i%2)*0.1}s`}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                    <div style={{width:44,height:44,borderRadius:12,background:SKY_50,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={20} color={SKY_D}/></div>
                    <span style={{fontFamily:"JetBrains Mono",fontSize:12,color:MUTED}}>0{i+1}</span>
                  </div>
                  <h3 style={{fontSize:"1rem",fontWeight:600,marginBottom:8}}>{t.title}</h3>
                  <p style={{fontSize:".88rem",lineHeight:1.65}}>{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── BLOG ───── */}
      <section id="blog" style={{padding:"96px 24px",background:SURFACE}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="two-col" style={{display:"grid",gridTemplateColumns:"1.4fr .6fr",gap:40,alignItems:"center",marginBottom:40}}>
            <SectionHead eyebrow={tr.blog_eyebrow} title={tr.blog_h2} desc={tr.blog_desc} align="left" mb={0}/>
            <div className="faq-illu" style={{maxWidth:260,justifySelf:"end"}}><Illu name="blog"/></div>
          </div>
          {(() => {
            const BG = ["linear-gradient(135deg,#E0F2FE,#BAE6FD)","linear-gradient(135deg,#ECFEFF,#CFFAFE)","linear-gradient(135deg,#F0FDF4,#DCFCE7)","linear-gradient(135deg,#EEF2FF,#E0E7FF)"];
            const meta = (p) => (
              <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",fontSize:12.5,color:MUTED}}>
                <span style={{display:"inline-flex",alignItems:"center",gap:5}}><Calendar size={13}/> {p.date}</span>
                <span style={{display:"inline-flex",alignItems:"center",gap:5}}><Clock size={13}/> {p.min} {tr.blog_min}</span>
              </div>
            );
            const [first, ...rest] = tr.posts;
            return (
              <>
                <button className="b-card blog-feat reveal" onClick={()=>setPost(0)} style={{display:"grid",gridTemplateColumns:"1.05fr 1fr",marginBottom:22}}>
                  <div className="b-cover" style={{background:BG[0],minHeight:300}}>
                    <span className="b-badge">{tr.blog_featured} · {first.cat}</span>
                    <img src={`/illustrations/${BLOG_IMGS[0]}.svg`} alt="" loading="lazy" style={{width:"62%"}}/>
                  </div>
                  <div style={{padding:"34px 36px",display:"flex",flexDirection:"column",justifyContent:"center",gap:14}}>
                    <h3 style={{fontSize:"1.55rem",fontWeight:700,lineHeight:1.3}}>{first.title}</h3>
                    <p style={{fontSize:".98rem",lineHeight:1.75,color:BODY}}>{first.excerpt}</p>
                    <div style={{display:"flex",alignItems:"center",gap:10,fontSize:12.5,color:MUTED}}>
                      <span style={{width:26,height:26,borderRadius:8,background:SKY,color:"#fff",display:"inline-flex",alignItems:"center",justifyContent:"center",fontFamily:"Sora",fontWeight:700,fontSize:12}}>H</span>
                      {tr.blog_by}
                    </div>
                    {meta(first)}
                    <span style={{display:"inline-flex",alignItems:"center",gap:6,fontFamily:"Sora",fontWeight:600,fontSize:14,color:SKY_D,marginTop:4}}>{tr.blog_read} <ArrowRight size={16}/></span>
                  </div>
                </button>
                <div className="bg3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
                  {rest.map((p,k)=>{
                    const i = k + 1;
                    return (
                      <button key={i} className="b-card reveal" onClick={()=>setPost(i)} style={{transitionDelay:`${k*0.1}s`}}>
                        <div className="b-cover" style={{background:BG[i],height:190}}>
                          <span className="b-badge">{p.cat}</span>
                          <img src={`/illustrations/${BLOG_IMGS[i]}.svg`} alt="" loading="lazy" style={{width:"58%"}}/>
                        </div>
                        <div style={{padding:22,display:"flex",flexDirection:"column",gap:10,flex:1}}>
                          {meta(p)}
                          <h3 style={{fontSize:"1.06rem",fontWeight:600,lineHeight:1.4}}>{p.title}</h3>
                          <p style={{fontSize:".88rem",lineHeight:1.65,color:BODY}}>{p.excerpt}</p>
                          <span style={{display:"inline-flex",alignItems:"center",gap:6,fontFamily:"Sora",fontWeight:600,fontSize:13.5,color:SKY_D,marginTop:"auto"}}>{tr.blog_read} <ArrowRight size={15}/></span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section id="faq" style={{padding:"96px 24px",background:WHITE}}>
        <div className="two-col" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:".8fr 1.2fr",gap:56,alignItems:"start"}}>
          <div className="faq-illu" style={{position:"sticky",top:100}}>
            <span className="eyebrow">{tr.faq_eyebrow}</span>
            <h2 className="sec-h2" style={{margin:"14px 0 24px"}}>{hl(tr.faq_h2)}</h2>
            <Illu name="faq"/>
          </div>
          <div>
            <div className="nm" style={{display:"none",flexDirection:"column",marginBottom:28}}>
              <span className="eyebrow">{tr.faq_eyebrow}</span>
              <h2 className="sec-h2" style={{marginTop:14}}>{hl(tr.faq_h2)}</h2>
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
              <h2 style={{fontSize:"2.3rem",fontWeight:700,color:"#fff",marginBottom:16,lineHeight:1.2}}>{hl(tr.cta_h2, "rgba(255,255,255,.9)")}</h2>
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
      <footer style={{background:NAVY,color:"rgba(255,255,255,.7)",padding:"64px 24px 30px"}}>
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
                {tr.foot_nav.map(([id,l])=>(
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

      {post !== null && (() => {
        const p = tr.posts[post];
        return (
          <div className="modal-ov" onClick={e=>{if(e.target===e.currentTarget) setPost(null);}}>
            <article className="modal-box" role="dialog" aria-modal="true" aria-labelledby="post-title" style={{maxWidth:720,padding:0}}>
              <div className="b-cover" style={{background:"linear-gradient(135deg,#E0F2FE,#BAE6FD)",height:220}}>
                <span className="b-badge">{p.cat}</span>
                <img src={`/illustrations/${BLOG_IMGS[post]}.svg`} alt="" style={{width:"auto",height:"92%"}}/>
                <button onClick={()=>setPost(null)} aria-label={tr.blog_close} style={{position:"absolute",top:12,right:12,width:36,height:36,borderRadius:10,border:"none",background:"rgba(255,255,255,.92)",color:NAVY,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={18}/></button>
              </div>
              <div style={{padding:"28px 32px 32px"}}>
                <div style={{display:"flex",gap:14,flexWrap:"wrap",fontSize:12.5,color:MUTED,marginBottom:12}}>
                  <span>{tr.blog_by}</span>
                  <span style={{display:"inline-flex",alignItems:"center",gap:5}}><Calendar size={13}/> {p.date}</span>
                  <span style={{display:"inline-flex",alignItems:"center",gap:5}}><Clock size={13}/> {p.min} {tr.blog_min}</span>
                </div>
                <h2 id="post-title" style={{fontSize:"1.6rem",fontWeight:700,lineHeight:1.3,marginBottom:18}}>{p.title}</h2>
                {p.body.map((para,k)=> <p key={k} style={{fontSize:"1rem",lineHeight:1.8,marginBottom:14}}>{para}</p>)}
                <button onClick={()=>{setPost(null);setShowForm(true);}} className="btn-p" style={{marginTop:10}}>{tr.why_cta} <ArrowRight size={16}/></button>
              </div>
            </article>
          </div>
        );
      })()}

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
