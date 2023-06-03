import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/svelte'
// @ts-ignore
import Calculator from '@/layout/Calculator.svelte'

describe('Calculator Component', () => {
  beforeEach(async () => {
    render(Calculator)

    const switchMidterm = screen.getByTestId('switch-mid')
    await fireEvent.click(switchMidterm)
  })

  test('Calculate Button', async () => {
    await fireEvent.click(screen.getByText('Calculate'))

    expect(screen.getByText('79%')).toBeInTheDocument()
    expect(screen.getByText('59%')).toBeInTheDocument()
    expect(screen.getByText('39%')).toBeInTheDocument()
    expect(screen.getByText('19%')).toBeInTheDocument()
  })

  test('Alter performance evaluation', async () => {
    const performEval = screen.getByLabelText(
      'Performance Evaluation'
    )
    await fireEvent.input(performEval, { target: { value: '40' } })

    await fireEvent.click(screen.getByText('Calculate'))
    expect(screen.getByText('99%')).toBeInTheDocument()
    expect(screen.getByText('79%')).toBeInTheDocument()
    expect(screen.getByText('59%')).toBeInTheDocument()
    expect(screen.getByText('39%')).toBeInTheDocument()
  })

  test('Alter weight', async () => {
    const midtermWeight = screen.getByLabelText('Midterm weight (50, 60)')
    await fireEvent.input(midtermWeight, { target: { value: '60' } })

    const performEval = screen.getByLabelText('8 ~ 40')
    await fireEvent.input(performEval, { target: { value: '30' } })

    await fireEvent.click(screen.getByText('Calculate'))
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('83%')).toBeInTheDocument()
    expect(screen.getByText('66%')).toBeInTheDocument()
    expect(screen.getByText('50%')).toBeInTheDocument()
  })
})
