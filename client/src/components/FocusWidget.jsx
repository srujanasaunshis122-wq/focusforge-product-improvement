import { useState, useEffect } from "react";

export default function FocusWidget({ tasks = [] }) {
  // Focus Timer state (Pomodoro: 25m work / 5m break)
  const FOCUS_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [mode, setMode] = useState("focus"); // "focus" or "break"
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // Timer interval effect
  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === "focus") {
        setSessionsCompleted((prev) => prev + 1);
        setMode("break");
        setTimeLeft(BREAK_TIME);
        alert("Focus session complete! Time for a well-deserved 5-minute break.");
      } else {
        setMode("focus");
        setTimeLeft(FOCUS_TIME);
        alert("Break is over! Ready to dive back in?");
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === "focus" ? FOCUS_TIME : BREAK_TIME);
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === "focus" ? FOCUS_TIME : BREAK_TIME);
  };

  // Format MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Real-time task progress metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getProgressMessage = () => {
    if (totalTasks === 0) return "Add your first task to start your day.";
    if (completedTasks === 0) return "Start a focus timer and complete task #1!";
    if (completedTasks === totalTasks) return "All tasks finished! Amazing work today!";
    if (completionPercentage >= 50) return "Over halfway done! Keep the momentum going.";
    return "Great start! Focus on the next high-priority item.";
  };

  return (
    <div className="focus-widget">
      {/* SECTION 1: TASK PROGRESS TRACKER */}
      <div className="widget-card progress-card">
        <h3>Daily Progress</h3>
        <div className="progress-stat">
          <span className="stat-numbers">
            {completedTasks} / {totalTasks}
          </span>
          <span className="stat-label">Tasks Done ({completionPercentage}%)</span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="progress-hint">{getProgressMessage()}</p>
      </div>

      {/* SECTION 2: INTERACTIVE FOCUS TIMER */}
      <div className="widget-card timer-card">
        <h3>Focus Timer</h3>
        <div className="timer-mode-toggle">
          <button
            type="button"
            className={`mode-btn ${mode === "focus" ? "active" : ""}`}
            onClick={() => switchMode("focus")}
          >
            25m Focus
          </button>
          <button
            type="button"
            className={`mode-btn ${mode === "break" ? "active" : ""}`}
            onClick={() => switchMode("break")}
          >
            5m Break
          </button>
        </div>

        <div className="timer-display">
          <span className="time-numbers">{formatTime(timeLeft)}</span>
          <span className="mode-indicator">
            {mode === "focus" ? "Deep Work Session" : "Rest & Recharge"}
          </span>
        </div>

        <div className="timer-controls">
          <button
            type="button"
            className={`btn-primary ${isRunning ? "btn-pause" : "btn-start"}`}
            onClick={toggleTimer}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button type="button" className="btn-secondary" onClick={resetTimer}>
            Reset
          </button>
        </div>

        <div className="sessions-counter">
          <span>Focus Blocks Completed: <strong>{sessionsCompleted}</strong></span>
        </div>
      </div>
    </div>
  );
}
