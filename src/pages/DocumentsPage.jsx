import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, UploadCloud, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { useKiosk } from '../context/KioskContext';
import { KioskLayout } from '../components/layout/KioskLayout';
import { KioskFooter } from '../components/layout/KioskFooter';
import { CameraScanner } from '../components/documents/CameraScanner';
import { DocumentUploadBox } from '../components/documents/DocumentUploadBox';
import { PRESET_SAMPLE_DOCUMENTS } from '../data/mockDocuments';

export const DocumentsPage = () => {
  const navigate = useNavigate();
  const { scannedDocuments, addScannedDocument, speakText } = useKiosk();
  const [activeMode, setActiveMode] = useState('camera'); // 'camera' | 'upload'
  const [selectedDocType, setSelectedDocType] = useState('Prescription');

  const docTypes = [
    'Prescription',
    'Laboratory Report',
    'Discharge Summary',
    'Imaging Report',
    'Other'
  ];

  const handleDocumentCaptured = (doc) => {
    addScannedDocument(doc);
    speakText(`Document captured. Processing.`);
    navigate('/documents/processing', { state: { document: doc } });
  };

  const handleDocumentSelected = (doc) => {
    addScannedDocument(doc);
    speakText(`Document uploaded.`);
    navigate('/documents/processing', { state: { document: doc } });
  };

  const handleSkip = () => {
    speakText("Skipping previous records. Generating clinical summary.");
    navigate('/summary');
  };

  const handleProcessExisting = () => {
    const docToProcess = scannedDocuments[0] || PRESET_SAMPLE_DOCUMENTS[0];
    navigate('/documents/processing', { state: { document: docToProcess } });
  };

  return (
    <KioskLayout
      currentStepIndex={3}
      currentStageTitle="04. Previous Medical Records"
      title="Previous Medical Records"
      subtitle="If you have prescriptions, reports or discharge summaries, you can add them here."
      audioPrompt="If you have previous prescriptions or test reports, scan or upload them now, or tap skip."
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-5">
        
        {/* Document Type Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Type:
          </span>
          {docTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedDocType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                selectedDocType === type
                  ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Mode Switcher: Scan Document vs Upload File */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 max-w-sm mx-auto w-full">
          <button
            type="button"
            onClick={() => setActiveMode('camera')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-semibold text-xs transition-all ${
              activeMode === 'camera'
                ? 'bg-white text-sky-800 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Scan Document</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-semibold text-xs transition-all ${
              activeMode === 'upload'
                ? 'bg-white text-sky-800 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload File</span>
          </button>
        </div>

        {/* Input Component */}
        {activeMode === 'camera' ? (
          <CameraScanner
            onCaptureDocument={handleDocumentCaptured}
          />
        ) : (
          <DocumentUploadBox
            onDocumentSelected={handleDocumentSelected}
          />
        )}

        {/* Skip option reassurance */}
        <div className="bg-slate-100/80 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs">
          <p className="text-slate-600">
            Do not have any previous records with you today? <strong>You can skip this step.</strong>
          </p>
          <button
            type="button"
            onClick={handleSkip}
            className="text-sky-700 hover:text-sky-900 font-bold whitespace-nowrap hover:underline"
          >
            Skip this step
          </button>
        </div>

      </div>

      <KioskFooter
        onBack={() => navigate('/history/ayush')}
        onNext={handleProcessExisting}
        nextLabel="Process Document"
        currentPromptText="Please scan or upload your document, or skip to continue."
      />
    </KioskLayout>
  );
};
