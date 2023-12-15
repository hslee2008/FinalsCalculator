<script lang="ts">
  import { NumberInput } from "carbon-components-svelte";
  import { _ } from "@/i18n/i18n";
  import { Event } from "@/utils/analytics";

  export let percent: number;
  export let UpdateProjects: (e: KeyboardEvent) => void;
  export let hasMid: boolean;

  let valid = true;
  let labelText: string;
  let invalidLabelText: string;

  /*
    Korean Middle School education system usually have
    30, 35, 25 or 50, 60 as the weight of midterm and final exam
  */
  $: valid = hasMid
    ? percent === 30 || percent === 35 || percent === 25
    : percent === 50 || percent === 60;

  // Example "중간과 기말 각 비율 (25, 30, 35)"
  $: labelText = `${hasMid ? $_("each") : $_("finals")} ${$_("weight")} (${
    hasMid ? "25, 30, 35" : "50, 60"
  })`;
  $: invalidLabelText = hasMid ? $_("inval_mid") : $_("inval_no_mid");

  const FieldChanged = () => {
    Event("Percentage Field Changed", {
      field: "Percentage",
      value: percent,
    });
  };
</script>

<div class="mb20">
  <NumberInput
    bind:value={percent}
    label={valid ? labelText : invalidLabelText}
    warn={!valid}
    on:keyup={valid ? UpdateProjects : () => {}}
    on:change={FieldChanged}
    hideSteppers
  ></NumberInput>
</div>
