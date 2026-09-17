// Comprehensive README content for direct in-browser download
export const README_MARKDOWN_CONTENT = `# TerraGuard — Predictive Analytics System for Early Detection of Land Acquisition Delays

[![Problem Statement](https://img.shields.io/badge/SIH--2026-Problem%20ID%2026017-blue.svg)](https://www.sih.gov.in/)
[![Sponsoring Ministry](https://img.shields.io/badge/Ministry-Rural%20Development-green.svg)](https://rural.gov.in/)
[![Statutory Framework](https://img.shields.io/badge/Act-RFCTLARR%202013-orange.svg)](https://legislative.gov.in/)
[![Technology Stack](https://img.shields.io/badge/Tech-React%20%7C%20TypeScript%20%7C%20Tailwind%20%7C%20Recharts-61dafb.svg)]()

> **A Next-Generation AI/ML Decision Support & Monitoring Platform for Infrastructure Land Acquisition in India**
> Built for the Smart India Hackathon (SIH 2026) Problem Statement **SIH 26017**: *"Predictive Analytics System for Early Detection of Land Acquisition Delays"*, sponsored by the **Ministry of Rural Development** under the **PM GatiShakti National Master Plan**.

---

## 📌 Executive Summary

Land acquisition is one of the single largest bottlenecks for major capital infrastructure projects across India—spanning **Highways & Expressways (NHAI)**, **High-Speed Rail (NHSRCL)**, **Dedicated Freight Corridors (DFCCIL)**, **Metro Rail (DMRC/BMRCL)**, and **Renewable Energy Parks**.

Delays typically stem from fragmented land titles, circle rate litigations, statutory lapse deadlines, tribal consent (PESA / Scheduled V) requirements, and slow compensation disbursements.

**TerraGuard** transforms land acquisition monitoring from a **reactive firefighting model** into a **proactive, predictive AI-guided decision framework**. By tracking every project through all 7 statutory stages of the **RFCTLARR Act, 2013**, TerraGuard forecasts delay probabilities, attributes risk drivers using **SHAP values**, provides **counterfactual what-if simulations**, and synchronizes field verification data in real-time.

---

## 🏛️ Statutory Framework: RFCTLARR Act, 2013

The platform models and monitors the full 7-stage lifecycle mandated under the **Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013**:

| Stage | Statutory Reference | Key Activities & Bottlenecks Monitored |
| :--- | :--- | :--- |
| **Stage 1** | **Section 4 & 11(1)** | Preliminary Social Impact Assessment (SIA), Gram Sabha public hearings, and Preliminary Gazette Notification. |
| **Stage 2** | **Section 7 & 8** | Multi-Disciplinary Expert Group review, SIA appraisal, and Government formal sanction. |
| **Stage 3** | **Section 19(1)** | Declaration of Acquisition. **Statutory 12-month lapse countdown timer active**. |
| **Stage 4** | **Section 23 & 26** | Land valuation, multiplication factor determination, Award inquiry, and Solatium (100%) computation. |
| **Stage 5** | **Section 77 & 80** | Compensation disbursement via PFMS/Escrow; title mutation in revenue records. |
| **Stage 6** | **Section 38 & 40** | Full compensation clearance, encumbrance-free physical possession, and RoW handover. |
| **Stage 7** | **Section 31 & Schedule II** | Resettlement & Rehabilitation (R&R) colony development, civic amenities, and PAF employment. |

---

## 🚀 Key Modules & Capabilities

### 1. 📊 Executive Dashboard & Triage Matrix
- **Macro KPIs**: Active national projects, critical delay count, predicted average delay in months/weeks, compensation disbursement payout ratio, and model confidence scores.
- **Urgent Triage Alert**: High-priority alert banner identifying corridors at risk of statutory Section 19(1) lapse or active High Court stay injunctions with sub-7-day SLA actions.
- **Stage & State Latency Breakdown**: Interactive Recharts-powered visualizers showing delay week distributions across all 7 lifecycle stages and across key states (Gujarat, Maharashtra, Haryana, Karnataka, etc.).
- **Top Delay Drivers (AI)**: Real-time feature attribution highlighting legal stays, R&R colony readiness, KYC gaps, and inter-departmental forest/rail clearances.

### 2. 🗺️ National GIS Spatial Corridor & Cadastral Map
- **Multi-Layer Geospatial Engine**: Switch seamlessly between **Risk Heatmap**, **Court Stay Injunctions**, **Tribal PESA Consent Zones**, and **Compensation Disbursement Velocity**.
- **Interactive Corridor Traces**: Clickable route alignments across India showing major highway, bullet train, freight corridor, and metro alignments.
- **Parcel-Level Inspector**: Drill down into individual Khasra / Survey numbers, PAF ownership names, area in hectares, circle rates vs. market valuation, and stay order statuses.

### 3. 📱 Field-Level Ground Survey & Mobile Verification Portal
- **Designed for On-Ground Officers (SLAO / Patwari / Surveyors)**:
  - Log field inspection entries with DGPS coordinates, cadastral parcel IDs, and geotagged photographic evidence.
  - PAF KYC Aadhaar linking status (PFMS verification check).
  - Horticulture tree enumeration and structure valuations (PWD Schedule of Rates).
  - Encroachment and RoW boundary overlap conflict logging.
  - One-click verification approval / discrepancy flagging workflow.

### 4. 🎛️ Counterfactual What-If Policy Simulation Studio
- Interactive scenario testing for policymakers and District Collectors:
  - **Compensation Multiplier Modifier** (1.0x to 3.5x).
  - **Fast-Track Dispute Resolution Tribunal Activation** (LARRA / Lok Adalat).
  - **R&R Resettlement Package Enhancements**.
  - **Inter-Departmental Single-Window Clearance Cell Activation**.
- **Instant Impact Calculation**: Real-time projection of **weeks saved**, **delay reduction percentage**, and **capital cost overrun prevented (in ₹ Crores)**.

### 5. 📑 Statutory MIS Report & Briefing Generator
- **Official Government Formats**:
  1. *RFCTLARR Statutory Compliance Matrix*
  2. *Compensation & PFMS Escrow Tracking Sheet*
  3. *PAF Rehabilitation & Resettlement Colony Status*
  4. *AI Early Warning & Delay Risk Triage*
- **1-Click Print & Export**: Ready-to-print executive briefing document with official letterhead, summary stats, project compliance table, and digital authorization signatures, plus instant CSV export.

### 6. 🔔 Multi-Tier Automated Alerts Matrix
- Rule-based & predictive early warning notifications categorized into **Critical**, **High**, and **Moderate** severity.
- **Statutory Lapse Countdown Warnings**: 90-day, 60-day, and 30-day pre-emptive alerts prior to Section 19(1) lapse deadlines.
- Multi-channel dispatch integration (SMS, Email, PM GatiShakti Webhook, WhatsApp Officer Gateway).

### 7. 🧠 Continuous Learning & Model Drift Engine
- **Model Telemetry**: Live performance monitoring (AUC-ROC: 0.942, MAE: 2.1 wks, Precision: 91.4%, Recall: 93.8%).
- **Feature Importance (SHAP)**: Ranks primary predictors (Title Litigation % > Circle Rate Discrepancy > Mutation Backlog > Tribal PESA Quorum).
- **Online Drift Retraining**: Simulate automated retraining on newly ingested field ground-truth data with model versioning (e.g., XGBoost v3.4.1 → v3.5.0).

### 8. 🛡️ Cryptographic Audit Trail & Document Vault
- SHA-256 tamper-evident digital verification logs for all statutory approvals, gazette notifications, awards, and compensation payments.
- Filterable by actor, action type, IP address, and date range.

### 9. 🔌 Open API & PM GatiShakti Data Integration Hub
- Standardized RESTful endpoints (/api/v1/predict-delay, /api/v1/projects, /api/v1/what-if-simulate, /api/v1/gis/corridors).
- Interactive cURL examples and JSON response schemas for integration with NIC portals, Bhoomi, Bhulekh, and PM GatiShakti.

---

## 👥 Role-Based Access Control (RBAC)

The platform dynamically adjusts UI views, permission gates, and actions based on the active persona:

| Role | Target User | Key Permissions & Views |
| :--- | :--- | :--- |
| **National Project Director** | MoRD / PM GatiShakti / NITI Aayog | Full macro portfolio visibility, national KPI aggregation, inter-state triage, what-if policy simulation. |
| **District Magistrate / Collector (SLAO)** | Special Land Acquisition Officer (District Level) | District parcel management, statutory timeline countdowns, award passing, PAF grievance resolution. |
| **Legal & Compliance Officer** | State Advocate General / Revenue Dept / LARRA | Court stay monitoring, High Court counter-affidavit tracking, circle rate litigation management. |
| **Implementing Agency PM** | NHAI / NHSRCL / DFCCIL / Metro Corp | RoW physical handover schedules, contractor utility shifting, compensation escrow funding. |

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Styling & Layout**: Tailwind CSS
- **Data Visualizations**: Recharts (Area, Bar, Pie/Donut, Radar charts)
- **Iconography**: Lucide React
- **Geospatial & Vector Mapping**: SVG-based responsive national corridor canvas with coordinate projections
- **Build System**: Vite
- **Package Manager**: npm / bun

---

## 📁 Project Directory Structure

\`\`\`
├── .env.example                  # Environment variable declarations
├── index.html                    # Entry HTML document with SEO/meta tags
├── metadata.json                 # AI Studio Applet capabilities and metadata
├── package.json                  # Dependencies and build scripts
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite build & plugin configuration
├── README.md                     # Comprehensive project documentation
├── METHODOLOGY_AND_PROCESS_FLOW.md # Complete methodology & process flow guide
└── src/
    ├── App.tsx                   # Main app container, tab switcher & routing
    ├── main.tsx                  # React DOM root entry point
    ├── index.css                 # Tailwind CSS directives & global styling
    ├── types.ts                  # Shared TypeScript interfaces, types & enums
    ├── data/
    │   ├── mockData.ts           # Curated national projects, stages, GIS data & surveys
    │   └── readmeContent.ts      # Markdown content for in-browser download
    └── components/
        ├── Navbar.tsx            # Header navigation, RBAC role switcher & search
        ├── ExecutiveDashboard.tsx# National overview, KPIs, and risk triage
        ├── MethodologySlidesView.tsx# Slide deck presentation view
        ├── ScopeOfStudyView.tsx  # RFCTLARR Act 2013 7-stage taxonomy & problem scope
        ├── ProjectsListView.tsx  # Filterable and sortable corridor portfolio
        ├── GisCorridorMapView.tsx# National & state GIS cadastral map
        ├── FieldSurveyorPortal.tsx# Mobile ground survey & inspection logging
        ├── WhatIfSimulationView.tsx# Counterfactual policy simulation engine
        ├── MisReportGeneratorView.tsx# Official government MIS reports & printing
        ├── AlertsMatrixView.tsx  # Pre-emptive delay notifications & webhooks
        ├── ModelLearningView.tsx # ML metrics, SHAP weights & drift retraining
        ├── AuditTrailView.tsx    # Cryptographic SHA-256 activity logs
        ├── ApiDocsView.tsx       # REST API schemas & integration hub
        ├── ProjectDetailModal.tsx# In-depth corridor modal with timeline & stages
        └── NewPredictionModal.tsx# Custom project delay scoring wizard
\`\`\`

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18.0 or higher)
- npm or bun

### Installation

1. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/your-org/terraguard-sih26017.git
   cd terraguard-sih26017
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Build for production**:
   \`\`\`bash
   npm run build
   \`\`\`

5. **Preview production build**:
   \`\`\`bash
   npm run preview
   \`\`\`

---

## 📈 Machine Learning Workflow

\`\`\`
[ Cadastral Records / Bhulekh ] ─┐
[ Gazette Notifications ]       ─┼──> [ Feature Extraction & Normalization ]
[ High Court Case Scrapes ]     ─┤       │
[ PFMS Disbursement Streams ]   ─┘       ▼
                               [ XGBoost / LightGBM Ensemble ]
                                         │
                        ┌────────────────┴────────────────┐
                        ▼                                 ▼
           [ Predicted Delay Score ]          [ SHAP Feature Attributions ]
           (0-100 Risk & Weeks Lost)          (Top Contributing Bottlenecks)
                        │                                 │
                        └────────────────┬────────────────┘
                                         ▼
                     [ Proactive Counterfactual Interventions ]
                     (What-If Simulation & Delay Reduction)
\`\`\`

---

## 📜 Compliance & Disclaimers

- Developed specifically for **Smart India Hackathon (SIH) 2026** under Problem Statement **SIH 26017**.
- Conforms to statutory provisions under the **RFCTLARR Act, 2013**, **The National Highways Act, 1956**, and **The Railways Act, 1989**.
- Integrated with standards aligned with the **PM GatiShakti National Master Plan**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
`;
