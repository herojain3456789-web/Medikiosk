import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Printer, Smartphone, Home, Eye, Clock } from 'lucide-react';
import { useKiosk } from '../context/KioskContext';
import { LargeButton } from '../components/ui/LargeButton';

export const SuccessPage = () => {
  const navigate = useNavigate();
  const { patient, integrationStatus, resetSession, speakText } = useKiosk();
  const [printed, setPrinted] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  useEffect(() => {
    speakText("Your information is ready. Your token is A-104. Please proceed to Room 4.");
  }, [speakText]);

  const handlePrint = () => {
    setPrinted(true);
    speakText("Printing your OPD intake slip.");
    setTimeout(() => setPrinted(false), 3500);
  };

  const handleSms = () => {
    setSmsSent(true);
    speakText("Token sent to your mobile number.");
    setTimeout(() => setSmsSent(false), 3500);
  };

  const handleReturnHome = () => {
    resetSession();
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-6 relative">
      
      {/* Main Content Box */}
      <main className="max-w-xl mx-auto w-full text-center flex flex-col items-center justify-center my-auto py-6">
        
        {/* Clean Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm mb-4">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Your information is ready
        </h2>

        <p className="text-sm sm:text-base text-slate-600 font-normal mt-1 max-w-md">
          Your clinical history and previous records have been prepared for the doctor.
        </p>

        {/* Token Card */}
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mt-6 text-left">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Hospital OPD Token Slip
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {patient?.name || "Rahul Sharma"}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500 block">Status</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Ready for consultation
              </span>
            </div>
          </div>

          {/* Token Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center mb-4">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">
              Your Queue Token
            </span>
            <div className="text-4xl font-bold text-slate-900 font-mono tracking-wider">
              {patient?.token || "A-104"}
            </div>
            <span className="text-xs text-slate-500 font-medium mt-1 inline-block">
              Please watch the OPD display screen for Room 4
            </span>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 block">Assigned Doctor:</span>
              <span className="font-bold text-slate-900">Dr. Ananya Verma, MD</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 block">OPD Room:</span>
              <span className="font-bold text-sky-800">Room 4 — General Medicine</span>
            </div>
          </div>

        </div>

        {/* Print & SMS utilities */}
        <div className="w-full flex flex-col sm:flex-row gap-2.5 mt-4">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 p-3 rounded-xl text-xs font-semibold border border-slate-200 transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>{printed ? "✓ Slip Printing..." : "Print Token Slip"}</span>
          </button>

          <button
            type="button"
            onClick={handleSms}
            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 p-3 rounded-xl text-xs font-semibold border border-slate-200 transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Smartphone className="w-4 h-4 text-slate-500" />
            <span>{smsSent ? "✓ Sent to Mobile" : "Send Token via SMS"}</span>
          </button>
        </div>

        {/* Navigation buttons: Return Home / Open Patient Summary */}
        <div className="w-full flex flex-col sm:flex-row gap-2.5 mt-3">
          <LargeButton
            variant="primary"
            size="md"
            onClick={handleReturnHome}
            icon={Home}
            className="flex-1"
          >
            Return to Kiosk Home
          </LargeButton>

          <button
            type="button"
            onClick={() => navigate('/summary')}
            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 p-3 rounded-xl text-xs font-semibold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>Open Patient Summary</span>
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-xl mx-auto w-full text-center pt-3 text-xs text-slate-400">
        MediKiosk: Pre-consultation clinical intake for hospital OPDs
      </footer>

    </div>
  );
};
