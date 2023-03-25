import { derived, writable } from 'svelte/store'
import en from '../i18n/en-US.json'
import ko from '../i18n/ko-KR.json'

const translations = {
  'en-US': en,
  'ko-KR': ko
}

const { searchParams } = new URL(window.location)
let currentLocale = navigator.language || 'ko-KR'
if (currentLocale === 'ko') currentLocale = 'ko-KR'
if (process.env.NODE_ENV === 'development') currentLocale = 'ko-KR'
currentLocale = searchParams.get('lang') || currentLocale

const locale = writable(currentLocale)
const locales = Object.keys(translations)

function translate(locale, key, vars) {
  if (!translations[locale]) locale = 'en-US'

  let text = translations[locale][key]

  for (const k in vars) {
    const regex = new RegExp(`{{${k}}}`, 'g')
    text = text.replace(regex, vars[k])
  }

  return text
}

const t = derived(
  locale,
  $locale =>
    (key, vars = {}) =>
      translate($locale, key, vars)
)

const translated = (key, vars = {}) => translate(currentLocale, key, vars)

export { currentLocale, locale, locales, t, translated }
