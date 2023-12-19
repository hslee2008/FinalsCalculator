<script lang="ts">
  import { RadioButtonGroup, RadioButton } from "carbon-components-svelte";
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
  <RadioButtonGroup
    required
    legendText={labelText}
    bind:selected={percent}
    on:change={FieldChanged}
  >
    {#if hasMid}
      <RadioButton labelText="25" value={25} />
      <RadioButton labelText="30" value={30} />
      <RadioButton labelText="35" value={35} />
      <RadioButton labelText="40" value={40} />
    {:else}
      <RadioButton labelText="40" value={40} />
      <RadioButton labelText="50" value={50} />
      <RadioButton labelText="60" value={60} />
    {/if}
  </RadioButtonGroup>
</div>
