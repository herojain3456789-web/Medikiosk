import React, { useState } from 'react';
import { Leaf, Eye, Hand, MessageSquare, Check, Sparkles, Sliders, ArrowRight, ArrowLeft } from 'lucide-react';
import { TRIVIDHA_PARIKSHA, ASHTAVIDHA_PARIKSHA } from '../../data/mockAyush';
import { useKiosk } from '../../context/KioskContext';
import { LargeButton } from '../ui/LargeButton';

export const AyushForm = ({ onSave }) => {
  const { ayushData, setAyushData } = useKiosk();
  const [activeStep, setActiveStep] = useState(1); // 1: Trividha, 2: Ashtavidha, 3: Prakriti/Agni/Ahara

  // Toggle selection in Trividha Pariksha
  const toggleTrividhaOption = (sectionKey, optionLabel) => {
    setAyushData(prev => {
      const currentList = prev[sectionKey] || [];
      const updated = currentList.includes(optionLabel)
        ? currentList.filter(item => item !== optionLabel)
        : [...currentList, optionLabel];
      return { ...prev, [sectionKey]: updated };
    });
  };

  // Change Ashtavidha selection
  const handleAshtavidhaChange = (parikshaKey, selectedVal) => {
    setAyushData(prev => ({
      ...prev,
      ashtavidha: {
        ...prev.ashtavidha,
        [parikshaKey]: selectedVal
      }
    }));
  };

  // Update Prakriti slider
  const handlePrakritiChange = (dosha, val) => {
    setAyushData(prev => ({
      ...prev,
      prakriti: {
        ...prev.prakriti,
        [dosha]: Number(val)
      }
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5">
      
      {/* Sub-step indicator pills */}
      <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
        <button
          type="button"
          onClick={() => setActiveStep(1)}
          className={`flex-1 py-2.5 px-3 rounded-lg font-semibold text-xs transition-all ${
            activeStep === 1
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          1. Trividha Pariksha
        </button>

        <button
          type="button"
          onClick={() => setActiveStep(2)}
          className={`flex-1 py-2.5 px-3 rounded-lg font-semibold text-xs transition-all ${
            activeStep === 2
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          2. Ashtavidha Pariksha
        </button>

        <button
          type="button"
          onClick={() => setActiveStep(3)}
          className={`flex-1 py-2.5 px-3 rounded-lg font-semibold text-xs transition-all ${
            activeStep === 3
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          3. Prakriti & Agni
        </button>
      </div>

      {/* Step 1: Trividha Pariksha (Darshana, Sparshana, Prashna) */}
      {activeStep === 1 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-base font-bold text-slate-900">
              1. Trividha Pariksha (त्रिविध परीक्षा)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select observations across visual, tactile, and interrogative examination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TRIVIDHA_PARIKSHA.map((section) => {
              const sectionKey = section.id;
              const selectedItems = ayushData[sectionKey] || [];

              return (
                <div key={section.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
                      {section.title}
                    </h4>

                    <div className="flex flex-col gap-1.5">
                      {section.options.map((opt) => {
                        const isSelected = selectedItems.includes(opt.label);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => toggleTrividhaOption(sectionKey, opt.label)}
                            className={`flex items-center justify-between p-2.5 rounded-lg text-left text-xs font-medium transition-all border ${
                              isSelected
                                ? 'bg-teal-100/70 text-teal-900 border-teal-400 font-bold'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{opt.label}</span>
                            <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-teal-600 text-white' : 'border border-slate-300'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <LargeButton
              variant="accent"
              size="md"
              onClick={() => setActiveStep(2)}
              icon={ArrowRight}
            >
              Next: Ashtavidha Pariksha
            </LargeButton>
          </div>
        </div>
      )}

      {/* Step 2: Ashtavidha Pariksha (8 Pillars) */}
      {activeStep === 2 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-base font-bold text-slate-900">
              2. Ashtavidha Pariksha (अष्टविध परीक्षा)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select observations for the 8 classical Ayurvedic examination parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {ASHTAVIDHA_PARIKSHA.map((item) => {
              const currentVal = ayushData.ashtavidha?.[item.key] || item.options[0];

              return (
                <div key={item.key} className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5">
                    {item.name}
                  </label>
                  <select
                    value={currentVal}
                    onChange={(e) => handleAshtavidhaChange(item.key, e.target.value)}
                    className="w-full bg-white text-slate-800 text-xs font-medium rounded-lg p-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    {item.options.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-4 py-2"
            >
              Previous
            </button>
            <LargeButton
              variant="accent"
              size="md"
              onClick={() => setActiveStep(3)}
              icon={ArrowRight}
            >
              Next: Prakriti & Agni
            </LargeButton>
          </div>
        </div>
      )}

      {/* Step 3: Prakriti, Agni & Ahara/Vihara */}
      {activeStep === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Prakriti Dosha Sliders */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
              Deha Prakriti Assessment
            </h3>
            <p className="text-xs text-slate-500 mb-4">Constitutional dosha balance</p>

            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">Vata Dosha</span>
                  <span className="text-slate-900 font-mono">{ayushData.prakriti?.vata || 35}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ayushData.prakriti?.vata || 35}
                  onChange={(e) => handlePrakritiChange('vata', e.target.value)}
                  className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">Pitta Dosha</span>
                  <span className="text-slate-900 font-mono">{ayushData.prakriti?.pitta || 45}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ayushData.prakriti?.pitta || 45}
                  onChange={(e) => handlePrakritiChange('pitta', e.target.value)}
                  className="w-full accent-amber-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">Kapha Dosha</span>
                  <span className="text-slate-900 font-mono">{ayushData.prakriti?.kapha || 20}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ayushData.prakriti?.kapha || 20}
                  onChange={(e) => handlePrakritiChange('kapha', e.target.value)}
                  className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Agni, Ahara, Vihara */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                Agni & Lifestyle Routine
              </h3>
              <p className="text-xs text-slate-500 mb-4">Digestion, diet, and circadian habits</p>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Digestive Capacity (Jatharagni)
                  </label>
                  <select
                    value={ayushData.agni || 'Sama (Balanced)'}
                    onChange={(e) => setAyushData(prev => ({ ...prev, agni: e.target.value }))}
                    className="w-full bg-slate-50 text-slate-900 text-xs font-medium rounded-lg p-2.5 border border-slate-300"
                  >
                    <option value="Sama (Balanced digestion)">Sama Agni (Balanced appetite)</option>
                    <option value="Tikshna (Intense / Acidic burning)">Tikshna Agni (Intense / Hyperacidity)</option>
                    <option value="Manda (Sluggish / Heavy digestion)">Manda Agni (Sluggish appetite)</option>
                    <option value="Vishama (Irregular / Bloating)">Vishama Agni (Irregular hunger)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Ahara & Vihara Routine
                  </label>
                  <textarea
                    rows="2"
                    value={ayushData.aharaVihara || ''}
                    onChange={(e) => setAyushData(prev => ({ ...prev, aharaVihara: e.target.value }))}
                    placeholder="e.g. Vegetarian diet, 7 hours sleep, regular meals"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5"
              >
                Previous
              </button>
              <LargeButton
                variant="accent"
                size="md"
                onClick={onSave}
                icon={Check}
              >
                Save & Continue to Records
              </LargeButton>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
