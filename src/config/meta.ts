import { translateForScript, currentLocale } from '../utils/i18n'

const url = new URL(window.location)
const searchParams = url.searchParams
const mediaQueryObj = window.matchMedia('(prefers-color-scheme: dark)')
const isDarkMode = searchParams.get('dark') || mediaQueryObj.matches

const additionalMetaTags = [
  {
    name: 'theme-color',
    content: isDarkMode ? '#000000' : '#FFFFFF'
  },
  {
    name: 'apple-mobile-web-app-status-bar-style',
    content: isDarkMode ? '#000000' : '#FFFFFF'
  },
  {
    name: 'msapplication-TileColor',
    content: isDarkMode ? '#000000' : '#FFFFFF'
  },
  {
    name: 'apple-mobile-web-app-title',
    content: translateForScript('app_title')
  },
  {
    name: 'subject',
    content: translateForScript('app_subject')
  },
  {
    name: 'author',
    content: translateForScript('name')
  },
  {
    name: 'owner',
    content: translateForScript('name')
  },
  {
    name: 'copyright',
    content: translateForScript('name')
  },
  {
    name: 'language',
    content: currentLocale
  }
]
const additionalLinkTags = [
  {
    rel: 'manifest',
    href: `/manifest/${
      isDarkMode ? 'dark' : 'light'
    }/manifest-${currentLocale}.json`
  }
]

export { additionalMetaTags, additionalLinkTags }
