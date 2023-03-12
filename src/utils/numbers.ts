import { translateForScript } from './i18n'

export let midtermMode = true

export const parseResult = (/** @type {number} */ a) => {
  let number = a

  switch (a) {
    case 99:
      number = 100
      break
    case 98:
      number = 100
      break
  }

  if (number < 0) return translateForScript('secured')
  else if (number > 100) return translateForScript('impossible')
  else return `${number}${translateForScript('score')}`
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
