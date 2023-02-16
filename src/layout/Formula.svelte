<script>
  import katex from 'katex'
  import Header from '../components/Header.svelte'
  import { Select, SelectItem } from 'carbon-components-svelte'

  let selected = '중간있는 과목'
  let selectedGrade = 'A'
  let M = {
    A: 89.5,
    B: 79.5,
    C: 69.5,
    D: 59.5,
    E: 49.5,
    F: 39.5
  }

  let string

  $: string = katex.renderToString(
    `x ≥ 100 \\times \\lparen \\dfrac {${M[selectedGrade]} - e} {p} \\rparen${
      selected === '중간있는 과목' ? ' - m' : ''
    }`
  )
</script>

<Header title="기말고사 공식"></Header>
<div class="mb20">
  <Select bind:selected>
    <SelectItem value="중간있는 과목"></SelectItem>
    <SelectItem value="중간없는 과목"></SelectItem>
  </Select>
  <Select bind:selected="{selectedGrade}">
    <SelectItem value="A"></SelectItem>
    <SelectItem value="B"></SelectItem>
    <SelectItem value="C"></SelectItem>
    <SelectItem value="D"></SelectItem>
    <SelectItem value="E"></SelectItem>
    <SelectItem value="F"></SelectItem>
  </Select>
</div>

<div style="margin-top: 50px">
  <p><span class="mr10">x</span>는 기말고사 점수</p>
  {#if selected === '중간있는 과목'}
  <p><span class="mr10">m</span>는 중간고사 점수</p>
  {/if}
  <p><span class="mr10">e</span>는 수행평가 점수</p>
  <p><span class="mr10">p</span>는 기말고사/중간고사 비율</p>

  <div style="margin-top: 60px">{ @html string }</div>
</div>

<style>
  .mr10 {
    margin-right: 10px;
  }
</style>
