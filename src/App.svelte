<script>
  import { MetaTags } from 'svelte-meta-tags'
  import {
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'carbon-components-svelte'
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'
  import Calculator from './layout/Calculator.svelte'
  import { registerSW } from './utils/register-sw'
  import { t, currentLocale } from './utils/i18n'
  import { additionalLinkTags, additionalMetaTags } from './config/meta'

  registerSW()

  const properties = ['G-PV930WQQFT']
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
