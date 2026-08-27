// Mock document repository with pre-extracted OCR entities and timeline events

export const PRESET_SAMPLE_DOCUMENTS = [
  {
    id: "doc_rx_01",
    title: "OPD Prescription Slip",
    category: "Prescription",
    date: "12 Aug 2026",
    facility: "Dr. RML Hospital, New Delhi",
    doctor: "Dr. S. K. Sharma (MD, Gen Med)",
    department: "Internal Medicine",
    previewImage: "prescription",
    summary: "Follow-up prescription for hypertension management with Telmisartan and Pantoprazole.",
    extractedData: {
      date: "12-Aug-2026",
      doctor: "Dr. S. K. Sharma, MD",
      facility: "Dr. RML Hospital, New Delhi",
      medicines: [
        { name: "Telmisartan", dosage: "40 mg", frequency: "1-0-0 (Morning OD)", duration: "30 Days", status: "Active" },
        { name: "Pantoprazole", dosage: "40 mg", frequency: "1-0-0 (Empty Stomach)", duration: "14 Days", status: "Completed" },
        { name: "Paracetamol", dosage: "500 mg", frequency: "SOS (As needed for pain/fever)", duration: "5 Days", status: "SOS" }
      ],
      investigations: [
        { test: "Blood Pressure", value: "138/88 mmHg", unit: "mmHg", normalRange: "<120/80", isAbnormal: true },
        { test: "Pulse Rate", value: "78 bpm", unit: "bpm", normalRange: "60-100", isAbnormal: false }
      ],
      clinicalNotes: "Patient instructed for low-salt diet and brisk walking 30 mins daily. Advised lipid profile and serum creatinine on next visit."
    },
    ocrConfidence: "98.4%",
    isVerified: true
  },
  {
    id: "doc_lab_02",
    title: "Complete Blood Count & Metabolic Panel",
    category: "Lab Reports",
    date: "28 Jul 2026",
    facility: "Central Diagnostic Labs, Rohini",
    doctor: "Dr. Rita Saxena (Pathologist)",
    department: "Pathology & Biochemistry",
    previewImage: "lab_report",
    summary: "Routine biochemical panel demonstrating mild anemia and fasting blood glucose levels.",
    extractedData: {
      date: "28-Jul-2026",
      doctor: "Dr. Rita Saxena, MD Path",
      facility: "Central Diagnostic Labs",
      medicines: [],
      investigations: [
        { test: "Hemoglobin (Hb)", value: "11.2", unit: "g/dL", normalRange: "13.5 - 17.5", isAbnormal: true, severity: "Mild Low" },
        { test: "Fasting Blood Glucose", value: "108", unit: "mg/dL", normalRange: "70 - 99", isAbnormal: true, severity: "Impaired Fasting" },
        { test: "HbA1c", value: "5.8", unit: "%", normalRange: "< 5.7", isAbnormal: true, severity: "Prediabetes" },
        { test: "Total Cholesterol", value: "192", unit: "mg/dL", normalRange: "< 200", isAbnormal: false },
        { test: "Serum Creatinine", value: "0.95", unit: "mg/dL", normalRange: "0.7 - 1.3", isAbnormal: false },
        { test: "Total Leucocyte Count (TLC)", value: "7,400", unit: "/cumm", normalRange: "4,000 - 11,000", isAbnormal: false }
      ],
      clinicalNotes: "Mild microcytic picture observed. Borderline fasting hyperglycemia."
    },
    ocrConfidence: "99.1%",
    isVerified: true
  },
  {
    id: "doc_ecg_03",
    title: "12-Lead Resting Electrocardiogram (ECG)",
    category: "Imaging & Diagnostics",
    date: "04 Mar 2026",
    facility: "Max Healthcare Cardiology OPD",
    doctor: "Dr. V. Raman (Cardiologist)",
    department: "Cardiology",
    previewImage: "ecg",
    summary: "Resting 12-lead ECG showed normal sinus rhythm without acute ST-segment changes.",
    extractedData: {
      date: "04-Mar-2026",
      doctor: "Dr. V. Raman, DM Card",
      facility: "Cardiology Diagnostic Suite",
      medicines: [],
      investigations: [
        { test: "Heart Rate", value: "74", unit: "bpm", normalRange: "60 - 100", isAbnormal: false },
        { test: "PR Interval", value: "152", unit: "ms", normalRange: "120 - 200", isAbnormal: false },
        { test: "QRS Duration", value: "88", unit: "ms", normalRange: "80 - 120", isAbnormal: false },
        { test: "QTc Interval", value: "418", unit: "ms", normalRange: "< 440", isAbnormal: false }
      ],
      clinicalNotes: "Normal Sinus Rhythm. No ST-T segment elevation or pathological Q waves noted. Comparison with previous tracing advised if symptoms recur."
    },
    ocrConfidence: "96.5%",
    isVerified: true
  },
  {
    id: "doc_dis_04",
    title: "Past Discharge Summary (Appendectomy)",
    category: "Discharge Summary",
    date: "10 Jun 2021",
    facility: "AIIMS New Delhi, Dept of General Surgery",
    doctor: "Prof. H. S. Anand (MS, MCh)",
    department: "Surgery",
    previewImage: "discharge",
    summary: "Elective laparoscopic appendectomy. Uneventful post-operative recovery.",
    extractedData: {
      date: "10-Jun-2021",
      doctor: "Prof. H. S. Anand, MS",
      facility: "AIIMS New Delhi",
      medicines: [
        { name: "Cefixime 200mg", dosage: "200 mg", frequency: "1-0-1", duration: "5 Days (Discontinued)", status: "Completed" }
      ],
      investigations: [
        { test: "Histopathology", value: "Acute appendicitis confirmed", unit: "text", normalRange: "-", isAbnormal: false }
      ],
      clinicalNotes: "Surgical wound healed by primary intention. Sutures removed on POD 8. No post-op hernia."
    },
    ocrConfidence: "97.0%",
    isVerified: true
  }
];

export const MOCK_TIMELINE_EVENTS = [
  {
    id: "t1",
    year: "2026",
    date: "12 Aug 2026",
    title: "OPD Prescription — Hypertension",
    category: "Prescription",
    facility: "Dr. RML Hospital",
    doctor: "Dr. S. K. Sharma",
    keyFindings: "Telmisartan 40mg maintained; BP 138/88 mmHg",
    docId: "doc_rx_01",
    badgeColor: "bg-blue-900/60 text-cyan-300 border-cyan-700"
  },
  {
    id: "t2",
    year: "2026",
    date: "28 Jul 2026",
    title: "Blood Investigation — CBC & Glucose",
    category: "Lab Reports",
    facility: "Central Diagnostic Labs",
    doctor: "Dr. Rita Saxena",
    keyFindings: "Hb: 11.2 g/dL (Mild low), Fasting Glucose: 108 mg/dL",
    docId: "doc_lab_02",
    badgeColor: "bg-amber-900/60 text-amber-300 border-amber-700"
  },
  {
    id: "t3",
    year: "2026",
    date: "04 Mar 2026",
    title: "12-Lead ECG Tracing",
    category: "Imaging & Diagnostics",
    facility: "Max Healthcare Cardiology",
    doctor: "Dr. V. Raman",
    keyFindings: "Normal Sinus Rhythm, HR 74 bpm, No ST elevation",
    docId: "doc_ecg_03",
    badgeColor: "bg-emerald-900/60 text-emerald-300 border-emerald-700"
  },
  {
    id: "t4",
    year: "2021",
    date: "10 Jun 2021",
    title: "Laparoscopic Appendectomy Summary",
    category: "Discharge Summary",
    facility: "AIIMS New Delhi",
    doctor: "Prof. H. S. Anand",
    keyFindings: "Uncomplicated laparoscopic appendectomy. Uneventful recovery.",
    docId: "doc_dis_04",
    badgeColor: "bg-purple-900/60 text-purple-300 border-purple-700"
  }
];
