<script>
  import { onMount } from 'svelte'
  import { MetaTags } from 'svelte-meta-tags'
  import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs'
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'

  import Finals from '@/components/Calculator/Finals.svelte'
  import Grade from '@/components/Calculator/Grade.svelte'

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
  <Tabs>
    <TabList>
      <Tab>{$t("expected_finals_score")}</Tab>
      <Tab>{$t("finals_grade")}</Tab>
    </TabList>

    <TabPanel>
      <Finals></Finals>
    </TabPanel>

    <TabPanel>
      <Grade></Grade>
    </TabPanel>
  </Tabs>
</main>
