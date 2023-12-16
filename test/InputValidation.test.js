import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import Calculator from "@/components/Calculator/Finals.svelte";
import InputValidation from "./data/InputValidation.json";

beforeEach(() => render(Calculator));

test.each(InputValidation.datas)(
  "Error %s midterm (%s put in %i) expect error message %s",
  async ({ mid, label, value, error }) => {
    await fireEvent.click(screen.getByTestId(`${mid}-mid`));

    const input = screen.getByLabelText(label);
    await fireEvent.input(input, { target: { value: value.toString() } });

    expect(screen.getByText(error)).toBeInTheDocument();
  }
);
