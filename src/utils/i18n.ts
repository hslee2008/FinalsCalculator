import { derived, writable } from 'svelte/store'
import en from '../i18n/en-US.json'
import ko from '../i18n/ko.json'

const translations = {
  'en-US': en,
  ko
}

let currentLocale = navigator.language || 'ko'

if (process.env.NODE_ENV === 'development') currentLocale = 'ko'

export const locale = writable(currentLocale)
export const locales = Object.keys(translations)

function translate(locale, key, vars) {
  if (!translations[locale]) locale = 'ko'

  let text = translations[locale][key]

  Object.keys(vars).map(k => {
    const regex = new RegExp(`{{${k}}}`, 'g')
    text = text.replace(regex, vars[k])
  })

  return text
}

export const t = derived(
  locale,
  $locale =>
    (key, vars = {}) =>
      translate($locale, key, vars)
)

export const translateForScript = (key, vars = {}) => translate(currentLocale, key, vars)

export { currentLocale }
