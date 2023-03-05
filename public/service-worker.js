'use strict'

const CACHE_NAME = 'finals-calculator-v1.0.0'

const FILES_TO_CACHE = [
  '/images/24x24.png',
  '/images/32x32.png',
  '/images/48x48.png',
  '/images/64x64.png',
  '/images/96x96.png',
  '/images/128x128.png',
  '/images/256x256.png',
  '/images/512x512.png',
  '/images/1024x1024.png',
  '/images/maskable_icon.png',
  '/icon.png',
  '/manifest/light/manifest-ko-KR.json',
  '/manifest/light/manifest-en-US.json',
  '/manifest/dark/manifest-ko-KR.json',
  '/manifest/dark/manifest-en-US.json',
  'https://1.www.s81c.com/common/carbon/plex/fonts/IBM-Plex-Sans/fonts/split/woff2/IBMPlexSans-Regular-Latin1.woff2',
  'https://1.www.s81c.com/common/carbon/plex/fonts/IBM-Plex-Sans/fonts/split/woff2/IBMPlexSans-Light-Latin1.woff2',
  'https://1.www.s81c.com/common/carbon/plex/fonts/IBM-Plex-Mono/fonts/split/woff2/IBMPlexMono-Regular-Latin1.woff2',
  'https://1.www.s81c.com/common/carbon/plex/fonts/IBM-Plex-Sans/fonts/split/woff2/IBMPlexSans-SemiBold-Latin1.woff2'
]

self.addEventListener('install', evt => {
  console.log('[FinalsCalculator] Service Worker Install')

  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[FinalsCalculator] Pre-caching offline page')
      return cache.addAll(FILES_TO_CACHE)
    })
  )

  self.skipWaiting()
})

self.addEventListener('activate', evt => {
  console.log('[FinalsCalculator] Activate')
  // Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[FinalsCalculator] Removing old cache', key)
            return caches.delete(key)
          }
        })
      )
    })
  )

  self.clients.claim()
})

self.addEventListener('fetch', evt => {
  console.log('[FinalsCalculator] Fetch', evt.request.url)

  if (evt.request.mode !== 'navigate') return

  evt.respondWith(
    fetch(evt.request).catch(async () => {
      const cache = await caches.open(CACHE_NAME)
      return await cache.match('offline.html')
    })
  )
})
