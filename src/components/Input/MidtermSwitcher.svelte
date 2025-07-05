<script lang="ts">
  import { Select, SelectItem } from "carbon-components-svelte";
  import { _ } from "@/i18n/i18n";

  export let hasMid: boolean;
  export let selected: string;
  export let ChangeMidtermStatus: () => void;
</script>

<Select on:change={ChangeMidtermStatus} bind:selected class="mb20">
  <SelectItem value={$_("with_midterm")}></SelectItem>
  <SelectItem value={$_("no_midterm")}></SelectItem>
</Select>
