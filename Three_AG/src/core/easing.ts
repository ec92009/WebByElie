export function clamp(val: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, val));
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function progress(current: number, start: number, end: number): number {
  if (end === start) return 1;
  return clamp((current - start) / (end - start));
}

// Easing curves
export const Ease = {
  linear: (t: number) => clamp(t),
  quadIn: (t: number) => t * t,
  quadOut: (t: number) => t * (2 - t),
  quadInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  cubicIn: (t: number) => t * t * t,
  cubicOut: (t: number) => --t * t * t + 1,
  cubicInOut: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),

  backOut: (t: number, s = 1.70158) => {
    t = clamp(t);
    return --t * t * ((s + 1) * t + s) + 1;
  },

  elasticOut: (t: number) => {
    t = clamp(t);
    return Math.sin((-13 * Math.PI / 2) * (t + 1)) * Math.pow(2, -10 * t) + 1;
  },

  bounceOut: (t: number) => {
    t = clamp(t);
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  }
};
