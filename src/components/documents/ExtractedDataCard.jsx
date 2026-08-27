import React, { useState } from 'react';
import { FileText, Pill, Activity, AlertTriangle, Check, Edit3, Calendar, User, Building } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

export const ExtractedDataCard = ({ documentData, onConfirm, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(documentData?.extractedData || {});

  if (!documentData) return null;

  const data = documentData.extractedData || {};

  return (
    <div className="w-full max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">{documentData.title}</h3>
              <StatusBadge type="ocr" text="OCR extracted" />
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5 flex-wrap">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {documentData.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> {documentData.doctor}
              </span>
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5" /> {documentData.facility}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 transition-colors self-start sm:self-center"
        >
          <Edit3 className="w-3.5 h-3.5 text-slate-500" />
          <span>{isEditing ? "Save Edits" : "Edit Values"}</span>
        </button>
      </div>

      {/* Extracted Medicines */}
      {data.medicines && data.medicines.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Pill className="w-4 h-4 text-sky-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Identified Medicines ({data.medicines.length})
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {data.medicines.map((med, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start justify-between gap-2"
              >
                <div>
                  <h5 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>{med.name}</span>
                    <span className="text-xs bg-slate-200 text-slate-800 font-semibold px-2 py-0.5 rounded">
                      {med.dosage}
                    </span>
                  </h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {med.frequency} • {med.duration}
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {med.status || 'Active'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Extracted Lab Values */}
      {data.investigations && data.investigations.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Activity className="w-4 h-4 text-sky-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Laboratory & Test Results ({data.investigations.length})
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {data.investigations.map((inv, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-3 border transition-all ${
                  inv.isAbnormal
                    ? 'bg-red-50/70 border-red-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 truncate">{inv.test}</span>
                  {inv.isAbnormal && (
                    <span className="bg-red-100 text-red-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-200">
                      {inv.severity || "Abnormal"}
                    </span>
                  )}
                </div>

                <div className="mt-1 flex items-baseline gap-1">
                  <span className={`text-lg font-bold font-mono ${
                    inv.isAbnormal ? 'text-red-700' : 'text-slate-900'
                  }`}>
                    {inv.value}
                  </span>
                  <span className="text-xs text-slate-500">{inv.unit}</span>
                </div>

                <div className="text-[11px] text-slate-400 mt-0.5">
                  Normal: {inv.normalRange}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-[11px] text-slate-400 italic text-center mt-5 pt-3 border-t border-slate-100">
        * OCR values are organized for clinical intake. The attending doctor will verify all parameters before prescribing.
      </p>

    </div>
  );
};
