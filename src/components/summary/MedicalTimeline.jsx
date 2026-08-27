import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, FileText, Filter, CheckCircle2 } from 'lucide-react';
import { MOCK_TIMELINE_EVENTS } from '../../data/mockDocuments';

export const MedicalTimeline = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedId, setExpandedId] = useState('t1');

  const filters = ['All', 'Prescription', 'Lab Reports', 'Imaging & Diagnostics', 'Discharge Summary'];

  const filteredEvents = MOCK_TIMELINE_EVENTS.filter(event => {
    if (activeFilter === 'All') return true;
    return event.category.toLowerCase().includes(activeFilter.toLowerCase()) || 
           activeFilter.toLowerCase().includes(event.category.toLowerCase());
  });

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      
      {/* Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Filter:
        </span>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
              activeFilter === filter
                ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Chronological Stream */}
      <div className="space-y-3">
        {filteredEvents.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="flex items-start sm:items-center justify-between gap-3 cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-sky-600" />
                      {item.date}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.facility} • {item.doctor}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label={isExpanded ? "Collapse details" : "Expand details"}
                  className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 shrink-0"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1.5 animate-fadeIn">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-0.5">Key Findings:</span>
                    <p className="text-xs font-medium text-slate-900">{item.keyFindings}</p>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-400 pt-0.5">
                    <span>Document ID: <code className="font-mono text-slate-600">{item.docId}</code></span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Attached to EMR
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
