import { translated } from '../i18n/i18n'

const parseResult = (percent: number): string => {
  if (percent <= 0) return translated('secured')
  if (percent > 100) return translated('impossible')

  return `${percent}${translated('score')}`
}

const findGrade = (percent: number): string => {
  if (percent >= 89.5) return 'A'
  if (percent >= 79.5) return 'B'
  if (percent >= 69.5) return 'C'
  if (percent >= 59.5) return 'D'

  return 'E'
}

const parsePercent = (
  percent: number,
  subtracted: number,
  hasDecimalScore: boolean
): number | string => {
  const score = 100 * ((percent - subtracted) / percent)

  if (hasDecimalScore) {
    // Round the score so that only 0.5 is possible
    const roundedScore = score.toFixed(1)
    const decimal = Number(roundedScore.split('.')[1])

    if (decimal === 0) return parseInt(roundedScore).toFixed(1)
    if (decimal < 5) return Math.floor(score) + 0.5
    if (decimal > 5) return (Math.ceil(score).toFixed(1))
  }

  // Make the subtracted current amount into a score needed in finals
  return Math.ceil(score)
}

const TwentyPercentMidterm = (percent: number): number => {
  return Math.floor((100 - percent * 2) * 0.2)
}

const TwentyPercent = (percent: number): number => {
  return Math.floor((100 - percent) * 0.2)
}

export {
  parseResult,
  findGrade,
  parsePercent,
  TwentyPercentMidterm as p20_m,
  TwentyPercent as p20
}
