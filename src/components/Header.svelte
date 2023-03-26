<script>
  import { t } from '../utils/i18n'
  import { EventHandler } from '../utils/analytics'
</script>

<h1>{$t('app_title')}</h1>
<p style="margin-bottom: 50px; color: #575757">
  <span>v23.3</span>
  <span> · </span>
  <span class="mit">
    <span>MIT License</span>
    <span> · </span>
  </span>
  <span style="font-size: 13px"> {$t('developer')} </span>
  <a
    href="https://github.com/hslee2008"
    rel="noreferrer"
    target="_blank"
    on:click="{() => EventHandler('Programmer Link')}"
  >
    @{$t('name')}
  </a>
</p>

<style>
  h1 {
    font-size: 3rem;
    line-height: 1.1;
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 410px) {
    h1 {
      font-size: 2rem;
    }

    .mit {
      display: none;
    }
  }

  @media (max-width: 360px) {
    h1 {
      font-size: 1.5rem;
    }
  }
</style>
