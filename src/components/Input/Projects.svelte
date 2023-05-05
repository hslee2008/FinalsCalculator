<script>
  import { NumberInput } from 'carbon-components-svelte'
  import { p20, p20_m } from '@/utils/numbers'
  import { t } from '@/i18n/i18n'
  import { Event } from '@/utils/analytics'

  export let projects
  export let hasMidterm
  export let percent

  let invalid = false
  let min = 0
  let max = 100

  $: invalid =
    projects < 0 ||
    (hasMidterm ? projects < p20_m(percent) : projects < p20(percent)) ||
    (hasMidterm ? projects > 100 - percent * 2 : projects > 100 - percent)
  $: min = hasMidterm ? p20_m(percent) : p20(percent)
  $: max = hasMidterm ? 100 - percent * 2 : 100 - percent

  const FieldChanged = () => {
    Event('Field Changed', {
      field: 'Projects',
      value: projects
    })
  }
</script>

<div class="mb20">
  <NumberInput
    bind:value="{projects}"
    on:change="{FieldChanged}"
    hideSteppers
    {min}
    {max}
    label="{invalid ? `${min} ~ ${max}` : $t('eval')}"
  ></NumberInput>
</div>
