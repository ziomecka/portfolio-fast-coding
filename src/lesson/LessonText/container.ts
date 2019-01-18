import { connect } from 'react-redux';

import { default as LessonText } from './component';
import { ApplicationState } from '@appStore';

import { LessonComparatorState } from '@lesson/LessonComparator/';
import { LessonState } from '@lesson/LessonComponent/';

import { WithStyles } from '@material-ui/core/styles';

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => ( {
    ...state.lesson.lessonComparator,
    ...state.lesson.lesson
} );

const LessonTextContainer = connect( mapStateToProps )( LessonText );

export default LessonTextContainer;

interface MapStateToPropsI extends LessonComparatorState, LessonState {}

export interface LessonTextProps extends
    MapStateToPropsI,
    WithStyles {}
