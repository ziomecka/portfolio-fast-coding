import { Dispatch } from 'redux';
import { ApplicationState } from '../../../_reducers';
import { ApplicationContainers, ComponentsContainers } from '../../../_common';

const { components } = ApplicationContainers;
const { comparator, lesson } = ComponentsContainers;

import {
    resetLesson,
    endingLesson,
    notEndingLesson,
    endLesson,
    restartLesson
} from './actions';

import { onResetComparator } from '../Comparator/_duck/operations';
import { onTurnOffComparator } from '../Comparator/_duck/operations';
import { resetStats } from '../Stats/_duck/actions';

/** Time to correct the last sign */
const waitForLastSign = 800;
let timeout;

export const onEndLesson = (): any => (dispatch: Dispatch) => {
    clearTimeout(timeout);
    dispatch(endLesson());
};

const _endLesson = (dispatch, getState) => {
    let state = getState()[components];

    if ( (state[lesson].text.length - 1) === state[comparator].currentSignIndex) {
        /** Comparator ends lesson after switching off keyboardListener and stats */
        dispatch(onTurnOffComparator());
    }
    clearTimeout(timeout);
};

export const onNotEndingLesson = (): any => (dispatch: Dispatch, getState: () => ApplicationState) => {
    clearTimeout(timeout);
    dispatch(notEndingLesson());
};

export const onEndingLesson = (): any => (dispatch: Dispatch, getState: () => ApplicationState) => {
    const { ending } = getState()[components][lesson];

    if (!ending) {
        dispatch(endingLesson());

        timeout = setTimeout(
            () => _endLesson(dispatch, getState),
            waitForLastSign
        );
    }
};

export const onReset = (): any => (dispatch: Dispatch) => {
    dispatch(onResetComparator());
    dispatch(resetStats());
    dispatch(resetLesson());
    clearTimeout(timeout);
};

export const onRestartLesson = (): any => (dispatch: Dispatch): void => {
    dispatch(onResetComparator());
    dispatch(resetStats());
    dispatch(restartLesson());
    clearTimeout(timeout);
};

export default {
    onEndingLesson,
    onReset
};