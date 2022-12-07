<script>
  import { Textfield, Button } from 'svelte-mui';
  import Dialog from './Dialog.svelte'
  import Carousel from 'svelte-carousel'

  let dialog
  let carousel

  const handleNextClick = () => {
    carousel.goToNext()
  }

  let percent = 30;
  let projectsFull = 100 - percent * 2
  let midterm = 100;
  let projects = projectsFull;

  let final_A = 0;
  let final_B = 0;
  let final_C = 0;
  let final_D = 0;

  $: projectsFull = 100 - percent * 2

  const parsePercent = (/** @type {number} */ a) => (Math.round(100 * ((percent - a) / percent)))

  const calculate = () => {
    const minus = Math.round(- (projectsFull - projects) - (percent - (midterm / 100 * percent)))

    final_A = parsePercent(10.5 + minus)
    final_B = parsePercent(20.5 + minus)
    final_C = parsePercent(30.5 + minus)
    final_D = parsePercent(40.5 + minus)

    dialog.showModal()
  }
</script>

<Textfield type="text" bind:value={percent} label={
  `중간, 기말 시험의 비율을 입력하세요. (예: 각 35 또는 30)`
} />
<Textfield type="text" bind:value={midterm} label={
  `중간고사 시험 성적 (예: 90)`
} />
<Textfield type="text" bind:value={projects} label={
  `수행평가 성적 (${projectsFull - 1} / ${projectsFull})`
} />

<Button
  outlined
  shaped
  color="Red"
  on:click={calculate}
>
  계산!
</Button>

<Dialog bind:dialog>
  <Carousel
    bind:this={carousel}
  >
    <div>
      {#if final_A > 100}
        <h1>😢 A는 불가능 😢</h1>
      {:else}
        <h1>최소 A</h1>
        <p>기말고사에서 {final_A}점 맞아야 합니다.</p>
      {/if}
    </div>
    <div>
      {#if final_B > 100}
        <h1>😢 B는 불가능 😢</h1>
      {:else}
        <h1>최소 B</h1>
        <p>기말고사에서 {final_B}점 맞아야 합니다.</p>
      {/if}
    </div>
    <div>
      {#if final_C > 100}
        <h1>😢 C는 불가능 😢</h1>
      {:else}
        <h1>최소 C</h1>
        {#if final_C < 0}
          <p>C는 이미 확정!</p>
        {:else}
          <p>기말고사에서 {final_C}점 맞아야 합니다.</p>
        {/if}
      {/if}
    </div>
    <div>
      <h1>최소 D</h1>
      {#if final_D < 0}
        <p>D는 이미 확정!</p>
      {:else}
        <p>기말고사에서 {final_D}점 맞아야 합니다.</p>
      {/if}
    </div>
  </Carousel>

  <Button
    outlined
    shaped
    color="Red"
    on:click={() => dialog.close()}
  >
    닫기
  </Button>
</Dialog>
