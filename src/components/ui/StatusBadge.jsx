import React from 'react';
import { Bot, User, FileText, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const StatusBadge = ({
  type = 'patient', // 'patient' | 'ocr' | 'ai' | 'red_flag' | 'verified' | 'abnormal' | 'custom'
  text,
  className = '',
}) => {
  const configs = {
    patient: {
      label: text || "Patient response",
      icon: User,
      style: "bg-slate-100 text-slate-700 border-slate-200",
    },
    ocr: {
      label: text || "OCR extracted",
      icon: FileText,
      style: "bg-amber-50 text-amber-800 border-amber-200",
    },
    ai: {
      label: text || "AI structured",
      icon: Sparkles,
      style: "bg-sky-50 text-sky-800 border-sky-200",
    },
    red_flag: {
      label: text || "Clinical Triage Alert",
      icon: AlertTriangle,
      style: "bg-red-50 text-red-800 border-red-300 font-semibold",
    },
    verified: {
      label: text || "Verified Record",
      icon: CheckCircle2,
      style: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    abnormal: {
      label: text || "Out of Range",
      icon: AlertTriangle,
      style: "bg-red-50 text-red-700 border-red-200 font-semibold",
    },
    custom: {
      label: text || "",
      icon: null,
      style: "bg-slate-100 text-slate-700 border-slate-200",
    }
  };

  const current = configs[type] || configs.custom;
  const IconComponent = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border ${current.style} ${className}`}>
      {IconComponent && <IconComponent className="w-3.5 h-3.5 shrink-0" />}
      <span>{current.label}</span>
    </span>
  );
};
