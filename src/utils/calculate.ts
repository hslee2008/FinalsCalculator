import { parsePercent } from './numbers'

function TableCalculation(
  hasMidterm: any,
  percent: number,
  projects: number,
  midterm_score: number,
  hasDecimalScore: boolean,
  callback: () => void
): number[] {
  const finals = [0, 0, 0, 0, 0]
  const projectsFull = hasMidterm ? 100 - percent * 2 : 100 - percent
  let subtracted = -(projectsFull - projects)

  // If there is no midterm, simply subtract the values taken from projects
  // If there is a midterm, subtract by adding weights
  if (hasMidterm) {
    subtracted -= percent - (midterm_score / 100) * percent
  }

  // By order of alphabets (A, B, C, D, E), calculate the necessary grades
  for (let i = 0; i < finals.length; i++)
    finals[i] = parsePercent(
      percent,
      10.5 + subtracted + i * 10,
      hasDecimalScore
    )

  // callback after calculation
  callback()

  return finals
}

function CalculateFinalsScore(
  hasMidterm: any,
  percent: number,
  projects: number,
  midterm_score: number,
  finals_score: number
): number {
  const projectsFull = hasMidterm ? 100 - percent * 2 : 100 - percent
  let subtracted = -(projectsFull - projects)

  // If there is no midterm, simply subtract the values taken from projects
  // If there is a midterm, subtract by adding weights
  if (hasMidterm) {
    subtracted -= percent - (midterm_score / 100) * percent
  }

  subtracted -= percent - (finals_score / 100) * percent

  return 100 + subtracted
}

export { CalculateFinalsScore, TableCalculation }
