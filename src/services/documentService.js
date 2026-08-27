// Medical record OCR, entity extraction, and timeline generation service

import { PRESET_SAMPLE_DOCUMENTS, MOCK_TIMELINE_EVENTS } from '../data/mockDocuments';

export const documentService = {
  /**
   * Process a captured or uploaded medical document through mock AI/OCR pipeline stages
   */
  processDocumentWithStages: async (documentItem, onProgress) => {
    const stages = [
      { step: 1, label: "Document detected & boundary aligned", progress: 15 },
      { step: 2, label: "High-contrast image enhancement applied", progress: 30 },
      { step: 3, label: "Multilingual OCR parsing handwritten & printed text", progress: 50 },
      { step: 4, label: "Medical Named Entity Recognition (NER) extracting medicines & dosages", progress: 70 },
      { step: 5, label: "Clinical laboratory values extracted & range-checked", progress: 85 },
      { step: 6, label: "Encounter date & issuing physician verified", progress: 95 },
      { step: 7, label: "Structured FHIR Observation & MedicationStatement organized", progress: 100 },
    ];

    for (const stage of stages) {
      await new Promise(r => setTimeout(r, 450));
      if (onProgress) {
        onProgress(stage);
      }
    }

    // Match document with preset data or create extracted structure
    const matchedPreset = PRESET_SAMPLE_DOCUMENTS.find(d => d.id === documentItem?.id) || PRESET_SAMPLE_DOCUMENTS[0];
    
    return {
      success: true,
      documentId: documentItem?.id || `doc_${Date.now()}`,
      title: documentItem?.title || matchedPreset.title,
      category: documentItem?.category || matchedPreset.category,
      date: matchedPreset.date,
      facility: matchedPreset.facility,
      doctor: matchedPreset.doctor,
      extractedData: matchedPreset.extractedData,
      ocrConfidence: matchedPreset.ocrConfidence || "98.5%",
      isVerified: true
    };
  },

  /**
   * Get all preset sample documents available for scanning simulation
   */
  getPresetDocuments: () => {
    return PRESET_SAMPLE_DOCUMENTS;
  },

  /**
   * Get chronological timeline records
   */
  getMedicalTimeline: () => {
    return MOCK_TIMELINE_EVENTS;
  }
};
