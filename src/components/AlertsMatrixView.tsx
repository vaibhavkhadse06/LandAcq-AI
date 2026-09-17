import React, { useState } from 'react';
import { 
  Bell, 
  AlertOctagon, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Clock, 
  Send, 
  Check, 
  FileText, 
  Scale, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { ProjectAlert, UserRole } from '../types';

interface AlertsMatrixViewProps {
  alerts: ProjectAlert[];
  onAcknowledgeAlert: (alertId: string) => void;
  onNavigateToProject: (projectId: string) => void;
  currentRole: UserRole;
}

export const AlertsMatrixView: React.FC<AlertsMatrixViewProps> = ({
  alerts,
  onAcknowledgeAlert,
  onNavigateToProject,
  currentRole
}) => {
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [dispatchedAlertId, setDispatchedAlertId] = useState<string | null>(null);

  const filteredAlerts = alerts.filter(a => {
    if (severityFilter === 'ALL') return true;
    return a.severity === severityFilter;
  });

  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;

  const handleDispatch = (alertId: string) => {
    setDispatchedAlertId(alertId);
    setTimeout(() => {
      setDispatchedAlertId(null);
      onAcknowledgeAlert(alertId);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-400" />
              Automated Early Warning Alerts & Statutory Escalations
            </h2>
            {unacknowledgedCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                {unacknowledgedCount} Actionable
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time threshold breaches, statutory Section 11/19 lapse countdowns, and court stay notifications
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <span className="text-[10px] text-slate-500 px-2 font-bold uppercase">Filter:</span>
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'INFO'].map(sev => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                severityFilter === sev 
                  ? 'bg-emerald-500 text-slate-950 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3.5">
        {filteredAlerts.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">No active alerts matching this filter</h3>
            <p className="text-xs text-slate-400">All statutory milestones and SLA thresholds are operating normally.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isCritical = alert.severity === 'CRITICAL';
            const isHigh = alert.severity === 'HIGH';
            const isMedium = alert.severity === 'MEDIUM';

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-xl border transition-all shadow-md ${
                  !alert.acknowledged
                    ? isCritical 
                      ? 'bg-rose-950/20 border-rose-500/50 shadow-rose-950/20' 
                      : isHigh 
                      ? 'bg-orange-950/20 border-orange-500/50' 
                      : 'bg-slate-900 border-slate-800'
                    : 'bg-slate-900/60 border-slate-800/60 opacity-75'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold flex items-center gap-1 ${
                        isCritical 
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' 
                          : isHigh 
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' 
                          : isMedium
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      }`}>
                        {isCritical && <AlertOctagon className="w-3 h-3 text-rose-400 animate-pulse" />}
                        {alert.severity} ALERT
                      </span>

                      <span className="text-xs text-slate-400 font-mono">
                        {new Date(alert.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>

                      <span className="text-xs text-emerald-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {alert.projectName}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white">
                      {alert.message}
                    </h3>

                    {/* Action Required Box */}
                    <div className="bg-slate-950/90 border border-slate-800/80 rounded-lg p-3 text-xs text-slate-300 flex items-start gap-2">
                      <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-400">Statutory Action Required: </span>
                        <span>{alert.actionRequired}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Action Controls */}
                  <div className="flex flex-row md:flex-col items-end justify-between gap-2 shrink-0">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigateToProject(alert.projectId)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inspect Project</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {!alert.acknowledged ? (
                        <button
                          onClick={() => handleDispatch(alert.id)}
                          disabled={dispatchedAlertId === alert.id}
                          className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md shadow-rose-900/30 cursor-pointer"
                        >
                          {dispatchedAlertId === alert.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>Dispatched!</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Dispatch Directive</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold bg-emerald-950/40 border border-emerald-900/40 px-2.5 py-1 rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Acknowledged</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
