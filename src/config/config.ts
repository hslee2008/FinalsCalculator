import { currentLocale, translated } from '../i18n/i18n'

const url = new URL(window.location)
const searchParams = url.searchParams

const additionalMetaTags = [
  {
    name: 'theme-color',
    content: '#FFFFFF'
  },
  {
    name: 'apple-mobile-web-app-status-bar-style',
    content: '#FFFFFF'
  },
  {
    name: 'msapplication-TileColor',
    content: '#FFFFFF'
  },
  {
    name: 'apple-mobile-web-app-title',
    content: translated('app_title')
  },
  {
    name: 'subject',
    content: translated('app_subject')
  },
  {
    name: 'author',
    content: translated('name')
  },
  {
    name: 'owner',
    content: translated('name')
  },
  {
    name: 'copyright',
    content: translated('name')
  },
  {
    name: 'language',
    content: currentLocale
  }
]
const additionalLinkTags = [
  {
    rel: 'manifest',
    href: `/manifest/manifest-${currentLocale}.json`
  }
]
const properties = ['G-PV930WQQFT']

export { additionalLinkTags, additionalMetaTags, properties }
