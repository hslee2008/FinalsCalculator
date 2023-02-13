<script>
  import 'carbon-components-svelte/css/white.css'
  import {
    TextInput,
    Select,
    SelectItem,
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    DataTable,
    TileGroup,
    RadioTile,
    InlineNotification
  } from 'carbon-components-svelte'

  let open
  let whetherMidterm = true
  let number_wrong = false

  let percent = 30
  let midterm = 100
  let projects = 100 - percent * 2

  let labelText

  $: labelText = `각 지필고사 전체에 대한 비율 (${
    whetherMidterm ? '30, 35' : '40, 50'
  })`

  let final_A = 0,
    final_B = 0,
    final_C = 0,
    final_D = 0,
    final_E = 0,
    final_F = 0

  const listParsePercent = (/** @type {number} */ minus) => {
    final_A = parsePercent(10.5 + minus)
    final_B = parsePercent(20.5 + minus)
    final_C = parsePercent(30.5 + minus)
    final_D = parsePercent(40.5 + minus)
    final_E = parsePercent(50.5 + minus)
    final_F = parsePercent(60.5 + minus)
  }

  const parsePercent = (/** @type {number} */ a) =>
    Math.ceil(100 * ((percent - a) / percent))

  const parseNumber = (/** @type {number} */ a) =>
    a < 0 ? '확정' : a > 100 ? '불가능' : a

  const calculate = () => {
    const projectsFull = 100 - percent * 2
    const gotMinused = -(projectsFull - projects)
    const minus = Math.round(gotMinused - (percent - (midterm / 100) * percent))

    listParsePercent(minus)

    open = true
  }

  const calculateWithoutMidterm = () => {
    const projectsFull = 100 - percent
    const gotMinused = -(projectsFull - projects)
    const minus = Math.round(gotMinused)

    listParsePercent(minus)

    open = true
  }

  const ChangedSelect = e => {
    whetherMidterm = e.detail === '중간있는 과목'
    percent = whetherMidterm ? 30 : 50
    projects = whetherMidterm ? 100 - percent * 2 : 100 - percent
  }

  const CalculateFunction = () => {
    number_wrong = validate()

    if (whetherMidterm) calculate()
    else calculateWithoutMidterm()
  }

  const closeDialog = () => (open = false)

  const validate = () => {
    let check = false
    const global = midterm > 100 || midterm < 0 || projects < 0
    const checkNull = midterm === '' || projects === ''

    if (whetherMidterm) check = projects > 100 - percent * 2
    else check = projects > 100 - percent

    return check || global || checkNull
  }

  function onKeyDown(e) {
    switch (e.keyCode) {
      case 67:
        open ? closeDialog() : CalculateFunction()
        break
    }
  }
</script>

<div class="mb20">
  <Select on:change="{ChangedSelect}">
    <SelectItem value="중간있는 과목"></SelectItem>
    <SelectItem value="중간없는 과목"></SelectItem>
  </Select>
</div>

<h1>기말고사 계산기</h1>
<p style="margin-bottom: 50px; color: grey">
  개발자
  <a
    href="https://github.com/HyunseungLee-Travis/FinalsCalcualtor/blob/main/src/lib/AtLeast.svelte"
    rel="noreferrer"
    target="_blank"
  >
    @이현승
  </a>
</p>

<div class="mb20">
  <div class="mb20">
    <TextInput
      type="text"
      bind:value="{percent}"
      labelText="{labelText}"
    ></TextInput>
  </div>
</div>
{#if whetherMidterm}
<div class="mb20">
  <TextInput
    type="text"
    bind:value="{midterm}"
    labelText="중간고사 시험 성적"
  ></TextInput>
</div>
{/if}
<div class="mb20">
  <TextInput
    type="text"
    bind:value="{projects}"
    labelText="수행평가 성적"
  ></TextInput>
</div>

<button on:click="{CalculateFunction}">계산</button>

<ComposedModal bind:open>
  <ModalBody style="margin-top: auto; margin-bottom: auto">
    <h1 style="margin-bottom: 15px; margin-top: 15px">결과</h1>

    <DataTable
      headers="{[
        { key: 'grade', value: '학점' },
        { key: 'lowest_score', value: '기말 최저 점수' }
      ]}"
      rows="{[
        { id: 'A', grade: 'A', lowest_score: parseNumber(final_A) },
        { id: 'B', grade: 'B', lowest_score: parseNumber(final_B) },
        { id: 'C', grade: 'C', lowest_score: parseNumber(final_C) },
        { id: 'D', grade: 'D', lowest_score: parseNumber(final_D) },
        { id: 'E', grade: 'E', lowest_score: parseNumber(final_E) },
        { id: 'F', grade: 'F', lowest_score: parseNumber(final_F) }
      ]}"
    ></DataTable>

    {#if number_wrong}
    <InlineNotification
      subtitle="입력하신 숫자가 잘못되었습니다."
    ></InlineNotification>
    {/if}

    <div style="margin-bottom: 50px; margin-top: 50px">
      <button on:click="{closeDialog}">닫기</button>
    </div>
  </ModalBody>
</ComposedModal>

<svelte:window on:keydown|preventDefault="{onKeyDown}" />

<style>
  h1 {
    font-size: 3rem;
    line-height: 1.1;
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 2rem;
    }
  }

  @media (max-width: 360px) {
    h1 {
      font-size: 1.5rem;
    }
  }

  .mb20 {
    margin-bottom: 20px;
  }
</style>
