import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  UserCheck, 
  ShieldCheck, 
  Layers, 
  Navigation,
  Smartphone,
  Upload,
  Calendar,
  IndianRupee,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { FieldSurveyRecord, LandAcquisitionProject, UserRole } from '../types';
import { INITIAL_FIELD_SURVEYS } from '../data/mockData';

interface FieldSurveyorPortalProps {
  projects: LandAcquisitionProject[];
  currentRole: UserRole;
  onSelectProject?: (project: LandAcquisitionProject) => void;
}

export const FieldSurveyorPortal: React.FC<FieldSurveyorPortalProps> = ({
  projects,
  currentRole,
  onSelectProject
}) => {
  const [surveys, setSurveys] = useState<FieldSurveyRecord[]>(INITIAL_FIELD_SURVEYS);
  const [selectedSurvey, setSelectedSurvey] = useState<FieldSurveyRecord | null>(surveys[0] || null);
  const [isNewSurveyModalOpen, setIsNewSurveyModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Form State for new survey submission
  const [newSurveyForm, setNewSurveyForm] = useState({
    projectId: projects[0]?.id || '',
    parcelId: 'PARCEL-GJ-VAD-412',
    surveyorName: 'Er. Anil Solanki',
    surveyorContact: '+91 98251 44102',
    villageName: 'Vadsar Rural Block',
    district: 'Vadodara',
    state: 'Gujarat',
    lat: 22.2612,
    lng: 73.1415,
    surveyType: 'CADASTRAL_BOUNDARY' as FieldSurveyRecord['surveyType'],
    pafName: 'Govindbhai Somabhai Parmar',
    pafAadhaarLast4: '7109',
    bankAccountVerified: true,
    encroachmentDetected: false,
    encroachmentNotes: '',
    treeCount: 28,
    structureValuationInLakhs: 14.5,
    notes: 'Boundary demarcated with permanent concrete pillars. PAF attended joint inspection.'
  });

  const filteredSurveys = surveys.filter(s => {
    const matchesSearch = 
      s.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.villageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.pafName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.surveyorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'ALL' || s.surveyType === filterType;
    const matchesStatus = filterStatus === 'ALL' || s.verificationStatus === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedProject = projects.find(p => p.id === newSurveyForm.projectId) || projects[0];

    const newRecord: FieldSurveyRecord = {
      id: `SURV-2026-${String(surveys.length + 1).padStart(3, '0')}`,
      projectId: matchedProject.id,
      projectName: matchedProject.name,
      parcelId: newSurveyForm.parcelId,
      surveyorName: newSurveyForm.surveyorName,
      surveyorContact: newSurveyForm.surveyorContact,
      surveyDate: new Date().toISOString().slice(0, 10),
      villageName: newSurveyForm.villageName,
      district: newSurveyForm.district,
      state: newSurveyForm.state,
      geoCoordinates: { lat: Number(newSurveyForm.lat), lng: Number(newSurveyForm.lng) },
      surveyType: newSurveyForm.surveyType,
      verificationStatus: newSurveyForm.encroachmentDetected ? 'DISCREPANCY_FOUND' : 'VERIFIED',
      encroachmentDetected: newSurveyForm.encroachmentDetected,
      encroachmentNotes: newSurveyForm.encroachmentNotes,
      pafName: newSurveyForm.pafName,
      pafAadhaarLast4: newSurveyForm.pafAadhaarLast4,
      bankAccountVerified: newSurveyForm.bankAccountVerified,
      treeCount: Number(newSurveyForm.treeCount),
      structureValuationInLakhs: Number(newSurveyForm.structureValuationInLakhs),
      notes: newSurveyForm.notes,
      photoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=60'
    };

    setSurveys([newRecord, ...surveys]);
    setSelectedSurvey(newRecord);
    setIsNewSurveyModalOpen(false);
  };

  const handleUpdateStatus = (id: string, newStatus: FieldSurveyRecord['verificationStatus']) => {
    setSurveys(prev => prev.map(s => s.id === id ? { ...s, verificationStatus: newStatus } : s));
    if (selectedSurvey?.id === id) {
      setSelectedSurvey(prev => prev ? { ...prev, verificationStatus: newStatus } : null);
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-600" />
              Field-Level Ground Survey & Verification Portal
            </h2>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2 py-0.5 rounded">
              SIH-26017 Field Mobile API Live
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time on-ground cadastral verification, geo-tagged inspection photos, PAF Aadhaar/KYC auditing, and dispute logging
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsNewSurveyModalOpen(true)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Field Inspection</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left List of Surveys + Right Inspection Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Filter and Survey Cards */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Filter Bar */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search parcel, village, or surveyor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:outline-none"
              >
                <option value="ALL">All Survey Types</option>
                <option value="CADASTRAL_BOUNDARY">Cadastral Boundary</option>
                <option value="TREE_STRUCTURE_VALUATION">Tree & Structure Valuation</option>
                <option value="PAF_KYC_VERIFICATION">PAF KYC Verification</option>
                <option value="GRAM_SABHA_RESOLUTION">Gram Sabha Resolution</option>
                <option value="DRONE_ORTHOMOSAIC">Drone Orthomosaic</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="VERIFIED">Verified OK</option>
                <option value="DISCREPANCY_FOUND">Discrepancy Found</option>
                <option value="PENDING_REVIEW">Pending Review</option>
              </select>
            </div>
          </div>

          {/* List of Surveys */}
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredSurveys.map((survey) => {
              const isSelected = selectedSurvey?.id === survey.id;
              const isDiscrepancy = survey.verificationStatus === 'DISCREPANCY_FOUND';
              const isVerified = survey.verificationStatus === 'VERIFIED';

              return (
                <div
                  key={survey.id}
                  onClick={() => setSelectedSurvey(survey)}
                  className={`bg-white p-3.5 rounded-xl border transition-all cursor-pointer shadow-xs ${
                    isSelected 
                      ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-slate-900">{survey.parcelId}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          isVerified ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          isDiscrepancy ? 'bg-red-50 text-red-700 border border-red-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {survey.verificationStatus.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5">{survey.villageName}, {survey.district}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[260px]">{survey.projectName}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-slate-400">{survey.surveyDate}</span>
                      <p className="text-[11px] font-bold text-blue-600 mt-1">₹{survey.structureValuationInLakhs} L</p>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-blue-500" />
                      {survey.surveyorName.split(' ')[0]} {survey.surveyorName.split(' ')[1]}
                    </span>
                    <span className="text-slate-600 font-medium">PAF: {survey.pafName.slice(0, 18)}...</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Survey Deep-Dive */}
        <div className="lg:col-span-7">
          {selectedSurvey ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-slate-900">{selectedSurvey.parcelId}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                      {selectedSurvey.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">{selectedSurvey.projectName}</p>
                </div>

                {/* Status Toggle buttons for SLAO / Officers */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleUpdateStatus(selectedSurvey.id, 'VERIFIED')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                      selectedSurvey.verificationStatus === 'VERIFIED'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 hover:bg-emerald-50 text-slate-600'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedSurvey.id, 'DISCREPANCY_FOUND')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                      selectedSurvey.verificationStatus === 'DISCREPANCY_FOUND'
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 hover:bg-red-50 text-slate-600'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Flag Issue
                  </button>
                </div>
              </div>

              {/* Geo-tagged Image and Location Map Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden border border-slate-200 relative group h-44 bg-slate-100">
                  <img
                    src={selectedSurvey.photoUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=60'}
                    alt="Field site verification"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white text-[10px]">
                    <div className="flex items-center justify-between font-mono">
                      <span>Lat: {selectedSurvey.geoCoordinates.lat.toFixed(4)}°N</span>
                      <span>Lng: {selectedSurvey.geoCoordinates.lng.toFixed(4)}°E</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 flex flex-col justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      Cadastral Location Attributes
                    </h4>
                    <div className="space-y-1.5 text-slate-600 text-[11px]">
                      <p><strong className="text-slate-800">Village:</strong> {selectedSurvey.villageName}</p>
                      <p><strong className="text-slate-800">District:</strong> {selectedSurvey.district}, {selectedSurvey.state}</p>
                      <p><strong className="text-slate-800">Survey Type:</strong> {selectedSurvey.surveyType.replace('_', ' ')}</p>
                      <p><strong className="text-slate-800">Lead Surveyor:</strong> {selectedSurvey.surveyorName}</p>
                      <p><strong className="text-slate-800">Phone:</strong> {selectedSurvey.surveyorContact}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAF & Valuation Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Affected Family (PAF)</p>
                  <p className="text-xs font-bold text-slate-900 mt-1">{selectedSurvey.pafName}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Aadhaar: XXXX-XXXX-{selectedSurvey.pafAadhaarLast4}</p>
                  <span className={`inline-block mt-1 text-[9px] font-bold px-1.5 py-0.2 rounded ${
                    selectedSurvey.bankAccountVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedSurvey.bankAccountVerified ? '✓ PFMS Bank Linked' : '✕ KYC Pending'}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Tree & Assets Count</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">{selectedSurvey.treeCount} <span className="text-xs text-slate-500 font-normal">trees</span></p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Horticulture valuation tagged</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Structure Valuation</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">₹{selectedSurvey.structureValuationInLakhs} <span className="text-xs text-slate-500 font-normal">Lakhs</span></p>
                  <p className="text-[10px] text-slate-500 mt-0.5">PWD schedule of rates 2026</p>
                </div>
              </div>

              {/* Encroachment & Surveyor Field Notes */}
              <div className="space-y-3">
                {selectedSurvey.encroachmentDetected && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-900">
                    <div className="flex items-center gap-1.5 font-bold text-red-700 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Encroachment / RoW Overlap Flagged
                    </div>
                    <p>{selectedSurvey.encroachmentNotes || 'Commercial / residential structure intersects notified boundary.'}</p>
                  </div>
                )}

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <h5 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    Field Inspector Notes
                  </h5>
                  <p className="text-slate-600 leading-relaxed">{selectedSurvey.notes}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 border border-slate-200 text-center text-slate-500 text-xs">
              Select a field inspection record to view ground verification details.
            </div>
          )}
        </div>
      </div>

      {/* New Survey Log Modal */}
      {isNewSurveyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Record Field Inspection Entry</h3>
              </div>
              <button
                onClick={() => setIsNewSurveyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSurvey} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Infrastructure Corridor</label>
                <select
                  value={newSurveyForm.projectId}
                  onChange={(e) => setNewSurveyForm({ ...newSurveyForm, projectId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cadastral Parcel / Khasra No.</label>
                  <input
                    type="text"
                    required
                    value={newSurveyForm.parcelId}
                    onChange={(e) => setNewSurveyForm({ ...newSurveyForm, parcelId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Survey Type</label>
                  <select
                    value={newSurveyForm.surveyType}
                    onChange={(e) => setNewSurveyForm({ ...newSurveyForm, surveyType: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5"
                  >
                    <option value="CADASTRAL_BOUNDARY">Cadastral Boundary</option>
                    <option value="TREE_STRUCTURE_VALUATION">Tree & Structure Valuation</option>
                    <option value="PAF_KYC_VERIFICATION">PAF KYC Verification</option>
                    <option value="GRAM_SABHA_RESOLUTION">Gram Sabha Resolution</option>
                    <option value="DRONE_ORTHOMOSAIC">Drone Orthomosaic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Village Name</label>
                  <input
                    type="text"
                    required
                    value={newSurveyForm.villageName}
                    onChange={(e) => setNewSurveyForm({ ...newSurveyForm, villageName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">District & State</label>
                  <input
                    type="text"
                    required
                    value={`${newSurveyForm.district}, ${newSurveyForm.state}`}
                    onChange={(e) => setNewSurveyForm({ ...newSurveyForm, district: e.target.value.split(',')[0]?.trim() || '' })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Project Affected Person (PAF)</label>
                  <input
                    type="text"
                    required
                    value={newSurveyForm.pafName}
                    onChange={(e) => setNewSurveyForm({ ...newSurveyForm, pafName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Aadhaar (Last 4 Digits)</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={newSurveyForm.pafAadhaarLast4}
                    onChange={(e) => setNewSurveyForm({ ...newSurveyForm, pafAadhaarLast4: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Horticulture Trees Count</label>
                  <input
                    type="number"
                    value={newSurveyForm.treeCount}
                    onChange={(e) => setNewSurveyForm({ ...newSurveyForm, treeCount: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Structure Valuation (₹ Lakhs)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newSurveyForm.structureValuationInLakhs}
                    onChange={(e) => setNewSurveyForm({ ...newSurveyForm, structureValuationInLakhs: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={newSurveyForm.encroachmentDetected}
                    onChange={(e) => setNewSurveyForm({ ...newSurveyForm, encroachmentDetected: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Flag Encroachment / Physical Boundary Conflict</span>
                </label>
              </div>

              {newSurveyForm.encroachmentDetected && (
                <div>
                  <label className="block font-bold text-red-700 mb-1">Encroachment Description</label>
                  <input
                    type="text"
                    value={newSurveyForm.encroachmentNotes}
                    onChange={(e) => setNewSurveyForm({ ...newSurveyForm, encroachmentNotes: e.target.value })}
                    placeholder="E.g., Unauthorized shed extending into 15m RoW"
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 text-red-900"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Inspector Notes & Observations</label>
                <textarea
                  rows={2}
                  value={newSurveyForm.notes}
                  onChange={(e) => setNewSurveyForm({ ...newSurveyForm, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewSurveyModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm"
                >
                  Submit Inspection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
