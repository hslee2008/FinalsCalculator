import { ga } from '@beyonk/svelte-google-analytics'

function Event(event_name, object) {
  ga.addEvent(event_name, object)
}

export { Event }
