<script lang="ts">
  /* Imports */
  import { Modal, ModalBody } from "carbon-components-svelte";

  import { _ } from "@/i18n/i18n";
  import { CalculateFinalsScore } from "@/utils/calculate";
  import { percentToGrade } from "@/utils/numbers";
  import { Event } from "@/utils/analytics";

  import MidtermSwitcher from "@/components/Input/MidtermSwitcher.svelte";
  import InputPercentage from "@/components/Input/Percentage.svelte";
  import InputProjects from "@/components/Input/Projects.svelte";
  import InputMidterm from "@/components/Input/Midterm.svelte";
  import InputFinals from "@/components/Input/Finals.svelte";

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
  let finals_score = 100;
  let total_score = 100;
  let projects = hasMid ? 100 - percent * 2 : 100 - percent;

  $: hasMid = selected === $_("with_midterm");
  $: total_score = CalculateFinalsScore(
    hasMid,
    percent,
    projects,
    mid_score,
    finals_score
  );

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
</script>

<!-- Top Part of the page -->
<MidtermSwitcher bind:hasMid bind:selected {ChangeMidtermStatus}
></MidtermSwitcher>

<div id="dynamic-div">
  <h1 class="mb25">{$_("title2")}</h1>
</div>

<!-- Inputs -->

<InputPercentage bind:hasMid bind:percent {UpdateProjects}></InputPercentage>
{#if hasMid}
  <InputMidterm bind:mid_score></InputMidterm>
{/if}
<InputFinals bind:finals_score></InputFinals>
<InputProjects bind:projects bind:percent bind:hasMid></InputProjects>

<button on:click={table_open} class="btn mt10">{$_("calculate")}</button>

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
    <table class="bx--data-table">
      <tbody>
        <tr>
          <td>{$_("written_total_score")}</td>
          <td>{Math.round(total_score)}</td>
        </tr>
        <tr>
          <td>{$_("actual_total_score")}</td>
          <td>{total_score}</td>
        </tr>
        <tr>
          <td>{$_("grade")}</td>
          <td>{percentToGrade(total_score)}</td>
        </tr>
      </tbody>
    </table>

    <button on:click={table_close} id="close" class="btn mt25 mb25">
      {$_("close")}
    </button>

    <div class="ad-container">
      <iframe
        src="/ad/300x250.html"
        class="ad-iframe"
        title="Ad"
        height="250"
        width="300"
        scrolling="no"
      ></iframe>
    </div>
  </ModalBody>
</Modal>
