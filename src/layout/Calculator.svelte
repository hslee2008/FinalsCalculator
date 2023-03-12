<script>
  /* Imports */
  import 'carbon-components-svelte/css/white.css'
  import {
    TextInput,
    Select,
    SelectItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    DataTable,
    TileGroup,
    RadioTile
  } from 'carbon-components-svelte'
  import { onMount } from 'svelte'

  import { t } from '../utils/i18n'
  import {
    parsePercent,
    TwentyPercent as p20,
    TwentyPercentMidterm as p20_m
  } from '../utils/numbers'

  import Header from '../components/Header.svelte'
  import Table from '../components/Table.svelte'

  /* Variable Initialization */

  let opened = false
  let whetherMidterm = true
  let selected = $t('midterm_is')

  let percent = 25
  let midterm_score = 100
  let projects = 100 - percent * 2

  let labelText
  let finals = [0, 0, 0, 0, 0]

  /* Making sure variable stays up to date */

  $: labelText = `${whetherMidterm ? $t('each') : $t('midterm')} ${$t(
    'weight'
  )} (${whetherMidterm ? '25, 30, 35' : '50, 60'})`
  $: whetherMidterm = selected === $t('midterm_is')

  onMount(() => {
    const url = new URL(window.location)
    const searchParams = url.searchParams

    if (!!searchParams.get('midterm')) {
      whetherMidterm = searchParams.get('midterm') === 'true'
      ChangeMidtermStatus()
    }
  })

  /* Functions */

  const ChangeMidtermStatus = () => {
    // Initialize the numbers for each midterm

    selected = whetherMidterm ? $t('midterm_is') : $t('midterm_is_not')
    percent = whetherMidterm ? 25 : 50
    projects = whetherMidterm ? 100 - percent * 2 : 100 - percent
  }

  const ProgrammaticallyChange = () => {
    whetherMidterm = !whetherMidterm
    ChangeMidtermStatus()
  }

  const CalculateFunction = () => {
    const projectsFull = whetherMidterm ? 100 - percent * 2 : 100 - percent
    let subtracted = -(projectsFull - projects)

    // If there is no midterm, simply subtract the values taken from projects
    // If there is a midterm, subtract by adding weights
    if (whetherMidterm) {
      subtracted -= percent - (midterm_score / 100) * percent
    }

    // By order of alphabets (A, B, C, D, E), calculate the necessary grades
    for (let i = 0; i < finals.length; i++)
      finals[i] = parsePercent(percent, 10.5 + subtracted + i * 10)

    open()
  }

  function onKeyDown(e) {
    switch (e.keyCode) {
      case 67:
        opened ? close() : CalculateFunction()
        break
      case 83:
        ProgrammaticallyChange()
        break
    }
  }

  // Short Functions
  const close = () => (opened = false)
  const open = () => (opened = true)
</script>

<div class="mb20">
  <Select on:change="{ChangeMidtermStatus}" bind:selected>
    <SelectItem value="{$t('midterm_is')}"></SelectItem>
    <SelectItem value="{$t('midterm_is_not')}"></SelectItem>
  </Select>
  <button
    data-testid="switch"
    on:click="{ProgrammaticallyChange}"
    style="display: none"
  ></button>
</div>

<Header title="{$t('app_title')}"></Header>

<div class="mb20">
  <TextInput
    type="number"
    bind:value="{percent}"
    labelText="{labelText}"
    invalid="{whetherMidterm ? percent !== 30 && percent !== 35 && percent !== 25 : percent !== 50 && percent !== 60}"
    invalidText="{whetherMidterm ? $t('invalid_percent') : $t('invalid_percent_midterm')}"
    placeholder="{whetherMidterm ? $t('invalid_percent') : $t('invalid_percent_midterm')}"
  ></TextInput>
</div>
{#if whetherMidterm}
<div class="mb20">
  <TextInput
    type="number"
    bind:value="{midterm_score}"
    labelText="{$t('midterm_score')}"
    invalid="{midterm_score > 100 || midterm_score < 0 || midterm_score === null}"
    invalidText="0 ~ 100"
    placeholder="0 ~ 100"
  ></TextInput>
</div>
{/if}
<div class="mb20">
  <TextInput
    type="number"
    bind:value="{projects}"
    labelText="{$t('perf_evaluation')}"
    invalid="{projects < 0 || (whetherMidterm ? projects < p20_m(percent) : projects < p20(percent)) || (whetherMidterm ? projects > 100 - percent * 2 : projects > (100 - percent))}"
    invalidText="{whetherMidterm ? p20_m(percent) : p20(percent)} ~ {whetherMidterm ? 100 - percent * 2 : 100 - percent}"
    placeholder="{whetherMidterm ? p20_m(percent) : p20(percent)} ~ {whetherMidterm ? 100 - percent * 2 : 100 - percent}"
  ></TextInput>
</div>

<button on:click="{CalculateFunction}">{$t('calculate')}</button>

<Modal
  bind:open="{opened}"
  modalHeading="{$t('result')}"
  passiveModal
  selectorPrimaryFocus=".bx--modal-content"
>
  <ModalBody style="margin-top: auto; margin-bottom: auto">
    <Table bind:finals></Table>

    <div style="margin-top: 50px; margin-bottom: 50px">
      <button on:click="{close}" id="close">{$t('close')}</button>
    </div>
  </ModalBody>
</Modal>

<svelte:window on:keydown="{onKeyDown}" />

<style>
  .mb20 {
    margin-bottom: 20px;
  }
</style>
