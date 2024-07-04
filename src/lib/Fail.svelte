<script lang="ts">
  import { _ } from "@/i18n/i18n";

  import { Final, Percentage, Projects, Midterm } from "@/components/";

  /* Saved */
  const savedMidPer = parseInt(localStorage.getItem("midterm_percent")!);
  const savedNoMidPer = parseInt(localStorage.getItem("no_midterm_percent")!);

  /* LocalStorage Initialization */
  if (!localStorage.getItem("hasMid")) localStorage.setItem("hasMid", "true");

  /* Variable Initialization */
  let hasMid = localStorage.getItem("hasMid") === "true";
  let selected = hasMid ? $_("with_midterm") : $_("no_midterm");

  let percent = (hasMid ? savedMidPer : savedNoMidPer) || (hasMid ? 25 : 50);
  let mid_score = 100;
  let final_score = 100;
  let projects = hasMid ? 100 - percent * 2 : 100 - percent;

  let total_score = 100;

  $: {
    total_score = ((mid_score + final_score) * percent) / 100 + projects;
  }

  $: hasMid = selected === $_("with_midterm");
</script>

<div id="dynamic-div">
  <h1 class="mb25">방학에 나와야 <br /> 해요 계산기</h1>
</div>

<p style="text-align: justify">
  최소성취가 있는 과목은 총점수가 40점을 넘지 못하면 방학에 나와야 합니다.
</p>

<br />
<br />

<!-- Inputs -->
<Percentage bind:hasMid bind:percent></Percentage>
<Midterm bind:mid_score></Midterm>
<Projects bind:projects bind:percent bind:hasMid></Projects>
<Final bind:final_score></Final>

<div>
  {total_score}점

  <br />

  {#if total_score >= 40}
    <p>방학에 나오지 않습니다.</p>
    <br />
    <img
      src="https://st.depositphotos.com/1967477/1881/v/380/depositphotos_18812923-stock-illustration-happy-smiley-emoticon.jpg"
      alt="happy-face"
      width="100"
    />
  {:else}
    <p>어라! 방학에 나와야 해요 ㅠㅠ.</p>
    <br />
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwtn-MT37GDbi_0adhNamqKEsON_BVRbY_Yw&s"
      alt="angry-face"
      width="80"
    />
  {/if}
</div>
