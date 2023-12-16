import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import Calculator from "@/components/Calculator/Finals.svelte";
import FinalsField from "./data/FinalsField.json";
import { expect } from "vitest";

beforeEach(() => render(Calculator));

test.each(FinalsField.datas)(
  "Finals Score %i, Should %s be displayed",
  async (finals, text) => {
    const input = screen.getByPlaceholderText("Input Finals Score");
    await fireEvent.input(input, { target: { value: finals.toString() } });

    expect(screen.getByText(text)).toBeInTheDocument();
  }
);
