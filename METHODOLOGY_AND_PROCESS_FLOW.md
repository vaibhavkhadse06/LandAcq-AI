# TerraGuard: Methodology & End-to-End Process Flow
### Predictive Analytics System for Early Detection of Land Acquisition Delays (SIH-26017)
**Sponsoring Ministry:** Ministry of Rural Development | **Framework:** RFCTLARR Act 2013 & PM GatiShakti

---

## 1. System Architecture & Methodology Overview

TerraGuard operates on a **4-Tier Proactive Analytics Architecture** designed to bridge data silos between Revenue Departments (SLAO/Collectorate), Implementing Infrastructure Agencies (NHAI, NHSRCL, DFCCIL, Metro Rail), and the Judicial System (High Courts & LARRA tribunals).

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          TIER 1: MULTI-SOURCE DATA INGESTION                     │
│  - Land Records (Bhulekh/Bhoomi/e-Dharti)  - Gazette Notifications (Sec 4/11/19) │
│  - PFMS / DBT Disbursement Escrow Feeds    - High Court / e-Courts Scrapers     │
│  - PM GatiShakti GIS Vector Layers         - On-Ground SLAO Mobile Inspections  │
└──────────────────────────────────────┬──────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    TIER 2: STATUTORY LIFECYCLE & FEATURE ENGINEERING            │
│  - 7-Stage RFCTLARR Lifecycle State Machine (Stage 1 to Stage 7 Tracking)       │
│  - Statutory Section 19(1) Lapse Countdown (12-Month Hard Ceiling)               │
│  - Feature Extraction: Circle Rate Discrepancies, Mutation Lag, Title Litigations│
└──────────────────────────────────────┬──────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    TIER 3: PREDICTIVE ML ENGINE & EXPLAINABILITY (SHAP)         │
│  - Gradient-Boosted Ensemble (XGBoost / LightGBM) for Delay Risk (0-100)        │
│  - Quantitative Delay Forecast (+Weeks / Months Lost)                           │
│  - SHAP (Shapley Additive exPlanations) for Feature-Level Bottleneck Attribution│
│  - Counterfactual What-If Simulation Engine for Policy & Fund Interventions     │
└──────────────────────────────────────┬──────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    TIER 4: DISPATCH, VISUALIZATION & GOVERNANCE                 │
│  - Executive National & State Dashboards   - Cadastral GIS Corridor Map         │
│  - Automated Early Warning Alerts Matrix   - Official MIS Statutory Reports     │
│  - Role-Based Portals (DM, PM, Legal, ND)  - SHA-256 Tamper-Evident Audit Logs  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Detailed Technical Methodology

### Step 1: Multi-Modal Data Ingestion & Normalization
The system normalizes heterogeneous structured and spatial data streams:
1. **Cadastral & Title Records**: Ingests Khasra/Gat parcel geometry, ownership counts, joint-ownership fragmentation indices, and mutation backlog days.
2. **Statutory Gazette Timelines**: Parses publication dates of Section 11(1) preliminary notifications, Section 15 objection hearings, and Section 19(1) declarations to track strict statutory SLA windows.
3. **Financial PFMS Streams**: Captures compensation allocations, award sanction amounts, escrow bank transfers, and direct benefit transfer (DBT) verification ratios.
4. **Judicial & Dispute Feeds**: Scrapes court status (LARRA tribunals, High Courts) for stay orders, injunctions, and contested circle rate enhancement petitions.
5. **Mobile Field Inspections**: Geo-tagged on-ground photos, DGPS boundary coordinates, PAF (Project Affected Family) Aadhaar/KYC verifications, and PESA Gram Sabha resolutions.

---

### Step 2: 7-Stage RFCTLARR State Machine Engine
Every infrastructure corridor package is mapped to the statutory state machine under the **RFCTLARR Act, 2013**:

```
[ Stage 1: Prelim SIA & Sec 11(1) ]
                 │
                 ▼
[ Stage 2: SIA Appraisal & Expert Approval (Sec 7/8) ]
                 │
                 ▼
[ Stage 3: Declaration of Acquisition (Sec 19(1)) ] ───► [ Statutory 12-Month Countdown Active ]
                 │
                 ▼
[ Stage 4: Land Valuation & Award Inquiry (Sec 23/26) ]
                 │
                 ▼
[ Stage 5: Compensation Disbursement via PFMS (Sec 77/80) ]
                 │
                 ▼
[ Stage 6: Encumbrance-Free Possession & RoW Handover (Sec 38/40) ]
                 │
                 ▼
[ Stage 7: Resettlement & Rehabilitation (R&R) Execution (Sec 31) ]
```

---

### Step 3: Predictive ML Modeling & Feature Engineering
A supervised ensemble model (XGBoost + LightGBM) computes two distinct targets:
1. **Delay Risk Score ($R \in [0, 100]$)**: Calibrated probability of project completion delay exceeding 90 days.
2. **Predicted Delay ($\Delta t$ in Weeks)**: Continuous regression output forecasting net schedule slip.

#### Key Input Feature Vectors:
- **Title Fragmentation Index**: $\frac{\text{Number of Co-sharers}}{\text{Parcel Area (Ha)}}$
- **Circle Rate Gap Ratio**: $\frac{\text{Prevailing Market Demand Rate} - \text{Notified Circle Rate}}{\text{Notified Circle Rate}}$
- **Disbursement Velocity**: $\frac{\text{Compensation Disbursed (₹)}}{\text{Compensation Allocated (₹)} \times \text{Elapsed Weeks}}$
- **Court Injunction Weight**: Weighted count of active High Court vs. District Court stays.
- **Tribal PESA Quorum Ratio**: Percentage approval recorded in Gram Sabha resolutions for Scheduled V blocks.
- **Inter-Departmental Clearances Lag**: Pending SLA days for MoEFCC Forest Stage-II, Wildlife, Railway, and Defense crossings.

---

### Step 4: Explainability via SHAP (Shapley Additive exPlanations)
To ensure algorithmic transparency for District Collectors and High Court Judges, the platform decomposes the overall risk score into exact additive feature contributions:

$$\text{Risk Score}(x) = \phi_0 + \sum_{i=1}^{M} \phi_i(x)$$

Where $\phi_0$ is the base expected risk across all national corridors, and $\phi_i(x)$ is the marginal impact of feature $i$ (e.g., $+18.4\%$ due to active High Court stay, $+12.2\%$ due to KYC mutation lag).

---

### Step 5: Counterfactual What-If Simulation Engine
The simulator applies parametric modifiers to test policy interventions before capital deployment:
- **Compensation Speed Multiplier ($1.0\times - 3.5\times$)**: Models the impact of fast-tracking escrow releases and Special Land Acquisition Officers (SLAO) camps.
- **Dispute Resolution Fast-Track**: Simulates deployment of dedicated Lok Adalats or LARRA fast-track benches.
- **R&R Enhancement Factor**: Models the reduction in local agitation upon providing enhanced rehabilitation plots and annuities.
- **Output**: Calculates **Projected Weeks Saved**, **New Delay Probability %**, and **Capital Cost Overrun Prevented (₹ Cr)**.

---

## 3. End-to-End Operational Process Flow

```
+-------------------------------------------------------------------------------+
| PHASE 1: PROJECT ONBOARDING & DATA INGESTION                                  |
| 1. Implementing Agency (NHAI/Rail) registers Corridor & Alignment KML/GeoJSON.|
| 2. System fetches Cadastral Land Records from State Portals (Bhulekh/Bhoomi). |
| 3. Section 11(1) Preliminary Gazette Notification date is recorded.           |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
| PHASE 2: GROUND VERIFICATION & SURVEY PORTAL                                  |
| 1. SLAO / Field Inspectors conduct DGPS survey & drone orthomosaic flights.   |
| 2. Mobile portal logs tree/structure valuations and PAF Aadhaar/PFMS links.   |
| 3. Gram Sabha quorum & PESA tribal consent resolutions are uploaded.          |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
| PHASE 3: CONTINUOUS ML RISK SCORING & MONITORING                              |
| 1. Model calculates Risk Index (0-100), Delay Probability %, & Forecast Weeks.|
| 2. Statutory 12-Month Section 19 lapse countdown is actively monitored.       |
| 3. SHAP attribution identifies the #1 bottleneck (e.g., High Court Injunction)|
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
| PHASE 4: AUTOMATED TRIAGE & EARLY WARNING ALERTS                              |
| 1. If Risk >= 80 or Lapse Window <= 60 Days -> Trigger CRITICAL TIER Alert.  |
| 2. Automated webhooks dispatch notifications to District Collector & Secretary|
| 3. Corridor is highlighted on the National GIS Spatial Map.                   |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
| PHASE 5: INTERVENTION & WHAT-IF POLICY SIMULATION                             |
| 1. District Collector / Secretary runs What-If Simulation Studio.             |
| 2. Evaluates cost-benefit of setting up Special Compensation Camps vs Delay.  |
| 3. Generates Official RFCTLARR Statutory MIS Report for Cabinet Review.       |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
| PHASE 6: EXECUTION, POSSESSION & TAMPER-EVIDENT AUDITING                      |
| 1. Full compensation disbursed via PFMS; physical possession recorded.        |
| 2. Milestone handover digitally signed with SHA-256 cryptographic hash.       |
| 3. Outcomes fed back into Continuous Learning Pipeline to retrain model.     |
+-------------------------------------------------------------------------------+
```

---

## 4. Key Role-Based Operational Workflows

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. NATIONAL PROJECT DIRECTOR (Ministry of Infra / PM GatiShakti)           │
│    - Reviews national portfolio heatmaps and capital at risk (₹ Cr).        │
│    - Directs inter-ministerial coordination for Forest & Defense clearances.│
│    - Approves macro budget escalations and state-level policy interventions.│
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. DISTRICT MAGISTRATE / COLLECTOR (SLAO)                                   │
│    - Monitors village-wise cadastral parcels and Section 19 lapse timers.   │
│    - Organizes Special Revenue Lok Adalats to resolve compensation claims.  │
│    - Authorizes PFMS direct disbursements and signs Section 38 Awards.      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. LEGAL & COMPLIANCE COUNSEL (LARRA & Judicial Cell)                       │
│    - Tracks High Court writ petitions and stay orders on circle rates.      │
│    - Submits counter-affidavits before statutory deadlines lapse.           │
│    - Manages Land Acquisition Rehabilitation & Resettlement Authority cases.│
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. IMPLEMENTING AGENCY PROJECT MANAGER (NHAI / NHSRCL / DFCCIL)             │
│    - Coordinates physical RoW pegging and boundary pillar demarcation.      │
│    - Tracks utility shifting (power lines, water mains, pipelines).         │
│    - Takes over encumbrance-free land for civil construction packages.      │
└─────────────────────────────────────────────────────────────────────────────┘
```
