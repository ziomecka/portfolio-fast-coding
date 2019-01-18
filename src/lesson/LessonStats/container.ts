import { connect } from 'react-redux';

import { default as LessonStats } from './component';
import { ApplicationState } from '@appStore';

import { LessonStatsState } from './_duck/';

import { WithStyles } from '@material-ui/core/styles';
import { WithTableProps } from '@app/Table/';

import { LocalizeState } from 'react-localize-redux';

const mapStateToProps = ( state: ApplicationState ): ExtendedLessonStatsState => ( {
    allErrors: state.lesson.lessonComparator.allErrors,
    errors: state.lesson.lessonComparator.errors,
    text: state.lesson.lessonComponent.lessonText,
    endedLesson: state.lesson.lessonComponent.ended,
    ...state.lesson.lessonStats,
    localize: state.localize
} );

const LessonStatsContainer = connect( mapStateToProps )( LessonStats );

export default LessonStatsContainer;

interface ExtendedLessonStatsState extends LessonStatsState {
    allErrors: number[];
    errors: number[];
    text: string;
    endedLesson: boolean;
    localize: LocalizeState;
}

export interface LessonStatsProps extends ExtendedLessonStatsState, WithStyles, WithTableProps {}
