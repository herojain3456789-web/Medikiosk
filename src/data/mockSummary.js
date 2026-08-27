// Clinical summary baseline and builder structures

export const DEFAULT_CLINICAL_SUMMARY = {
  patientId: "MK-10284",
  generatedAt: "2026-08-27 09:15 AM",
  chiefComplaint: {
    title: "Chief Complaint",
    content: "Retrosternal chest discomfort and heaviness for 2 days, radiating intermittently to the left shoulder, aggravated on brisk walking.",
    source: "Patient Response",
    badgeType: "patient",
    isRedFlagCandidate: true,
  },
  hpi: {
    title: "History of Present Illness (HPI)",
    content: "42-year-old male presents with acute-on-chronic episodic central chest tightness starting 48 hours ago. Episodes last 5-10 minutes each, triggered by climbing stairs, with partial relief upon resting. Accompanied by mild exertional breathlessness. No syncope, palpitations, or orthopnea.",
    source: "AI Structured",
    badgeType: "ai",
  },
  pastMedicalHistory: {
    title: "Past Medical History",
    items: [
      { text: "Primary Hypertension (Diagnosed 2021, on regular oral Telmisartan 40mg)", source: "OCR Extracted" },
      { text: "Impaired Fasting Glucose / Prediabetes (Detected on lab report July 2026 - Fasting 108 mg/dL)", source: "Uploaded Record" },
      { text: "Mild Anemia (Hb 11.2 g/dL - July 2026)", source: "Uploaded Record" }
    ],
    source: "OCR Extracted",
    badgeType: "ocr",
  },
  pastSurgicalHistory: {
    title: "Past Surgical History",
    items: [
      { text: "Laparoscopic Appendectomy (AIIMS New Delhi, June 2021) - Uneventful recovery", source: "OCR Extracted" }
    ],
    source: "OCR Extracted",
    badgeType: "ocr",
  },
  drugHistory: {
    title: "Drug History & Current Medications",
    items: [
      { name: "Telmisartan", dosage: "40 mg OD", compliance: "Regular", source: "OCR Extracted" },
      { name: "Pantoprazole", dosage: "40 mg OD", compliance: "Completed (Aug 2026)", source: "OCR Extracted" },
      { name: "Paracetamol", dosage: "500 mg SOS", compliance: "As needed", source: "Patient Response" }
    ],
    source: "OCR Extracted",
    badgeType: "ocr",
  },
  allergyHistory: {
    title: "Allergy History",
    items: [
      { allergen: "Penicillin", reaction: "Severe urticarial rash & facial puffiness (2018)", severity: "High", source: "Patient Response" },
      { allergen: "Aspirin / NSAIDs", reaction: "Mild epigastric irritation", severity: "Mild", source: "Patient Response" }
    ],
    source: "Patient Response",
    badgeType: "patient",
  },
  familyPersonalHistory: {
    title: "Family & Personal History",
    items: [
      { text: "Father had Coronary Artery Disease (CAD) with MI at age 54", source: "Patient Response" },
      { text: "Non-smoker, occasional alcohol (social), sedentary desk job in IT", source: "Patient Response" }
    ],
    source: "Patient Response",
    badgeType: "patient",
  },
  reviewOfSystems: {
    title: "Review of Systems (ROS)",
    positive: ["Exertional chest heaviness", "Mild exertional dyspnea"],
    negative: ["No hemoptysis", "No lower limb edema", "No fever", "No nocturnal cough", "No neurological deficits"],
    source: "AI Structured",
    badgeType: "ai",
  },
  investigations: {
    title: "Previous Investigations & Records",
    items: [
      { test: "ECG (04 Mar 2026)", result: "Normal Sinus Rhythm, HR 74, PR 152ms, No acute ST changes", source: "Uploaded Record" },
      { test: "Fasting Blood Sugar (28 Jul 2026)", result: "108 mg/dL (Borderline High)", source: "OCR Extracted" },
      { test: "HbA1c (28 Jul 2026)", result: "5.8% (Prediabetes range)", source: "OCR Extracted" },
      { test: "Hemoglobin (28 Jul 2026)", result: "11.2 g/dL (Mild microcytic)", source: "OCR Extracted" },
      { test: "Serum Creatinine (28 Jul 2026)", result: "0.95 mg/dL (Normal renal function)", source: "OCR Extracted" }
    ],
    source: "Uploaded Record",
    badgeType: "ocr",
  }
};
