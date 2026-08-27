import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, AlertTriangle, CheckCircle2, Clock, Search, Filter, Stethoscope, ArrowRight, Eye, RefreshCw, FileText } from 'lucide-react';
import { DoctorLayout } from '../components/layout/DoctorLayout';
import { LargeButton } from '../components/ui/LargeButton';
import { hisService } from '../services/hisService';

export const DoctorDashboardPage = () => {
  const navigate = useNavigate();
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'red_flags' | 'waiting' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');

  const queueData = hisService.getDoctorQueue();

  const filteredQueue = queueData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filterMode === 'red_flags') return p.redFlag;
    if (filterMode === 'waiting') return p.triageTag !== 'Completed';
    if (filterMode === 'completed') return p.triageTag === 'Completed';
    return true;
  });

  const totalPatients = queueData.length;
  const redFlagCount = queueData.filter(p => p.redFlag).length;
  const waitingCount = queueData.filter(p => p.triageTag !== 'Completed').length;
  const completedCount = queueData.filter(p => p.triageTag === 'Completed').length;
  const readySummariesCount = queueData.filter(p => p.aiSummaryStatus === 'Ready').length;

  return (
    <DoctorLayout
      title="OPD Outpatient Queue"
      subtitle="Today's Consultation List • Room 4"
    >
      <div className="w-full flex flex-col gap-5">
        
        {/* KPI Clinical Stat Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's OPD</span>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-1">{totalPatients} Patients</div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">Session active</span>
          </div>

          <div className="bg-red-50/70 border border-red-200 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> Attention Required
            </span>
            <div className="text-2xl font-bold text-red-700 font-mono mt-1">{redFlagCount} Priority</div>
            <span className="text-[11px] text-red-600 mt-0.5 block">Acute symptoms flagged</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" /> Waiting in Lobby
            </span>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-1">{waitingCount} Patients</div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">Intake completed</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed
            </span>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-1">{completedCount} Consulted</div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">Discharged / Prescribed</span>
          </div>

        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient, token, complaint..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border whitespace-nowrap ${
                filterMode === 'all'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              All ({queueData.length})
            </button>

            <button
              onClick={() => setFilterMode('red_flags')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border whitespace-nowrap flex items-center gap-1 ${
                filterMode === 'red_flags'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-red-700 border-slate-200 hover:bg-red-50'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Attention ({redFlagCount})</span>
            </button>

            <button
              onClick={() => setFilterMode('waiting')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border whitespace-nowrap ${
                filterMode === 'waiting'
                  ? 'bg-sky-600 text-white border-sky-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Waiting ({waitingCount})
            </button>
          </div>

        </div>

        {/* Patient Queue Cards List */}
        <div className="flex flex-col gap-3">
          {filteredQueue.map((patientItem) => (
            <div
              key={patientItem.id}
              className={`bg-white rounded-xl p-4 border transition-colors shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 ${
                patientItem.redFlag
                  ? 'border-red-300 bg-red-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Left Column: Demographics & Complaint */}
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold shrink-0 ${
                  patientItem.redFlag
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-800 border border-slate-200'
                }`}>
                  <span className="text-[9px] uppercase font-mono opacity-80">Token</span>
                  <span className="text-base font-mono font-bold">{patientItem.token}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900">{patientItem.name}</h3>
                    <span className="text-xs text-slate-500">
                      {patientItem.age}y / {patientItem.gender}
                    </span>
                    <span className="text-xs font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                      {patientItem.id}
                    </span>

                    {patientItem.redFlag && (
                      <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded border border-red-200 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                        {patientItem.triageTag}
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-medium text-slate-800 mt-1">
                    Chief Complaint: <span className="font-normal text-slate-600">{patientItem.chiefComplaint}</span>
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
                    <span>Intake: <strong>{patientItem.intakeTime}</strong></span>
                    <span>BP: <strong className="font-mono text-slate-700">{patientItem.vitals.bp}</strong> • Pulse: <strong className="font-mono text-slate-700">{patientItem.vitals.pulse}</strong></span>
                    <span>Summary: <strong className="text-emerald-700 font-semibold">{patientItem.aiSummaryStatus}</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Column: Review Action */}
              <div className="self-end md:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/doctor-review')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs ${
                    patientItem.redFlag
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-sky-600 hover:bg-sky-700 text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Review Summary</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </DoctorLayout>
  );
};
