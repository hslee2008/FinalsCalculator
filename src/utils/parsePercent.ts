export const parsePercent = (percent: number, a: number) => {
  return Math.ceil(100 * ((percent - a) / percent))
}
