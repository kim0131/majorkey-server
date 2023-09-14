-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `birth` DATETIME(3) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NULL,
    `gradeId` INTEGER NOT NULL,
    `schoolId` INTEGER NOT NULL,
    `careerDetailId` INTEGER NOT NULL,
    `favoriteSubjectId` INTEGER NOT NULL,
    `hateSubjectId` INTEGER NOT NULL,
    `wellSubjectId` INTEGER NOT NULL,
    `lessSubjectId` INTEGER NOT NULL,
    `managerId` INTEGER NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_account_key`(`account`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Manager` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `homepage` VARCHAR(191) NULL,
    `businessName` VARCHAR(191) NOT NULL,
    `businessNumber` VARCHAR(191) NOT NULL,
    `businessCeoName` VARCHAR(191) NOT NULL,
    `businessPhone` VARCHAR(191) NOT NULL,
    `businessAddress` VARCHAR(191) NOT NULL,
    `businessAddressDetail` VARCHAR(191) NOT NULL,
    `cityId` INTEGER NOT NULL,
    `terms` BOOLEAN NOT NULL DEFAULT true,
    `privacy` BOOLEAN NOT NULL DEFAULT true,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Manager_account_key`(`account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_account_key`(`account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `School` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `cityId` INTEGER NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Career` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Career_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CareerDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `careerId` INTEGER NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `City` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `City_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Textbook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Textbook_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Subject_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LearningAssessment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,
    `duration` INTEGER NOT NULL,
    `hour` INTEGER NOT NULL,
    `minutes` INTEGER NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `conceptItem` INTEGER NOT NULL,
    `conceptTextbookName` VARCHAR(191) NULL,
    `conceptAmount` INTEGER NULL,
    `conceptStrength` INTEGER NULL,
    `questionItem` INTEGER NOT NULL,
    `questionTextbookName` VARCHAR(191) NULL,
    `questionAmount` INTEGER NULL,
    `questionStrength` INTEGER NULL,
    `advancedItem` INTEGER NOT NULL,
    `advancedTextbookName` VARCHAR(191) NULL,
    `advancedAmount` INTEGER NULL,
    `advancedStrength` INTEGER NULL,
    `actualItem` INTEGER NOT NULL,
    `actualTextbookName` VARCHAR(191) NULL,
    `actualAmount` INTEGER NULL,
    `actualStrength` INTEGER NULL,
    `learningCategory` INTEGER NOT NULL,
    `reviewCycle` INTEGER NOT NULL,
    `concentration` INTEGER NOT NULL,
    `understand` INTEGER NOT NULL,
    `correctRate` INTEGER NOT NULL,
    `taskComplete` INTEGER NOT NULL,
    `weekPoint` INTEGER NOT NULL,
    `obstruction` VARCHAR(191) NOT NULL,
    `evaluation` VARCHAR(191) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CareerAssessment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ebti1` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL DEFAULT 0,
    `type` VARCHAR(191) NOT NULL,
    `chaeum` INTEGER NOT NULL,
    `saeum` INTEGER NOT NULL,
    `kium` INTEGER NOT NULL,
    `dotum` INTEGER NOT NULL,
    `answer1` INTEGER NOT NULL,
    `answer2` INTEGER NOT NULL,
    `answer3` INTEGER NOT NULL,
    `answer4` INTEGER NOT NULL,
    `answer5` INTEGER NOT NULL,
    `answer6` INTEGER NOT NULL,
    `answer7` INTEGER NOT NULL,
    `answer8` INTEGER NOT NULL,
    `answer9` INTEGER NOT NULL,
    `answer10` INTEGER NOT NULL,
    `answer11` INTEGER NOT NULL,
    `answer12` INTEGER NOT NULL,
    `answer13` INTEGER NOT NULL,
    `answer14` INTEGER NOT NULL,
    `answer15` INTEGER NOT NULL,
    `answer16` INTEGER NOT NULL,
    `answer17` INTEGER NOT NULL,
    `answer18` INTEGER NOT NULL,
    `answer19` INTEGER NOT NULL,
    `answer20` INTEGER NOT NULL,
    `answer21` INTEGER NOT NULL,
    `answer22` INTEGER NOT NULL,
    `answer23` INTEGER NOT NULL,
    `answer24` INTEGER NOT NULL,
    `answer25` INTEGER NOT NULL,
    `answer26` INTEGER NOT NULL,
    `answer27` INTEGER NOT NULL,
    `answer28` INTEGER NOT NULL,
    `answer29` INTEGER NOT NULL,
    `answer30` INTEGER NOT NULL,
    `answer31` INTEGER NOT NULL,
    `answer32` INTEGER NOT NULL,
    `answer33` INTEGER NOT NULL,
    `answer34` INTEGER NOT NULL,
    `answer35` INTEGER NOT NULL,
    `answer36` INTEGER NOT NULL,
    `answer37` INTEGER NOT NULL,
    `answer38` INTEGER NOT NULL,
    `answer39` INTEGER NOT NULL,
    `answer40` INTEGER NOT NULL,
    `answer41` INTEGER NOT NULL,
    `answer42` INTEGER NOT NULL,
    `answer43` INTEGER NOT NULL,
    `answer44` INTEGER NOT NULL,
    `answer45` INTEGER NOT NULL,
    `answer46` INTEGER NOT NULL,
    `answer47` INTEGER NOT NULL,
    `answer48` INTEGER NOT NULL,
    `answer49` INTEGER NOT NULL,
    `answer50` INTEGER NOT NULL,
    `answer51` INTEGER NOT NULL,
    `answer52` INTEGER NOT NULL,
    `answer53` INTEGER NOT NULL,
    `answer54` INTEGER NOT NULL,
    `answer55` INTEGER NOT NULL,
    `answer56` INTEGER NOT NULL,
    `answer57` INTEGER NOT NULL,
    `answer58` INTEGER NOT NULL,
    `answer59` INTEGER NOT NULL,
    `answer60` INTEGER NOT NULL,
    `result1` INTEGER NOT NULL,
    `result2` INTEGER NOT NULL,
    `result3` INTEGER NOT NULL,
    `result4` INTEGER NOT NULL,
    `result5` INTEGER NOT NULL,
    `result6` INTEGER NOT NULL,
    `result7` INTEGER NOT NULL,
    `result8` INTEGER NOT NULL,
    `result9` INTEGER NOT NULL,
    `result10` INTEGER NOT NULL,
    `result11` INTEGER NOT NULL,
    `result12` INTEGER NOT NULL,
    `result13` INTEGER NOT NULL,
    `result14` INTEGER NOT NULL,
    `result15` INTEGER NOT NULL,
    `result16` INTEGER NOT NULL,
    `result17` INTEGER NOT NULL,
    `result18` INTEGER NOT NULL,
    `result19` INTEGER NOT NULL,
    `result20` INTEGER NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ebti1Quest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtype` VARCHAR(191) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomizedPlan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `startTime` INTEGER NOT NULL,
    `endTime` INTEGER NOT NULL,
    `status` INTEGER NOT NULL,
    `conceptTextbookName` VARCHAR(191) NOT NULL,
    `conceptUnit` VARCHAR(191) NOT NULL,
    `conceptAmount` VARCHAR(191) NOT NULL,
    `questionTextbookName` VARCHAR(191) NOT NULL,
    `questionUnit` VARCHAR(191) NOT NULL,
    `questionAmount` VARCHAR(191) NOT NULL,
    `advancedTextbookName` VARCHAR(191) NOT NULL,
    `advancedUnit` VARCHAR(191) NOT NULL,
    `advancedAmount` VARCHAR(191) NOT NULL,
    `actualTextbookName` VARCHAR(191) NOT NULL,
    `actualUnit` VARCHAR(191) NOT NULL,
    `actualAmount` VARCHAR(191) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `College` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `College_name_year_key`(`name`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CollegeDepartment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `collegeId` INTEGER NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CollegeEarly` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `rate` VARCHAR(191) NOT NULL,
    `satLimit` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `collegeDepartmentId` INTEGER NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CollegeRegular` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `rate` VARCHAR(191) NOT NULL,
    `satUnit` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `reflection` VARCHAR(191) NOT NULL,
    `collegeDepartmentId` INTEGER NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consult1` (
    `con_idx` INTEGER NOT NULL AUTO_INCREMENT,
    `chk_idx` INTEGER NULL,
    `res_idx` INTEGER NULL,
    `mb_idx` INTEGER NOT NULL DEFAULT 0,
    `con_subject` VARCHAR(191) NULL,
    `con_unit` VARCHAR(191) NULL,
    `con_plan` VARCHAR(191) NULL,
    `con_study_analysis` VARCHAR(191) NULL,
    `con_form` VARCHAR(191) NULL,
    `con_text_book` VARCHAR(191) NOT NULL,
    `con_text_book_name` VARCHAR(191) NOT NULL,
    `con_volume` VARCHAR(191) NULL,
    `con_check` VARCHAR(191) NULL,
    `con_record` VARCHAR(191) NULL,
    `con_solution_plan` VARCHAR(191) NULL,
    `con_cycle` VARCHAR(191) NOT NULL,
    `con_activity` VARCHAR(191) NULL,
    `con_concentrativeness` VARCHAR(191) NULL,
    `con_concentration` VARCHAR(191) NULL,
    `con_prepar` VARCHAR(191) NULL,
    `con_attiutde` VARCHAR(191) NULL,
    `con_concept` VARCHAR(191) NOT NULL,
    `con_concept1` VARCHAR(191) NOT NULL,
    `con_concept2` VARCHAR(191) NOT NULL,
    `con_concept3` VARCHAR(191) NOT NULL,
    `con_concept4` VARCHAR(191) NOT NULL,
    `con_explanation` VARCHAR(191) NOT NULL,
    `con_explanation1` VARCHAR(191) NOT NULL,
    `con_explanation2` VARCHAR(191) NOT NULL,
    `con_explanation3` VARCHAR(191) NOT NULL,
    `con_explanation4` VARCHAR(191) NOT NULL,
    `con_test_explanation` VARCHAR(191) NOT NULL,
    `con_test_explanation1` VARCHAR(191) NOT NULL,
    `con_test_explanation2` VARCHAR(191) NOT NULL,
    `con_test_explanation3` VARCHAR(191) NOT NULL,
    `con_test_explanation4` VARCHAR(191) NOT NULL,
    `con_repetition` VARCHAR(191) NOT NULL,
    `con_intelligibility` VARCHAR(191) NOT NULL,
    `con_disturbance` VARCHAR(191) NOT NULL,
    `con_self_learning` VARCHAR(191) NOT NULL,
    `reg_dt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reg_ip` VARCHAR(191) NULL,
    `mod_dt` DATETIME(3) NULL,
    `mod_ip` VARCHAR(191) NULL,
    `con_creation_cycle` VARCHAR(191) NULL,
    `con_keyword_plan` VARCHAR(191) NULL,
    `con_check_cycle` VARCHAR(191) NULL,
    `con_feedback_partner` VARCHAR(191) NULL,
    `con_feedback_achievement` VARCHAR(191) NULL,
    `con_apply_subject` VARCHAR(191) NULL,
    `con_apply_partner` VARCHAR(191) NULL,
    `con_apply_activity` VARCHAR(191) NULL,
    `con_appraisal` VARCHAR(191) NULL,
    `con_correction` VARCHAR(191) NULL,
    `con_actual` VARCHAR(191) NULL,
    `con_actual1` VARCHAR(191) NULL,
    `con_actual2` VARCHAR(191) NULL,
    `con_actual3` VARCHAR(191) NULL,
    `con_actual4` VARCHAR(191) NULL,
    `con_answer_rate` VARCHAR(191) NULL,
    `con_completion` VARCHAR(191) NULL,
    `con_weakness` VARCHAR(191) NULL,
    `con_time` VARCHAR(191) NULL,
    `con_learning_time` VARCHAR(191) NULL,
    `con_period` INTEGER NULL,
    `con_concentrativeness_time` VARCHAR(191) NULL,
    `total` INTEGER NULL,
    `con_study_class` VARCHAR(191) NULL,
    `con_study_class_msg` VARCHAR(191) NULL,
    `con_mental` INTEGER NULL,
    `con_recommend_time` VARCHAR(191) NULL,
    `con_recommend_problem` VARCHAR(191) NULL,

    PRIMARY KEY (`con_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consult2` (
    `con_idx` INTEGER NOT NULL AUTO_INCREMENT,
    `chk_idx` INTEGER NULL,
    `res_idx` INTEGER NULL,
    `mb_idx` INTEGER NOT NULL DEFAULT 0,
    `con_activity_name` VARCHAR(191) NULL,
    `con_activity_select` VARCHAR(191) NULL,
    `con_space` VARCHAR(191) NULL,
    `con_activity_time` VARCHAR(191) NULL,
    `con_area` VARCHAR(191) NULL,
    `con_subject` VARCHAR(191) NULL,
    `con_part` VARCHAR(191) NULL,
    `con_technique` VARCHAR(191) NULL,
    `con_save` VARCHAR(191) NULL,
    `con_capability` VARCHAR(191) NULL,
    `con_capability_detail` VARCHAR(191) NULL,
    `con_ties` VARCHAR(191) NULL,
    `con_satisfaction` VARCHAR(191) NULL,
    `con_career` VARCHAR(191) NULL,
    `con_lead` VARCHAR(191) NULL,
    `con_interest` VARCHAR(191) NOT NULL,
    `con_appraisal` VARCHAR(191) NULL,
    `reg_dt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reg_ip` VARCHAR(191) NULL,
    `mod_dt` DATETIME(3) NULL,
    `mod_ip` VARCHAR(191) NULL,
    `con_correction` VARCHAR(191) NULL,
    `con_activity` VARCHAR(191) NULL,
    `con_content` VARCHAR(191) NULL,
    `con_realization` VARCHAR(191) NULL,

    PRIMARY KEY (`con_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consult3` (
    `con_idx` INTEGER NOT NULL AUTO_INCREMENT,
    `chk_idx` INTEGER NULL,
    `res_idx` INTEGER NULL,
    `mb_idx` INTEGER NOT NULL DEFAULT 0,
    `con_class_hour` VARCHAR(191) NOT NULL DEFAULT '',
    `con_practice` VARCHAR(191) NOT NULL DEFAULT '',
    `con_review` VARCHAR(191) NOT NULL DEFAULT '',
    `con_analysis` VARCHAR(191) NOT NULL DEFAULT '',
    `con_solution_method` VARCHAR(191) NOT NULL DEFAULT '',
    `con_study_attitude` VARCHAR(191) NOT NULL DEFAULT '',
    `con_utilization_method` VARCHAR(191) NOT NULL DEFAULT '',
    `con_performance_status` VARCHAR(191) NOT NULL DEFAULT '',
    `con_other_activities` VARCHAR(191) NOT NULL DEFAULT '',
    `con_study_type` VARCHAR(191) NOT NULL DEFAULT '',
    `con_understanding` VARCHAR(191) NOT NULL DEFAULT '',
    `con_participation` VARCHAR(191) NOT NULL DEFAULT '',
    `con_reading` VARCHAR(191) NOT NULL DEFAULT '',
    `con_additional_activities` VARCHAR(191) NOT NULL DEFAULT '',
    `con_alteration` VARCHAR(191) NOT NULL DEFAULT '',
    `con_activity_time` VARCHAR(191) NOT NULL DEFAULT '',
    `con_effort` VARCHAR(191) NOT NULL DEFAULT '',
    `con_point` VARCHAR(191) NOT NULL DEFAULT '',
    `con_scheduled_activity` VARCHAR(191) NOT NULL DEFAULT '',
    `con_type_competition` VARCHAR(191) NOT NULL DEFAULT '',
    `con_academic_achievement` VARCHAR(191) NOT NULL DEFAULT '',
    `con_achievement_num` VARCHAR(191) NOT NULL DEFAULT '',
    `con_activity_num` VARCHAR(191) NOT NULL DEFAULT '',
    `con_additional_study` VARCHAR(191) NOT NULL DEFAULT '',
    `con_record_activity_num` VARCHAR(191) NOT NULL DEFAULT '',
    `con_preparation_method` VARCHAR(191) NOT NULL DEFAULT '',
    `con_experience` VARCHAR(191) NOT NULL DEFAULT '',
    `con_my_strength` VARCHAR(191) NOT NULL DEFAULT '',
    `con_action` VARCHAR(191) NOT NULL DEFAULT '',
    `con_necessary_lesson` VARCHAR(191) NOT NULL DEFAULT '',
    `reg_dt` DATETIME(3) NOT NULL,
    `reg_ip` VARCHAR(191) NOT NULL DEFAULT '',
    `mod_dt` DATETIME(3) NOT NULL,
    `mod_ip` VARCHAR(191) NOT NULL DEFAULT '',
    `con_satisfaction` VARCHAR(191) NOT NULL DEFAULT '0',
    `con_total_score` VARCHAR(191) NOT NULL DEFAULT '0',
    `con_correction` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`con_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MyLearning` (
    `act_idx` INTEGER NOT NULL AUTO_INCREMENT,
    `mb_idx` INTEGER NOT NULL DEFAULT 0,
    `act_subject` VARCHAR(191) NULL,
    `act_start_time` VARCHAR(191) NULL,
    `act_end_time` VARCHAR(191) NULL,
    `act_chapter` VARCHAR(191) NULL,
    `act_study_book` VARCHAR(191) NULL,
    `act_study_book_name` VARCHAR(191) NULL,
    `act_study_book_publishing` VARCHAR(191) NULL,
    `act_study_type` VARCHAR(191) NULL,
    `act_concept` VARCHAR(191) NULL,
    `act_concept_page_num` VARCHAR(191) NULL,
    `act_explanation` VARCHAR(191) NULL,
    `act_question_count` VARCHAR(191) NULL,
    `act_test_explanation` VARCHAR(191) NULL,
    `reg_dt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reg_ip` VARCHAR(191) NULL,
    `mod_dt` DATETIME(3) NULL,
    `mod_ip` VARCHAR(191) NULL,
    `act_result_concentration` VARCHAR(191) NULL,
    `act_result_study_time` VARCHAR(191) NULL,
    `act_result_appraisal` VARCHAR(191) NULL,
    `result_dt` DATETIME(3) NULL,
    `result_ip` VARCHAR(191) NULL,

    PRIMARY KEY (`act_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `Grade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_careerDetailId_fkey` FOREIGN KEY (`careerDetailId`) REFERENCES `CareerDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_favoriteSubjectId_fkey` FOREIGN KEY (`favoriteSubjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_hateSubjectId_fkey` FOREIGN KEY (`hateSubjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_wellSubjectId_fkey` FOREIGN KEY (`wellSubjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_lessSubjectId_fkey` FOREIGN KEY (`lessSubjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `Manager`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Manager` ADD CONSTRAINT `Manager_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `School` ADD CONSTRAINT `School_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CareerDetail` ADD CONSTRAINT `CareerDetail_careerId_fkey` FOREIGN KEY (`careerId`) REFERENCES `Career`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningAssessment` ADD CONSTRAINT `LearningAssessment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningAssessment` ADD CONSTRAINT `LearningAssessment_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningAssessment` ADD CONSTRAINT `LearningAssessment_conceptTextbookName_fkey` FOREIGN KEY (`conceptTextbookName`) REFERENCES `Textbook`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningAssessment` ADD CONSTRAINT `LearningAssessment_questionTextbookName_fkey` FOREIGN KEY (`questionTextbookName`) REFERENCES `Textbook`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningAssessment` ADD CONSTRAINT `LearningAssessment_advancedTextbookName_fkey` FOREIGN KEY (`advancedTextbookName`) REFERENCES `Textbook`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningAssessment` ADD CONSTRAINT `LearningAssessment_actualTextbookName_fkey` FOREIGN KEY (`actualTextbookName`) REFERENCES `Textbook`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ebti1` ADD CONSTRAINT `Ebti1_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomizedPlan` ADD CONSTRAINT `CustomizedPlan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomizedPlan` ADD CONSTRAINT `CustomizedPlan_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomizedPlan` ADD CONSTRAINT `CustomizedPlan_conceptTextbookName_fkey` FOREIGN KEY (`conceptTextbookName`) REFERENCES `Textbook`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomizedPlan` ADD CONSTRAINT `CustomizedPlan_questionTextbookName_fkey` FOREIGN KEY (`questionTextbookName`) REFERENCES `Textbook`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomizedPlan` ADD CONSTRAINT `CustomizedPlan_advancedTextbookName_fkey` FOREIGN KEY (`advancedTextbookName`) REFERENCES `Textbook`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomizedPlan` ADD CONSTRAINT `CustomizedPlan_actualTextbookName_fkey` FOREIGN KEY (`actualTextbookName`) REFERENCES `Textbook`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollegeDepartment` ADD CONSTRAINT `CollegeDepartment_collegeId_fkey` FOREIGN KEY (`collegeId`) REFERENCES `College`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollegeEarly` ADD CONSTRAINT `CollegeEarly_collegeDepartmentId_fkey` FOREIGN KEY (`collegeDepartmentId`) REFERENCES `CollegeDepartment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollegeRegular` ADD CONSTRAINT `CollegeRegular_collegeDepartmentId_fkey` FOREIGN KEY (`collegeDepartmentId`) REFERENCES `CollegeDepartment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
