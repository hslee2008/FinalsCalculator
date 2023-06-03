<script>
  import { onMount } from 'svelte'
  import { MetaTags } from 'svelte-meta-tags'
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'
  import Calculator from '@/layout/Calculator.svelte'
  import { registerSW } from '@/utils/register-sw'
  import { SetUser } from '@/utils/analytics'
  import { initializeFirebasePerformance } from '@/utils/firebase'
  import { t, currentLocale } from '@/i18n/i18n'
  import { additionalLinkTags, additionalMetaTags } from '@/config/language'
  import { properties, configurations } from '@/config/ga'

  registerSW()
  SetUser()
  initializeFirebasePerformance()

  onMount(() => (document.documentElement.lang = currentLocale))
</script>

<GoogleAnalytics {properties} {configurations}></GoogleAnalytics>
<MetaTags
  title="{$t('app_title')}"
  description="{$t('app_description')}"
  {additionalMetaTags}
  {additionalLinkTags}
></MetaTags>

<main>
  <Calculator></Calculator>
</main>
