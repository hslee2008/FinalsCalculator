<script>
  import { TextInput } from 'carbon-components-svelte'
  import { t, translated } from '../i18n/i18n'
  import { parseResult, findGrade } from '../utils/numbers'
  import { NormalCalculation } from '../utils/calculate'

  export let finals = [0, 0, 0, 0, 0]
  export let percent = 25
  export let midterm_score = 100
  export let projects = 100 - percent * 2
  export let hasMidterm = true

  let rows
  let finals_score
  let finals_input_grade
  let finals_invalid
  let with_finals_grade = translated('input_finals')

  $: {
    if (finals_score || finals_score === 0) {
      const calculated = NormalCalculation(
        hasMidterm,
        percent,
        projects,
        midterm_score,
        finals_score
      )
      finals_input_grade = findGrade(calculated)

      with_finals_grade = `${
        Math.round(calculated * 100) / 100
      } (${finals_input_grade})`
    } else {
      with_finals_grade = translated('input_finals')
    }
  }

  $: finals_invalid = finals_score > 100 || finals_score < 0

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
        <th scope="col" data-header="grade" class="grade-row">
          <div class="bx--table-header-label">{$t('grade')}</div>
        </th>
        <th scope="col" data-header="lowest">
          <div class="bx--table-header-label">{$t('lowest')}</div>
        </th>
      </tr>
    </thead>
    <tbody aria-live="polite">
      {#each ['A', 'B', 'C', 'D', 'E'] as grade, i}
      <tr
        class="{finals_input_grade === grade && finals_score !== null && !finals_invalid ? 'bordered' : ''}"
      >
        <td>{grade}</td>
        <td>{rows[i].lowest}</td>
      </tr>
      {/each}
    </tbody>
  </table>
  <TextInput
    type="number"
    bind:value="{finals_score}"
    placeholder="{$t('input_finals')}"
    helperText="{with_finals_grade}"
    warn="{finals_invalid}"
    warnText="0 ~ 100"
    size="xl"
    style="background-color: #f4f4f4"
  ></TextInput>
</div>
