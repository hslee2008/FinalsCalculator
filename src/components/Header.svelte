<script>
  import { t } from '../i18n'

  export let title = '기말고사 계산기'
</script>

<h1>{title}</h1>
<p style="margin-bottom: 50px; color: grey">
  <span style="font-size: 13px"> {$t('developer')} </span>
  <a
    href="https://github.com/HyunseungLee-Travis"
    rel="noreferrer"
    target="_blank"
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
      font-size: 2rem;
    }
  }

  @media (max-width: 360px) {
    h1 {
      font-size: 1.5rem;
    }
  }
</style>
