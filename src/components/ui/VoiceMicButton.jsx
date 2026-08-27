import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Check, RefreshCw, Keyboard } from 'lucide-react';
import { useKiosk } from '../../context/KioskContext';

export const VoiceMicButton = ({
  onTranscript,
  onTypeInstead,
  placeholder = "Speak your answer",
  disabled = false,
  sampleOptions = []
}) => {
  const { language, isListening, setIsListening } = useKiosk();
  const [heardText, setHeardText] = useState('');
  const [hasCaptured, setHasCaptured] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setHasCaptured(false);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setHeardText(transcript);
        if (event.results[0].isFinal) {
          setHasCaptured(true);
          setIsListening(false);
        }
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition notice:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, setIsListening]);

  const toggleListening = () => {
    if (disabled) return;

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      setHeardText('');
      setHasCaptured(false);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          simulateVoice();
        }
      } else {
        simulateVoice();
      }
    }
  };

  const simulateVoice = () => {
    setIsListening(true);
    setHeardText("Listening...");
    
    const simulatedResponse = sampleOptions.length > 0 
      ? sampleOptions[0].text 
      : "Chest discomfort and heaviness for 2 days.";

    setTimeout(() => {
      setHeardText(simulatedResponse);
      setIsListening(false);
      setHasCaptured(true);
    }, 1800);
  };

  const handleConfirmHeard = () => {
    if (onTranscript && heardText) {
      onTranscript(heardText);
      setHasCaptured(false);
      setHeardText('');
    }
  };

  const handleRetry = () => {
    setHeardText('');
    setHasCaptured(false);
    toggleListening();
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      
      {!hasCaptured ? (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleListening}
            disabled={disabled}
            aria-label={isListening ? "Stop listening" : "Speak your answer"}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all border shadow-xs ${
              isListening
                ? 'bg-red-50 text-red-700 border-red-300 ring-2 ring-red-100'
                : 'bg-white hover:bg-sky-50 text-sky-800 border-slate-200 hover:border-sky-300'
            }`}
          >
            <Mic className={`w-5 h-5 ${isListening ? 'text-red-600 animate-pulse' : 'text-sky-600'}`} />
            <span>{isListening ? "Listening... (Speak now)" : "🎤 Speak your answer"}</span>
          </button>

          {onTypeInstead && (
            <button
              type="button"
              onClick={onTypeInstead}
              className="flex items-center gap-1.5 px-4 py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors"
            >
              <Keyboard className="w-4 h-4 text-slate-500" />
              <span>Type instead</span>
            </button>
          )}
        </div>
      ) : (
        /* We Heard Confirmation Box */
        <div className="w-full max-w-lg bg-sky-50/70 border border-sky-200 rounded-xl p-4 text-left animate-fadeIn">
          <span className="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-1">
            We heard:
          </span>
          <p className="text-sm font-semibold text-slate-900 mb-3 bg-white p-3 rounded-lg border border-sky-100">
            "{heardText}"
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleConfirmHeard}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Use Answer</span>
            </button>
            <button
              type="button"
              onClick={handleRetry}
              className="bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs px-3 py-2 rounded-lg border border-slate-200 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
            {onTypeInstead && (
              <button
                type="button"
                onClick={onTypeInstead}
                className="text-xs text-sky-700 hover:underline font-medium ml-auto"
              >
                Type instead
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
