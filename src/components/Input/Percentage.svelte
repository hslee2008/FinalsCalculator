<script>
  import { NumberInput } from 'carbon-components-svelte'
  import { t } from '@/i18n/i18n'
  import { Event } from '@/utils/analytics'

  export let percent
  export let UpdateProjects
  export let hasMid

  let invalid = false
  let labelText

  /*
    Korean Middle School education system usually have
    30, 35, 25 or 50, 60 as the weight of midterm and final exam
  */
  $: invalid = !(hasMid
    ? percent === 30 || percent === 35 || percent === 25
    : percent === 50 || percent === 60)

  // Example "중간과 기말 각 비율 (25, 30, 35)"
  $: labelText = `${hasMid ? $t('each') : $t('midterm')} ${$t('weight')} (${
    hasMid ? '25, 30, 35' : '50, 60'
  })`

  const FieldChanged = () => {
    Event('Field Changed', {
      field: 'Percentage',
      value: percent
    })
  }
</script>

<div class="mb20">
  <NumberInput
    bind:value="{percent}"
    label="{invalid ? (hasMid ? $t('inval_mid') : $t('inval_no_mid')) : labelText}"
    warn="{invalid}"
    on:keyup="{UpdateProjects}"
    on:change="{FieldChanged}"
    size="xl"
    hideSteppers
  ></NumberInput>
</div>
