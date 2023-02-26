export async function registerSW(callback) {
  if ('serviceWorker' in navigator) {
    const sw = await navigator.serviceWorker.register('service-worker.js')

    sw.addEventListener('updatefound', () => {
      const installingWorker = sw.installing

      console.log(
        '%c[FinalsCalculator] Service Worker Update Found',
        'color: green'
      )

      installingWorker.addEventListener('statechange', () => {
        console.log(
          '%c[FinalsCalculator] Service Worker State Change Detected',
          'color: green'
        )

        if (
          installingWorker.state === 'installed' &&
          navigator.serviceWorker.controller
        )
          callback()
      })
    })
  }
}
