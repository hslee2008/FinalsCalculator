<script>
  import { Modal, ModalBody } from 'carbon-components-svelte'
  import { t } from '../i18n/i18n'
  import { Event, GetUserPlatform } from '../utils/analytics'

  let sec_dev = false

  const OpenSecDev = () => (sec_dev = true)
</script>

<h1>{$t('app_title')}</h1>
<p class="mb50">
  <span>
    <span>MIT License</span>
    <span on:click|once="{OpenSecDev}"> · </span>
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

<Modal
  bind:open="{sec_dev}"
  modalHeading="개발자 페이지"
  passiveModal
  selectorPrimaryFocus=".bx--modal-content"
>
  <ModalBody>
    <div
      class="bx--data-table-container"
      style="margin-top: 25px; margin-bottom: 25px"
    >
      <table class="bx--data-table">
        <thead>
          <tr>
            <th scope="col" data-header="grade">
              <div class="bx--table-header-label">해당 항목</div>
            </th>
            <th scope="col" data-header="lowest">
              <div class="bx--table-header-label">해당 설명</div>
            </th>
          </tr>
        </thead>
        <tbody aria-live="polite">
          <tr>
            <td>업데이트</td>
            <td>
              {new Date(document.lastModified).toISOString().substr(0, 10)}
            </td>
          </tr>
          <tr>
            <td>플랫폼</td>
            <td>{GetUserPlatform()}</td>
          </tr>
          <tr>
            <td>언어</td>
            <td>{navigator.language}</td>
          </tr>
          <tr>
            <td>URL</td>
            <td>
              {window.location.toString().replace("https://finalscalcu.web.app/",
              "")}
            </td>
          </tr>
          <tr>
            <td>standalone</td>
            <td>
              {window.matchMedia && window.matchMedia('(display-mode: standalone)').matches}
            </td>
          </tr>
          <tr>
            <td>referrer</td>
            <td>{document.referrer}</td>
          </tr>
          {#if "getInstalledRelatedApps" in navigator}
          <tr>
            <td>앱</td>
            {#await navigator.getInstalledRelatedApps()}
            <td>Waiting...</td>
            {:then app}
            <td>{app}</td>
            {:catch error}
            <td>{error}</td>
            {/await}
          </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </ModalBody>
</Modal>
