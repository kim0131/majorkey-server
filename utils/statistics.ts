export const calcLearningAssessmentTime = (hour: number, minutes: number) => {
  const total = hour * 60 + minutes;
  const calcHour = Math.floor(total / 60);
  const calcMinutes = total % 60;
  return `${calcHour}.${calcMinutes}`;
};

export const calcLearningAssessmentAvgTime = (
  sumHour: number,
  sumMinutes: number,
  sumDuration: number,
  count: number,
) => {
  const total = sumHour * 60 + sumMinutes;
  const avgTotal = total / sumDuration / count;
  const calcHour = Math.floor(avgTotal / 60);
  const calcMinutes = avgTotal % 60;
  return `${calcHour}.${calcMinutes}`;
};
