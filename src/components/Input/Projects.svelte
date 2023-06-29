<script>
  import { NumberInput } from 'carbon-components-svelte'
  import { p20, p20_m } from '@/utils/numbers'
  import { t } from '@/i18n/i18n'
  import { Event } from '@/utils/analytics'

  export let projects
  export let hasMid
  export let percent

  let invalid = false
  let min = 0
  let max = 100

  /*
    Out of 100, projects are the left over percentage of midterm and finals
    Usually, they have basic grade, which is mostly 20%
  */
  $: invalid = projects < 0

  $: if (hasMid) {
    min = p20_m(percent)
    max = 100 - percent * 2

    invalid ||= projects < p20_m(percent) || projects > 100 - percent * 2
  } else {
    min = p20(percent)
    max = 100 - percent

    invalid ||= projects < p20(percent) || projects > 100 - percent
  }

  const FieldChanged = () => {
    Event('Projects Field Changed', {
      field: 'Projects',
      value: projects
    })
  }
</script>

<div class="mb20">
  <NumberInput
    bind:value="{projects}"
    on:change="{FieldChanged}"
    {min}
    {max}
    warn="{invalid}"
    label="{invalid ? `${min} ~ ${max}` : $t('eval')}"
    size="xl"
  ></NumberInput>
</div>
