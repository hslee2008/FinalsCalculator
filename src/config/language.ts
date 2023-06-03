import { currentLocale, translated } from '../i18n/i18n'

const additionalMetaTags = [
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

export { additionalLinkTags, additionalMetaTags }
