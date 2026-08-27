import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { PRESET_SAMPLE_DOCUMENTS } from '../../data/mockDocuments';

export const DocumentUploadBox = ({ onDocumentSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const docObj = {
        id: `upload_${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
        category: "Uploaded Record",
        date: "Today",
        facility: "Hospital Record",
        doctor: "Attending Physician",
        extractedData: PRESET_SAMPLE_DOCUMENTS[0].extractedData,
        isCustom: true
      };
      setSelectedDoc(docObj);
      if (onDocumentSelected) onDocumentSelected(docObj);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const docObj = {
        id: `upload_${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
        category: "Uploaded Record",
        date: "Today",
        facility: "Hospital Record",
        doctor: "Attending Physician",
        extractedData: PRESET_SAMPLE_DOCUMENTS[0].extractedData,
        isCustom: true
      };
      setSelectedDoc(docObj);
      if (onDocumentSelected) onDocumentSelected(docObj);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-2xl p-8 text-center transition-all border-2 border-dashed ${
          dragActive
            ? 'bg-sky-50 border-sky-500'
            : 'bg-white hover:bg-slate-50 border-slate-300'
        } shadow-xs`}
      >
        <input
          type="file"
          id="kiosk-doc-input"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
          accept="image/*,.pdf"
        />

        <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              {selectedDoc ? selectedDoc.title : "Choose File or Drag & Drop"}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Supports Prescriptions, Lab Reports, Discharge Summaries (PDF, JPG, PNG)
            </p>
          </div>
          <span className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-lg font-semibold border border-slate-200 mt-2">
            Select File from Device
          </span>
        </div>
      </div>
    </div>
  );
};
