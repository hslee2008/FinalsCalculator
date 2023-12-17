/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "hyunseung-svelte-tabs";
declare module "hyunseung-svelte-google-analytics";

declare module "*.svelte";
declare module "@/components/*";
declare module "@/config/*";
declare module "@/css/*";
declare module "@/i18n/*";
declare module "@/lib/*";
declare module "@/utils/*";

// edit document interface
interface Document {
  startViewTransition: (Function) => void;
}
declare const document: Document;
