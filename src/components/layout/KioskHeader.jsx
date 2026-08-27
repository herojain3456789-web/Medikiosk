import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Stethoscope, Globe, MoreVertical, Zap, RotateCcw, User, HeartPulse, Sparkles } from 'lucide-react';
import { useKiosk, SUPPORTED_LANGUAGES } from '../../context/KioskContext';
import { AccessibleControls } from '../ui/AccessibleControls';

export const KioskHeader = ({ currentStageTitle = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, patient, isDemoMode, startDemoMode, resetSession } = useKiosk();
  const [showDemoMenu, setShowDemoMenu] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  // Derive stage title from route if not explicitly passed
  const getStageTitle = () => {
    if (currentStageTitle) return currentStageTitle;
    const path = location.pathname;
    if (path.includes('/welcome') || path === '/') return 'Kiosk Welcome';
    if (path.includes('/language')) return 'Language Selection';
    if (path.includes('/identify')) return '01. Patient Identification';
    if (path.includes('/consent')) return '02. Patient Consent';
    if (path.includes('/history/ayush')) return '03. AYUSH Clinical History';
    if (path.includes('/history')) return '03. AI Clinical History';
    if (path.includes('/documents/processing')) return '04. Document OCR Processing';
    if (path.includes('/documents')) return '04. Medical Records Intake';
    if (path.includes('/timeline')) return '04. Medical Record Timeline';
    if (path.includes('/summary')) return '05. Clinical Summary';
    if (path.includes('/integration')) return 'Hospital System Transmission';
    if (path.includes('/success')) return 'Intake Complete';
    return 'Pre-consultation Intake';
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 py-3 px-4 sm:px-8 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Product Identity */}
        <Link
          to="/welcome"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                Medi<span className="text-sky-600">Kiosk</span>
              </h1>
              {isDemoMode && (
                <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded border border-amber-300">
                  Demo Session
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Pre-consultation Clinical Intake
            </p>
          </div>
        </Link>

        {/* Center: Current Workflow Stage */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-sky-600" />
          <span>{getStageTitle()}</span>
        </div>

        {/* Right: Language, Accessibility, Help, Discreet Demo Menu */}
        <div className="flex items-center gap-2">
          
          {/* Active Patient Badge if identified */}
          {patient && (
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg text-xs text-slate-700">
              <User className="w-3.5 h-3.5 text-sky-600" />
              <span className="font-bold">{patient.name}</span>
              <span className="font-mono text-slate-500">({patient.token || 'A-104'})</span>
            </div>
          )}

          {/* Language Switch */}
          <button
            onClick={() => navigate('/language')}
            aria-label="Change language"
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 transition-colors shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-sky-600" />
            <span>{currentLang.native}</span>
          </button>

          {/* Accessibility Controls Toolbar */}
          <AccessibleControls />

          {/* Discreet Demo / Session Overflow Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDemoMenu(!showDemoMenu)}
              title="Kiosk Options"
              aria-label="Kiosk Options"
              className="p-2 bg-white hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showDemoMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50 animate-fadeIn text-xs">
                <div className="px-3 py-1.5 font-bold text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-100">
                  Kiosk Tools & Demo
                </div>

                <button
                  type="button"
                  onClick={() => {
                    startDemoMode();
                    setShowDemoMenu(false);
                    navigate('/identify');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 font-medium flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Load Demo Patient (Rahul Sharma)</span>
                </button>

                <Link
                  to="/doctor-dashboard"
                  onClick={() => setShowDemoMenu(false)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 font-medium flex items-center gap-2"
                >
                  <Stethoscope className="w-4 h-4 text-sky-600" />
                  <span>Doctor OPD Queue View</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    resetSession();
                    setShowDemoMenu(false);
                    navigate('/welcome');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-700 font-medium flex items-center gap-2 border-t border-slate-100 mt-1"
                >
                  <RotateCcw className="w-4 h-4 text-red-500" />
                  <span>Clear & Reset Kiosk Session</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
