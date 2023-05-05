<script>
  import { NumberInput } from 'carbon-components-svelte'
  import { t } from '@/i18n/i18n'
  import { Event } from '@/utils/analytics'

  export let midterm_score

  let invalid = false

  $: invalid =
    midterm_score > 100 || midterm_score < 0 || midterm_score === null

  const FieldChanged = () => {
    Event('Field Changed', {
      field: 'Midterm Score',
      value: midterm_score
    })
  }
</script>

<div class="mb20">
  <NumberInput
    bind:value="{midterm_score}"
    on:change="{FieldChanged}"
    label="{invalid ? '0 ~ 100' : $t('mid_score')}"
    hideSteppers
    min="0"
    max="100"
  ></NumberInput>
</div>
