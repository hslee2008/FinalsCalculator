<script>
  import { MetaTags } from 'svelte-meta-tags'
  import {
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'carbon-components-svelte'
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'
  import { t, currentLocale } from './utils/i18n'
  import { registerSW } from './utils/register-sw.js'
  import Calculator from './layout/Calculator.svelte'

  let open = false

  const openModal = () => (open = true)
  const closeModal = () => (open = false)
  const reloadAndUpdate = () => {
    window.location.reload()
    closeModal()
  }

  registerSW(openModal)

  const url = new URL(window.location)
  const searchParams = url.searchParams
  const properties = ['G-PV930WQQFT']

  let mediaQueryObj = window.matchMedia('(prefers-color-scheme: dark)')
  let isDarkMode = searchParams.get('dark') || mediaQueryObj.matches
</script>

<GoogleAnalytics {properties}></GoogleAnalytics>
<MetaTags
  title="{$t('app_title')}"
  description="{$t('app_description')}"
  additionalMetaTags="{[
    {
      name: 'theme-color',
      content: isDarkMode ? '#000000' : '#FFFFFF'
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: isDarkMode ? '#000000' : '#FFFFFF'
    },
    {
      name: 'msapplication-TileColor',
      content: isDarkMode ? '#000000' : '#FFFFFF'
    },
    {
      name: 'apple-mobile-web-app-title',
      content: $t('app_title')
    },
    {
      name: 'subject',
      content: $t('app_subject')
    },
    {
      name: 'author',
      content: $t('name')
    },
    {
      name: 'owner',
      content: $t('name')
    },
    {
      name: 'copyright',
      content: $t('name')
    },
    {
      name: 'language',
      content: currentLocale
    }
  ]}"
  additionalLinkTags="{[
    {
      rel: 'manifest',
      href: `/manifest/${isDarkMode ? 'dark' : 'light'}/manifest-${currentLocale}.json`
    }
  ]}"
></MetaTags>

<main>
  <div class="card">
    <Calculator></Calculator>
  </div>
</main>

<ComposedModal bind:open selectorPrimaryFocus=".bx--modal-content">
  <ModalHeader
    label="{$t('new_version')}"
    title="{$t('app_title')} {$t('new_version')}"
  ></ModalHeader>
  <ModalBody>
    <h6 style="margin-top: 10px">{$t('new_version_avail')}</h6>
    <h6 style="margin-top: 10px">{$t('quest')}</h6>

    <img src="/icon.png" alt="Logo" style="margin-top: 50px" width="250px" />

    <div style="margin-top: 50px; margin-bottom: 50px">
      <button on:click="{reloadAndUpdate}">{$t('yes')}</button>
      <button on:click="{closeModal}">{$t('no')}</button>
    </div>
  </ModalBody>
</ComposedModal>
