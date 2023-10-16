<script>
  import { Select, SelectItem } from 'carbon-components-svelte'
  import { _ } from '@/i18n/i18n'

  export let hasMid
  export let selected
  export let ChangeMidtermStatus


  // For testing
  const yesMid = () => {
    hasMid = true
    ChangeMidtermStatus()
  }
  const noMid = () => {
    hasMid = false
    ChangeMidtermStatus()
  }

</script>

<button data-testid="yes-mid" on:click="{yesMid}"></button>
<button data-testid="no-mid" on:click="{noMid}"></button>

<Select on:change="{ChangeMidtermStatus}" bind:selected  class="mb20">
  <SelectItem value="{$_('with_midterm')}"></SelectItem>
  <SelectItem value="{$_('no_midterm')}"></SelectItem>
</Select>
