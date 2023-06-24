<script>
  /* Imports */
  import {
    Select,
    SelectItem,
    Modal,
    ModalBody,
    Checkbox
  } from 'carbon-components-svelte'
  import { onMount } from 'svelte'

  import { t } from '@/i18n/i18n'
  import { TableCalculation } from '@/utils/calculate'
  import { Event } from '@/utils/analytics'

  import Header from './Header.svelte'
  import Table from './Table.svelte'
  import InputPercentage from './Input/Percentage.svelte'
  import InputProjects from './Input/Projects.svelte'
  import InputMidterm from './Input/Midterm.svelte'

  /* Saved */
  const savedMidPer = parseInt(localStorage.getItem('midterm_percent'))
  const savedNoMidPer = parseInt(localStorage.getItem('no_midterm_percent'))

  /* LocalStorage Initialization */
  if (!localStorage.getItem('hasMid')) {
    localStorage.setItem('hasMid', true)
  }

  /* Variable Initialization */
  let opened = false
  let hasMid = localStorage.getItem('hasMid') === 'true'
  let selected = hasMid ? $t('with_midterm') : $t('no_midterm')

  /*
    The default percentage:
    - If Midterm, 25% for midterm, 50% for projects
    - If No Midterm, 50% for midterm, 50% for projects
  */
  let percent = (hasMid ? savedMidPer : savedNoMidPer) || (hasMid ? 25 : 50)
  let mid_score = 100
  let projects = hasMid ? 100 - percent * 2 : 100 - percent
  let hasDecimalScore = false

  let finals = [0, 0, 0, 0, 0]

  $: hasMid = selected === $t('with_midterm')

  /*
    Prioritization: LocalStorage > URL > Default
  */
  onMount(() => {
    const url = new URL(window.location)
    const searchParams = url.searchParams

    // For PWA shortcuts
    if (searchParams.get('midterm')) {
      hasMid = searchParams.get('midterm') === 'true'
      ChangeMidtermStatus()
    }
  })

  /* Functions */
  const ChangeMidtermStatus = () => {
    // Initialize the numbers for each midterm
    if (hasMid) {
      selected = $t('with_midterm')
      percent = savedMidPer || 25
      mid_score = 100
      projects = 100 - percent * 2
    } else {
      selected = $t('no_midterm')
      percent = savedNoMidPer || 50
      mid_score = 0
      projects = 100 - percent
    }

    localStorage.setItem('hasMid', hasMid)
    Event('Midterm Changed', {
      midterm: hasMid
    })
  }

  // For testing
  const yesMid = () => {
    hasMid = true
    ChangeMidtermStatus()
  }
  const noMid = () => {
    hasMid = false
    ChangeMidtermStatus()
  }

  // Only calculate
  const CalculateTable = () => {
    finals = TableCalculation(
      hasMid,
      percent,
      projects,
      mid_score,
      hasDecimalScore,
      open
    )
  }

  // Calculate with event
  const calculate = () => {
    CalculateTable()
    Event('Calculate Button', {})
  }

  // Automatically update table when decimal is changed
  const onChangeDecimal = () => {
    CalculateTable()
    Event('Decimal Changed', {
      decimal: hasDecimalScore
    })
  }

  // Automatically update projects value when percent is changed
  const UpdateProjects = () => {
    if (hasMid) {
      projects = 100 - percent * 2
      localStorage.setItem('midterm_percent', percent)
    } else {
      projects = 100 - percent
      localStorage.setItem('no_midterm_percent', percent)
    }
  }

  // Dialog functions
  const close = () => (opened = false)
  const open = () => (opened = true)
</script>

<button data-testid="yes-mid" on:click="{yesMid}"></button>
<button data-testid="no-mid" on:click="{noMid}"></button>

<Select on:change="{ChangeMidtermStatus}" bind:selected size="xl" class="mb20">
  <SelectItem value="{$t('with_midterm')}"></SelectItem>
  <SelectItem value="{$t('no_midterm')}"></SelectItem>
</Select>

<Header></Header>

<InputPercentage bind:hasMid bind:percent {UpdateProjects}></InputPercentage>
{#if hasMid}
<InputMidterm bind:mid_score></InputMidterm>
{/if}
<InputProjects bind:projects bind:percent bind:hasMid></InputProjects>

<button on:click="{calculate}" class="main-btn mt10">{$t('calculate')}</button>

<Modal
  bind:open="{opened}"
  modalHeading="{$t('result')}"
  passiveModal
  selectorPrimaryFocus=".bx--modal-content"
>
  <ModalBody>
    <Table
      bind:finals
      bind:percent
      bind:mid_score
      bind:projects
      bind:hasMid
    ></Table>

    <Checkbox
      on:change="{onChangeDecimal}"
      bind:checked="{hasDecimalScore}"
      labelText="{$t('decimal_score')}"
      class="mb10 mt25"
    ></Checkbox>

    <button on:click="{close}" id="close" class="main-btn mt10 mb25">
      {$t('close')}
    </button>
  </ModalBody>
</Modal>
