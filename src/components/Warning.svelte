<script>
  import { t } from '../utils/i18n'

  export let number_wrong = false
</script>

{#if number_wrong}
<div
  style="display: flex; justify-content: center; color: red; margin-top: 5px"
>
  {$t('number_wrong')}
</div>
{/if}
