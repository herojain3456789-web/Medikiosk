import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle2, ShieldCheck, Database, Server, FileCode, ArrowRight, Loader2, Zap } from 'lucide-react';
import { useKiosk } from '../context/KioskContext';
import { KioskLayout } from '../components/layout/KioskLayout';
import { KioskFooter } from '../components/layout/KioskFooter';
import { LargeButton } from '../components/ui/LargeButton';
import { abdmService } from '../services/abdmService';
import { hisService } from '../services/hisService';

export const IntegrationPage = () => {
  const navigate = useNavigate();
  const {
    patient,
    clinicalSummary,
    scannedDocuments,
    integrationStatus,
    setIntegrationStatus,
    speakText
  } = useKiosk();

  const [syncing, setSyncing] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [showFhirJson, setShowFhirJson] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(integrationStatus.isSynced);

  const fhirBundle = abdmService.generateFhirBundle(patient, clinicalSummary, scannedDocuments);

  const handleStartSync = async () => {
    setSyncing(true);
    setSyncSuccess(false);
    speakText("Synchronizing intake summary with hospital systems.");

    const res = await hisService.sendToHospitalSystem(fhirBundle, (step) => {
      setCurrentStep(step);
    });

    setSyncing(false);
    setSyncSuccess(true);
    setIntegrationStatus({
      isSynced: true,
      transactionId: res.transactionId,
      syncedAt: new Date().toLocaleTimeString(),
      abhaLinked: true,
      fhirGenerated: true,
      room: res.room,
      token: patient?.token || 'A-104',
      doctor: res.assignedDoctor
    });
    speakText("Record synchronized. Your intake is complete.");
  };

  const handleProceedToSuccess = () => {
    navigate('/success');
  };

  const integrationStatuses = [
    { label: "Patient identity", status: "Ready", icon: CheckCircle2, stateColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { label: "Consent", status: "Confirmed", icon: CheckCircle2, stateColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { label: "Clinical summary", status: "Reviewed", icon: CheckCircle2, stateColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { label: "FHIR record", status: "Prepared", icon: FileCode, stateColor: "text-sky-700 bg-sky-50 border-sky-200" },
    { label: "HIS connection", status: "Simulated", icon: Server, stateColor: "text-amber-700 bg-amber-50 border-amber-200" },
  ];

  return (
    <KioskLayout
      currentStageTitle="Hospital System Transmission"
      title="Hospital HIS & ABDM Synchronization"
      subtitle="Structuring clinical data into HL7 FHIR standard and transmitting to the hospital's central EMR queue."
      audioPrompt="Tap Send to Hospital System to synchronize your record."
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-5">
        
        {/* Statuses Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {integrationStatuses.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-between shadow-xs"
            >
              <span className="text-[11px] font-semibold text-slate-500 truncate block">
                {item.label}
              </span>
              <div className={`mt-2 inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded border ${item.stateColor}`}>
                <item.icon className="w-3 h-3" />
                <span>{item.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Transmission Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center flex flex-col items-center">
          
          {!syncSuccess ? (
            <div className="max-w-md w-full flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {syncing ? currentStep?.label || "Synchronizing with Hospital EMR..." : "Ready to Send to Hospital System"}
              </h3>
              <p className="text-xs text-slate-500">
                Transmits structured FHIR summary directly to Room 4 OPD physician terminal.
              </p>

              <LargeButton
                variant="primary"
                size="lg"
                onClick={handleStartSync}
                disabled={syncing}
                icon={syncing ? Loader2 : Send}
                className="w-full mt-2"
              >
                {syncing ? "Transmitting to Hospital..." : "Send to Hospital System"}
              </LargeButton>
            </div>
          ) : (
            <div className="max-w-md w-full flex flex-col items-center gap-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Record Successfully Synchronized
              </h3>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 w-full text-left text-xs space-y-1 font-mono">
                <p className="text-slate-600">Transaction ID: <span className="text-slate-900 font-bold">{integrationStatus.transactionId || "HIS-SYNC-94812"}</span></p>
                <p className="text-slate-600">Terminal: <span className="text-slate-900">OPD Room 4 (Dr. Ananya Verma)</span></p>
                <p className="text-slate-600">Token Queue: <span className="text-sky-700 font-bold">A-104 (~10 mins wait)</span></p>
              </div>

              <LargeButton
                variant="primary"
                size="lg"
                onClick={handleProceedToSuccess}
                icon={ArrowRight}
                className="w-full mt-2"
              >
                View Patient Token
              </LargeButton>
            </div>
          )}

          {/* FHIR JSON Inspector Toggle */}
          <div className="mt-4 pt-4 border-t border-slate-100 w-full flex justify-center">
            <button
              type="button"
              onClick={() => setShowFhirJson(!showFhirJson)}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{showFhirJson ? "Hide FHIR R4 JSON" : "Inspect FHIR R4 Bundle"}</span>
            </button>
          </div>

          {showFhirJson && (
            <div className="mt-3 p-3 rounded-xl bg-slate-900 text-left font-mono text-[11px] text-sky-300 overflow-x-auto max-h-52 w-full animate-fadeIn">
              <pre>{JSON.stringify(fhirBundle, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Prototype notice */}
        <p className="text-[11px] text-slate-400 italic text-center">
          * Prototype connection: Simulates compliant ABDM Consent and HL7 FHIR R4 Bundle generation for OPD intake.
        </p>

      </div>

      <KioskFooter
        onBack={() => navigate('/summary')}
        onNext={handleProceedToSuccess}
        nextLabel="View Patient Token"
        nextDisabled={!syncSuccess}
        currentPromptText={syncSuccess ? "Sync complete. Tap View Patient Token." : "Tap Send to Hospital System."}
      />
    </KioskLayout>
  );
};
