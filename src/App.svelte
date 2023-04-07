<script>
  import { MetaTags } from 'svelte-meta-tags'
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'
  import Calculator from './layout/Calculator.svelte'
  import { registerSW } from './utils/register-sw'
  import { SetUser } from './utils/analytics'
  import { t, currentLocale } from './i18n/i18n'
  import {
    additionalLinkTags,
    additionalMetaTags,
    properties
  } from './config/config'

  registerSW()
  SetUser()
</script>

<svelte:document lang="{currentLocale}" />
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
