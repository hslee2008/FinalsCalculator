import { translated } from './i18n'

export const parseResult = (/** @type {number} */ percent) => {
  if (percent === 98 || percent === 99) return `100${translated('score')}`
  if (percent < 0) return translated('secured')
  else if (percent > 100) return translated('impossible')
  else return `${percent}${translated('score')}`
}

export const findGrade = (/** @type {number} */ percent) => {
  if (percent >= 89.5) return 'A'
  else if (percent >= 79.5) return 'B'
  else if (percent >= 69.5) return 'C'
  else if (percent >= 59.5) return 'D'
  else return 'E'
}

export const parsePercent = (percent: number, subtracted: number) => {
  // Make the subtracted current amount into a score needed in finals
  return Math.ceil(100 * ((percent - subtracted) / percent))
}

export const TwentyPercentMidterm = (percent: number) => {
  return (100 - percent * 2) * 0.2
}

export const TwentyPercent = (percent: number) => {
  return (100 - percent) * 0.2
}
