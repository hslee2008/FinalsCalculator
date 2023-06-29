import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/svelte'
// @ts-ignore
import Calculator from '@/components/Calculator/Finals.svelte'

describe('CheckBox Decimal Point', () => {
  beforeEach(() => render(Calculator))

  test('[CheckBox 1] Test Checkbox', async () => {
    await fireEvent.click(screen.getByTestId('yes-mid'))
    await fireEvent.click(screen.getByTestId('yes-decimal'))

    await fireEvent.click(screen.getByText('Calculate'))

    expect(screen.getByText('58.0%')).toBeInTheDocument()
    expect(screen.getByText('18.0%')).toBeInTheDocument()
  })

  test('[CheckBox 2] Test with 35%', async () => {
    await fireEvent.click(screen.getByTestId('yes-mid'))

    const weight = screen.getByLabelText(
      'Midterm and Finals weight (25, 30, 35)'
    )
    await fireEvent.input(weight, { target: { value: '35' } })

    const performEval = screen.getByLabelText('0 ~ 30')
    await fireEvent.input(performEval, { target: { value: '30' } })

    await fireEvent.click(screen.getByTestId('yes-decimal'))

    await fireEvent.click(screen.getByText('Calculate'))

    expect(screen.getByText('70.0%')).toBeInTheDocument()
    expect(screen.getByText('41.5%')).toBeInTheDocument()
    expect(screen.getByText('13.0%')).toBeInTheDocument()
  })

  test('[CheckBox 3] Test without Midterm, 60 (max)', async () => {
    const noMid = screen.getByTestId('no-mid')
    await fireEvent.click(noMid)

    const midtermWeight = screen.getByLabelText('Midterm weight (50, 60)')
    await fireEvent.input(midtermWeight, { target: { value: '60' } })

    const performEval = screen.getByLabelText('0 ~ 40')
    await fireEvent.input(performEval, { target: { value: '40' } })

    await fireEvent.click(screen.getByTestId('yes-decimal'))

    await fireEvent.click(screen.getByText('Calculate'))

    expect(screen.getByText('82.5%')).toBeInTheDocument()
    expect(screen.getByText('66.0%')).toBeInTheDocument()
    expect(screen.getByText('49.5%')).toBeInTheDocument()
    expect(screen.getByText('32.5%')).toBeInTheDocument()
  })
})
