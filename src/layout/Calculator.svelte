<script>
  /* Imports */
  import 'carbon-components-svelte/css/white.css'
  import {
    TextInput,
    Select,
    SelectItem,
    Modal,
    ModalBody
  } from 'carbon-components-svelte'
  import { onMount } from 'svelte'

  import { t } from '../utils/i18n'
  import {
    TwentyPercent as p20,
    TwentyPercentMidterm as p20_m
  } from '../utils/numbers'
  import { CalculateFunction } from '../utils/calculate'
  import { EventHandler } from '../utils/analytics'

  import Header from '../components/Header.svelte'
  import Table from '../components/Table.svelte'

  /* Variable Initialization */

  let opened = false
  let hasMidterm = true
  let selected = $t('midterm_is')

  let percent = 25
  let midterm_score = 100
  let projects = 100 - percent * 2

  let labelText
  let finals = [0, 0, 0, 0, 0]

  /* Making sure variable stays up to date */

  $: labelText = `${hasMidterm ? $t('each') : $t('midterm')} ${$t('weight')} (${
    hasMidterm ? '25, 30, 35' : '50, 60'
  })`
  $: hasMidterm = selected === $t('midterm_is')

  onMount(() => {
    const url = new URL(window.location)
    const searchParams = url.searchParams

    if (searchParams.get('midterm')) {
      hasMidterm = searchParams.get('midterm') === 'true'
      ChangeMidtermStatus()
    }
  })

  /* Functions */

  const ChangeMidtermStatus = () => {
    // Initialize the numbers for each midterm
    selected = hasMidterm ? $t('midterm_is') : $t('midterm_is_not')
    percent = hasMidterm ? 25 : 50
    projects = hasMidterm ? 100 - percent * 2 : 100 - percent

    // Send data
    EventHandler('Midterm Changed', {})
  }

  const ProgrammaticallyChange = () => {
    hasMidterm = !hasMidterm
    ChangeMidtermStatus()
  }

  const calculate = () => {
    finals = CalculateFunction(
      hasMidterm,
      percent,
      projects,
      midterm_score,
      open
    )
    EventHandler('Calculate Button', {})
  }

  // Short Functions
  const close = () => {
    opened = false
    EventHandler('Close', {})
  }
  const open = () => (opened = true)

  // invalid
  let percentageInvalid = false
  let midtermScoreInvalid = false
  let projectsInvalid = false

  $: percentageInvalid = hasMidterm
    ? percent !== 30 && percent !== 35 && percent !== 25
    : percent !== 50 && percent !== 60
  $: midtermScoreInvalid =
    midterm_score > 100 || midterm_score < 0 || midterm_score === null
  $: projectsInvalid =
    projects < 0 ||
    (hasMidterm ? projects < p20_m(percent) : projects < p20(percent)) ||
    (hasMidterm ? projects > 100 - percent * 2 : projects > 100 - percent)
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

<Header></Header>

<div class="mb20">
  <TextInput
    type="number"
    bind:value="{percent}"
    labelText="{percentageInvalid ? (hasMidterm ? $t('invalid_percent') : $t('invalid_percent_midterm')) : labelText}"
    warn="{percentageInvalid}"
  ></TextInput>
</div>
{#if hasMidterm}
<div class="mb20">
  <TextInput
    type="number"
    bind:value="{midterm_score}"
    labelText="{midtermScoreInvalid ? '0 ~ 100' : $t('midterm_score')}"
    warn="{midtermScoreInvalid}"
  ></TextInput>
</div>
{/if}
<div class="mb20">
  <TextInput
    type="number"
    bind:value="{projects}"
    labelText="{projectsInvalid ? `${hasMidterm ? p20_m(percent) : p20(percent)} ~ ${hasMidterm ? 100 - percent * 2 : 100 - percent}` : $t('perf_evaluation')}"
    warn="{projectsInvalid}"
  >
  </TextInput>
</div>

<button on:click="{calculate}" class="main-btn">{$t('calculate')}</button>

<Modal
  bind:open="{opened}"
  modalHeading="{$t('result')}"
  passiveModal
  selectorPrimaryFocus=".bx--modal-content"
>
  <ModalBody style="margin-top: auto; margin-bottom: auto">
    <Table
      bind:finals
      bind:percent
      bind:midterm_score
      bind:projects
      bind:hasMidterm
    ></Table>

    <div style="margin-top: 50px; margin-bottom: 50px">
      <button on:click="{close}" id="close" class="main-btn">
        {$t('close')}
      </button>
    </div>
  </ModalBody>
</Modal>
