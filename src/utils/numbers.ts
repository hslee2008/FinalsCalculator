import { translateJS } from "../i18n/i18n";

const percentToString = (percent: number): string => {
  if (percent <= 0) return translateJS("secured");
  if (percent > 100) return translateJS("impossible");

  return `${percent}${translateJS("score")}`;
};

const percentToGrade = (percent: number): string => {
  if (percent >= 89.5) return "A";
  if (percent >= 79.5) return "B";
  if (percent >= 69.5) return "C";
  if (percent >= 59.5) return "D";

  return "E";
};

const roundPercent = (
  percent: number,
  subtracted: number,
  hasDecimalScore: boolean
): string => {
  const score = 100 * ((percent - subtracted) / percent);

  if (hasDecimalScore) {
    return (Math.ceil(score * 10) / 10).toFixed(1);
  }

  return Math.ceil(score).toFixed(0);
};

export { percentToString, percentToGrade, roundPercent };
