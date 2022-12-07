<script>
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
</script>

<main>
  <h1>기말고사 계산기</h1>

  <div class="card">
    <Counter />
  </div>

  <p class="info">
    개발자 이현승 @HyunseungLee-Travis
  </p>
</main>

<style>
  .info {
    color: #888;
  }
</style>
