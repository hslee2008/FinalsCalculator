<script lang="ts">
  import { NumberInput } from "carbon-components-svelte";
  import { _, __ } from "@/i18n/i18n";
  import { Event } from "@/utils/analytics";

  export let final_score: number;

  let invalid = false;

  // Score must be between 0 and 100
  $: invalid = final_score > 100 || final_score < 0 || final_score === null;
</script>

<div class="mb20">
  <NumberInput
    bind:value={final_score}
    label="기말 점수"
    warn={invalid}
    size="xl"
    min={0}
    max={100}
  ></NumberInput>
</div>
