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
  import { parsePercent } from '../utils/parsePercent.ts'
  import { FourtyPercent as per40 } from '../utils/40percent.ts'

  import Header from '../components/Header.svelte'
  import Table from '../components/Table.svelte'

  /* Variable Initialization */

  let open
  let whetherMidterm = true
  let selected = $t('midterm_is')

  let percent = 25
  let midterm = 100
  let projects = 100 - percent * 2

  let labelText
  let finals = [0, 0, 0, 0, 0]

  const url = new URL(window.location)
  const searchParams = url.searchParams

  /* Making sure variable stays up to date */

  $: labelText = `${whetherMidterm ? $t('each') : $t('midterm')} ${$t(
    'weight'
  )} (${whetherMidterm ? '25, 30, 35' : '50, 60'})`
  $: whetherMidterm = selected === $t('midterm_is')

  onMount(() => {
    if (searchParams.has('midterm')) {
      whetherMidterm = searchParams.get('midterm') === 'true'
      ChangeMidtermStatus()
    }
  })

  /* Functions */

  const listCalculate = (/** @type {number} */ minus) => {
    for (let i = 0; i < finals.length; i++)
      finals[i] = parsePercent(percent, 10.5 + minus + i * 10)
  }

  const ChangeMidtermStatus = () => {
    selected = whetherMidterm ? $t('midterm_is') : $t('midterm_is_not')
    percent = whetherMidterm ? 25 : 50
    projects = whetherMidterm ? 100 - percent * 2 : 100 - percent
  }

  const TestChangeMidtermStatus = () => {
    whetherMidterm = !whetherMidterm
    ChangeMidtermStatus()
  }

  const CalculateFunction = () => {
    const projectsFull = whetherMidterm ? 100 - percent * 2 : 100 - percent
    const gotMinused = -(projectsFull - projects)
    let minus =
      -(projectsFull - projects) -
      (whetherMidterm ? percent - (midterm / 100) * percent : 0)

    listCalculate(minus)
    openDialog()
  }

  function onKeyDown(e) {
    switch (e.keyCode) {
      case 67:
        open ? closeDialog() : CalculateFunction()
        break
    }
  }

  // Short Functions
  const closeDialog = () => (open = false)
  const openDialog = () => (open = true)
</script>

<div class="mb20">
  <Select on:change="{ChangeMidtermStatus}" bind:selected>
    <SelectItem value="{$t('midterm_is')}"></SelectItem>
    <SelectItem value="{$t('midterm_is_not')}"></SelectItem>
  </Select>
  <button
    data-testid="switch"
    on:click="{TestChangeMidtermStatus}"
    style="display: none"
  ></button>
</div>

<Header title="{$t('app_title')}"></Header>

<div class="mb20">
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
</div>
{#if whetherMidterm}
<div class="mb20">
  <TextInput
    type="number"
    bind:value="{midterm}"
    labelText="{$t('midterm_score')}"
    invalid="{midterm > 100 || midterm < 0 || midterm === null}"
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
    invalid="{projects < 0 || (whetherMidterm ? projects < per40(100 - percent * 2) : projects < per40(100 - percent)) || (whetherMidterm ? projects > 100 - percent * 2 : projects > (100 - percent))}"
    invalidText="{whetherMidterm ? per40(100 - percent * 2) : per40(100 - percent)} ~ {whetherMidterm ? 100 - percent * 2 : 100 - percent}"
    placeholder="{whetherMidterm ? per40(100 - percent * 2) : per40(100 - percent)} ~ {whetherMidterm ? 100 - percent * 2 : 100 - percent}"
  ></TextInput>
</div>

<button on:click="{CalculateFunction}">{$t('calculate')}</button>

<Modal
  bind:open
  modalHeading="{$t('result')}"
  passiveModal
  selectorPrimaryFocus=".bx--modal-content"
>
  <ModalBody style="margin-top: auto; margin-bottom: auto">
    <Table bind:finals></Table>

    <div style="margin-top: 50px; margin-bottom: 50px">
      <button on:click="{closeDialog}" id="close">{$t('close')}</button>
    </div>
  </ModalBody>
</Modal>

<svelte:window on:keydown="{onKeyDown}" />

<style>
  .mb20 {
    margin-bottom: 20px;
  }
</style>
