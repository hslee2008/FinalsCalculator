import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/svelte'
import Calculator from '../src/layout/Calculator.svelte'

test('Shows Proper Heading', () => {
  render(Calculator)
  expect(screen.getByText('Finals Calculator')).toBeInTheDocument()
})

test('Click the Calculate Button', async () => {
  render(Calculator)
  await fireEvent.click(screen.getByText('Calculate'))
  expect(screen.getByText('65%')).toBeInTheDocument()
})

test('Alter performance evaluation', async () => {
  render(Calculator)
  const input = screen.getByLabelText('Performance Evaluation')
  await fireEvent.input(input, { target: { value: '30' } })
  expect(input.value).toBe('30')
  await fireEvent.click(screen.getByText('Calculate'))
  expect(screen.getByText('99%')).toBeInTheDocument()
})

test('Alter midterm', async () => {
  render(Calculator)
  const input = screen.getByLabelText('Midterm Score')
  await fireEvent.input(input, { target: { value: '0' } })
  expect(input.value).toBe('0')
  await fireEvent.click(screen.getByText('Calculate'))
  expect(screen.getByText('99%')).toBeInTheDocument()
  expect(screen.getByText('65%')).toBeInTheDocument()
})

test('Alter weight, wrong format', async () => {
  render(Calculator)
  const input = screen.getByLabelText('Midterm and Finals each weight (30, 35)')
  await fireEvent.input(input, { target: { value: '35' } })
  expect(input.value).toBe('35')
  await fireEvent.click(screen.getByText('Calculate'))
  expect(
    screen.getByText('The number you entered is wrongly formatted')
  ).toBeInTheDocument()
})

test('Alter weight, correct format', async () => {
  render(Calculator)
  const input = screen.getByLabelText('Midterm and Finals each weight (30, 35)')
  await fireEvent.input(input, { target: { value: '35' } })
  expect(input.value).toBe('35')
  const input2 = screen.getByLabelText('Performance Evaluation')
  await fireEvent.input(input2, { target: { value: '30' } })
  expect(input2.value).toBe('30')
  await fireEvent.click(screen.getByText('Calculate'))
  expect(screen.getByText('70%')).toBeInTheDocument()
})

test('Alter Midterm Field', async () => {
  render(Calculator)
  const input = screen.getByTestId('switch')
  await fireEvent.click(input)
  await fireEvent.click(screen.getByText('Calculate'))
  expect(screen.getByText('79%')).toBeInTheDocument()
})
