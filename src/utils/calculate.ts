import { roundPercent } from './numbers'

function TableCalculation(
  hasMid: any,
  percent: number,
  projects: number,
  mid_score: number,
  hasDecimalScore: boolean,
  callback: () => void
): string[] {
  const finals = ['0', '0', '0', '0']
  const projectsFull = hasMid ? 100 - percent * 2 : 100 - percent
  let subtracted = -(projectsFull - projects)

  // If there is no midterm, simply subtract the values taken from projects
  // If there is a midterm, subtract by adding weights
  if (hasMid) {
    subtracted -= percent - (mid_score / 100) * percent
  }

  // By order of alphabets (A, B, C, D), calculate the necessary grades
  for (let i = 0; i < finals.length; i++)
    finals[i] = roundPercent(
      percent,
      10.5 + subtracted + i * 10,
      hasDecimalScore
    )

  // callback after calculation
  callback()

  return finals
}

function CalculateFinalsScore(
  hasMid: any,
  percent: number,
  projects: number,
  mid_score: number,
  finals_score: number
): number {
  const projectsFull = hasMid ? 100 - percent * 2 : 100 - percent
  let subtracted = -(projectsFull - projects)

  // If there is no midterm, simply subtract the values taken from projects
  // If there is a midterm, subtract by adding weights
  if (hasMid) {
    subtracted -= percent - (mid_score / 100) * percent
  }

  subtracted -= percent - (finals_score / 100) * percent

  return 100 + subtracted
}

export { CalculateFinalsScore, TableCalculation }
