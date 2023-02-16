<script>
  import Calculator from './layout/Calculator.svelte'
  import Formula from './layout/Formula.svelte'

  import { OverflowMenu, OverflowMenuItem } from 'carbon-components-svelte'
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'

  let showCalculator = true

  const Show = () => (showCalculator = true)
  const Switch = () => (showCalculator = false)
</script>

<GoogleAnalytics properties={['G-PV930WQQFT']} />

<main>
  <div class="card">
    {#if showCalculator}
    <Calculator></Calculator>
    {:else}
    <Formula></Formula>
    {/if}
  </div>
</main>

<OverflowMenu
  style="position: absolute; right: 0; bottom: 0"
  direction="top"
  flipped
>
  <OverflowMenuItem text="기말고사 계산기" on:click="{Show}"></OverflowMenuItem>
  <OverflowMenuItem text="기말고사 공식" on:click="{Switch}"></OverflowMenuItem>
</OverflowMenu>
