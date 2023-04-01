import { ga } from '@beyonk/svelte-google-analytics'

function Event(event_name, object) {
  ga.addEvent(event_name, object)
}

function SetUser() {
  const isStandalone =
    window.matchMedia && window.matchMedia('(display-mode: standalone)').matches
  const isPwa = isStandalone || navigator.standalone
  const isTwa = document.referrer.includes('android-app://')

  let user_platform = 'web'

  if (isPwa) user_platform = 'pwa'
  else if (isTwa) user_platform = 'twa'

  ga.setUserProperties({
    user_platform
  })
}

export { Event, SetUser }
