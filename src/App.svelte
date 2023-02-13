<script>
  import Calculator from './lib/Calculator.svelte'
  import { GoogleAnalytics } from "@beyonk/svelte-google-analytics";
</script>

<GoogleAnalytics properties={['G-PV930WQQFT']} />

<main>
  <div class="card">
    <Calculator />
  </div>
</main>
