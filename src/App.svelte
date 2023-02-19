<script>
  import Calculator from './layout/Calculator.svelte'
  import { MetaTags } from 'svelte-meta-tags';
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'
  import { t, locale } from './i18n'
</script>

<GoogleAnalytics properties={['G-PV930WQQFT']} />
<MetaTags title="{$t('app_title')}" description="{$t('app_description')}" additionalLinkTags="{[
  {
    rel: 'manifest',
    href: '/manifest-${locale}.json'
  }
]}" />

<main>
  <div class="card">
    <Calculator></Calculator>
  </div>
</main>
