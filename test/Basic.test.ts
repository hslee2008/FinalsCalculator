import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/svelte'
import Calculator from '../src/layout/Calculator.svelte'

describe('Basic Rendering', () => {
  beforeEach(() => render(Calculator))

  test('[Basic 1] Shows Proper Heading', () => {
    expect(screen.getByText('Finals Calculator')).toBeInTheDocument()
    expect(screen.getByText('Developed by')).toBeInTheDocument()
    expect(screen.getByText('MIT License')).toBeInTheDocument()
    expect(screen.getByText('Calculate')).toBeInTheDocument()
  })
})
