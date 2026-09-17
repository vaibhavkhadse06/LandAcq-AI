import { 
  LandAcquisitionProject, 
  ScopeOfStudyItem, 
  ProjectAlert, 
  ModelMetrics, 
  AuditLogEntry 
} from '../types';

export const SCOPE_OF_STUDY_DATA: ScopeOfStudyItem[] = [
  {
    lifecycleStage: '1. Preliminary Survey & Section 11 Notification',
    statutoryBasis: 'Section 4, Section 11(1) RFCTLARR Act 2013',
    parametersAnalyzed: [
      'Cadastral boundary survey completeness (%)',
      'Revenue record discrepancy rate (RoR)',
      'Gram Sabha / Local consultation meetings completed',
      'Geospatial drone-mapping accuracy index'
    ],
    delayRiskFactors: [
      'Unresolved title lineage & missing mutations',
      'Overlapping forest / tribal land demarcation',
      'Failure to publish gazette notice within 12-month SLA',
      'Public resistance during field survey'
    ],
    predictiveMetrics: [
      'Survey SLA breach probability (%)',
      'Expected Section 11 notification delay (weeks)',
      'Record-of-Rights rectification latency index'
    ],
    aiMitigationCapability: 'Automated discrepancy detection across digitized revenue records; early trigger for special cadastral camp deployment.'
  },
  {
    lifecycleStage: '2. Social Impact Assessment (SIA) & Expert Review',
    statutoryBasis: 'Section 4-9 RFCTLARR Act 2013',
    parametersAnalyzed: [
      'Project-Affected Families (PAFs) & Displaced (PDFs) count',
      'Livelihood impact severity score',
      'SIA agency qualification & appraisal duration',
      'Expert Group recommendation turnaround (days)'
    ],
    delayRiskFactors: [
      'Public hearing quorum failure / boycotts',
      'SIA report rejection or revision cycles',
      'Tribal Panchayats (PESA Act) objections',
      'Delayed baseline socio-economic census'
    ],
    predictiveMetrics: [
      'SIA approval delay likelihood (%)',
      'Public objection escalation score (0-100)',
      'Post-SIA modification cycle probability'
    ],
    aiMitigationCapability: 'Sentiment & objection topic modeling; proactive identification of vulnerable tribal/agricultural pockets for tailored R&R.'
  },
  {
    lifecycleStage: '3. Section 19 Declaration & Land Demarcation',
    statutoryBasis: 'Section 19(1) RFCTLARR Act 2013 (12-Month Rule)',
    parametersAnalyzed: [
      'Time elapsed since Section 11 notification (Days)',
      'Government approval cycle time',
      'Joint measurement survey (JMS) completion %',
      'Pending environmental/wildlife clearances'
    ],
    delayRiskFactors: [
      'Statutory lapse of Sec 11 if Sec 19 not published in 12 months (Total Project Reset)',
      'Inter-departmental boundary disputes',
      'Defense / Railway crossing NOC pending'
    ],
    predictiveMetrics: [
      'Section 11 lapse risk probability (%)',
      'Sec 19 declaration issuance forecast (Weeks)',
      'Statutory deadline margin (Remaining days)'
    ],
    aiMitigationCapability: 'Critical countdown trigger matrix; early warning alerts dispatched to District Magistrate 90/60/30 days before lapse.'
  },
  {
    lifecycleStage: '4. Award Inquiry & Valuation (Sec 23-30)',
    statutoryBasis: 'Section 23, 26-30 RFCTLARR Act 2013',
    parametersAnalyzed: [
      'Market value determination basis (circle rate vs registry)',
      'Solatium (100%) and 12% interest computation parity',
      'Number of claims filed under Section 21',
      'Tree/structure valuation SLA status'
    ],
    delayRiskFactors: [
      'Disputes over circle rate multiplier factor (1.0x to 2.0x)',
      'Contested undivided co-heirship claims',
      'Demand for commercial vs agricultural rate parity'
    ],
    predictiveMetrics: [
      'Award inquiry contestation rate (%)',
      'Valuation appeal probability',
      'Award declaration delay (weeks)'
    ],
    aiMitigationCapability: 'AI-assisted fair-market valuation benchmark analysis using recent sub-registrar transaction clusters to reduce litigation.'
  },
  {
    lifecycleStage: '5. Compensation Disbursement & Escrow Funding',
    statutoryBasis: 'Section 77-80 RFCTLARR Act 2013',
    parametersAnalyzed: [
      'Escrow fund allocation vs total award liability',
      'Direct Benefit Transfer (DBT) verification velocity',
      'Aadhaar/Bank KYC rejection rate',
      'Undisbursed funds deposited with Land Authority'
    ],
    delayRiskFactors: [
      'Implementing agency budget liquidity shortfall',
      'Pending succession certificates in revenue courts',
      'Absentee landowners and unverified power-of-attorney'
    ],
    predictiveMetrics: [
      'Disbursement velocity index (%/month)',
      'Capital escrow deficit forecast (₹ Cr)',
      'Payment bottleneck duration (weeks)'
    ],
    aiMitigationCapability: 'Smart DBT velocity tracking; predictive escrow forecasting ensuring capital is placed 45 days prior to award finalization.'
  },
  {
    lifecycleStage: '6. Possession Taking & Physical Handover',
    statutoryBasis: 'Section 38 RFCTLARR Act 2013',
    parametersAnalyzed: [
      'Continuous linear corridor clearance %',
      'Encumbrance-free contiguous stretch length (km)',
      'Standing crops harvest timeline alignment',
      'High Court / Supreme Court stay order status'
    ],
    delayRiskFactors: [
      'Ex-parte interim stay orders on possession',
      'Encroachments during interregnum',
      'Refusal of physical eviction without R&R readiness'
    ],
    predictiveMetrics: [
      'Linear possession readiness score (%)',
      'Injunction risk index (0-100)',
      'Predicted contractor handover delay (weeks)'
    ],
    aiMitigationCapability: 'Contiguous corridor optimization algorithm identifying critical parcel choke points to prioritize for fast-track negotiation.'
  },
  {
    lifecycleStage: '7. Rehabilitation & Resettlement (R&R) Execution',
    statutoryBasis: 'Section 31-42, Schedule II & III RFCTLARR Act',
    parametersAnalyzed: [
      'Resettlement colony civic infrastructure progress %',
      'Livelihood grant & annuity disbursement status',
      'Alternate agricultural land parcel allotment %',
      'Skill training & job entitlement absorption'
    ],
    delayRiskFactors: [
      'R&R resettlement site acquisition delays',
      'Inadequate amenities triggering civil agitation',
      'Disputes over scheduled tribe/caste special provisions'
    ],
    predictiveMetrics: [
      'R&R compliance lag (weeks)',
      'Community dissatisfaction index',
      'Physical relocation completion forecast'
    ],
    aiMitigationCapability: 'R&R milestone monitor with predictive grievance escalation alerts to prevent community protests.'
  }
];

export const INITIAL_PROJECTS: LandAcquisitionProject[] = [
  {
    id: 'proj-001',
    code: 'NH-EXP-W48-03',
    name: 'Delhi-Mumbai Expressway Package 3B (Vadodara-Bharuch Stretch)',
    sector: 'Highways',
    agency: 'NHAI',
    state: 'Gujarat',
    districts: ['Bharuch', 'Vadodara', 'Navsari'],
    totalLandRequiredHa: 485.4,
    landAcquiredHa: 364.0,
    privateLandPct: 78.5,
    forestTribalLandPct: 12.2,
    affectedFamiliesCount: 1420,
    totalBudgetCr: 3450,
    compensationDisbursedCr: 890,
    compensationAllocatedCr: 1240,
    startDate: '2024-03-15',
    originalTargetDate: '2025-11-30',
    predictedCompletionDate: '2026-06-15',
    predictedDelayWeeks: 28.5,
    delayConfidenceIntervalWeeks: [24.0, 33.2],
    overallRiskScore: 86,
    riskLevel: 'CRITICAL',
    delayProbabilityPct: 91.4,
    currentStage: 'STAGE_5_COMPENSATION_PAY',
    stageProgressPct: 62,
    stages: [
      { id: 'STAGE_1_PRELIM_SURVEY', name: 'Survey & Sec 11', statutoryReference: 'Sec 11(1)', plannedDurationDays: 120, elapsedDays: 110, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 10 },
      { id: 'STAGE_2_SIA_APPROVAL', name: 'SIA & Expert Review', statutoryReference: 'Sec 4-9', plannedDurationDays: 90, elapsedDays: 85, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 15 },
      { id: 'STAGE_3_SEC19_DECLARATION', name: 'Sec 19 Declaration', statutoryReference: 'Sec 19(1)', plannedDurationDays: 180, elapsedDays: 195, status: 'COMPLETED', predictedDelayWeeks: 2.1, delayProbability: 35 },
      { id: 'STAGE_4_VALUATION_AWARD', name: 'Award & Valuation', statutoryReference: 'Sec 23-30', plannedDurationDays: 120, elapsedDays: 150, status: 'COMPLETED', predictedDelayWeeks: 4.3, delayProbability: 60 },
      { id: 'STAGE_5_COMPENSATION_PAY', name: 'Compensation Payment', statutoryReference: 'Sec 77-80', plannedDurationDays: 90, elapsedDays: 165, status: 'DELAYED', predictedDelayWeeks: 12.4, delayProbability: 94, keyBottleneck: 'Severe liquidity delay from central disbursement escrow; 380 bank accounts failed KYC' },
      { id: 'STAGE_6_POSSESSION_HANDOVER', name: 'Possession Handover', statutoryReference: 'Sec 38', plannedDurationDays: 60, elapsedDays: 0, status: 'NOT_STARTED', predictedDelayWeeks: 6.8, delayProbability: 88, keyBottleneck: 'Contiguous 14km stretch blocked due to unpaid agrarian parcels' },
      { id: 'STAGE_7_RR_EXECUTION', name: 'R&R Resettlement', statutoryReference: 'Sec 31-42', plannedDurationDays: 120, elapsedDays: 45, status: 'IN_PROGRESS', predictedDelayWeeks: 3.0, delayProbability: 52 }
    ],
    topDelayDrivers: [
      { feature: 'Compensation Escrow Disbursement Velocity', category: 'Financial', impactPercentage: 34, direction: 'INCREASES_RISK', description: 'Disbursement pace is 42% below statutory schedule due to escrow reconciliation backlogs.' },
      { feature: 'High Court Interim Stay on 42 Parcels', category: 'Legal', impactPercentage: 26, direction: 'INCREASES_RISK', description: 'Writ petition on circle rate multiplier pending in Gujarat High Court (WP 11842/2025).' },
      { feature: 'Forest Stage-II MoEFCC Clearance Latency', category: 'Environmental', impactPercentage: 18, direction: 'INCREASES_RISK', description: 'Tree felling and compensatory afforestation land handover pending with State Forest Dept.' },
      { feature: 'Digitized RoR Cadastral Mapping', category: 'Administrative', impactPercentage: 12, direction: 'REDUCES_RISK', description: 'Pre-digitized revenue records reduced boundary survey errors by 65%.' }
    ],
    legalDisputes: [
      { caseNumber: 'WP-GUJ-11842/2025', court: 'Gujarat High Court', issue: 'Landowners challenging rural multiplier factor (demanding 2.0x instead of 1.25x)', filingDate: '2025-01-14', status: 'STAY_ORDER_ACTIVE', parcelsAffectedCount: 42, financialImpactCr: 68.5 },
      { caseNumber: 'ARB-REV-409/2024', court: 'District Arbitration Tribunal', issue: 'Apportionment dispute between co-parceners on ancestral khata 189', filingDate: '2024-11-20', status: 'PENDING_HEARING', parcelsAffectedCount: 12, financialImpactCr: 14.2 }
    ],
    clearances: [
      { department: 'Ministry of Environment, Forest & Climate Change', type: 'Forest Clearance Stage-II', submissionDate: '2024-05-10', slaDays: 150, daysPending: 245, status: 'ESCALATED', officerInCharge: 'Chief Conservator of Forests, Vadodara Circle' },
      { department: 'Western Railway', type: 'ROB/RUB Superstructure GAD Approval', submissionDate: '2024-08-01', slaDays: 90, daysPending: 130, status: 'IN_REVIEW', officerInCharge: 'Divisional Railway Manager, Vadodara' },
      { department: 'Gujarat Energy Transmission (GETCO)', type: '400kV Line Shifting Consent', submissionDate: '2024-09-12', slaDays: 60, daysPending: 48, status: 'APPROVED', officerInCharge: 'Superintending Engineer, GETCO' }
    ],
    parcels: [
      { surveyNumber: 'SY-104/A', village: 'Padra', district: 'Vadodara', areaHectares: 8.4, classification: 'Private Agricultural', affectedFamilyCount: 14, possessionStatus: 'DISPUTED', riskScore: 92, coordinates: [22.241, 73.084] },
      { surveyNumber: 'SY-105/B', village: 'Padra', district: 'Vadodara', areaHectares: 6.2, classification: 'Private Agricultural', affectedFamilyCount: 9, possessionStatus: 'DISPUTED', riskScore: 89, coordinates: [22.245, 73.090] },
      { surveyNumber: 'SY-218/1', village: 'Karjan', district: 'Vadodara', areaHectares: 14.5, classification: 'Private Agricultural', affectedFamilyCount: 22, possessionStatus: 'IN_PROGRESS', riskScore: 78, coordinates: [22.052, 73.125] },
      { surveyNumber: 'SY-302', village: 'Amod', district: 'Bharuch', areaHectares: 21.0, classification: 'Forest/Tribal', affectedFamilyCount: 0, possessionStatus: 'NOT_STARTED', riskScore: 94, coordinates: [21.998, 72.885] },
      { surveyNumber: 'SY-44', village: 'Ankleshwar', district: 'Bharuch', areaHectares: 12.0, classification: 'Government Revenue', affectedFamilyCount: 0, possessionStatus: 'ACQUIRED', riskScore: 18, coordinates: [21.626, 73.001] }
    ],
    coordinates: [22.18, 73.05],
    lastUpdated: '2026-08-25T14:30:00Z',
    laoOfficerName: 'Shri Rajesh K. Patel (IAS), SLAO Vadodara',
    laoContact: '+91-265-2420199',
    aiRecommendations: [
      'Authorize interim deposit of 80% undisputed compensation into District Registrar Escrow under Sec 77(2) to vacate High Court stay.',
      'Convene joint fast-track revenue camp in Padra & Karjan talukas with Lead Bank District Manager to resolve 380 KYC rejections in 7 days.',
      'Escalate Forest Stage-II tree felling permit directly to State Empowered Committee under Chief Secretary review.'
    ]
  },
  {
    id: 'proj-002',
    code: 'HSR-MAH-MUM-AHM-01',
    name: 'Mumbai-Ahmedabad High Speed Rail (Palghar-Dahanu Section)',
    sector: 'High-Speed Rail',
    agency: 'NHSRCL',
    state: 'Maharashtra',
    districts: ['Palghar', 'Thane'],
    totalLandRequiredHa: 312.8,
    landAcquiredHa: 278.4,
    privateLandPct: 64.0,
    forestTribalLandPct: 31.5,
    affectedFamiliesCount: 2840,
    totalBudgetCr: 8900,
    compensationDisbursedCr: 2450,
    compensationAllocatedCr: 2800,
    startDate: '2023-09-01',
    originalTargetDate: '2025-08-15',
    predictedCompletionDate: '2026-03-30',
    predictedDelayWeeks: 32.0,
    delayConfidenceIntervalWeeks: [28.5, 36.4],
    overallRiskScore: 92,
    riskLevel: 'CRITICAL',
    delayProbabilityPct: 95.8,
    currentStage: 'STAGE_6_POSSESSION_HANDOVER',
    stageProgressPct: 78,
    stages: [
      { id: 'STAGE_1_PRELIM_SURVEY', name: 'Survey & Sec 11', statutoryReference: 'Sec 11(1)', plannedDurationDays: 180, elapsedDays: 210, status: 'COMPLETED', predictedDelayWeeks: 4.2, delayProbability: 40 },
      { id: 'STAGE_2_SIA_APPROVAL', name: 'SIA & Expert Review', statutoryReference: 'Sec 4-9', plannedDurationDays: 120, elapsedDays: 145, status: 'COMPLETED', predictedDelayWeeks: 3.5, delayProbability: 50 },
      { id: 'STAGE_3_SEC19_DECLARATION', name: 'Sec 19 Declaration', statutoryReference: 'Sec 19(1)', plannedDurationDays: 150, elapsedDays: 160, status: 'COMPLETED', predictedDelayWeeks: 1.4, delayProbability: 30 },
      { id: 'STAGE_4_VALUATION_AWARD', name: 'Award & Valuation', statutoryReference: 'Sec 23-30', plannedDurationDays: 120, elapsedDays: 180, status: 'COMPLETED', predictedDelayWeeks: 8.5, delayProbability: 75 },
      { id: 'STAGE_5_COMPENSATION_PAY', name: 'Compensation Payment', statutoryReference: 'Sec 77-80', plannedDurationDays: 90, elapsedDays: 110, status: 'COMPLETED', predictedDelayWeeks: 2.8, delayProbability: 40 },
      { id: 'STAGE_6_POSSESSION_HANDOVER', name: 'Possession Handover', statutoryReference: 'Sec 38', plannedDurationDays: 90, elapsedDays: 140, status: 'DELAYED', predictedDelayWeeks: 11.6, delayProbability: 92, keyBottleneck: 'PESA Gram Sabha resolutions pending in 8 tribal hamlets resisting physical survey' },
      { id: 'STAGE_7_RR_EXECUTION', name: 'R&R Resettlement', statutoryReference: 'Sec 31-42', plannedDurationDays: 180, elapsedDays: 120, status: 'DELAYED', predictedDelayWeeks: 8.0, delayProbability: 84, keyBottleneck: 'Tribal community resettlement layout pending environmental clearance' }
    ],
    topDelayDrivers: [
      { feature: 'Tribal Land PESA Act Gram Sabha Approvals', category: 'Social', impactPercentage: 38, direction: 'INCREASES_RISK', description: '8 scheduled-area tribal panchayats have withheld consent regarding community land restitution.' },
      { feature: 'Mangrove & Coastal Regulation Zone (CRZ) Clearances', category: 'Environmental', impactPercentage: 28, direction: 'INCREASES_RISK', description: 'Bombay High Court compliance monitoring for mangrove cutting compensation afforestation.' },
      { feature: 'High Financial Incentive Scheme (25% Bonus)', category: 'Financial', impactPercentage: 16, direction: 'REDUCES_RISK', description: 'Consent award bonus accelerated private consent rates in non-tribal pockets.' },
      { feature: 'Pending R&R Colony Site Readiness', category: 'R&R', impactPercentage: 18, direction: 'INCREASES_RISK', description: 'Civic amenities in 2 alternate resettlement townships in Dahanu only 40% constructed.' }
    ],
    legalDisputes: [
      { caseNumber: 'PIL-BOM-884/2024', court: 'Bombay High Court', issue: 'Mangrove preservation petition affecting 14.8 hectares in Thane creek buffer', filingDate: '2024-04-12', status: 'STAY_ORDER_ACTIVE', parcelsAffectedCount: 18, financialImpactCr: 145.0 },
      { caseNumber: 'PESA-TRIB-09/2025', court: 'Divisional Commissioner Konkan', issue: 'Challenge to Gram Sabha notification procedure under PESA Act', filingDate: '2025-02-02', status: 'PENDING_HEARING', parcelsAffectedCount: 31, financialImpactCr: 42.0 }
    ],
    clearances: [
      { department: 'Maharashtra Coastal Zone Management Authority (MCZMA)', type: 'CRZ-I Environmental Clearance', submissionDate: '2024-02-18', slaDays: 120, daysPending: 290, status: 'ESCALATED', officerInCharge: 'Member Secretary, MCZMA Mumbai' },
      { department: 'Ministry of Tribal Affairs', type: 'Forest Rights Act (FRA) Certificate', submissionDate: '2024-06-25', slaDays: 90, daysPending: 185, status: 'OBJECTION_RAISED', officerInCharge: 'Project Officer, ITDP Dahanu' }
    ],
    parcels: [
      { surveyNumber: 'SY-88/2', village: 'Manor', district: 'Palghar', areaHectares: 11.2, classification: 'Forest/Tribal', affectedFamilyCount: 45, possessionStatus: 'DISPUTED', riskScore: 96, coordinates: [19.742, 72.912] },
      { surveyNumber: 'SY-94/1', village: 'Dahanu Road', district: 'Palghar', areaHectares: 9.8, classification: 'Forest/Tribal', affectedFamilyCount: 38, possessionStatus: 'DISPUTED', riskScore: 94, coordinates: [19.980, 72.740] },
      { surveyNumber: 'SY-120', village: 'Boisar', district: 'Palghar', areaHectares: 15.0, classification: 'Private Agricultural', affectedFamilyCount: 20, possessionStatus: 'IN_PROGRESS', riskScore: 72, coordinates: [19.802, 72.756] }
    ],
    coordinates: [19.85, 72.82],
    lastUpdated: '2026-08-26T10:15:00Z',
    laoOfficerName: 'Smt. Ananya S. Kulkarni (IAS), Collector Palghar',
    laoContact: '+91-2525-251001',
    aiRecommendations: [
      'Trigger Special PESA Reconciliation Committee with Tribal Development Department and local Gram Pradhans with enhanced community asset fund.',
      'File urgent affidavit before Bombay High Court demonstrating 1:5 compensatory mangrove plantation completion at Vaitarna estuary.',
      'Deploy turnkey pre-fabricated construction contractor for Dahanu R&R Township to compress delivery timeline by 60 days.'
    ]
  },
  {
    id: 'proj-003',
    code: 'DFC-EAST-PKG-204',
    name: 'Eastern Dedicated Freight Corridor (Sonnagar-Dankuni Section)',
    sector: 'Dedicated Freight Corridor',
    agency: 'DFCCIL',
    state: 'West Bengal',
    districts: ['Hooghly', 'Purba Bardhaman', 'Paschim Bardhaman'],
    totalLandRequiredHa: 540.2,
    landAcquiredHa: 410.5,
    privateLandPct: 82.0,
    forestTribalLandPct: 5.0,
    affectedFamiliesCount: 4120,
    totalBudgetCr: 4800,
    compensationDisbursedCr: 1180,
    compensationAllocatedCr: 1650,
    startDate: '2023-11-10',
    originalTargetDate: '2025-12-31',
    predictedCompletionDate: '2026-05-20',
    predictedDelayWeeks: 20.2,
    delayConfidenceIntervalWeeks: [16.5, 24.1],
    overallRiskScore: 74,
    riskLevel: 'HIGH',
    delayProbabilityPct: 82.5,
    currentStage: 'STAGE_4_VALUATION_AWARD',
    stageProgressPct: 54,
    stages: [
      { id: 'STAGE_1_PRELIM_SURVEY', name: 'Survey & Sec 11', statutoryReference: 'Sec 11(1)', plannedDurationDays: 120, elapsedDays: 130, status: 'COMPLETED', predictedDelayWeeks: 1.4, delayProbability: 20 },
      { id: 'STAGE_2_SIA_APPROVAL', name: 'SIA & Expert Review', statutoryReference: 'Sec 4-9', plannedDurationDays: 90, elapsedDays: 105, status: 'COMPLETED', predictedDelayWeeks: 2.1, delayProbability: 30 },
      { id: 'STAGE_3_SEC19_DECLARATION', name: 'Sec 19 Declaration', statutoryReference: 'Sec 19(1)', plannedDurationDays: 180, elapsedDays: 200, status: 'COMPLETED', predictedDelayWeeks: 2.8, delayProbability: 40 },
      { id: 'STAGE_4_VALUATION_AWARD', name: 'Award & Valuation', statutoryReference: 'Sec 23-30', plannedDurationDays: 120, elapsedDays: 140, status: 'DELAYED', predictedDelayWeeks: 7.2, delayProbability: 80, keyBottleneck: 'Severe land record fragmentation (average parcel size 0.08 Ha) with 2,400 co-sharers' },
      { id: 'STAGE_5_COMPENSATION_PAY', name: 'Compensation Payment', statutoryReference: 'Sec 77-80', plannedDurationDays: 90, elapsedDays: 20, status: 'IN_PROGRESS', predictedDelayWeeks: 5.5, delayProbability: 68 },
      { id: 'STAGE_6_POSSESSION_HANDOVER', name: 'Possession Handover', statutoryReference: 'Sec 38', plannedDurationDays: 90, elapsedDays: 0, status: 'NOT_STARTED', predictedDelayWeeks: 4.0, delayProbability: 55 },
      { id: 'STAGE_7_RR_EXECUTION', name: 'R&R Resettlement', statutoryReference: 'Sec 31-42', plannedDurationDays: 120, elapsedDays: 0, status: 'NOT_STARTED', predictedDelayWeeks: 1.0, delayProbability: 25 }
    ],
    topDelayDrivers: [
      { feature: 'Micro-Parcel Fragmentation & Co-Sharer Disputes', category: 'Administrative', impactPercentage: 32, direction: 'INCREASES_RISK', description: 'Over 2,400 undivided co-heir titles across 1,800 micro-plots under 0.1 hectare.' },
      { feature: 'Direct Purchase Consent Package Under State Policy', category: 'Financial', impactPercentage: 20, direction: 'REDUCES_RISK', description: 'WB Land Purchase Scheme allows direct negotiated settlement without full litigation.' },
      { feature: 'High Title Inheritance Mutation Backlog in Block Offices', category: 'Administrative', impactPercentage: 24, direction: 'INCREASES_RISK', description: 'Block Land & Land Reforms Offices (BL&LRO) have 1,100 pending mutation petitions.' }
    ],
    legalDisputes: [
      { caseNumber: 'CAL-HC-3921/2024', court: 'Calcutta High Court', issue: 'Writ challenging valuation of multi-crop agricultural land classified as boro paddy', filingDate: '2024-08-19', status: 'PENDING_HEARING', parcelsAffectedCount: 24, financialImpactCr: 21.0 }
    ],
    clearances: [
      { department: 'Eastern Railway', type: 'Level Crossing Replacement Agreement', submissionDate: '2024-04-10', slaDays: 90, daysPending: 160, status: 'IN_REVIEW', officerInCharge: 'Chief Engineer (Const), Eastern Railway' },
      { department: 'State Water Resources Dept', type: 'Irrigation Canal Crossing NOC', submissionDate: '2024-07-02', slaDays: 60, daysPending: 50, status: 'APPROVED', officerInCharge: 'Executive Engineer, DVC Canal Div' }
    ],
    parcels: [
      { surveyNumber: 'LR-412', village: 'Dankuni', district: 'Hooghly', areaHectares: 4.8, classification: 'Private Agricultural', affectedFamilyCount: 34, possessionStatus: 'IN_PROGRESS', riskScore: 78, coordinates: [22.685, 88.291] },
      { surveyNumber: 'LR-890', village: 'Memari', district: 'Purba Bardhaman', areaHectares: 12.4, classification: 'Private Agricultural', affectedFamilyCount: 52, possessionStatus: 'IN_PROGRESS', riskScore: 72, coordinates: [23.189, 88.115] }
    ],
    coordinates: [22.95, 88.20],
    lastUpdated: '2026-08-27T08:00:00Z',
    laoOfficerName: 'Shri Soumitra Banerjee (WBCS), SLAO Hooghly',
    laoContact: '+91-33-26802144',
    aiRecommendations: [
      'Mobilize Special BL&LRO Mobile Lok Adalat camps in 6 key blocks to fast-track undivided family mutations within 14 days.',
      'Deploy direct settlement purchase scheme with upfront 10% voluntary registration incentive.',
      'Form joint DVC canal & railway clearance taskforce with weekly Chief Secretary monitoring.'
    ]
  },
  {
    id: 'proj-004',
    code: 'METRO-BLR-PH2B-04',
    name: 'Bengaluru Metro Phase 2B (Airport Blue Line - Hebbal to KIA)',
    sector: 'Metro Rail',
    agency: 'BMRCL',
    state: 'Karnataka',
    districts: ['Bengaluru Urban', 'Bengaluru Rural'],
    totalLandRequiredHa: 124.6,
    landAcquiredHa: 108.2,
    privateLandPct: 45.0,
    forestTribalLandPct: 0.0,
    affectedFamiliesCount: 680,
    totalBudgetCr: 10500,
    compensationDisbursedCr: 1850,
    compensationAllocatedCr: 2100,
    startDate: '2023-04-01',
    originalTargetDate: '2025-06-30',
    predictedCompletionDate: '2025-11-15',
    predictedDelayWeeks: 19.5,
    delayConfidenceIntervalWeeks: [16.0, 23.0],
    overallRiskScore: 68,
    riskLevel: 'HIGH',
    delayProbabilityPct: 76.0,
    currentStage: 'STAGE_5_COMPENSATION_PAY',
    stageProgressPct: 74,
    stages: [
      { id: 'STAGE_1_PRELIM_SURVEY', name: 'Survey & Sec 11', statutoryReference: 'KIADB Sec 28(1)', plannedDurationDays: 90, elapsedDays: 80, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 10 },
      { id: 'STAGE_2_SIA_APPROVAL', name: 'SIA & Expert Review', statutoryReference: 'Exempted/BMRCL', plannedDurationDays: 60, elapsedDays: 60, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 10 },
      { id: 'STAGE_3_SEC19_DECLARATION', name: 'Sec 19 / Final Notif', statutoryReference: 'KIADB Sec 28(4)', plannedDurationDays: 120, elapsedDays: 130, status: 'COMPLETED', predictedDelayWeeks: 1.4, delayProbability: 25 },
      { id: 'STAGE_4_VALUATION_AWARD', name: 'Award & Valuation', statutoryReference: 'KIADB Sec 29', plannedDurationDays: 90, elapsedDays: 110, status: 'COMPLETED', predictedDelayWeeks: 2.8, delayProbability: 40 },
      { id: 'STAGE_5_COMPENSATION_PAY', name: 'Compensation Payment', statutoryReference: 'KIADB Sec 29(2)', plannedDurationDays: 60, elapsedDays: 95, status: 'DELAYED', predictedDelayWeeks: 8.5, delayProbability: 82, keyBottleneck: 'Commercial frontage property owners in Yelahanka disputing TDR vs cash compensation ratio' },
      { id: 'STAGE_6_POSSESSION_HANDOVER', name: 'Possession Handover', statutoryReference: 'Sec 28(8)', plannedDurationDays: 60, elapsedDays: 15, status: 'IN_PROGRESS', predictedDelayWeeks: 6.8, delayProbability: 70 },
      { id: 'STAGE_7_RR_EXECUTION', name: 'R&R Resettlement', statutoryReference: 'BMRCL Policy', plannedDurationDays: 90, elapsedDays: 30, status: 'IN_PROGRESS', predictedDelayWeeks: 0, delayProbability: 20 }
    ],
    topDelayDrivers: [
      { feature: 'Commercial Frontage Valuation Dispute & TDR Acceptance', category: 'Financial', impactPercentage: 36, direction: 'INCREASES_RISK', description: 'High-value highway commercial establishments rejecting Transferable Development Rights (TDR) and demanding 100% upfront cash payout.' },
      { feature: 'Defense Land Transfer Protocol (Yelahanka Air Base)', category: 'Administrative', impactPercentage: 26, direction: 'INCREASES_RISK', description: 'Ministry of Defence working permission approval pending Cabinet Committee on Security nod.' },
      { feature: 'Single-Window KIADB Statutory Acquisition Powers', category: 'Administrative', impactPercentage: 22, direction: 'REDUCES_RISK', description: 'Karnataka Industrial Area Development Board fast-track summary inquiry powers.' }
    ],
    legalDisputes: [
      { caseNumber: 'WP-KAR-19402/2024', court: 'Karnataka High Court', issue: 'Challenge to setback acquisition without full plot acquisition compensation', filingDate: '2024-09-04', status: 'STAY_ORDER_ACTIVE', parcelsAffectedCount: 8, financialImpactCr: 94.0 }
    ],
    clearances: [
      { department: 'Ministry of Defence / Indian Air Force', type: 'Working Permission for Yelahanka Air Base perimeter (4.2 Ha)', submissionDate: '2024-03-10', slaDays: 120, daysPending: 220, status: 'ESCALATED', officerInCharge: 'Air Officer Commanding, Air Force Station Yelahanka' },
      { department: 'National Highways Authority of India (NHAI)', type: 'Flyover Pier Integration NOC on NH-44', submissionDate: '2024-06-15', slaDays: 60, daysPending: 55, status: 'APPROVED', officerInCharge: 'Project Director, NHAI Bengaluru' }
    ],
    parcels: [
      { surveyNumber: 'SY-44/1', village: 'Hebbal', district: 'Bengaluru Urban', areaHectares: 2.1, classification: 'Private Commercial', affectedFamilyCount: 18, possessionStatus: 'ACQUIRED', riskScore: 25, coordinates: [13.035, 77.597] },
      { surveyNumber: 'SY-112', village: 'Yelahanka', district: 'Bengaluru Urban', areaHectares: 5.4, classification: 'Private Commercial', affectedFamilyCount: 42, possessionStatus: 'DISPUTED', riskScore: 88, coordinates: [13.100, 77.596] },
      { surveyNumber: 'SY-80', village: 'Chikkajala', district: 'Bengaluru Rural', areaHectares: 8.2, classification: 'Private Agricultural', affectedFamilyCount: 12, possessionStatus: 'IN_PROGRESS', riskScore: 45, coordinates: [13.185, 77.625] }
    ],
    coordinates: [13.12, 77.61],
    lastUpdated: '2026-08-27T11:45:00Z',
    laoOfficerName: 'Dr. Ramesh K. (KAS), General Manager (Land), BMRCL',
    laoContact: '+91-80-22968500',
    aiRecommendations: [
      'Offer revised cash-and-TDR hybrid package with 1.5x circle rate for Yelahanka commercial frontage owners.',
      'Initiate Chief Secretary level intervention with MoD for conditional working permission with equal-value land swap.',
      'Segment contractor mobilization to deliver civil works on encumbrance-free 78% stretch immediately.'
    ]
  },
  {
    id: 'proj-005',
    code: 'IND-CORR-DMIC-DHOLERA-02',
    name: 'Dholera Special Investment Region (SIR) Expressway & Trunk Infra',
    sector: 'Industrial Corridor',
    agency: 'NICDC / DSIRDA',
    state: 'Gujarat',
    districts: ['Ahmedabad', 'Botad'],
    totalLandRequiredHa: 920.0,
    landAcquiredHa: 875.0,
    privateLandPct: 52.0,
    forestTribalLandPct: 0.0,
    affectedFamiliesCount: 940,
    totalBudgetCr: 5200,
    compensationDisbursedCr: 1420,
    compensationAllocatedCr: 1450,
    startDate: '2022-08-15',
    originalTargetDate: '2025-03-31',
    predictedCompletionDate: '2025-05-15',
    predictedDelayWeeks: 6.2,
    delayConfidenceIntervalWeeks: [4.0, 8.5],
    overallRiskScore: 28,
    riskLevel: 'LOW',
    delayProbabilityPct: 22.0,
    currentStage: 'STAGE_6_POSSESSION_HANDOVER',
    stageProgressPct: 94,
    stages: [
      { id: 'STAGE_1_PRELIM_SURVEY', name: 'Survey & Sec 11', statutoryReference: 'GTP & UD Act TP Scheme', plannedDurationDays: 90, elapsedDays: 85, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 5 },
      { id: 'STAGE_2_SIA_APPROVAL', name: 'SIA & Expert Review', statutoryReference: 'Sec 4-9', plannedDurationDays: 60, elapsedDays: 60, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 5 },
      { id: 'STAGE_3_SEC19_DECLARATION', name: 'Sec 19 Declaration', statutoryReference: 'Sec 19(1)', plannedDurationDays: 120, elapsedDays: 110, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 10 },
      { id: 'STAGE_4_VALUATION_AWARD', name: 'Award & Valuation', statutoryReference: 'Town Planning Model', plannedDurationDays: 90, elapsedDays: 80, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 10 },
      { id: 'STAGE_5_COMPENSATION_PAY', name: 'Compensation Payment', statutoryReference: 'Sec 77-80', plannedDurationDays: 60, elapsedDays: 60, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 10 },
      { id: 'STAGE_6_POSSESSION_HANDOVER', name: 'Possession Handover', statutoryReference: 'Sec 38', plannedDurationDays: 60, elapsedDays: 50, status: 'IN_PROGRESS', predictedDelayWeeks: 6.2, delayProbability: 25, keyBottleneck: 'Final 45 hectares saline wasteland physical possession survey underway' },
      { id: 'STAGE_7_RR_EXECUTION', name: 'R&R Resettlement', statutoryReference: 'DSIRDA Policy', plannedDurationDays: 90, elapsedDays: 80, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 5 }
    ],
    topDelayDrivers: [
      { feature: 'Town Planning (TP) Land Pooling Mechanism', category: 'Administrative', impactPercentage: 42, direction: 'REDUCES_RISK', description: 'Land reconstitution and 50% developed plot return model minimized farmer resistance.' },
      { feature: 'High Government Revenue Land Component (48%)', category: 'Administrative', impactPercentage: 28, direction: 'REDUCES_RISK', description: 'Direct inter-department transfer eliminated protracted private acquisition proceedings.' },
      { feature: 'Coastal Saline Soil Demarcation Adjustment', category: 'Environmental', impactPercentage: 14, direction: 'INCREASES_RISK', description: 'Tidal creek buffer zoning requiring minor boundary re-alignment.' }
    ],
    legalDisputes: [],
    clearances: [
      { department: 'Gujarat Pollution Control Board (GPCB)', type: 'Consolidated Environmental Consent', submissionDate: '2024-01-10', slaDays: 60, daysPending: 45, status: 'APPROVED', officerInCharge: 'Member Secretary, GPCB Gandhinagar' }
    ],
    parcels: [
      { surveyNumber: 'TP-1/P-101', village: 'Dholera', district: 'Ahmedabad', areaHectares: 120.0, classification: 'Government Revenue', affectedFamilyCount: 0, possessionStatus: 'ACQUIRED', riskScore: 12, coordinates: [22.250, 72.190] },
      { surveyNumber: 'TP-2/P-88', village: 'Bhangadh', district: 'Ahmedabad', areaHectares: 45.0, classification: 'Government Revenue', affectedFamilyCount: 0, possessionStatus: 'IN_PROGRESS', riskScore: 28, coordinates: [22.290, 72.230] }
    ],
    coordinates: [22.24, 72.20],
    lastUpdated: '2026-08-27T09:00:00Z',
    laoOfficerName: 'Shri J. P. Trivedi (GAS), Additional Collector DSIRDA',
    laoContact: '+91-79-23241500',
    aiRecommendations: [
      'Complete final 45 Ha demarcation survey within 10 days to achieve 100% encumbrance-free handover.',
      'Maintain automated digital land registry synchronization for continuous title integrity.'
    ]
  },
  {
    id: 'proj-006',
    code: 'RE-SOLAR-BHADLA-PH3',
    name: 'Bhadla Mega Ultra Solar Park Expansion Phase III (1500 MW)',
    sector: 'Renewable Energy',
    agency: 'SECI / RSDCL',
    state: 'Rajasthan',
    districts: ['Jodhpur', 'Bikaner', 'Jaisalmer'],
    totalLandRequiredHa: 1850.0,
    landAcquiredHa: 1420.0,
    privateLandPct: 15.0,
    forestTribalLandPct: 0.0,
    affectedFamiliesCount: 180,
    totalBudgetCr: 6200,
    compensationDisbursedCr: 210,
    compensationAllocatedCr: 240,
    startDate: '2024-01-10',
    originalTargetDate: '2025-09-30',
    predictedCompletionDate: '2026-02-15',
    predictedDelayWeeks: 19.8,
    delayConfidenceIntervalWeeks: [16.2, 23.5],
    overallRiskScore: 64,
    riskLevel: 'MODERATE',
    delayProbabilityPct: 71.5,
    currentStage: 'STAGE_3_SEC19_DECLARATION',
    stageProgressPct: 48,
    stages: [
      { id: 'STAGE_1_PRELIM_SURVEY', name: 'Survey & Sec 11', statutoryReference: 'Rajasthan Land Rev Act', plannedDurationDays: 90, elapsedDays: 90, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 10 },
      { id: 'STAGE_2_SIA_APPROVAL', name: 'SIA & Expert Review', statutoryReference: 'Sec 4-9 Exempted', plannedDurationDays: 45, elapsedDays: 45, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 10 },
      { id: 'STAGE_3_SEC19_DECLARATION', name: 'Sec 19 Declaration', statutoryReference: 'Sec 19(1)', plannedDurationDays: 120, elapsedDays: 160, status: 'DELAYED', predictedDelayWeeks: 9.5, delayProbability: 78, keyBottleneck: 'Supreme Court Great Indian Bustard (GIB) priority area underground cabling clearance mandate' },
      { id: 'STAGE_4_VALUATION_AWARD', name: 'Award & Valuation', statutoryReference: 'Sec 23-30', plannedDurationDays: 60, elapsedDays: 0, status: 'NOT_STARTED', predictedDelayWeeks: 3.5, delayProbability: 40 },
      { id: 'STAGE_5_COMPENSATION_PAY', name: 'Compensation Payment', statutoryReference: 'Sec 77-80', plannedDurationDays: 60, elapsedDays: 0, status: 'NOT_STARTED', predictedDelayWeeks: 2.0, delayProbability: 25 },
      { id: 'STAGE_6_POSSESSION_HANDOVER', name: 'Possession Handover', statutoryReference: 'Sec 38', plannedDurationDays: 60, elapsedDays: 0, status: 'NOT_STARTED', predictedDelayWeeks: 4.8, delayProbability: 60 },
      { id: 'STAGE_7_RR_EXECUTION', name: 'R&R Resettlement', statutoryReference: 'Sec 31-42', plannedDurationDays: 60, elapsedDays: 0, status: 'NOT_STARTED', predictedDelayWeeks: 0, delayProbability: 5 }
    ],
    topDelayDrivers: [
      { feature: 'Supreme Court GIB Committee Underground Transmission Clearance', category: 'Environmental', impactPercentage: 44, direction: 'INCREASES_RISK', description: 'Mandatory technical appraisal by SC-appointed High Powered Committee for GIB bird diverters and cable routing.' },
      { feature: 'Government Siwaychak (Wasteland) Direct Allotment', category: 'Administrative', impactPercentage: 30, direction: 'REDUCES_RISK', description: '85% land is unencumbered desert wasteland owned by State Revenue Dept.' },
      { feature: 'Grazing Rights (Gauchar) Gram Panchayat Objections', category: 'Social', impactPercentage: 18, direction: 'INCREASES_RISK', description: 'Traditional pastoralists demanding compensatory pasture land allotment.' }
    ],
    legalDisputes: [
      { caseNumber: 'SC-WP-838/2023', court: 'Supreme Court of India', issue: 'Protection of Great Indian Bustard habitat & mandatory power line undergrounding', filingDate: '2023-05-12', status: 'STAY_ORDER_ACTIVE', parcelsAffectedCount: 65, financialImpactCr: 210.0 }
    ],
    clearances: [
      { department: 'Supreme Court GIB High Powered Committee', type: 'Overhead Line Transmission Clearance', submissionDate: '2024-04-15', slaDays: 90, daysPending: 210, status: 'ESCALATED', officerInCharge: 'Nodal Officer, GIB Committee Jodhpur' }
    ],
    parcels: [
      { surveyNumber: 'KH-140/9', village: 'Bhadla', district: 'Jodhpur', areaHectares: 450.0, classification: 'Government Revenue', affectedFamilyCount: 0, possessionStatus: 'ACQUIRED', riskScore: 15, coordinates: [27.532, 71.915] },
      { surveyNumber: 'KH-204/1', village: 'Bap', district: 'Jodhpur', areaHectares: 280.0, classification: 'Government Revenue', affectedFamilyCount: 8, possessionStatus: 'DISPUTED', riskScore: 82, coordinates: [27.380, 72.350] }
    ],
    coordinates: [27.53, 71.92],
    lastUpdated: '2026-08-26T15:10:00Z',
    laoOfficerName: 'Shri Vikram S. Rathore (RAS), Land Officer RSDCL',
    laoContact: '+91-291-2651140',
    aiRecommendations: [
      'Submit revised optical GIB bird-diverter technical specifications directly to Supreme Court Committee.',
      'Allot 200 Ha alternative irrigated fodder land to Bap Gram Panchayat to resolve pastoralist objections.'
    ]
  },
  {
    id: 'proj-007',
    code: 'PORT-VIZAG-RAIL-01',
    name: 'Visakhapatnam Port Dedicated Rail Evacuation Corridor',
    sector: 'Port Connectivity',
    agency: 'Visakhapatnam Port Authority / MoPSW',
    state: 'Andhra Pradesh',
    districts: ['Visakhapatnam', 'Anakapalli'],
    totalLandRequiredHa: 168.4,
    landAcquiredHa: 112.0,
    privateLandPct: 62.0,
    forestTribalLandPct: 8.0,
    affectedFamiliesCount: 1150,
    totalBudgetCr: 1850,
    compensationDisbursedCr: 410,
    compensationAllocatedCr: 620,
    startDate: '2024-02-01',
    originalTargetDate: '2025-10-31',
    predictedCompletionDate: '2026-04-15',
    predictedDelayWeeks: 23.5,
    delayConfidenceIntervalWeeks: [19.0, 27.8],
    overallRiskScore: 78,
    riskLevel: 'HIGH',
    delayProbabilityPct: 84.2,
    currentStage: 'STAGE_4_VALUATION_AWARD',
    stageProgressPct: 58,
    stages: [
      { id: 'STAGE_1_PRELIM_SURVEY', name: 'Survey & Sec 11', statutoryReference: 'Sec 11(1)', plannedDurationDays: 90, elapsedDays: 95, status: 'COMPLETED', predictedDelayWeeks: 0.7, delayProbability: 15 },
      { id: 'STAGE_2_SIA_APPROVAL', name: 'SIA & Expert Review', statutoryReference: 'Sec 4-9', plannedDurationDays: 90, elapsedDays: 110, status: 'COMPLETED', predictedDelayWeeks: 2.8, delayProbability: 35 },
      { id: 'STAGE_3_SEC19_DECLARATION', name: 'Sec 19 Declaration', statutoryReference: 'Sec 19(1)', plannedDurationDays: 150, elapsedDays: 175, status: 'COMPLETED', predictedDelayWeeks: 3.5, delayProbability: 45 },
      { id: 'STAGE_4_VALUATION_AWARD', name: 'Award & Valuation', statutoryReference: 'Sec 23-30', plannedDurationDays: 120, elapsedDays: 145, status: 'DELAYED', predictedDelayWeeks: 9.0, delayProbability: 86, keyBottleneck: 'CRZ buffer fishing community settlement demanding permanent harbor berth employment' },
      { id: 'STAGE_5_COMPENSATION_PAY', name: 'Compensation Payment', statutoryReference: 'Sec 77-80', plannedDurationDays: 90, elapsedDays: 20, status: 'IN_PROGRESS', predictedDelayWeeks: 4.5, delayProbability: 60 },
      { id: 'STAGE_6_POSSESSION_HANDOVER', name: 'Possession Handover', statutoryReference: 'Sec 38', plannedDurationDays: 60, elapsedDays: 0, status: 'NOT_STARTED', predictedDelayWeeks: 3.0, delayProbability: 40 },
      { id: 'STAGE_7_RR_EXECUTION', name: 'R&R Resettlement', statutoryReference: 'Sec 31-42', plannedDurationDays: 120, elapsedDays: 10, status: 'NOT_STARTED', predictedDelayWeeks: 0, delayProbability: 20 }
    ],
    topDelayDrivers: [
      { feature: 'Traditional Coastal Fisherfolk Livelihood Rehabilitation', category: 'Social', impactPercentage: 38, direction: 'INCREASES_RISK', description: 'Loss of boat beaching access requiring custom R&R package with cold-chain storage allocation.' },
      { feature: 'Heavy Defense & Naval Base Perimeter NOC Coordination', category: 'Administrative', impactPercentage: 28, direction: 'INCREASES_RISK', description: 'Eastern Naval Command security clearance for rail electrification alignment.' },
      { feature: 'AP State Direct Negotiation (Compulsory Purchase Exemption)', category: 'Financial', impactPercentage: 18, direction: 'REDUCES_RISK', description: 'Enables Collector to execute direct agreement with 2.25x market value multiplier.' }
    ],
    legalDisputes: [
      { caseNumber: 'WP-AP-6612/2024', court: 'Andhra Pradesh High Court', issue: 'Fishermen cooperative society writ against blocking marine slipway access', filingDate: '2024-07-10', status: 'PENDING_HEARING', parcelsAffectedCount: 16, financialImpactCr: 32.0 }
    ],
    clearances: [
      { department: 'Eastern Naval Command (HQ ENC)', type: 'Naval Security Buffer Rail Electrification NOC', submissionDate: '2024-05-18', slaDays: 90, daysPending: 170, status: 'ESCALATED', officerInCharge: 'Command Civil Engineer, HQ ENC Vizag' }
    ],
    parcels: [
      { surveyNumber: 'SY-201', village: 'Malkapuram', district: 'Visakhapatnam', areaHectares: 14.2, classification: 'Private Commercial', affectedFamilyCount: 65, possessionStatus: 'DISPUTED', riskScore: 84, coordinates: [17.685, 83.245] },
      { surveyNumber: 'SY-305', village: 'Gajuwaka', district: 'Visakhapatnam', areaHectares: 28.0, classification: 'Government Revenue', affectedFamilyCount: 12, possessionStatus: 'IN_PROGRESS', riskScore: 55, coordinates: [17.695, 83.210] }
    ],
    coordinates: [17.69, 83.23],
    lastUpdated: '2026-08-27T07:30:00Z',
    laoOfficerName: 'Dr. G. Lakshmi (IAS), Joint Collector & LAO Visakhapatnam',
    laoContact: '+91-891-2563345',
    aiRecommendations: [
      'Incorporate modern fish-landing center and mechanized net mending shed in R&R package to sign tripartite settlement.',
      'Organize joint site inspection with Eastern Naval Command Chief of Staff to approve acoustic fencing buffer.'
    ]
  },
  {
    id: 'proj-008',
    code: 'AIRPORT-JEWAR-CONN-01',
    name: 'Noida International Airport (Jewar) Express Rail & Road Link',
    sector: 'Airport Greenfield',
    agency: 'YEDA / NIAL',
    state: 'Uttar Pradesh',
    districts: ['Gautam Buddha Nagar', 'Bulandshahr', 'Aligarh'],
    totalLandRequiredHa: 1334.0,
    landAcquiredHa: 1260.0,
    privateLandPct: 91.0,
    forestTribalLandPct: 0.0,
    affectedFamiliesCount: 3600,
    totalBudgetCr: 7800,
    compensationDisbursedCr: 3200,
    compensationAllocatedCr: 3400,
    startDate: '2023-01-15',
    originalTargetDate: '2025-05-31',
    predictedCompletionDate: '2025-07-20',
    predictedDelayWeeks: 7.1,
    delayConfidenceIntervalWeeks: [4.5, 9.8],
    overallRiskScore: 32,
    riskLevel: 'LOW',
    delayProbabilityPct: 28.4,
    currentStage: 'STAGE_6_POSSESSION_HANDOVER',
    stageProgressPct: 92,
    stages: [
      { id: 'STAGE_1_PRELIM_SURVEY', name: 'Survey & Sec 11', statutoryReference: 'Sec 11(1)', plannedDurationDays: 90, elapsedDays: 85, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 5 },
      { id: 'STAGE_2_SIA_APPROVAL', name: 'SIA & Expert Review', statutoryReference: 'Sec 4-9', plannedDurationDays: 90, elapsedDays: 80, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 5 },
      { id: 'STAGE_3_SEC19_DECLARATION', name: 'Sec 19 Declaration', statutoryReference: 'Sec 19(1)', plannedDurationDays: 120, elapsedDays: 110, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 10 },
      { id: 'STAGE_4_VALUATION_AWARD', name: 'Award & Valuation', statutoryReference: 'Sec 23-30', plannedDurationDays: 90, elapsedDays: 90, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 10 },
      { id: 'STAGE_5_COMPENSATION_PAY', name: 'Compensation Payment', statutoryReference: 'Sec 77-80', plannedDurationDays: 90, elapsedDays: 95, status: 'COMPLETED', predictedDelayWeeks: 0.7, delayProbability: 15 },
      { id: 'STAGE_6_POSSESSION_HANDOVER', name: 'Possession Handover', statutoryReference: 'Sec 38', plannedDurationDays: 90, elapsedDays: 105, status: 'IN_PROGRESS', predictedDelayWeeks: 6.4, delayProbability: 35, keyBottleneck: 'Final 74 Ha in Ranhera and Rohi villages undergoing structure valuation settlement' },
      { id: 'STAGE_7_RR_EXECUTION', name: 'R&R Resettlement', statutoryReference: 'Sec 31-42', plannedDurationDays: 180, elapsedDays: 170, status: 'COMPLETED', predictedDelayWeeks: 0, delayProbability: 10 }
    ],
    topDelayDrivers: [
      { feature: 'UP Fast-Track Consent Acquisition Policy & Direct DBT', category: 'Financial', impactPercentage: 45, direction: 'REDUCES_RISK', description: 'Over 88% farmers signed voluntary agreements under direct 2x compensation package.' },
      { feature: 'Model Jewar Resettlement Township (Javer Model)', category: 'R&R', impactPercentage: 30, direction: 'REDUCES_RISK', description: 'Fully developed civic plots with paved roads, school, and health sub-center delivered ahead of schedule.' },
      { feature: 'Standing Sugarcane Harvest Delay on 32 Plots', category: 'Administrative', impactPercentage: 15, direction: 'INCREASES_RISK', description: 'Farmer request to permit final harvest cycle before physical bulldozing.' }
    ],
    legalDisputes: [],
    clearances: [
      { department: 'Directorate General of Civil Aviation (DGCA)', type: 'Obstacle Limitation Surfaces (OLS) Clearance', submissionDate: '2024-02-10', slaDays: 60, daysPending: 50, status: 'APPROVED', officerInCharge: 'Director (Aerodromes), DGCA New Delhi' }
    ],
    parcels: [
      { surveyNumber: 'KH-89', village: 'Rohi', district: 'Gautam Buddha Nagar', areaHectares: 42.0, classification: 'Private Agricultural', affectedFamilyCount: 88, possessionStatus: 'ACQUIRED', riskScore: 18, coordinates: [28.185, 77.580] },
      { surveyNumber: 'KH-142', village: 'Ranhera', district: 'Gautam Buddha Nagar', areaHectares: 32.0, classification: 'Private Agricultural', affectedFamilyCount: 64, possessionStatus: 'IN_PROGRESS', riskScore: 36, coordinates: [28.210, 77.610] }
    ],
    coordinates: [28.19, 77.59],
    lastUpdated: '2026-08-27T12:00:00Z',
    laoOfficerName: 'Shri Balram Singh (PCS), SLAO Jewar / YEDA',
    laoContact: '+91-120-2326150',
    aiRecommendations: [
      'Disburse expedited structure/tree bonus for remaining 32 plots to achieve 100% handover before monsoon.',
      'Maintain active grievance desk at Jewar Camp Office for legacy mutation queries.'
    ]
  }
];

export const INITIAL_ALERTS: ProjectAlert[] = [
  {
    id: 'alt-001',
    projectId: 'proj-001',
    projectName: 'Delhi-Mumbai Expressway Package 3B',
    projectCode: 'NH-EXP-W48-03',
    severity: 'CRITICAL',
    title: 'Statutory 12-Month Section 19 Lapse Risk Alert',
    message: 'Section 11(1) notification published on 2024-03-15 has only 18 remaining statutory days before complete lapse under RFCTLARR Section 19(1).',
    timestamp: '2026-08-28T05:30:00Z',
    category: 'STATUTORY_DEADLINE',
    acknowledged: false,
    assignedToRole: 'DISTRICT_COLLECTOR',
    recommendedAction: 'Issue gazette Section 19 notification immediately for 380 unencumbered plots before statutory deadline expiration.'
  },
  {
    id: 'alt-002',
    projectId: 'proj-002',
    projectName: 'Mumbai-Ahmedabad High Speed Rail (Palghar)',
    projectCode: 'HSR-MAH-MUM-AHM-01',
    severity: 'CRITICAL',
    title: 'High Court Interim Injunction on Mangrove Belt',
    message: 'Bombay High Court (PIL 884/2024) issued ad-interim status quo on 18 parcels in Thane creek buffer; physical tree felling halted.',
    timestamp: '2026-08-27T18:15:00Z',
    category: 'LEGAL_STAY',
    acknowledged: false,
    assignedToRole: 'LEGAL_COMPLIANCE_OFFICER',
    recommendedAction: 'File urgent civil application with satellite proof of compensatory mangrove plantation in Vaitarna estuary.'
  },
  {
    id: 'alt-003',
    projectId: 'proj-001',
    projectName: 'Delhi-Mumbai Expressway Package 3B',
    projectCode: 'NH-EXP-W48-03',
    severity: 'HIGH',
    title: 'Compensation Disbursement Velocity Below Statutory SLA',
    message: 'Disbursement rate dropped to ₹8.2 Cr/week (required: ₹32 Cr/week) due to 380 KYC rejection errors in Lead Bank system.',
    timestamp: '2026-08-26T12:00:00Z',
    category: 'COMPENSATION_VELOCITY',
    acknowledged: true,
    assignedToRole: 'PROJECT_MANAGER',
    recommendedAction: 'Set up biometric verification camp at Karjan Taluka Panchayat with Bank of Baroda district manager.'
  },
  {
    id: 'alt-004',
    projectId: 'proj-006',
    projectName: 'Bhadla Mega Ultra Solar Park Expansion',
    projectCode: 'RE-SOLAR-BHADLA-PH3',
    severity: 'HIGH',
    title: 'Environmental Clearance SLA Exceeded (210 Days Pending)',
    message: 'Supreme Court GIB Committee transmission clearance pending 210 days (SLA: 90 days); stalling 280 hectares evacuation substation land.',
    timestamp: '2026-08-25T09:40:00Z',
    category: 'CLEARANCE_SLA',
    acknowledged: false,
    assignedToRole: 'NATIONAL_DIRECTOR',
    recommendedAction: 'Submit revised optical diverter audit report to Supreme Court High Powered Committee for expedited sign-off.'
  },
  {
    id: 'alt-005',
    projectId: 'proj-002',
    projectName: 'Mumbai-Ahmedabad High Speed Rail (Palghar)',
    projectCode: 'HSR-MAH-MUM-AHM-01',
    severity: 'HIGH',
    title: 'PESA Gram Sabha Resolution Withheld in 8 Hamlets',
    message: 'Tribal panchayats in Manor block withheld Section 41 consent citing pending community forest title distribution.',
    timestamp: '2026-08-24T14:20:00Z',
    category: 'GRAM_SABHA',
    acknowledged: true,
    assignedToRole: 'DISTRICT_COLLECTOR',
    recommendedAction: 'Convene joint district reconciliation camp with Integrated Tribal Development Project (ITDP) Director.'
  }
];

export const INITIAL_MODEL_METRICS: ModelMetrics = {
  modelVersion: 'v3.4.2-ensemble-xgboost-lgbm',
  lastTrainedDate: '2026-08-20T04:00:00Z',
  totalHistoricalCases: 2840,
  activeProjectsMonitored: 86,
  aucRoc: 0.942,
  precision: 0.918,
  recall: 0.894,
  f1Score: 0.906,
  meanAbsoluteErrorWeeks: 2.3,
  featureImportances: [
    { feature: 'Disputed Title / Co-heirship Fragmentation Index', importancePct: 24.8 },
    { feature: 'Inter-departmental Clearance Latency (MoEFCC/Rail/Defense)', importancePct: 21.4 },
    { feature: 'Compensation Escrow Disbursement Velocity Ratio', importancePct: 18.2 },
    { feature: 'Tribal / Scheduled Area PESA Act Concentration (%)', importancePct: 14.5 },
    { feature: 'High Court / Arbitration Injunction Active Stays', importancePct: 11.6 },
    { feature: 'R&R Resettlement Colony Readiness Lag (Days)', importancePct: 9.5 }
  ],
  driftScore: 0.042,
  driftStatus: 'STABLE'
};

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-101',
    timestamp: '2026-08-28T07:10:22Z',
    user: 'Shri Rajesh K. Patel (IAS)',
    role: 'District Collector / SLAO',
    action: 'DISBURSEMENT_BATCH_APPROVED',
    details: 'Approved ₹45.8 Cr compensation release for 142 undisputed agrarian plots in Padra taluka.',
    projectId: 'proj-001',
    ipAddress: '10.14.22.81'
  },
  {
    id: 'log-102',
    timestamp: '2026-08-28T06:45:10Z',
    user: 'AI Predictive Engine (Antigravity)',
    role: 'System / ML Pipeline',
    action: 'RISK_SCORE_RECALCULATED',
    details: 'Project NH-EXP-W48-03 risk score elevated from 81 to 86 due to High Court stay WP-GUJ-11842.',
    projectId: 'proj-001',
    ipAddress: '127.0.0.1'
  },
  {
    id: 'log-103',
    timestamp: '2026-08-27T16:30:00Z',
    user: 'Dr. Ramesh K. (KAS)',
    role: 'Implementing Agency PM (BMRCL)',
    action: 'SIMULATION_EXECUTED',
    details: 'Ran What-If simulation with +30% TDR cash incentive for Yelahanka commercial frontage.',
    projectId: 'proj-004',
    ipAddress: '10.18.90.12'
  },
  {
    id: 'log-104',
    timestamp: '2026-08-27T14:15:30Z',
    user: 'National Infrastructure Secretary',
    role: 'National Project Director',
    action: 'INTERVENTION_DIRECTIVE_ISSUED',
    details: 'Dispatched inter-ministerial escalation notice to Ministry of Environment for Forest Stage-II clearance.',
    projectId: 'proj-001',
    ipAddress: '10.2.1.44'
  },
  {
    id: 'log-105',
    timestamp: '2026-08-26T11:20:00Z',
    user: 'Special Land Acquisition Legal Cell',
    role: 'Legal & Compliance Officer',
    action: 'LEGAL_CASE_UPDATED',
    details: 'Uploaded High Court counter-affidavit for PIL-BOM-884/2024 regarding Thane mangrove buffer.',
    projectId: 'proj-002',
    ipAddress: '10.14.33.19'
  }
];

export const INITIAL_FIELD_SURVEYS = [
  {
    id: 'SURV-2026-001',
    projectId: 'proj-001',
    projectName: 'Delhi-Mumbai Expressway Package 14 (Vadodara-Kim)',
    parcelId: 'PARCEL-GJ-VAD-402',
    surveyorName: 'Er. Anil Solanki (Lead Surveyor)',
    surveyorContact: '+91 98251 44102',
    surveyDate: '2026-08-26',
    villageName: 'Padra West / Samiala',
    district: 'Vadodara',
    state: 'Gujarat',
    geoCoordinates: { lat: 22.2418, lng: 73.0841 },
    surveyType: 'CADASTRAL_BOUNDARY' as const,
    verificationStatus: 'VERIFIED' as const,
    encroachmentDetected: false,
    pafName: 'Rameshchandra K. Patel & 3 Co-sharers',
    pafAadhaarLast4: '8821',
    bankAccountVerified: true,
    treeCount: 42,
    structureValuationInLakhs: 18.5,
    notes: 'DGPS survey markers planted on northern boundary. RoW clear of physical structures; horticulture valuation completed.',
    photoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'SURV-2026-002',
    projectId: 'proj-001',
    projectName: 'Delhi-Mumbai Expressway Package 14 (Vadodara-Kim)',
    parcelId: 'PARCEL-GJ-VAD-405',
    surveyorName: 'Er. Anil Solanki (Lead Surveyor)',
    surveyorContact: '+91 98251 44102',
    surveyDate: '2026-08-27',
    villageName: 'Chansad Agricultural Cluster',
    district: 'Vadodara',
    state: 'Gujarat',
    geoCoordinates: { lat: 22.2512, lng: 73.1120 },
    surveyType: 'TREE_STRUCTURE_VALUATION' as const,
    verificationStatus: 'DISCREPANCY_FOUND' as const,
    encroachmentDetected: true,
    encroachmentNotes: 'Commercial warehouse extension overlaps 12m into notified RoW corridor.',
    pafName: 'Jayeshbhai Mohanbhai Rathod',
    pafAadhaarLast4: '4190',
    bankAccountVerified: false,
    treeCount: 14,
    structureValuationInLakhs: 46.2,
    notes: 'Joint inspection note submitted to SLAO for demarcation correction under Section 15(2).',
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'SURV-2026-003',
    projectId: 'proj-002',
    projectName: 'Mumbai-Ahmedabad High Speed Rail (Palghar-Dahanu Section)',
    parcelId: 'PARCEL-MH-PLG-108',
    surveyorName: 'Smt. Priya Sawant (Revenue Inspector)',
    surveyorContact: '+91 94220 89133',
    surveyDate: '2026-08-25',
    villageName: 'Kasa Tribal Hamlet',
    district: 'Palghar',
    state: 'Maharashtra',
    geoCoordinates: { lat: 19.9821, lng: 72.8124 },
    surveyType: 'GRAM_SABHA_RESOLUTION' as const,
    verificationStatus: 'PENDING_REVIEW' as const,
    encroachmentDetected: false,
    pafName: 'Devaji Shankar Warli & Clan',
    pafAadhaarLast4: '6104',
    bankAccountVerified: true,
    treeCount: 85,
    structureValuationInLakhs: 12.0,
    notes: 'Gram Sabha quorum achieved with 78% attendance. Formal resolution recorded under PESA Act 1996 awaiting BDO countersignature.',
    photoUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'SURV-2026-004',
    projectId: 'proj-003',
    projectName: 'Dedicated Freight Corridor - Western Sector (Dadri-Rewari Link)',
    parcelId: 'PARCEL-HR-REW-219',
    surveyorName: 'Er. Sandeep Yadav (GIS Specialist)',
    surveyorContact: '+91 99912 33410',
    surveyDate: '2026-08-24',
    villageName: 'Khol Rural Corridor',
    district: 'Rewari',
    state: 'Haryana',
    geoCoordinates: { lat: 28.2104, lng: 76.6219 },
    surveyType: 'DRONE_ORTHOMOSAIC' as const,
    verificationStatus: 'VERIFIED' as const,
    encroachmentDetected: false,
    pafName: 'Balwan Singh & Sons',
    pafAadhaarLast4: '3391',
    bankAccountVerified: true,
    treeCount: 22,
    structureValuationInLakhs: 28.4,
    notes: 'High-resolution orthomosaic drone flight completed (2.5 cm GSD). Cadastral boundaries matched 100% with Jamabandi maps.',
    photoUrl: 'https://images.unsplash.com/photo-1527018607616-0526648e861c?w=400&auto=format&fit=crop&q=60'
  }
];

