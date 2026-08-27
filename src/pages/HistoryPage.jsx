import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, ArrowLeft, Stethoscope } from 'lucide-react';
import { useKiosk } from '../context/KioskContext';
import { KioskLayout } from '../components/layout/KioskLayout';
import { KioskFooter } from '../components/layout/KioskFooter';
import { QuestionCard } from '../components/history/QuestionCard';
import { HistoryChatTimeline } from '../components/history/HistoryChatTimeline';
import { aiService } from '../services/aiService';

export const HistoryPage = () => {
  const navigate = useNavigate();
  const {
    historyResponses,
    saveHistoryResponse,
    redFlagAlert,
    speakText,
    language
  } = useKiosk();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedComplaint, setSelectedComplaint] = useState('chest_pain');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [activeAnswer, setActiveAnswer] = useState('');

  // Load question for current step
  useEffect(() => {
    const q = aiService.getNextQuestion(currentStepIndex, selectedComplaint);
    if (q) {
      setCurrentQuestion(q);
      const existing = historyResponses.find(r => r.step === q.step);
      setActiveAnswer(existing ? existing.answer : '');
    } else {
      navigate('/history/ayush');
    }
  }, [currentStepIndex, selectedComplaint, historyResponses, navigate]);

  const handleSelectOption = (text, value, isRedFlagCandidate) => {
    setActiveAnswer(text);
    if (currentStepIndex === 0 && value) {
      setSelectedComplaint(value);
    }

    if (currentQuestion) {
      saveHistoryResponse({
        step: currentQuestion.step,
        id: currentQuestion.id,
        question: currentQuestion.question,
        answer: text,
        value: value || text,
        isRedFlag: isRedFlagCandidate || false
      });
      speakText(`Recorded: ${text}`);
    }
  };

  const handleVoiceAnswer = (spokenText) => {
    setActiveAnswer(spokenText);
    if (currentQuestion) {
      saveHistoryResponse({
        step: currentQuestion.step,
        id: currentQuestion.id,
        question: currentQuestion.question,
        answer: spokenText,
        value: spokenText
      });
      speakText(`Recorded: ${spokenText}`);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < 6) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      navigate('/history/ayush');
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else {
      navigate('/consent');
    }
  };

  return (
    <KioskLayout
      currentStepIndex={2}
      currentStageTitle="03. Clinical Health History"
      title="Health History"
      subtitle="Answer the questions below so your story is organized for the doctor."
      audioPrompt={currentQuestion ? currentQuestion.question : "Please answer the question on screen."}
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
        
        {/* Guided Question Card */}
        <QuestionCard
          questionData={currentQuestion}
          selectedAnswer={activeAnswer}
          onSelectOption={handleSelectOption}
          onVoiceAnswer={handleVoiceAnswer}
          onTypeAnswer={handleVoiceAnswer}
          redFlagNotice={redFlagAlert}
        />

        {/* AYUSH Intake Switcher */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Visiting AYUSH / Integrative OPD?</p>
              <p className="text-[11px] text-slate-500">Record Prakriti, Agni & Pariksha parameters</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/history/ayush')}
            className="text-xs text-teal-700 font-semibold px-3 py-1.5 rounded-lg border border-teal-200 hover:bg-teal-50 transition-colors"
          >
            AYUSH Form
          </button>
        </div>

        {/* History Log */}
        <HistoryChatTimeline
          responses={historyResponses}
          onEditResponse={(item) => {
            setCurrentStepIndex(item.step - 1);
          }}
        />

      </div>

      <KioskFooter
        onBack={handlePrevStep}
        onNext={handleNextStep}
        nextLabel={currentStepIndex >= 6 ? "Continue to Records & AYUSH" : "Continue"}
        nextDisabled={!activeAnswer && historyResponses.length === 0}
        currentPromptText={currentQuestion?.question}
      />
    </KioskLayout>
  );
};
