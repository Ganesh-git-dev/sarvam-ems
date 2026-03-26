import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from "recharts";
import {
  LayoutDashboard, User, BookOpen, BarChart2, Calendar,
  CreditCard, Award, FileText, DoorOpen, Home, Bus,
  Building2, Bell, LogOut, Check, X, Clock, AlertTriangle,
  Download, Search, Plus, Phone, Mail, MapPin, Wifi,
  Shield, Book, TrendingUp, Users, GraduationCap, Eye,
  EyeOff, Star, ChevronRight, Coffee, Layers, Hash,
  Zap, Activity, CheckCircle, XCircle, AlarmClock,
  ExternalLink, RefreshCw, Filter, Send, Edit3, UserPlus,
  Settings, Trash2, ChevronDown, BookMarked, ClipboardList,
  Target, Briefcase, DollarSign, UserCheck, ScrollText,
  BarChart3, PieChartIcon, School, BadgeCheck, AlertCircle,
  ArrowUpRight, ArrowDownRight, Percent, Landmark, Receipt
} from "lucide-react";

// ===== GLOBAL STYLES =====
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #04091a; }
  .ems { font-family: 'Exo 2', sans-serif; background: #04091a; color: #e2e8f0; height: 100vh; display: flex; overflow: hidden; }
  .ems-heading { font-family: 'Orbitron', monospace; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
  ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.25); border-radius: 4px; }
  .sidebar {
    width: 248px; min-width: 248px; height: 100vh; background: rgba(4,12,32,0.97);
    border-right: 1px solid rgba(0,212,255,0.1); display: flex; flex-direction: column;
    padding: 20px 12px; gap: 4px; overflow-y: auto; position: relative; z-index: 10;
  }
  .sidebar::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(0,212,255,0.015) 50px),
                repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(0,212,255,0.015) 50px);
    pointer-events: none;
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 10px;
    cursor: pointer; transition: all 0.2s ease; font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,0.45); border: 1px solid transparent; position: relative;
    font-family: 'Exo 2', sans-serif;
  }
  .nav-item:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.04); }
  .nav-item.active {
    color: #00d4ff; background: rgba(0,212,255,0.08);
    border-color: rgba(0,212,255,0.18); box-shadow: 0 0 12px rgba(0,212,255,0.08);
  }
  .nav-item.active::before {
    content: ''; position: absolute; left: 0; top: 25%; bottom: 25%;
    width: 2px; background: #00d4ff; border-radius: 2px; box-shadow: 0 0 8px #00d4ff;
  }
  .nav-item.admin-active {
    color: #f59e0b; background: rgba(245,158,11,0.08);
    border-color: rgba(245,158,11,0.18);
  }
  .nav-item.admin-active::before { background: #f59e0b; box-shadow: 0 0 8px #f59e0b; }
  .nav-item.teacher-active {
    color: #a78bfa; background: rgba(139,92,246,0.08);
    border-color: rgba(139,92,246,0.18);
  }
  .nav-item.teacher-active::before { background: #a78bfa; box-shadow: 0 0 8px #a78bfa; }
  .nav-section { font-family: 'Orbitron', monospace; font-size: 8px; letter-spacing: 2px;
    color: rgba(255,255,255,0.2); padding: 10px 12px 4px; text-transform: uppercase; }
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .topbar {
    height: 56px; min-height: 56px; background: rgba(4,10,28,0.95);
    border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center;
    padding: 0 24px; gap: 16px; backdrop-filter: blur(12px);
  }
  .content { flex: 1; overflow-y: auto; padding: 24px; background: #04091a; position: relative; }
  .content::before {
    content: ''; position: fixed; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.04) 0%, transparent 70%),
                radial-gradient(ellipse 40% 30% at 100% 100%, rgba(139,92,246,0.03) 0%, transparent 60%);
  }
  .page-in { animation: pageIn 0.3s ease; }
  @keyframes pageIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  .glass { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; backdrop-filter: blur(10px); }
  .glass-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; transition: all 0.3s ease; }
  .glass-card:hover { border-color: rgba(0,212,255,0.2); box-shadow: 0 4px 24px rgba(0,212,255,0.06); }
  .stat-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 18px 20px; transition: all 0.3s ease; position: relative; overflow: hidden; }
  .stat-card:hover { transform: translateY(-2px); border-color: rgba(0,212,255,0.2); box-shadow: 0 8px 30px rgba(0,212,255,0.08); }
  .btn { border: none; border-radius: 10px; padding: 9px 18px; font-family: 'Exo 2', sans-serif; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.25s ease; display: inline-flex; align-items: center; gap: 6px; }
  .btn-primary { background: linear-gradient(135deg, #00d4ff, #0066ff); color: #fff; box-shadow: 0 4px 14px rgba(0,212,255,0.25); }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,212,255,0.35); }
  .btn-amber { background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; box-shadow: 0 4px 14px rgba(245,158,11,0.25); }
  .btn-amber:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(245,158,11,0.35); }
  .btn-purple { background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: #fff; box-shadow: 0 4px 14px rgba(139,92,246,0.25); }
  .btn-purple:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(139,92,246,0.35); }
  .btn-outline { background: transparent; color: #00d4ff; border: 1px solid rgba(0,212,255,0.35); }
  .btn-outline:hover { background: rgba(0,212,255,0.08); }
  .btn-ghost { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.08); }
  .btn-ghost:hover { background: rgba(255,255,255,0.08); color: #fff; }
  .btn-danger { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
  .btn-danger:hover { background: rgba(239,68,68,0.25); }
  .btn-success { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3); }
  .btn-sm { padding: 5px 12px; font-size: 11px; border-radius: 8px; }
  .input { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 9px 14px; color: #e2e8f0; font-family: 'Exo 2', sans-serif; font-size: 13px; outline: none; transition: all 0.25s ease; width: 100%; }
  .input:focus { border-color: rgba(0,212,255,0.45); box-shadow: 0 0 12px rgba(0,212,255,0.08); background: rgba(0,212,255,0.03); }
  .input-amber:focus { border-color: rgba(245,158,11,0.45); box-shadow: 0 0 12px rgba(245,158,11,0.08); }
  .input-purple:focus { border-color: rgba(139,92,246,0.45); box-shadow: 0 0 12px rgba(139,92,246,0.08); }
  .select { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 9px 14px; color: #e2e8f0; font-family: 'Exo 2', sans-serif; font-size: 13px; outline: none; transition: all 0.25s ease; width: 100%; appearance: none; }
  .select:focus { border-color: rgba(0,212,255,0.45); }
  .textarea { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 14px; color: #e2e8f0; font-family: 'Exo 2', sans-serif; font-size: 13px; outline: none; transition: all 0.25s ease; width: 100%; resize: vertical; min-height: 90px; }
  .textarea:focus { border-color: rgba(0,212,255,0.45); }
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.3px; }
  .badge-cyan { background: rgba(0,212,255,0.1); color: #00d4ff; border: 1px solid rgba(0,212,255,0.25); }
  .badge-green { background: rgba(16,185,129,0.12); color: #34d399; border: 1px solid rgba(16,185,129,0.25); }
  .badge-yellow { background: rgba(245,158,11,0.12); color: #fbbf24; border: 1px solid rgba(245,158,11,0.25); }
  .badge-red { background: rgba(239,68,68,0.12); color: #f87171; border: 1px solid rgba(239,68,68,0.25); }
  .badge-purple { background: rgba(139,92,246,0.12); color: #a78bfa; border: 1px solid rgba(139,92,246,0.25); }
  .badge-gray { background: rgba(148,163,184,0.1); color: #94a3b8; border: 1px solid rgba(148,163,184,0.2); }
  .badge-amber { background: rgba(245,158,11,0.12); color: #f59e0b; border: 1px solid rgba(245,158,11,0.25); }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.2s ease; }
  .modal-box { background: #080f22; border: 1px solid rgba(0,212,255,0.2); border-radius: 20px; padding: 28px; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 0 60px rgba(0,212,255,0.12); animation: modalIn 0.3s ease; }
  .modal-box-lg { max-width: 700px; }
  .modal-box-xl { max-width: 900px; }
  .modal-amber { border-color: rgba(245,158,11,0.2); box-shadow: 0 0 60px rgba(245,158,11,0.08); }
  .modal-purple { border-color: rgba(139,92,246,0.2); box-shadow: 0 0 60px rgba(139,92,246,0.08); }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes modalIn { from { transform:scale(0.95) translateY(12px); opacity:0; } to { transform:scale(1) translateY(0); opacity:1; } }
  .progress-track { height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
  .table-wrap { width: 100%; overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { text-align: left; padding: 10px 14px; color: rgba(255,255,255,0.35); font-size: 11px; letter-spacing: 0.8px; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight: 600; font-family: 'Exo 2', sans-serif; }
  td { padding: 11px 14px; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
  tr:hover td { background: rgba(255,255,255,0.02); }
  .pulse { animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(0,212,255,0.4);} 50%{box-shadow:0 0 0 6px rgba(0,212,255,0);} }
  .grid-cols-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-cols-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .grid-cols-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; }
  .flex { display: flex; } .flex-col { flex-direction: column; }
  .items-center { align-items: center; } .justify-between { justify-content: space-between; }
  .gap-2 { gap: 8px; } .gap-3 { gap: 12px; } .gap-4 { gap: 16px; }
  .mb-2 { margin-bottom: 8px; } .mb-3 { margin-bottom: 12px; } .mb-4 { margin-bottom: 16px; } .mb-6 { margin-bottom: 24px; }
  .mt-2 { margin-top: 8px; } .mt-3 { margin-top: 12px; } .mt-4 { margin-top: 16px; }
  .p-4 { padding: 16px; } .p-5 { padding: 20px; } .p-6 { padding: 24px; }
  .w-full { width: 100%; }
  .text-xs { font-size: 11px; } .text-sm { font-size: 13px; } .text-lg { font-size: 17px; } .text-xl { font-size: 20px; } .text-2xl { font-size: 24px; }
  .font-bold { font-weight: 700; } .font-semibold { font-weight: 600; } .font-medium { font-weight: 500; }
  .text-muted { color: rgba(255,255,255,0.4); }
  .text-cyan { color: #00d4ff; } .text-green { color: #34d399; } .text-red { color: #f87171; } .text-yellow { color: #fbbf24; } .text-purple { color: #a78bfa; } .text-amber { color: #f59e0b; }
  .rounded-full { border-radius: 9999px; }
  .tab-bar { display: flex; gap: 6px; margin-bottom: 16px; flex-wrap: wrap; }
  .login-bg { min-height: 100vh; display: flex; background: #04091a; position: relative; overflow: hidden; font-family: 'Exo 2', sans-serif; }
  .login-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px); background-size: 60px 60px; }
  .login-glow { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%); top: -200px; left: -200px; pointer-events: none; }
  .login-glow2 { position: absolute; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%); bottom: -100px; right: -100px; pointer-events: none; }
  .timetable-grid { display: grid; gap: 6px; }
  .tt-cell { border-radius: 8px; padding: 8px 10px; font-size: 11.5px; font-weight: 500; min-height: 60px; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.2s; }
  .tt-cell:hover { transform: scale(1.02); }
  .tt-theory { background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.15); color: #7dd3fc; }
  .tt-lab { background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.2); color: #c4b5fd; }
  .tt-activity { background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.15); color: #6ee7b7; }
  .tt-empty { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.2); font-style: italic; }
  .qr-box { display: grid; grid-template-columns: repeat(10,1fr); gap: 2px; width: 120px; height: 120px; padding: 8px; background: white; border-radius: 8px; }
  .qr-cell { border-radius: 1px; }
  .floating { animation: float 5s ease-in-out infinite; }
  @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .role-card { padding: 10px 8px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.03); cursor: pointer; text-align: center; transition: all 0.25s ease; }
  .role-card:hover { background: rgba(255,255,255,0.06); }
  .auth-tab { padding: 8px 20px; border-radius: 8px; border: none; font-family: 'Exo 2', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; background: transparent; color: rgba(255,255,255,0.4); }
  .auth-tab.active { background: rgba(0,212,255,0.1); color: #00d4ff; border: 1px solid rgba(0,212,255,0.3); }
  .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 14px 0; }
  .score-cell { display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 32px; border-radius: 8px; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.2s; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); }
  .score-cell:focus { outline: none; border-color: rgba(0,212,255,0.5); background: rgba(0,212,255,0.08); color: #fff; }
  .admin-sidebar { border-right-color: rgba(245,158,11,0.15); }
  .admin-sidebar::before { background: repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(245,158,11,0.01) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(245,158,11,0.01) 50px); }
`;

// ===== MOCK DATA =====
const STUDENT = {
  name: "Ganesh", id: "E720524AM006", dept: "Artificial Intelligence and Machine Learning",
  year: "2nd Year", semester: "4th Semester", section: "A", cgpa: 8.74,
  email: "E720524AM006@ecetonline.com", phone: "+91 7010736728",
  dob: "10 August 2006", blood: "B+", address: "1, Navakkarai, Coimbatore, Tamil Nadu, India",
  advisor: "Mrs. Anju", hostel: "Room 311, ECET Hostel",
  busRoute: "NIL", admYear: "2024", category: "General",
  parentName: "Vijayakumar", parentPhone: "+91 0000000000",
};

const TEACHER = {
  name: "Mrs. Anju", id: "FAC2024001", dept: "Aritificial Intelligence and Machine Learning",
  designation: "Associate Professor", email: "anju.r@ecetonline.com", phone: "+91 35235345234",
  experience: "12 years", qualification: "Ph.D Computer Science", specialization: "Machine Learning & AI",
  subjects: ["CS301 – Data Structures & Algorithms", "CS306 – Machine Learning"],
  classes: ["CSE – A (2nd Year)", "CSE – B (3rd Year)", "AI/ML – A (2nd Year)"],
  joiningDate: "June 2026",
};

const ATTENDANCE = [
  { subject: "Data Structures & Algorithms", code: "CS301", present: 42, total: 48, staff: "Mrs. Anju" },
  { subject: "Computer Networks", code: "CS302", present: 38, total: 45, staff: "Mr. Kirubhanandhan" },
  { subject: "Operating Systems", code: "CS303", present: 44, total: 48, staff: "Mr. Dinesh" },
  { subject: "Database Management Systems", code: "CS304", present: 36, total: 44, staff: "Mrs. Gopika" },
  { subject: "Web Technologies", code: "CS305", present: 40, total: 44, staff: "Dr. Hima Vyshnavi" },
  { subject: "Machine Learning", code: "CS306", present: 41, total: 46, staff: "Mr. Praveen" },
  { subject: "Software Engineering", code: "CS307", present: 28, total: 36, staff: "Mrs. Sujithra" },
];

const TIMETABLE = {
  Monday: [
    { time: "9:00–10:00", subject: "DS Lab", code: "CS301", room: "CS Lab 1", type: "Lab" },
    { time: "10:00–11:00", subject: "DS Lab", code: "CS301", room: "CS Lab 1", type: "Lab" },
    { time: "11:15–12:15", subject: "Computer Networks", code: "CS302", room: "Room 201", type: "Theory" },
    { time: "12:15–1:15", subject: "OS Lab", code: "CS303", room: "OS Lab", type: "Lab" },
    { time: "2:15–3:15", subject: "Web Technologies", code: "CS305", room: "Room 205", type: "Theory" },
    { time: "3:15–4:15", subject: "Machine Learning", code: "CS306", room: "Room 203", type: "Theory" },
  ],
  Tuesday: [
    { time: "9:00–10:00", subject: "Operating Systems", code: "CS303", room: "Room 202", type: "Theory" },
    { time: "10:00–11:00", subject: "DBMS", code: "CS304", room: "Room 204", type: "Theory" },
    { time: "11:15–12:15", subject: "Software Eng.", code: "CS307", room: "Room 206", type: "Theory" },
    { time: "2:15–3:15", subject: "ML Lab", code: "CS306", room: "AI Lab", type: "Lab" },
    { time: "3:15–4:15", subject: "ML Lab", code: "CS306", room: "AI Lab", type: "Lab" },
  ],
  Wednesday: [
    { time: "9:00–10:00", subject: "Computer Networks", code: "CS302", room: "Room 201", type: "Theory" },
    { time: "10:00–11:00", subject: "Machine Learning", code: "CS306", room: "Room 203", type: "Theory" },
    { time: "11:15–12:15", subject: "DBMS Lab", code: "CS304", room: "DB Lab", type: "Lab" },
    { time: "12:15–1:15", subject: "DBMS Lab", code: "CS304", room: "DB Lab", type: "Lab" },
    { time: "2:15–3:15", subject: "Data Structures", code: "CS301", room: "Room 201", type: "Theory" },
  ],
  Thursday: [
    { time: "9:00–10:00", subject: "Web Tech Lab", code: "CS305", room: "Web Lab", type: "Lab" },
    { time: "10:00–11:00", subject: "Web Tech Lab", code: "CS305", room: "Web Lab", type: "Lab" },
    { time: "11:15–12:15", subject: "Operating Systems", code: "CS303", room: "Room 202", type: "Theory" },
    { time: "2:15–3:15", subject: "Software Eng.", code: "CS307", room: "Room 206", type: "Theory" },
    { time: "3:15–4:15", subject: "DBMS", code: "CS304", room: "Room 204", type: "Theory" },
  ],
  Friday: [
    { time: "9:00–10:00", subject: "Data Structures", code: "CS301", room: "Room 201", type: "Theory" },
    { time: "10:00–11:00", subject: "CN Lab", code: "CS302", room: "CN Lab", type: "Lab" },
    { time: "11:15–12:15", subject: "Machine Learning", code: "CS306", room: "Room 203", type: "Theory" },
    { time: "2:15–3:15", subject: "Seminar", code: "—", room: "Seminar Hall", type: "Activity" },
    { time: "3:15–4:15", subject: "Mentor Session", code: "—", room: "Room 201", type: "Activity" },
  ],
};

const FEE_DATA = {
  semester: "Even Semester 2023–24",
  breakdown: [
    { item: "Tuition Fee", amount: 60000, paid: true, date: "Jan 5, 2024" },
    { item: "Hostel Fee", amount: 20000, paid: false, date: null },
    { item: "Examination Fee", amount: 5000, paid: false, date: null },
    { item: "Library Fee", amount: 2000, paid: false, date: null },
    { item: "Sports & Cultural Fee", amount: 3000, paid: false, date: null },
    { item: "Infrastructure Development", amount: 5000, paid: false, date: null },
  ],
  history: [
    { date: "Jan 5, 2024", desc: "Tuition Fee – Even Sem 2023-24", amount: 60000, method: "Net Banking", receipt: "RCP2024001" },
    { date: "Dec 10, 2023", desc: "Hostel Fee – Odd Sem 2023-24", amount: 18000, method: "UPI", receipt: "RCP2023098" },
    { date: "Jul 8, 2023", desc: "Tuition Fee – Odd Sem 2023-24", amount: 60000, method: "Card", receipt: "RCP2023044" },
  ]
};

const RESULTS = [
  {
    sem: "Semester 3 – Odd 2025-26", cgpa: 8.9, credits: 25,
    subjects: [
      { code: "CS251", name: "Design & Analysis of Algorithms", int: 48, ext: 72, total: 120, max: 150, grade: "A+", pts: 10 },
      { code: "CS252", name: "Computer Organization & Architecture", int: 44, ext: 68, total: 112, max: 150, grade: "A", pts: 9 },
      { code: "CS253", name: "Theory of Computation", int: 42, ext: 65, total: 107, max: 150, grade: "A", pts: 9 },
      { code: "CS254", name: "Cryptography & Network Security", int: 46, ext: 71, total: 117, max: 150, grade: "A+", pts: 10 },
      { code: "CS255", name: "Full Stack Development", int: 49, ext: 75, total: 124, max: 150, grade: "O", pts: 10 },
      { code: "CS256", name: "Advanced Java Lab", int: 49, ext: 49, total: 98, max: 100, grade: "O", pts: 10 },
    ]
  },
  {
    sem: "Semester 2 – Even 2024-25", cgpa: 9.6, credits: 24,
    subjects: [
      { code: "CS201", name: "Data Structures", int: 45, ext: 66, total: 111, max: 150, grade: "A", pts: 9 },
      { code: "CS202", name: "Computer Networks", int: 43, ext: 63, total: 106, max: 150, grade: "A", pts: 9 },
      { code: "CS203", name: "Object Oriented Programming", int: 47, ext: 70, total: 117, max: 150, grade: "A+", pts: 10 },
      { code: "CS204", name: "Engineering Mathematics", int: 50, ext: 99, total: 101, max: 150, grade: "O", pts: 10 },
    ]
  }
];

const NOTIFICATIONS = [
  { id: 1, type: "urgent", title: "Fee Payment Reminder", msg: "Last date for Even Semester fee payment is March 31, 2024. Late fees apply after due date.", time: "2 hours ago", read: false },
  { id: 2, type: "academic", title: "Internal Assessment – IA3 Schedule", msg: "IA-3 examinations are scheduled from March 28 – April 3, 2024.", time: "5 hours ago", read: false },
  { id: 3, type: "event", title: "TechFest SARVAM 2026 Open", msg: "Annual technical festival registrations now open. Last date: March 25, 2024.", time: "1 day ago", read: true },
  { id: 4, type: "hostel", title: "Hostel Water Maintenance", msg: "Water supply interrupted 6 AM–12 PM on March 26 for plumbing maintenance.", time: "1 day ago", read: true },
  { id: 5, type: "placement", title: "Campus Drive – TCS Digital", msg: "TCS conducting placement drive on April 10. Eligible students register by March 28.", time: "3 days ago", read: true },
  { id: 6, type: "academic", title: "Project Report Submission", msg: "Final year project reports to be submitted by April 5, 2024.", time: "4 days ago", read: true },
];

const OD_REQUESTS = [
  { id: "OD001", reason: "Technical Symposium at KGiSL", fromDate: "Mar 15", toDate: "Mar 16", days: 2, status: "approved", on: "Mar 10" },
  { id: "OD002", reason: "Hackathon at IIT Madras (SIH)", fromDate: "Feb 22", toDate: "Feb 22", days: 1, status: "pending", on: "Feb 18" },
  { id: "OD003", reason: "Industrial Visit – TCS Chennai", fromDate: "Jan 18", toDate: "Jan 18", days: 1, status: "rejected", on: "Jan 12", remark: "Insufficient notice period" },
];

const OUTPASS_HISTORY = [
  { id: "OP001", destination: "Home – Vellore", from: "Mar 22, 5:00 PM", to: "Mar 24, 6:00 PM", status: "approved", type: "Weekend", qr: true },
  { id: "OP002", destination: "Apollo Hospital – Medical", from: "Mar 18, 10:00 AM", to: "Mar 18, 7:00 PM", status: "approved", type: "Medical", qr: true },
  { id: "OP003", destination: "Home – Vellore", from: "Mar 8, 5:00 PM", to: "Mar 10, 6:00 PM", status: "approved", type: "Weekend", qr: true },
  { id: "OP004", destination: "Friend's event – Ooty", from: "Mar 3, 3:00 PM", to: "Mar 3, 9:00 PM", status: "rejected", type: "Personal", qr: false },
];

const LIBRARY_BORROWED = [
  { id: "LIB001", title: "Introduction to Algorithms", author: "Cormen et al.", due: "Apr 5, 2024", status: "ok", fine: 0 },
  { id: "LIB002", title: "Computer Networks", author: "Andrew Tanenbaum", due: "Mar 20, 2024", status: "overdue", fine: 30 },
];

const LIBRARY_CATALOG = [
  { title: "Clean Code", author: "Robert C. Martin", available: 3, dept: "CS", isbn: "9780132350884" },
  { title: "Design Patterns", author: "Gang of Four", available: 0, dept: "CS", isbn: "9780201633610" },
  { title: "The Pragmatic Programmer", author: "Thomas & Hunt", available: 2, dept: "CS", isbn: "9780201616224" },
  { title: "Artificial Intelligence: A Modern Approach", author: "Russell & Norvig", available: 1, dept: "AI/ML", isbn: "9780134610993" },
  { title: "Database System Concepts", author: "Silberschatz et al.", available: 5, dept: "CS", isbn: "9780078022159" },
  { title: "Operating System Concepts", author: "Silberschatz et al.", available: 4, dept: "CS", isbn: "9781118063330" },
];

const HOSTEL_DATA = {
  block: "A Block", room: "001", type: "Three Sharing", floor: "3rd Floor",
  warden: "Mr. Arun", wardenPhone: "+91 1111111111",
  roommate: "Sriram (E720524AM029)", roomPhone: "+91 2222222222",
  messMenu: {
    Breakfast: ["Idli / Vada", "Sambar & Chutney", "Bread & Butter", "Tea / Coffee"],
    Lunch: ["Rice", "Dal / Sambar", "Rasam", "Curd", "Papad & Pickle"],
    Snacks: ["Bajji / Bread Toast", "Tea / Coffee"],
    Dinner: ["Rice / Chapati", "Dal Fry", "Paneer / Chicken (Wed&Sun)", "Buttermilk"],
  },
  amenities: ["Wi-Fi 24×7", "Laundry Room", "Common Room TV", "Indoor Games", "Study Hall", "Water Purifier", "Generator Backup", "CCTV Security"],
  complaints: [
    { id: "HC001", issue: "Bathroom tap leaking in Room 412", date: "Mar 18, 2024", status: "resolved" },
    { id: "HC002", issue: "Wi-Fi router not working on 4th floor", date: "Mar 20, 2024", status: "in-progress" },
    { id: "HC003", issue: "Window latch broken", date: "Mar 22, 2024", status: "pending" },
  ]
};

const BUS_ROUTES = [
  { route: "Route 1", stops: "College → Chavadi → Ettimadai → Ukkadam", timing: "7:30 AM / 5:00 PM", seats: 45 },
  { route: "Route 2", stops: "College → AJK → DSCE → Walayar", timing: "7:45 AM / 5:00 PM", seats: 45 },
  { route: "Route 7", stops: "College → Palakkad", timing: "7:45 AM / 5:00 PM", seats: 50 }
];

const COLLEGE_INFO = {
  name: "EASA College of Engineering and Technology",
  estd: "2008", accreditation: "NAAC A++",
  affiliation: "Anna University, Chennai",
  address: "NH-47, Palakkad Main Road, Navakkarai (PO), Coimbatore - 641 105, Tamil Nadu",
  phone: "0422-2656871", email: "info@easatech.com", website: "www.easacollege.com",
  departments: [
    { name: "Computer Science & Engineering", hod: "Mr. Arun", students: 480, faculty: 32 },
    { name: "Electronics & Communication Eng.", hod: "Mrs. Gopika", students: 360, faculty: 28 },
    { name: "Mechanical Engineering", hod: "Mr. Krushna", students: 240, faculty: 20 },
    { name: "Information Technology", hod: "Mrs. Hima Vyshnavi", students: 240, faculty: 22 },
  ],
  events: [
    { title: "SARVAM 2026 – National TechFest", date: "Apr 12–14, 2024", venue: "Main Auditorium", type: "Technical" },
    { title: "AURA – Cultural Extravaganza", date: "Apr 19–20, 2024", venue: "Open Air Theatre", type: "Cultural" },
    { title: "Industry Connect 2024", date: "Mar 30, 2024", venue: "Seminar Hall A", type: "Placement" },
    { title: "AI & GenAI Workshop", date: "Mar 27, 2024", venue: "CS Seminar Hall", type: "Workshop" },
  ]
};

const COURSES = [
  { code: "CS301", name: "Data Structures & Algorithms", credits: 4, type: "Theory", staff: "Dr. A. Kumar", syllabus: ["Unit 1: Arrays, Linked Lists, Stacks, Queues", "Unit 2: Trees, Heaps, BST", "Unit 3: Graphs, BFS, DFS", "Unit 4: Sorting & Searching", "Unit 5: Dynamic Programming, Greedy"] },
  { code: "CS302", name: "Computer Networks", credits: 4, type: "Theory", staff: "Prof. S. Lakshmi", syllabus: ["Unit 1: OSI Model, TCP/IP", "Unit 2: Data Link Layer", "Unit 3: Network Layer, Routing", "Unit 4: Transport Layer, TCP/UDP", "Unit 5: Application Layer"] },
  { code: "CS306", name: "Machine Learning", credits: 4, type: "Theory", staff: "Dr. M. Kavitha", syllabus: ["Unit 1: ML Fundamentals", "Unit 2: Classification, Naive Bayes, SVM", "Unit 3: Decision Trees, Ensemble", "Unit 4: Neural Networks", "Unit 5: NLP, Model Evaluation"] },
];

// Teacher-specific mock data
const TEACHER_STUDENTS = [
  { id: "E720524AM001", name: "Aadhi Paramasivam", section: "A", cgpa: 8.9, att: 92, ia1: 46, ia2: 44, ia3: 47 },
  { id: "E720524AM002", name: "Bharath Kumar", section: "A", cgpa: 7.8, att: 78, ia1: 38, ia2: 40, ia3: 42 },
  { id: "E720524AM003", name: "Chandrika S", section: "A", cgpa: 9.1, att: 95, ia1: 48, ia2: 47, ia3: 49 },
  { id: "E720524AM004", name: "Dheeraj Patel", section: "A", cgpa: 6.5, att: 68, ia1: 32, ia2: 35, ia3: 30 },
  { id: "E720524AM005", name: "Eswari Devi", section: "A", cgpa: 8.3, att: 88, ia1: 43, ia2: 44, ia3: 45 },
  { id: "E720524AM006", name: "Ganesh", section: "A", cgpa: 8.74, att: 87, ia1: 45, ia2: 46, ia3: 47 },
  { id: "E720524AM007", name: "Harini Krishnan", section: "A", cgpa: 9.4, att: 97, ia1: 49, ia2: 50, ia3: 48 },
  { id: "E720524AM008", name: "Inban Raj", section: "A", cgpa: 7.2, att: 72, ia1: 36, ia2: 38, ia3: 37 },
  { id: "E720524AM009", name: "Janani Priya", section: "B", cgpa: 8.0, att: 82, ia1: 40, ia2: 41, ia3: 43 },
  { id: "E720524AM010", name: "Karthick Vel", section: "B", cgpa: 7.5, att: 75, ia1: 37, ia2: 36, ia3: 39 },
  { id: "E720524AM011", name: "Lavanya S", section: "B", cgpa: 8.6, att: 90, ia1: 44, ia2: 45, ia3: 46 },
  { id: "E720524AM012", name: "Muthu Kumar", section: "B", cgpa: 6.8, att: 65, ia1: 33, ia2: 34, ia3: 32 },
];

const TEACHER_ASSIGNMENTS = [
  { id: "AS001", title: "Linked List Implementation in C", subject: "CS301", dueDate: "Mar 25, 2024", submitted: 45, total: 60, status: "active" },
  { id: "AS002", title: "Binary Tree Traversal Programs", subject: "CS301", dueDate: "Mar 18, 2024", submitted: 58, total: 60, status: "closed" },
  { id: "AS003", title: "Neural Network from Scratch (Python)", subject: "CS306", dueDate: "Apr 1, 2024", submitted: 22, total: 60, status: "active" },
  { id: "AS004", title: "SVM Classification Lab Report", subject: "CS306", dueDate: "Mar 10, 2024", submitted: 55, total: 60, status: "graded" },
];

const TEACHER_SCHEDULE = {
  Monday: [
    { time: "9:00–10:00", subject: "Data Structures Lab", code: "CS301", class: "CSE-A 2nd Year", room: "CS Lab 1", type: "Lab" },
    { time: "11:15–12:15", subject: "Machine Learning", code: "CS306", class: "AI/ML-A 2nd Year", room: "Room 203", type: "Theory" },
    { time: "2:15–4:15", subject: "DS Lab (Cont.)", code: "CS301", class: "CSE-A 2nd Year", room: "CS Lab 1", type: "Lab" },
  ],
  Wednesday: [
    { time: "10:00–11:00", subject: "Machine Learning", code: "CS306", class: "CSE-B 3rd Year", room: "Room 204", type: "Theory" },
    { time: "11:15–12:15", subject: "Data Structures", code: "CS301", class: "AI/ML-A 2nd Year", room: "Room 201", type: "Theory" },
  ],
  Friday: [
    { time: "9:00–10:00", subject: "ML Lab", code: "CS306", class: "AI/ML-A 2nd Year", room: "AI Lab", type: "Lab" },
    { time: "2:15–3:15", subject: "Mentor Session", code: "—", class: "CSE-A 2nd Year", room: "Room 201", type: "Activity" },
  ],
};

// Admin mock data
const ADMIN_STUDENTS = [
  { id: "E720524AM006", name: "Ganesh", dept: "AI/ML", year: "2nd", fees: "partial", scholarship: false, status: "active" },
  { id: "E720524CS001", name: "Ajay", dept: "CSE", year: "2nd", fees: "paid", scholarship: true, status: "active" },
  { id: "E720524CS002", name: "Arun Prasath", dept: "CSE", year: "2nd", fees: "pending", scholarship: false, status: "active" },
  { id: "E720524EC001", name: "Chennakesavan", dept: "ECE", year: "3rd", fees: "paid", scholarship: true, status: "active" },
  { id: "E720524ME001", name: "Dharunn", dept: "MECH", year: "1st", fees: "pending", scholarship: false, status: "active" },
  { id: "E720524IT001", name: "Gokul", dept: "IT", year: "4th", fees: "paid", scholarship: false, status: "active" },
  { id: "E720523CS005", name: "Hema Prabha", dept: "CSE", year: "3rd", fees: "partial", scholarship: true, status: "active" },
  { id: "E720522EC003", name: "Hrithik", dept: "ECE", year: "4th", fees: "pending", scholarship: false, status: "inactive" },
];

const ADMIN_TEACHERS = [
  { id: "FAC2024001", name: "Mrs. Anju", dept: "AI/ML", designation: "Associate Professor", subjects: 2, status: "active", joined: "Jun 2026" },
  { id: "FAC2020002", name: "Mr. Kirubhanandhan", dept: "ECE", designation: "Assistant Professor", subjects: 3, status: "active", joined: "Aug 2020" },
  { id: "FAC2018003", name: "Mrs. Gopika", dept: "CSE", designation: "Professor", subjects: 2, status: "active", joined: "Jul 2018" },
  { id: "FAC2022004", name: "Dr. Hima Vyshnavi", dept: "IT", designation: "Associate Professor", subjects: 2, status: "active", joined: "Jan 2022" },
  { id: "FAC2019005", name: "Mr. Praveen", dept: "AI/ML", designation: "Assistant Professor", subjects: 3, status: "active", joined: "Aug 2019" },
  { id: "FAC2016006", name: "Mrs. Sujithra", dept: "CSE", designation: "Professor", subjects: 2, status: "on-leave", joined: "Jun 2016" },
];

const ADMIN_FEES = [
  { id: "FEE001", student: "Ganesh", rollNo: "E720524AM006", dept: "AI/ML", amount: 95000, paid: 60000, pending: 35000, due: "Mar 31, 2024", status: "partial" },
  { id: "FEE002", student: "Aadhi Paramasivam", rollNo: "E720524CS001", dept: "CSE", amount: 95000, paid: 95000, pending: 0, due: "—", status: "paid" },
  { id: "FEE003", student: "Bharath Kumar", rollNo: "E720524CS002", dept: "CSE", amount: 95000, paid: 0, pending: 95000, due: "Mar 31, 2024", status: "pending" },
  { id: "FEE004", student: "Chandrika S", rollNo: "E720524EC001", dept: "ECE", amount: 95000, paid: 95000, pending: 0, due: "—", status: "paid" },
  { id: "FEE005", student: "Dheeraj Patel", rollNo: "E720524ME001", dept: "MECH", amount: 85000, paid: 0, pending: 85000, due: "Mar 31, 2024", status: "pending" },
];

const ADMIN_SCHOLARSHIPS = [
  { id: "SCH001", student: "Aadhi Paramasivam", rollNo: "E720524CS001", type: "Merit Scholarship", amount: 20000, status: "approved", year: "2024-25" },
  { id: "SCH002", student: "Chandrika S", rollNo: "E720524EC001", type: "Government SC/ST", amount: 45000, status: "approved", year: "2024-25" },
  { id: "SCH003", student: "Harini Krishnan", rollNo: "E720523CS005", type: "Sports Excellence", amount: 15000, status: "pending", year: "2024-25" },
  { id: "SCH004", student: "Eswari Devi", rollNo: "E720524IT001", type: "Need-Based Aid", amount: 30000, status: "processing", year: "2024-25" },
];

const ADMIN_TC_REQUESTS = [
  { id: "TC001", student: "Inban Raj", rollNo: "E720522EC003", reason: "Transfer to home state", applied: "Mar 15, 2024", status: "processing", dues: "₹0" },
  { id: "TC002", student: "Sample Student", rollNo: "E720521ME002", reason: "Discontinuing education", applied: "Mar 10, 2024", status: "approved", dues: "₹0" },
  { id: "TC003", student: "Another Student", rollNo: "E720524CS010", reason: "Admission in other college", applied: "Mar 20, 2024", status: "pending", dues: "₹35,000" },
];

// ===== UTILITY =====
const pct = (p, t) => Math.round((p / t) * 100);
const fmtCurr = (n) => "₹" + n.toLocaleString("en-IN");
const getStatusBadge = (s) => {
  if (s === "approved" || s === "resolved" || s === "ok" || s === "paid" || s === "active" || s === "graded") return "badge-green";
  if (s === "pending" || s === "partial") return "badge-yellow";
  if (s === "rejected" || s === "overdue") return "badge-red";
  if (s === "in-progress" || s === "processing") return "badge-cyan";
  if (s === "on-leave" || s === "closed") return "badge-gray";
  return "badge-gray";
};
const getGradeColor = (g) => {
  if (g === "O") return "#34d399"; if (g === "A+") return "#60a5fa";
  if (g === "A") return "#a78bfa"; if (g === "B+") return "#fbbf24";
  return "#94a3b8";
};

// ===== REUSABLE COMPONENTS =====
const PageHeader = ({ icon: Icon2, title, subtitle, children, accentColor = "#00d4ff" }) => (
  <div className="flex items-center justify-between mb-6" style={{ flexWrap: "wrap", gap: 12 }}>
    <div className="flex items-center gap-3">
      <div style={{ width: 40, height: 40, borderRadius: 12, background: `${accentColor}18`, border: `1px solid ${accentColor}30`, display: "flex", alignItems: "center", justifyContent: "center", color: accentColor }}>
        <Icon2 size={18} />
      </div>
      <div>
        <h1 className="ems-heading" style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: 0.5 }}>{title}</h1>
        {subtitle && <p className="text-muted text-xs" style={{ marginTop: 2 }}>{subtitle}</p>}
      </div>
    </div>
    {children && <div className="flex gap-2" style={{ flexWrap: "wrap" }}>{children}</div>}
  </div>
);

const InfoRow = ({ label, value, accent }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
    <span className="text-muted text-sm">{label}</span>
    <span style={{ fontSize: 13, fontWeight: 500, color: accent ? "#00d4ff" : "#e2e8f0", textAlign: "right", maxWidth: "60%" }}>{value}</span>
  </div>
);

const ProgressBar = ({ pct: p, color = "#00d4ff" }) => (
  <div className="progress-track" style={{ marginTop: 6 }}>
    <div className="progress-fill" style={{ width: `${p}%`, background: p < 75 ? "#f87171" : p < 85 ? "#fbbf24" : color }} />
  </div>
);

const QRCode = () => {
  const pattern = Array.from({ length: 100 }, (_, i) => {
    const r = Math.floor(i / 10); const c = i % 10;
    if ((r < 3 && c < 3) || (r < 3 && c > 6) || (r > 6 && c < 3)) return true;
    return Math.random() > 0.55;
  });
  return (
    <div className="qr-box">
      {pattern.map((on, i) => <div key={i} className="qr-cell" style={{ background: on ? "#000" : "#fff" }} />)}
    </div>
  );
};

// ===========================
// ===== STUDENT PAGES =====
// ===========================

const Dashboard = () => {
  const totalAtt = ATTENDANCE.reduce((a, c) => a + c.present, 0);
  const totalCls = ATTENDANCE.reduce((a, c) => a + c.total, 0);
  const paidFees = FEE_DATA.breakdown.filter(f => f.paid).reduce((a, f) => a + f.amount, 0);
  const totalFees = FEE_DATA.breakdown.reduce((a, f) => a + f.amount, 0);
  const attChartData = ATTENDANCE.map(a => ({ name: a.code, pct: pct(a.present, a.total) }));
  const semGpaData = [
    { sem: "S1", gpa: 8.1 }, { sem: "S2", gpa: 8.3 }, { sem: "S3", gpa: 8.5 },
    { sem: "S4", gpa: 8.6 }, { sem: "S5", gpa: 8.9 }, { sem: "S6*", gpa: 8.74 }
  ];
  return (
    <div className="page-in">
      <div style={{ marginBottom: 24 }}>
        <div className="flex items-center justify-between" style={{ flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 className="ems-heading" style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: 0.5 }}>
              Welcome back, <span className="text-cyan">{STUDENT.name.split(" ")[0]}</span> 👋
            </h1>
            <p className="text-muted text-sm" style={{ marginTop: 4 }}>{STUDENT.dept} · {STUDENT.year} · {STUDENT.semester}</p>
          </div>
          <div className="flex gap-2">
            <div style={{ padding: "6px 14px", borderRadius: 20, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", fontSize: 12, color: "#00d4ff", fontWeight: 600 }}>CGPA: {STUDENT.cgpa}</div>
            <div style={{ padding: "6px 14px", borderRadius: 20, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", fontSize: 12, color: "#34d399", fontWeight: 600 }}>Section {STUDENT.section}</div>
          </div>
        </div>
      </div>
      <div className="grid-cols-4 mb-4">
        {[
          { label: "Overall Attendance", value: `${pct(totalAtt, totalCls)}%`, sub: `${totalAtt}/${totalCls} classes`, color: "#00d4ff", icon: Activity },
          { label: "Current CGPA", value: STUDENT.cgpa, sub: "Rank: 8 / 120 students", color: "#8b5cf6", icon: TrendingUp },
          { label: "Fee Paid", value: fmtCurr(paidFees), sub: `${fmtCurr(totalFees - paidFees)} pending`, color: "#10b981", icon: CreditCard },
          { label: "Notifications", value: NOTIFICATIONS.filter(n => !n.read).length, sub: "Unread messages", color: "#f59e0b", icon: Bell },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, borderRadius: "0 14px 0 60px", background: `${s.color}10` }} />
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted text-xs" style={{ textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</span>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}><s.icon size={15} /></div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, fontFamily: "'Orbitron', monospace", letterSpacing: -1 }}>{s.value}</div>
            <div className="text-muted text-xs mt-2">{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16, letterSpacing: 0.5 }}>SUBJECT-WISE ATTENDANCE</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={attChartData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "#0a1628", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 8, color: "#e2e8f0", fontSize: 12 }} />
              <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
                {attChartData.map((e, i) => <Cell key={i} fill={e.pct < 75 ? "#ef4444" : e.pct < 85 ? "#f59e0b" : "#00d4ff"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16, letterSpacing: 0.5 }}>CGPA PROGRESSION</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={semGpaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="sem" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[7.5, 10]} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0a1628", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 8, color: "#e2e8f0", fontSize: 12 }} />
              <Line type="monotone" dataKey="gpa" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: "#8b5cf6", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16, letterSpacing: 0.5 }}>RECENT NOTIFICATIONS</h3>
          {NOTIFICATIONS.slice(0, 4).map(n => (
            <div key={n.id} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", alignItems: "flex-start" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: !n.read ? "#00d4ff" : "transparent", border: "1px solid rgba(255,255,255,0.15)", marginTop: 5, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: !n.read ? "#e2e8f0" : "rgba(255,255,255,0.5)" }}>{n.title}</div>
                <div className="text-muted text-xs" style={{ marginTop: 2 }}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16, letterSpacing: 0.5 }}>TODAY'S SCHEDULE</h3>
          {TIMETABLE.Wednesday.slice(0, 5).map((cls, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", alignItems: "center" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", width: 80, flexShrink: 0 }}>{cls.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500 }}>{cls.subject}</div>
                <div className="text-muted text-xs">{cls.room}</div>
              </div>
              <span className={`badge ${cls.type === "Lab" ? "badge-purple" : "badge-cyan"}`} style={{ fontSize: 10 }}>{cls.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Profile = () => (
  <div className="page-in">
    <PageHeader icon={User} title="My Profile" subtitle="Personal & Academic Information" />
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
      <div>
        <div className="glass-card p-5" style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#00d4ff,#8b5cf6)", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800, color: "#fff", boxShadow: "0 0 24px rgba(0,212,255,0.3)" }}>
            {STUDENT.name[0]}
          </div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{STUDENT.name}</h2>
          <p className="text-muted text-xs">{STUDENT.id}</p>
          <div style={{ margin: "14px 0", padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#00d4ff", fontFamily: "'Orbitron', monospace" }}>{STUDENT.cgpa}</div>
            <div className="text-muted text-xs" style={{ marginTop: 2 }}>CGPA</div>
          </div>
          <span className="badge badge-green">Active Student</span>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Quick Info</h3>
          <InfoRow label="Year" value={STUDENT.year} />
          <InfoRow label="Semester" value={STUDENT.semester} />
          <InfoRow label="Section" value={STUDENT.section} />
          <InfoRow label="Blood Group" value={STUDENT.blood} accent />
          <InfoRow label="Advisor" value={STUDENT.advisor} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="glass-card p-5">
          <h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Personal Information</h3>
          <div className="grid-cols-2">
            <div><InfoRow label="Full Name" value={STUDENT.name} /><InfoRow label="Date of Birth" value={STUDENT.dob} /><InfoRow label="Blood Group" value={STUDENT.blood} accent /></div>
            <div><InfoRow label="Category" value={STUDENT.category} /><InfoRow label="Parent Name" value={STUDENT.parentName} /><InfoRow label="Parent Phone" value={STUDENT.parentPhone} /></div>
          </div>
          <InfoRow label="Address" value={STUDENT.address} />
        </div>
        <div className="glass-card p-5">
          <h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Academic Information</h3>
          <div className="grid-cols-2">
            <div><InfoRow label="Department" value={STUDENT.dept} /><InfoRow label="Regulation" value="R2021" /><InfoRow label="Batch" value="2024–2028" /></div>
            <div><InfoRow label="Roll Number" value={STUDENT.id} accent /><InfoRow label="Register No." value="E720524AM006" /><InfoRow label="Academic Advisor" value={STUDENT.advisor} /></div>
          </div>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Contact & Accommodation</h3>
          <div className="grid-cols-2">
            <div><InfoRow label="Email" value={STUDENT.email} /><InfoRow label="Phone" value={STUDENT.phone} /></div>
            <div><InfoRow label="Hostel" value={STUDENT.hostel} /><InfoRow label="Bus Route" value={STUDENT.busRoute} accent /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Courses = () => {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="page-in">
      <PageHeader icon={BookOpen} title="Courses & Syllabus" subtitle="4th Semester – Even 2023-24" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {COURSES.map((c, i) => (
          <div key={i} className="glass-card" style={{ overflow: "hidden" }}>
            <div onClick={() => setExpanded(expanded === i ? null : i)} style={{ padding: "14px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div className="flex items-center gap-3">
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#00d4ff", fontFamily: "'Orbitron',monospace" }}>{c.credits}cr</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#e2e8f0" }}>{c.name}</div>
                  <div className="text-muted text-xs" style={{ marginTop: 2 }}>{c.code} · {c.staff}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-cyan">{c.type}</span>
                <ChevronRight size={14} style={{ color: "rgba(255,255,255,0.3)", transform: expanded === i ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
              </div>
            </div>
            {expanded === i && (
              <div style={{ padding: "0 20px 16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <h4 className="text-xs text-muted" style={{ letterSpacing: 1.2, textTransform: "uppercase", margin: "12px 0 10px", fontWeight: 600 }}>Syllabus Units</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {c.syllabus.map((unit, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#00d4ff", flexShrink: 0, marginTop: 1 }}>{j + 1}</div>
                      <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.65)" }}>{unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Attendance = () => {
  const overall = pct(ATTENDANCE.reduce((a, c) => a + c.present, 0), ATTENDANCE.reduce((a, c) => a + c.total, 0));
  return (
    <div className="page-in">
      <PageHeader icon={BarChart2} title="Attendance" subtitle="Current Semester Attendance Tracker">
        <div style={{ padding: "6px 16px", borderRadius: 10, background: overall < 75 ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.1)", border: `1px solid ${overall < 75 ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.25)"}`, fontSize: 13, fontWeight: 700, color: overall < 75 ? "#f87171" : "#34d399" }}>
          Overall: {overall}%
        </div>
      </PageHeader>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ATTENDANCE.map((a, i) => {
          const p = pct(a.present, a.total);
          const shortage = Math.max(0, Math.ceil((0.75 * a.total - a.present) / 0.25));
          return (
            <div key={i} className="glass-card p-5">
              <div className="flex items-center justify-between mb-2">
                <div><div style={{ fontWeight: 600, fontSize: 14, color: "#e2e8f0" }}>{a.subject}</div><div className="text-muted text-xs" style={{ marginTop: 2 }}>{a.code} · {a.staff}</div></div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: p < 75 ? "#f87171" : p < 85 ? "#fbbf24" : "#00d4ff", fontFamily: "'Orbitron',monospace" }}>{p}%</div>
                  <div className="text-muted text-xs">{a.present}/{a.total}</div>
                </div>
              </div>
              <ProgressBar pct={p} />
              <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
                {p < 75 ? <span className="text-xs" style={{ color: "#f87171" }}>⚠ Need {shortage} more class{shortage !== 1 ? "es" : ""} to reach 75%</span>
                  : p >= 85 ? <span className="text-xs text-green">✓ Can miss {Math.floor((a.present - 0.75 * a.total) / 0.25)} more classes safely</span>
                    : <span className="text-xs text-yellow">Maintain attendance – borderline</span>}
                <span className={`badge ${p < 75 ? "badge-red" : p < 85 ? "badge-yellow" : "badge-green"}`} style={{ fontSize: 10 }}>{p < 75 ? "Short" : p < 85 ? "Borderline" : "Good"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Timetable = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [activeDay, setActiveDay] = useState("Wednesday");
  return (
    <div className="page-in">
      <PageHeader icon={Calendar} title="Timetable" subtitle="4th Semester – Even 2023-24" />
      <div className="flex gap-2 mb-4" style={{ flexWrap: "wrap" }}>
        {days.map(d => <button key={d} onClick={() => setActiveDay(d)} className={`btn ${activeDay === d ? "btn-primary" : "btn-ghost"}`} style={{ fontSize: 12 }}>{d.slice(0, 3)}</button>)}
      </div>
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{activeDay}</h3>
          <div className="flex gap-2"><span className="badge badge-cyan">Theory</span><span className="badge badge-purple">Lab</span><span className="badge badge-green">Activity</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {(TIMETABLE[activeDay] || []).map((cls, i) => (
            <div key={i} className={`tt-cell ${cls.type === "Lab" ? "tt-lab" : cls.type === "Theory" ? "tt-theory" : "tt-activity"}`}>
              <div className="flex items-center justify-between">
                <div><div style={{ fontWeight: 600, fontSize: 13 }}>{cls.subject}</div><div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{cls.code} · {cls.room}</div></div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>{cls.time}</div>
              </div>
            </div>
          ))}
          <div className="tt-empty tt-cell" style={{ minHeight: 50, justifyContent: "center", alignItems: "center", opacity: 0.5 }}>1:15 – 2:15 PM · Lunch Break</div>
        </div>
      </div>
    </div>
  );
};

const FeePayment = () => {
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const unpaid = FEE_DATA.breakdown.filter(f => !f.paid);
  const totalSelected = selected.reduce((a, item) => a + item.amount, 0);
  const handlePay = () => { setProcessing(true); setTimeout(() => { setProcessing(false); setSuccess(true); }, 2500); };
  return (
    <div className="page-in">
      <PageHeader icon={CreditCard} title="Fee Payment" subtitle="Even Semester 2023-24">
        <button className="btn btn-primary" onClick={() => { setModal(true); setStep(1); setSelected([]); setSuccess(false); }}><Plus size={14} /> Pay Now</button>
      </PageHeader>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
        {[
          { label: "Total Fee", value: fmtCurr(FEE_DATA.breakdown.reduce((a, f) => a + f.amount, 0)), color: "#e2e8f0" },
          { label: "Paid", value: fmtCurr(FEE_DATA.breakdown.filter(f => f.paid).reduce((a, f) => a + f.amount, 0)), color: "#34d399" },
          { label: "Balance Due", value: fmtCurr(FEE_DATA.breakdown.filter(f => !f.paid).reduce((a, f) => a + f.amount, 0)), color: "#f87171" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="text-muted text-xs" style={{ textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color, fontFamily: "'Orbitron',monospace" }}>{s.value}</div>
            {i === 2 && <div className="text-muted text-xs" style={{ marginTop: 6 }}>Due: March 31, 2024</div>}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 14, textTransform: "uppercase", fontSize: 11 }}>Fee Breakdown</h3>
          {FEE_DATA.breakdown.map((f, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="flex items-center gap-2">
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: f.paid ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.1)", border: `1px solid ${f.paid ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {f.paid ? <Check size={10} style={{ color: "#34d399" }} /> : <Clock size={10} style={{ color: "#f87171" }} />}
                </div>
                <div><div style={{ fontSize: 13, fontWeight: 500 }}>{f.item}</div>{f.date && <div className="text-muted text-xs">Paid on {f.date}</div>}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: f.paid ? "#34d399" : "#f87171" }}>{fmtCurr(f.amount)}</div>
                <span className={`badge ${f.paid ? "badge-green" : "badge-red"}`} style={{ fontSize: 10, marginTop: 2 }}>{f.paid ? "Paid" : "Pending"}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 14, textTransform: "uppercase", fontSize: 11 }}>Payment History</h3>
          {FEE_DATA.history.map((h, i) => (
            <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{h.desc}</div>
                  <div className="text-muted text-xs" style={{ marginTop: 2 }}>{h.date} · {h.method} · <span style={{ color: "#00d4ff" }}>{h.receipt}</span></div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#34d399" }}>{fmtCurr(h.amount)}</div>
                  <button className="btn btn-ghost" style={{ fontSize: 10, padding: "3px 8px", marginTop: 4 }}><Download size={10} /> Receipt</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget && !processing) setModal(false); }}>
          <div className="modal-box">
            {!success ? (<>
              <h2 className="ems-heading" style={{ fontSize: 16, fontWeight: 700, color: "#00d4ff", marginBottom: 20 }}>{step === 1 ? "Select Fees to Pay" : "Payment Gateway"}</h2>
              {step === 1 && (<>
                {unpaid.map((f, i) => (
                  <label key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 10, cursor: "pointer", background: selected.includes(f) ? "rgba(0,212,255,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${selected.includes(f) ? "rgba(0,212,255,0.25)" : "rgba(255,255,255,0.07)"}`, marginBottom: 8 }}>
                    <input type="checkbox" checked={selected.includes(f)} onChange={e => setSelected(e.target.checked ? [...selected, f] : selected.filter(x => x !== f))} style={{ accentColor: "#00d4ff" }} />
                    <span style={{ flex: 1, fontSize: 13 }}>{f.item}</span>
                    <span style={{ fontWeight: 700 }}>{fmtCurr(f.amount)}</span>
                  </label>
                ))}
                <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 10, background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>Total Amount</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "#00d4ff", fontFamily: "'Orbitron',monospace" }}>{fmtCurr(totalSelected)}</span>
                </div>
                <button className="btn btn-primary w-full" style={{ marginTop: 16, justifyContent: "center" }} disabled={!selected.length} onClick={() => setStep(2)}>Proceed to Pay</button>
              </>)}
              {step === 2 && (<>
                <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 13 }}>Amount to Pay</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "#34d399", fontFamily: "'Orbitron',monospace" }}>{fmtCurr(totalSelected)}</span>
                </div>
                <div className="mb-3">
                  <label className="text-xs text-muted" style={{ display: "block", marginBottom: 6 }}>PAYMENT METHOD</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                    {[{ id: "upi", label: "UPI" }, { id: "card", label: "Card" }, { id: "netbanking", label: "Net Banking" }].map(m => (
                      <button key={m.id} onClick={() => setMethod(m.id)} className="btn" style={{ padding: "8px", fontSize: 12, justifyContent: "center", background: method === m.id ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.04)", border: `1px solid ${method === m.id ? "rgba(0,212,255,0.35)" : "rgba(255,255,255,0.08)"}`, color: method === m.id ? "#00d4ff" : "rgba(255,255,255,0.6)" }}>{m.label}</button>
                    ))}
                  </div>
                </div>
                {method === "upi" && <div className="mb-3"><label className="text-xs text-muted" style={{ display: "block", marginBottom: 6 }}>UPI ID</label><input className="input" placeholder="yourname@upi" /></div>}
                {method === "card" && <div className="mb-3" style={{ display: "flex", flexDirection: "column", gap: 8 }}><input className="input" placeholder="Card Number" /><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}><input className="input" placeholder="MM/YY" /><input className="input" placeholder="CVV" type="password" /></div><input className="input" placeholder="Cardholder Name" /></div>}
                {method === "netbanking" && <div className="mb-3"><select className="select"><option>SBI</option><option>HDFC Bank</option><option>ICICI Bank</option></select></div>}
                <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", fontSize: 11, color: "#fbbf24", marginBottom: 14 }}>🔒 Secured by 256-bit SSL encryption</div>
                <div className="flex gap-2">
                  <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(1)}>Back</button>
                  <button className="btn btn-primary" style={{ flex: 2, justifyContent: "center" }} onClick={handlePay} disabled={processing}>
                    {processing ? <><RefreshCw size={13} style={{ animation: "spin 1s linear infinite" }} /> Processing...</> : `Pay ${fmtCurr(totalSelected)}`}
                  </button>
                </div>
              </>)}
            </>) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(16,185,129,0.15)", border: "2px solid #34d399", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={28} style={{ color: "#34d399" }} /></div>
                <h2 className="ems-heading" style={{ fontSize: 18, color: "#34d399", marginBottom: 8 }}>Payment Successful!</h2>
                <p className="text-muted text-sm">{fmtCurr(totalSelected)} paid successfully</p>
                <button className="btn btn-success" style={{ marginTop: 16, justifyContent: "center" }} onClick={() => setModal(false)}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Results = () => {
  const [active, setActive] = useState(0);
  const sem = RESULTS[active];
  return (
    <div className="page-in">
      <PageHeader icon={Award} title="Exam Results" subtitle={`CGPA: ${STUDENT.cgpa} | Rank: 8 / 120`} />
      <div className="flex gap-2 mb-4">
        {RESULTS.map((r, i) => <button key={i} onClick={() => setActive(i)} className={`btn ${active === i ? "btn-primary" : "btn-ghost"}`} style={{ fontSize: 12 }}>{r.sem.split("–")[0].trim()}</button>)}
      </div>
      <div className="glass-card p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div><h3 style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{sem.sem}</h3><div className="text-muted text-xs" style={{ marginTop: 2 }}>Credits: {sem.credits}</div></div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#8b5cf6", fontFamily: "'Orbitron',monospace" }}>{sem.cgpa}</div>
            <div className="text-muted text-xs">CGPA</div>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Code</th><th>Subject</th><th>Internal</th><th>External</th><th>Total</th><th>Grade</th><th>Points</th></tr></thead>
            <tbody>
              {sem.subjects.map((s, i) => (
                <tr key={i}>
                  <td><span className="badge badge-cyan" style={{ fontSize: 10 }}>{s.code}</span></td>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td style={{ color: "rgba(255,255,255,0.7)" }}>{s.int}/50</td>
                  <td style={{ color: "rgba(255,255,255,0.7)" }}>{s.ext}/{s.max === 100 ? 50 : 100}</td>
                  <td style={{ fontWeight: 600 }}>{s.total}/{s.max}</td>
                  <td><span style={{ color: getGradeColor(s.grade), fontWeight: 700, fontSize: 14 }}>{s.grade}</span></td>
                  <td><span style={{ color: "#00d4ff", fontWeight: 700 }}>{s.pts}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ODRequest = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ reason: "", from: "", to: "", org: "", faculty: "" });
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="page-in">
      <PageHeader icon={FileText} title="OD Request" subtitle="On Duty / Leave Requests">
        <button className="btn btn-primary" onClick={() => setShowForm(true)}><Plus size={14} /> New OD Request</button>
      </PageHeader>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {OD_REQUESTS.map((od, i) => (
          <div key={i} className="glass-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{od.reason}</div>
                <div className="text-muted text-xs" style={{ marginTop: 3 }}>ID: {od.id} · Applied: {od.on} · {od.fromDate}{od.days > 1 ? ` – ${od.toDate}` : ""} · {od.days} day{od.days > 1 ? "s" : ""}</div>
                {od.remark && <div style={{ marginTop: 4, fontSize: 11, color: "#f87171" }}>Remark: {od.remark}</div>}
              </div>
              <span className={`badge ${getStatusBadge(od.status)}`}>{od.status.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="modal-box modal-box-lg">
            {!submitted ? (<>
              <h2 className="ems-heading" style={{ fontSize: 16, fontWeight: 700, color: "#00d4ff", marginBottom: 20 }}>New OD Request</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>EVENT / PURPOSE *</label><input className="input" placeholder="e.g., Technical Symposium, Hackathon" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} /></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>ORGANIZING INSTITUTION</label><input className="input" placeholder="e.g., IIT Madras, VIT University" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>FROM DATE *</label><input className="input" type="date" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} /></div>
                  <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>TO DATE *</label><input className="input" type="date" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} /></div>
                </div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>FACULTY IN-CHARGE</label><select className="select" value={form.faculty} onChange={e => setForm({ ...form, faculty: e.target.value })}><option value="">Select Faculty</option>{ATTENDANCE.map((a, i) => <option key={i} value={a.staff}>{a.staff}</option>)}</select></div>
              </div>
              <div className="flex gap-2" style={{ marginTop: 16 }}>
                <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowForm(false)}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 2, justifyContent: "center" }} onClick={() => setSubmitted(true)}><Send size={13} /> Submit</button>
              </div>
            </>) : (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <CheckCircle size={40} style={{ color: "#34d399", margin: "0 auto 12px" }} />
                <h3 style={{ color: "#34d399", fontFamily: "'Orbitron',monospace" }}>Request Submitted!</h3>
                <p className="text-muted text-sm" style={{ marginTop: 8 }}>Your OD request has been sent for approval.</p>
                <button className="btn btn-ghost" style={{ marginTop: 14, justifyContent: "center" }} onClick={() => { setShowForm(false); setSubmitted(false); }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Outpass = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ destination: "", purpose: "", from: "", to: "", type: "Personal" });
  const [submitted, setSubmitted] = useState(false);
  const [viewQR, setViewQR] = useState(null);
  return (
    <div className="page-in">
      <PageHeader icon={DoorOpen} title="Outpass" subtitle="Gate Pass Requests">
        <button className="btn btn-primary" onClick={() => setShowForm(true)}><Plus size={14} /> New Outpass</button>
      </PageHeader>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {OUTPASS_HISTORY.map((op, i) => (
          <div key={i} className="glass-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2"><span style={{ fontWeight: 600, fontSize: 14 }}>{op.destination}</span><span className="badge badge-gray" style={{ fontSize: 10 }}>{op.type}</span></div>
                <div className="text-muted text-xs" style={{ marginTop: 3 }}>ID: {op.id} · {op.from} → {op.to}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`badge ${getStatusBadge(op.status)}`}>{op.status.toUpperCase()}</span>
                {op.qr && <button className="btn btn-outline" style={{ fontSize: 11, padding: "4px 10px" }} onClick={() => setViewQR(op)}>QR Pass</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="modal-box">
            {!submitted ? (<>
              <h2 className="ems-heading" style={{ fontSize: 16, fontWeight: 700, color: "#00d4ff", marginBottom: 20 }}>New Outpass Request</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>PASS TYPE</label><select className="select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Personal</option><option>Medical</option><option>Weekend</option><option>Emergency</option></select></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>DESTINATION *</label><input className="input" placeholder="Where are you going?" value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} /></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>PURPOSE</label><textarea className="textarea" placeholder="Brief reason" value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} style={{ minHeight: 70 }} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>FROM *</label><input className="input" type="datetime-local" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} /></div>
                  <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>RETURN BY *</label><input className="input" type="datetime-local" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} /></div>
                </div>
              </div>
              <div className="flex gap-2" style={{ marginTop: 16 }}>
                <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowForm(false)}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 2, justifyContent: "center" }} onClick={() => setSubmitted(true)}><Send size={13} /> Submit</button>
              </div>
            </>) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <CheckCircle size={40} style={{ color: "#34d399", margin: "0 auto 12px" }} />
                <h3 style={{ color: "#34d399", fontFamily: "'Orbitron',monospace" }}>Submitted!</h3>
                <button className="btn btn-ghost" style={{ marginTop: 14, justifyContent: "center" }} onClick={() => { setShowForm(false); setSubmitted(false); }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
      {viewQR && (
        <div className="modal-overlay" onClick={() => setViewQR(null)}>
          <div className="modal-box" style={{ textAlign: "center" }} onClick={e => e.stopPropagation()}>
            <h2 className="ems-heading" style={{ fontSize: 15, fontWeight: 700, color: "#00d4ff", marginBottom: 6 }}>Gate Pass – {viewQR.id}</h2>
            <p className="text-muted text-xs" style={{ marginBottom: 20 }}>Show this QR at the gate</p>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><QRCode /></div>
            <div style={{ padding: "10px", borderRadius: 10, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}><div><b>{STUDENT.name}</b> · {STUDENT.id}</div><div style={{ marginTop: 4 }}>{viewQR.destination}</div><div style={{ marginTop: 4, color: "#34d399" }}>APPROVED ✓</div></div>
            </div>
            <button className="btn btn-ghost" onClick={() => setViewQR(null)} style={{ justifyContent: "center" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const HostelPage = () => {
  const [tab, setTab] = useState("info");
  return (
    <div className="page-in">
      <PageHeader icon={Home} title="Hostel" subtitle={`${HOSTEL_DATA.block}, Room ${HOSTEL_DATA.room}`} />
      <div className="tab-bar">
        {["info", "mess", "amenities"].map(t => <button key={t} onClick={() => setTab(t)} className={`btn ${tab === t ? "btn-primary" : "btn-ghost"}`} style={{ fontSize: 12, textTransform: "capitalize" }}>{t}</button>)}
      </div>
      {tab === "info" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="glass-card p-5"><h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Room Details</h3><InfoRow label="Block" value={HOSTEL_DATA.block} accent /><InfoRow label="Room" value={HOSTEL_DATA.room} accent /><InfoRow label="Type" value={HOSTEL_DATA.type} /><InfoRow label="Floor" value={HOSTEL_DATA.floor} /><InfoRow label="Roommate" value={HOSTEL_DATA.roommate} /></div>
        <div className="glass-card p-5"><h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Warden Info</h3><InfoRow label="Warden" value={HOSTEL_DATA.warden} /><InfoRow label="Contact" value={HOSTEL_DATA.wardenPhone} accent /></div>
      </div>}
      {tab === "mess" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {Object.entries(HOSTEL_DATA.messMenu).map(([meal, items]) => (
          <div key={meal} className="glass-card p-5"><h3 style={{ fontWeight: 700, color: "#00d4ff", fontSize: 13, marginBottom: 12, fontFamily: "'Orbitron',monospace" }}>{meal.toUpperCase()}</h3>
            {items.map((item, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}><div style={{ width: 4, height: 4, borderRadius: "50%", background: "#00d4ff" }} /><span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{item}</span></div>)}
          </div>
        ))}
      </div>}
      {tab === "amenities" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
        {HOSTEL_DATA.amenities.map((a, i) => (
          <div key={i} className="glass-card p-4" style={{ textAlign: "center" }}><div style={{ fontSize: 24, marginBottom: 8 }}>{["📶", "👕", "📺", "🎮", "📚", "💧", "⚡", "🔒"][i] || "✅"}</div><div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{a}</div></div>
        ))}
      </div>}
    </div>
  );
};

const Library = () => {
  const [search, setSearch] = useState("");
  const filtered = LIBRARY_CATALOG.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="page-in">
      <PageHeader icon={Book} title="Library" subtitle="Digital Library Management" />
      <div className="glass-card p-5 mb-4">
        <h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Borrowed Books</h3>
        {LIBRARY_BORROWED.map((b, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div><div style={{ fontWeight: 600, fontSize: 13 }}>{b.title}</div><div className="text-muted text-xs" style={{ marginTop: 2 }}>{b.author} · Due: {b.due}</div>{b.fine > 0 && <div style={{ color: "#f87171", fontSize: 11, marginTop: 2 }}>Fine: ₹{b.fine}</div>}</div>
            <span className={`badge ${b.status === "overdue" ? "badge-red" : "badge-green"}`}>{b.status}</span>
          </div>
        ))}
      </div>
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase" }}>Catalog Search</h3>
          <div style={{ position: "relative", width: 240 }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
            <input className="input" style={{ paddingLeft: 32 }} placeholder="Search title or author..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="table-wrap">
          <table><thead><tr><th>Title</th><th>Author</th><th>Dept</th><th>Availability</th><th></th></tr></thead>
            <tbody>{filtered.map((b, i) => (
              <tr key={i}><td style={{ fontWeight: 500 }}>{b.title}</td><td className="text-muted">{b.author}</td><td><span className="badge badge-purple" style={{ fontSize: 10 }}>{b.dept}</span></td>
                <td><span className={`badge ${b.available > 0 ? "badge-green" : "badge-red"}`}>{b.available > 0 ? `${b.available} available` : "Not Available"}</span></td>
                <td><button className="btn btn-ghost btn-sm" disabled={b.available === 0}>Reserve</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Transport = () => (
  <div className="page-in">
    <PageHeader icon={Bus} title="Transportation" subtitle="College Bus Routes & Timings" />
    <div className="glass-card">
      <div className="table-wrap">
        <table><thead><tr><th>Route</th><th>Stops</th><th>Timing</th><th>Capacity</th></tr></thead>
          <tbody>{BUS_ROUTES.map((r, i) => (
            <tr key={i}><td><span style={{ fontFamily: "'Orbitron',monospace", fontSize: 12, color: "#00d4ff", fontWeight: 700 }}>{r.route}</span></td>
              <td style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{r.stops}</td>
              <td style={{ fontSize: 12 }}>{r.timing}</td><td className="text-muted text-sm">{r.seats} seats</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  </div>
);

const CollegeInfo = () => {
  const [tab, setTab] = useState("about");
  const eventColors = { Technical: "badge-cyan", Cultural: "badge-purple", Placement: "badge-green", Social: "badge-yellow", Workshop: "badge-gray" };
  return (
    <div className="page-in">
      <PageHeader icon={Building2} title="College Information" subtitle={COLLEGE_INFO.name} />
      <div className="tab-bar">
        {["about", "departments", "events"].map(t => <button key={t} onClick={() => setTab(t)} className={`btn ${tab === t ? "btn-primary" : "btn-ghost"}`} style={{ fontSize: 12, textTransform: "capitalize" }}>{t}</button>)}
      </div>
      {tab === "about" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="glass-card p-5"><h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Institute Details</h3><InfoRow label="Established" value={COLLEGE_INFO.estd} /><InfoRow label="Accreditation" value={COLLEGE_INFO.accreditation} accent /><InfoRow label="Affiliation" value={COLLEGE_INFO.affiliation} /><InfoRow label="Website" value={COLLEGE_INFO.website} accent /></div>
        <div className="glass-card p-5"><h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Contact</h3><div style={{ display: "flex", gap: 10, marginBottom: 10 }}><MapPin size={14} style={{ color: "#00d4ff", marginTop: 1 }} /><span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{COLLEGE_INFO.address}</span></div><div style={{ display: "flex", gap: 10, marginBottom: 10 }}><Phone size={14} style={{ color: "#00d4ff" }} /><span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{COLLEGE_INFO.phone}</span></div><div style={{ display: "flex", gap: 10 }}><Mail size={14} style={{ color: "#00d4ff" }} /><span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{COLLEGE_INFO.email}</span></div></div>
      </div>}
      {tab === "departments" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {COLLEGE_INFO.departments.map((d, i) => (<div key={i} className="glass-card p-5"><div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{d.name}</div><div className="text-muted text-xs" style={{ marginBottom: 12 }}>HoD: {d.hod}</div><div className="flex gap-3"><div style={{ flex: 1, textAlign: "center", padding: "8px", borderRadius: 8, background: "rgba(0,212,255,0.05)" }}><div style={{ fontWeight: 700, color: "#00d4ff" }}>{d.students}</div><div className="text-xs text-muted">Students</div></div><div style={{ flex: 1, textAlign: "center", padding: "8px", borderRadius: 8, background: "rgba(139,92,246,0.05)" }}><div style={{ fontWeight: 700, color: "#a78bfa" }}>{d.faculty}</div><div className="text-xs text-muted">Faculty</div></div></div></div>))}
      </div>}
      {tab === "events" && <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {COLLEGE_INFO.events.map((e, i) => (<div key={i} className="glass-card p-4"><div className="flex items-center justify-between"><div><div style={{ fontWeight: 600, fontSize: 14 }}>{e.title}</div><div className="text-muted text-xs" style={{ marginTop: 3 }}>{e.date} · {e.venue}</div></div><div className="flex items-center gap-2"><span className={`badge ${eventColors[e.type] || "badge-gray"}`}>{e.type}</span><button className="btn btn-outline btn-sm">Register</button></div></div></div>))}
      </div>}
    </div>
  );
};

const StudentNotifications = ({ notifs, setNotifs }) => {
  const typeIcons = { urgent: "🚨", academic: "📚", event: "🎉", hostel: "🏠", placement: "💼" };
  return (
    <div className="page-in">
      <PageHeader icon={Bell} title="Notifications" subtitle={`${notifs.filter(n => !n.read).length} unread`}>
        <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => setNotifs(notifs.map(n => ({ ...n, read: true })))}><Check size={13} /> Mark all read</button>
      </PageHeader>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {notifs.map(n => (
          <div key={n.id} className="glass-card p-4" style={{ borderColor: !n.read ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.07)", cursor: "pointer" }} onClick={() => setNotifs(notifs.map(x => x.id === n.id ? { ...x, read: true } : x))}>
            <div className="flex items-start gap-3">
              <div style={{ fontSize: 20, flexShrink: 0 }}>{typeIcons[n.type] || "🔔"}</div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ fontWeight: !n.read ? 700 : 500, fontSize: 13.5, color: !n.read ? "#fff" : "rgba(255,255,255,0.6)" }}>{n.title}</span>
                  {!n.read && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4ff" }} />}
                </div>
                <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{n.msg}</p>
                <span className="text-xs text-muted" style={{ marginTop: 4, display: "block" }}>{n.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===========================
// ===== TEACHER PAGES =====
// ===========================

const TeacherDashboard = () => {
  const attByClass = [
    { class: "CSE-A", pct: 88 }, { class: "CSE-B", pct: 82 }, { class: "AI/ML-A", pct: 91 },
  ];
  const iaAvg = [
    { name: "CS301", ia1: 42, ia2: 43, ia3: 44 },
    { name: "CS306", ia1: 40, ia2: 41, ia3: 43 },
  ];
  return (
    <div className="page-in">
      <div style={{ marginBottom: 24 }}>
        <h1 className="ems-heading" style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: 0.5 }}>
          Welcome, <span style={{ color: "#a78bfa" }}>{TEACHER.name.split(" ").slice(0, 2).join(" ")}</span> 👋
        </h1>
        <p className="text-muted text-sm" style={{ marginTop: 4 }}>{TEACHER.designation} · {TEACHER.dept}</p>
      </div>
      <div className="grid-cols-4 mb-4">
        {[
          { label: "Total Students", value: TEACHER_STUDENTS.length, sub: "Across all classes", color: "#a78bfa", icon: Users },
          { label: "Subjects Teaching", value: "2", sub: "CS301, CS306", color: "#00d4ff", icon: BookOpen },
          { label: "Assignments Active", value: TEACHER_ASSIGNMENTS.filter(a => a.status === "active").length, sub: "Pending submissions", color: "#f59e0b", icon: ClipboardList },
          { label: "Low Attendance", value: TEACHER_STUDENTS.filter(s => s.att < 75).length, sub: "Students below 75%", color: "#f87171", icon: AlertCircle },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, borderRadius: "0 14px 0 60px", background: `${s.color}10` }} />
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted text-xs" style={{ textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</span>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}><s.icon size={15} /></div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, fontFamily: "'Orbitron', monospace", letterSpacing: -1 }}>{s.value}</div>
            <div className="text-muted text-xs mt-2">{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>CLASS ATTENDANCE OVERVIEW</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={attByClass} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="class" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0a1628", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 8, color: "#e2e8f0", fontSize: 12 }} />
              <Bar dataKey="pct" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>IA SCORE TREND</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={iaAvg}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[30, 50]} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0a1628", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 8, color: "#e2e8f0", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }} />
              <Line type="monotone" dataKey="ia1" stroke="#a78bfa" strokeWidth={2} dot={{ r: 4 }} name="IA-1" />
              <Line type="monotone" dataKey="ia2" stroke="#00d4ff" strokeWidth={2} dot={{ r: 4 }} name="IA-2" />
              <Line type="monotone" dataKey="ia3" stroke="#34d399" strokeWidth={2} dot={{ r: 4 }} name="IA-3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 14 }}>STUDENTS NEEDING ATTENTION</h3>
          {TEACHER_STUDENTS.filter(s => s.att < 80).map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", alignItems: "center" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#f87171", flexShrink: 0 }}>{s.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                <div className="text-muted text-xs">{s.id}</div>
              </div>
              <span className="badge badge-red" style={{ fontSize: 10 }}>{s.att}% att</span>
            </div>
          ))}
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 14 }}>TODAY'S SCHEDULE</h3>
          {(TEACHER_SCHEDULE.Wednesday || []).map((cls, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", alignItems: "center" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", width: 80, flexShrink: 0 }}>{cls.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500 }}>{cls.subject}</div>
                <div className="text-muted text-xs">{cls.class} · {cls.room}</div>
              </div>
              <span className={`badge ${cls.type === "Lab" ? "badge-purple" : "badge-cyan"}`} style={{ fontSize: 10 }}>{cls.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TeacherProfile = () => (
  <div className="page-in">
    <PageHeader icon={User} title="Faculty Profile" subtitle="Personal & Professional Information" accentColor="#a78bfa" />
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
      <div className="glass-card p-5" style={{ textAlign: "center", height: "fit-content" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#a78bfa,#8b5cf6)", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800, color: "#fff", boxShadow: "0 0 24px rgba(139,92,246,0.3)" }}>{TEACHER.name[0]}</div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{TEACHER.name}</h2>
        <p className="text-muted text-xs" style={{ marginBottom: 8 }}>{TEACHER.id}</p>
        <span className="badge badge-purple">{TEACHER.designation}</span>
        <div style={{ marginTop: 16 }}>
          <InfoRow label="Department" value={TEACHER.dept} />
          <InfoRow label="Experience" value={TEACHER.experience} />
          <InfoRow label="Joining Date" value={TEACHER.joiningDate} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="glass-card p-5">
          <h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Professional Information</h3>
          <div className="grid-cols-2">
            <div><InfoRow label="Qualification" value={TEACHER.qualification} /><InfoRow label="Specialization" value={TEACHER.specialization} /><InfoRow label="Email" value={TEACHER.email} /></div>
            <div><InfoRow label="Phone" value={TEACHER.phone} /><InfoRow label="Designation" value={TEACHER.designation} accent /><InfoRow label="Dept" value={TEACHER.dept} /></div>
          </div>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Subjects & Classes</h3>
          <div className="grid-cols-2">
            <div>
              <div className="text-xs text-muted" style={{ marginBottom: 8, letterSpacing: 1 }}>SUBJECTS ASSIGNED</div>
              {TEACHER.subjects.map((s, i) => <div key={i} style={{ padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 13, color: "#a78bfa", fontWeight: 500 }}>{s}</div>)}
            </div>
            <div>
              <div className="text-xs text-muted" style={{ marginBottom: 8, letterSpacing: 1 }}>CLASSES</div>
              {TEACHER.classes.map((c, i) => <div key={i} style={{ padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{c}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TeacherAttendance = () => {
  const [selectedClass, setSelectedClass] = useState("A");
  const [selectedSubject, setSelectedSubject] = useState("CS301");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState({});
  const [saved, setSaved] = useState(false);
  const students = TEACHER_STUDENTS.filter(s => s.section === selectedClass);
  const toggle = (id) => setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  const markAll = (val) => { const a = {}; students.forEach(s => a[s.id] = val); setAttendance(a); };
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const presentCount = students.filter(s => attendance[s.id] === true).length;
  return (
    <div className="page-in">
      <PageHeader icon={BarChart2} title="Attendance Management" subtitle="Mark & track student attendance" accentColor="#a78bfa">
        <button className="btn btn-purple" onClick={handleSave}>{saved ? <><Check size={13} /> Saved!</> : <><CheckCircle size={13} /> Save Attendance</>}</button>
      </PageHeader>
      <div className="glass-card p-5 mb-4">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>SUBJECT</label>
            <select className="select" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
              <option value="CS301">CS301 – Data Structures</option>
              <option value="CS306">CS306 – Machine Learning</option>
            </select>
          </div>
          <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>SECTION</label>
            <select className="select" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </div>
          <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>DATE</label>
            <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#a78bfa", fontFamily: "'Orbitron',monospace" }}>{presentCount}/{students.length}</div>
              <div className="text-xs text-muted">Present</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <button className="btn btn-success btn-sm" onClick={() => markAll(true)}><Check size={12} /> Mark All Present</button>
          <button className="btn btn-danger btn-sm" onClick={() => markAll(false)}><X size={12} /> Mark All Absent</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {students.map(s => {
            const isPresent = attendance[s.id];
            const isAbsent = attendance[s.id] === false;
            return (
              <div key={s.id} onClick={() => toggle(s.id)} style={{ padding: "10px 14px", borderRadius: 10, cursor: "pointer", background: isPresent ? "rgba(16,185,129,0.08)" : isAbsent ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.03)", border: `1px solid ${isPresent ? "rgba(16,185,129,0.3)" : isAbsent ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.07)"}`, transition: "all 0.2s", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: isPresent ? "rgba(16,185,129,0.2)" : isAbsent ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: isPresent ? "#34d399" : isAbsent ? "#f87171" : "rgba(255,255,255,0.4)", flexShrink: 0 }}>{s.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: isPresent ? "#34d399" : isAbsent ? "#f87171" : "rgba(255,255,255,0.7)" }}>{s.name}</div>
                  <div className="text-xs text-muted">{s.id.slice(-4)}</div>
                </div>
                {isPresent && <Check size={14} style={{ color: "#34d399", flexShrink: 0 }} />}
                {isAbsent && <X size={14} style={{ color: "#f87171", flexShrink: 0 }} />}
              </div>
            );
          })}
        </div>
      </div>
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 14 }}>OVERALL ATTENDANCE TRACKER ({selectedSubject})</h3>
        <div className="table-wrap">
          <table><thead><tr><th>Student</th><th>Roll No</th><th>Overall Att.</th><th>Status</th></tr></thead>
            <tbody>{students.map((s, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{s.name}</td>
                <td className="text-muted text-xs">{s.id}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}><div style={{ width: `${s.att}%`, height: "100%", background: s.att < 75 ? "#ef4444" : s.att < 85 ? "#f59e0b" : "#8b5cf6", borderRadius: 2 }} /></div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: s.att < 75 ? "#f87171" : s.att < 85 ? "#fbbf24" : "#a78bfa", width: 36, textAlign: "right" }}>{s.att}%</span>
                  </div>
                </td>
                <td><span className={`badge ${s.att < 75 ? "badge-red" : s.att < 85 ? "badge-yellow" : "badge-green"}`} style={{ fontSize: 10 }}>{s.att < 75 ? "Shortage" : s.att < 85 ? "Borderline" : "Good"}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TeacherStudents = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered = TEACHER_STUDENTS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search));
  return (
    <div className="page-in">
      <PageHeader icon={Users} title="Student Details" subtitle="All students under your supervision" accentColor="#a78bfa" />
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <span className="badge badge-purple">{TEACHER_STUDENTS.length} Students</span>
            <span className="badge badge-red">{TEACHER_STUDENTS.filter(s => s.att < 75).length} Below 75%</span>
          </div>
          <div style={{ position: "relative", width: 240 }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
            <input className="input" style={{ paddingLeft: 32 }} placeholder="Search student..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="table-wrap">
          <table><thead><tr><th>Name</th><th>Roll No</th><th>Section</th><th>CGPA</th><th>Attendance</th><th>IA-1</th><th>IA-2</th><th>IA-3</th><th></th></tr></thead>
            <tbody>{filtered.map((s, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{s.name}</td>
                <td className="text-muted text-xs">{s.id}</td>
                <td><span className="badge badge-gray" style={{ fontSize: 10 }}>{s.section}</span></td>
                <td><span style={{ color: s.cgpa >= 9 ? "#34d399" : s.cgpa >= 8 ? "#a78bfa" : s.cgpa >= 7 ? "#fbbf24" : "#f87171", fontWeight: 700 }}>{s.cgpa}</span></td>
                <td><span style={{ color: s.att < 75 ? "#f87171" : s.att < 85 ? "#fbbf24" : "#34d399", fontWeight: 700 }}>{s.att}%</span></td>
                <td>{s.ia1}/50</td>
                <td>{s.ia2}/50</td>
                <td>{s.ia3}/50</td>
                <td><button className="btn btn-ghost btn-sm" onClick={() => setSelected(s)}>View</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box modal-purple" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div className="flex items-center gap-3">
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#a78bfa,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#fff" }}>{selected.name[0]}</div>
                <div><div style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>{selected.name}</div><div className="text-muted text-xs">{selected.id} · Section {selected.section}</div></div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}><X size={14} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                { label: "CGPA", value: selected.cgpa, color: "#a78bfa" },
                { label: "Attendance", value: `${selected.att}%`, color: selected.att < 75 ? "#f87171" : "#34d399" },
                { label: "IA-1", value: `${selected.ia1}/50`, color: "#00d4ff" },
                { label: "IA-2", value: `${selected.ia2}/50`, color: "#00d4ff" },
                { label: "IA-3", value: `${selected.ia3}/50`, color: "#00d4ff" },
                { label: "Avg IA", value: `${Math.round((selected.ia1 + selected.ia2 + selected.ia3) / 3)}/50`, color: "#fbbf24" },
              ].map((m, i) => (
                <div key={i} style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-xs text-muted" style={{ marginBottom: 4 }}>{m.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: m.color, fontFamily: "'Orbitron',monospace" }}>{m.value}</div>
                </div>
              ))}
            </div>
            <button className="btn btn-ghost w-full" style={{ justifyContent: "center" }} onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const TeacherMarking = () => {
  const [subject, setSubject] = useState("CS301");
  const [iaType, setIaType] = useState("ia1");
  const [scores, setScores] = useState(() => {
    const s = {};
    TEACHER_STUDENTS.forEach(st => s[st.id] = st[iaType]);
    return s;
  });
  const [saved, setSaved] = useState(false);
  const update = (id, val) => setScores(prev => ({ ...prev, [id]: Math.min(50, Math.max(0, parseInt(val) || 0)) }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const avg = Math.round(Object.values(scores).reduce((a, v) => a + v, 0) / Object.values(scores).length);
  return (
    <div className="page-in">
      <PageHeader icon={Edit3} title="Marks Entry" subtitle="Enter & manage internal assessment scores" accentColor="#a78bfa">
        <button className="btn btn-purple" onClick={handleSave}>{saved ? <><Check size={13} /> Saved!</> : <><CheckCircle size={13} /> Save Marks</>}</button>
      </PageHeader>
      <div className="glass-card p-5 mb-4">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>SUBJECT</label>
            <select className="select" value={subject} onChange={e => setSubject(e.target.value)}>
              <option value="CS301">CS301 – Data Structures</option>
              <option value="CS306">CS306 – Machine Learning</option>
            </select>
          </div>
          <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>ASSESSMENT</label>
            <select className="select" value={iaType} onChange={e => setIaType(e.target.value)}>
              <option value="ia1">IA-1 (Internal Test 1)</option>
              <option value="ia2">IA-2 (Internal Test 2)</option>
              <option value="ia3">IA-3 (Model Exam)</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#a78bfa", fontFamily: "'Orbitron',monospace" }}>{avg}/50</div>
              <div className="text-xs text-muted">Class Average</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#00d4ff", fontFamily: "'Orbitron',monospace" }}>{Object.values(scores).filter(v => v >= 40).length}</div>
              <div className="text-xs text-muted">Scored ≥40</div>
            </div>
          </div>
        </div>
        <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)", fontSize: 11, color: "#fbbf24", marginBottom: 14 }}>
          💡 Click on score cells to edit. Max marks: 50. Press Tab to move to next student.
        </div>
        <div className="table-wrap">
          <table><thead><tr><th>#</th><th>Student</th><th>Roll No</th><th>Section</th><th>Score (/50)</th><th>Grade</th></tr></thead>
            <tbody>{TEACHER_STUDENTS.map((s, i) => {
              const score = scores[s.id] ?? 0;
              const grade = score >= 45 ? "O" : score >= 40 ? "A+" : score >= 35 ? "A" : score >= 28 ? "B+" : score >= 20 ? "B" : "RA";
              return (
                <tr key={i}>
                  <td className="text-muted text-xs">{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td className="text-muted text-xs">{s.id}</td>
                  <td><span className="badge badge-gray" style={{ fontSize: 10 }}>{s.section}</span></td>
                  <td>
                    <input type="number" min="0" max="50" value={score} onChange={e => update(s.id, e.target.value)} style={{ width: 60, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 8, padding: "4px 8px", color: "#fff", fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: 13, outline: "none", textAlign: "center" }} />
                  </td>
                  <td><span style={{ color: getGradeColor(grade), fontWeight: 700 }}>{grade}</span></td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TeacherAssignments = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", subject: "CS301", due: "", instructions: "" });
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="page-in">
      <PageHeader icon={ClipboardList} title="Assignments" subtitle="Manage assignments & submissions" accentColor="#a78bfa">
        <button className="btn btn-purple" onClick={() => setShowForm(true)}><Plus size={14} /> New Assignment</button>
      </PageHeader>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {TEACHER_ASSIGNMENTS.map((a, i) => (
          <div key={i} className="glass-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{a.title}</span>
                  <span className="badge badge-purple" style={{ fontSize: 10 }}>{a.subject}</span>
                  <span className={`badge ${getStatusBadge(a.status)}`} style={{ fontSize: 10 }}>{a.status.toUpperCase()}</span>
                </div>
                <div className="text-muted text-xs">Due: {a.dueDate} · Submissions: {a.submitted}/{a.total}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#a78bfa", fontFamily: "'Orbitron',monospace" }}>{Math.round((a.submitted / a.total) * 100)}%</div>
                <div className="text-xs text-muted">submitted</div>
              </div>
            </div>
            <div className="progress-track" style={{ marginTop: 10 }}>
              <div className="progress-fill" style={{ width: `${(a.submitted / a.total) * 100}%`, background: "#8b5cf6" }} />
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="modal-box modal-purple">
            {!submitted ? (<>
              <h2 className="ems-heading" style={{ fontSize: 16, fontWeight: 700, color: "#a78bfa", marginBottom: 20 }}>New Assignment</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>TITLE *</label><input className="input" placeholder="Assignment title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>SUBJECT</label><select className="select" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}><option value="CS301">CS301 – Data Structures</option><option value="CS306">CS306 – Machine Learning</option></select></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>DUE DATE *</label><input className="input" type="date" value={form.due} onChange={e => setForm({ ...form, due: e.target.value })} /></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>INSTRUCTIONS</label><textarea className="textarea" placeholder="Describe the assignment..." value={form.instructions} onChange={e => setForm({ ...form, instructions: e.target.value })} /></div>
              </div>
              <div className="flex gap-2" style={{ marginTop: 16 }}>
                <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowForm(false)}>Cancel</button>
                <button className="btn btn-purple" style={{ flex: 2, justifyContent: "center" }} onClick={() => setSubmitted(true)}><Send size={13} /> Post Assignment</button>
              </div>
            </>) : (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <CheckCircle size={40} style={{ color: "#a78bfa", margin: "0 auto 12px" }} />
                <h3 style={{ color: "#a78bfa", fontFamily: "'Orbitron',monospace" }}>Assignment Posted!</h3>
                <button className="btn btn-ghost" style={{ marginTop: 14, justifyContent: "center" }} onClick={() => { setShowForm(false); setSubmitted(false); }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const TeacherSchedule = () => {
  const days = ["Monday", "Wednesday", "Friday"];
  const [activeDay, setActiveDay] = useState("Wednesday");
  return (
    <div className="page-in">
      <PageHeader icon={Calendar} title="My Schedule" subtitle="Teaching timetable & class sessions" accentColor="#a78bfa" />
      <div className="flex gap-2 mb-4">
        {days.map(d => <button key={d} onClick={() => setActiveDay(d)} className={`btn ${activeDay === d ? "btn-purple" : "btn-ghost"}`} style={{ fontSize: 12 }}>{d}</button>)}
      </div>
      <div className="glass-card p-5">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {(TEACHER_SCHEDULE[activeDay] || []).map((cls, i) => (
            <div key={i} className={`tt-cell ${cls.type === "Lab" ? "tt-lab" : cls.type === "Theory" ? "tt-theory" : "tt-activity"}`} style={{ minHeight: 70 }}>
              <div className="flex items-center justify-between">
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{cls.subject}</div>
                  <div style={{ fontSize: 12, opacity: 0.75, marginTop: 3 }}>{cls.class} · {cls.room}</div>
                  <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>{cls.code}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>{cls.time}</div>
                  <span className={`badge ${cls.type === "Lab" ? "badge-purple" : cls.type === "Theory" ? "badge-cyan" : "badge-green"}`} style={{ fontSize: 10 }}>{cls.type}</span>
                </div>
              </div>
            </div>
          ))}
          {!(TEACHER_SCHEDULE[activeDay] || []).length && (
            <div className="tt-empty tt-cell" style={{ justifyContent: "center", alignItems: "center", height: 100 }}>No classes scheduled</div>
          )}
        </div>
      </div>
    </div>
  );
};

const TeacherDeptInfo = () => (
  <div className="page-in">
    <PageHeader icon={Building2} title="Department Info" subtitle="Computer Science & Engineering" accentColor="#a78bfa" />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
      <div className="glass-card p-5">
        <h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Department Overview</h3>
        <InfoRow label="Department" value="Computer Science & Engineering" />
        <InfoRow label="HoD" value="Mr. Arun" accent />
        <InfoRow label="Total Students" value="480" />
        <InfoRow label="Total Faculty" value="32" />
        <InfoRow label="Accreditation" value="NBA Accredited" accent />
      </div>
      <div className="glass-card p-5">
        <h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Faculty Colleagues</h3>
        {ADMIN_TEACHERS.slice(0, 4).map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(139,92,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#a78bfa" }}>{t.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
              <div className="text-muted text-xs">{t.designation}</div>
            </div>
            <span className={`badge ${getStatusBadge(t.status)}`} style={{ fontSize: 10 }}>{t.status}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="glass-card p-5">
      <h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Upcoming Department Events</h3>
      {COLLEGE_INFO.events.map((e, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div><div style={{ fontWeight: 600, fontSize: 13 }}>{e.title}</div><div className="text-muted text-xs" style={{ marginTop: 2 }}>{e.date} · {e.venue}</div></div>
          <span className="badge badge-purple" style={{ fontSize: 10 }}>{e.type}</span>
        </div>
      ))}
    </div>
  </div>
);

// ===========================
// ===== ADMIN PAGES =====
// ===========================

const AdminDashboard = () => {
  const totalFees = ADMIN_FEES.reduce((a, f) => a + f.amount, 0);
  const collectedFees = ADMIN_FEES.reduce((a, f) => a + f.paid, 0);
  const pendingFees = totalFees - collectedFees;
  const feeChartData = [
    { name: "Collected", value: collectedFees, fill: "#34d399" },
    { name: "Pending", value: pendingFees, fill: "#f87171" },
  ];
  const deptData = [
    { dept: "CSE", students: 480 }, { dept: "ECE", students: 360 },
    { dept: "MECH", students: 240 }, { dept: "IT", students: 240 }, { dept: "AI/ML", students: 120 }
  ];
  return (
    <div className="page-in">
      <div style={{ marginBottom: 24 }}>
        <h1 className="ems-heading" style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: 0.5 }}>
          Admin <span style={{ color: "#f59e0b" }}>Control Panel</span> 🛡️
        </h1>
        <p className="text-muted text-sm" style={{ marginTop: 4 }}>EASA College of Engineering and Technology – Management Dashboard</p>
      </div>
      <div className="grid-cols-4 mb-4">
        {[
          { label: "Total Students", value: "4,200+", sub: "Across all departments", color: "#f59e0b", icon: GraduationCap },
          { label: "Faculty Members", value: "280+", sub: "Teaching & non-teaching", color: "#00d4ff", icon: Users },
          { label: "Fee Collected", value: fmtCurr(collectedFees), sub: `${fmtCurr(pendingFees)} pending`, color: "#34d399", icon: DollarSign },
          { label: "TC Pending", value: ADMIN_TC_REQUESTS.filter(t => t.status === "pending" || t.status === "processing").length, sub: "Transfer certificates", color: "#f87171", icon: ScrollText },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, borderRadius: "0 14px 0 60px", background: `${s.color}10` }} />
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted text-xs" style={{ textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</span>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}><s.icon size={15} /></div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, fontFamily: "'Orbitron', monospace", letterSpacing: -1 }}>{s.value}</div>
            <div className="text-muted text-xs mt-2">{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>FEE COLLECTION STATUS</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={feeChartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {feeChartData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#0a1628", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 8, color: "#e2e8f0", fontSize: 12 }} formatter={(v) => fmtCurr(v)} />
              <Legend wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>STUDENTS BY DEPARTMENT</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={deptData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="dept" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0a1628", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 8, color: "#e2e8f0", fontSize: 12 }} />
              <Bar dataKey="students" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 14 }}>RECENT FEE DEFAULTS</h3>
          {ADMIN_FEES.filter(f => f.status !== "paid").slice(0, 4).map((f, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div><div style={{ fontSize: 13, fontWeight: 600 }}>{f.student}</div><div className="text-muted text-xs">{f.rollNo} · {f.dept}</div></div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f87171" }}>{fmtCurr(f.pending)}</div>
                <span className={`badge ${getStatusBadge(f.status)}`} style={{ fontSize: 10 }}>{f.status}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 14 }}>PENDING ACTIONS</h3>
          {[
            { action: "TC Requests", count: ADMIN_TC_REQUESTS.filter(t => t.status === "pending").length, color: "#f87171", icon: ScrollText },
            { action: "Scholarship Applications", count: ADMIN_SCHOLARSHIPS.filter(s => s.status === "pending" || s.status === "processing").length, color: "#fbbf24", icon: Award },
            { action: "Fee Defaulters", count: ADMIN_FEES.filter(f => f.status === "pending").length, color: "#f59e0b", icon: AlertCircle },
            { action: "New Registrations", count: 3, color: "#a78bfa", icon: UserPlus },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: item.color }}><item.icon size={14} /></div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500 }}>{item.action}</div></div>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${item.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: item.color }}>{item.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminStudents = () => {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", id: "", dept: "CSE", year: "1st", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const filtered = ADMIN_STUDENTS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search));
  return (
    <div className="page-in">
      <PageHeader icon={GraduationCap} title="Student Management" subtitle={`${ADMIN_STUDENTS.length} students registered`} accentColor="#f59e0b">
        <button className="btn btn-amber" onClick={() => setShowAdd(true)}><UserPlus size={14} /> Add Student</button>
      </PageHeader>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Total Active", value: ADMIN_STUDENTS.filter(s => s.status === "active").length, color: "#34d399" },
          { label: "Fee Paid", value: ADMIN_STUDENTS.filter(s => s.fees === "paid").length, color: "#00d4ff" },
          { label: "Fee Pending", value: ADMIN_STUDENTS.filter(s => s.fees === "pending").length, color: "#f87171" },
          { label: "Scholarship", value: ADMIN_STUDENTS.filter(s => s.scholarship).length, color: "#f59e0b" },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ padding: "14px 16px" }}>
            <div className="text-muted text-xs" style={{ marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color, fontFamily: "'Orbitron',monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase" }}>Student Registry</h3>
          <div style={{ position: "relative", width: 240 }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
            <input className="input" style={{ paddingLeft: 32 }} placeholder="Search name or roll no..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="table-wrap">
          <table><thead><tr><th>Name</th><th>Roll No</th><th>Dept</th><th>Year</th><th>Fee Status</th><th>Scholarship</th><th>Status</th><th></th></tr></thead>
            <tbody>{filtered.map((s, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{s.name}</td>
                <td className="text-muted text-xs">{s.id}</td>
                <td><span className="badge badge-amber" style={{ fontSize: 10 }}>{s.dept}</span></td>
                <td className="text-muted">{s.year}</td>
                <td><span className={`badge ${s.fees === "paid" ? "badge-green" : s.fees === "partial" ? "badge-yellow" : "badge-red"}`} style={{ fontSize: 10 }}>{s.fees}</span></td>
                <td>{s.scholarship ? <span className="badge badge-cyan" style={{ fontSize: 10 }}>Yes</span> : <span className="text-muted text-xs">—</span>}</td>
                <td><span className={`badge ${s.status === "active" ? "badge-green" : "badge-gray"}`} style={{ fontSize: 10 }}>{s.status}</span></td>
                <td>
                  <div className="flex gap-1">
                    <button className="btn btn-ghost btn-sm">Edit</button>
                    <button className="btn btn-danger btn-sm">Remove</button>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      {showAdd && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowAdd(false); }}>
          <div className="modal-box modal-box-lg modal-amber">
            {!submitted ? (<>
              <h2 className="ems-heading" style={{ fontSize: 16, fontWeight: 700, color: "#f59e0b", marginBottom: 20 }}>Add New Student</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>FULL NAME *</label><input className="input" placeholder="Student's full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>ROLL NUMBER *</label><input className="input" placeholder="e.g. E720524CS001" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} /></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>DEPARTMENT</label><select className="select" value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })}><option>CSE</option><option>ECE</option><option>MECH</option><option>IT</option><option>AI/ML</option><option>EEE</option></select></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>YEAR</label><select className="select" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}><option>1st</option><option>2nd</option><option>3rd</option><option>4th</option></select></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>EMAIL</label><input className="input" placeholder="student@easatech.com" type="email" /></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>PHONE</label><input className="input" placeholder="+91 XXXXXXXXXX" /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>DATE OF BIRTH</label><input className="input" type="date" /></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>CATEGORY</label><select className="select"><option>General</option><option>OBC</option><option>SC</option><option>ST</option></select></div>
              </div>
              <div className="flex gap-2" style={{ marginTop: 16 }}>
                <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn btn-amber" style={{ flex: 2, justifyContent: "center" }} onClick={() => setSubmitted(true)}><UserPlus size={13} /> Add Student</button>
              </div>
            </>) : (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <CheckCircle size={40} style={{ color: "#f59e0b", margin: "0 auto 12px" }} />
                <h3 style={{ color: "#f59e0b", fontFamily: "'Orbitron',monospace" }}>Student Added!</h3>
                <button className="btn btn-ghost" style={{ marginTop: 14, justifyContent: "center" }} onClick={() => { setShowAdd(false); setSubmitted(false); }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AdminTeachers = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="page-in">
      <PageHeader icon={Users} title="Faculty Management" subtitle={`${ADMIN_TEACHERS.length} faculty members`} accentColor="#f59e0b">
        <button className="btn btn-amber" onClick={() => setShowAdd(true)}><UserPlus size={14} /> Add Faculty</button>
      </PageHeader>
      <div className="glass-card p-5">
        <div className="table-wrap">
          <table><thead><tr><th>Name</th><th>Faculty ID</th><th>Department</th><th>Designation</th><th>Subjects</th><th>Joined</th><th>Status</th><th></th></tr></thead>
            <tbody>{ADMIN_TEACHERS.map((t, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{t.name}</td>
                <td className="text-muted text-xs">{t.id}</td>
                <td><span className="badge badge-amber" style={{ fontSize: 10 }}>{t.dept}</span></td>
                <td style={{ fontSize: 12 }}>{t.designation}</td>
                <td><span style={{ color: "#00d4ff", fontWeight: 700 }}>{t.subjects}</span></td>
                <td className="text-muted text-xs">{t.joined}</td>
                <td><span className={`badge ${getStatusBadge(t.status)}`} style={{ fontSize: 10 }}>{t.status}</span></td>
                <td><div className="flex gap-1"><button className="btn btn-ghost btn-sm">Edit</button><button className="btn btn-danger btn-sm">Remove</button></div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      {showAdd && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowAdd(false); }}>
          <div className="modal-box modal-box-lg modal-amber">
            {!submitted ? (<>
              <h2 className="ems-heading" style={{ fontSize: 16, fontWeight: 700, color: "#f59e0b", marginBottom: 20 }}>Add New Faculty</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>FULL NAME *</label><input className="input" placeholder="Faculty name" /></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>FACULTY ID *</label><input className="input" placeholder="e.g. FAC2024007" /></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>DEPARTMENT</label><select className="select"><option>CSE</option><option>ECE</option><option>MECH</option><option>IT</option><option>AI/ML</option></select></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>DESIGNATION</label><select className="select"><option>Assistant Professor</option><option>Associate Professor</option><option>Professor</option></select></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>EMAIL</label><input className="input" placeholder="faculty@easatech.com" /></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>QUALIFICATION</label><input className="input" placeholder="e.g. Ph.D Computer Science" /></div>
              </div>
              <div className="flex gap-2" style={{ marginTop: 16 }}>
                <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn btn-amber" style={{ flex: 2, justifyContent: "center" }} onClick={() => setSubmitted(true)}><UserPlus size={13} /> Add Faculty</button>
              </div>
            </>) : (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <CheckCircle size={40} style={{ color: "#f59e0b", margin: "0 auto 12px" }} />
                <h3 style={{ color: "#f59e0b", fontFamily: "'Orbitron',monospace" }}>Faculty Added!</h3>
                <button className="btn btn-ghost" style={{ marginTop: 14, justifyContent: "center" }} onClick={() => { setShowAdd(false); setSubmitted(false); }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AdminFees = () => {
  const [tab, setTab] = useState("overview");
  const [showModal, setShowModal] = useState(null);
  const total = ADMIN_FEES.reduce((a, f) => a + f.amount, 0);
  const collected = ADMIN_FEES.reduce((a, f) => a + f.paid, 0);
  return (
    <div className="page-in">
      <PageHeader icon={DollarSign} title="Fee Management" subtitle="Manage & track student fee collections" accentColor="#f59e0b" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Total Expected", value: fmtCurr(total), color: "#e2e8f0" },
          { label: "Collected", value: fmtCurr(collected), color: "#34d399" },
          { label: "Pending", value: fmtCurr(total - collected), color: "#f87171" },
          { label: "Collection %", value: `${Math.round((collected / total) * 100)}%`, color: "#f59e0b" },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ padding: "14px 16px" }}>
            <div className="text-muted text-xs" style={{ marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "'Orbitron',monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="tab-bar">
        {["overview", "defaulters", "waiver"].map(t => <button key={t} onClick={() => setTab(t)} className={`btn ${tab === t ? "btn-amber" : "btn-ghost"}`} style={{ fontSize: 12, textTransform: "capitalize" }}>{t}</button>)}
      </div>
      {tab === "overview" && <div className="glass-card p-5">
        <div className="table-wrap">
          <table><thead><tr><th>Student</th><th>Roll No</th><th>Dept</th><th>Total</th><th>Paid</th><th>Pending</th><th>Due Date</th><th>Status</th><th></th></tr></thead>
            <tbody>{ADMIN_FEES.map((f, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{f.student}</td>
                <td className="text-muted text-xs">{f.rollNo}</td>
                <td><span className="badge badge-amber" style={{ fontSize: 10 }}>{f.dept}</span></td>
                <td style={{ fontWeight: 600 }}>{fmtCurr(f.amount)}</td>
                <td style={{ color: "#34d399", fontWeight: 600 }}>{fmtCurr(f.paid)}</td>
                <td style={{ color: f.pending > 0 ? "#f87171" : "#34d399", fontWeight: 600 }}>{fmtCurr(f.pending)}</td>
                <td className="text-muted text-xs">{f.due}</td>
                <td><span className={`badge ${getStatusBadge(f.status)}`} style={{ fontSize: 10 }}>{f.status}</span></td>
                <td><button className="btn btn-ghost btn-sm" onClick={() => setShowModal(f)}>Details</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>}
      {tab === "defaulters" && <div className="glass-card p-5">
        <div style={{ padding: "12px", borderRadius: 10, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", marginBottom: 14, fontSize: 13, color: "#f87171" }}>
          ⚠️ {ADMIN_FEES.filter(f => f.status === "pending").length} students have not paid any fees. Action required before exam form submission.
        </div>
        <div className="table-wrap">
          <table><thead><tr><th>Student</th><th>Roll No</th><th>Amount Due</th><th>Status</th><th></th></tr></thead>
            <tbody>{ADMIN_FEES.filter(f => f.status !== "paid").map((f, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{f.student}</td>
                <td className="text-muted text-xs">{f.rollNo}</td>
                <td style={{ fontWeight: 700, color: "#f87171" }}>{fmtCurr(f.pending)}</td>
                <td><span className={`badge ${getStatusBadge(f.status)}`} style={{ fontSize: 10 }}>{f.status}</span></td>
                <td><button className="btn btn-danger btn-sm">Send Reminder</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>}
      {tab === "waiver" && <div className="glass-card p-5">
        <h3 className="text-sm text-muted" style={{ marginBottom: 14 }}>Fee Waiver / Concession Requests</h3>
        <div style={{ padding: "30px", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
          No pending waiver requests at this time.
        </div>
        <button className="btn btn-amber" style={{ justifyContent: "center", width: "100%" }}><Plus size={13} /> Grant New Waiver</button>
      </div>}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className="modal-box modal-amber" onClick={e => e.stopPropagation()}>
            <h2 className="ems-heading" style={{ fontSize: 15, color: "#f59e0b", marginBottom: 20 }}>Fee Details – {showModal.student}</h2>
            <InfoRow label="Roll No" value={showModal.rollNo} />
            <InfoRow label="Department" value={showModal.dept} />
            <InfoRow label="Total Fee" value={fmtCurr(showModal.amount)} />
            <InfoRow label="Amount Paid" value={fmtCurr(showModal.paid)} accent />
            <InfoRow label="Amount Pending" value={fmtCurr(showModal.pending)} />
            <InfoRow label="Due Date" value={showModal.due} />
            <div className="flex gap-2" style={{ marginTop: 16 }}>
              <button className="btn btn-danger" style={{ flex: 1, justifyContent: "center" }}>Send Notice</button>
              <button className="btn btn-amber" style={{ flex: 1, justifyContent: "center" }}>Mark Paid</button>
              <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminScholarships = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="page-in">
      <PageHeader icon={Award} title="Scholarship Management" subtitle="Track & approve scholarship applications" accentColor="#f59e0b">
        <button className="btn btn-amber" onClick={() => setShowAdd(true)}><Plus size={14} /> New Scholarship</button>
      </PageHeader>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Total Awarded", value: fmtCurr(ADMIN_SCHOLARSHIPS.filter(s => s.status === "approved").reduce((a, s) => a + s.amount, 0)), color: "#34d399" },
          { label: "Pending Review", value: ADMIN_SCHOLARSHIPS.filter(s => s.status === "pending" || s.status === "processing").length, color: "#fbbf24" },
          { label: "Beneficiaries", value: ADMIN_SCHOLARSHIPS.filter(s => s.status === "approved").length, color: "#f59e0b" },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ padding: "14px 16px" }}>
            <div className="text-muted text-xs" style={{ marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "'Orbitron',monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="glass-card p-5">
        <div className="table-wrap">
          <table><thead><tr><th>Student</th><th>Roll No</th><th>Scholarship Type</th><th>Amount</th><th>Year</th><th>Status</th><th></th></tr></thead>
            <tbody>{ADMIN_SCHOLARSHIPS.map((s, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{s.student}</td>
                <td className="text-muted text-xs">{s.rollNo}</td>
                <td style={{ fontSize: 12 }}>{s.type}</td>
                <td style={{ fontWeight: 700, color: "#f59e0b" }}>{fmtCurr(s.amount)}</td>
                <td className="text-muted">{s.year}</td>
                <td><span className={`badge ${getStatusBadge(s.status)}`} style={{ fontSize: 10 }}>{s.status}</span></td>
                <td>
                  <div className="flex gap-1">
                    {(s.status === "pending" || s.status === "processing") && <><button className="btn btn-success btn-sm">Approve</button><button className="btn btn-danger btn-sm">Reject</button></>}
                    {s.status === "approved" && <button className="btn btn-ghost btn-sm">View</button>}
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      {showAdd && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowAdd(false); }}>
          <div className="modal-box modal-amber">
            {!submitted ? (<>
              <h2 className="ems-heading" style={{ fontSize: 16, fontWeight: 700, color: "#f59e0b", marginBottom: 20 }}>Grant Scholarship</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>STUDENT ROLL NO *</label><input className="input" placeholder="e.g. E720524CS001" /></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>SCHOLARSHIP TYPE *</label><select className="select"><option>Merit Scholarship</option><option>Government SC/ST</option><option>Need-Based Aid</option><option>Sports Excellence</option><option>Alumni Sponsored</option></select></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>AMOUNT (₹) *</label><input className="input" type="number" placeholder="e.g. 25000" /></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>ACADEMIC YEAR</label><select className="select"><option>2024-25</option><option>2025-26</option></select></div>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>REMARKS</label><textarea className="textarea" placeholder="Reason / remarks for scholarship" style={{ minHeight: 70 }} /></div>
              </div>
              <div className="flex gap-2" style={{ marginTop: 16 }}>
                <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn btn-amber" style={{ flex: 2, justifyContent: "center" }} onClick={() => setSubmitted(true)}><Award size={13} /> Grant Scholarship</button>
              </div>
            </>) : (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <CheckCircle size={40} style={{ color: "#f59e0b", margin: "0 auto 12px" }} />
                <h3 style={{ color: "#f59e0b", fontFamily: "'Orbitron',monospace" }}>Scholarship Granted!</h3>
                <button className="btn btn-ghost" style={{ marginTop: 14, justifyContent: "center" }} onClick={() => { setShowAdd(false); setSubmitted(false); }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AdminTC = () => {
  const [showModal, setShowModal] = useState(null);
  return (
    <div className="page-in">
      <PageHeader icon={ScrollText} title="Transfer Certificates" subtitle="TC requests & document management" accentColor="#f59e0b" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Total Requests", value: ADMIN_TC_REQUESTS.length, color: "#e2e8f0" },
          { label: "Pending", value: ADMIN_TC_REQUESTS.filter(t => t.status === "pending" || t.status === "processing").length, color: "#fbbf24" },
          { label: "Approved", value: ADMIN_TC_REQUESTS.filter(t => t.status === "approved").length, color: "#34d399" },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ padding: "14px 16px" }}>
            <div className="text-muted text-xs" style={{ marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color, fontFamily: "'Orbitron',monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="glass-card p-5">
        <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", fontSize: 12, color: "#fbbf24", marginBottom: 14 }}>
          ℹ️ TC can only be issued after all dues are cleared. Verify fee status before approving.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ADMIN_TC_REQUESTS.map((tc, i) => (
            <div key={i} className="glass-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{tc.student}</span>
                    <span className="badge badge-gray" style={{ fontSize: 10 }}>{tc.rollNo}</span>
                  </div>
                  <div className="text-muted text-xs">Reason: {tc.reason} · Applied: {tc.applied}</div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>Dues: <span style={{ color: tc.dues === "₹0" ? "#34d399" : "#f87171", fontWeight: 700 }}>{tc.dues}</span></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${getStatusBadge(tc.status)}`}>{tc.status.toUpperCase()}</span>
                  <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(tc)}>Manage</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className="modal-box modal-amber" onClick={e => e.stopPropagation()}>
            <h2 className="ems-heading" style={{ fontSize: 15, color: "#f59e0b", marginBottom: 20 }}>TC Request – {showModal.student}</h2>
            <InfoRow label="Roll No" value={showModal.rollNo} />
            <InfoRow label="Reason" value={showModal.reason} />
            <InfoRow label="Applied On" value={showModal.applied} />
            <InfoRow label="Current Status" value={showModal.status} accent />
            <InfoRow label="Outstanding Dues" value={showModal.dues} />
            <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>REMARKS</label>
              <textarea className="textarea" placeholder="Add remarks..." style={{ minHeight: 60 }} />
            </div>
            <div className="flex gap-2" style={{ marginTop: 16 }}>
              <button className="btn btn-success" style={{ flex: 1, justifyContent: "center" }}>Approve TC</button>
              <button className="btn btn-danger" style={{ flex: 1, justifyContent: "center" }}>Reject</button>
              <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminSettings = () => (
  <div className="page-in">
    <PageHeader icon={Settings} title="System Settings" subtitle="Configure college & portal settings" accentColor="#f59e0b" />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {[
        { title: "Academic Year", fields: [["Current Academic Year", "2025-26"], ["Current Semester", "Even"], ["Exam Month", "April 2024"]] },
        { title: "Fee Configuration", fields: [["Tuition Fee (UG)", "₹60,000"], ["Hostel Fee", "₹20,000"], ["Exam Fee", "₹5,000"]] },
        { title: "Attendance Policy", fields: [["Minimum Attendance %", "75%"], ["OD Eligibility %", "60%"], ["Detention Threshold", "65%"]] },
        { title: "Portal Settings", fields: [["Student Portal", "Active"], ["Faculty Portal", "Active"], ["Notifications", "Enabled"]] },
      ].map((section, i) => (
        <div key={i} className="glass-card p-5">
          <h3 className="text-xs font-semibold text-muted" style={{ letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>{section.title}</h3>
          {section.fields.map(([label, value], j) => <InfoRow key={j} label={label} value={value} accent={j === 0} />)}
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}><Edit3 size={12} /> Edit</button>
        </div>
      ))}
    </div>
  </div>
);

// ===========================
// ===== SIDEBARS =====
// ===========================

const STUDENT_NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "MAIN" },
  { id: "profile", label: "My Profile", icon: User },
  { id: "courses", label: "Courses", icon: BookOpen, section: "ACADEMICS" },
  { id: "attendance", label: "Attendance", icon: BarChart2 },
  { id: "timetable", label: "Timetable", icon: Calendar },
  { id: "results", label: "Exam Results", icon: Award },
  { id: "fees", label: "Fee Payment", icon: CreditCard, section: "SERVICES" },
  { id: "od", label: "OD Request", icon: FileText },
  { id: "outpass", label: "Outpass", icon: DoorOpen },
  { id: "hostel", label: "Hostel", icon: Home, section: "CAMPUS" },
  { id: "library", label: "Library", icon: Book },
  { id: "transport", label: "Transport", icon: Bus },
  { id: "college", label: "College Info", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const TEACHER_NAV = [
  { id: "t-dashboard", label: "Dashboard", icon: LayoutDashboard, section: "MAIN" },
  { id: "t-profile", label: "My Profile", icon: User },
  { id: "t-schedule", label: "My Schedule", icon: Calendar, section: "TEACHING" },
  { id: "t-attendance", label: "Attendance Mgmt", icon: BarChart2 },
  { id: "t-students", label: "Student Details", icon: Users },
  { id: "t-marking", label: "Marks Entry", icon: Edit3 },
  { id: "t-assignments", label: "Assignments", icon: ClipboardList },
  { id: "t-dept", label: "Department Info", icon: Building2, section: "COLLEGE" },
];

const ADMIN_NAV = [
  { id: "a-dashboard", label: "Dashboard", icon: LayoutDashboard, section: "OVERVIEW" },
  { id: "a-students", label: "Students", icon: GraduationCap, section: "MANAGEMENT" },
  { id: "a-teachers", label: "Faculty", icon: Users },
  { id: "a-fees", label: "Fee Management", icon: DollarSign },
  { id: "a-scholarships", label: "Scholarships", icon: Award },
  { id: "a-tc", label: "Transfer Certs", icon: ScrollText },
  { id: "a-settings", label: "Settings", icon: Settings, section: "SYSTEM" },
];

const Sidebar = ({ active, setActive, onLogout, role, unread }) => {
  const nav = role === "teacher" ? TEACHER_NAV : role === "admin" ? ADMIN_NAV : STUDENT_NAV;
  const accentColor = role === "admin" ? "#f59e0b" : role === "teacher" ? "#a78bfa" : "#00d4ff";
  const activeClass = role === "admin" ? "admin-active" : role === "teacher" ? "teacher-active" : "active";
  const gradColors = role === "admin" ? "#f59e0b,#d97706" : role === "teacher" ? "#a78bfa,#7c3aed" : "#00d4ff,#0044ff";
  const name = role === "teacher" ? TEACHER.name : role === "admin" ? "Admin User" : STUDENT.name;
  const id = role === "teacher" ? TEACHER.id : role === "admin" ? "ADMIN001" : STUDENT.id;
  return (
    <div className="sidebar" style={{ borderRightColor: `${accentColor}18` }}>
      <div style={{ padding: "6px 8px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 8 }}>
        <div className="flex items-center gap-3">
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${gradColors})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 16px ${accentColor}35`, flexShrink: 0 }}>
            <GraduationCap size={18} style={{ color: "#fff" }} />
          </div>
          <div>
            <div className="ems-heading" style={{ fontSize: 12, fontWeight: 700, color: accentColor, letterSpacing: 1 }}>SARVAM EMS</div>
            <div className="text-xs text-muted">{role === "admin" ? "Admin Panel" : role === "teacher" ? "Faculty Portal" : "Student Portal"}</div>
          </div>
        </div>
      </div>
      {nav.map(item => (
        <div key={item.id}>
          {item.section && <div className="nav-section">{item.section}</div>}
          <div className={`nav-item ${active === item.id ? activeClass : ""}`} onClick={() => setActive(item.id)}>
            <item.icon size={15} />
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.id === "notifications" && unread > 0 && (
              <div style={{ background: accentColor, color: "#04091a", borderRadius: "50%", width: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>{unread}</div>
            )}
          </div>
        </div>
      ))}
      <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12 }}>
        <div style={{ padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,0.02)", marginBottom: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{name}</div>
          <div className="text-muted text-xs">{id}</div>
        </div>
        <div className="nav-item" onClick={onLogout} style={{ color: "#f87171" }}>
          <LogOut size={14} /> Logout
        </div>
      </div>
    </div>
  );
};

// ===========================
// ===== LOGIN PAGE =====
// ===========================
const LoginPage = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState("login"); // login | register
  const [role, setRole] = useState("student");
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  // Register form state
  const [regForm, setRegForm] = useState({ name: "", email: "", phone: "", dept: "CSE", year: "1st", designation: "Assistant Professor", id: "" });

  const roles = [
    { id: "student", label: "Student", icon: "🎓", color: "#00d4ff" },
    { id: "teacher", label: "Faculty", icon: "👨‍🏫", color: "#a78bfa" },
    { id: "admin", label: "Admin", icon: "🛡️", color: "#f59e0b" },
    { id: "parent", label: "Parent", icon: "👪", color: "#34d399" },
  ];

  const registerRoles = roles.filter(r => r.id !== "admin"); // admin can't register

  const activeColor = roles.find(r => r.id === role)?.color || "#00d4ff";

  const handleLogin = () => {
    if (!id || !pass) { setError("Please enter your credentials."); return; }
    setLoading(true); setError("");
    setTimeout(() => { setLoading(false); onLogin(role); }, 1800);
  };

  const handleRegister = () => {
    if (!regForm.name || !regForm.email || !id || !pass) { setError("Please fill all required fields."); return; }
    if (pass !== confirmPass) { setError("Passwords do not match."); return; }
    setLoading(true); setError("");
    setTimeout(() => { setLoading(false); setRegSuccess(true); }, 1800);
  };

  const demoFill = () => {
    if (role === "student") { setId("E720524AM006"); setPass("password123"); }
    else if (role === "teacher") { setId("FAC2024001"); setPass("faculty123"); }
    else if (role === "admin") { setId("ADMIN001"); setPass("admin@123"); }
  };

  return (
    <div className="login-bg">
      <style>{CSS}</style>
      <div className="login-grid" />
      <div className="login-glow" style={{ background: `radial-gradient(circle, ${activeColor}08 0%, transparent 70%)` }} />
      <div className="login-glow2" />
      <div style={{ margin: "auto", width: "100%", maxWidth: authMode === "register" ? 520 : 440, padding: 24, position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: `linear-gradient(135deg,${activeColor},${activeColor}88)`, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 40px ${activeColor}40`, transition: "all 0.3s" }}>
            <GraduationCap size={30} style={{ color: "#fff" }} />
          </div>
          <h1 className="ems-heading" style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: 2 }}>SARVAM EMS</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 6, letterSpacing: 1 }}>EDUCATIONAL MANAGEMENT SYSTEM</p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 28, backdropFilter: "blur(12px)" }}>
          {/* Auth mode tabs */}
          <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 4, marginBottom: 20 }}>
            <button onClick={() => { setAuthMode("login"); setError(""); setRegSuccess(false); }} className="auth-tab" style={{ flex: 1, borderRadius: 8, ...(authMode === "login" ? { background: `${activeColor}15`, color: activeColor, border: `1px solid ${activeColor}30` } : {}) }}>Sign In</button>
            <button onClick={() => { setAuthMode("register"); setError(""); }} className="auth-tab" style={{ flex: 1, borderRadius: 8, ...(authMode === "register" ? { background: `${activeColor}15`, color: activeColor, border: `1px solid ${activeColor}30` } : {}) }}>Register</button>
          </div>

          {/* Role selector */}
          <div style={{ marginBottom: 18 }}>
            <div className="text-xs text-muted" style={{ marginBottom: 8, letterSpacing: 1 }}>
              {authMode === "register" ? "REGISTER AS (Admin registration not available)" : "SELECT ROLE"}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: authMode === "register" ? "1fr 1fr 1fr" : "1fr 1fr 1fr 1fr", gap: 8 }}>
              {(authMode === "register" ? registerRoles : roles).map(r => (
                <button key={r.id} onClick={() => setRole(r.id)} className="role-card" style={{ borderColor: role === r.id ? `${r.color}50` : "rgba(255,255,255,0.07)", background: role === r.id ? `${r.color}10` : "rgba(255,255,255,0.03)", color: role === r.id ? r.color : "rgba(255,255,255,0.4)" }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{r.icon}</div>
                  <div style={{ fontSize: 10, fontWeight: 600 }}>{r.label}</div>
                </button>
              ))}
            </div>
          </div>

          {authMode === "login" ? (<>
            <div style={{ marginBottom: 12 }}>
              <label className="text-xs text-muted" style={{ display: "block", marginBottom: 5, letterSpacing: 1 }}>
                {role === "student" ? "STUDENT ID / ROLL NUMBER" : role === "teacher" ? "FACULTY ID" : "ADMIN ID"}
              </label>
              <input className="input" placeholder={role === "student" ? "e.g. E720524AM006" : role === "teacher" ? "e.g. FAC2024001" : "ADMIN001"} value={id} onChange={e => setId(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} />
            </div>
            <div style={{ marginBottom: 6 }}>
              <label className="text-xs text-muted" style={{ display: "block", marginBottom: 5, letterSpacing: 1 }}>PASSWORD</label>
              <div style={{ position: "relative" }}>
                <input className="input" type={showPass ? "text" : "password"} placeholder="Enter password" value={pass} onChange={e => setPass(e.target.value)} style={{ paddingRight: 40 }} onKeyDown={e => e.key === "Enter" && handleLogin()} />
                <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)" }}>{showPass ? <EyeOff size={15} /> : <Eye size={15} />}</button>
              </div>
            </div>
            <div style={{ textAlign: "right", marginBottom: 14 }}><button style={{ background: "none", border: "none", color: activeColor, fontSize: 12, cursor: "pointer" }}>Forgot Password?</button></div>
            {error && <div style={{ color: "#f87171", fontSize: 12, marginBottom: 12, textAlign: "center", padding: "8px", borderRadius: 8, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>{error}</div>}
            <button className="btn w-full" style={{ justifyContent: "center", padding: "12px", fontSize: 14, background: `linear-gradient(135deg,${activeColor},${activeColor}99)`, color: "#fff", boxShadow: `0 4px 14px ${activeColor}25` }} onClick={handleLogin} disabled={loading}>
              {loading ? <><RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> Authenticating...</> : "Sign In →"}
            </button>
            <button onClick={demoFill} style={{ width: "100%", marginTop: 10, padding: "8px", background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 8, color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 11 }}>
              Use Demo Credentials
            </button>
          </>) : (<>
            {regSuccess ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <CheckCircle size={48} style={{ color: activeColor, margin: "0 auto 12px", display: "block" }} />
                <h3 className="ems-heading" style={{ color: activeColor, fontSize: 16, marginBottom: 8 }}>Registration Successful!</h3>
                <p className="text-muted text-sm" style={{ marginBottom: 16 }}>Your account request has been submitted. An admin will verify and activate your account within 24 hours.</p>
                <button className="btn btn-ghost" style={{ justifyContent: "center" }} onClick={() => { setAuthMode("login"); setRegSuccess(false); }}>Back to Login</button>
              </div>
            ) : (<>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>FULL NAME *</label><input className="input" placeholder="Your full name" value={regForm.name} onChange={e => setRegForm({ ...regForm, name: e.target.value })} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>{role === "student" ? "ROLL NUMBER *" : "FACULTY ID *"}</label><input className="input" placeholder={role === "student" ? "e.g. E720524CS001" : "e.g. FAC2024007"} value={id} onChange={e => setId(e.target.value)} /></div>
                  <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>EMAIL *</label><input className="input" placeholder="you@easatech.com" type="email" value={regForm.email} onChange={e => setRegForm({ ...regForm, email: e.target.value })} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>PHONE</label><input className="input" placeholder="+91 XXXXXXXXXX" /></div>
                  {role === "student"
                    ? <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>DEPARTMENT</label><select className="select"><option>CSE</option><option>ECE</option><option>MECH</option><option>IT</option><option>AI/ML</option></select></div>
                    : <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>DESIGNATION</label><select className="select"><option>Assistant Professor</option><option>Associate Professor</option><option>Professor</option></select></div>
                  }
                </div>
                {role === "student" && <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>YEAR OF ADMISSION</label><select className="select"><option>2024</option><option>2023</option><option>2022</option><option>2021</option></select></div>}
                <div className="divider" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>PASSWORD *</label><div style={{ position: "relative" }}><input className="input" type={showPass ? "text" : "password"} placeholder="Create password" value={pass} onChange={e => setPass(e.target.value)} style={{ paddingRight: 36 }} /><button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)" }}>{showPass ? <EyeOff size={13} /> : <Eye size={13} />}</button></div></div>
                  <div><label className="text-xs text-muted" style={{ display: "block", marginBottom: 5 }}>CONFIRM PASSWORD *</label><input className="input" type="password" placeholder="Confirm password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} /></div>
                </div>
              </div>
              <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", fontSize: 11, color: "#fbbf24", margin: "12px 0" }}>
                ℹ️ Registration requires admin verification. You'll receive an email once activated.
              </div>
              {error && <div style={{ color: "#f87171", fontSize: 12, marginBottom: 12, textAlign: "center", padding: "8px", borderRadius: 8, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>{error}</div>}
              <button className="btn w-full" style={{ justifyContent: "center", padding: "12px", fontSize: 14, background: `linear-gradient(135deg,${activeColor},${activeColor}99)`, color: "#fff", boxShadow: `0 4px 14px ${activeColor}25` }} onClick={handleRegister} disabled={loading}>
                {loading ? <><RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> Registering...</> : <><UserPlus size={14} /> Create Account</>}
              </button>
            </>)}
          </>)}
        </div>
        <p className="text-xs text-muted" style={{ textAlign: "center", marginTop: 20 }}>
          © EASA College of Engineering and Technology · All rights reserved.<br />Designed by Team Proton
        </p>
      </div>
    </div>
  );
};

// ===========================
// ===== MAIN APP =====
// ===========================
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("student");
  const [page, setPage] = useState("dashboard");
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const unread = notifs.filter(n => !n.read).length;

  const getDefaultPage = (r) => r === "teacher" ? "t-dashboard" : r === "admin" ? "a-dashboard" : "dashboard";

  const STUDENT_PAGES = {
    dashboard: <Dashboard />,
    profile: <Profile />,
    courses: <Courses />,
    attendance: <Attendance />,
    timetable: <Timetable />,
    results: <Results />,
    fees: <FeePayment />,
    od: <ODRequest />,
    outpass: <Outpass />,
    hostel: <HostelPage />,
    library: <Library />,
    transport: <Transport />,
    college: <CollegeInfo />,
    notifications: <StudentNotifications notifs={notifs} setNotifs={setNotifs} />,
  };

  const TEACHER_PAGES = {
    "t-dashboard": <TeacherDashboard />,
    "t-profile": <TeacherProfile />,
    "t-schedule": <TeacherSchedule />,
    "t-attendance": <TeacherAttendance />,
    "t-students": <TeacherStudents />,
    "t-marking": <TeacherMarking />,
    "t-assignments": <TeacherAssignments />,
    "t-dept": <TeacherDeptInfo />,
  };

  const ADMIN_PAGES = {
    "a-dashboard": <AdminDashboard />,
    "a-students": <AdminStudents />,
    "a-teachers": <AdminTeachers />,
    "a-fees": <AdminFees />,
    "a-scholarships": <AdminScholarships />,
    "a-tc": <AdminTC />,
    "a-settings": <AdminSettings />,
  };

  const allPages = { ...STUDENT_PAGES, ...TEACHER_PAGES, ...ADMIN_PAGES };
  const allNav = [...STUDENT_NAV, ...TEACHER_NAV, ...ADMIN_NAV];
  const activeLabel = allNav.find(n => n.id === page)?.label || "";
  const accentColor = role === "admin" ? "#f59e0b" : role === "teacher" ? "#a78bfa" : "#00d4ff";

  if (!loggedIn) return <LoginPage onLogin={(r) => { setRole(r); setLoggedIn(true); setPage(getDefaultPage(r)); }} />;

  return (
    <>
      <style>{CSS}</style>
      <div className="ems">
        <Sidebar active={page} setActive={setPage} onLogout={() => setLoggedIn(false)} role={role} unread={unread} />
        <div className="main">
          <div className="topbar">
            <div style={{ flex: 1 }}>
              <div className="flex items-center gap-2">
                <span className="text-muted text-xs">SARVAM EMS</span>
                <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.2)" }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: accentColor }}>{activeLabel}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </div>
              {role === "student" && <button onClick={() => setPage("notifications")} style={{ position: "relative", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px", cursor: "pointer", color: "rgba(255,255,255,0.6)", display: "flex" }}>
                <Bell size={15} />
                {unread > 0 && <div style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, borderRadius: "50%", background: "#00d4ff", fontSize: 8, fontWeight: 800, color: "#04091a", display: "flex", alignItems: "center", justifyContent: "center" }}>{unread}</div>}
              </button>}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: `linear-gradient(135deg,${accentColor},${accentColor}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>
                  {role === "teacher" ? TEACHER.name[0] : role === "admin" ? "A" : STUDENT.name[0]}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
                  {role === "teacher" ? TEACHER.name.split(" ")[0] : role === "admin" ? "Admin" : STUDENT.name.split(" ")[0]}
                </span>
                <span className={`badge ${role === "admin" ? "badge-amber" : role === "teacher" ? "badge-purple" : "badge-cyan"}`} style={{ fontSize: 9 }}>{role.toUpperCase()}</span>
              </div>
            </div>
          </div>
          <div className="content" key={page}>
            {allPages[page] || <div className="page-in" style={{ textAlign: "center", padding: 60, color: "rgba(255,255,255,0.3)" }}>Page coming soon</div>}
          </div>
        </div>
      </div>
    </>
  );
}