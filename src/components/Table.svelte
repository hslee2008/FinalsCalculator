<script>
  import { DataTable, TextInput } from 'carbon-components-svelte'
  import { t } from '../utils/i18n'
  import { parseResult, findGrade } from '../utils/numbers'
  import { NormalCalculation } from '../utils/calculate'

  export let finals = [0, 0, 0, 0, 0]
  export let percent = 25
  export let midterm_score = 100
  export let projects = 100 - percent * 2
  export let hasMidterm = true

  let rows
  let headers = [
    { key: 'grade', value: $t('grade') },
    { key: 'lowest', value: $t('lowest') }
  ]

  let finals_score
  let with_finals_grade = '기말고사 점수를 입력해 주세요'

  $: {
    if (finals_score) {
      const calculated = NormalCalculation(
        hasMidterm,
        percent,
        projects,
        midterm_score,
        finals_score
      )

      with_finals_grade = `${Math.round(calculated)} (${findGrade(calculated)})`
    } else {
      with_finals_grade = '기말고사 점수를 입력해 주세요'
    }
  }

  $: rows = finals.map((grade, index) => {
    // Index 0 is A, 1 is B, etc.
    // A: 65, B: 66, etc.
    const LetterGrade = String.fromCharCode(65 + index)

    return {
      id: LetterGrade,
      grade: LetterGrade,
      lowest: parseResult(grade)
    }
  })
</script>

<div class="bx--data-table-container" style="margin-top: 25px">
  <table class="bx--data-table">
    <thead>
      <tr>
        <th scope="col" data-header="grade">
          <div class="bx--table-header-label">{$t('grade')}</div>
        </th>
        <th scope="col" data-header="lowest">
          <div class="bx--table-header-label">{$t('lowest')}</div>
        </th>
      </tr>
    </thead>
    <tbody aria-live="polite">
      <tr data-row="A">
        <td>A</td>
        <td>{rows[0].lowest}</td>
      </tr>
      <tr data-row="B">
        <td>B</td>
        <td>{rows[1].lowest}</td>
      </tr>
      <tr data-row="C">
        <td>C</td>
        <td>{rows[2].lowest}</td>
      </tr>
      <tr data-row="D">
        <td>D</td>
        <td>{rows[3].lowest}</td>
      </tr>
      <tr data-row="E">
        <td>E</td>
        <td>{rows[4].lowest}</td>
      </tr>
    </tbody>
  </table>
  <TextInput
    type="number"
    bind:value="{finals_score}"
    placeholder="기말고사 점수 입력"
    helperText="{with_finals_grade}"
    style="background-color: #f4f4f4"
  ></TextInput>
</div>
