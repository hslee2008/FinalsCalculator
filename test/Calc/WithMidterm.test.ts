import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/svelte'
// @ts-ignore
import Calculator from '@/components/Calculator.svelte'

describe('Calculator Component', () => {
  beforeEach(() => render(Calculator))

  test('Calculate Button', async () => {
    await fireEvent.click(screen.getByTestId('yes-mid'))
    await fireEvent.click(screen.getByText('Calculate'))

    expect(screen.getByText('58%')).toBeInTheDocument()
    expect(screen.getByText('18%')).toBeInTheDocument()
  })

  test('Alter performance evaluation', async () => {
    await fireEvent.click(screen.getByTestId('yes-mid'))
    const performEval = screen.getByLabelText('Performance Evaluation')
    await fireEvent.input(performEval, { target: { value: '40' } })

    await fireEvent.click(screen.getByText('Calculate'))
    expect(screen.getByText('98%')).toBeInTheDocument()
    expect(screen.getByText('58%')).toBeInTheDocument()
    expect(screen.getByText('18%')).toBeInTheDocument()
  })

  test('Alter midterm', async () => {
    await fireEvent.click(screen.getByTestId('yes-mid'))
    const midtermScore = screen.getByLabelText('Midterm Score')
    await fireEvent.input(midtermScore, { target: { value: '96' } })

    await fireEvent.click(screen.getByText('Calculate'))
    expect(screen.getByText('62%')).toBeInTheDocument()
    expect(screen.getByText('22%')).toBeInTheDocument()
  })

  test('Alter weight', async () => {
    await fireEvent.click(screen.getByTestId('yes-mid'))
    const weight = screen.getByLabelText(
      'Midterm and Finals each weight (25, 30, 35)'
    )
    await fireEvent.input(weight, { target: { value: '35' } })

    const performEval = screen.getByLabelText('6 ~ 30')
    await fireEvent.input(performEval, { target: { value: '30' } })

    await fireEvent.click(screen.getByText('Calculate'))
    expect(screen.getByText('70%')).toBeInTheDocument()
    expect(screen.getByText('42%')).toBeInTheDocument()
    expect(screen.getByText('13%')).toBeInTheDocument()
  })
})
