import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Volume2, ShieldCheck } from 'lucide-react';
import { LargeButton } from '../ui/LargeButton';
import { useKiosk } from '../../context/KioskContext';

export const KioskFooter = ({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextSubtext,
  backLabel = "Back",
  nextDisabled = false,
  showBack = true,
  showNext = true,
  nextIcon: NextIcon = ArrowRight,
  nextVariant = "primary",
  currentPromptText = "",
  className = ""
}) => {
  const navigate = useNavigate();
  const { speakText } = useKiosk();

  const handleRepeatAudio = () => {
    if (currentPromptText) {
      speakText(currentPromptText);
    }
  };

  const handleBackDefault = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <footer className={`w-full bg-white border-t border-slate-200 py-3.5 px-4 sm:px-8 mt-auto sticky bottom-0 z-40 shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: Back & Repeat Voice */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          {showBack && (
            <LargeButton
              variant="secondary"
              size="lg"
              onClick={handleBackDefault}
              icon={ArrowLeft}
              className="px-5 min-w-[6.5rem]"
            >
              {backLabel}
            </LargeButton>
          )}

          {currentPromptText && (
            <button
              onClick={handleRepeatAudio}
              title="Repeat audio instruction"
              aria-label="Repeat audio instruction"
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 transition-colors"
            >
              <Volume2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="hidden md:inline">Repeat Voice</span>
            </button>
          )}
        </div>

        {/* Center: Reassuring Privacy statement */}
        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium text-center">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Information is encrypted and processed for today's OPD consultation only.</span>
        </div>

        {/* Right: Primary Action */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {showNext && (
            <LargeButton
              variant={nextVariant}
              size="lg"
              onClick={onNext}
              disabled={nextDisabled}
              icon={NextIcon}
              subtext={nextSubtext}
              className="w-full sm:w-auto min-w-[12rem]"
            >
              {nextLabel}
            </LargeButton>
          )}
        </div>
      </div>
    </footer>
  );
};
