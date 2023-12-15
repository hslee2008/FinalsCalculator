import { ga } from "@beyonk/svelte-google-analytics";

function Event(event_name: any, object: any) {
  ga.addEvent(event_name, object);
}

function GetUserPlatform(): string {
  const isStandalone =
    window.matchMedia &&
    window.matchMedia("(display-mode: standalone)").matches;
  const isPWA = isStandalone || (navigator as any).standalone;
  const isTWA = document.referrer.includes("android-app://");

  return isPWA ? "pwa" : isTWA ? "twa" : "web";
}

function SetUser() {
  Event(GetUserPlatform(), {});
}

export { Event, SetUser, GetUserPlatform };
