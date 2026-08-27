import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { DEMO_PATIENT } from '../data/mockPatients';
import { DEFAULT_CLINICAL_SUMMARY } from '../data/mockSummary';
import { PRESET_SAMPLE_DOCUMENTS } from '../data/mockDocuments';
import { aiService } from '../services/aiService';

const KioskContext = createContext(null);

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', greeting: 'Welcome to MediKiosk' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', greeting: 'मेडीकिओस्क में आपका स्वागत है' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', greeting: 'মেডিকিয়স্কে স্বাগতম' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', greeting: 'मेडीकिओस्क मध्ये आपले स्वागत आहे' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', greeting: 'મેડીકિઓસ્કમાં આપનું સ્વાગત છે' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', greeting: 'மெடிகியோஸ்க்கிற்கு வரவேற்கிறோம்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', greeting: 'మెడికియోస్క్‌కు స్వాగతం' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', greeting: 'ಮೆಡಿಕಿಯೋಸ್ಕ್‌ಗೆ ಸುಸ್ವಾಗತ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', greeting: 'മെഡിക്കിയോസ്കിലേക്ക് സ്വാഗതം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', greeting: 'ਮੇਡੀਕਿਓਸਕ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ' },
];

const STORAGE_KEY = 'medikiosk_active_session_v1';

export const KioskProvider = ({ children }) => {
  // Load initial state from localStorage if available
  const getInitialSession = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load session from localStorage", e);
    }
    return null;
  };

  const initialSession = getInitialSession();

  // Navigation & Session State
  const [language, setLanguage] = useState(initialSession?.language || 'en');
  const [patient, setPatient] = useState(initialSession?.patient || null);
  const [isDemoMode, setIsDemoMode] = useState(initialSession?.isDemoMode || false);
  const [consentGiven, setConsentGiven] = useState(initialSession?.consentGiven || false);
  
  // Clinical History & Triage
  const [historyResponses, setHistoryResponses] = useState(initialSession?.historyResponses || []);
  const [redFlagAlert, setRedFlagAlert] = useState(initialSession?.redFlagAlert || {
    isRedFlag: false,
    urgencyLevel: 'ROUTINE',
    matchedTriggers: [],
    triageMessage: '',
    clinicalWarning: ''
  });

  // AYUSH Intake
  const [ayushData, setAyushData] = useState(initialSession?.ayushData || {
    darshana: ['Gauravarna (Fair/Clear)', 'Normal Gait & Posture'],
    sparshana: ['Sama (Normal temperature)'],
    prashna: ['Appetite: Sama (Balanced hunger)', 'Sleep: Prakriti (Sound 7-8 hrs)', 'Bowels: Regular & formed daily'],
    ashtavidha: {
      nadi: 'Sama (Balanced Normal)',
      mutra: 'Clear Straw / Normal',
      mala: 'Prakrita (Normal formed)',
      jihva: 'Nirlipta (Clean pink)',
      shabda: 'Prakrita (Clear & steady)',
      sparsha: 'Anushnasheeta (Temperate)',
      druk: 'Prakrita (Lustrous & Clear)',
      akruti: 'Sama (Symmetrical / Proportional)'
    },
    prakriti: { vata: 35, pitta: 45, kapha: 20 },
    agni: 'Sama (Balanced)',
    aharaVihara: 'Vegetarian, timely meals, moderate water intake'
  });

  // Documents & OCR
  const [scannedDocuments, setScannedDocuments] = useState(initialSession?.scannedDocuments || PRESET_SAMPLE_DOCUMENTS.slice(0, 2));

  // Clinical Summary & Doctor
  const [clinicalSummary, setClinicalSummary] = useState(initialSession?.clinicalSummary || DEFAULT_CLINICAL_SUMMARY);
  const [doctorNotes, setDoctorNotes] = useState(initialSession?.doctorNotes || '');
  const [doctorApproved, setDoctorApproved] = useState(initialSession?.doctorApproved || false);
  
  // Integration Status
  const [integrationStatus, setIntegrationStatus] = useState(initialSession?.integrationStatus || {
    isSynced: false,
    transactionId: null,
    syncedAt: null,
    abhaLinked: true,
    fhirGenerated: true,
    room: 'Room 4 — General Medicine',
    token: 'A-104',
    doctor: 'Dr. Ananya Verma, MD'
  });

  // Accessibility & UI settings
  const [fontScale, setFontScale] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);

  // Inactivity session timer
  const [showInactivityWarning, setShowInactivityWarning] = useState(false);
  const lastActivityRef = useRef(Date.now());

  // Save session state to localStorage
  useEffect(() => {
    try {
      const sessionToSave = {
        language,
        patient,
        isDemoMode,
        consentGiven,
        historyResponses,
        redFlagAlert,
        ayushData,
        scannedDocuments,
        clinicalSummary,
        doctorNotes,
        doctorApproved,
        integrationStatus
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionToSave));
    } catch (e) {
      console.warn("Failed to persist session to localStorage", e);
    }
  }, [
    language, patient, isDemoMode, consentGiven, historyResponses,
    redFlagAlert, ayushData, scannedDocuments, clinicalSummary,
    doctorNotes, doctorApproved, integrationStatus
  ]);

  // Inactivity tracking (resets timer on user click/key)
  useEffect(() => {
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
      if (showInactivityWarning) setShowInactivityWarning(false);
    };

    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    // Check inactivity every 15s (warn after 3 min if patient is in active intake)
    const interval = setInterval(() => {
      if (patient && !integrationStatus.isSynced) {
        const idleSeconds = (Date.now() - lastActivityRef.current) / 1000;
        if (idleSeconds > 180 && !showInactivityWarning) {
          setShowInactivityWarning(true);
        }
      }
    }, 15000);

    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      clearInterval(interval);
    };
  }, [patient, integrationStatus.isSynced, showInactivityWarning]);

  // Apply high contrast to body
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Apply font scale to CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--kiosk-font-scale', fontScale.toString());
  }, [fontScale]);

  /**
   * Text-to-Speech synthesizer
   */
  const speakText = useCallback((text) => {
    if (!speechEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      if (language === 'hi') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("SpeechSynthesis error:", e);
    }
  }, [speechEnabled, language]);

  /**
   * Load Demo Data for presentation (Fictional Rahul Sharma)
   */
  const startDemoMode = () => {
    setIsDemoMode(true);
    setPatient(DEMO_PATIENT);
    setConsentGiven(true);
    setScannedDocuments(PRESET_SAMPLE_DOCUMENTS);
    
    const demoResponses = [
      {
        step: 1,
        id: "chief_complaint",
        question: "What is your main health concern today?",
        answer: "Chest discomfort / pain for 2 days",
        value: "chest_pain"
      },
      {
        step: 2,
        id: "onset_duration",
        question: "When did this chest discomfort begin?",
        answer: "Started 2 days ago (Intermittent)",
        value: "2 days ago, comes and goes"
      },
      {
        step: 3,
        id: "location_radiation",
        question: "Where is the pain and does it spread?",
        answer: "Center of chest, radiates to left arm",
        value: "Retrosternal radiating to left shoulder/arm"
      },
      {
        step: 4,
        id: "aggravating_relieving",
        question: "Does the discomfort increase with exertion?",
        answer: "Yes, worsens on walking / exertion",
        value: "Exertional worsening, relieved with rest"
      },
      {
        step: 5,
        id: "associated_symptoms",
        question: "Are you experiencing shortness of breath or sweating?",
        answer: "Mild breathlessness on walking",
        value: "Mild exertional dyspnea, no diaphoresis"
      },
      {
        step: 6,
        id: "past_medical_history",
        question: "Do you have high blood pressure or other conditions?",
        answer: "Hypertension (Takes Telmisartan)",
        value: "Known hypertensive on regular medication"
      },
      {
        step: 7,
        id: "medications_allergies",
        question: "What medicines do you take, and any allergies?",
        answer: "Telmisartan 40mg + Allergy to Penicillin",
        value: "Telmisartan 40mg daily. Known Allergy: Penicillin"
      }
    ];

    setHistoryResponses(demoResponses);

    const redFlagResult = aiService.detectRedFlags('Chest discomfort radiates to left arm', demoResponses);
    setRedFlagAlert(redFlagResult);
    setClinicalSummary(DEFAULT_CLINICAL_SUMMARY);
  };

  /**
   * Reset session back to fresh hospital kiosk state
   */
  const resetSession = () => {
    setPatient(null);
    setIsDemoMode(false);
    setConsentGiven(false);
    setHistoryResponses([]);
    setRedFlagAlert({
      isRedFlag: false,
      urgencyLevel: 'ROUTINE',
      matchedTriggers: [],
      triageMessage: '',
      clinicalWarning: ''
    });
    setScannedDocuments(PRESET_SAMPLE_DOCUMENTS.slice(0, 2));
    setClinicalSummary(DEFAULT_CLINICAL_SUMMARY);
    setDoctorNotes('');
    setDoctorApproved(false);
    setIntegrationStatus({
      isSynced: false,
      transactionId: null,
      syncedAt: null,
      abhaLinked: true,
      fhirGenerated: true,
      room: 'Room 4 — General Medicine',
      token: 'A-104',
      doctor: 'Dr. Ananya Verma, MD'
    });
    setShowInactivityWarning(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
  };

  /**
   * Save a single response in AI history taking and auto-check red flags
   */
  const saveHistoryResponse = (responseItem) => {
    const updated = [...historyResponses.filter(r => r.step !== responseItem.step), responseItem];
    updated.sort((a, b) => a.step - b.step);
    setHistoryResponses(updated);

    const triage = aiService.detectRedFlags(responseItem.answer + ' ' + (responseItem.value || ''), updated);
    if (triage.isRedFlag) {
      setRedFlagAlert(triage);
    }
  };

  /**
   * Update clinical summary sections
   */
  const updateSummarySection = (sectionKey, newContent) => {
    setClinicalSummary(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        content: typeof newContent === 'string' ? newContent : prev[sectionKey]?.content,
        items: Array.isArray(newContent) ? newContent : prev[sectionKey]?.items
      }
    }));
  };

  /**
   * Add a new scanned or uploaded document
   */
  const addScannedDocument = (doc) => {
    setScannedDocuments(prev => [doc, ...prev.filter(d => d.id !== doc.id)]);
  };

  return (
    <KioskContext.Provider
      value={{
        language,
        setLanguage,
        patient,
        setPatient,
        isDemoMode,
        startDemoMode,
        resetSession,
        consentGiven,
        setConsentGiven,
        historyResponses,
        saveHistoryResponse,
        setHistoryResponses,
        redFlagAlert,
        setRedFlagAlert,
        ayushData,
        setAyushData,
        scannedDocuments,
        setScannedDocuments,
        addScannedDocument,
        clinicalSummary,
        setClinicalSummary,
        updateSummarySection,
        doctorNotes,
        setDoctorNotes,
        doctorApproved,
        setDoctorApproved,
        integrationStatus,
        setIntegrationStatus,
        fontScale,
        setFontScale,
        highContrast,
        setHighContrast,
        speechEnabled,
        setSpeechEnabled,
        isListening,
        setIsListening,
        speakText,
        showInactivityWarning,
        setShowInactivityWarning
      }}
    >
      {children}
    </KioskContext.Provider>
  );
};

export const useKiosk = () => {
  const context = useContext(KioskContext);
  if (!context) {
    throw new Error('useKiosk must be used within a KioskProvider');
  }
  return context;
};
