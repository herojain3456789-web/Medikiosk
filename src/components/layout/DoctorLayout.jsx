import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Stethoscope, Users, LayoutDashboard, FileText, ClipboardList, FolderArchive, Settings, ArrowLeft, Shield, Building, UserCheck } from 'lucide-react';
import { useKiosk } from '../../context/KioskContext';

export const DoctorLayout = ({ children, title = "Physician Clinical Portal", subtitle = "OPD Room 4 — Internal Medicine" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patient } = useKiosk();

  const navItems = [
    { label: "OPD Queue", path: "/doctor-dashboard", icon: Users, badge: "12" },
    { label: "Patient Summary", path: "/doctor-review", icon: ClipboardList, badge: patient ? patient.name.split(' ')[0] : "Active" },
  ];

  const sidebarLinks = [
    { label: "Dashboard", icon: LayoutDashboard, active: false, onClick: () => navigate('/doctor-dashboard') },
    { label: "OPD Queue", icon: Users, active: location.pathname === '/doctor-dashboard', onClick: () => navigate('/doctor-dashboard') },
    { label: "Patients", icon: UserCheck, active: false, onClick: () => navigate('/doctor-dashboard') },
    { label: "Intake Summaries", icon: FileText, active: location.pathname === '/doctor-review', onClick: () => navigate('/doctor-review') },
    { label: "Records", icon: FolderArchive, active: false, onClick: () => navigate('/doctor-review') },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900 font-sans">
      
      {/* Physician Portal Sidebar */}
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col justify-between shrink-0 hidden md:flex border-r border-slate-800">
        <div>
          {/* Hospital & Department Branding */}
          <div className="p-5 border-b border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center text-white">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">MediKiosk EMR</h2>
              <p className="text-[11px] text-slate-400">Dr. RML Hospital • Room 4</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Clinical Workflow
            </div>
            {sidebarLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    item.active
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Doctor Profile & Return to Kiosk */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
              AV
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Dr. Ananya Verma, MD</p>
              <p className="text-[10px] text-slate-400 truncate">Internal Medicine</p>
            </div>
          </div>

          <Link
            to="/welcome"
            className="flex items-center justify-center gap-1.5 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Kiosk Interface</span>
          </Link>
        </div>
      </aside>

      {/* Main Clinical Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Clinical Bar */}
        <header className="bg-white border-b border-slate-200 py-3 px-6 sticky top-0 z-30 flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <Link
              to="/welcome"
              className="md:hidden flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Kiosk
            </Link>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight flex items-center gap-2">
                <span>{title}</span>
                <span className="text-[11px] bg-slate-100 text-slate-600 font-normal px-2 py-0.5 rounded border border-slate-200">
                  AI-assisted. Doctor reviewed.
                </span>
              </h1>
              <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/doctor-dashboard"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                location.pathname === '/doctor-dashboard'
                  ? 'bg-sky-600 text-white border-sky-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              OPD Queue (12)
            </Link>
            <Link
              to="/doctor-review"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                location.pathname === '/doctor-review'
                  ? 'bg-sky-600 text-white border-sky-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Review Summary
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
};
