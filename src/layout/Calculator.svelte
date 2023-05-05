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
  let hasMidterm = true
  let selected = $t('midterm_is')

  let percent = savedMidtermPercent || 25
  let midterm_score = 100
  let projects = 100 - percent * 2
  let hasDecimalScore = false

  let finals = [0, 0, 0, 0, 0]

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
    percent = hasMidterm
      ? savedMidtermPercent || 25
      : savedNoMidtermPercent || 50
    projects = hasMidterm ? 100 - percent * 2 : 100 - percent
    midterm_score = 100

    // Send data
    Event('Midterm Changed', {
      midterm: hasMidterm
    })
  }

  const ProgrammaticallyChange = () => {
    hasMidterm = !hasMidterm
    ChangeMidtermStatus()
  }

  const CalculateTable = () => {
    finals = TableCalculation(
      hasMidterm,
      percent,
      projects,
      midterm_score,
      hasDecimalScore,
      open
    )
  }

  const calculate = () => {
    CalculateTable()
    Event('Calculate Button', {})
  }

  const onChangeDecimal = () => {
    CalculateTable()
    Event('Decimal Changed', {
      decimal: hasDecimalScore
    })
  }

  const UpdateProjects = () => {
    if (hasMidterm) {
      projects = 100 - percent * 2
      localStorage.setItem('midterm_percent', percent)
    } else {
      projects = 100 - percent
      localStorage.setItem('no_midterm_percent', percent)
    }
  }

  // Short Functions
  const close = () => {
    opened = false
    Event('Close', {})
  }
  const open = () => (opened = true)
</script>

<button
  data-testid="switch"
  on:click="{ProgrammaticallyChange}"
  style="display: none"
></button>
<Select on:change="{ChangeMidtermStatus}" bind:selected class="mb20">
  <SelectItem value="{$t('midterm_is')}"></SelectItem>
  <SelectItem value="{$t('midterm_is_not')}"></SelectItem>
</Select>

<Header></Header>

<InputPercentage
  bind:hasMidterm
  bind:percent
  {UpdateProjects}
></InputPercentage>
{#if hasMidterm}
<InputMidterm bind:midterm_score></InputMidterm>
{/if}
<InputProjects bind:projects bind:percent bind:hasMidterm></InputProjects>

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
      bind:midterm_score
      bind:projects
      bind:hasMidterm
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
