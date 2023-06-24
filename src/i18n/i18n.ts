import { derived, writable } from 'svelte/store'
import en from './translation/en-US.json'
import ko from './translation/ko-KR.json'

const translations = {
  'en-US': en,
  'ko-KR': ko
}

/*
  Prioritization: Development (ko-KR) > Browser > URL
*/

const searchParams = new URLSearchParams(window.location.search)
let currentLocale = navigator.language || 'ko-KR'
if (currentLocale === 'ko') currentLocale = 'ko-KR'
if (process.env.NODE_ENV === 'development') currentLocale = 'ko-KR'
currentLocale = searchParams.get('lang') || currentLocale

const locale = writable(currentLocale)
const locales = Object.keys(translations)

function translate(
  locale: string,
  key: string | number,
  vars: { [x: string]: any }
) {
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
    (key: string | number, vars = {}) =>
      translate($locale, key, vars)
)

const translated = (key: string | number, vars = {}) =>
  translate(currentLocale, key, vars)

export { currentLocale, locale, locales, t, translated }
