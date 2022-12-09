<script>
  import 'carbon-components-svelte/css/white.css'
  import { TextInput, Select, SelectItem } from 'carbon-components-svelte'
  // @ts-ignore
  import { Button } from 'svelte-mui'
  // @ts-ignore
  import Dialog from './Dialog.svelte'
  import Carousel from 'svelte-carousel'

  let dialog
  let carousel
  let whetherMidterm = true

  let percent = 30
  let projectsFull = 100 - percent * 2
  let midterm = 100
  let projects = projectsFull

  let final_A = 0
  let final_B = 0
  let final_C = 0
  let final_D = 0
  let final_E = 0
  let final_F = 0

  const change = () => {
    if (whetherMidterm) {
      percent = whetherMidterm ? 30 : 50
      projectsFull = 100 - percent * 2
      projects = projectsFull
    } else {
      percent = whetherMidterm ? 30 : 50
      projectsFull = 100 - percent
      projects = projectsFull
    }
  }

  const parsePercent = (/** @type {number} */ a) =>
    Math.round(100 * ((percent - a) / percent))

  const calculate = () => {
    projectsFull = 100 - percent * 2

    const minus = Math.round(
      -(projectsFull - projects) - (percent - (midterm / 100) * percent)
    )

    final_A = parsePercent(10.5 + minus)
    final_B = parsePercent(20.5 + minus)
    final_C = parsePercent(30.5 + minus)
    final_D = parsePercent(40.5 + minus)
    final_E = parsePercent(50.5 + minus)
    final_F = parsePercent(60.5 + minus)

    dialog.showModal()
  }

  const calculateWithoutMidterm = () => {
    projectsFull = 100 - percent

    const minus = Math.round(-(projectsFull - projects))

    final_A = parsePercent(10.5 + minus)
    final_B = parsePercent(20.5 + minus)
    final_C = parsePercent(30.5 + minus)
    final_D = parsePercent(40.5 + minus)
    final_E = parsePercent(50.5 + minus)
    final_F = parsePercent(60.5 + minus)

    dialog.showModal()
  }
</script>

<div style="margin-bottom: 20px">
  <Select
    labelText="중간"
    on:change={e => {
      whetherMidterm = e.detail === '중간있는 과목'
      change()
    }}
  >
    <SelectItem value="중간있는 과목" />
    <SelectItem value="중간없는 과목" />
  </Select>
</div>

<h1>기말고사 계산기</h1>
<p style="margin-bottom: 50px; color: grey;">
  개발자 이현승 <a href="https://github.com/HyunseungLee-Travis/FinalsCalcualtor/blob/main/src/lib/AtLeast.svelte" rel="noreferrer" target="_blank">@HyunseungLee-Travis</a> & 조천제
</p>

<div style="margin-bottom: 20px">
  <TextInput
    type="text"
    bind:value={percent}
    labelText={`지필고사 전체에 대한 비율 (30, 35, 40)`}
  />
</div>
{#if whetherMidterm}
  <div style="margin-bottom: 20px">
    <TextInput
      type="text"
      bind:value={midterm}
      labelText={`중간고사 시험 성적`}
    />
  </div>
{/if}
<div style="margin-bottom: 20px">
  <TextInput
    type="text"
    bind:value={projects}
    labelText={`수행평가 성적`}
  />
</div>

<Button
  outlined
  shaped
  color="Red"
  on:click={whetherMidterm ? calculate : calculateWithoutMidterm}>계산!</Button
>

<Dialog bind:dialog>
  <Carousel bind:this={carousel}>
    <div style="margin-bottom: 5px">
      {#if final_A > 100}
        <h1>A는 불가능</h1>
      {:else}
        <h1>최소 A</h1>
        <p>기말고사에서 {final_A}점 맞아야 합니다.</p>
      {/if}
    </div>
    <div style="margin-bottom: 5px">
      {#if final_B > 100}
        <h1>B는 불가능</h1>
      {:else}
        <h1>최소 B</h1>
        <p>기말고사에서 {final_B}점 맞아야 합니다.</p>
      {/if}
    </div>
    <div style="margin-bottom: 5px">
      {#if final_C > 100}
        <h1>C는 불가능</h1>
      {:else}
        <h1>최소 C</h1>
        {#if final_C < 0}
          <p>C는 이미 확정!</p>
        {:else}
          <p>기말고사에서 {final_C}점 맞아야 합니다.</p>
        {/if}
      {/if}
    </div>
    <div style="margin-bottom: 5px">
      <h1>최소 D</h1>
      {#if final_D < 0}
        <p>D는 이미 확정!</p>
      {:else}
        <p>기말고사에서 {final_D}점 맞아야 합니다.</p>
      {/if}
    </div>
    <div style="margin-bottom: 5px">
      <h1>최소 E</h1>
      {#if final_E < 0}
        <p>E는 이미 확정!</p>
      {:else}
        <p>기말고사에서 {final_E}점 맞아야 합니다.</p>
      {/if}
    </div>
    <div style="margin-bottom: 5px">
      <h1>최소 F</h1>
      {#if final_F < 0}
        <p>F는 이미 확정!</p>
      {:else}
        <p>기말고사에서 {final_F}점 맞아야 합니다.</p>
      {/if}
    </div>
  </Carousel>

  <p style="margin-top: 100px; margin-bottom: 10px;">
    실질적으로는 89.5, 79.5 등도 A, B입니다.
  </p>

  <div  >
    <Button outlined shaped color="Red" on:click={() => dialog.close()}>
      닫기
    </Button>
  </div>
</Dialog>
