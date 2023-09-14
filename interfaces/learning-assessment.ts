import { LearningAssessment } from "@prisma/client";

export interface LearningAssessmentCreate {
  userId: LearningAssessment["userId"];
  subjectId: LearningAssessment["subjectId"];
  duration: LearningAssessment["duration"];
  hour: LearningAssessment["hour"];
  minutes: LearningAssessment["minutes"];
  unit: LearningAssessment["unit"];
  conceptTextbookName: LearningAssessment["conceptTextbookName"];
  conceptItem: LearningAssessment["conceptItem"];
  conceptAmount: LearningAssessment["conceptAmount"];
  conceptStrength: LearningAssessment["conceptStrength"];
  questionTextbookName: LearningAssessment["questionTextbookName"];
  questionItem: LearningAssessment["questionItem"];
  questionAmount: LearningAssessment["questionAmount"];
  questionStrength: LearningAssessment["questionStrength"];
  advancedTextbookName: LearningAssessment["advancedTextbookName"];
  advancedItem: LearningAssessment["advancedItem"];
  advancedAmount: LearningAssessment["advancedAmount"];
  advancedStrength: LearningAssessment["advancedStrength"];
  actualTextbookName: LearningAssessment["actualTextbookName"];
  actualItem: LearningAssessment["actualItem"];
  actualAmount: LearningAssessment["actualAmount"];
  actualStrength: LearningAssessment["actualStrength"];
  learningCategory: LearningAssessment["learningCategory"];
  reviewCycle: LearningAssessment["reviewCycle"];
  concentration: LearningAssessment["concentration"];
  understand: LearningAssessment["understand"];
  correctRate: LearningAssessment["correctRate"];
  taskComplete: LearningAssessment["taskComplete"];
  weekPoint: LearningAssessment["weekPoint"];
  obstruction: LearningAssessment["obstruction"];
  evaluation: LearningAssessment["evaluation"];
}
