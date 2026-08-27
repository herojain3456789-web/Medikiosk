// ABDM / ABHA Health Information Exchange simulator

export const abdmService = {
  /**
   * Generates an ABDM M2 Consent Artifact representation
   */
  createConsentArtifact: (patientId, consentGranted = true) => {
    return {
      consentId: `ABDM-CONSENT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      status: consentGranted ? "GRANTED" : "REVOKED",
      createdAt: new Date().toISOString(),
      purpose: {
        code: "CAREGIV",
        text: "OPD Outpatient Clinical Consultation & Triage",
      },
      patient: { id: patientId },
      hiTypes: ["Prescription", "DiagnosticReport", "DischargeSummary", "OPConsultation"],
      dataEraseAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24hr OPD session validity
      signature: "RSA-SHA256-MOCK-SIGNATURE-ABDM-VALIDATED"
    };
  },

  /**
   * Generates a compliant HL7 FHIR R4 JSON Bundle structure for the patient's intake summary
   */
  generateFhirBundle: (patient, summary, documents = []) => {
    const bundleId = `urn:uuid:${Math.random().toString(36).substring(2, 10)}`;
    const now = new Date().toISOString();

    return {
      resourceType: "Bundle",
      id: bundleId,
      meta: {
        lastUpdated: now,
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/ClinicalSummaryBundle"]
      },
      type: "document",
      timestamp: now,
      entry: [
        {
          fullUrl: `urn:uuid:composition-01`,
          resource: {
            resourceType: "Composition",
            id: "composition-01",
            status: "preliminary",
            type: {
              coding: [
                { system: "http://snomed.info/sct", code: "371530004", display: "Clinical consultation report" }
              ]
            },
            subject: { reference: `Patient/${patient?.id || 'MK-10284'}`, display: patient?.name || "Rahul Sharma" },
            date: now,
            title: "MediKiosk Pre-Consultation Clinical Intake Summary",
            section: [
              {
                title: "Chief Complaint",
                text: { status: "generated", div: `<div>${summary?.chiefComplaint?.content || ''}</div>` }
              },
              {
                title: "History of Present Illness",
                text: { status: "generated", div: `<div>${summary?.hpi?.content || ''}</div>` }
              }
            ]
          }
        },
        {
          fullUrl: `urn:uuid:patient-01`,
          resource: {
            resourceType: "Patient",
            id: patient?.id || "MK-10284",
            identifier: [
              { system: "https://healthid.abdm.gov.in", value: patient?.abhaId || "91-4829-1029-4820" }
            ],
            name: [{ text: patient?.name || "Rahul Sharma" }],
            gender: (patient?.gender || "male").toLowerCase(),
            birthDate: patient?.dob || "1984-04-15",
            telecom: [{ system: "phone", value: patient?.mobile || "+91 9876543210" }]
          }
        }
      ]
    };
  }
};
