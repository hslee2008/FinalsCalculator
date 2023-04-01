import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/svelte'
import Calculator from '../src/layout/Calculator.svelte'

describe('Warning of Incorrect Values', () => {
  beforeEach(() => render(Calculator))

  test('[Warn 1] Alter Weight Field', async () => {
    const weight = screen.getByLabelText(
      'Midterm and Finals each weight (25, 30, 35)'
    )
    await fireEvent.input(weight, { target: { value: '21' } })
    expect(screen.getByText('25 or 30 or 35')).toBeInTheDocument()
  })

  test('[Warn 2] Alter Midterm Score Field', async () => {
    const midterm = screen.getByLabelText('Midterm Score')
    await fireEvent.input(midterm, { target: { value: '101' } })
    expect(screen.getByText('0 ~ 100')).toBeInTheDocument()
  })

  test('[Warn 3] Alter Performance Evaluation Field', async () => {
    const pe = screen.getByLabelText('Performance Evaluation')
    await fireEvent.input(pe, { target: { value: '51' } })
    expect(screen.getByText('10 ~ 50')).toBeInTheDocument()
  })

  test('[Warn 4] Alter Finals Field', async () => {
    await fireEvent.click(screen.getByText('Calculate'))
    const finals = screen.getByPlaceholderText('Input Finals Score')
    await fireEvent.input(finals, { target: { value: '101' } })
    expect(screen.getByText('0 ~ 100')).toBeInTheDocument()
  })
})