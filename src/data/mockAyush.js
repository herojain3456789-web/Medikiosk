// AYUSH structured clinical intake definitions (Ayurveda, Yoga, Unani, Siddha, Homeopathy)

export const TRIVIDHA_PARIKSHA = [
  {
    id: "darshana",
    title: "Darshana (Visual Inspection / दर्शन)",
    description: "Visual assessment of posture, complexion, gait, and general appearance",
    options: [
      { id: "d1", label: "Gauravarna (Fair/Clear)", category: "Complexion" },
      { id: "d2", label: "Shyamavarna (Dusky/Dry)", category: "Complexion" },
      { id: "d3", label: "Pandura (Pale / Anemic look)", category: "Complexion" },
      { id: "d4", label: "Sthula (Heavy / Overweight)", category: "Build" },
      { id: "d5", label: "Madhyama (Moderate build)", category: "Build" },
      { id: "d6", label: "Krisha (Lean / Emaciated)", category: "Build" },
      { id: "d7", label: "Normal Gait & Posture", category: "Gait" },
      { id: "d8", label: "Fatigued / Slumped posture", category: "Gait" },
    ]
  },
  {
    id: "sparshana",
    title: "Sparshana (Palpation & Tactile / स्पर्शन)",
    description: "Tactile assessment of skin temperature, texture, pulse, and muscle tone",
    options: [
      { id: "s1", label: "Sheetala (Cool/Cold extremities)", category: "Temperature" },
      { id: "s2", label: "Ushna (Warm/Febrile)", category: "Temperature" },
      { id: "s3", label: "Sama (Normal temperature)", category: "Temperature" },
      { id: "s4", label: "Rooksha (Dry texture)", category: "Texture" },
      { id: "s5", label: "Snigdha (Oily/Supple)", category: "Texture" },
      { id: "s6", label: "Mridu (Soft tone)", category: "Tone" },
      { id: "s7", label: "Kathina (Tense/Rigid)", category: "Tone" },
    ]
  },
  {
    id: "prashna",
    title: "Prashna (Interrogation / प्रश्न)",
    description: "Direct questioning regarding Agni (digestive fire), sleep, bowel habits, and mental state",
    options: [
      { id: "p1", label: "Appetite: Sama (Balanced hunger)", category: "Agni" },
      { id: "p2", label: "Appetite: Manda (Sluggish / Low appetite)", category: "Agni" },
      { id: "p3", label: "Appetite: Tikshna (Excessive / Burning hunger)", category: "Agni" },
      { id: "p4", label: "Appetite: Vishama (Irregular appetite)", category: "Agni" },
      { id: "p5", label: "Sleep: Prakriti (Sound 7-8 hrs)", category: "Nidra" },
      { id: "p6", label: "Sleep: Anidra (Disturbed / Insomnia)", category: "Nidra" },
      { id: "p7", label: "Bowels: Regular & formed daily", category: "Koshtha" },
      { id: "p8", label: "Bowels: Krura (Constipated / Hard stools)", category: "Koshtha" },
    ]
  }
];

export const ASHTAVIDHA_PARIKSHA = [
  { name: "Nadi (Pulse / नाड़ी)", key: "nadi", options: ["Vataja (Sarpa/Snake gait)", "Pittaja (Manduka/Frog jump)", "Kaphaja (Hamsa/Swan glide)", "Vata-Pitta (Mixed)", "Sama (Balanced Normal)"] },
  { name: "Mutra (Urine / मूत्र)", key: "mutra", options: ["Clear Straw / Normal", "Peeta (Deep Yellow / Burning)", "Pandu (Turbid / Pale)", "Alpa (Scanty)", "Bahu (Frequent / Polyuria)"] },
  { name: "Mala (Stool / मल)", key: "mala", options: ["Prakrita (Normal formed)", "Shushka (Dry/Constipated)", "Drava (Loose/Watery)", "Ama (Mucus laden)", "Grathita (Pellet-like)"] },
  { name: "Jihva (Tongue / जिह्वा)", key: "jihva", options: ["Nirlipta (Clean pink)", "Sama (White coated / Ama)", "Rooksha (Dry with fissures)", "Rakta (Red with burning)", "Shyava (Bluish tinge)"] },
  { name: "Shabda (Voice / शब्द)", key: "shabda", options: ["Prakrita (Clear & steady)", "Gambhira (Deep resonant)", "Ksheena (Feeble / Hoarse)", "Uchha (Loud / Fast)"] },
  { name: "Sparsha (Skin touch / स्पर्श)", key: "sparsha", options: ["Anushnasheeta (Temperate)", "Rooksha (Rough / Dry)", "Ushna (Warm to touch)", "Sheeta (Cold clammy)"] },
  { name: "Druk (Eyes / दृष्टि)", key: "druk", options: ["Prakrita (Lustrous & Clear)", "Peeta (Icteric / Yellowish)", "Rakta (Bloodshot / Injected)", "Rooksha (Dry / Dull)", "Shweta (Pale conjunctiva)"] },
  { name: "Akruti (Physique / आकृति)", key: "akruti", options: ["Sama (Symmetrical / Proportional)", "Sthula (Obese / Heavy)", "Krisha (Lean / Frail)", "Vakra (Asymmetric posture)"] },
];

export const PRAKRITI_DIMENSIONS = [
  { trait: "Body Frame & Weight", vata: "Slim, difficult to gain", pitta: "Medium athletic", kapha: "Solid, gains weight easily" },
  { trait: "Skin & Hair", vata: "Dry, rough, cools easily", pitta: "Warm, prone to redness/moles", kapha: "Thick, oily, smooth" },
  { trait: "Digestion & Hunger", vata: "Irregular, gas/bloating", pitta: "Intense, cannot skip meals", kapha: "Slow, steady, low appetite" },
  { trait: "Mind & Stress Response", vata: "Anxious, fast thinker", pitta: "Focused, sharp, irritable", kapha: "Calm, slow to react, loyal" },
];
