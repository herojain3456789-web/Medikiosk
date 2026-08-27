import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { KioskProvider } from './context/KioskContext';
import { WelcomePage } from './pages/WelcomePage';
import { LanguagePage } from './pages/LanguagePage';
import { IdentifyPage } from './pages/IdentifyPage';
import { ConsentPage } from './pages/ConsentPage';
import { HistoryPage } from './pages/HistoryPage';
import { AyushPage } from './pages/AyushPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { TimelinePage } from './pages/TimelinePage';
import { SummaryPage } from './pages/SummaryPage';
import { DoctorReviewPage } from './pages/DoctorReviewPage';
import { IntegrationPage } from './pages/IntegrationPage';
import { SuccessPage } from './pages/SuccessPage';
import { DoctorDashboardPage } from './pages/DoctorDashboardPage';

function App() {
  return (
    <KioskProvider>
      <Router>
        <Routes>
          {/* Kiosk Intake Patient Journey */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/language" element={<LanguagePage />} />
          <Route path="/identify" element={<IdentifyPage />} />
          <Route path="/consent" element={<ConsentPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/ayush" element={<AyushPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/documents/processing" element={<ProcessingPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/summary" element={<SummaryPage />} />
          
          {/* Physician Review & Hospital Integration */}
          <Route path="/doctor-review" element={<DoctorReviewPage />} />
          <Route path="/integration" element={<IntegrationPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboardPage />} />

          {/* Fallback to welcome */}
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </Router>
    </KioskProvider>
  );
}

export default App;
