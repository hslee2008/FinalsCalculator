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

  import Header from '@/components/Header.svelte'
  import Table from '@/components/Table.svelte'
  import InputPercentage from '@/components/Input/Percentage.svelte'
  import InputProjects from '@/components/Input/Projects.svelte'
  import InputMidterm from '@/components/Input/Midterm.svelte'

  /* Saved */
  const savedMidtermPercent = parseInt(localStorage.getItem('midterm_percent'))
  const savedNoMidtermPercent = parseInt(
    localStorage.getItem('no_midterm_percent')
  )

  /* Variable Initialization */
  let opened = false
  let hasMid = true
  let selected = $t('midterm_is')

  /*
    The default percentage:
    - If Midterm, 25% for midterm, 50% for projects
    - If No Midterm, 50% for midterm, 50% for projects
  */
  let percent = savedMidtermPercent || 25
  let mid_score = 100
  let projects = 100 - percent * 2
  let hasDecimalScore = false

  let finals = [0, 0, 0, 0, 0]

  $: hasMid = selected === $t('midterm_is')

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
      selected = $t('midterm_is')
      percent = savedMidtermPercent || 25
      mid_score = 100
      projects = 100 - percent * 2
    } else {
      selected = $t('midterm_is_not')
      percent = savedNoMidtermPercent || 50
      mid_score = 0
      projects = 100 - percent
    }

    Event('Midterm Changed', {
      midterm: hasMid
    })
  }

  // For testing
  const ProgrammaticallyChange = () => {
    hasMid = !hasMid
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
  const close = () => {
    opened = false
    Event('Close', {})
  }
  const open = () => (opened = true)
</script>

<button data-testid="switch-mid" on:click="{ProgrammaticallyChange}"></button>

<Select on:change="{ChangeMidtermStatus}" bind:selected class="mb20">
  <SelectItem value="{$t('midterm_is')}"></SelectItem>
  <SelectItem value="{$t('midterm_is_not')}"></SelectItem>
</Select>

<Header></Header>

<InputPercentage bind:hasMid bind:percent {UpdateProjects}></InputPercentage>
{#if hasMid}
<InputMidterm bind:mid_score></InputMidterm>
{/if}
<InputProjects bind:projects bind:percent bind:hasMid></InputProjects>

<button on:click="{calculate}" class="main-btn">{$t('calculate')}</button>

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

    <div class="mb20">
      <Checkbox
        on:change="{onChangeDecimal}"
        bind:checked="{hasDecimalScore}"
        labelText="{$t('has_decimal_score')}"
      ></Checkbox>
    </div>

    <button on:click="{close}" id="close" class="main-btn mb50">
      {$t('close')}
    </button>
  </ModalBody>
</Modal>
