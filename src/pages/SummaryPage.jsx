import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Stethoscope, ArrowRight, ShieldCheck } from 'lucide-react';
import { useKiosk } from '../context/KioskContext';
import { KioskLayout } from '../components/layout/KioskLayout';
import { KioskFooter } from '../components/layout/KioskFooter';
import { SummarySectionCard } from '../components/summary/SummarySectionCard';
import { RedFlagBanner } from '../components/ui/RedFlagBanner';

export const SummaryPage = () => {
  const navigate = useNavigate();
  const {
    patient,
    clinicalSummary,
    updateSummarySection,
    redFlagAlert,
    speakText
  } = useKiosk();

  const handleProceedToDoctorReview = () => {
    speakText("Opening Doctor Review interface.");
    navigate('/doctor-review');
  };

  const handleProceedToIntegration = () => {
    speakText("Sending clinical intake summary to hospital systems.");
    navigate('/integration');
  };

  return (
    <KioskLayout
      currentStepIndex={4}
      currentStageTitle="05. Clinical Summary"
      title="Clinical Summary"
      subtitle="Prepared from your responses and previous medical records."
      audioPrompt="Here is your clinical intake summary. Please review the details before it is sent to your doctor."
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
        
        {/* Patient Identity Strip */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold border border-sky-200 shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">{patient?.name || "Rahul Sharma"}</h3>
                <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                  {patient?.id || "MK-10284"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {patient?.age || 42} Yrs • {patient?.gender || "Male"} • ABHA: <span className="font-mono">{patient?.abhaId || "91-4829-1029-4820"}</span>
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-600 font-medium">
            Destination: <strong className="text-slate-900">{patient?.opdRoom || "Room 4 — General Medicine"}</strong>
          </div>
        </div>

        {/* Triage Priority Alert if active */}
        {redFlagAlert?.isRedFlag && (
          <RedFlagBanner
            message="Important information: Your answer regarding chest discomfort radiating to the left arm may require prompt attention. A triage notification will be attached for your doctor."
            triggers={redFlagAlert.matchedTriggers}
          />
        )}

        {/* 9 Clinical Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          
          {/* 1. Chief Complaint (Full width) */}
          <div className="md:col-span-2">
            <SummarySectionCard
              title="1. Chief Complaint"
              content={clinicalSummary.chiefComplaint?.content}
              badgeType="patient"
              sourceText="Patient response"
              isRedFlag={true}
              onSave={(newText) => updateSummarySection('chiefComplaint', newText)}
            />
          </div>

          {/* 2. History of Present Illness (Full width) */}
          <div className="md:col-span-2">
            <SummarySectionCard
              title="2. History of Present Illness (HPI)"
              content={clinicalSummary.hpi?.content}
              badgeType="ai"
              sourceText="AI structured"
              onSave={(newText) => updateSummarySection('hpi', newText)}
            />
          </div>

          {/* 3. Past Medical History */}
          <SummarySectionCard
            title="3. Past Medical History"
            items={clinicalSummary.pastMedicalHistory?.items}
            badgeType="ocr"
            sourceText="OCR extracted"
            onSave={(newItems) => updateSummarySection('pastMedicalHistory', newItems)}
          />

          {/* 4. Past Surgical History */}
          <SummarySectionCard
            title="4. Past Surgical History"
            items={clinicalSummary.pastSurgicalHistory?.items}
            badgeType="ocr"
            sourceText="OCR extracted"
            onSave={(newItems) => updateSummarySection('pastSurgicalHistory', newItems)}
          />

          {/* 5. Drug History */}
          <SummarySectionCard
            title="5. Drug History & Current Medications"
            items={clinicalSummary.drugHistory?.items}
            badgeType="ocr"
            sourceText="Prescription OCR"
            onSave={(newItems) => updateSummarySection('drugHistory', newItems)}
          />

          {/* 6. Allergy History */}
          <SummarySectionCard
            title="6. Allergy History"
            items={clinicalSummary.allergyHistory?.items}
            badgeType="patient"
            sourceText="Patient response"
            isRedFlag={true}
            onSave={(newItems) => updateSummarySection('allergyHistory', newItems)}
          />

          {/* 7. Family & Personal History */}
          <SummarySectionCard
            title="7. Family & Social History"
            items={clinicalSummary.familyPersonalHistory?.items}
            badgeType="patient"
            sourceText="Patient response"
            onSave={(newItems) => updateSummarySection('familyPersonalHistory', newItems)}
          />

          {/* 8. Review of Systems */}
          <SummarySectionCard
            title="8. Review of Systems (ROS)"
            items={[
              ...clinicalSummary.reviewOfSystems?.positive?.map(p => `[+] Positive: ${p}`) || [],
              ...clinicalSummary.reviewOfSystems?.negative?.map(n => `[-] Negative: ${n}`) || []
            ]}
            badgeType="ai"
            sourceText="AI structured"
          />

          {/* 9. Previous Investigations (Full width) */}
          <div className="md:col-span-2">
            <SummarySectionCard
              title="9. Previous Investigations & Lab Trends"
              items={clinicalSummary.investigations?.items}
              badgeType="ocr"
              sourceText="Lab OCR extracted"
            />
          </div>

        </div>

        {/* Visible Principle: AI-assisted. Doctor reviewed. */}
        <p className="text-xs text-slate-500 text-center font-medium py-2">
          AI-assisted intake summary. Prepared for doctor review and confirmation.
        </p>

      </div>

      <KioskFooter
        onBack={() => navigate('/timeline')}
        onNext={handleProceedToDoctorReview}
        nextLabel="Doctor Review Portal"
        nextSubtext="Step 5 of 5"
        currentPromptText="Tap Doctor Review Portal to view the physician terminal review."
      />
    </KioskLayout>
  );
};
