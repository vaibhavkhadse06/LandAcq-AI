export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type ProjectSector = 'Highways' | 'High-Speed Rail' | 'Metro Rail' | 'Dedicated Freight Corridor' | 'Renewable Energy' | 'Industrial Corridor' | 'Port Connectivity' | 'Airport Greenfield';

export type AcquisitionStage = 
  | 'STAGE_1_PRELIM_SURVEY'
  | 'STAGE_2_SIA_APPROVAL'
  | 'STAGE_3_SEC19_DECLARATION'
  | 'STAGE_4_VALUATION_AWARD'
  | 'STAGE_5_COMPENSATION_PAY'
  | 'STAGE_6_POSSESSION_HANDOVER'
  | 'STAGE_7_RR_EXECUTION';

export interface StageDetail {
  id: AcquisitionStage;
  name: string;
  statutoryReference: string; // e.g. "Section 11(1) RFCTLARR 2013"
  plannedDurationDays: number;
  elapsedDays: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'DELAYED' | 'NOT_STARTED';
  predictedDelayWeeks: number;
  delayProbability: number; // 0 - 100
  keyBottleneck?: string;
}

export interface ShapDriver {
  feature: string;
  category: 'Legal' | 'Administrative' | 'Financial' | 'R&R' | 'Environmental' | 'Social';
  impactPercentage: number; // e.g. +24% or -12%
  direction: 'INCREASES_RISK' | 'REDUCES_RISK';
  description: string;
}

export interface LegalDispute {
  caseNumber: string;
  court: string;
  issue: string;
  filingDate: string;
  status: 'PENDING_HEARING' | 'STAY_ORDER_ACTIVE' | 'MEDIATION' | 'RESOLVED';
  parcelsAffectedCount: number;
  financialImpactCr: number;
}

export interface InterDeptClearance {
  department: string;
  type: string; // e.g. "Forest Stage-II Clearance", "Railway Crossing Approval", "Defense NOC"
  submissionDate: string;
  slaDays: number;
  daysPending: number;
  status: 'APPROVED' | 'IN_REVIEW' | 'ESCALATED' | 'OBJECTION_RAISED';
  officerInCharge: string;
}

export interface LandParcel {
  surveyNumber: string;
  village: string;
  district: string;
  areaHectares: number;
  classification: 'Private Agricultural' | 'Private Commercial' | 'Government Revenue' | 'Forest/Tribal' | 'Gram Sabha';
  affectedFamilyCount: number;
  possessionStatus: 'ACQUIRED' | 'IN_PROGRESS' | 'DISPUTED' | 'NOT_STARTED';
  riskScore: number;
  coordinates: [number, number]; // [lat, lng]
}

export interface LandAcquisitionProject {
  id: string;
  code: string; // e.g. "NH-48-EXP-PKG3"
  name: string;
  sector: ProjectSector;
  agency: string; // e.g. "NHAI", "NHSRCL", "DFCCIL", "DMRC", "SECI"
  state: string;
  districts: string[];
  totalLandRequiredHa: number;
  landAcquiredHa: number;
  privateLandPct: number;
  forestTribalLandPct: number;
  affectedFamiliesCount: number;
  totalBudgetCr: number;
  compensationDisbursedCr: number;
  compensationAllocatedCr: number;
  
  startDate: string;
  originalTargetDate: string;
  predictedCompletionDate: string;
  predictedDelayWeeks: number;
  delayConfidenceIntervalWeeks: [number, number];
  
  overallRiskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  delayProbabilityPct: number;
  
  currentStage: AcquisitionStage;
  stageProgressPct: number;
  stages: StageDetail[];
  
  topDelayDrivers: ShapDriver[];
  legalDisputes: LegalDispute[];
  clearances: InterDeptClearance[];
  parcels: LandParcel[];
  
  coordinates: [number, number]; // [lat, lng]
  lastUpdated: string;
  laoOfficerName: string;
  laoContact: string;
  
  aiRecommendations: string[];
}

export interface ProjectAlert {
  id: string;
  projectId: string;
  projectName: string;
  projectCode: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  title: string;
  message: string;
  timestamp: string;
  category: 'STATUTORY_DEADLINE' | 'LEGAL_STAY' | 'COMPENSATION_VELOCITY' | 'CLEARANCE_SLA' | 'GRAM_SABHA';
  acknowledged: boolean;
  assignedToRole: string;
  recommendedAction: string;
}

export interface ScopeOfStudyItem {
  lifecycleStage: string;
  statutoryBasis: string;
  parametersAnalyzed: string[];
  delayRiskFactors: string[];
  predictiveMetrics: string[];
  aiMitigationCapability: string;
}

export interface WhatIfSimulationParams {
  projectId: string;
  compensationDisbursementSpeedMultiplier: number; // 1.0 to 2.5
  disputeResolutionFastTrackPct: number; // 0 to 100
  environmentalClearanceSlaReductionDays: number; // 0 to 90
  rrPackageEnhancedAssistancePct: number; // 0 to 50
  dedicatedTaskforceDeployed: boolean;
}

export interface WhatIfSimulationResult {
  originalRiskScore: number;
  simulatedRiskScore: number;
  originalDelayWeeks: number;
  simulatedDelayWeeks: number;
  weeksSaved: number;
  estimatedCostOverrunPreventedCr: number;
  driverImpactReductions: { driver: string; riskDropPct: number }[];
  aiPrescription: string;
}

export interface ModelMetrics {
  modelVersion: string;
  lastTrainedDate: string;
  totalHistoricalCases: number;
  activeProjectsMonitored: number;
  aucRoc: number;
  precision: number;
  recall: number;
  f1Score: number;
  meanAbsoluteErrorWeeks: number;
  featureImportances: { feature: string; importancePct: number }[];
  driftScore: number;
  driftStatus: 'STABLE' | 'WARNING' | 'DRIFT_DETECTED';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details: string;
  projectId?: string;
  ipAddress: string;
}

export type UserRole = 
  | 'NATIONAL_DIRECTOR' // Secretary / Member (PPP & Projects)
  | 'DISTRICT_COLLECTOR' // District Magistrate / Collector
  | 'LEGAL_COMPLIANCE_OFFICER' // SLAO & Legal Cell
  | 'PROJECT_MANAGER'; // Implementing Agency PM

export type LifecycleStage = AcquisitionStage;
export type SimulationResult = WhatIfSimulationResult;

export interface AuditLog extends AuditLogEntry {
  projectName?: string;
  tamperEvidenceHash: string;
}

export interface PredictionResult {
  overallRiskScore: number;
  riskLevel: RiskLevel;
  predictedDelayWeeks: number;
  delayProbabilityPct: number;
  topDelayDrivers: ShapDriver[];
  aiRecommendations: string[];
}

export interface FieldSurveyRecord {
  id: string;
  projectId: string;
  projectName: string;
  parcelId: string;
  surveyorName: string;
  surveyorContact: string;
  surveyDate: string;
  villageName: string;
  district: string;
  state: string;
  geoCoordinates: { lat: number; lng: number };
  surveyType: 'CADASTRAL_BOUNDARY' | 'TREE_STRUCTURE_VALUATION' | 'PAF_KYC_VERIFICATION' | 'GRAM_SABHA_RESOLUTION' | 'DRONE_ORTHOMOSAIC';
  verificationStatus: 'VERIFIED' | 'DISCREPANCY_FOUND' | 'PENDING_REVIEW' | 'REJECTED';
  encroachmentDetected: boolean;
  encroachmentNotes?: string;
  pafName: string;
  pafAadhaarLast4: string;
  bankAccountVerified: boolean;
  treeCount: number;
  structureValuationInLakhs: number;
  notes: string;
  photoUrl?: string;
}

export interface MisReportFilter {
  sector: string;
  state: string;
  riskLevel: string;
  stage: string;
  fiscalYear: string;
}

