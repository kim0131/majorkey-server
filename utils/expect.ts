import _ from "lodash";

// FIXME : 평균 제대로 안들어가는 데 고쳐야 함

export const getExpectSchoolData = (reqData, originData) => {
  let keyName = "";

  switch (reqData.grade) {
    case 1:
      keyName += "first";
      break;

    case 2:
      keyName += "second";
      break;

    case 3:
      keyName += "third";
      break;

    default:
      return undefined;
  }

  keyName += reqData.semester;

  switch (reqData.term) {
    case 1:
      keyName += "Mid";
      break;

    case 2:
      keyName += "Final";
      break;

    default:
      return undefined;
  }

  const parseReqData = {
    [keyName + "Name"]: reqData.name,
    [keyName + "Score"]: reqData.score,
    [keyName + "Average"]: reqData.average,
    [keyName + "Unit"]: reqData.unit,
    [keyName + "Rate"]: reqData.rate,
  };

  let mergeData = { ...originData, ...parseReqData };

  let averageScoreValue: number = 0;
  let averageScoreCount: number = 0;
  let averageRateValue: number = 0;
  let averageRateCount: number = 0;

  if (mergeData.first1MidScore) {
    averageScoreValue = averageScoreValue + mergeData.first1MidScore;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.first1FinalScore) {
    averageScoreValue = averageScoreValue + mergeData.first1FinalScore;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.first2MidScore) {
    averageScoreValue = averageScoreValue + mergeData.first2MidScore;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.first2FinalScore) {
    averageScoreValue = averageScoreValue + mergeData.first2FinalScore;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.second1MidScore) {
    averageScoreValue = averageScoreValue + mergeData.second1MidScore;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.second1FinalScore) {
    averageScoreValue = averageScoreValue + mergeData.second1FinalScore;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.second2MidScore) {
    averageScoreValue = averageScoreValue + mergeData.second2MidScore;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.second2FinalScore) {
    averageScoreValue = averageScoreValue + mergeData.second2FinalScore;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.third1MidScore) {
    averageScoreValue = averageScoreValue + mergeData.third1MidScore;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.third1FinalScore) {
    averageScoreValue = averageScoreValue + mergeData.third1FinalScore;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.third2MidScore) {
    averageScoreValue = averageScoreValue + mergeData.third2MidScore;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.third2FinalScore) {
    averageScoreValue = averageScoreValue + mergeData.third2FinalScore;
    averageScoreCount = averageScoreCount + 1;
  }

  if (mergeData.first1MidRate) {
    averageRateValue = averageRateValue + mergeData.first1MidRate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.first1FinalRate) {
    averageRateValue = averageRateValue + mergeData.first1FinalRate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.first2MidRate) {
    averageRateValue = averageRateValue + mergeData.first2MidRate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.first2FinalRate) {
    averageRateValue = averageRateValue + mergeData.first2FinalRate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.second1MidRate) {
    averageRateValue = averageRateValue + mergeData.second1MidRate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.second1FinalRate) {
    averageRateValue = averageRateValue + mergeData.second1FinalRate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.second2MidRate) {
    averageRateValue = averageRateValue + mergeData.second2MidRate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.second2FinalRate) {
    averageRateValue = averageRateValue + mergeData.second2FinalRate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.third1MidRate) {
    averageRateValue = averageRateValue + mergeData.third1MidRate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.third1FinalRate) {
    averageRateValue = averageRateValue + mergeData.third1FinalRate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.third2MidRate) {
    averageRateValue = averageRateValue + mergeData.third2MidRate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.third2FinalRate) {
    averageRateValue = averageRateValue + mergeData.third2FinalRate;
    averageRateCount = averageRateCount + 1;
  }

  return {
    averageScore: Math.round((averageScoreValue / averageScoreCount) * 10) / 10,
    averageRate: Math.round((averageRateValue / averageRateCount) * 10) / 10,
    ...parseReqData,
  };
};

export const getExpectExamData = (reqData, originData) => {
  let keyName = "";
  switch (reqData.grade) {
    case 1:
      keyName += "first";
      break;

    case 2:
      keyName += "second";
      break;

    case 3:
      keyName += "third";
      break;

    default:
      return undefined;
  }

  keyName += reqData.term;

  const parseReqData = {
    [keyName + "Name"]: reqData.name,
    [keyName + "Date"]: reqData.date,
    [keyName + "Institute"]: reqData.institute,
    [keyName + "Score"]: reqData.score,
    [keyName + "Average"]: reqData.average,
    [keyName + "Unit"]: reqData.unit,
    [keyName + "Rate"]: reqData.rate,
    [keyName + "Percent"]: reqData.percent,
    [keyName + "StandardScore"]: reqData.standardScore,
  };

  let mergeData = { ...originData, ...parseReqData };

  let averageScoreValue: number = 0;
  let averageScoreCount: number = 0;
  let averageRateValue: number = 0;
  let averageRateCount: number = 0;

  if (mergeData.first1Score) {
    averageScoreValue = averageScoreValue + mergeData.first1Score;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.first2Score) {
    averageScoreValue = averageScoreValue + mergeData.first2Score;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.first3Score) {
    averageScoreValue = averageScoreValue + mergeData.first3Score;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.second1Score) {
    averageScoreValue = averageScoreValue + mergeData.second1Score;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.second2Score) {
    averageScoreValue = averageScoreValue + mergeData.second2Score;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.second3Score) {
    averageScoreValue = averageScoreValue + mergeData.second3Score;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.third1Score) {
    averageScoreValue = averageScoreValue + mergeData.third1Score;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.third2Score) {
    averageScoreValue = averageScoreValue + mergeData.third2Score;
    averageScoreCount = averageScoreCount + 1;
  }
  if (mergeData.third3Score) {
    averageScoreValue = averageScoreValue + mergeData.third3Score;
    averageScoreCount = averageScoreCount + 1;
  }

  if (mergeData.first1Rate) {
    averageRateValue = averageRateValue + mergeData.first1Rate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.first2Rate) {
    averageRateValue = averageRateValue + mergeData.first2Rate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.first3Rate) {
    averageRateValue = averageRateValue + mergeData.first3Rate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.second1Rate) {
    averageRateValue = averageRateValue + mergeData.second1Rate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.second2Rate) {
    averageRateValue = averageRateValue + mergeData.second2Rate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.second3Rate) {
    averageRateValue = averageRateValue + mergeData.second3Rate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.third1Rate) {
    averageRateValue = averageRateValue + mergeData.third1Rate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.third2Rate) {
    averageRateValue = averageRateValue + mergeData.third2Rate;
    averageRateCount = averageRateCount + 1;
  }
  if (mergeData.third3Rate) {
    averageRateValue = averageRateValue + mergeData.third3Rate;
    averageRateCount = averageRateCount + 1;
  }

  return {
    averageScore: Math.round((averageScoreValue / averageScoreCount) * 10) / 10,
    averageRate: Math.round((averageRateValue / averageRateCount) * 10) / 10,
    ...parseReqData,
  };
};

export const getExpectStudentData = (reqData, originData) => {
  let keyName = "";
  switch (reqData.grade) {
    case 1:
      keyName += "first";
      break;

    case 2:
      keyName += "second";
      break;

    case 3:
      keyName += "third";
      break;

    default:
      return undefined;
  }

  keyName += reqData.term;

  const parseReqData = {
    [keyName + "Name"]: reqData.name,
    [keyName + "Topic"]: reqData.topic,
    [keyName + "Meter"]: reqData.meter,
    [keyName + "Process"]: reqData.process,
    [keyName + "Impression"]: reqData.impression,
    [keyName + "Ability"]: reqData.ability,
    [keyName + "CareerRelevance"]: {
      1: 20,
      2: 18,
      3: 16,
      4: 14,
      5: 12,
      6: 10,
      7: 8,
      8: 6,
    }[reqData.careerRelevance],
    [keyName + "Satisfaction"]: {
      1: 20,
      2: 18,
      3: 16,
      4: 14,
      5: 12,
      6: 10,
      7: 8,
      8: 6,
    }[reqData.satisfaction],
  };

  let mergeData = { ...originData, ...parseReqData };

  let careerRelevanceValue: number = 0;
  let careerRelevanceCount: number = 0;
  let satisfactionValue: number = 0;
  let satisfactionCount: number = 0;

  if (mergeData.first1CareerRelevance) {
    careerRelevanceValue =
      careerRelevanceValue + mergeData.first1CareerRelevance;
    careerRelevanceCount = careerRelevanceCount + 1;
  }
  if (mergeData.first2CareerRelevance) {
    careerRelevanceValue =
      careerRelevanceValue + mergeData.first2CareerRelevance;
    careerRelevanceCount = careerRelevanceCount + 1;
  }
  if (mergeData.second1CareerRelevance) {
    careerRelevanceValue =
      careerRelevanceValue + mergeData.second1CareerRelevance;
    careerRelevanceCount = careerRelevanceCount + 1;
  }
  if (mergeData.second2CareerRelevance) {
    careerRelevanceValue =
      careerRelevanceValue + mergeData.second2CareerRelevance;
    careerRelevanceCount = careerRelevanceCount + 1;
  }
  if (mergeData.third1CareerRelevance) {
    careerRelevanceValue =
      careerRelevanceValue + mergeData.third1CareerRelevance;
    careerRelevanceCount = careerRelevanceCount + 1;
  }
  if (mergeData.third2CareerRelevance) {
    careerRelevanceValue =
      careerRelevanceValue + mergeData.third2CareerRelevance;
    careerRelevanceCount = careerRelevanceCount + 1;
  }

  if (mergeData.first1Satisfaction) {
    satisfactionValue = satisfactionValue + mergeData.first1Satisfaction;
    satisfactionCount = satisfactionCount + 1;
  }
  if (mergeData.first2Satisfaction) {
    satisfactionValue = satisfactionValue + mergeData.first2Satisfaction;
    satisfactionCount = satisfactionCount + 1;
  }
  if (mergeData.second1Satisfaction) {
    satisfactionValue = satisfactionValue + mergeData.second1Satisfaction;
    satisfactionCount = satisfactionCount + 1;
  }
  if (mergeData.second2Satisfaction) {
    satisfactionValue = satisfactionValue + mergeData.second2Satisfaction;
    satisfactionCount = satisfactionCount + 1;
  }
  if (mergeData.third1Satisfaction) {
    satisfactionValue = satisfactionValue + mergeData.third1Satisfaction;
    satisfactionCount = satisfactionCount + 1;
  }
  if (mergeData.third2Satisfaction) {
    satisfactionValue = satisfactionValue + mergeData.third2Satisfaction;
    satisfactionCount = satisfactionCount + 1;
  }

  let study = 0;
  let career = 0;
  let community = 0;
  [
    mergeData.first1Ability,
    mergeData.first2Ability,
    mergeData.second1Ability,
    mergeData.second2Ability,
    mergeData.third1Ability,
    mergeData.third2Ability,
  ].map(item => {
    switch (item) {
      case 1:
        ++study;
        break;
      case 2:
        ++career;
        break;
      case 3:
        ++community;
        break;
      default:
        break;
    }
  });

  return {
    careerRelevance:
      Math.round((careerRelevanceValue / careerRelevanceCount) * 10) / 10,
    satisfaction: Math.round((satisfactionValue / satisfactionCount) * 10) / 10,
    activity: study + career + community,
    study: study,
    career: career,
    community: community,
    ...parseReqData,
  };
};

export const getCalcExpectSchoolData = props => {
  let scoreValue: number[] = [];
  let scoreCount: number = 0;
  let averageValue: number[] = [];
  let averageCount: number = 0;
  let unitValue: number[] = [];
  let unitCount: number = 0;
  let rateValue: number[] = [];
  let rateCount: number = 0;

  props.map(data => {
    if (data.first1MidScore !== null) {
      scoreValue.push(data.first1MidScore);
      scoreCount = scoreCount + 1;
    }
    if (data.first1FinalScore !== null) {
      scoreValue.push(data.first1FinalScore);
      scoreCount = scoreCount + 1;
    }
    if (data.first2MidScore !== null) {
      scoreValue.push(data.first2MidScore);
      scoreCount = scoreCount + 1;
    }
    if (data.first2FinalScore !== null) {
      scoreValue.push(data.first2FinalScore);
      scoreCount = scoreCount + 1;
    }
    if (data.second1MidScore !== null) {
      scoreValue.push(data.second1MidScore);
      scoreCount = scoreCount + 1;
    }
    if (data.second1FinalScore !== null) {
      scoreValue.push(data.second1FinalScore);
      scoreCount = scoreCount + 1;
    }
    if (data.second2MidScore !== null) {
      scoreValue.push(data.second2MidScore);
      scoreCount = scoreCount + 1;
    }
    if (data.second2FinalScore !== null) {
      scoreValue.push(data.second2FinalScore);
      scoreCount = scoreCount + 1;
    }
    if (data.third1MidScore !== null) {
      scoreValue.push(data.third1MidScore);
      scoreCount = scoreCount + 1;
    }
    if (data.third1FinalScore !== null) {
      scoreValue.push(data.third1FinalScore);
      scoreCount = scoreCount + 1;
    }
    if (data.third2MidScore !== null) {
      scoreValue.push(data.third2MidScore);
      scoreCount = scoreCount + 1;
    }
    if (data.third2FinalScore !== null) {
      scoreValue.push(data.third2FinalScore);
      scoreCount = scoreCount + 1;
    }

    if (data.first1MidAverage !== null) {
      averageValue.push(data.first1MidAverage);
      averageCount = averageCount + 1;
    }
    if (data.first1FinalAverage !== null) {
      averageValue.push(data.first1FinalAverage);
      averageCount = averageCount + 1;
    }
    if (data.first2MidAverage !== null) {
      averageValue.push(data.first2MidAverage);
      averageCount = averageCount + 1;
    }
    if (data.first2FinalAverage !== null) {
      averageValue.push(data.first2FinalAverage);
      averageCount = averageCount + 1;
    }
    if (data.second1MidAverage !== null) {
      averageValue.push(data.second1MidAverage);
      averageCount = averageCount + 1;
    }
    if (data.second1FinalAverage !== null) {
      averageValue.push(data.second1FinalAverage);
      averageCount = averageCount + 1;
    }
    if (data.second2MidAverage !== null) {
      averageValue.push(data.second2MidAverage);
      averageCount = averageCount + 1;
    }
    if (data.second2FinalAverage !== null) {
      averageValue.push(data.second2FinalAverage);
      averageCount = averageCount + 1;
    }
    if (data.third1MidAverage !== null) {
      averageValue.push(data.third1MidAverage);
      averageCount = averageCount + 1;
    }
    if (data.third1FinalAverage !== null) {
      averageValue.push(data.third1FinalAverage);
      averageCount = averageCount + 1;
    }
    if (data.third2MidAverage !== null) {
      averageValue.push(data.third2MidAverage);
      averageCount = averageCount + 1;
    }
    if (data.third2FinalAverage !== null) {
      averageValue.push(data.third2FinalAverage);
      averageCount = averageCount + 1;
    }

    if (data.first1MidUnit !== null) {
      unitValue.push(data.first1MidUnit);
      unitCount = unitCount + 1;
    }
    if (data.first1FinalUnit !== null) {
      unitValue.push(data.first1FinalUnit);
      unitCount = unitCount + 1;
    }
    if (data.first2MidUnit !== null) {
      unitValue.push(data.first2MidUnit);
      unitCount = unitCount + 1;
    }
    if (data.first2FinalUnit !== null) {
      unitValue.push(data.first2FinalUnit);
      unitCount = unitCount + 1;
    }
    if (data.second1MidUnit !== null) {
      unitValue.push(data.second1MidUnit);
      unitCount = unitCount + 1;
    }
    if (data.second1FinalUnit !== null) {
      unitValue.push(data.second1FinalUnit);
      unitCount = unitCount + 1;
    }
    if (data.second2MidUnit !== null) {
      unitValue.push(data.second2MidUnit);
      unitCount = unitCount + 1;
    }
    if (data.second2FinalUnit !== null) {
      unitValue.push(data.second2FinalUnit);
      unitCount = unitCount + 1;
    }
    if (data.third1MidUnit !== null) {
      unitValue.push(data.third1MidUnit);
      unitCount = unitCount + 1;
    }
    if (data.third1FinalUnit !== null) {
      unitValue.push(data.third1FinalUnit);
      unitCount = unitCount + 1;
    }
    if (data.third2MidUnit !== null) {
      unitValue.push(data.third2MidUnit);
      unitCount = unitCount + 1;
    }
    if (data.third2FinalUnit !== null) {
      unitValue.push(data.third2FinalUnit);
      unitCount = unitCount + 1;
    }

    if (data.first1MidRate !== null) {
      rateValue.push(data.first1MidRate);
      rateCount = rateCount + 1;
    }
    if (data.first1FinalRate !== null) {
      rateValue.push(data.first1FinalRate);
      rateCount = rateCount + 1;
    }
    if (data.first2MidRate !== null) {
      rateValue.push(data.first2MidRate);
      rateCount = rateCount + 1;
    }
    if (data.first2FinalRate !== null) {
      rateValue.push(data.first2FinalRate);
      rateCount = rateCount + 1;
    }
    if (data.second1MidRate !== null) {
      rateValue.push(data.second1MidRate);
      rateCount = rateCount + 1;
    }
    if (data.second1FinalRate !== null) {
      rateValue.push(data.second1FinalRate);
      rateCount = rateCount + 1;
    }
    if (data.second2MidRate !== null) {
      rateValue.push(data.second2MidRate);
      rateCount = rateCount + 1;
    }
    if (data.second2FinalRate !== null) {
      rateValue.push(data.second2FinalRate);
      rateCount = rateCount + 1;
    }
    if (data.third1MidRate !== null) {
      rateValue.push(data.third1MidRate);
      rateCount = rateCount + 1;
    }
    if (data.third1FinalRate !== null) {
      rateValue.push(data.third1FinalRate);
      rateCount = rateCount + 1;
    }
    if (data.third2MidRate !== null) {
      rateValue.push(data.third2MidRate);
      rateCount = rateCount + 1;
    }
    if (data.third2FinalRate !== null) {
      rateValue.push(data.third2FinalRate);
      rateCount = rateCount + 1;
    }
  });

  return {
    score: _.sum(scoreValue) / scoreCount,
    average: _.sum(averageValue) / averageCount,
    unit: _.sum(unitValue) / unitCount,
    rate: _.sum(rateValue) / rateCount,
  };
};

export const getCalcExpectExamData = props => {
  let scoreValue: number[] = [];
  let scoreCount: number = 0;
  let rateValue: number[] = [];
  let rateCount: number = 0;
  let percentValue: number[] = [];
  let percentCount: number = 0;
  let standardScoreValue: number[] = [];
  let standardScoreCount: number = 0;

  props.map(data => {
    if (data.first1Score !== null) {
      scoreValue.push(data.first1Score);
      scoreCount = scoreCount + 1;
    }
    if (data.first2Score !== null) {
      scoreValue.push(data.first2Score);
      scoreCount = scoreCount + 1;
    }
    if (data.first3Score !== null) {
      scoreValue.push(data.first3Score);
      scoreCount = scoreCount + 1;
    }
    if (data.first4Score !== null) {
      scoreValue.push(data.first4Score);
      scoreCount = scoreCount + 1;
    }
    if (data.second1Score !== null) {
      scoreValue.push(data.second1Score);
      scoreCount = scoreCount + 1;
    }
    if (data.second2Score !== null) {
      scoreValue.push(data.second2Score);
      scoreCount = scoreCount + 1;
    }
    if (data.second3Score !== null) {
      scoreValue.push(data.second3Score);
      scoreCount = scoreCount + 1;
    }
    if (data.second4Score !== null) {
      scoreValue.push(data.second4Score);
      scoreCount = scoreCount + 1;
    }
    if (data.third1Score !== null) {
      scoreValue.push(data.third1Score);
      scoreCount = scoreCount + 1;
    }
    if (data.third2Score !== null) {
      scoreValue.push(data.third2Score);
      scoreCount = scoreCount + 1;
    }
    if (data.third3Score !== null) {
      scoreValue.push(data.third3Score);
      scoreCount = scoreCount + 1;
    }
    if (data.third4Score !== null) {
      scoreValue.push(data.third4Score);
      scoreCount = scoreCount + 1;
    }
    if (data.third5Score !== null) {
      scoreValue.push(data.third5Score);
      scoreCount = scoreCount + 1;
    }

    if (data.first1Rate !== null) {
      rateValue.push(data.first1Rate);
      rateCount = rateCount + 1;
    }
    if (data.first2Rate !== null) {
      rateValue.push(data.first2Rate);
      rateCount = rateCount + 1;
    }
    if (data.first3Rate !== null) {
      rateValue.push(data.first3Rate);
      rateCount = rateCount + 1;
    }
    if (data.first4Rate !== null) {
      rateValue.push(data.first4Rate);
      rateCount = rateCount + 1;
    }
    if (data.second1Rate !== null) {
      rateValue.push(data.second1Rate);
      rateCount = rateCount + 1;
    }
    if (data.second2Rate !== null) {
      rateValue.push(data.second2Rate);
      rateCount = rateCount + 1;
    }
    if (data.second3Rate !== null) {
      rateValue.push(data.second3Rate);
      rateCount = rateCount + 1;
    }
    if (data.second4Rate !== null) {
      rateValue.push(data.second4Rate);
      rateCount = rateCount + 1;
    }
    if (data.third1Rate !== null) {
      rateValue.push(data.third1Rate);
      rateCount = rateCount + 1;
    }
    if (data.third2Rate !== null) {
      rateValue.push(data.third2Rate);
      rateCount = rateCount + 1;
    }
    if (data.third3Rate !== null) {
      rateValue.push(data.third3Rate);
      rateCount = rateCount + 1;
    }
    if (data.third4Rate !== null) {
      rateValue.push(data.third4Rate);
      rateCount = rateCount + 1;
    }
    if (data.third5Rate !== null) {
      rateValue.push(data.third5Rate);
      rateCount = rateCount + 1;
    }

    if (data.first1Percent !== null) {
      percentValue.push(data.first1Percent);
      percentCount = percentCount + 1;
    }
    if (data.first2Percent !== null) {
      percentValue.push(data.first2Percent);
      percentCount = percentCount + 1;
    }
    if (data.first3Percent !== null) {
      percentValue.push(data.first3Percent);
      percentCount = percentCount + 1;
    }
    if (data.first4Percent !== null) {
      percentValue.push(data.first4Percent);
      percentCount = percentCount + 1;
    }
    if (data.second1Percent !== null) {
      percentValue.push(data.second1Percent);
      percentCount = percentCount + 1;
    }
    if (data.second2Percent !== null) {
      percentValue.push(data.second2Percent);
      percentCount = percentCount + 1;
    }
    if (data.second3Percent !== null) {
      percentValue.push(data.second3Percent);
      percentCount = percentCount + 1;
    }
    if (data.second4Percent !== null) {
      percentValue.push(data.second4Percent);
      percentCount = percentCount + 1;
    }
    if (data.third1Percent !== null) {
      percentValue.push(data.third1Percent);
      percentCount = percentCount + 1;
    }
    if (data.third2Percent !== null) {
      percentValue.push(data.third2Percent);
      percentCount = percentCount + 1;
    }
    if (data.third3Percent !== null) {
      percentValue.push(data.third3Percent);
      percentCount = percentCount + 1;
    }
    if (data.third4Percent !== null) {
      percentValue.push(data.third4Percent);
      percentCount = percentCount + 1;
    }
    if (data.third5Percent !== null) {
      percentValue.push(data.third5Percent);
      percentCount = percentCount + 1;
    }

    if (data.first1StandardScore !== null) {
      standardScoreValue.push(data.first1StandardScore);
      standardScoreCount = standardScoreCount + 1;
    }
    if (data.first2StandardScore !== null) {
      standardScoreValue.push(data.first2StandardScore);
      standardScoreCount = standardScoreCount + 1;
    }
    if (data.first3StandardScore !== null) {
      standardScoreValue.push(data.first3StandardScore);
      standardScoreCount = standardScoreCount + 1;
    }
    if (data.first4StandardScore !== null) {
      standardScoreValue.push(data.first4StandardScore);
      standardScoreCount = standardScoreCount + 1;
    }
    if (data.second1StandardScore !== null) {
      standardScoreValue.push(data.second1StandardScore);
      standardScoreCount = standardScoreCount + 1;
    }
    if (data.second2StandardScore !== null) {
      standardScoreValue.push(data.second2StandardScore);
      standardScoreCount = standardScoreCount + 1;
    }
    if (data.second3StandardScore !== null) {
      standardScoreValue.push(data.second3StandardScore);
      standardScoreCount = standardScoreCount + 1;
    }
    if (data.second4StandardScore !== null) {
      standardScoreValue.push(data.second4StandardScore);
      standardScoreCount = standardScoreCount + 1;
    }
    if (data.third1StandardScore !== null) {
      standardScoreValue.push(data.third1StandardScore);
      standardScoreCount = standardScoreCount + 1;
    }
    if (data.third2StandardScore !== null) {
      standardScoreValue.push(data.third2StandardScore);
      standardScoreCount = standardScoreCount + 1;
    }
    if (data.third3StandardScore !== null) {
      standardScoreValue.push(data.third3StandardScore);
      standardScoreCount = standardScoreCount + 1;
    }
    if (data.third4StandardScore !== null) {
      standardScoreValue.push(data.third4StandardScore);
      standardScoreCount = standardScoreCount + 1;
    }
    if (data.third5StandardScore !== null) {
      standardScoreValue.push(data.third5StandardScore);
      standardScoreCount = standardScoreCount + 1;
    }
  });

  return {
    score: _.sum(scoreValue) / scoreCount,
    rate: _.sum(rateValue) / rateCount,
    percent: _.sum(percentValue) / percentCount,
    standardScore: _.sum(standardScoreValue) / standardScoreCount,
  };
};

export const getCalcExpectStudentData = props => {
  let count: number = 0;
  let careerRelevanceValue: number[] = [];
  let careerRelevanceCount: number = 0;
  let satisfactionValue: number[] = [];
  let satisfactionCount: number = 0;

  props.map(data => {
    if (data.first1Name !== null) {
      count = count + 1;
    }
    if (data.first2Name !== null) {
      count = count + 1;
    }
    if (data.second1Name !== null) {
      count = count + 1;
    }
    if (data.second2Name !== null) {
      count = count + 1;
    }
    if (data.third1Name !== null) {
      count = count + 1;
    }
    if (data.third2Name !== null) {
      count = count + 1;
    }

    if (data.first1CareerRelevance !== null) {
      careerRelevanceValue.push(data.first1CareerRelevance);
      careerRelevanceCount = careerRelevanceCount + 1;
    }
    if (data.first2CareerRelevance !== null) {
      careerRelevanceValue.push(data.first2CareerRelevance);
      careerRelevanceCount = careerRelevanceCount + 1;
    }
    if (data.second1CareerRelevance !== null) {
      careerRelevanceValue.push(data.second1CareerRelevance);
      careerRelevanceCount = careerRelevanceCount + 1;
    }
    if (data.second2CareerRelevance !== null) {
      careerRelevanceValue.push(data.second2CareerRelevance);
      careerRelevanceCount = careerRelevanceCount + 1;
    }
    if (data.third1CareerRelevance !== null) {
      careerRelevanceValue.push(data.third1CareerRelevance);
      careerRelevanceCount = careerRelevanceCount + 1;
    }
    if (data.third2CareerRelevance !== null) {
      careerRelevanceValue.push(data.third2CareerRelevance);
      careerRelevanceCount = careerRelevanceCount + 1;
    }

    if (data.first1Satisfaction !== null) {
      satisfactionValue.push(data.first1Satisfaction);
      satisfactionCount = satisfactionCount + 1;
    }
    if (data.first2Satisfaction !== null) {
      satisfactionValue.push(data.first2Satisfaction);
      satisfactionCount = satisfactionCount + 1;
    }
    if (data.second1Satisfaction !== null) {
      satisfactionValue.push(data.second1Satisfaction);
      satisfactionCount = satisfactionCount + 1;
    }
    if (data.second2Satisfaction !== null) {
      satisfactionValue.push(data.second2Satisfaction);
      satisfactionCount = satisfactionCount + 1;
    }
    if (data.third1Satisfaction !== null) {
      satisfactionValue.push(data.third1Satisfaction);
      satisfactionCount = satisfactionCount + 1;
    }
    if (data.third2Satisfaction !== null) {
      satisfactionValue.push(data.third2Satisfaction);
      satisfactionCount = satisfactionCount + 1;
    }
  });

  return {
    count: count,
    careerRelevance: _.sum(careerRelevanceValue) / careerRelevanceCount,
    satisfaction: _.sum(satisfactionValue) / satisfactionCount,
  };
};
