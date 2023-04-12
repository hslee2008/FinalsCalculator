import 'carbon-components-svelte/css/white.css'
import './css/app.css'
import './css/carbon-components-svelte.css'
import './css/custom.css'
// @ts-ignore
import App from './App.svelte'

const app = new App({
  target: document.querySelector('#app')
})

export default app
