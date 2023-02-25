import { derived, writable } from 'svelte/store'
import en from '../i18n/en-US.json'
import ko from '../i18n/ko-KR.json'

const translations = {
  'en-US': en,
  'ko-KR': ko
}

const url = new URL(window.location)
const searchParams = url.searchParams

let currentLocale = searchParams.get('lang') || navigator.language || 'ko-KR'

if (currentLocale === 'ko') currentLocale = 'ko-KR'

export const locale = writable(currentLocale)
export const locales = Object.keys(translations)

function translate(locale, key, vars) {
  if (!translations[locale]) locale = 'ko-KR'

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

export const translateForScript = (key, vars = {}) =>
  translate(currentLocale, key, vars)

export { currentLocale }
