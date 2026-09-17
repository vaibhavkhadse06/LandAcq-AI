import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { ProjectsListView } from './components/ProjectsListView';
import { GisCorridorMapView } from './components/GisCorridorMapView';
import { ScopeOfStudyView } from './components/ScopeOfStudyView';
import { WhatIfSimulationView } from './components/WhatIfSimulationView';
import { AlertsMatrixView } from './components/AlertsMatrixView';
import { ModelLearningView } from './components/ModelLearningView';
import { AuditTrailView } from './components/AuditTrailView';
import { ApiDocsView } from './components/ApiDocsView';
import { FieldSurveyorPortal } from './components/FieldSurveyorPortal';
import { MisReportGeneratorView } from './components/MisReportGeneratorView';
import { MethodologySlidesView } from './components/MethodologySlidesView';
import { RiskPredictionSandboxView } from './components/RiskPredictionSandboxView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { NewPredictionModal } from './components/NewPredictionModal';
import { 
  INITIAL_PROJECTS, 
  INITIAL_ALERTS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_MODEL_METRICS, 
  SCOPE_OF_STUDY_DATA 
} from './data/mockData';
import { LandAcquisitionProject, ProjectAlert, AuditLogEntry, UserRole, PredictionResult } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('NATIONAL_DIRECTOR');
  const [projects, setProjects] = useState<LandAcquisitionProject[]>(INITIAL_PROJECTS);
  const [alerts, setAlerts] = useState<ProjectAlert[]>(INITIAL_ALERTS);
  const [auditLogs, setAuditLogs] = useState<any[]>(INITIAL_AUDIT_LOGS);
  const [modelMetrics, setModelMetrics] = useState(INITIAL_MODEL_METRICS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals & Sub-state
  const [selectedProject, setSelectedProject] = useState<LandAcquisitionProject | null>(null);
  const [isNewPredictionModalOpen, setIsNewPredictionModalOpen] = useState<boolean>(false);
  const [whatIfSelectedProjectId, setWhatIfSelectedProjectId] = useState<string | null>(null);

  // Filtered projects based on search
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const q = searchQuery.toLowerCase();
    return projects.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.state.toLowerCase().includes(q) ||
      p.agency.toLowerCase().includes(q) ||
      p.sector.toLowerCase().includes(q) ||
      p.districts.some(d => d.toLowerCase().includes(q))
    );
  }, [projects, searchQuery]);

  const unacknowledgedAlertsCount = useMemo(() => {
    return alerts.filter(a => !a.acknowledged).length;
  }, [alerts]);

  const handleSelectProject = (project: LandAcquisitionProject) => {
    setSelectedProject(project);
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
  };

  const handleNavigateToWhatIf = (projectId: string) => {
    setWhatIfSelectedProjectId(projectId);
    setActiveTab('what-if');
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, acknowledged: true } : a));
    
    // Log action to audit trail
    const alertObj = alerts.find(a => a.id === alertId);
    if (alertObj) {
      const newLog: any = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        user: currentRole,
        role: currentRole,
        action: 'ALERT_DISPATCHED',
        details: `Acknowledged alert: "${alertObj.title}" for ${alertObj.projectName}`,
        projectName: alertObj.projectName,
        tamperEvidenceHash: `sha256-${Math.random().toString(36).substring(2, 12)}`
      };
      setAuditLogs(prev => [newLog, ...prev]);
    }
  };

  const handlePredictionComplete = (newPrediction: any) => {
    // Optional: Add to audit logs
    const newLog: any = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: currentRole,
      role: currentRole,
      action: 'PREDICTION_GENERATED',
      details: `Generated AI risk score of ${newPrediction.overallRiskScore || 75}/100 with predicted delay of +${newPrediction.predictedDelayWeeks || 14} weeks`,
      projectName: 'Custom Predictive Scoring Run',
      tamperEvidenceHash: `sha256-${Math.random().toString(36).substring(2, 12)}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleModelRetrained = (newMetrics: any) => {
    setModelMetrics(newMetrics);
    const newLog: any = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: currentRole,
      role: currentRole,
      action: 'MODEL_RETRAINED',
      details: `Model retrained to version ${newMetrics.modelVersion}. AUC-ROC: ${newMetrics.aucRoc}`,
      projectName: 'Continuous Learning ML Pipeline',
      tamperEvidenceHash: `sha256-${Math.random().toString(36).substring(2, 12)}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Sleek Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        unacknowledgedAlertsCount={unacknowledgedAlertsCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenNewPrediction={() => setIsNewPredictionModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'dashboard' && (
          <ExecutiveDashboard
            projects={filteredProjects}
            onSelectProject={handleSelectProject}
            onNavigateToWhatIf={handleNavigateToWhatIf}
            onNavigateToScope={() => setActiveTab('scope-of-study')}
            onNavigateToPredictor={() => setActiveTab('risk-predictor')}
            currentRole={currentRole}
          />
        )}

        {activeTab === 'risk-predictor' && (
          <RiskPredictionSandboxView
            onNavigateToWhatIf={handleNavigateToWhatIf}
            onPredictionComplete={handlePredictionComplete}
          />
        )}

        {activeTab === 'methodology-slides' && (
          <MethodologySlidesView />
        )}

        {activeTab === 'scope-of-study' && (
          <ScopeOfStudyView
            scopeData={SCOPE_OF_STUDY_DATA}
            onNavigateToDashboard={() => setActiveTab('dashboard')}
            onNavigateToPrediction={() => setIsNewPredictionModalOpen(true)}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsListView
            projects={filteredProjects}
            onSelectProject={handleSelectProject}
            onNavigateToWhatIf={handleNavigateToWhatIf}
            currentRole={currentRole}
            onOpenNewPrediction={() => setIsNewPredictionModalOpen(true)}
          />
        )}

        {activeTab === 'gis-map' && (
          <GisCorridorMapView
            projects={filteredProjects}
            onSelectProject={handleSelectProject}
            currentRole={currentRole}
          />
        )}

        {activeTab === 'field-survey' && (
          <FieldSurveyorPortal
            projects={filteredProjects}
            currentRole={currentRole}
            onSelectProject={handleSelectProject}
          />
        )}

        {activeTab === 'what-if' && (
          <WhatIfSimulationView
            projects={projects}
            preselectedProjectId={whatIfSelectedProjectId}
            currentRole={currentRole}
            onSelectProject={handleSelectProject}
          />
        )}

        {activeTab === 'mis-reports' && (
          <MisReportGeneratorView
            projects={filteredProjects}
            currentRole={currentRole}
            onSelectProject={handleSelectProject}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertsMatrixView
            alerts={alerts}
            currentRole={currentRole}
            onAcknowledgeAlert={handleAcknowledgeAlert}
            onSelectProjectById={(id) => {
              const p = projects.find(item => item.id === id);
              if (p) handleSelectProject(p);
            }}
          />
        )}

        {activeTab === 'model-learning' && (
          <ModelLearningView
            metrics={modelMetrics}
            currentRole={currentRole}
            onModelRetrained={handleModelRetrained}
          />
        )}

        {activeTab === 'api-hub' && (
          <ApiDocsView />
        )}

        {activeTab === 'audit-trail' && (
          <AuditTrailView
            auditLogs={auditLogs}
            currentRole={currentRole}
          />
        )}
      </main>

      {/* Modals */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={handleCloseProjectModal}
          onNavigateToWhatIf={handleNavigateToWhatIf}
          currentRole={currentRole}
        />
      )}

      {isNewPredictionModalOpen && (
        <NewPredictionModal
          isOpen={isNewPredictionModalOpen}
          onClose={() => setIsNewPredictionModalOpen(false)}
          onPredictionComplete={(pred) => {
            handlePredictionComplete(pred);
          }}
          onNavigateToWhatIf={(projName) => {
            setActiveTab('what-if');
          }}
        />
      )}
    </div>
  );
}
