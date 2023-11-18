<script>
  import { onMount } from "svelte";
  import { Modal } from "carbon-components-svelte";

  let showSurvey = false;

  onMount(() => {
    const hasResponded = getCookie("surveyResponded");
    if (!hasResponded) {
      showSurvey = true;
    }
  });

  const handleResponse = (response) => {
    setCookie("surveyResponded", "true", 7);

    if (response === "yes") {
      window.open("https://docs.google.com/forms/d/e/1FAIpQLSe5VcJlaD1irR_ptuADyoOKxZJsxuZgf8BNFcE06UcP5SaqyQ/viewform", "_blank");
    }

    showSurvey = false;
  };

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name) => {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  };
</script>

<Modal
  bind:open={showSurvey}
  modalHeading="Survey"
  iconDescription="close modal"
  primaryButtonText="예"
  secondaryButtonText="아니요"
  selectorPrimaryFocus=".bx--modal-content"
  on:click:button--primary={() => handleResponse("yes")}
  on:click:button--secondary={() => handleResponse("no")}
>
  <div style="margin: 5px; margin-bottom: 30px;">
    <h2>설문조사에 참여하시겠습니까?</h2>
  </div>
</Modal>
