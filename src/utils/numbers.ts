import { translateTs } from './i18n'

export const parseResult = (/** @type {number} */ percent) => {
  if (percent === 98 || percent === 99) return `100${translateTs('score')}`
  if (percent < 0) return translateTs('secured')
  else if (percent > 100) return translateTs('impossible')
  else return `${percent}${translateTs('score')}`
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
