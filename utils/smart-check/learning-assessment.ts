import {
  actualLevelData,
  advancedLevelData,
  conceptLevelData,
  questionLevelData,
} from "../../data/smart-check/learning-assessment";

// 추천 시간
const recTime = data => {
  const time = data.hour * 60 + data.minutes;
  // 학습 효율도
  const efficiency = (data.concentration + data.understand) / 200;
  //학년 가중치
  const gradeWeight = () => {
    if (data.gradeId === 1) {
      return 1.1;
    } else if (data.gradeId === 2) {
      return 1.2;
    } else if (data.gradeId === 3) {
      return 1.3;
    } else if (data.gradeId === 4) {
      return 1.15;
    } else if (data.gradeId === 5) {
      return 1.25;
    } else return 1.35;
  };

  // 추천 문제수
  const recProblem = () => {
    // 소수점 계산
    const point =
      Math.floor((time * (efficiency + 0.1) * gradeWeight()) / 60) +
      Math.floor((time * (efficiency + 0.1) * gradeWeight()) % 60) / 100;

    return Math.ceil((((point * 5) / 100) * 80 * 350) / 100);
  };

  return {
    hour: Math.floor((time * (efficiency + 0.1) * gradeWeight()) / 60),
    minutes: Math.floor((time * (efficiency + 0.1) * gradeWeight()) % 60),
    problem: recProblem(),
    mentalGrade: mentalGrade(data),
  };
};

const mentalValue = data => {
  const efficiency = (data.concentration + data.understand) / 2;
  const efficiencyWeight = () => {
    if (efficiency >= 90) {
      return 1.5;
    } else if (efficiency >= 80) {
      return 1.4;
    } else if (efficiency >= 70) {
      return 1.3;
    } else if (efficiency >= 60) {
      return 1.2;
    } else {
      return 1.1;
    }
  };
  const timeWeight = () => {
    let time = data.hour * 60 + data.minutes;
    if (time >= 1000) {
      return 1.8;
    } else if (time >= 600) {
      return 1.5;
    } else if (time >= 100) {
      return 1.2;
    } else {
      return 1;
    }
  };
  return efficiencyWeight() * timeWeight() * 49.263 * 0.85;
};

const mentalGrade = data => {
  const value = mentalValue(data);
  if (value >= 60) {
    return 5;
  } else if (value >= 40) {
    return 4;
  } else if (value >= 30) {
    return 3;
  } else if (value >= 20) {
    return 2;
  } else {
    return 1;
  }
};

// 진단 총점
const scoreTotal = data => {
  const {
    duration,
    conceptItem,
    conceptAmount,
    conceptStrength,
    questionItem,
    questionAmount,
    questionStrength,
    advancedItem,
    advancedAmount,
    advancedStrength,
    actualItem,
    actualAmount,
    actualStrength,
    hour,
    concentration,
    taskComplete,
    understand,
    correctRate,
  } = data;

  const scoreItem = (item: number) => {
    if (item === 5) return 0;
    else if (item === 1) return 2;
    else if (item === 2) return 4;
    else if (item === 3) return 6;
    else if (item === 4) return 8;
  };

  const scoreAmount = (item: number) => {
    if (item === 1) return 0;
    else if (item === 2) return 1;
    else if (item === 3) return 2;
    else if (item === 4) return 3;
    else return 4;
  };

  const scoreStrength = (item: number) => {
    if (item === 1) return 0;
    else if (item === 2) return 0.5;
    else if (item === 3) return 1;
    else if (item === 4) return 1.5;
    else return 2;
  };

  const scorePercentage = (item: number) => {
    if (item >= 90) return 8;
    else if (item >= 80) return 6;
    else if (item >= 70) return 4;
    else if (item >= 60) return 2;
    else return 0;
  };

  const itemScore = [conceptItem, questionItem, advancedItem, actualItem]
    .map(item => scoreItem(item))
    .reduce((a: any, b: any) => a + b, 0);

  const amountScore = [
    conceptAmount,
    questionAmount,
    advancedAmount,
    actualAmount,
  ]
    .map(item => scoreAmount(item))
    .reduce((a: any, b: any) => a + b, 0);
  const strengthScore = [
    conceptStrength,
    questionStrength,
    advancedStrength,
    actualStrength,
  ]
    .map(item => scoreStrength(item))
    .reduce((a: any, b: any) => a + b, 0);

  const timeScore = () => {
    if (duration === 1) {
      if (hour >= 6) return 18;
      else if (hour >= 5) return 14;
      else if (hour >= 4) return 10;
      else if (hour >= 3) return 6;
      else if (hour >= 1) return 4;
      else if (hour > 0) return 2;
      else return 0;
    } else if (duration === 2) {
      if (hour >= 8) return 18;
      else if (hour >= 7) return 14;
      else if (hour >= 6) return 10;
      else if (hour >= 4) return 6;
      else if (hour >= 2) return 4;
      else if (hour > 0) return 2;
      else return 0;
    } else if (duration === 3) {
      if (hour >= 9) return 18;
      else if (hour >= 7) return 14;
      else if (hour >= 6) return 10;
      else if (hour >= 4) return 6;
      else if (hour >= 2) return 4;
      else if (hour > 0) return 2;
      else return 0;
    } else if (duration === 4) {
      if (hour >= 10) return 18;
      else if (hour >= 8) return 14;
      else if (hour >= 6) return 10;
      else if (hour >= 4) return 6;
      else if (hour >= 2) return 4;
      else if (hour > 0) return 2;
      else return 0;
    } else if (duration === 5) {
      if (hour >= 11) return 18;
      else if (hour >= 8) return 14;
      else if (hour >= 6) return 10;
      else if (hour >= 4) return 6;
      else if (hour >= 2) return 4;
      else if (hour > 0) return 2;
      else return 0;
    } else if (duration === 6) {
      if (hour >= 12) return 18;
      else if (hour >= 10) return 14;
      else if (hour >= 7) return 10;
      else if (hour >= 5) return 6;
      else if (hour >= 2) return 4;
      else if (hour > 0) return 2;
      else return 0;
    } else if (duration === 7) {
      if (hour >= 14) return 18;
      else if (hour >= 11) return 14;
      else if (hour >= 8) return 10;
      else if (hour >= 5) return 6;
      else if (hour >= 2) return 4;
      else if (hour > 0) return 2;
      else return 0;
    }
  };

  const percentageScore = [concentration, understand, taskComplete, correctRate]
    .map(item => scorePercentage(item))
    .reduce((a: any, b: any) => a + b, 0);

  return (
    Math.floor(itemScore + amountScore + strengthScore + timeScore() + percentageScore)
  );
};

export const learningScoreGrade = (item: number) => {
  if (item >= 95)
    return {
      grade: "1A",
      content:
        "최고예요!! 공부선수인 당신 이제 효율성을 높여볼까요?<br/>학습 시 실전과 같이 집중도를 올리고, 실전대비 공부분량, 강도 체크하기",
    };
  else if (item >= 91)
    return {
      grade: "1B",
      content:
        "최고예요!! 공부선수인 당신 이제 효율성을 높여볼까요?<br/>학습 시 실전과 같이 집중도를 올리고, 실전대비 공부분량, 강도 체크하기",
    };
  else if (item >= 86)
    return {
      grade: "1C",
      content:
        "최고예요!! 공부선수인 당신 이제 효율성을 높여볼까요?<br/>학습 시 실전과 같이 집중도를 올리고, 실전대비 공부분량, 강도 체크하기",
    };
  else if (item >= 80)
    return {
      grade: "2A",
      content:
        "훌륭해요!! 공부하면서 놓치는게 없는지 다시 점검해볼까요?<br/>학습 시 문제풀이 강도, 심화학습법 체크하기",
    };
  else if (item >= 76)
    return {
      grade: "2B",
      content:
        "훌륭해요!! 공부하면서 놓치는게 없는지 다시 점검해볼까요?<br/>학습 시 문제풀이 강도, 심화학습법 체크하기",
    };
  else if (item >= 70)
    return {
      grade: "2C",
      content:
        "훌륭해요!! 공부하면서 놓치는게 없는지 다시 점검해볼까요?<br/>학습 시 문제풀이 강도, 심화학습법 체크하기",
    };
  else if (item >= 66)
    return {
      grade: "3A",
      content:
        "대단해요!! 힘들게 학습한 시간이 어느 정도로 도움이 됐을까요?<br/>문제풀이 분량과 강도 및 정답율 체크하기",
    };
  else if (item >= 60)
    return {
      grade: "3B",
      content:
        "대단해요!! 힘들게 학습한 시간이 어느 정도로 도움이 됐을까요?<br/>문제풀이 분량과 강도 및 정답율 체크하기",
    };
  else if (item >= 50)
    return {
      grade: "3C",
      content:
        "대단해요!! 힘들게 학습한 시간이 어느 정도로 도움이 됐을까요?<br/>문제풀이 분량과 강도 및 정답율 체크하기",
    };
  else if (item >= 30)
    return {
      grade: "4",
      content:
        "잘하셨네요!! 여기서부터 학습시간을 조금씩 늘려볼까요?<br/>학습 시 개념분량과 이해도는 어느 정도인지 체크하기",
    };
  else if (item >= 20)
    return {
      grade: "5",
      content:
        "파이팅!! 잘하고 있는지 점검해볼까요?<br/>학습 시 개념 이해도는 어느 정도인지 체크하기",
    };
  else
    return {
      grade: "6",
      content:
        "출발!! 이제부터 학습시간을 정해볼까요?<br/>과제완성도를 높이고, 개념분량 체크와 이해도를 높여보자",
    };
};

const levelData = (item: number, learningScoreGrade: string) => {
  if (
    learningScoreGrade === "1A" ||
    learningScoreGrade === "1B" ||
    learningScoreGrade === "1C"
  ) {
    if (item >= 55) return 3;
    else return 2;
  } else if (
    learningScoreGrade === "2A" ||
    learningScoreGrade === "2B" ||
    learningScoreGrade === "2C"
  ) {
    if (item >= 75) return 3;
    else return 2;
  } else if (
    learningScoreGrade === "3A" ||
    learningScoreGrade === "3B" ||
    learningScoreGrade === "3C"
  ) {
    if (item >= 55) return 2;
    else return 1;
  } else return 1;
};

export const getLearningAssessmentResultData = (data: any) => {
  return {
    concentrationHour: Math.floor(
      ((data.hour * 60 + data.minutes) *
        (data.concentration + data.understand)) /
        200 /
        60,
    ),
    concentrationMinutes: Math.round(
      (((data.hour * 60 + data.minutes) *
        (data.concentration + data.understand)) /
        200) %
        60,
    ),
    averageHour: Math.floor(
      (data.hour * 60 + data.minutes) / data.duration / 60,
    ),
    averageMinutes: Math.round(
      ((data.hour * 60 + data.minutes) / data.duration) % 60,
    ),
    scoreTotal: scoreTotal(data),
    scoreGrade: learningScoreGrade(scoreTotal(data)).grade,
    scoreContent: learningScoreGrade(scoreTotal(data)).content,
    recHour: recTime(data).hour,
    recMinutes: recTime(data).minutes,
    recProblem: recTime(data).problem,
    mentalGrade: mentalGrade(data),
    ...(data.conceptItem !== 5 && {
      conceptLevel: levelData(
        (data.understand + data.taskComplete) / 2,
        learningScoreGrade(scoreTotal(data)).grade,
      ),
      conceptMessage:
        conceptLevelData[data.conceptItem - 1].array[
          levelData(
            (data.understand + data.taskComplete) / 2,
            learningScoreGrade(scoreTotal(data)).grade,
          ) - 1
        ],
    }),
    ...(data.questionItem !== 5 && {
      questionLevel: levelData(
        (data.correctRate + data.taskComplete) / 2,
        learningScoreGrade(scoreTotal(data)).grade,
      ),
      questionMessage:
        questionLevelData[data.questionItem - 1].array[
          levelData(
            (data.correctRate + data.taskComplete) / 2,
            learningScoreGrade(scoreTotal(data)).grade,
          ) - 1
        ],
    }),
    ...(data.advancedItem !== 5 && {
      advancedLevel: levelData(
        (data.understand + data.concentration) / 2,
        learningScoreGrade(scoreTotal(data)).grade,
      ),
      advancedMessage:
        advancedLevelData[data.advancedItem - 1].array[
          levelData(
            (data.understand + data.concentration) / 2,
            learningScoreGrade(scoreTotal(data)).grade,
          ) - 1
        ],
    }),
    ...(data.actualItem !== 5 && {
      actualLevel: levelData(
        (data.understand + data.concentration + data.correctRate) / 2,
        learningScoreGrade(scoreTotal(data)).grade,
      ),
      actualMessage:
        actualLevelData[data.actualItem - 1].array[
          levelData(
            (data.understand + data.concentration + data.correctRate) / 2,
            learningScoreGrade(scoreTotal(data)).grade,
          ) - 1
        ],
    }),
  };
};
