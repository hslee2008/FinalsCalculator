import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/svelte'
// @ts-ignore
import Calculator from '@/layout/Calculator.svelte'

describe('Basic Rendering', () => {
  beforeEach(() => render(Calculator))

  test('[Header 1] Shows Proper Heading', () => {
    expect(screen.getByText('Finals Calculator')).toBeInTheDocument()
    expect(screen.getByText('Developed by')).toBeInTheDocument()
    expect(screen.getByText('MIT License')).toBeInTheDocument()
    expect(screen.getByText('Calculate')).toBeInTheDocument()
    expect(screen.getByText('@Hyunseung')).toBeInTheDocument()
  })

  test('[Text 1] Shows Proper Text - With Midterm', () => {
    expect(
      screen.getByText('Midterm and Finals each weight (25, 30, 35)')
    ).toBeInTheDocument()
    expect(screen.getByText('Midterm Score')).toBeInTheDocument()
    expect(screen.getByText('Performance Evaluation')).toBeInTheDocument()
  })

  test('[Text 2] Shows Proper Text - Without Midterm', async () => {
    const switchMidterm = screen.getByTestId('switch-mid')
    await fireEvent.click(switchMidterm)

    expect(screen.getByText('Midterm weight (50, 60)')).toBeInTheDocument()
    expect(screen.getByText('Performance Evaluation')).toBeInTheDocument()
  })
})
