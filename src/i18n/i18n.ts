import { derived, writable } from 'svelte/store'
import en from './translation/en-US.json'
import ko from './translation/ko-KR.json'

const translations: any = {
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

function translate(locale: string, key: string, vars: { [x: string]: any }) {
  if (!translations[locale]) locale = 'en-US'

  let text = translations[locale][key]

  for (const k in vars) {
    const regex = new RegExp(`{{${k}}}`, 'g')
    text = text.replace(regex, vars[k])
  }

  return text
}

function translateMultiple(
  locale: string,
  key: string,
  vars: { [x: string]: any }
) {
  const keys = key.split(' ')
  const translated = keys.map(key => translate(locale, key, vars))
  return translated.join(' ')
}

const _ = derived(
  locale,
  $locale =>
    (key: string, vars = {}) =>
      translate($locale, key, vars)
)

const __ = derived(
  locale,
  $locale =>
    (keys: string, vars = {}) =>
      translateMultiple($locale, keys, vars)
)

const translateJS = (key: string, vars = {}) =>
  translate(currentLocale, key, vars)

const translateMultipleJS = (keys: string, vars = {}) =>
  translateMultiple(currentLocale, keys, vars)

export {
  currentLocale,
  locale,
  locales,
  _,
  __,
  translateJS,
  translateMultipleJS
}
