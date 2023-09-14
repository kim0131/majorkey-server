// 진로 연계, 만족도
const scoreData1 = item => {
  const data = Number(item);
  if (item >= 95) return 20;
  else if (item >= 90) return 18;
  else if (item >= 85) return 16;
  else if (item >= 80) return 14;
  else if (item >= 70) return 12;
  else if (item >= 60) return 10;
  else if (item >= 50) return 8;
  else return 6;
};

// 자기주도
const scoreData2 = item => {
  const data = Number(item);
  if (item >= 95) return 30;
  else if (item >= 90) return 25;
  else if (item >= 85) return 20;
  else if (item >= 80) return 18;
  else if (item >= 70) return 16;
  else if (item >= 60) return 14;
  else if (item >= 50) return 12;
  else return 10;
};

const scoreTotal = (satisfaction, careerRelevance, selfDirected) => {
  const data1 = [satisfaction, careerRelevance]
    .map(item => scoreData1(item))
    .reduce((a, b) => a + b, 0);

  return data1 + scoreData2(selfDirected);
};

export const careerScoreGrade = item => {
  if (item >= 70) return "1등급";
  else if (item >= 40) return "2등급";
  else return "3등급";
};

export const getCareerAssessmentResultData = data => {
  return {
    scoreTotal: scoreTotal(
      data.satisfaction,
      data.careerRelevance,
      data.selfDirected,
    ),
    scoreGrade: careerScoreGrade(
      scoreTotal(data.satisfaction, data.careerRelevance, data.selfDirected),
    ),
  };
};
