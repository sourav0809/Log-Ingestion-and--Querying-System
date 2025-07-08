/**
 * Checks if a given string field contains the value (case-insensitive).
 *
 * @param field - The target string in which to search (e.g., from a data object).
 * @param value - The search string to match against the field.
 * @returns `true` if value is undefined or the field includes the value (case-insensitive), otherwise `false`.
 */
export function containsIgnoreCase(field?: string, value?: string): boolean {
  return (
    !value || field?.toLowerCase().includes(value.trim().toLowerCase()) || false
  );
}
