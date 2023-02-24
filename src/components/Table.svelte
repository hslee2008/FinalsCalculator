<script>
  import { DataTable } from 'carbon-components-svelte'
  import { t } from '../utils/i18n'
  import { parseResult } from '../utils/parseResult'

  export let finals = [0, 0, 0, 0, 0]

  let rows
  let headers = [
    { key: 'grade', value: $t('grade') },
    { key: 'lowest', value: $t('lowest') }
  ]

  $: rows = finals.map((grade, index) => {
    const LetterGrade = String.fromCharCode(65 + index)

    return {
      id: LetterGrade,
      grade: LetterGrade,
      lowest: parseResult(grade)
    }
  })
</script>

<DataTable bind:headers bind:rows style="margin-top: 25px"></DataTable>
