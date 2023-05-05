<script>
  import { t } from '@/i18n/i18n'
  import { Event } from '@/utils/analytics'

  const ClickedLink = () => {
    Event('Programmer Link')
  }
</script>

<h1>{$t('app_title')}</h1>
<p class="mb50">
  <span>MIT License</span>
  <span> · </span>
  {$t('developer')}
  <a
    href="https://github.com/hslee2008"
    rel="noreferrer"
    target="_blank"
    on:click|once="{ClickedLink}"
  >
    @{$t('name')}
  </a>
</p>
