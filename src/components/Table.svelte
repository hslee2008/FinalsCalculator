<script>
  import { DataTable } from 'carbon-components-svelte'

  const parseNumber = (/** @type {number} */ a) =>
    a < 0 ? '확정' : a > 100 ? '불가능' : `${a}점`

  export let finals = [0, 0, 0, 0, 0, 0]
</script>

<h1 style="margin-bottom: 15px; margin-top: 15px">결과</h1>

<DataTable
  headers="{[
    { key: 'grade', value: '학점' },
    { key: 'lowest', value: '기말 최저 점수' }
  ]}"
  rows="{[
    { id: 'A', grade: 'A', lowest: parseNumber(finals[0]) },
    { id: 'B', grade: 'B', lowest: parseNumber(finals[1]) },
    { id: 'C', grade: 'C', lowest: parseNumber(finals[2]) },
    { id: 'D', grade: 'D', lowest: parseNumber(finals[3]) },
    { id: 'E', grade: 'E', lowest: parseNumber(finals[4]) },
    { id: 'F', grade: 'F', lowest: parseNumber(finals[5]) }
  ]}"
></DataTable>
