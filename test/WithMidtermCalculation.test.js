import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import Calculator from "@/components/Calculator/Finals.svelte";
import WithMidterm from "./data/WithMidterm.json";

beforeEach(() => render(Calculator));

test.each(WithMidterm.datas)(
  "Calculate %i percentage, %i midterm, %i performance evaluation",
  async (percentage, midterm, performanceEvaluation, expected) => {
    const weight = screen.getByLabelText(
      "Midterm and Finals weight (25, 30, 35)"
    );
    const midtermScore = screen.getByLabelText("Midterm Score");
    const performEval = screen.getByLabelText("Performance Evaluation");

    await fireEvent.input(weight, { target: { value: percentage.toString() } });
    await fireEvent.input(midtermScore, {
      target: { value: midterm.toString() },
    });
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
