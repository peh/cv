const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// "2026-11-01" -> "Nov 2026". Parsed by hand to stay timezone-agnostic.
export function formatMonth(iso) {
  if (!iso) return '';
  const [year, month] = iso.split('-');
  const idx = Number(month) - 1;
  return `${MONTHS[idx] ?? ''} ${year}`.trim();
}

// A work entry's date range, e.g. "Nov 2023 – Oct 2026" or "Nov 2026 – Present".
export function formatRange(startDate, endDate) {
  const start = formatMonth(startDate);
  const end = endDate ? formatMonth(endDate) : 'Present';
  return `${start} – ${end}`;
}
