<script>
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
  import { t } from '../utils/i18n'
  import { parsePercent } from '../utils/parsePercent.ts'

  import Header from '../components/Header.svelte'
  import Table from '../components/Table.svelte'
  import Warning from '../components/Warning.svelte'

  let open
  let whetherMidterm = true
  let selected = $t('midterm_is')
  let number_wrong = false

  let percent = 30
  let midterm = 100
  let projects = 100 - percent * 2

  let labelText

  $: labelText = `${whetherMidterm ? $t('each') : $t('midterm')} ${$t(
    'weight'
  )} (${whetherMidterm ? '30, 35' : '40, 50'})`
  $: whetherMidterm = selected === $t('midterm_is')

  let finals = [0, 0, 0, 0, 0]

  const listCalculate = (/** @type {number} */ minus) => {
    for (let i = 0; i < finals.length; i++)
      finals[i] = parsePercent(percent, 10.5 + minus + i * 10)
  }

  const ChangeMidtermStatus = () => {
    whetherMidterm = !whetherMidterm
    selected = whetherMidterm ? $t('midterm_is') : $t('midterm_is_not')
    percent = whetherMidterm ? 30 : 50
    projects = whetherMidterm ? 100 - percent * 2 : 100 - percent
  }

  const CalculateFunction = () => {
    number_wrong = validate()

    const projectsFull = whetherMidterm ? 100 - percent * 2 : 100 - percent
    const gotMinused = -(projectsFull - projects)
    let minus =
      -(projectsFull - projects) -
      (whetherMidterm ? percent - (midterm / 100) * percent : 0)

    listCalculate(minus)
    openDialog()
  }

  const validate = () => {
    const percentCheck = whetherMidterm
      ? projects > 100 - percent * 2
      : projects > 100 - percent
    const global = midterm > 100 || midterm < 0 || projects < 0
    const checkNull = midterm === null || projects === null || percent === null
    const checkEmpty = midterm === '' || projects === '' || percent === ''

    return percentCheck || global || checkNull || checkEmpty
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
  <Select on:change="{ChangeMidtermStatus}">
    <SelectItem value="{$t('midterm_is')}"></SelectItem>
    <SelectItem value="{$t('midterm_is_not')}"></SelectItem>
  </Select>
  <button
    data-testid="switch"
    on:click="{ChangeMidtermStatus}"
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
    ></TextInput>
  </div>
</div>
{#if selected === $t('midterm_is')}
<div class="mb20">
  <TextInput
    type="number"
    bind:value="{midterm}"
    labelText="{$t('midterm_score')}"
  ></TextInput>
</div>
{/if}
<div class="mb20">
  <TextInput
    type="number"
    bind:value="{projects}"
    labelText="{$t('perf_evaluation')}"
  ></TextInput>
</div>

<button on:click="{CalculateFunction}">{$t('calculate')}</button>

<Modal
  bind:open
  modalHeading="{$t('result')}"
  passiveModal
  selectorPrimaryFocus="#close"
>
  <ModalBody style="margin-top: auto; margin-bottom: auto">
    <Table bind:finals></Table>
    <Warning bind:number_wrong></Warning>

    <div style="margin-top: 50px">
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
