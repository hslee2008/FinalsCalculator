<script>
  import { NumberInput } from 'carbon-components-svelte'
  import { t } from '@/i18n/i18n'
  import { Event } from '@/utils/analytics'

  export let mid_score

  let invalid = false

  // Score must be between 0 and 100
  $: invalid =
    mid_score > 100 || mid_score < 0 || mid_score === null

  const FieldChanged = () => {
    Event('Field Changed', {
      field: 'Midterm Score',
      value: mid_score
    })
  }
</script>

<div class="mb20">
  <NumberInput
    bind:value="{mid_score}"
    on:change="{FieldChanged}"
    label="{invalid ? '0 ~ 100' : $t('mid_score')}"
    warn="{invalid}"
    hideSteppers
    min="0"
    max="100"
  ></NumberInput>
</div>
