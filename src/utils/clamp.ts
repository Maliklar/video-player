export function clamp(value: number, max: number, min = 0) {
  return value <= max && value >= min ? value : value < min ? min : max;
}
