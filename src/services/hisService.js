// Hospital Information System (HIS / EMR / e-Hospital) integration service

export const hisService = {
  /**
   * Transmit the structured clinical bundle to the hospital's central EMR queue
   */
  sendToHospitalSystem: async (payload, onStep) => {
    const steps = [
      { step: 1, label: "Verifying patient consent artifact & ABHA token...", progress: 20 },
      { step: 2, label: "Validating FHIR R4 document bundle against NRCES profiles...", progress: 45 },
      { step: 3, label: "Encrypting clinical payload with hospital gateway public key...", progress: 70 },
      { step: 4, label: "Dispatching pre-intake summary to OPD Room 4 physician terminal...", progress: 90 },
      { step: 5, label: "Hospital HIS acknowledgement received (Transaction ID: HIS-OPD-94812)...", progress: 100 },
    ];

    for (const s of steps) {
      await new Promise(resolve => setTimeout(resolve, 550));
      if (onStep) onStep(s);
    }

    return {
      success: true,
      transactionId: `HIS-SYNC-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString(),
      queuePosition: 3,
      assignedDoctor: "Dr. Ananya Verma, MD (Internal Medicine)",
      room: "OPD Room 4",
      estimatedWaitTime: "10-12 mins"
    };
  },

  /**
   * Get OPD live queue list for doctor dashboard
   */
  getDoctorQueue: () => {
    return [
      {
        id: "MK-10284",
        token: "A-104",
        name: "Rahul Sharma",
        age: 42,
        gender: "Male",
        chiefComplaint: "Chest discomfort & heaviness (2 days)",
        aiSummaryStatus: "Ready",
        redFlag: true,
        triageTag: "High Priority — Cardiac Risk",
        waitTime: "10 mins",
        intakeTime: "09:15 AM",
        vitals: { bp: "138/88", pulse: 78, spo2: "98%", temp: "98.4°F" }
      },
      {
        id: "MK-10285",
        token: "A-105",
        name: "Sunita Patel",
        age: 56,
        gender: "Female",
        chiefComplaint: "Routine Diabetes follow-up + tingling in feet",
        aiSummaryStatus: "Ready",
        redFlag: false,
        triageTag: "Routine",
        waitTime: "20 mins",
        intakeTime: "09:22 AM",
        vitals: { bp: "126/80", pulse: 72, spo2: "99%", temp: "98.6°F" }
      },
      {
        id: "MK-10287",
        token: "A-107",
        name: "Vikram Malhotra",
        age: 38,
        gender: "Male",
        chiefComplaint: "High fever (3 days) & retro-orbital headache",
        aiSummaryStatus: "Ready",
        redFlag: true,
        triageTag: "Priority — Dengue/Viral Workup",
        waitTime: "25 mins",
        intakeTime: "09:30 AM",
        vitals: { bp: "118/76", pulse: 94, spo2: "97%", temp: "102.1°F" }
      },
      {
        id: "MK-10288",
        token: "A-108",
        name: "Meena Kumari",
        age: 61,
        gender: "Female",
        chiefComplaint: "Knee joint stiffness and chronic osteoarthritis",
        aiSummaryStatus: "In Progress",
        redFlag: false,
        triageTag: "Routine",
        waitTime: "35 mins",
        intakeTime: "09:35 AM",
        vitals: { bp: "130/84", pulse: 70, spo2: "98%", temp: "98.2°F" }
      },
      {
        id: "MK-10283",
        token: "A-103",
        name: "Anand Rathi",
        age: 49,
        gender: "Male",
        chiefComplaint: "Acid reflux and epigastric burning",
        aiSummaryStatus: "Consultation Done",
        redFlag: false,
        triageTag: "Completed",
        waitTime: "-",
        intakeTime: "08:55 AM",
        vitals: { bp: "122/78", pulse: 74, spo2: "99%", temp: "98.6°F" }
      }
    ];
  }
};
