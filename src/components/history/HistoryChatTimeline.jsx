import React from 'react';
import { Clock } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

export const HistoryChatTimeline = ({ responses = [], onEditResponse }) => {
  if (responses.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-4">
      <div className="flex items-center gap-1.5 mb-2.5 px-1">
        <Clock className="w-3.5 h-3.5 text-slate-500" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Recorded history ({responses.length} answered)
        </h4>
      </div>

      <div className="flex flex-col gap-2">
        {responses.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-start justify-between gap-3 shadow-xs"
          >
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                {item.step || idx + 1}
              </span>
              <div>
                <p className="text-xs text-slate-500 font-medium">
                  {item.question}
                </p>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">
                  "{item.answer}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <StatusBadge type="patient" />
              {onEditResponse && (
                <button
                  type="button"
                  onClick={() => onEditResponse(item)}
                  className="text-xs text-sky-700 hover:text-sky-900 font-semibold px-2 py-1 rounded hover:bg-slate-50"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
