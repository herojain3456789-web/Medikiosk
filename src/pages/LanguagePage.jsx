import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Check, Mic, Hand, ArrowRight } from 'lucide-react';
import { useKiosk, SUPPORTED_LANGUAGES } from '../context/KioskContext';
import { KioskLayout } from '../components/layout/KioskLayout';
import { KioskFooter } from '../components/layout/KioskFooter';
import { LargeButton } from '../components/ui/LargeButton';

export const LanguagePage = () => {
  const navigate = useNavigate();
  const { language, setLanguage, speakText } = useKiosk();
  const [selectedLang, setSelectedLang] = useState(language || 'en');

  const handleSelectLanguage = (langCode) => {
    setSelectedLang(langCode);
    setLanguage(langCode);
    const chosen = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
    if (chosen) {
      speakText(`${chosen.name} selected. ${chosen.greeting}`);
    }
  };

  const handleContinue = (mode = 'touch') => {
    navigate('/identify');
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang) || SUPPORTED_LANGUAGES[0];

  return (
    <KioskLayout
      currentStageTitle="Language Selection"
      title="Choose your language / भाषा चुनें"
      subtitle="Select the language you prefer for questions and audio assistance."
      audioPrompt="Please choose your preferred language on the screen."
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6">
        
        {/* Language Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.code;

            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelectLanguage(lang.code)}
                className={`p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all border ${
                  isSelected
                    ? 'bg-sky-50 border-sky-600 text-sky-900 ring-2 ring-sky-200 font-bold shadow-sm'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <span className="text-xl font-bold font-sans">
                  {lang.native}
                </span>
                <span className="text-xs text-slate-500 mt-0.5">
                  {lang.name}
                </span>

                <div className={`mt-2 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Confirmation */}
        <div className="w-full max-w-lg bg-white border border-slate-200 rounded-xl p-3 text-center shadow-xs">
          <p className="text-sm font-semibold text-slate-900">
            Language selected: <span className="text-sky-700 font-bold">{currentLangObj.name} ({currentLangObj.native})</span>
          </p>
        </div>

        {/* Input Mode Choice */}
        <div className="w-full max-w-md grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleContinue('voice')}
            className="flex items-center justify-center gap-2 p-3.5 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-xl text-xs font-bold text-slate-800 transition-all shadow-sm"
          >
            <Mic className="w-4 h-4 text-sky-600" />
            <span>Use Voice</span>
          </button>

          <button
            type="button"
            onClick={() => handleContinue('touch')}
            className="flex items-center justify-center gap-2 p-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 transition-all shadow-sm"
          >
            <Hand className="w-4 h-4 text-slate-700" />
            <span>Continue with Touch</span>
          </button>
        </div>

      </div>

      <KioskFooter
        onBack={() => navigate('/welcome')}
        onNext={() => handleContinue('touch')}
        nextLabel="Continue"
        currentPromptText="Please select your language and tap Continue."
      />
    </KioskLayout>
  );
};
