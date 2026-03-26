# 🎓 SARVAM EMS — Educational Management System

A full-stack, role-based University & College Management System built with **React + JavaScript**. Designed for EASA College of Engineering and Technology, SARVAM EMS provides dedicated portals for Students, Faculty, and Admins — all within a sleek dark-themed, futuristic UI.

---

## ✨ Features

### 🧑‍🎓 Student Portal
- **Dashboard** — Attendance overview, CGPA progression chart, notifications feed, today's schedule
- **Profile** — Personal, academic, and contact information
- **Courses & Syllabus** — Expandable subject cards with unit-wise syllabus
- **Attendance Tracker** — Subject-wise attendance with shortage/safe-to-miss calculations
- **Timetable** — Day-wise schedule with Theory, Lab, and Activity slots
- **Exam Results** — Semester-wise results with grades, internal/external marks, CGPA
- **Fee Payment** — Fee breakdown, payment history, multi-step payment gateway (UPI/Card/Net Banking)
- **OD Request** — Submit and track On-Duty leave requests
- **Outpass** — Gate pass requests with QR code generation for approved passes
- **Hostel** — Room details, mess menu, amenities, warden contact
- **Library** — View borrowed books, overdue fines, catalog search & reservation
- **Transportation** — Bus routes, stops, and timings
- **College Info** — Institute overview, departments, faculty count, upcoming events
- **Notifications** — Read/unread management with categorized alerts

### 👨‍🏫 Faculty Portal
- **Dashboard** — Student count, active assignments, low-attendance alerts, IA score trends
- **Profile** — Professional info, subjects assigned, classes handled
- **Attendance Management** — Mark daily attendance with section/subject/date filters, attendance overview tracker
- **Student Details** — View all students' CGPA, attendance, and IA scores; detailed modal per student
- **Marks Entry** — Enter IA-1, IA-2, IA-3 scores per student with live grade computation
- **Assignments** — Create and manage assignments with submission tracking
- **Schedule** — Day-wise teaching timetable
- **Department Info** — Colleagues list, department stats, upcoming events

### 🛡️ Admin Panel
- **Dashboard** — Institution-wide stats, fee collection pie chart, department-wise student bar chart, pending actions
- **Student Management** — Full student registry with add/edit/remove, fee status, scholarship flags
- **Faculty Management** — Faculty registry with add/edit/remove and designation/status tracking
- **Fee Management** — Fee overview, defaulter tracking, waiver management with detail modals
- **Scholarship Management** — Approve/reject applications, grant new scholarships
- **Transfer Certificates** — Manage TC requests with dues verification and remarks
- **System Settings** — Academic year, fee configuration, attendance policy, portal toggles

### 🔐 Authentication
- **Login & Registration** for Student, Faculty, Parent roles
- Role-based portal routing (Student / Teacher / Admin)
- Demo credential auto-fill
- Password visibility toggle
- Registration requires admin verification (simulated)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React (Hooks) |
| Language | JavaScript (JSX) |
| Charts | Recharts (Bar, Line, Pie charts) |
| Icons | Lucide React |
| Fonts | Orbitron (headings), Exo 2 (body) — Google Fonts |
| Styling | Custom CSS-in-JS (injected via `<style>` tag) |
| State Management | React useState / useEffect |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation
```bash
git clone https://github.com/Ganesh-git-dev/sarvam-ems.git
cd sarvam-ems
npm install
npm start
```

### Demo Credentials

| Role | ID | Password |
|---|---|---|
| Student | E720524AM006 | password123 |
| Faculty | FAC2024001 | faculty123 |
| Admin | ADMIN001 | admin@123 |

> Use the **"Use Demo Credentials"** button on the login screen for quick access.

---

## 📁 Project Structure
```
src/
├── App.jsx          # Main application — routing, layout, login state
├── components/      # Reusable: PageHeader, InfoRow, ProgressBar, QRCode
├── pages/
│   ├── student/     # Dashboard, Attendance, Timetable, Fees, OD, Outpass...
│   ├── teacher/     # TeacherDashboard, Marking, Assignments, Schedule...
│   └── admin/       # AdminDashboard, Students, Fees, Scholarships, TC...
└── data/            # Mock data: STUDENT, TEACHER, ATTENDANCE, RESULTS...
```

---

## 📸 Screenshots

> *(Add screenshots here after deploying)*

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 👤 Author

**Ganesh** — E720524AM006, AI/ML Department  
EASA College of Engineering and Technology  
Designed by **Team Proton**

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.