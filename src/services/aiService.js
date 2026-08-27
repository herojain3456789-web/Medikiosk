// AI Clinical Reasoning & Triage Service (Mockable architecture for future LLM / Med-PaLM integration)

import { RED_FLAG_TRIGGERS, ADAPTIVE_BRANCHES, INITIAL_QUESTIONS } from '../data/mockQuestions';
import { DEFAULT_CLINICAL_SUMMARY } from '../data/mockSummary';

export const aiService = {
  /**
   * Evaluates if any patient statement or history answer indicates an urgent triage red-flag.
   * MediKiosk DOES NOT diagnose, but flags high-urgency symptoms for staff attention.
   */
  detectRedFlags: (text = '', responses = []) => {
    const combinedText = (
      text + ' ' +
      responses.map(r => `${r.question} ${r.answer} ${r.value || ''}`).join(' ')
    ).toLowerCase();

    const matchedTriggers = RED_FLAG_TRIGGERS.filter(trigger => 
      combinedText.includes(trigger.toLowerCase())
    );

    if (matchedTriggers.length > 0) {
      return {
        isRedFlag: true,
        urgencyLevel: 'HIGH_PRIORITY_TRIAGE',
        matchedTriggers,
        triageMessage: 'Your response includes symptoms (e.g. chest discomfort, radiating symptoms) that require prompt clinical review. A triage notification will be attached to your intake summary for the OPD physician.',
        clinicalWarning: 'Priority Triage Alert: Potential acute coronary / respiratory evaluation indicated. Please inform nursing triage desk if pain worsens while waiting.'
      };
    }

    return {
      isRedFlag: false,
      urgencyLevel: 'ROUTINE',
      matchedTriggers: [],
      triageMessage: '',
      clinicalWarning: ''
    };
  },

  /**
   * Adaptive next question selector based on chief complaint and previous responses
   */
  getNextQuestion: (currentStepIndex, selectedComplaint = 'chest_pain') => {
    const branchKey = selectedComplaint.includes('chest') ? 'chest_pain' : 
                      selectedComplaint.includes('stomach') || selectedComplaint.includes('abdom') ? 'abdominal_pain' :
                      selectedComplaint.includes('fever') ? 'fever' : 'chest_pain';
    
    const branch = ADAPTIVE_BRANCHES[branchKey] || ADAPTIVE_BRANCHES.chest_pain;

    if (currentStepIndex === 0) {
      return INITIAL_QUESTIONS[0];
    }

    const questionIndex = currentStepIndex - 1;
    if (questionIndex < branch.length) {
      return {
        ...branch[questionIndex],
        totalSteps: branch.length + 1
      };
    }

    return null; // All questions completed
  },

  /**
   * Generates or synthesizes the structured 9-box clinical summary from responses + scanned records
   */
  generateClinicalSummary: async (patient, responses = [], documents = []) => {
    // Simulate slight processing latency (300ms) to feel real
    await new Promise(resolve => setTimeout(resolve, 300));

    // Custom synthesis with patient data
    const summary = JSON.parse(JSON.stringify(DEFAULT_CLINICAL_SUMMARY));
    summary.patientId = patient?.id || "MK-10284";
    summary.generatedAt = new Date().toLocaleString();

    // If patient customized complaint, adapt the chief complaint text
    const chiefComplaintAns = responses.find(r => r.step === 1 || r.id === 'chief_complaint');
    if (chiefComplaintAns) {
      summary.chiefComplaint.content = `${chiefComplaintAns.answer} (Duration: 2 days, with exertional worsening)`;
    }

    return summary;
  }
};
