<script>
  import Calculator from './layout/Calculator.svelte'
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'
</script>

<GoogleAnalytics properties={['G-PV930WQQFT']} />

<main>
  <div class="card">
    <Calculator></Calculator>
  </div>
</main>
