import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/svelte'
// @ts-ignore
import Calculator from '@/layout/Calculator.svelte'

describe('CheckBox Decimal Point', () => {
  beforeEach(() => render(Calculator))

  test('[CheckBox 1] Test Checkbox', async () => {
    await fireEvent.click(screen.getByText('Calculate'))

    const checkbox = screen.getByLabelText('Decimal Score')
    await fireEvent.click(checkbox)

    expect(checkbox).toBeChecked()
    expect(screen.getByText('58.0%')).toBeInTheDocument()
    expect(screen.getByText('18.0%')).toBeInTheDocument()
  })

  test('[CheckBox 2] Test with 35%', async () => {
    const input = screen.getByLabelText(
      'Midterm and Finals each weight (25, 30, 35)'
    )
    await fireEvent.input(input, { target: { value: '35' } })
    const input2 = screen.getByLabelText('6 ~ 30')
    await fireEvent.input(input2, { target: { value: '30' } })

    await fireEvent.click(screen.getByText('Calculate'))

    const checkbox = screen.getByLabelText('Decimal Score')
    await fireEvent.click(checkbox)

    expect(checkbox).toBeChecked()
    expect(screen.getByText('70.0%')).toBeInTheDocument()
    expect(screen.getByText('41.5%')).toBeInTheDocument()
    expect(screen.getByText('13.0%')).toBeInTheDocument()
  })
})
