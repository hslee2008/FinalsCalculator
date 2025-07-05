<script lang="ts">
  import { NumberInput } from "carbon-components-svelte";
  import { _, translateJS } from "@/i18n/i18n";
  import { percentToString, percentToGrade } from "@/utils/numbers";
  import { CalculateFinalsScore } from "@/utils/calculate";
  import { debounce } from 'lodash-es'; 

  export let finals: [number, number, number, number, number] = [0, 0, 0, 0, 0];
  export let percent: number = 25;
  export let mid_score: number = 100;
  export let projects: number = 100 - percent * 2;
  export let hasMid: boolean = true;

  let rows: { id: string; grade: string; lowest: string }[] = [];
  let finals_score: number;
  let finals_input_grade: number;
  let finals_invalid = false;
  let with_finals_grade = translateJS("input_finals_helper");

  const gradeList = ["A", "B", "C", "D", "E"];

  $: {
    if (finals_score || finals_score === 0) {
      // Calculate finals score if it is not null
      const calculated = CalculateFinalsScore(
        hasMid,
        percent,
        projects,
        mid_score,
        finals_score
      );
      finals_input_grade = percentToGrade(calculated);

      // Display finals score in helper text format
      with_finals_grade = `${
        Math.round(calculated * 100) / 100
      } (${finals_input_grade})`;
    } else {
      // Input is empty
      with_finals_grade = translateJS("input_finals_helper");
    }
  }

  // Score must be between 0 and 100
  $: finals_invalid = finals_score > 100 || finals_score < 0;

  $: rows = finals.map((grade, index) => {
    // Index 0 is A, 1 is B, 2 is C, 3 is D, 4 is E
    // A: 65, B: 66, C: 67, D: 68, E: 69
    const LetterGrade = String.fromCharCode(65 + index);

    return {
      id: LetterGrade,
      grade: LetterGrade,
      lowest: percentToString(grade),
    };
  });

  const viewTransition = () => {
    const shouldTransition = finals_invalid || finals_score === null;

    document.startViewTransition(() => {
      document
        .querySelector(`.${finals_input_grade}`)
        ?.classList.add("bordered");

      gradeList
        .filter(
          (grade) => grade !== finals_input_grade.toString() || shouldTransition
        )
        .forEach((grade) =>
          document.querySelector(`.${grade}`)?.classList.remove("bordered")
        );
    });
  };

  const debouncedViewTransition = debounce(viewTransition, 300);
</script>

<div class="bx--data-table-container table">
  <div class="bx--data-table-header">
    <div style="margin-right: 16px; ">
      <h4 class="bx--data-table-header__title">기말고사 계산기</h4>
      <p
        class="bx--data-table-header__description"
        style="text-align: justify; margin-top: 5px;"
      >
        중학교 성적 산출 시스템은 수행평가와 지필고사(중간, 기말)을 합산해서
        89.5점을 넘으면 A, 79.5점을 넘으면 B 등으로 계산한다. 다음은 최종적으로
        A, B, C, D, E를 받기 위해 기말고사에서 필요한 점수이다.
      </p>
    </div>
  </div>
  <table class="bx--data-table">
    <thead>
      <tr>
        <th scope="col" data-header="grade" class="grade-row">
          <div class="bx--table-header-label">{$_("grade")}</div>
        </th>
        <th scope="col" data-header="lowest">
          <div class="bx--table-header-label">{$_("lowest")}</div>
        </th>
      </tr>
    </thead>

    <tbody aria-live="polite">
      {#each ["A", "B", "C", "D"] as grade, index}
        <tr class={grade}>
          <td>{grade}</td>
          <td>{rows[index].lowest}</td>
        </tr>
      {/each}
      <tr class="E">
        <td>E</td>
        <td>{$_("secured")}</td>
      </tr>
    </tbody>
  </table>

  <NumberInput
    bind:value={finals_score}
    helperText={with_finals_grade}
    label={$_("input_finals_holder")}
    hideLabel
    warn={finals_invalid}
    warnText="0 ~ 100"
    translateWithId={(id) => $_(`ID${id}`)}
    size="xl"
    allowEmpty
    on:keyup={viewTransition}
    on:change={debouncedViewTransition}
    class="finals-input"
    placeholder={$_("input_finals_holder")}
  />
</div>
