import "carbon-components-svelte/css/white.css";
import "@/css/layout.css";
import "@/css/utility.css";
import "@/css/element.css";
import "@/css/header.css";
import "@/css/test.css";
import "@/css/3rd party.css";
import App from "./App.svelte";

const targetElement = document.getElementById("app");
const app = new App({
  target: targetElement ? targetElement : document.body,
});

export default app;
