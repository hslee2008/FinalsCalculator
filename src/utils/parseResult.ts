import { translateForScript } from './i18n'

export const parseResult = (/** @type {number} */ a) => {
  let number = a

  switch (a) {
    case 99:
      number = 100
  }

  if (number < 0) return translateForScript('secured')
  else if (number > 100) return translateForScript('impossible')
  else return `${number}${translateForScript('score')}`
}
