import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/svelte'
import Calculator from '../src/layout/Calculator.svelte'

test('Shows Proper Heading', () => {
  render(Calculator)
  expect(screen.getByText('기말고사 계산기')).toBeInTheDocument()
})

test('Click the Calculate Button', async () => {
  render(Calculator)
  await fireEvent.click(screen.getByText('계산'))
  expect(screen.getByText('65점')).toBeInTheDocument()
})

test('Alter 수행평가', async () => {
  render(Calculator)
  const input = screen.getByLabelText('수행평가 성적')
  await fireEvent.input(input, { target: { value: '30' } })
  expect(input.value).toBe('30')
  await fireEvent.click(screen.getByText('계산'))
  expect(screen.getByText('99점')).toBeInTheDocument()
})

test('Alter 중간고사', async () => {
  render(Calculator)
  const input = screen.getByLabelText('중간고사 성적')
  await fireEvent.input(input, { target: { value: '0' } })
  expect(input.value).toBe('0')
  await fireEvent.click(screen.getByText('계산'))
  expect(screen.getByText('99점')).toBeInTheDocument()
  expect(screen.getByText('65점')).toBeInTheDocument()
})

test('Alter 비율, wrong format', async () => {
  render(Calculator)
  const input = screen.getByLabelText('중간고사와 기말고사 각 비율 (30, 35)')
  await fireEvent.input(input, { target: { value: '35' } })
  expect(input.value).toBe('35')
  await fireEvent.click(screen.getByText('계산'))
  expect(
    screen.getByText('입력하신 숫자가 잘못되었습니다.')
  ).toBeInTheDocument()
})

test('Alter 비율, correct format', async () => {
  render(Calculator)
  const input = screen.getByLabelText('중간고사와 기말고사 각 비율 (30, 35)')
  await fireEvent.input(input, { target: { value: '35' } })
  expect(input.value).toBe('35')
  const input2 = screen.getByLabelText('수행평가 성적')
  await fireEvent.input(input2, { target: { value: '30' } })
  expect(input2.value).toBe('30')
  await fireEvent.click(screen.getByText('계산'))
  expect(screen.getByText('70점')).toBeInTheDocument()
})

test('Alter 중간고사', async () => {
  render(Calculator)
  const input = screen.getByTestId('switch')
  await fireEvent.click(input)
  await fireEvent.click(screen.getByText('계산'))
  expect(screen.getByText('79점')).toBeInTheDocument()
})
