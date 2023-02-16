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
    RadioTile
  } from 'carbon-components-svelte'

  import { parsePercent } from '../utils/parsePercent.ts'

  import Header from '../components/Header.svelte'
  import Table from '../components/Table.svelte'
  import Warning from '../components/Warning.svelte'

  let open
  let whetherMidterm = true
  let selected = '중간있는 과목'
  let number_wrong = false

  let percent = 30
  let midterm = 100
  let projects = 100 - percent * 2

  let labelText

  $: labelText = `${
    whetherMidterm ? '중간고사와 기말고사 각' : '중간고사'
  } 비율 (${whetherMidterm ? '30, 35' : '40, 50'})`

  $: whetherMidterm = selected === '중간있는 과목'

  let finals = [0, 0, 0, 0, 0, 0]

  const listCalculate = (/** @type {number} */ minus) => {
    for (let i = 0; i < 6; i++)
      finals[i] = parsePercent(percent, 10.5 + minus + i * 10)
  }

  const ChangedSelect = e => {
    whetherMidterm = selected === '중간있는 과목'
    percent = whetherMidterm ? 30 : 50
    projects = whetherMidterm ? 100 - percent * 2 : 100 - percent
  }

  const CalculateFunction = () => {
    number_wrong = validate()

    const projectsFull = whetherMidterm ? 100 - percent * 2 : 100 - percent
    const gotMinused = -(projectsFull - projects)
    let minus =
      -(projectsFull - projects) -
      (whetherMidterm ? percent - (midterm / 100) * percent : 0)

    listCalculate(minus)
    openDialog()
  }

  const validate = () => {
    const percentCheck = whetherMidterm
      ? projects > 100 - percent * 2
      : projects > 100 - percent
    const global = midterm > 100 || midterm < 0 || projects < 0
    const checkNull = midterm === null || projects === null || percent === null
    const checkEmpty = midterm === '' || projects === '' || percent === ''

    return percentCheck || global || checkNull || checkEmpty
  }

  function onKeyDown(e) {
    switch (e.keyCode) {
      case 67:
        open ? closeDialog() : CalculateFunction()
        break
      case 83:
        whetherMidterm = !whetherMidterm
        selected = whetherMidterm ? '중간있는 과목' : '중간없는 과목'
        break
    }
  }

  // Short Functions
  const closeDialog = () => (open = false)
  const openDialog = () => (open = true)
</script>

<div class="mb20">
  <Select on:change="{ChangedSelect}" bind:selected>
    <SelectItem value="중간있는 과목"></SelectItem>
    <SelectItem value="중간없는 과목"></SelectItem>
  </Select>
</div>

<Header title="기말고사 계산기"></Header>

<div class="mb20">
  <div class="mb20">
    <TextInput
      type="number"
      bind:value="{percent}"
      labelText="{labelText}"
    ></TextInput>
  </div>
</div>
{#if selected === '중간있는 과목'}
<div class="mb20">
  <TextInput
    type="number"
    bind:value="{midterm}"
    labelText="중간고사 성적"
  ></TextInput>
</div>
{/if}
<div class="mb20">
  <TextInput
    type="number"
    bind:value="{projects}"
    labelText="수행평가 성적"
  ></TextInput>
</div>

<button on:click="{CalculateFunction}">계산</button>

<ComposedModal bind:open>
  <ModalBody style="margin-top: auto; margin-bottom: auto">
    <Table finals="{finals}"></Table>
    <Warning bind:number_wrong></Warning>

    <div style="margin-bottom: 50px; margin-top: 50px">
      <button on:click="{closeDialog}">닫기</button>
    </div>
  </ModalBody>
</ComposedModal>

<svelte:window on:keydown="{onKeyDown}" />

<style>
  .mb20 {
    margin-bottom: 20px;
  }
</style>
