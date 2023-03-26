import { ga } from '@beyonk/svelte-google-analytics'

export function EventHandler(event_name, object) {
  ga.addEvent(event_name, object)
}
