import { LessonsDataI } from '@components/CoursesLoader/_duck/types';

export type LocalStorageDataTypes = LessonsDataI;

export enum LocalStorageItemEnum {
    lessons = 'LESSONS',
    lessonComparator = 'LESSON_COMPARATOR',
    lesson = 'LESSON',
    lessonStats = 'LESSON_STATS'
}
