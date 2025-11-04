/**
 * Formats a date/time string for appointments.
 * @param {string|Date} date - The date/time to format
 * @param {boolean} [withTime=true] - Whether to include time in output
 * @returns {string} e.g. "03 Nov 2025, 10:30 AM"
 */
export const formatDate = (date, withTime = true) => {
  if (!date) return "";
  const d = new Date(date);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(withTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
  };

  return d.toLocaleString("en-IN", options);
};

// Example:
// formatDate("2025-11-03T10:30:00") → "03 Nov 2025, 10:30 AM"
