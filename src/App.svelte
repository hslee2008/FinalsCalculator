<script>
  import { onMount } from 'svelte'
  import { MetaTags } from 'svelte-meta-tags'
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'
  import Calculator from './layout/Calculator.svelte'
  import { registerSW } from './utils/register-sw'
  import { t, currentLocale } from './utils/i18n'
  import {
    additionalLinkTags,
    additionalMetaTags,
    properties
  } from './config/config'

  registerSW()
  onMount(() => (document.documentElement.lang = currentLocale))
</script>

<GoogleAnalytics {properties}></GoogleAnalytics>
<MetaTags
  title="{$t('app_title')}"
  description="{$t('app_description')}"
  {additionalMetaTags}
  {additionalLinkTags}
></MetaTags>

<main>
  <div class="card">
    <Calculator></Calculator>
  </div>
</main>
