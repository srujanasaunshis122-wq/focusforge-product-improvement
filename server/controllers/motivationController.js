/**
 * Deprecated Motivation Controller
 * 
 * Note: Motivation Mode has been deprecated in FocusForge v2.0 in favor of
 * active productivity tools (Focus Timer and Real-Time Progress Tracker).
 * This endpoint is retained for legacy API compatibility.
 */
const quotes = [
  "Action cures fear. Start your first 25-minute focus session today.",
  "Small daily accomplishments compound into major milestones.",
  "Stay focused on what matters right now."
];

exports.getMotivation = (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({
    quote: randomQuote,
    deprecated: true,
    recommendation: "Use FocusForge Focus Timer & Task Progress Widget"
  });
};
