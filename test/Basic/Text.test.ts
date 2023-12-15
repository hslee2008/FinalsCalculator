import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
// @ts-ignore
import Calculator from "@/components/Calculator/Finals.svelte";

describe("Basic Rendering", () => {
  beforeEach(() => render(Calculator));

  test("[Header 1] Shows Proper Heading", () => {
    expect(screen.getByText("Finals Calculator")).toBeInTheDocument();
  });

  test("[Text 1] Shows Proper Text - With Midterm", async () => {
    await fireEvent.click(screen.getByTestId("yes-mid"));

    expect(
      screen.getByText("Midterm and Finals weight (25, 30, 35)")
    ).toBeInTheDocument();
    expect(screen.getByText("Midterm Score")).toBeInTheDocument();
    expect(screen.getByText("Performance Evaluation")).toBeInTheDocument();
  });

  test("[Text 2] Shows Proper Text - Without Midterm", async () => {
    await fireEvent.click(screen.getByTestId("no-mid"));

    expect(screen.getByText("Finals weight (50, 60)")).toBeInTheDocument();
    expect(screen.getByText("Performance Evaluation")).toBeInTheDocument();
  });
});
