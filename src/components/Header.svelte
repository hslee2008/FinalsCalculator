<script>
  import { t } from '../utils/i18n'
</script>

<h1>{$t('app_title')}</h1>
<p style="margin-bottom: 50px; color: #575757">
  <span>v1.0.0</span>
  <span> · </span>
  <span style="font-size: 13px"> {$t('developer')} </span>
  <a href="https://github.com/hslee2008" rel="noreferrer" target="_blank">
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
  }

  @media (max-width: 360px) {
    h1 {
      font-size: 1.5rem;
    }
  }
</style>
