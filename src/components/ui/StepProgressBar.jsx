import React from 'react';
import { Check } from 'lucide-react';

export const StepProgressBar = ({ currentStepIndex = 0, className = "" }) => {
  const steps = [
    { number: '01', label: 'Patient' },
    { number: '02', label: 'Consent' },
    { number: '03', label: 'Health History' },
    { number: '04', label: 'Medical Records' },
    { number: '05', label: 'Summary' },
  ];

  return (
    <nav aria-label="Clinical Intake Progress" className={`w-full max-w-3xl mx-auto py-1 px-4 ${className}`}>
      <ol className="flex items-center justify-between relative">
        {/* Subtle connector line */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 z-0" />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <li key={step.number} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors shadow-sm ${
                  isCompleted
                    ? 'bg-emerald-600 text-white border-2 border-emerald-600'
                    : isCurrent
                    ? 'bg-sky-600 text-white border-2 border-sky-600 ring-2 ring-sky-100'
                    : 'bg-white text-slate-400 border border-slate-300'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>

              <span
                className={`text-xs font-medium mt-1 whitespace-nowrap ${
                  isCurrent
                    ? 'text-sky-800 font-bold'
                    : isCompleted
                    ? 'text-slate-700 font-semibold'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
