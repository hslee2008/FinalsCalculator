export const parsePercent = (percent: number, a: number) =>
  Math.ceil(100 * ((percent - a) / percent))
