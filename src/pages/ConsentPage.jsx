import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, HeartPulse, FileText, Pill, Activity, AlertCircle, Check, Lock } from 'lucide-react';
import { useKiosk } from '../context/KioskContext';
import { KioskLayout } from '../components/layout/KioskLayout';
import { KioskFooter } from '../components/layout/KioskFooter';
import { LargeButton } from '../components/ui/LargeButton';

export const ConsentPage = () => {
  const navigate = useNavigate();
  const { consentGiven, setConsentGiven, speakText } = useKiosk();
  const [agreed, setAgreed] = useState(consentGiven || true);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  const consentItems = [
    { label: "Health history", desc: "Current health concerns and symptom details" },
    { label: "Medicines", desc: "Daily tablets and current medication dosages" },
    { label: "Allergies", desc: "Documented drug reactions or sensitivities" },
    { label: "Previous reports", desc: "Prescriptions, laboratory tests, and discharge summaries" },
    { label: "Relevant clinical information", desc: "Past conditions and comorbidities" },
  ];

  const handleAgree = () => {
    setConsentGiven(true);
    speakText("Consent granted. Let us begin your health history.");
    navigate('/history');
  };

  const handleDecline = () => {
    setShowDeclineModal(true);
  };

  return (
    <KioskLayout
      currentStepIndex={1}
      title="Your consent matters"
      subtitle="MediKiosk will collect information about your current health concerns and previous medical records to prepare information for your doctor."
      audioPrompt="Please review what information will be organized for your doctor, and provide your consent to continue."
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-5">
        
        {/* Consent Scope Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
            Information collected for your doctor
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {consentItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.label}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy Reassurance Banner */}
          <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Your information is handled securely and shared only with your attending OPD doctor.</span>
          </div>
        </div>

        {/* Clear Consent Checkbox */}
        <div
          onClick={() => setAgreed(!agreed)}
          className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex items-center gap-3.5 ${
            agreed
              ? 'bg-sky-50/60 border-sky-600 shadow-sm'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
            agreed ? 'bg-sky-600 text-white' : 'bg-white border border-slate-300'
          }`}>
            {agreed && <Check className="w-4 h-4 stroke-[3]" />}
          </div>
          <div className="flex-1">
            <p className="text-base font-bold text-slate-900 leading-snug">
              I understand and agree to provide this information for my consultation.
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              (मैं अपनी आज की ओपीडी परामर्श के लिए यह जानकारी प्रदान करने की सहमति देता हूँ)
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleDecline}
            className="w-full sm:w-auto px-5 py-3 rounded-xl text-slate-600 hover:text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-colors"
          >
            I Do Not Agree
          </button>

          <LargeButton
            variant="primary"
            size="lg"
            onClick={handleAgree}
            disabled={!agreed}
            icon={ShieldCheck}
            className="w-full sm:w-auto min-w-[16rem]"
          >
            I Agree & Continue
          </LargeButton>
        </div>

      </div>

      {/* Decline Confirmation Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-xl text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 border border-amber-200">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Proceed without Kiosk Intake?
            </h3>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              If you decline, you can still proceed directly to Room 4. Your doctor will take your complete clinical history verbally during your appointment.
            </p>
            <div className="flex flex-col gap-2">
              <LargeButton
                variant="primary"
                size="md"
                onClick={() => setShowDeclineModal(false)}
                className="w-full"
              >
                Back to Consent
              </LargeButton>
              <button
                type="button"
                onClick={() => navigate('/welcome')}
                className="text-xs text-slate-500 hover:text-red-600 py-2 font-medium"
              >
                Exit to Home
              </button>
            </div>
          </div>
        </div>
      )}

      <KioskFooter
        onBack={() => navigate('/identify')}
        onNext={handleAgree}
        nextLabel="I Agree & Continue"
        nextDisabled={!agreed}
        currentPromptText="Please review the consent options and tap I Agree and Continue."
      />
    </KioskLayout>
  );
};
