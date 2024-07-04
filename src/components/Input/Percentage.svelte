<script lang="ts">
  import { NumberInput } from "carbon-components-svelte";
  import { _ } from "@/i18n/i18n";
  import { Event } from "@/utils/analytics";

  export let percent: number;
  export let UpdateProjects: () => void;
  export let hasMid: boolean;

  let labelText = "";

  $: labelText = hasMid ? $_("each") : $_("finals") + " " + $_("weight");

  const FieldChanged = () => {
    UpdateProjects();
    Event("Percentage Field Changed", {
      field: "Percentage",
      value: percent,
    });
  };
</script>

<div class="mb20 flex" style="justify-content: center">
  <NumberInput
    label={labelText}
    bind:value={percent}
    on:change={FieldChanged}
    size="xl"
    step={5}
    max={hasMid ? 45 : 95}
    min={5}
  />
</div>
