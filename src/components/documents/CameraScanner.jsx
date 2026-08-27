import React, { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw, Zap, Check, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { PRESET_SAMPLE_DOCUMENTS } from '../../data/mockDocuments';
import { LargeButton } from '../ui/LargeButton';

export const CameraScanner = ({ onCaptureDocument, onSelectPreset }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(PRESET_SAMPLE_DOCUMENTS[0]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      } else {
        setCameraError("Camera access not supported by browser. Using sample documents.");
      }
    } catch (err) {
      console.warn("Camera access failed:", err);
      setCameraError("Camera permission unavailable. You can choose a sample medical record below or upload a file.");
      setStreamActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStreamActive(false);
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current && streamActive) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      stopCamera();
    } else {
      setCapturedImage('sample_captured');
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleUseDocument = () => {
    if (onCaptureDocument) {
      onCaptureDocument({
        ...selectedPreset,
        customImage: capturedImage
      });
    }
  };

  const handlePickPreset = (preset) => {
    setSelectedPreset(preset);
    if (onSelectPreset) {
      onSelectPreset(preset);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      
      {/* Scanner Viewport */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-300 shadow-sm min-h-[340px] flex items-center justify-center">
        
        <canvas ref={canvasRef} className="hidden" />

        {!capturedImage ? (
          <>
            {streamActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover min-h-[340px]"
              />
            ) : (
              <div className="p-6 text-center flex flex-col items-center justify-center text-white">
                <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400 mb-3 border border-slate-700">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  Document Scanner Viewfinder
                </h3>
                <p className="text-xs text-slate-300 max-w-sm">
                  {cameraError || "Align document within the boundary frame."}
                </p>
                <div className="mt-3 bg-slate-800 px-3 py-1.5 rounded-lg text-xs text-sky-300 border border-slate-700">
                  Active Document: <strong>{selectedPreset.title}</strong>
                </div>
              </div>
            )}

            {/* Document Alignment Frame */}
            <div className="absolute inset-6 border-2 border-dashed border-sky-400/80 rounded-xl pointer-events-none flex flex-col justify-between p-3">
              <div className="flex justify-between">
                <span className="w-4 h-4 border-t-2 border-l-2 border-sky-400 -mt-0.5 -ml-0.5" />
                <span className="w-4 h-4 border-t-2 border-r-2 border-sky-400 -mt-0.5 -mr-0.5" />
              </div>
              <div className="text-center self-center bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700 text-[11px] text-slate-200 font-medium">
                Align prescription / report within box
              </div>
              <div className="flex justify-between">
                <span className="w-4 h-4 border-b-2 border-l-2 border-sky-400 -mb-0.5 -ml-0.5" />
                <span className="w-4 h-4 border-b-2 border-r-2 border-sky-400 -mb-0.5 -mr-0.5" />
              </div>
            </div>

            {/* Flash toggle */}
            <div className="absolute top-3 right-3">
              <button
                type="button"
                onClick={() => setFlashOn(!flashOn)}
                className={`p-2 rounded-lg border transition-colors ${
                  flashOn ? 'bg-amber-400 text-black border-amber-500' : 'bg-slate-900/80 text-white border-slate-700'
                }`}
                title="Toggle Flash"
              >
                <Zap className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-900 text-center">
            <div className="w-14 h-14 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Document Captured
            </h3>
            <p className="text-xs text-slate-300">
              Ready for optical character recognition
            </p>
            <div className="mt-3 bg-slate-800 px-3 py-1.5 rounded-lg text-xs text-emerald-400 font-semibold border border-slate-700">
              {selectedPreset.title} ({selectedPreset.date})
            </div>
          </div>
        )}
      </div>

      {/* Capture Actions */}
      <div className="flex items-center justify-center gap-3">
        {!capturedImage ? (
          <LargeButton
            variant="primary"
            size="lg"
            onClick={handleCapture}
            icon={Camera}
            className="w-full sm:w-auto min-w-[14rem]"
          >
            Capture Document
          </LargeButton>
        ) : (
          <div className="flex items-center gap-3 w-full justify-center">
            <LargeButton
              variant="secondary"
              size="md"
              onClick={handleRetake}
              icon={RefreshCw}
            >
              Retake
            </LargeButton>
            <LargeButton
              variant="primary"
              size="md"
              onClick={handleUseDocument}
              icon={Check}
            >
              Use Document
            </LargeButton>
          </div>
        )}
      </div>

      {/* Preset Document Switcher */}
      <div className="mt-3 pt-4 border-t border-slate-200">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Sample Medical Records (Select to simulate scan):
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESET_SAMPLE_DOCUMENTS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePickPreset(preset)}
                className={`p-3 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-sky-50 border-sky-600 text-sky-950 font-bold shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-sky-700">{preset.category}</span>
                  <span className="text-[10px] font-mono">{preset.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1 truncate">
                  {preset.title}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
