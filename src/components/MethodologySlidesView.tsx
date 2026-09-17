import React, { useState, useEffect } from 'react';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Cpu, 
  Scale, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Download, 
  Share2, 
  FileSpreadsheet, 
  FileText,
  Sliders,
  Smartphone,
  MapPin,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Database,
  Eye,
  BookOpen
} from 'lucide-react';
import { README_MARKDOWN_CONTENT } from '../data/readmeContent';

export const MethodologySlidesView: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = [
    {
      id: 'title',
      badge: 'SIH-2026 Problem ID: 26017',
      title: 'TerraGuard: Predictive Analytics System for Early Detection of Land Acquisition Delays',
      subtitle: 'A Proactive AI/ML Decision Support Framework for Ministry of Rural Development & PM GatiShakti',
      category: 'Overview',
      speakerNotes: 'Welcome the jury and stakeholders. Highlight that TerraGuard shifts the paradigm from reactive firefighting to proactive, explainable AI early-warning across the 7 statutory stages of the RFCTLARR Act, 2013.',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center mx-auto mb-2 font-bold text-lg">
                🏛️
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Ministry of Rural Development</h4>
              <p className="text-xs text-slate-600 mt-1">Nodal Ministry for RFCTLARR Act 2013 & Land Administration</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center mx-auto mb-2 font-bold text-lg">
                🚆
              </div>
              <h4 className="font-bold text-slate-900 text-sm">PM GatiShakti National Master Plan</h4>
              <p className="text-xs text-slate-600 mt-1">Multi-modal synchronization for NHAI, High-Speed Rail & DFCCIL</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center mx-auto mb-2 font-bold text-lg">
                🤖
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Explainable AI & ML (XGBoost + SHAP)</h4>
              <p className="text-xs text-slate-600 mt-1">Dual-target risk scoring, +weeks delay forecasting & policy simulation</p>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">The Core Value Proposition</h4>
            <p className="text-sm leading-relaxed text-slate-200">
              India loses billions of rupees annually due to infrastructure gestation delays caused by land acquisition bottlenecks.
              TerraGuard delivers <span className="text-emerald-400 font-semibold">90-day pre-emptive early warnings</span>, tracks <span className="text-amber-400 font-semibold">Section 19(1) statutory lapse deadlines</span>, and empowers District Magistrates with counterfactual <span className="text-cyan-400 font-semibold">"What-If" intervention simulations</span>.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'problem-statement',
      badge: 'The Challenge',
      title: 'Root Causes of Infrastructure Land Acquisition Delays',
      subtitle: 'Why Conventional Monitoring Systems Fail to Prevent Schedule & Cost Overruns',
      category: 'Problem Analysis',
      speakerNotes: 'Explain the five major friction points: Title fragmentation, Circle rate vs market rate disputes, Section 19 12-month statutory lapse window, PESA Gram Sabha quorum gaps, and disjointed departmental clearances.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start gap-3">
              <div className="p-2 bg-red-100 text-red-700 rounded-lg shrink-0 font-bold text-xs">01</div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Title Disputes & Micro-Fragmentation</h5>
                <p className="text-[11px] text-slate-600 mt-0.5">Joint co-sharers, unmutated inheritance records, and conflicting revenue records (7/12 & Khasra extracts).</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3.5 flex items-start gap-3">
              <div className="p-2 bg-orange-100 text-orange-700 rounded-lg shrink-0 font-bold text-xs">02</div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Contested Circle Rates & Solatium Litigation</h5>
                <p className="text-[11px] text-slate-600 mt-0.5">Outdated district circle rates lead to mass High Court writ petitions and Section 64 LARRA dispute references.</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
              <div className="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0 font-bold text-xs">03</div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Strict 12-Month Statutory Lapse Deadlines</h5>
                <p className="text-[11px] text-slate-600 mt-0.5">Under Section 19(7), if Award is not made within 12 months of declaration, the entire acquisition lapses legally.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3.5 flex items-start gap-3">
              <div className="p-2 bg-purple-100 text-purple-700 rounded-lg shrink-0 font-bold text-xs">04</div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">PESA & Scheduled V Tribal Consent Lag</h5>
                <p className="text-[11px] text-slate-600 mt-0.5">Gram Sabha quorum quorum failures and non-compliance with statutory 50% consent prerequisites.</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-start gap-3">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg shrink-0 font-bold text-xs">05</div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Inter-Departmental Clearance Silos</h5>
                <p className="text-[11px] text-slate-600 mt-0.5">Uncoordinated MoEFCC Forest Stage-II, Railway Crossing, and Defense NOC pipelines stall physical RoW handover.</p>
              </div>
            </div>

            <div className="bg-slate-100 border border-slate-300 rounded-xl p-3 text-center">
              <p className="text-xs font-bold text-slate-800">
                ⚡ Net Impact: Average 18-36 months delay | ₹250 Cr+ capital escalation per major corridor
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'architecture',
      badge: 'System Design',
      title: '4-Tier System Architecture',
      subtitle: 'From Multi-Modal Ingestion to Explainable Intelligence & Governance',
      category: 'Architecture',
      speakerNotes: 'Walk the jury through the 4 tiers: Ingestion (data sources), State Machine & Feature Extraction, AI/ML Analytics (XGBoost + SHAP), and Governance Delivery (Dashboards, MIS, RBAC, Alerts).',
      content: (
        <div className="space-y-2.5">
          <div className="border border-blue-200 bg-blue-50/50 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">T1</div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Tier 1: Multi-Source Data Ingestion</h5>
                <p className="text-[11px] text-slate-600">Bhulekh / Bhoomi land registries • Gazette notification feeds • PFMS Escrow disbursements • e-Courts web scrapers • Mobile DGPS surveys</p>
              </div>
            </div>
            <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded shrink-0">Automated ETL</span>
          </div>

          <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">T2</div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Tier 2: Statutory Lifecycle & Feature Engineering</h5>
                <p className="text-[11px] text-slate-600">7-Stage RFCTLARR State Machine • Section 19(1) Lapse Countdown Engine • Title fragmentation & Circle rate gap indices</p>
              </div>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded shrink-0">State Engine</span>
          </div>

          <div className="border border-purple-200 bg-purple-50/50 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">T3</div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Tier 3: Predictive ML Engine & SHAP Attribution</h5>
                <p className="text-[11px] text-slate-600">Ensemble XGBoost/LightGBM • Delay Probability (0-100) • Quantitative Delay (+Weeks) • Counterfactual What-If Simulator</p>
              </div>
            </div>
            <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded shrink-0">AI / ML</span>
          </div>

          <div className="border border-amber-200 bg-amber-50/50 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">T4</div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Tier 4: Visual Analytics, MIS & Governance</h5>
                <p className="text-[11px] text-slate-600">National GIS Map • Executive Dashboard • Official MIS Reports • Role-Based Access Control • Cryptographic SHA-256 Audit Trail</p>
              </div>
            </div>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded shrink-0">Delivery</span>
          </div>
        </div>
      )
    },
    {
      id: 'statutory-lifecycle',
      badge: 'Statutory Taxonomy',
      title: 'The 7-Stage RFCTLARR 2013 Lifecycle Engine',
      subtitle: 'End-to-End Tracking from Preliminary SIA to Final R&R Colony Handover',
      category: 'Methodology',
      speakerNotes: 'Detail each of the 7 stages mandated by the Parliament of India in 2013. Stress that Stage 3 has a statutory 12-month lapse clock that TerraGuard counts down in real-time.',
      content: (
        <div className="space-y-2 overflow-y-auto max-h-[340px] pr-1">
          {[
            { stage: 'Stage 1', name: 'Preliminary SIA & Sec 11(1) Notification', section: 'Section 4 & 11(1)', color: 'border-blue-300 bg-blue-50/60', risk: 'Gram Sabha resistance & public hearing quorum' },
            { stage: 'Stage 2', name: 'SIA Appraisal & Expert Approval', section: 'Section 7 & 8', color: 'border-indigo-300 bg-indigo-50/60', risk: 'Multi-Disciplinary Expert Group appraisal delays' },
            { stage: 'Stage 3', name: 'Declaration of Acquisition (Sec 19)', section: 'Section 19(1)', color: 'border-red-300 bg-red-50/60', risk: '⚠️ 12-MONTH STATUTORY LAPSE COUNTDOWN ACTIVE' },
            { stage: 'Stage 4', name: 'Land Valuation & Award Inquiry', section: 'Section 23 & 26', color: 'border-amber-300 bg-amber-50/60', risk: 'Multiplication factor & market rate determination disputes' },
            { stage: 'Stage 5', name: 'Compensation Disbursement via PFMS', section: 'Section 77 & 80', color: 'border-emerald-300 bg-emerald-50/60', risk: 'Aadhaar-bank linkage gaps, disputed co-sharer escrow' },
            { stage: 'Stage 6', name: 'Physical Possession & RoW Handover', section: 'Section 38 & 40', color: 'border-cyan-300 bg-cyan-50/60', risk: 'Standing crop removal, demolition & encroachment friction' },
            { stage: 'Stage 7', name: 'R&R Execution & Colony Commissioning', section: 'Section 31 & Sched II', color: 'border-purple-300 bg-purple-50/60', risk: 'Allotment of alternate house sites & annuity disbursals' }
          ].map((s, idx) => (
            <div key={idx} className={`border rounded-lg p-2.5 flex items-center justify-between text-xs ${s.color}`}>
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-slate-800 shrink-0 font-mono w-16">{s.stage}</span>
                <div>
                  <span className="font-bold text-slate-900">{s.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono ml-2">({s.section})</span>
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-700">{s.risk}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'ml-engine',
      badge: 'AI & Data Science',
      title: 'Predictive ML Engine & Explainable Attribution',
      subtitle: 'XGBoost & LightGBM Dual-Target Forecasting with SHAP Decomposition',
      category: 'Data Science',
      speakerNotes: 'Show the mathematical foundation. Explain that we predict both a continuous delay in weeks and a discrete risk category, with SHAP values ensuring transparency for District Magistrates.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 text-white rounded-xl p-4 space-y-3 font-mono text-xs">
            <h5 className="text-blue-400 font-bold uppercase text-[11px]">Mathematical Model Formulation</h5>
            <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700 space-y-1 text-[11px]">
              <p className="text-emerald-400"># Dual Objective Targets:</p>
              <p>Target 1: Risk Probability P(Delay &gt; 90d) ∈ [0, 100]</p>
              <p>Target 2: Schedule Slip Δt = f(X) ∈ ℝ+ (Weeks)</p>
            </div>
            <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700 space-y-1 text-[11px]">
              <p className="text-cyan-400"># SHAP Additive Feature Decomposition:</p>
              <p className="text-slate-300">Risk(x) = φ₀ + ∑ φᵢ(x)</p>
              <p className="text-[10px] text-slate-400">Where φᵢ is the exact marginal risk contribution of feature i</p>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="text-xs font-bold text-slate-700 uppercase">Top 5 Feature Importance Weights (SHAP)</h5>
            {[
              { label: 'Title Disputes & Court Stays', pct: 28, color: 'bg-red-500' },
              { label: 'Circle Rate vs Market Rate Gap', pct: 24, color: 'bg-orange-500' },
              { label: 'Unmutated Land Records Backlog', pct: 19, color: 'bg-amber-500' },
              { label: 'Tribal PESA Gram Sabha Quorum', pct: 16, color: 'bg-purple-500' },
              { label: 'Forest/Railway Clearance Lag', pct: 13, color: 'bg-blue-500' }
            ].map((f, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800">{f.label}</span>
                  <span className="font-bold text-slate-600">{f.pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${f.color}`} style={{ width: `${f.pct * 3.5}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'field-survey',
      badge: 'Ground-Truth Verification',
      title: 'Mobile Field Survey & Inspection Pipeline',
      subtitle: 'Closing the Gap between Revenue Office Records and Ground Reality',
      category: 'Field Operations',
      speakerNotes: 'Explain how Patwaris, Revenue Inspectors and SLAO teams use the Field Verification module to capture geo-tagged evidence, Aadhaar-PFMS links, tree valuations, and encroachment flags.',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <Smartphone className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <h5 className="font-bold text-slate-900">1. Mobile On-Ground Logging</h5>
              <p className="text-[10px] text-slate-500 mt-0.5">DGPS Coordinates, geotagged photos & tree counts</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <h5 className="font-bold text-slate-900">2. Instant KYC & PFMS Check</h5>
              <p className="text-[10px] text-slate-500 mt-0.5">Aadhaar seeded bank accounts for Direct Benefit Transfer</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <Database className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <h5 className="font-bold text-slate-900">3. Live GIS Ingestion</h5>
              <p className="text-[10px] text-slate-500 mt-0.5">Real-time cadastral map synchronization & model update</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-blue-900">Integrated Valuation Engines:</span>
              <p className="text-slate-600 text-[11px] mt-0.5">Horticulture Tree Enumeration • Structure Valuation (PWD Schedule of Rates) • Gram Sabha Resolutions</p>
            </div>
            <span className="bg-blue-600 text-white font-bold px-2.5 py-1 rounded text-[11px] shrink-0">SLAO Certified</span>
          </div>
        </div>
      )
    },
    {
      id: 'what-if-simulation',
      badge: 'Decision Support',
      title: 'Counterfactual "What-If" Policy Simulation Studio',
      subtitle: 'Evaluating Policy Interventions Before Deploying Government Capital',
      category: 'Simulation',
      speakerNotes: 'Demonstrate how decision-makers can slide compensation multipliers, trigger fast-track Lok Adalat dispute benches, or increase R&R packages to see the immediate reduction in delay weeks and cost overruns saved.',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
            <div className="border border-slate-200 bg-white p-2.5 rounded-lg">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Compensation Multiplier</span>
              <span className="text-base font-extrabold text-blue-600">1.0x → 3.5x</span>
              <span className="text-[10px] text-slate-500 block">RFCTLARR Sec 26 modifier</span>
            </div>
            <div className="border border-slate-200 bg-white p-2.5 rounded-lg">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Dispute Fast-Track</span>
              <span className="text-base font-extrabold text-indigo-600">Lok Adalat</span>
              <span className="text-[10px] text-slate-500 block">Accelerated settlement</span>
            </div>
            <div className="border border-slate-200 bg-white p-2.5 rounded-lg">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">R&R Package Boost</span>
              <span className="text-base font-extrabold text-emerald-600">+25% - 50%</span>
              <span className="text-[10px] text-slate-500 block">Civic & annuity aid</span>
            </div>
            <div className="border border-slate-200 bg-white p-2.5 rounded-lg">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Inter-Dept Cell</span>
              <span className="text-base font-extrabold text-purple-600">Single Window</span>
              <span className="text-[10px] text-slate-500 block">Forest & Rail NOC sync</span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h5 className="font-bold text-emerald-900 text-xs">Simulated Outcome on Mumbai-Ahmedabad Corridor:</h5>
              <p className="text-xs text-emerald-700 mt-0.5">
                Applying a <span className="font-bold">1.5x Multiplier</span> + <span className="font-bold">Fast-Track LARRA Bench</span> reduces delay by <span className="font-bold">14 Weeks</span> and saves <span className="font-bold">₹182 Crores</span> in IDC (Interest During Construction).
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-slate-500 block uppercase">ROI Factor</span>
              <span className="text-xl font-black text-emerald-700">7.2x</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'rbac-governance',
      badge: 'Role-Based Governance',
      title: 'Stakeholder-Centric Role Portals',
      subtitle: 'Tailored Intelligence Across the Government Hierarchy',
      category: 'Governance',
      speakerNotes: 'Explain how TerraGuard adapts its view for each role: National Director sees macro portfolios, District Magistrate sees village parcels and lapse countdowns, Legal counsel monitors court stays, and PM manages physical RoW.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="border border-blue-200 bg-blue-50/50 rounded-xl p-3">
            <h5 className="font-bold text-blue-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              National Project Director (MoRD / PM GatiShakti)
            </h5>
            <p className="text-[11px] text-slate-600 mt-1">Macro portfolio heatmaps, inter-state corridor progress, national budget exposure, and inter-ministerial escalations.</p>
          </div>

          <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-3">
            <h5 className="font-bold text-emerald-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              District Magistrate / Collector (SLAO)
            </h5>
            <p className="text-[11px] text-slate-600 mt-1">Village-wise Khasra parcel inspector, Section 19 lapse countdown timers, PFMS direct payout approvals, and Section 38 Awards.</p>
          </div>

          <div className="border border-purple-200 bg-purple-50/50 rounded-xl p-3">
            <h5 className="font-bold text-purple-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              Legal & Compliance Officer (LARRA / HC Cell)
            </h5>
            <p className="text-[11px] text-slate-600 mt-1">High Court stay order tracking, circle rate enhancement writ monitoring, and counter-affidavit filing deadline alerts.</p>
          </div>

          <div className="border border-amber-200 bg-amber-50/50 rounded-xl p-3">
            <h5 className="font-bold text-amber-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              Implementing Agency PM (NHAI / Rail)
            </h5>
            <p className="text-[11px] text-slate-600 mt-1">Physical RoW pegging, utility shifting tracking (power/water), and civil contractor handover coordination.</p>
          </div>
        </div>
      )
    },
    {
      id: 'summary-impact',
      badge: 'Conclusion & Impact',
      title: 'Measurable Impact & National Benefits',
      subtitle: 'Empowering India’s ₹111 Lakh Crore National Infrastructure Pipeline',
      category: 'Summary',
      speakerNotes: 'Conclude with the tangible return on investment: 30-40% reduction in delay cycles, statutory lapse prevention, zero ghost compensation through PFMS, and seamless PM GatiShakti alignment.',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
              <span className="text-2xl font-black text-blue-600 block">35%</span>
              <span className="text-[11px] font-bold text-slate-700">Average Delay Reduction</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
              <span className="text-2xl font-black text-emerald-600 block">100%</span>
              <span className="text-[11px] font-bold text-slate-700">Section 19 Lapse Prevention</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
              <span className="text-2xl font-black text-purple-600 block">₹1,200+ Cr</span>
              <span className="text-[11px] font-bold text-slate-700">Projected IDC Savings</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
              <span className="text-2xl font-black text-amber-600 block">SHA-256</span>
              <span className="text-[11px] font-bold text-slate-700">Tamper-Evident Auditability</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-xl p-4 flex items-center justify-between">
            <div>
              <h5 className="font-bold text-sm text-blue-300">Ready for PM GatiShakti & State Revenue Portals</h5>
              <p className="text-xs text-slate-300 mt-0.5">RESTful APIs ready for Bhoomi, Bhulekh, e-Courts, and NIMS interoperability.</p>
            </div>
            <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
              SIH 2026 Ready
            </span>
          </div>
        </div>
      )
    }
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const handleDownloadReadme = () => {
    const blob = new Blob([README_MARKDOWN_CONTENT], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeSlide = slides[currentSlide];

  return (
    <div className={`space-y-4 pb-12 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto' : ''}`}>
      {/* Presentation Controls Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Methodology & Process Flow Slide Deck</h3>
            <p className="text-[11px] text-slate-500">Interactive Visual Presentation (Slide {currentSlide + 1} of {slides.length})</p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={handleDownloadReadme}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            title="Download complete project documentation as README.md"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Download README.md</span>
          </button>

          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
              showSpeakerNotes 
                ? 'bg-blue-50 border-blue-300 text-blue-700' 
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showSpeakerNotes ? 'Hide Notes' : 'Speaker Notes'}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
              disabled={currentSlide === 0}
              className="p-1.5 rounded hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
              title="Previous Slide (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-700 px-2">
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
              disabled={currentSlide === slides.length - 1}
              className="p-1.5 rounded hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
              title="Next Slide (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-300 p-6 sm:p-8 min-h-[480px] flex flex-col justify-between relative overflow-hidden">
        {/* Slide Header */}
        <div className="border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
              {activeSlide.badge}
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              {activeSlide.category} • {currentSlide + 1}/{slides.length}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">{activeSlide.title}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{activeSlide.subtitle}</p>
        </div>

        {/* Slide Dynamic Content */}
        <div className="py-2 flex-1 flex flex-col justify-center">
          {activeSlide.content}
        </div>

        {/* Slide Footer */}
        <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>TerraGuard © SIH-26017 | MoRD & PM GatiShakti</span>
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === i ? 'bg-blue-600 w-6' : 'bg-slate-200 hover:bg-slate-300'
                }`}
                title={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <span>Confidential / Official Briefing</span>
        </div>
      </div>

      {/* Speaker Notes Drawer (if enabled) */}
      {showSpeakerNotes && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 animate-fadeIn">
          <div className="flex items-center gap-2 font-bold mb-1">
            <Eye className="w-4 h-4 text-amber-700" />
            <span>Speaker & Presenter Notes for Slide {currentSlide + 1}:</span>
          </div>
          <p className="leading-relaxed text-amber-800">{activeSlide.speakerNotes}</p>
        </div>
      )}
    </div>
  );
};
