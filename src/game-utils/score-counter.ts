import { SeasonScoresType } from "@/data/types";

export const countScores = (scores: SeasonScoresType) => {
  const { p1, p2, c, m } = scores;
  return 1 + p1 + p2 + c - m;
};
