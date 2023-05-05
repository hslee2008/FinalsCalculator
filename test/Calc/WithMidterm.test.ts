import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/svelte'
// @ts-ignore
import Calculator from '@/layout/Calculator.svelte'

describe('Calculator Component', () => {
  beforeEach(() => render(Calculator))

  test('Calculate Button', async () => {
    await fireEvent.click(screen.getByText('Calculate'))

    expect(screen.getByText('58%')).toBeInTheDocument()
    expect(screen.getByText('18%')).toBeInTheDocument()
  })

  test('Alter performance evaluation', async () => {
    const input = screen.getByLabelText('Performance Evaluation')
    await fireEvent.input(input, { target: { value: '40' } })

    await fireEvent.click(screen.getByText('Calculate'))
    expect(screen.getByText('98%')).toBeInTheDocument()
    expect(screen.getByText('58%')).toBeInTheDocument()
    expect(screen.getByText('18%')).toBeInTheDocument()
  })

  test('Alter midterm', async () => {
    const input = screen.getByLabelText('Midterm Score')
    await fireEvent.input(input, { target: { value: '96' } })

    await fireEvent.click(screen.getByText('Calculate'))
    expect(screen.getByText('62%')).toBeInTheDocument()
    expect(screen.getByText('22%')).toBeInTheDocument()
  })

  test('Alter weight', async () => {
    const input = screen.getByLabelText(
      'Midterm and Finals each weight (25, 30, 35)'
    )
    await fireEvent.input(input, { target: { value: '35' } })

    const input2 = screen.getByLabelText('6 ~ 30')
    await fireEvent.input(input2, { target: { value: '30' } })

    await fireEvent.click(screen.getByText('Calculate'))
    expect(screen.getByText('70%')).toBeInTheDocument()
    expect(screen.getByText('42%')).toBeInTheDocument()
    expect(screen.getByText('13%')).toBeInTheDocument()
  })
})
