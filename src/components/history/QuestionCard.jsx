import React, { useState } from 'react';
import { Volume2, Check, Keyboard, Stethoscope, ArrowRight } from 'lucide-react';
import { VoiceMicButton } from '../ui/VoiceMicButton';
import { RedFlagBanner } from '../ui/RedFlagBanner';
import { useKiosk } from '../../context/KioskContext';

export const QuestionCard = ({
  questionData,
  onSelectOption,
  onVoiceAnswer,
  onTypeAnswer,
  selectedAnswer,
  redFlagNotice
}) => {
  const { language, speakText } = useKiosk();
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [customText, setCustomText] = useState('');

  if (!questionData) return null;

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customText.trim()) {
      if (onTypeAnswer) {
        onTypeAnswer(customText.trim());
      }
      setCustomText('');
      setShowTypeInput(false);
    }
  };

  const handleAudioPlayback = () => {
    const textToSpeak = language === 'hi' && questionData.hindiQuestion
      ? questionData.hindiQuestion
      : questionData.question;
    speakText(textToSpeak);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      
      {/* Clinical Triage Alert Notice if active */}
      {redFlagNotice?.isRedFlag && (
        <RedFlagBanner
          message={redFlagNotice.triageMessage || "Your response may require prompt attention from the clinical team."}
          triggers={redFlagNotice.matchedTriggers}
        />
      )}

      {/* Main Guided Clinical Question Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        
        {/* Top Header Strip */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {questionData.category || "Clinical History"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              Question {questionData.step} of {questionData.totalSteps || 7}
            </span>
            <button
              type="button"
              onClick={handleAudioPlayback}
              title="Listen to question"
              aria-label="Listen to question"
              className="p-1.5 bg-slate-50 hover:bg-slate-100 text-sky-700 rounded-lg border border-slate-200 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Central Question Heading */}
        <div className="mt-4 mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {questionData.question}
          </h3>
          {questionData.hindiQuestion && (
            <p className="text-base text-slate-600 font-medium mt-1">
              {questionData.hindiQuestion}
            </p>
          )}
        </div>

        {/* Selectable Options */}
        {questionData.quickOptions && questionData.quickOptions.length > 0 && (
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Select one option:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {questionData.quickOptions.map((opt, idx) => {
                const isSelected = selectedAnswer === opt.value || selectedAnswer === opt.text;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectOption(opt.text, opt.value, opt.isRedFlag || opt.isRedFlagCandidate)}
                    className={`flex items-center justify-between p-3.5 rounded-xl text-left font-medium text-sm transition-all border ${
                      isSelected
                        ? 'bg-sky-50 border-sky-600 text-sky-950 ring-2 ring-sky-200 font-bold shadow-xs'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="flex-1 leading-snug">{opt.text}</span>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center ml-2 shrink-0 ${
                      isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Patient Response Preview */}
        {selectedAnswer && (
          <div className="mb-6 bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Recorded Response:
              </span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                "{selectedAnswer}"
              </p>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-100 font-semibold px-2 py-0.5 rounded border border-emerald-200">
              Saved
            </span>
          </div>
        )}

        {/* Voice and Typing Controls */}
        <div className="pt-4 border-t border-slate-100 flex flex-col items-center gap-3">
          <VoiceMicButton
            onTranscript={(spokenText) => onVoiceAnswer(spokenText)}
            onTypeInstead={() => setShowTypeInput(true)}
            sampleOptions={questionData.quickOptions}
          />

          {showTypeInput && (
            <form onSubmit={handleCustomSubmit} className="w-full max-w-lg flex gap-2 mt-2 animate-fadeIn">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type your answer here..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                autoFocus
              />
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowTypeInput(false)}
                className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-300 text-xs px-3 py-2.5 rounded-xl"
              >
                Cancel
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
