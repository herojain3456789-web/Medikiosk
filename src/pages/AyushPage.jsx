import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKiosk } from '../context/KioskContext';
import { KioskLayout } from '../components/layout/KioskLayout';
import { KioskFooter } from '../components/layout/KioskFooter';
import { AyushForm } from '../components/history/AyushForm';

export const AyushPage = () => {
  const navigate = useNavigate();
  const { speakText } = useKiosk();

  const handleProceed = () => {
    speakText("AYUSH clinical history saved. Proceeding to medical records.");
    navigate('/documents');
  };

  return (
    <KioskLayout
      currentStepIndex={2}
      currentStageTitle="03. AYUSH Clinical History"
      title="AYUSH Clinical History"
      subtitle="Structured assessment for Ayurvedic, Homeopathic, and Integrative OPD consultations."
      audioPrompt="Please complete the AYUSH intake sections, or tap Continue to add previous records."
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-5">
        <AyushForm onSave={handleProceed} />
      </div>

      <KioskFooter
        onBack={() => navigate('/history')}
        onNext={handleProceed}
        nextLabel="Continue to Medical Records"
        currentPromptText="Tap Continue to Medical Records to add previous prescriptions and tests."
      />
    </KioskLayout>
  );
};
