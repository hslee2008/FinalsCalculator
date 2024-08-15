<script lang="ts">
  import { onMount } from "svelte";
  import { MetaTags } from "svelte-meta-tags";
  import { GoogleAnalytics } from "hyunseung-svelte-google-analytics";
  import { ContentSwitcher, Switch } from "carbon-components-svelte";

  import Finals from "@/lib/Finals.svelte";
  import Grade from "@/lib/Grade.svelte";

  import { registerSW } from "@/utils/register-sw";
  import { SetUser } from "@/utils/analytics";
  import { initializeFirebasePerformance } from "@/utils/firebase";

  import { _, currentLocale } from "@/i18n/i18n";

  import { additionalLinkTags, additionalMetaTags } from "@/config/language";
  import { properties, configurations } from "@/config/ga";

  registerSW();
  SetUser();
  initializeFirebasePerformance();

  let isOnline = true;
  let selectedIndex = 0;

  onMount(() => {
    document.documentElement.lang = currentLocale;

    window.addEventListener("offline", () => (isOnline = false));
    window.addEventListener("online", () => (isOnline = true));
  });
</script>

<GoogleAnalytics {properties} {configurations}></GoogleAnalytics>
<MetaTags
  title={$_("title")}
  description={$_("description")}
  {additionalMetaTags}
  {additionalLinkTags}
></MetaTags>

<img
  src="/icon.png"
  alt="logo"
  width="100px"
  style={isOnline ? "display: none" : "display: initial; margin-bottom: 20px;"}
/>

{#if isOnline}
  <main>
    <ContentSwitcher bind:selectedIndex>
      <Switch text={$_("expected_finals_score")} />
      <Switch text={$_("total_grade")} />
    </ContentSwitcher>

    <br />

    {#if selectedIndex === 0}
      <Finals></Finals>
    {:else if selectedIndex === 1}
      <Grade></Grade>
    {/if}
  </main>

  <br />

  {#if selectedIndex === 0}
    <div class="ad-container">
      <iframe
        src="/ad/320x100.html"
        class="ad-iframe"
        title="Ad"
        height="100"
        width="320"
        scrolling="no"
      ></iframe>
    </div>
  {/if}
{:else}
  <h1>{$_("offline")}</h1>
{/if}
