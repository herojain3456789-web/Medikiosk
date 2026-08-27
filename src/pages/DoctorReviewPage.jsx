import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, CheckCircle2, AlertTriangle, Edit3, MessageSquare, Send, ArrowRight, ShieldCheck, User, Pill, Activity, FileCheck, Check } from 'lucide-react';
import { useKiosk } from '../context/KioskContext';
import { DoctorLayout } from '../components/layout/DoctorLayout';
import { LargeButton } from '../components/ui/LargeButton';
import { StatusBadge } from '../components/ui/StatusBadge';

export const DoctorReviewPage = () => {
  const navigate = useNavigate();
  const {
    patient,
    clinicalSummary,
    doctorNotes,
    setDoctorNotes,
    doctorApproved,
    setDoctorApproved,
    speakText
  } = useKiosk();

  const [notesInput, setNotesInput] = useState(doctorNotes || '');
  const [quickFlags, setQuickFlags] = useState({
    urgentEcgRequired: true,
    cardiacTroponinWorkup: true,
    continueTelmisartan: true,
    cautionPenicillinAllergy: true
  });
  const [isConfirmed, setIsConfirmed] = useState(doctorApproved);

  const handleConfirmSummary = () => {
    setIsConfirmed(true);
    setDoctorApproved(true);
    setDoctorNotes(notesInput);
    speakText("Physician validated clinical summary. Preparing FHIR transmission to Hospital EMR.");
    navigate('/integration');
  };

  return (
    <DoctorLayout
      title="Physician Review & Clinical Sign-off"
      subtitle="Verify pre-intake summary, record physician orders, and synchronize with EMR."
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
        
        {/* 1. Patient Identity Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shrink-0">
              RS
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-slate-900">{patient?.name || "Rahul Sharma"}</h3>
                <span className="bg-slate-100 text-slate-700 font-mono text-xs px-2 py-0.5 rounded border border-slate-200">
                  {patient?.id || "MK-10284"}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded border border-emerald-200">
                  Token: A-104 (Room 4)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                42 Yrs • Male • B+ • ABHA: <span className="font-mono text-slate-700">{patient?.abhaId || "91-4829-1029-4820"}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/summary')}
            className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Full Intake</span>
          </button>
        </div>

        {/* 2. Chief Complaint Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              2. Chief Complaint
            </h4>
            <StatusBadge type="patient" />
          </div>
          <p className="text-sm font-semibold text-slate-900">
            {clinicalSummary.chiefComplaint?.content}
          </p>
        </div>

        {/* 3. Important Triage Alerts */}
        <div className="bg-red-50/70 border border-red-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-red-900">
                3. Priority Clinical Alert — Acute Coronary Workup Indicated
              </h4>
              <p className="text-xs text-red-800 mt-0.5 leading-relaxed">
                Patient reports central chest tightness radiating to the left shoulder with exertional worsening. Known hypertensive on Telmisartan. Family history of premature CAD.
              </p>
            </div>
          </div>
        </div>

        {/* 4 & 5: Allergies & Current Medicines in 2-column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* 4. Allergies */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> 4. Documented Allergies
              </h4>
              <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded">High Alert</span>
            </div>
            <ul className="space-y-1.5 text-xs">
              {clinicalSummary.allergyHistory?.items?.map((alg, idx) => (
                <li key={idx} className="bg-red-50 p-2 rounded-lg border border-red-200 text-red-900 flex justify-between">
                  <span className="font-bold">{alg.allergen}</span>
                  <span className="text-red-700">{alg.reaction}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Current Medicines */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-sky-600" /> 5. Current Medicines
              </h4>
              <StatusBadge type="ocr" text="OCR Verified" />
            </div>
            <ul className="space-y-1.5 text-xs">
              {clinicalSummary.drugHistory?.items?.map((med, idx) => (
                <li key={idx} className="bg-slate-50 p-2 rounded-lg border border-slate-200 flex justify-between">
                  <span className="font-bold text-slate-900">{med.name} ({med.dosage})</span>
                  <span className="text-slate-500">{med.compliance}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 6, 7 & 8: Relevant History, Previous Records & Investigations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 6. Relevant History */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              6. Relevant History
            </h4>
            <ul className="space-y-1 text-xs text-slate-700">
              <li>• Primary HTN (2021)</li>
              <li>• Impaired Fasting Glucose (108 mg/dL)</li>
              <li>• Laparoscopic Appendectomy (2021)</li>
              <li>• Father MI at age 54</li>
            </ul>
          </div>

          {/* 7. Previous Records */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              7. Previous Records
            </h4>
            <ul className="space-y-1 text-xs text-slate-700">
              <li>• RML Prescription (12 Aug 2026)</li>
              <li>• Central Lab CBC Panel (28 Jul 2026)</li>
              <li>• Normal ECG Tracing (04 Mar 2026)</li>
            </ul>
          </div>

          {/* 8. Investigations */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              8. Lab Findings
            </h4>
            <ul className="space-y-1 text-xs text-slate-700">
              <li>• Hb: <strong className="text-red-700 font-mono">11.2 g/dL</strong> (Mild low)</li>
              <li>• Fasting Glucose: <strong className="text-amber-700 font-mono">108 mg/dL</strong></li>
              <li>• Serum Creatinine: <strong className="font-mono">0.95 mg/dL</strong></li>
            </ul>
          </div>

        </div>

        {/* 9. Full Clinical Summary Box */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            9. History of Present Illness (HPI)
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed">
            {clinicalSummary.hpi?.content}
          </p>
        </div>

        {/* Doctor Actions & Sign-off */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-3">
          
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex-1 w-full">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Physician Notes & Clinical Orders:
              </label>
              <input
                type="text"
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="e.g. Stat 12-lead ECG ordered in OPD Room 4. Maintain Telmisartan 40mg."
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="shrink-0 pt-4 sm:pt-0">
              <LargeButton
                variant="primary"
                size="md"
                onClick={handleConfirmSummary}
                icon={Check}
                className="w-full sm:w-auto"
              >
                Confirm Clinical Summary
              </LargeButton>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic text-center pt-1">
            * MediKiosk is AI-assisted. Doctor remains the final decision maker.
          </p>

        </div>

      </div>
    </DoctorLayout>
  );
};
