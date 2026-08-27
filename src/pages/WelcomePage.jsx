import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Globe, Mic, Hand, ShieldCheck, ArrowRight, Clock, FileText, MoreVertical, Zap } from 'lucide-react';
import { useKiosk, SUPPORTED_LANGUAGES } from '../context/KioskContext';
import { LargeButton } from '../components/ui/LargeButton';
import { AccessibleControls } from '../components/ui/AccessibleControls';

export const WelcomePage = () => {
  const navigate = useNavigate();
  const { language, speakText, startDemoMode } = useKiosk();

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const handleStart = () => {
    speakText("Welcome to MediKiosk. Please identify your hospital record to begin.");
    navigate('/identify');
  };

  const handleRecordsDirect = () => {
    speakText("You can scan or upload your medical records.");
    navigate('/documents');
  };

  const handleStartVoice = () => {
    speakText("Voice mode enabled. Please state your mobile number or ABHA ID.");
    navigate('/identify');
  };

  const handleStartTouch = () => {
    speakText("Touch mode active. Please identify yourself to begin.");
    navigate('/identify');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-6 relative">
      
      {/* Compact Hospital Kiosk Header */}
      <header className="max-w-6xl mx-auto w-full bg-white border border-slate-200 rounded-2xl p-3 sm:px-6 shadow-sm flex items-center justify-between gap-4">
        
        {/* Left: Branding & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 font-sans">
              Medi<span className="text-sky-600">Kiosk</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Pre-consultation Clinical Intake
            </p>
          </div>
        </div>

        {/* Right: Language, Accessibility, Help */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/language')}
            className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-sky-600" />
            <span>{currentLang.name} ({currentLang.native})</span>
          </button>

          <AccessibleControls />
        </div>
      </header>

      {/* Main Kiosk Content Box */}
      <main className="max-w-2xl mx-auto w-full text-center flex flex-col items-center justify-center my-auto py-8">
        
        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Prepare for your consultation
        </h2>

        <p className="text-base sm:text-lg text-slate-600 font-normal mt-3 max-w-lg leading-relaxed">
          Answer a few questions and add your previous medical records before meeting the doctor.
        </p>

        {/* Primary and Secondary Action Buttons */}
        <div className="w-full max-w-md flex flex-col gap-3.5 mt-8">
          
          {/* Primary: Start */}
          <LargeButton
            variant="primary"
            size="xl"
            onClick={handleStart}
            icon={ArrowRight}
            className="w-full shadow-sm"
          >
            Start
          </LargeButton>

          {/* Secondary: I have previous records */}
          <LargeButton
            variant="secondary"
            size="lg"
            onClick={handleRecordsDirect}
            icon={FileText}
            className="w-full"
          >
            I have previous records
          </LargeButton>

        </div>

        {/* Interaction Mode Selection: Voice vs Touch */}
        <div className="w-full max-w-md grid grid-cols-2 gap-3 mt-4">
          <button
            type="button"
            onClick={handleStartVoice}
            className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-xl text-xs font-bold text-slate-700 transition-all shadow-sm"
          >
            <Mic className="w-4 h-4 text-sky-600" />
            <span>Talk to MediKiosk</span>
          </button>

          <button
            type="button"
            onClick={handleStartTouch}
            className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all shadow-sm"
          >
            <Hand className="w-4 h-4 text-slate-700" />
            <span>Use Touch</span>
          </button>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-8">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Your information is collected and used only with your consent.</span>
        </div>

        {/* Estimated Time Indicator */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mt-2 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-600" />
          <span>Estimated time: 3–5 minutes</span>
        </div>

      </main>

      {/* Hospital Footer with Discreet Demo Link */}
      <footer className="max-w-4xl mx-auto w-full text-center pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
        <span>Hospital Outpatient Clinical Intake System</span>
        
        {/* Discreet Demo Switcher for Evaluation */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              startDemoMode();
              navigate('/identify');
            }}
            className="text-slate-400 hover:text-slate-600 font-medium transition-colors"
          >
            Load Sample Profile (Demo)
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => navigate('/doctor-dashboard')}
            className="text-slate-400 hover:text-slate-600 font-medium transition-colors"
          >
            Doctor Queue
          </button>
        </div>
      </footer>

    </div>
  );
};
