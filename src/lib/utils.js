// This is a simple utility to merge CSS class names together.
// It filters out any non-string values so you can do conditional classes easily.
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}