async function registerSW() {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('service-worker.js')
  }
}

export { registerSW }
