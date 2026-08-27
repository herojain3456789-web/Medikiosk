import React, { useState } from 'react';
import { Volume2, VolumeX, Eye, PhoneCall, Check } from 'lucide-react';
import { useKiosk } from '../../context/KioskContext';

export const AccessibleControls = () => {
  const {
    fontScale,
    setFontScale,
    highContrast,
    setHighContrast,
    speechEnabled,
    setSpeechEnabled,
    speakText
  } = useKiosk();

  const [attendantCalled, setAttendantCalled] = useState(false);

  const increaseFont = () => {
    setFontScale(prev => Math.min(prev + 0.15, 1.45));
    speakText("Text size increased");
  };

  const decreaseFont = () => {
    setFontScale(prev => Math.max(prev - 0.15, 0.85));
    speakText("Text size decreased");
  };

  const resetFont = () => {
    setFontScale(1);
    speakText("Text size reset");
  };

  const toggleVoice = () => {
    setSpeechEnabled(prev => {
      const next = !prev;
      if (next) speakText("Voice audio prompt enabled");
      return next;
    });
  };

  const handleCallAttendant = () => {
    setAttendantCalled(true);
    speakText("A hospital kiosk attendant has been called to your station.");
    setTimeout(() => setAttendantCalled(false), 5000);
  };

  return (
    <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-xl p-1 shadow-sm">
      {/* Font Size Adjuster */}
      <div className="flex items-center bg-white rounded-lg px-1 py-0.5 border border-slate-200">
        <button
          onClick={decreaseFont}
          title="Decrease text size"
          aria-label="Decrease text size"
          className="px-1.5 py-1 text-slate-700 hover:text-slate-900 rounded font-bold text-xs"
        >
          A-
        </button>
        <button
          onClick={resetFont}
          title="Reset text size"
          aria-label="Reset text size"
          className="px-1.5 py-0.5 text-xs font-semibold text-sky-700"
        >
          {Math.round(fontScale * 100)}%
        </button>
        <button
          onClick={increaseFont}
          title="Increase text size"
          aria-label="Increase text size"
          className="px-1.5 py-1 text-slate-700 hover:text-slate-900 rounded font-bold text-xs"
        >
          A+
        </button>
      </div>

      {/* High Contrast Toggle */}
      <button
        onClick={() => {
          setHighContrast(prev => !prev);
          speakText(highContrast ? "Standard contrast active" : "High contrast mode active");
        }}
        title="Toggle high contrast display"
        aria-label="Toggle high contrast display"
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
          highContrast
            ? 'bg-yellow-400 text-black border-yellow-500 font-bold'
            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
        }`}
      >
        <Eye className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{highContrast ? "High Contrast: ON" : "Contrast"}</span>
      </button>

      {/* Voice Guidance Toggle */}
      <button
        onClick={toggleVoice}
        title={speechEnabled ? "Mute voice guidance audio" : "Enable voice guidance audio"}
        aria-label="Toggle voice guidance"
        className={`p-1.5 rounded-lg border transition-colors ${
          speechEnabled
            ? 'bg-sky-50 text-sky-700 border-sky-200'
            : 'bg-white text-slate-400 border-slate-200'
        }`}
      >
        {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>

      {/* Attendant Assistance Button */}
      <button
        onClick={handleCallAttendant}
        title="Call Hospital Kiosk Attendant"
        aria-label="Call Hospital Attendant for assistance"
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
          attendantCalled
            ? 'bg-emerald-600 text-white border-emerald-600'
            : 'bg-white hover:bg-red-50 text-red-700 border-red-200'
        }`}
      >
        {attendantCalled ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Attendant Alerted</span>
          </>
        ) : (
          <>
            <PhoneCall className="w-3.5 h-3.5 text-red-600" />
            <span className="hidden sm:inline">Help</span>
          </>
        )}
      </button>
    </div>
  );
};
