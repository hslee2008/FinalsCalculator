import { initializeApp } from 'firebase/app'
import { getPerformance } from 'firebase/performance'

const firebaseConfig = {
  apiKey: 'AIzaSyC2lz9HjMXRxtjsRa_XkeQ8TGqDTay5HTo',
  authDomain: 'finalscalcu.firebaseapp.com',
  projectId: 'finalscalcu',
  storageBucket: 'finalscalcu.appspot.com',
  messagingSenderId: '280421481200',
  appId: '1:280421481200:web:8b30f6fcc87be29ec02035',
  measurementId: 'G-PV930WQQFT'
}

export const initializeFirebasePerformance = () =>
  getPerformance(initializeApp(firebaseConfig))
