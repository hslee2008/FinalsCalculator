import { translated } from '../i18n/i18n'

const parseResult = (percent: number) => {
  if (percent === 98 || percent === 99) return `100${translated('score')}`
  if (percent <= 0) return translated('secured')
  if (percent > 100) return translated('impossible')

  return `${percent}${translated('score')}`
}

const findGrade = (percent: number) => {
  if (percent >= 89.5) return 'A'
  if (percent >= 79.5) return 'B'
  if (percent >= 69.5) return 'C'
  if (percent >= 59.5) return 'D'

  return 'E'
}

const parsePercent = (percent: number, subtracted: number) => {
  // Make the subtracted current amount into a score needed in finals
  return Math.ceil(100 * ((percent - subtracted) / percent))
}

const TwentyPercentMidterm = (percent: number) => {
  return Math.floor((100 - percent * 2) * 0.2)
}

const TwentyPercent = (percent: number) => {
  return Math.floor((100 - percent) * 0.2)
}

export {
  parseResult,
  findGrade,
  parsePercent,
  TwentyPercentMidterm as p20_m,
  TwentyPercent as p20
}
