import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Loader2, FileText, ArrowRight } from 'lucide-react';
import { useKiosk } from '../context/KioskContext';
import { KioskLayout } from '../components/layout/KioskLayout';
import { KioskFooter } from '../components/layout/KioskFooter';
import { ExtractedDataCard } from '../components/documents/ExtractedDataCard';
import { documentService } from '../services/documentService';
import { PRESET_SAMPLE_DOCUMENTS } from '../data/mockDocuments';

export const ProcessingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { speakText } = useKiosk();

  const docToProcess = location.state?.document || PRESET_SAMPLE_DOCUMENTS[0];

  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [isDone, setIsDone] = useState(false);
  const [extractedResult, setExtractedResult] = useState(null);

  const processingSteps = [
    { step: 1, label: "Document received" },
    { step: 2, label: "Image enhanced" },
    { step: 3, label: "Text extracted" },
    { step: 4, label: "Medical information identified" },
    { step: 5, label: "Date identified" },
    { step: 6, label: "Record organized" },
  ];

  useEffect(() => {
    let isMounted = true;
    speakText("Processing document and extracting medical information.");

    const runSteps = async () => {
      for (let i = 1; i <= 6; i++) {
        if (!isMounted) return;
        setCurrentStepIndex(i);
        await new Promise(r => setTimeout(r, 400));
      }

      if (isMounted) {
        setIsDone(true);
        setExtractedResult(docToProcess);
        speakText("Document successfully processed. Please review the extracted information.");
      }
    };

    runSteps();

    return () => { isMounted = false; };
  }, [docToProcess, speakText]);

  const handleProceedToTimeline = () => {
    navigate('/timeline');
  };

  return (
    <KioskLayout
      currentStepIndex={3}
      currentStageTitle="04. Document Processing"
      title={isDone ? "Extracted Information" : "Reading your medical record..."}
      subtitle={isDone ? "Review extracted medicines, lab values, and clinical notes before organizing." : "Optical character recognition and entity extraction in progress."}
      audioPrompt={isDone ? "Please review your extracted records." : "Please wait while we organize your record."}
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-5">
        
        {/* Step-by-Step Progress Card */}
        {!isDone ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {processingSteps[currentStepIndex - 1]?.label}
                </h3>
                <p className="text-xs text-slate-500">
                  Processing: {docToProcess?.title || "Medical Record"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {processingSteps.map((s) => {
                const isCompleted = currentStepIndex > s.step;
                const isCurrent = currentStepIndex === s.step;

                return (
                  <div
                    key={s.step}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold border ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : isCurrent
                        ? 'bg-sky-50 text-sky-800 border-sky-200 font-bold'
                        : 'bg-slate-50 text-slate-400 border-slate-100'
                    }`}
                  >
                    <span>{s.step}. {s.label}</span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <Loader2 className="w-3.5 h-3.5 text-sky-600 animate-spin" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Extracted Document Intelligence Card */
          <div className="animate-fadeIn">
            <ExtractedDataCard
              documentData={extractedResult || docToProcess}
            />
          </div>
        )}

      </div>

      <KioskFooter
        onBack={() => navigate('/documents')}
        onNext={handleProceedToTimeline}
        nextLabel="View Medical Timeline"
        nextDisabled={!isDone}
        currentPromptText={isDone ? "Please review your extracted records and tap View Medical Timeline." : "Reading records."}
      />
    </KioskLayout>
  );
};
