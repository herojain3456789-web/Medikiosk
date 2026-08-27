import React, { useState } from 'react';
import { Edit3, Check, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

export const SummarySectionCard = ({
  title,
  content,
  items,
  badgeType = 'ai',
  sourceText,
  isRedFlag = false,
  onSave,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [editedText, setEditedText] = useState(content || '');

  const handleSave = () => {
    if (onSave) onSave(editedText);
    setIsEditing(false);
  };

  return (
    <div
      className={`bg-white border rounded-xl p-4 sm:p-5 shadow-xs transition-colors ${
        isRedFlag
          ? 'border-red-200 bg-red-50/20'
          : 'border-slate-200 hover:border-slate-300'
      } ${className}`}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
            {isRedFlag && <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />}
            <span>{title}</span>
          </h4>
          <StatusBadge type={badgeType} text={sourceText} />
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-sky-700 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 transition-colors"
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Save</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand section" : "Collapse section"}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Card Content */}
      {!isCollapsed && (
        <div className="mt-3">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <textarea
                rows="3"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div>
              {content && (
                <p className={`text-sm leading-relaxed ${
                  isRedFlag ? 'text-red-950 font-semibold' : 'text-slate-800 font-normal'
                }`}>
                  {content}
                </p>
              )}

              {items && Array.isArray(items) && items.length > 0 && (
                <ul className="space-y-1.5 mt-2">
                  {items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start justify-between gap-3 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100"
                    >
                      <span className="font-medium text-slate-900 flex-1">
                        {typeof item === 'string' ? item : item.text || item.name || JSON.stringify(item)}
                        {item.dosage && <span className="text-sky-700 font-mono ml-2 font-bold">{item.dosage}</span>}
                        {item.reaction && <span className="text-red-700 font-bold ml-2">({item.reaction})</span>}
                      </span>
                      {item.source && (
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">
                          {item.source}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
