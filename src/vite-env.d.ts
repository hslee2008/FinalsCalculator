/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "svelte-tabs";
declare module "@beyonk/svelte-google-analytics";

declare module "*.svelte";
declare module "@/utils/*";
declare module "@/i18n/*";
declare module "@/config/*";

// edit document interface
interface Document {
  startViewTransition: (Function) => void;
}
declare const document: Document;