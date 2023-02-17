<script>
  import { DataTable } from 'carbon-components-svelte'

  const parseNumber = (/** @type {number} */ a) =>
    a < 0 ? '확보' : a > 100 ? '불가능' : `${a}점`

  export let finals = [0, 0, 0, 0, 0, 0]

  let rows
  let headers = [
    { key: 'grade', value: '학점' },
    { key: 'lowest', value: '기말 최저 점수' }
  ]

  $: rows = finals.map((grade, index) => {
    const LetterGrade = String.fromCharCode(65 + index)

    return {
      id: LetterGrade,
      grade: LetterGrade,
      lowest: parseNumber(grade)
    }
  })
</script>

<h1 style="margin-bottom: 15px; margin-top: 15px">결과</h1>

<DataTable bind:headers bind:rows></DataTable>
