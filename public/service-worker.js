'use strict'

// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1'

// Add list of files to cache here.
const FILES_TO_CACHE = [
  '/images/16x16.png',
  '/images/24x24.png',
  '/images/32x32.png',
  '/images/48x48.png',
  '/images/64x64.png',
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
  console.log('[ServiceWorker] Install')

  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Pre-caching offline page')
      return cache.addAll(FILES_TO_CACHE)
    })
  )

  self.skipWaiting()
})

self.addEventListener('activate', evt => {
  console.log('[ServiceWorker] Activate')
  // Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
          }
        })
      )
    })
  )

  self.clients.claim()
})

self.addEventListener('fetch', evt => {
  console.log('[ServiceWorker] Fetch', evt.request.url)
  // Add fetch event handler here.
  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return
  }
  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.open(CACHE_NAME).then(cache => {
        return cache.match('offline.html')
      })
    })
  )
})
