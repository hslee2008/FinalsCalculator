<script>
  export let number_wrong = false;
</script>

{#if number_wrong}
<div style="display: flex; justify-content: center; color: red; margin-top: 5px">
  입력하신 숫자가 잘못되었습니다.
</div>
{/if}
