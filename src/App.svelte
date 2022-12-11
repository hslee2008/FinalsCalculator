<script>
  // @ts-nocheck
  import AtLeast from './lib/AtLeast.svelte'
  import { GoogleAnalytics } from "@beyonk/svelte-google-analytics";
</script>

<main>
  <GoogleAnalytics properties={['G-PV930WQQFT']} />

  <div class="card">
    <AtLeast />
  </div>
</main>
