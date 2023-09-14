import _ from "lodash";
import { ebtiQuestData } from "../data/ebti/ebti";
import { ebti1QuestData } from "../data/ebti/ebti-1";
import { ebti2QuestData } from "../data/ebti/ebti-2";

// 순위 구하기
const getRank = (value, arr) => {
  const sorted = arr.slice().sort((a, b) => {
    return b - a;
  });
  const rank = sorted.indexOf(value);
  if (rank > -1) return rank + 1;
  return null;
};

// EBTI 데이터 결과 전처리
export const getEbtiResultData = async (req, user) => {
  let types = {
    real: 0,
    habit: 0,
    research: 0,
    progress: 0,
    society: 0,
    art: 0,
  };
  let answers = {
    answer1: 0,
    answer2: 0,
    answer3: 0,
    answer4: 0,
    answer5: 0,
    answer6: 0,
    answer7: 0,
    answer8: 0,
    answer9: 0,
    answer10: 0,
    answer11: 0,
    answer12: 0,
    answer13: 0,
    answer14: 0,
    answer15: 0,
    answer16: 0,
    answer17: 0,
    answer18: 0,
    answer19: 0,
    answer20: 0,
    answer21: 0,
    answer22: 0,
    answer23: 0,
    answer24: 0,
    answer25: 0,
    answer26: 0,
    answer27: 0,
    answer28: 0,
    answer29: 0,
    answer30: 0,
    answer31: 0,
    answer32: 0,
    answer33: 0,
    answer34: 0,
    answer35: 0,
    answer36: 0,
    answer37: 0,
    answer38: 0,
    answer39: 0,
    answer40: 0,
    answer41: 0,
    answer42: 0,
    answer43: 0,
    answer44: 0,
    answer45: 0,
    answer46: 0,
    answer47: 0,
    answer48: 0,
    answer49: 0,
    answer50: 0,
    answer51: 0,
    answer52: 0,
    answer53: 0,
    answer54: 0,
    answer55: 0,
    answer56: 0,
    answer57: 0,
    answer58: 0,
    answer59: 0,
    answer60: 0,
  };

  await req.map(answer => {
    const selectData = ebtiQuestData.find(data => data.id === answer.id);

    if (selectData) {
      switch (selectData.type) {
        case "현실형":
          types.real = types.real + answer.value * 2;
          break;
        case "관습형":
          types.habit = types.habit + answer.value * 2;
          break;
        case "탐구형":
          types.research = types.research + answer.value * 2;
          break;
        case "진취형":
          types.progress = types.progress + answer.value * 2;
          break;
        case "사회형":
          types.society = types.society + answer.value * 2;
          break;
        case "예술형":
          types.art = types.art + answer.value * 2;
          break;
        default:
          break;
      }
    }
    answers["answer" + answer.id] = answer.value;
    return;
  });

  const type = _.maxBy(_.keys(types), o => types[o]);

  // 데이터 전처리
  const userDataArr = [
    ...user
      .filter(item => item.ebti.length >= 1)
      .map(item => ({
        real: item.ebti[0].real,
        habit: item.ebti[0].habit,
        research: item.ebti[0].research,
        progress: item.ebti[0].progress,
        society: item.ebti[0].society,
        art: item.ebti[0].art,
      })),
    types,
  ];

  // 모집단 개수
  const userCount = userDataArr.length;

  // 평균
  const userAvg = {
    real: _.sumBy(userDataArr, i => i.real) / userCount,
    habit: _.sumBy(userDataArr, i => i.habit) / userCount,
    research: _.sumBy(userDataArr, i => i.research) / userCount,
    progress: _.sumBy(userDataArr, i => i.progress) / userCount,
    society: _.sumBy(userDataArr, i => i.society) / userCount,
    art: _.sumBy(userDataArr, i => i.art) / userCount,
  };

  // 원점수 제곱
  const userSquareRoot = userDataArr.map(item => ({
    real: item.real ** 2,
    habit: item.habit ** 2,
    research: item.research ** 2,
    progress: item.progress ** 2,
    society: item.society ** 2,
    art: item.art ** 2,
  }));

  // 평균 제곱
  const userAvgSquareRoot = {
    real: userAvg.real ** 2,
    habit: userAvg.habit ** 2,
    research: userAvg.research ** 2,
    progress: userAvg.progress ** 2,
    society: userAvg.society ** 2,
    art: userAvg.art ** 2,
  };

  // 원점수 제곱 합계
  const userSquareRootSum = {
    real: _.sumBy(userSquareRoot, i => i.real),
    habit: _.sumBy(userSquareRoot, i => i.habit),
    research: _.sumBy(userSquareRoot, i => i.research),
    progress: _.sumBy(userSquareRoot, i => i.progress),
    society: _.sumBy(userSquareRoot, i => i.society),
    art: _.sumBy(userSquareRoot, i => i.art),
  };

  // 편차
  const userDeviation = {
    real: types.real - userAvg.real,
    habit: types.habit - userAvg.habit,
    research: types.research - userAvg.research,
    progress: types.progress - userAvg.progress,
    society: types.society - userAvg.society,
    art: types.art - userAvg.art,
  };

  // 표준편차
  const userStandardDeviation = {
    real: Math.sqrt(
      userSquareRootSum.real / userCount - userAvgSquareRoot.real,
    ),
    habit: Math.sqrt(
      userSquareRootSum.habit / userCount - userAvgSquareRoot.habit,
    ),
    research: Math.sqrt(
      userSquareRootSum.research / userCount - userAvgSquareRoot.research,
    ),
    progress: Math.sqrt(
      userSquareRootSum.progress / userCount - userAvgSquareRoot.progress,
    ),
    society: Math.sqrt(
      userSquareRootSum.society / userCount - userAvgSquareRoot.society,
    ),
    art: Math.sqrt(userSquareRootSum.art / userCount - userAvgSquareRoot.art),
  };

  // T스코어
  const userTScore = {
    real: (userDeviation.real / userStandardDeviation.real) * 10 + 50,
    habit: (userDeviation.habit / userStandardDeviation.habit) * 10 + 50,
    research:
      (userDeviation.research / userStandardDeviation.research) * 10 + 50,
    progress:
      (userDeviation.progress / userStandardDeviation.progress) * 10 + 50,
    society: (userDeviation.society / userStandardDeviation.society) * 10 + 50,
    art: (userDeviation.art / userStandardDeviation.art) * 10 + 50,
  };

  //백분위
  const userPercent = {
    real:
      100 -
      (getRank(
        types.real,
        userDataArr.map(i => i.real),
      ) /
        userCount) *
        100,
    habit:
      100 -
      (getRank(
        types.habit,
        userDataArr.map(i => i.habit),
      ) /
        userCount) *
        100,
    research:
      100 -
      (getRank(
        types.research,
        userDataArr.map(i => i.research),
      ) /
        userCount) *
        100,
    progress:
      100 -
      (getRank(
        types.progress,
        userDataArr.map(i => i.progress),
      ) /
        userCount) *
        100,
    society:
      100 -
      (getRank(
        types.society,
        userDataArr.map(i => i.society),
      ) /
        userCount) *
        100,
    art:
      100 -
      (getRank(
        types.art,
        userDataArr.map(i => i.art),
      ) /
        userCount) *
        100,
  };

  return {
    type: type,
    ...types,
    ...answers,
    tscoreReal: userTScore.real || 0,
    tscoreHabit: userTScore.habit || 0,
    tscoreResearch: userTScore.research || 0,
    tscoreProgress: userTScore.progress || 0,
    tscoreSociety: userTScore.society || 0,
    tscoreArt: userTScore.art || 0,
    percentReal: userPercent.real,
    percentHabit: userPercent.habit,
    percentResearch: userPercent.research,
    percentProgress: userPercent.progress,
    percentSociety: userPercent.society,
    percentArt: userPercent.art,
  };
};

// EBTI 1 데이터 결과 전처리
export const getEbti1ResultData = async (req, user) => {
  let types = {
    chaeum: 0,
    saeum: 0,
    kium: 0,
    dotum: 0,
  };
  let results = {
    result1: 0,
    result2: 0,
    result3: 0,
    result4: 0,
    result5: 0,
    result6: 0,
    result7: 0,
    result8: 0,
    result9: 0,
    result10: 0,
    result11: 0,
    result12: 0,
    result13: 0,
    result14: 0,
    result15: 0,
    result16: 0,
    result17: 0,
    result18: 0,
    result19: 0,
    result20: 0,
  };
  let answers = {
    answer1: 0,
    answer2: 0,
    answer3: 0,
    answer4: 0,
    answer5: 0,
    answer6: 0,
    answer7: 0,
    answer8: 0,
    answer9: 0,
    answer10: 0,
    answer11: 0,
    answer12: 0,
    answer13: 0,
    answer14: 0,
    answer15: 0,
    answer16: 0,
    answer17: 0,
    answer18: 0,
    answer19: 0,
    answer20: 0,
    answer21: 0,
    answer22: 0,
    answer23: 0,
    answer24: 0,
    answer25: 0,
    answer26: 0,
    answer27: 0,
    answer28: 0,
    answer29: 0,
    answer30: 0,
    answer31: 0,
    answer32: 0,
    answer33: 0,
    answer34: 0,
    answer35: 0,
    answer36: 0,
    answer37: 0,
    answer38: 0,
    answer39: 0,
    answer40: 0,
    answer41: 0,
    answer42: 0,
    answer43: 0,
    answer44: 0,
    answer45: 0,
    answer46: 0,
    answer47: 0,
    answer48: 0,
    answer49: 0,
    answer50: 0,
    answer51: 0,
    answer52: 0,
    answer53: 0,
    answer54: 0,
    answer55: 0,
    answer56: 0,
    answer57: 0,
    answer58: 0,
    answer59: 0,
    answer60: 0,
  };

  await req.map(answer => {
    const selectData = ebti1QuestData.find(data => data.id === answer.id);

    if (selectData) {
      switch (selectData.type) {
        case "채움형":
          types.chaeum = types.chaeum + answer.value;
          break;
        case "세움형":
          types.saeum = types.saeum + answer.value;
          break;
        case "키움형":
          types.kium = types.kium + answer.value;
          break;
        case "돋움형":
          types.dotum = types.dotum + answer.value;
          break;
        default:
          break;
      }
      switch (selectData.subtype) {
        case "변화":
          results.result1 = results.result1 + answer.value;
          break;
        case "예술":
          results.result2 = results.result2 + answer.value;
          break;
        case "체계":
          results.result3 = results.result3 + answer.value;
          break;
        case "대비":
          results.result4 = results.result4 + answer.value;
          break;
        case "조화":
          results.result5 = results.result5 + answer.value;
          break;
        case "합리":
          results.result6 = results.result6 + answer.value;
          break;
        case "자아":
          results.result7 = results.result7 + answer.value;
          break;
        case "분석":
          results.result8 = results.result8 + answer.value;
          break;
        case "책임":
          results.result9 = results.result9 + answer.value;
          break;
        case "목표":
          results.result10 = results.result10 + answer.value;
          break;
        case "탐색":
          results.result11 = results.result11 + answer.value;
          break;
        case "현실":
          results.result12 = results.result12 + answer.value;
          break;
        case "조작":
          results.result13 = results.result13 + answer.value;
          break;
        case "감정":
          results.result14 = results.result14 + answer.value;
          break;
        case "활동":
          results.result15 = results.result15 + answer.value;
          break;
        case "조언":
          results.result16 = results.result16 + answer.value;
          break;
        case "창의":
          results.result17 = results.result17 + answer.value;
          break;
        case "타인":
          results.result18 = results.result18 + answer.value;
          break;
        case "주제":
          results.result19 = results.result19 + answer.value;
          break;
        case "주체":
          results.result20 = results.result20 + answer.value;
          break;
        default:
          break;
      }
    }
    answers["answer" + answer.id] = answer.value;
    return;
  });

  const type = _.maxBy(_.keys(types), o => types[o]);

  // 데이터 전처리
  const userDataArr = [
    ...user
      .filter(item => item.ebti1.length >= 1)
      .map(item => ({
        chaeum: item.ebti1[0].chaeum,
        saeum: item.ebti1[0].saeum,
        kium: item.ebti1[0].kium,
        dotum: item.ebti1[0].dotum,
      })),
    types,
  ];

  // 모집단 개수
  const userCount = userDataArr.length;

  // 평균
  const userAvg = {
    chaeum: _.sumBy(userDataArr, i => i.chaeum) / userCount,
    saeum: _.sumBy(userDataArr, i => i.saeum) / userCount,
    kium: _.sumBy(userDataArr, i => i.kium) / userCount,
    dotum: _.sumBy(userDataArr, i => i.dotum) / userCount,
  };

  // 원점수 제곱
  const userSquareRoot = userDataArr.map(item => ({
    chaeum: item.chaeum ** 2,
    saeum: item.saeum ** 2,
    kium: item.kium ** 2,
    dotum: item.dotum ** 2,
  }));

  // 평균 제곱
  const userAvgSquareRoot = {
    chaeum: userAvg.chaeum ** 2,
    saeum: userAvg.saeum ** 2,
    kium: userAvg.kium ** 2,
    dotum: userAvg.dotum ** 2,
  };

  // 원점수 제곱 합계
  const userSquareRootSum = {
    chaeum: _.sumBy(userSquareRoot, i => i.chaeum),
    saeum: _.sumBy(userSquareRoot, i => i.saeum),
    kium: _.sumBy(userSquareRoot, i => i.kium),
    dotum: _.sumBy(userSquareRoot, i => i.dotum),
  };

  // 편차
  const userDeviation = {
    chaeum: types.chaeum - userAvg.chaeum,
    saeum: types.saeum - userAvg.saeum,
    kium: types.kium - userAvg.kium,
    dotum: types.dotum - userAvg.dotum,
  };

  // 표준편차
  const userStandardDeviation = {
    chaeum: Math.sqrt(
      userSquareRootSum.chaeum / userCount - userAvgSquareRoot.chaeum,
    ),
    saeum: Math.sqrt(
      userSquareRootSum.saeum / userCount - userAvgSquareRoot.saeum,
    ),
    kium: Math.sqrt(
      userSquareRootSum.kium / userCount - userAvgSquareRoot.kium,
    ),
    dotum: Math.sqrt(
      userSquareRootSum.dotum / userCount - userAvgSquareRoot.dotum,
    ),
  };

  // T스코어
  const userTScore = {
    chaeum: (userDeviation.chaeum / userStandardDeviation.chaeum) * 10 + 50,
    saeum: (userDeviation.saeum / userStandardDeviation.saeum) * 10 + 50,
    kium: (userDeviation.kium / userStandardDeviation.kium) * 10 + 50,
    dotum: (userDeviation.dotum / userStandardDeviation.dotum) * 10 + 50,
  };

  //백분위
  const userPercent = {
    chaeum:
      100 -
      (getRank(
        types.chaeum,
        userDataArr.map(i => i.chaeum),
      ) /
        userCount) *
        100,
    saeum:
      100 -
      (getRank(
        types.saeum,
        userDataArr.map(i => i.saeum),
      ) /
        userCount) *
        100,
    kium:
      100 -
      (getRank(
        types.kium,
        userDataArr.map(i => i.kium),
      ) /
        userCount) *
        100,
    dotum:
      100 -
      (getRank(
        types.dotum,
        userDataArr.map(i => i.dotum),
      ) /
        userCount) *
        100,
  };

  return {
    type: type,
    ...types,
    ...results,
    ...answers,
    tscoreChaeum: userTScore.chaeum || 0,
    tscoreSaeum: userTScore.saeum || 0,
    tscoreKium: userTScore.kium || 0,
    tscoreDotum: userTScore.dotum || 0,
    percentChaeum: userPercent.chaeum,
    percentSaeum: userPercent.saeum,
    percentKium: userPercent.kium,
    percentDotum: userPercent.dotum,
  };
};

// EBTI2 데이터 결과 전처리
export const getEbti2ResultData = async (req, user) => {
  let types = {
    language: 0,
    math: 0,
    view: 0,
    body: 0,
    music: 0,
    nature: 0,
    self: 0,
    interpersonal: 0,
  };
  let answers = {
    answer1: 0,
    answer2: 0,
    answer3: 0,
    answer4: 0,
    answer5: 0,
    answer6: 0,
    answer7: 0,
    answer8: 0,
    answer9: 0,
    answer10: 0,
    answer11: 0,
    answer12: 0,
    answer13: 0,
    answer14: 0,
    answer15: 0,
    answer16: 0,
    answer17: 0,
    answer18: 0,
    answer19: 0,
    answer20: 0,
    answer21: 0,
    answer22: 0,
    answer23: 0,
    answer24: 0,
    answer25: 0,
    answer26: 0,
    answer27: 0,
    answer28: 0,
    answer29: 0,
    answer30: 0,
    answer31: 0,
    answer32: 0,
    answer33: 0,
    answer34: 0,
    answer35: 0,
    answer36: 0,
    answer37: 0,
    answer38: 0,
    answer39: 0,
    answer40: 0,
    answer41: 0,
    answer42: 0,
    answer43: 0,
    answer44: 0,
    answer45: 0,
    answer46: 0,
    answer47: 0,
    answer48: 0,
    answer49: 0,
    answer50: 0,
    answer51: 0,
    answer52: 0,
    answer53: 0,
    answer54: 0,
    answer55: 0,
    answer56: 0,
  };

  await req.map(answer => {
    const selectData = ebti2QuestData.find(data => data.id === answer.id);

    if (selectData) {
      switch (selectData.type) {
        case "언어지능":
          types.language = types.language + answer.value;
          break;
        case "논리수학지능":
          types.math = types.math + answer.value;
          break;
        case "시각공간지능":
          types.view = types.view + answer.value;
          break;
        case "신체운동":
          types.body = types.body + answer.value;
          break;
        case "음악지능":
          types.music = types.music + answer.value;
          break;
        case "자연지능":
          types.nature = types.nature + answer.value;
          break;
        case "자기이해지능":
          types.self = types.self + answer.value;
          break;
        case "대인관계지능":
          types.interpersonal = types.interpersonal + answer.value;
          break;
        default:
          break;
      }
    }
    answers["answer" + answer.id] = answer.value;
    return;
  });

  const type = _.maxBy(_.keys(types), o => types[o]);

  // 데이터 전처리
  const userDataArr = [
    ...user
      .filter(item => item.ebti2.length >= 1)
      .map(item => ({
        language: item.ebti2[0].language,
        math: item.ebti2[0].math,
        view: item.ebti2[0].view,
        body: item.ebti2[0].body,
        music: item.ebti2[0].music,
        nature: item.ebti2[0].nature,
        self: item.ebti2[0].self,
        interpersonal: item.ebti2[0].interpersonal,
      })),
    types,
  ];

  // 모집단 개수
  const userCount = userDataArr.length;

  // 평균
  const userAvg = {
    language: _.sumBy(userDataArr, i => i.language) / userCount,
    math: _.sumBy(userDataArr, i => i.math) / userCount,
    view: _.sumBy(userDataArr, i => i.view) / userCount,
    body: _.sumBy(userDataArr, i => i.body) / userCount,
    music: _.sumBy(userDataArr, i => i.music) / userCount,
    nature: _.sumBy(userDataArr, i => i.nature) / userCount,
    self: _.sumBy(userDataArr, i => i.self) / userCount,
    interpersonal: _.sumBy(userDataArr, i => i.interpersonal) / userCount,
  };

  // 원점수 제곱
  const userSquareRoot = userDataArr.map(item => ({
    language: item.language ** 2,
    math: item.math ** 2,
    view: item.view ** 2,
    body: item.body ** 2,
    music: item.music ** 2,
    nature: item.nature ** 2,
    self: item.self ** 2,
    interpersonal: item.interpersonal ** 2,
  }));

  // 평균 제곱
  const userAvgSquareRoot = {
    language: userAvg.language ** 2,
    math: userAvg.math ** 2,
    view: userAvg.view ** 2,
    body: userAvg.body ** 2,
    music: userAvg.music ** 2,
    nature: userAvg.nature ** 2,
    self: userAvg.self ** 2,
    interpersonal: userAvg.interpersonal ** 2,
  };

  // 원점수 제곱 합계
  const userSquareRootSum = {
    language: _.sumBy(userSquareRoot, i => i.language),
    math: _.sumBy(userSquareRoot, i => i.math),
    view: _.sumBy(userSquareRoot, i => i.view),
    body: _.sumBy(userSquareRoot, i => i.body),
    music: _.sumBy(userSquareRoot, i => i.music),
    nature: _.sumBy(userSquareRoot, i => i.nature),
    self: _.sumBy(userSquareRoot, i => i.self),
    interpersonal: _.sumBy(userSquareRoot, i => i.interpersonal),
  };

  // 편차
  const userDeviation = {
    language: types.language - userAvg.language,
    math: types.math - userAvg.math,
    view: types.view - userAvg.view,
    body: types.body - userAvg.body,
    music: types.music - userAvg.music,
    nature: types.nature - userAvg.nature,
    self: types.self - userAvg.self,
    interpersonal: types.interpersonal - userAvg.interpersonal,
  };

  // 표준편차
  const userStandardDeviation = {
    language: Math.sqrt(
      userSquareRootSum.language / userCount - userAvgSquareRoot.language,
    ),
    math: Math.sqrt(
      userSquareRootSum.math / userCount - userAvgSquareRoot.math,
    ),
    view: Math.sqrt(
      userSquareRootSum.view / userCount - userAvgSquareRoot.view,
    ),
    body: Math.sqrt(
      userSquareRootSum.body / userCount - userAvgSquareRoot.body,
    ),
    music: Math.sqrt(
      userSquareRootSum.music / userCount - userAvgSquareRoot.music,
    ),
    nature: Math.sqrt(
      userSquareRootSum.nature / userCount - userAvgSquareRoot.nature,
    ),
    self: Math.sqrt(
      userSquareRootSum.self / userCount - userAvgSquareRoot.self,
    ),
    interpersonal: Math.sqrt(
      userSquareRootSum.interpersonal / userCount -
        userAvgSquareRoot.interpersonal,
    ),
  };

  // T스코어
  const userTScore = {
    language:
      (userDeviation.language / userStandardDeviation.language) * 10 + 50,
    math: (userDeviation.math / userStandardDeviation.math) * 10 + 50,
    view: (userDeviation.view / userStandardDeviation.view) * 10 + 50,
    body: (userDeviation.body / userStandardDeviation.body) * 10 + 50,
    music: (userDeviation.music / userStandardDeviation.music) * 10 + 50,
    nature: (userDeviation.nature / userStandardDeviation.nature) * 10 + 50,
    self: (userDeviation.self / userStandardDeviation.self) * 10 + 50,
    interpersonal:
      (userDeviation.interpersonal / userStandardDeviation.interpersonal) * 10 +
      50,
  };

  //백분위
  const userPercent = {
    language:
      100 -
      (getRank(
        types.language,
        userDataArr.map(i => i.language),
      ) /
        userCount) *
        100,
    math:
      100 -
      (getRank(
        types.math,
        userDataArr.map(i => i.math),
      ) /
        userCount) *
        100,
    view:
      100 -
      (getRank(
        types.view,
        userDataArr.map(i => i.view),
      ) /
        userCount) *
        100,
    body:
      100 -
      (getRank(
        types.body,
        userDataArr.map(i => i.body),
      ) /
        userCount) *
        100,
    music:
      100 -
      (getRank(
        types.music,
        userDataArr.map(i => i.music),
      ) /
        userCount) *
        100,
    nature:
      100 -
      (getRank(
        types.nature,
        userDataArr.map(i => i.nature),
      ) /
        userCount) *
        100,
    self:
      100 -
      (getRank(
        types.self,
        userDataArr.map(i => i.self),
      ) /
        userCount) *
        100,
    interpersonal:
      100 -
      (getRank(
        types.interpersonal,
        userDataArr.map(i => i.interpersonal),
      ) /
        userCount) *
        100,
  };

  return {
    type: type,
    ...types,
    ...answers,
    tscoreLanguage: userTScore.language || 0,
    tscoreMath: userTScore.math || 0,
    tscoreView: userTScore.view || 0,
    tscoreBody: userTScore.body || 0,
    tscoreMusic: userTScore.music || 0,
    tscoreNature: userTScore.nature || 0,
    tscoreSelf: userTScore.self || 0,
    tscoreInterpersonal: userTScore.interpersonal || 0,
    percentLanguage: userPercent.language,
    percentMath: userPercent.math,
    percentView: userPercent.view,
    percentBody: userPercent.body,
    percentMusic: userPercent.music,
    percentNature: userPercent.nature,
    percentSelf: userPercent.self,
    percentInterpersonal: userPercent.interpersonal,
  };
};
