<script lang="ts">
  import { onMount } from "svelte";
  import { MetaTags } from "svelte-meta-tags";
  import { GoogleAnalytics } from "hyunseung-svelte-google-analytics";
  import {
    ContentSwitcher,
    Switch,
    ComposedModal,
    ModalHeader,
    ModalBody,
    TileGroup,
    RadioTile,
  } from "carbon-components-svelte";

  import Finals from "@/lib/Finals.svelte";
  import Grade from "@/lib/Grade.svelte";
  import Fail from "@/lib/Fail.svelte";

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
  let selected = "중학생";
  let open = false;

  onMount(() => {
    document.documentElement.lang = currentLocale;

    window.addEventListener("offline", () => (isOnline = false));
    window.addEventListener("online", () => (isOnline = true));

    if (localStorage.getItem("selected")) {
      selected = localStorage.getItem("selected");
    } else {
      open = true;
    }
  });

  function save() {
    localStorage.setItem(
      "selected",
      selected === "고등학생" ? "중학생" : "고등학생"
    );
  }
</script>

<GoogleAnalytics {properties} {configurations}></GoogleAnalytics>
<MetaTags
  title={$_("title")}
  description={$_("description")}
  {additionalMetaTags}
  {additionalLinkTags}
></MetaTags>

<ComposedModal bind:open>
  <ModalHeader
    label="기말고사 계산기 모드 선택하기"
    title="중학생 / 고등학생"
  />
  <ModalBody hasForm>
    <TileGroup bind:selected on:select={save}>
      <RadioTile value="중학생">중학생</RadioTile>
      <RadioTile value="고등학생">고등학생</RadioTile>
    </TileGroup>

    <br />

    만일 바꾸어야 한다면, 스크린 밑에 있는 설정 아이콘을 누르세요.

    <br /><br />

    <button class="btn" on:click={() => (open = false)}>확인</button>

    <br /><br />
  </ModalBody>
</ComposedModal>

<img
  src="/icon.png"
  alt="logo"
  width="100px"
  style={isOnline ? "display: none" : "display: initial; margin-bottom: 20px;"}
/>

{#if isOnline}
  <main>
    {#if selected === "중학생"}
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
    {:else if selected === "고등학생"}
      <Fail></Fail>
    {/if}
  </main>
{:else}
  <h1>{$_("offline")}</h1>
{/if}

<div style="position: fixed; bottom: 0; ">
  <button style="border: none;" on:click={() => (open = true)}>설정</button>
</div>
