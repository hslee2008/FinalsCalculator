<script lang="ts">
  /* Imports */
  import { Modal, ModalBody, Checkbox } from "carbon-components-svelte";

  import { _ } from "@/i18n/i18n";
  import { TableCalculation } from "@/utils/calculate";
  import { Event } from "@/utils/analytics";

  import {
    Table,
    MidtermSwitcher,
    Percentage,
    Projects,
    Midterm,
  } from "@/components/";

  /* Saved */
  const savedMidPer = parseInt(localStorage.getItem("midterm_percent")!);
  const savedNoMidPer = parseInt(localStorage.getItem("no_midterm_percent")!);

  /* LocalStorage Initialization */
  if (!localStorage.getItem("hasMid")) localStorage.setItem("hasMid", "true");

  /* Variable Initialization */
  let table_opened = false;
  let hasMid = localStorage.getItem("hasMid") === "true";
  let selected = hasMid ? $_("with_midterm") : $_("no_midterm");

  /*
    The default percentage:
    - If Midterm, 25% for midterm, 50% for projects
    - If No Midterm, 50% for midterm, 50% for projects
  */
  let percent = (hasMid ? savedMidPer : savedNoMidPer) || (hasMid ? 25 : 50);
  let mid_score = 100;
  let projects = hasMid ? 100 - percent * 2 : 100 - percent;
  let hasDecimalScore = localStorage.getItem("hasDecimalScore") === "true";

  let finals = [0, 0, 0, 0, 0];

  $: hasMid = selected === $_("with_midterm");

  /* Functions */
  const ChangeMidtermStatus = () => {
    // Initialize the numbers for each midterm
    if (hasMid) {
      selected = $_("with_midterm");
      percent = savedMidPer || 25;
      mid_score = 100;
      projects = 100 - percent * 2;
    } else {
      selected = $_("no_midterm");
      percent = savedNoMidPer || 50;
      mid_score = 0;
      projects = 100 - percent;
    }

    localStorage.setItem("hasMid", hasMid.toString());
    Event("Midterm Changed", {
      midterm: hasMid,
    });
  };

  // Only calculate
  const CalculateTable = () => {
    finals = TableCalculation(
      hasMid,
      percent,
      projects,
      mid_score,
      hasDecimalScore,
      table_open
    );
  };

  // Calculate with event
  const calculate = () => {
    CalculateTable();
    Event("Calculate Button");
  };

  // Automatically update table when decimal is changed
  const onChangeDecimal = () => {
    localStorage.setItem("hasDecimalScore", hasDecimalScore.toString());
    CalculateTable();
    Event("Decimal Changed", {
      decimal: hasDecimalScore,
    });
  };

  // Automatically update projects value when percent is changed
  const UpdateProjects = () => {
    if (hasMid) {
      projects = 100 - percent * 2;
      localStorage.setItem("midterm_percent", percent.toString());
    } else {
      projects = 100 - percent;
      localStorage.setItem("no_midterm_percent", percent.toString());
    }
  };

  // Dialog functions
  const table_close = () => (table_opened = false);
  const table_open = () => (table_opened = true);

  // Checkbox functions
  const decimal_true = () => (hasDecimalScore = true);
  const decimal_false = () => (hasDecimalScore = false);
</script>

<!-- Testing -->
<button aria-label="test-yes-decimal" data-testid="yes-decimal" on:click={decimal_true}></button>
<button aria-label="test-no-decimal" data-testid="no-decimal" on:click={decimal_false}></button>

<!-- Top Part of the page -->
<div class="flex align-center">
  <MidtermSwitcher bind:hasMid bind:selected {ChangeMidtermStatus}
  ></MidtermSwitcher>
</div>

<div id="dynamic-div">
  <h1 class="mb25">{$_("title")}</h1>
</div>

<!-- Inputs -->
<Percentage bind:hasMid bind:percent {UpdateProjects}></Percentage>
{#if hasMid}
  <Midterm bind:mid_score></Midterm>
{/if}
<Projects bind:projects bind:percent bind:hasMid></Projects>

<button on:click={calculate} class="btn mt10">{$_("calculate")}</button>

<!-- Table Modal -->
<Modal
  bind:open={table_opened}
  modalHeading={$_("result")}
  modalAriaLabel={$_("ALmodal")}
  iconDescription="close modal"
  selectorPrimaryFocus=".bx--modal-content"
  passiveModal
>
  <ModalBody>
    <Table bind:finals bind:percent bind:mid_score bind:projects bind:hasMid
    ></Table>

    <Checkbox
      on:change={onChangeDecimal}
      bind:checked={hasDecimalScore}
      labelText={$_("decimal_score")}
      class="mb10 mt25"
    ></Checkbox>

    <button on:click={table_close} id="close" class="btn mt10 mb25">
      {$_("close")}
    </button>
  </ModalBody>
</Modal>
