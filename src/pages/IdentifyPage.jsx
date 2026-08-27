import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Phone, UserCheck, UserPlus, ShieldCheck, Lock, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { useKiosk } from '../context/KioskContext';
import { KioskLayout } from '../components/layout/KioskLayout';
import { KioskFooter } from '../components/layout/KioskFooter';
import { LargeButton } from '../components/ui/LargeButton';
import { patientService } from '../services/patientService';
import { DEMO_PATIENT } from '../data/mockPatients';

export const IdentifyPage = () => {
  const navigate = useNavigate();
  const { setPatient, speakText, startDemoMode } = useKiosk();

  const [activeTab, setActiveTab] = useState('abha'); // 'abha' | 'mobile' | 'patient_id' | 'new_patient'
  const [abhaInput, setAbhaInput] = useState('91-4829-1029-4820');
  const [mobileInput, setMobileInput] = useState('9876543210');
  const [patientIdInput, setPatientIdInput] = useState('MK-10284');
  const [otpInput, setOtpInput] = useState('');
  const [stepOtp, setStepOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [identifiedPatient, setIdentifiedPatient] = useState(null);

  // New Patient registration form state
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newGender, setNewGender] = useState('Male');
  const [newMobile, setNewMobile] = useState('');

  const handleAbhaLookup = async () => {
    setErrorMsg('');
    setLoading(true);
    speakText("Verifying ABHA ID with mock gateway.");
    const res = await patientService.searchByAbha(abhaInput);
    setLoading(false);
    if (res.success) {
      setIdentifiedPatient(res.patient);
      setPatient(res.patient);
      speakText(`Welcome ${res.patient.name}.`);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleMobileSendOtp = async () => {
    setErrorMsg('');
    setLoading(true);
    const res = await patientService.searchByMobile(mobileInput);
    setLoading(false);
    if (res.requiresOtp) {
      setStepOtp(true);
      speakText("OTP sent. For demo, use code 4820.");
    }
  };

  const handleVerifyOtp = async () => {
    setErrorMsg('');
    setLoading(true);
    const res = await patientService.verifyOtp(mobileInput, otpInput);
    setLoading(false);
    if (res.success) {
      setIdentifiedPatient(res.patient);
      setPatient(res.patient);
      speakText(`Verified. Welcome ${res.patient.name}.`);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleNewPatientRegister = async () => {
    if (!newName || !newAge) {
      setErrorMsg("Please enter your name and age to continue.");
      return;
    }
    setLoading(true);
    const res = await patientService.registerNewPatient({
      name: newName,
      age: newAge,
      gender: newGender,
      mobile: newMobile
    });
    setLoading(false);
    setIdentifiedPatient(res.patient);
    setPatient(res.patient);
    speakText(`Welcome ${res.patient.name}. Registration created.`);
  };

  const handleProceed = () => {
    if (!identifiedPatient) {
      setPatient(DEMO_PATIENT);
    }
    navigate('/consent');
  };

  return (
    <KioskLayout
      currentStepIndex={0}
      title="Let's identify your hospital record"
      subtitle="Enter your ABHA number, registered mobile number, or hospital ID."
      audioPrompt="Please identify yourself using your ABHA number, mobile number, or register as a new patient."
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-5">
        
        {/* Method Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => { setActiveTab('abha'); setStepOtp(false); setErrorMsg(''); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeTab === 'abha'
                ? 'bg-white text-sky-800 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>ABHA</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('mobile'); setErrorMsg(''); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeTab === 'mobile'
                ? 'bg-white text-sky-800 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Mobile</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('patient_id'); setStepOtp(false); setErrorMsg(''); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeTab === 'patient_id'
                ? 'bg-white text-sky-800 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Hospital ID</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('new_patient'); setStepOtp(false); setErrorMsg(''); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeTab === 'new_patient'
                ? 'bg-white text-sky-800 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>New Patient</span>
          </button>
        </div>

        {/* Input Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          
          {/* ABHA Tab */}
          {activeTab === 'abha' && (
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Enter ABHA Number or ABHA Address
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={abhaInput}
                  onChange={(e) => setAbhaInput(e.target.value)}
                  placeholder="e.g. 91-4829-1029-4820 or name@abdm"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-base font-mono focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                />
                <LargeButton
                  variant="primary"
                  size="md"
                  onClick={handleAbhaLookup}
                  disabled={loading || !abhaInput}
                >
                  {loading ? "Verifying..." : "Verify ABHA"}
                </LargeButton>
              </div>
              <p className="text-xs text-slate-500">
                14-digit ABHA number or your registered @abdm address
              </p>
            </div>
          )}

          {/* Mobile Tab */}
          {activeTab === 'mobile' && (
            <div className="flex flex-col gap-3">
              {!stepOtp ? (
                <>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Enter Registered 10-Digit Mobile Number
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="flex-1 relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">+91</span>
                      <input
                        type="tel"
                        maxLength="10"
                        value={mobileInput}
                        onChange={(e) => setMobileInput(e.target.value)}
                        placeholder="98765 43210"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-12 pr-4 py-3 text-slate-900 text-base font-mono focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                      />
                    </div>
                    <LargeButton
                      variant="primary"
                      size="md"
                      onClick={handleMobileSendOtp}
                      disabled={loading || mobileInput.length < 10}
                    >
                      {loading ? "Sending..." : "Send OTP"}
                    </LargeButton>
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Enter 4-Digit Verification Code (Demo OTP: <strong>4820</strong>)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="text"
                      maxLength="4"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="4820"
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-xl font-mono text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                    />
                    <LargeButton
                      variant="success"
                      size="md"
                      onClick={handleVerifyOtp}
                      disabled={loading || otpInput.length < 4}
                    >
                      {loading ? "Verifying..." : "Confirm OTP"}
                    </LargeButton>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStepOtp(false)}
                    className="text-xs text-sky-700 hover:underline mt-2 font-medium"
                  >
                    Change mobile number
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hospital ID Tab */}
          {activeTab === 'patient_id' && (
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Enter Patient Registration / UHID Number
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={patientIdInput}
                  onChange={(e) => setPatientIdInput(e.target.value)}
                  placeholder="e.g. MK-10284"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-base font-mono focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                />
                <LargeButton
                  variant="primary"
                  size="md"
                  onClick={handleAbhaLookup}
                  disabled={loading || !patientIdInput}
                >
                  {loading ? "Searching..." : "Lookup UHID"}
                </LargeButton>
              </div>
            </div>
          )}

          {/* New Patient Registration */}
          {activeTab === 'new_patient' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Patient Name"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Age in Years *</label>
                <input
                  type="number"
                  value={newAge}
                  onChange={(e) => setNewAge(e.target.value)}
                  placeholder="e.g. 42"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Gender</label>
                <select
                  value={newGender}
                  onChange={(e) => setNewGender(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={newMobile}
                  onChange={(e) => setNewMobile(e.target.value)}
                  placeholder="+91 99999 00000"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <LargeButton
                  variant="primary"
                  size="md"
                  onClick={handleNewPatientRegister}
                  className="w-full"
                >
                  Create Intake Record
                </LargeButton>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-red-800 text-xs">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Identified Record Confirmation */}
          {identifiedPatient && (
            <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{identifiedPatient.name}</h4>
                  <p className="text-xs text-slate-600">
                    Age: <strong>{identifiedPatient.age} Yrs</strong> • Gender: <strong>{identifiedPatient.gender}</strong> • ABHA: <span className="font-mono">{identifiedPatient.abhaId}</span>
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-200">
                Verified
              </span>
            </div>
          )}

        </div>

        {/* Prototype Connection Disclaimer */}
        <p className="text-xs text-slate-500 text-center leading-relaxed">
          * This is a prototype connection. Real ABDM/HIS verification will be connected through authorized APIs.
        </p>

      </div>

      <KioskFooter
        onBack={() => navigate('/welcome')}
        onNext={handleProceed}
        nextLabel="Continue to Consent"
        currentPromptText="Please identify yourself with your ABHA number or mobile number and tap Continue."
      />
    </KioskLayout>
  );
};
