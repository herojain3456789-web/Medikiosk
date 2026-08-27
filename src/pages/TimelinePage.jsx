import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKiosk } from '../context/KioskContext';
import { KioskLayout } from '../components/layout/KioskLayout';
import { KioskFooter } from '../components/layout/KioskFooter';
import { MedicalTimeline } from '../components/summary/MedicalTimeline';

export const TimelinePage = () => {
  const navigate = useNavigate();
  const { speakText } = useKiosk();

  const handleProceed = () => {
    speakText("Timeline organized. Generating clinical summary.");
    navigate('/summary');
  };

  return (
    <KioskLayout
      currentStepIndex={3}
      currentStageTitle="04. Medical Record Timeline"
      title="Organized Medical Timeline"
      subtitle="Your previous prescriptions, lab reports, and hospital records organized chronologically."
      audioPrompt="Here is your organized medical timeline. Tap Continue to view the clinical summary for your doctor."
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
        <MedicalTimeline />
      </div>

      <KioskFooter
        onBack={() => navigate('/documents')}
        onNext={handleProceed}
        nextLabel="Generate Clinical Summary"
        currentPromptText="Tap Generate Clinical Summary to view the final summary."
      />
    </KioskLayout>
  );
};
