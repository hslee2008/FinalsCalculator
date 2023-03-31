import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/svelte'
import Calculator from '../src/layout/Calculator.svelte'

describe('Finals Field', () => {
  beforeEach(() => render(Calculator))

  test('[Finals 1] Finals Basic Values', async () => {
    const input = screen.getByPlaceholderText('Input Finals Score')

    await fireEvent.input(input, { target: { value: '100' } })
    expect(screen.getByText('100 (A)')).toBeInTheDocument()

    await fireEvent.input(input, { target: { value: '58' } })
    expect(screen.getByText('89.5 (A)')).toBeInTheDocument()

    await fireEvent.input(input, { target: { value: '57' } })
    expect(screen.getByText('89.25 (B)')).toBeInTheDocument()

    await fireEvent.input(input, { target: { value: '18' } })
    expect(screen.getByText('79.5 (B)')).toBeInTheDocument()

    await fireEvent.input(input, { target: { value: '17' } })
    expect(screen.getByText('79.25 (C)')).toBeInTheDocument()

    await fireEvent.input(input, { target: { value: '0' } })
    expect(screen.getByText('75 (C)')).toBeInTheDocument()
  })
})
