<script lang="ts">
  import { NumberInput } from "carbon-components-svelte";
  import { _, __ } from "@/i18n/i18n";
  import { Event } from "@/utils/analytics";

  export let mid_score: number;

  let invalid = false;

  // Score must be between 0 and 100
  $: invalid = mid_score > 100 || mid_score < 0 || mid_score === null;

  const FieldChanged = () => {
    Event("Midterm Field Changed", {
      field: "Midterm Score",
      value: mid_score,
    });
  };
</script>

<div class="mb20">
  <NumberInput
    bind:value={mid_score}
    on:change={FieldChanged}
    label={invalid ? "0 ~ 100" : $__("midterm _score")}
    warn={invalid}
    size="xl"
    min={0}
    max={100}
    translateWithId={(id) => $_(`ID${id}`)}
  ></NumberInput>
</div>
