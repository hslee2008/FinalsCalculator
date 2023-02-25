<script>
  import Calculator from './layout/Calculator.svelte'
  import { MetaTags } from 'svelte-meta-tags'
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'
  import { t, currentLocale } from './utils/i18n'

  const url = new URL(window.location)
  const searchParams = url.searchParams

  let mediaQueryObj = window.matchMedia('(prefers-color-scheme: dark)')
  let isDarkMode = searchParams.get('dark') || mediaQueryObj.matches
</script>

<GoogleAnalytics properties={['G-PV930WQQFT']} />
<MetaTags
  title="{$t('app_title')}"
  description="{$t('app_description')}"
  additionalLinkTags="{[
    {
      rel: 'manifest',
      href: `/manifest/${isDarkMode ? 'dark' : 'light'}/manifest-${currentLocale}.json`
    },
    {
      rel: 'theme-color',
      href: isDarkMode ? '#000000' : '#FFFFFF'
    },
    {
      rel: 'apple-mobile-web-app-status-bar-style',
      href: isDarkMode ? '#000000' : '#FFFFFF'
    },
    {
      rel: 'msapplication-TileColor',
      href: isDarkMode ? '#000000' : '#FFFFFF'
    },
    {
      rel: 'apple-mobile-web-app-title',
      href: $t('app_title')
    },
    {
      rel: 'subject',
      href: $t('app_subject')
    },
    {
      rel: 'author',
      href: $t('name')
    },
    {
      rel: 'owner',
      href: $t('name')
    },
    {
      rel: 'copyright',
      href: $t('name')
    },
    {
      rel: 'language',
      href: currentLocale
    },
  ]}"
></MetaTags>

<main>
  <div class="card">
    <Calculator></Calculator>
  </div>
</main>
