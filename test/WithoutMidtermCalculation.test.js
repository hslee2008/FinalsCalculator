import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import Calculator from "@/components/Calculator/Finals.svelte";
import WithoutMidterm from "./data/WithoutMidterm.json";

beforeEach(() => render(Calculator));

test.each(WithoutMidterm.datas)(
  "Calculate %i percentage, %i performance evaluation",
  async (percentage, performanceEvaluation, expected) => {
    await fireEvent.click(screen.getByTestId("no-mid"));
    const weight = screen.getByLabelText("Finals weight (50, 60)");
    const performEval = screen.getByLabelText("Performance Evaluation");

    await fireEvent.input(weight, { target: { value: percentage.toString() } });
    await fireEvent.input(performEval, {
      target: { value: performanceEvaluation.toString() },
    });

    await fireEvent.click(screen.getByText("Calculate"));

    const grades = ["A", "B", "C", "D"];

    expected.forEach((value, index) => {
      const text = typeof value === "number" ? `${value}%` : value;
      expect(screen.getByTestId(grades[index])).toHaveTextContent(text);
    });
  }
);
