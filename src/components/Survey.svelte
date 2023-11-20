<script>
  import { onMount } from "svelte";
  import { Modal } from "carbon-components-svelte";
  import { Event } from '@/utils/analytics'

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
      Event("Yes Survey", {});
      window.open("https://docs.google.com/forms/d/e/1FAIpQLSe5VcJlaD1irR_ptuADyoOKxZJsxuZgf8BNFcE06UcP5SaqyQ/viewform", "_blank");
    }

    if (response === "no") {
      Event("No Survey", {});
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
  on:close={() => handleResponse("no")}
  size="sm"
  on:click:button--primary={() => handleResponse("yes")}
  on:click:button--secondary={() => handleResponse("no")}
>
  <div style="margin: 5px; margin-bottom: 30px;">
    <h4>설문조사에 참여하시겠습니까?</h4>
    <br />
    <p>"아니요"를 누르거나 창을 닫으면 다시는 이 메시지를 보지 않게 됩니다.</p>
  </div>
</Modal>
