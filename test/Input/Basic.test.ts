import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
// @ts-ignore
import Calculator from "@/components/Calculator/Finals.svelte";

describe("Proper Input", () => {
  beforeEach(() => render(Calculator));

  test("[Input 1] Changes Value", async () => {
    await fireEvent.click(screen.getByTestId("yes-mid"));
    const percentage = screen.getByLabelText(
      "Midterm and Finals weight (25, 30, 35)"
    );
    await fireEvent.input(percentage, { target: { value: "25" } });
    expect(percentage).toHaveValue(25);

    const midterm = screen.getByLabelText("Midterm Score");
    await fireEvent.input(midterm, { target: { value: "91" } });
    expect(midterm).toHaveValue(91);

    const perf = screen.getByLabelText("Performance Evaluation");
    await fireEvent.input(perf, { target: { value: "40" } });
    expect(perf).toHaveValue(40);
  });
});
