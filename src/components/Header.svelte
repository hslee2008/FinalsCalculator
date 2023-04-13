<script>
  import { t } from '../i18n/i18n'
  import { Event } from '../utils/analytics'
</script>

<h1>{$t('app_title')}</h1>
<p class="mb50">
  <span>
    <span>MIT License</span>
    <span> · </span>
  </span>
  {$t('developer')}
  <a
    href="https://github.com/hslee2008"
    rel="noreferrer"
    target="_blank"
    on:click="{() => Event('Programmer Link')}"
  >
    @{$t('name')}
  </a>
</p>
