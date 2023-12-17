<script lang="ts">
  import { NumberInput } from "carbon-components-svelte";
  import { _ } from "@/i18n/i18n";
  import { Event } from "@/utils/analytics";

  export let finals_score: number;

  let invalid = false;

  // Score must be between 0 and 100
  $: invalid = finals_score > 100 || finals_score < 0 || finals_score === null;

  const FieldChanged = () => {
    Event("Finals Score Field Changed", {
      value: finals_score,
    });
  };
</script>

<div class="mb20">
  <NumberInput
    bind:value={finals_score}
    on:change={FieldChanged}
    label={invalid ? "0 ~ 100" : $_("finals_score")}
    warn={invalid}
    size="xl"
    min={0}
    max={100}
  ></NumberInput>
</div>
