<script>
  import { NumberInput } from 'carbon-components-svelte'
  import { t } from '@/i18n/i18n'
  import { Event } from '@/utils/analytics'

  export let percent
  export let UpdateProjects
  export let hasMidterm

  let valid = true
  let labelText

  $: valid = hasMidterm
    ? percent === 30 || percent === 35 || percent === 25
    : percent === 50 || percent === 60
  $: labelText = `${hasMidterm ? $t('each') : $t('midterm')} ${$t('weight')} (${
    hasMidterm ? '25, 30, 35' : '50, 60'
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
    label="{!valid ? (hasMidterm ? $t('inval_per') : $t('inval_per_midterm')) : labelText}"
    warn="{!valid}"
    on:keyup="{UpdateProjects}"
    on:change="{FieldChanged}"
    hideSteppers
  ></NumberInput>
</div>
