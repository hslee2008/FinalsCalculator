import 'carbon-components-svelte/css/white.css'
import '@/css/layout.css'
import '@/css/utility.css'
import '@/css/class.css'
import '@/css/element.css'
import '@/css/test.css'
import '@/css/carbon-components-svelte.css'
// @ts-ignore
import App from '@/App.svelte'

const app = new App({
  target: document.querySelector('#app')
})

export default app
