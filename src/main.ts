import './css/app.css'
import './css/carbon-components-svelte.css'
import './css/custom.css'
import App from './App.svelte'

const app = new App({
  target: document.querySelector('#app')
})

export default app
