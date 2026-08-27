// Patient registration, ABHA verification, and demographics service

import { DEMO_PATIENT, MOCK_PATIENT_DATABASE } from '../data/mockPatients';

export const patientService = {
  /**
   * Search for an existing patient by ABHA ID or ABHA Address
   */
  searchByAbha: async (abhaInput) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const clean = abhaInput.replace(/[-\s]/g, '').toLowerCase();
    
    // Check demo matches
    const match = MOCK_PATIENT_DATABASE.find(p => 
      p.abhaId.replace(/[-\s]/g, '') === clean || 
      p.abhaAddress.toLowerCase() === clean ||
      p.name.toLowerCase().includes(clean)
    );

    if (match) return { success: true, patient: match };
    
    // Fallback default for demo if something entered
    if (abhaInput.length >= 4) {
      return {
        success: true,
        patient: {
          ...DEMO_PATIENT,
          abhaId: abhaInput.includes('@') ? "91-4829-1029-4820" : abhaInput,
          abhaAddress: abhaInput.includes('@') ? abhaInput : "user.abha@abdm"
        }
      };
    }

    return { success: false, message: "No ABHA record found with this ID." };
  },

  /**
   * Search for an existing patient by Mobile Number
   */
  searchByMobile: async (mobileNumber) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      requiresOtp: true,
      mockOtp: "4820",
      patient: DEMO_PATIENT
    };
  },

  /**
   * Verify 4-digit OTP for mobile verification
   */
  verifyOtp: async (mobileNumber, enteredOtp) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    if (enteredOtp === "4820" || enteredOtp.length === 4) {
      return { success: true, patient: DEMO_PATIENT };
    }
    return { success: false, message: "Invalid OTP. Use demo OTP 4820." };
  },

  /**
   * Register a new walk-in patient at the kiosk
   */
  registerNewPatient: async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newPatient = {
      id: `MK-${Math.floor(10000 + Math.random() * 90000)}`,
      token: `A-${Math.floor(100 + Math.random() * 50)}`,
      abhaId: formData.abhaId || "Not Linked",
      abhaAddress: formData.abhaAddress || "walkin@kiosk",
      mobile: formData.mobile || "+91 99999 00000",
      name: formData.name || "Walk-in Patient",
      age: Number(formData.age) || 35,
      gender: formData.gender || "Male",
      dob: formData.dob || "1989-01-01",
      bloodGroup: formData.bloodGroup || "B+",
      emergencyContact: formData.emergencyContact || "Attendant / Self",
      address: formData.address || "New Delhi OPD Walk-in",
      preferredLanguage: formData.preferredLanguage || "en",
      queueStatus: "In Kiosk Intake",
      opdRoom: "Room 4 — General Medicine",
      assignedDoctor: "Dr. Ananya Verma, MD",
      allergies: formData.allergies ? [formData.allergies] : ["None declared"],
      chronicConditions: []
    };
    return { success: true, patient: newPatient };
  }
};
