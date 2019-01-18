import { ILessonTextGeneratorState, } from '@lesson/LessonTextGenerator/';
import { LessonButtonsState } from '@lesson/LessonButtons/';
import { LessonComparatorState } from '@lesson/LessonComparator/';
import { LessonState } from '@lesson/LessonComponent/';
import { LessonStatsState } from '@lesson/LessonStats/';

export enum LessonContainersEnum {
    lessonComparator = 'lessonComparator',
    lesson = 'lesson',
    lessonTextGenerator = 'lessonTextGenerator',
    lessonButtons = 'lessonButtons',
    lessonStats = 'lessonStats'
}

export interface ILessonState {
    lessonComparator: LessonComparatorState;
    lesson: LessonState;
    lessonTextGenerator: ILessonTextGeneratorState;
    lessonButtons: LessonButtonsState;
    lessonStats: LessonStatsState;
}
