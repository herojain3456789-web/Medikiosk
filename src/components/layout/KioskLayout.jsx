import React, { useEffect } from 'react';
import { KioskHeader } from './KioskHeader';
import { StepProgressBar } from '../ui/StepProgressBar';
import { useKiosk } from '../../context/KioskContext';
import { Clock, ShieldAlert } from 'lucide-react';
import { LargeButton } from '../ui/LargeButton';

export const KioskLayout = ({
  children,
  currentStepIndex,
  currentStageTitle,
  audioPrompt,
  title,
  subtitle,
  className = ""
}) => {
  const {
    speakText,
    showInactivityWarning,
    setShowInactivityWarning,
    resetSession
  } = useKiosk();

  // Speak audio prompt on load if enabled
  useEffect(() => {
    if (audioPrompt) {
      const timer = setTimeout(() => {
        speakText(audioPrompt);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [audioPrompt, speakText]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-100 selection:text-sky-900 relative">
      
      {/* Kiosk Header */}
      <KioskHeader currentStageTitle={currentStageTitle} />

      {/* Numbered Progress Stepper */}
      {typeof currentStepIndex === 'number' && (
        <div className="w-full bg-white border-b border-slate-200 py-3 px-4 shadow-sm">
          <StepProgressBar currentStepIndex={currentStepIndex} />
        </div>
      )}

      {/* Page Heading & Context */}
      {(title || subtitle) && (
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 pt-6 pb-2 text-center">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base text-slate-600 font-normal mt-1 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Main Container */}
      <main className={`flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-4 flex flex-col justify-center ${className}`}>
        {children}
      </main>

      {/* Inactivity Session Safety Modal for Hospital Kiosks */}
      {showInactivityWarning && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 border border-amber-200">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Are you still there?
            </h3>
            <p className="text-sm text-slate-600 mt-1 mb-5">
              For your medical privacy, this kiosk session will reset if there is no activity.
            </p>
            <div className="flex flex-col gap-2">
              <LargeButton
                variant="primary"
                size="md"
                onClick={() => setShowInactivityWarning(false)}
                className="w-full"
              >
                Continue Session
              </LargeButton>
              <button
                type="button"
                onClick={() => {
                  resetSession();
                  window.location.href = '/welcome';
                }}
                className="text-xs text-slate-500 hover:text-red-600 py-2 font-medium"
              >
                End Session & Clear Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
