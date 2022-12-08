<script>
  import Counter from './lib/Counter.svelte'
</script>

<main>
  <div class="card">
    <Counter />
  </div>

  <p class="info">
    개발자 이현승 <a href="https://github.com/HyunseungLee-Travis/FinalsCalcualtor/blob/main/src/lib/Counter.svelte" rel="noreferrer" target="_blank">@HyunseungLee-Travis</a>
  </p>
</main>

<style>
  .info {
    color: #888;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 1em;
  }
</style>
