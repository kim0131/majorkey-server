import { customizedStrategy } from "../data/customized-strategy";

export const getCustomizedStrategy = props => {
  if (props === null) {
    return null;
  }

  let scoreGrade = 0;
  let mentalGrade = 0;
  let percent = 0;

  const score = (props.correctRate + props.taskComplete) / 2;

  switch (props.scoreGrade) {
    case "1A":
      scoreGrade = 0;
      break;
    case "1B":
      scoreGrade = 1;
      break;
    case "1C":
      scoreGrade = 2;
      break;
    case "2A":
      scoreGrade = 3;
      break;
    case "2B":
      scoreGrade = 4;
      break;
    case "2C":
      scoreGrade = 5;
      break;
    case "3A":
      scoreGrade = 6;
      break;
    case "3B":
      scoreGrade = 7;
      break;
    case "3C":
      scoreGrade = 8;
      break;
    case "4":
      scoreGrade = 9;
      break;
    case "5":
      scoreGrade = 10;
      break;
    case "6":
      scoreGrade = 11;
      break;
    default:
      break;
  }
  switch (props.mentalGrade) {
    case 1:
      mentalGrade = 0;
      break;
    case 2:
      mentalGrade = 1;
      break;
    case 3:
      mentalGrade = 2;
      break;
    case 4:
      mentalGrade = 3;
      break;
    case 5:
      mentalGrade = 4;
      break;
    default:
      break;
  }
  if (score >= 80) {
    percent = 0;
  } else if (score >= 60) {
    percent = 1;
  } else if (score >= 40) {
    percent = 2;
  } else {
    percent = 3;
  }

  return customizedStrategy[scoreGrade].content[mentalGrade].content[percent]
    .data;
};
