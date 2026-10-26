# FocusForge Productivity Platform

FocusForge is a modern productivity and task management application designed to help users structure their daily workflow, maintain deep focus, and accomplish their most important tasks.

---

## What's New in This Version

Following a product feature review of the legacy "Motivation Mode" widget, we replaced the passive quotes feature with an **Active Productivity & Focus Center**:

1. **Interactive Pomodoro Focus Timer:** 25-minute deep work intervals and 5-minute recharge breaks with start, pause, reset, and completed session tracking.
2. **Real-time Task Progress Tracker:** Live progress bar displaying percentage and completed vs total tasks, offering milestone-driven motivation based on actual output.
3. **Priority Classification:** Support for High, Medium, and Low task priorities to streamline task execution.
4. **Detailed Feature Audit:** Full architectural rationale documented in [`Changes.md`](./Changes.md).

---

## Tech Stack

- **Frontend:** React (Vite), CSS3 Design Tokens
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL / SQLite with Prisma ORM

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/srujanasaunshis122-wq/focusforge-product-improvement.git
cd focusforge-product-improvement
```

### 2. Backend Setup
```bash
cd server
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

Open the printed Vite local URL (e.g., `http://localhost:5173`) in your browser to start using FocusForge!
