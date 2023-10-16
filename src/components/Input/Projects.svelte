<script>
  import { NumberInput } from 'carbon-components-svelte'
  import { _ } from '@/i18n/i18n'
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
  $: invalid =
    projects < 0 ||
    (hasMid ? projects > 100 - percent * 2 : projects > 100 - percent)

  $: if (hasMid) {
    min = 0
    max = 100 - percent * 2
  } else {
    min = 0
    max = 100 - percent
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
    label="{invalid ? `${min} ~ ${max}` : $_('eval')}"
    size="xl"
    translateWithId="{(id) => $_(`ID${id}`)}"
  ></NumberInput>
</div>
