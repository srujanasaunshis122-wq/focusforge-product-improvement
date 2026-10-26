import FocusWidget from "./FocusWidget";

/**
 * MotivationWidget (Legacy Component Name)
 * 
 * Re-exports the improved FocusWidget.
 * The passive 5-second polling motivational quotes widget has been replaced
 * with an interactive Focus Timer and Real-Time Task Progress Tracker.
 */
export default function MotivationWidget(props) {
  return <FocusWidget {...props} />;
}
