import React from 'react';
import { AlertTriangle, BellRing, PhoneCall } from 'lucide-react';

export const RedFlagBanner = ({
  message = "Your response may require prompt attention from the clinical team.",
  triggers = [],
  className = "",
  showStaffAction = true,
  onContinue
}) => {
  return (
    <div
      role="alert"
      className={`rounded-xl border border-red-200 bg-red-50 p-5 shadow-sm ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Clean Alert Icon */}
        <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-red-600 text-white shrink-0 shadow-sm">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-red-900">
              Important information
            </h3>
            <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded font-semibold border border-red-200">
              Clinical Triage Priority
            </span>
          </div>

          <p className="text-red-900 text-sm mt-1 font-medium leading-relaxed">
            {message}
          </p>

          <p className="text-red-700 text-xs mt-1">
            Please inform the clinical staff or nursing desk. MediKiosk facilitates clinical intake and does not provide medical diagnoses.
          </p>

          {triggers && triggers.length > 0 && (
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-red-800 font-semibold">Flagged terms:</span>
              {triggers.map((trigger, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded border border-red-200 font-mono"
                >
                  "{trigger}"
                </span>
              ))}
            </div>
          )}
        </div>

        {showStaffAction && (
          <div className="shrink-0 flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            <div className="flex items-center justify-center gap-2 bg-red-600 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm text-center">
              <BellRing className="w-4 h-4" />
              <span>Staff Notified</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
