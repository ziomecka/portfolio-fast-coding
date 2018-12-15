import { Dispatch} from 'redux';
import {
    ApplicationContainers,
    ComponentsContainers,
    LocalStorageItemTypes,
    ThunkGetStateType
} from '../../../../_common/';

const { components } = ApplicationContainers;

import { LessonState } from '../reducers';
import { StatsState } from '../../Stats/_duck/reducers';
import { ComparatorState } from '../../Comparator/_duck/reducers';

import { RestoreStateAction as LessonRestoreStateAction } from '../actions';
import { RestoreStateAction as StatsRestoreStateAction } from '../../Stats/_duck/actions';
import { RestoreStateAction as ComparatorRestoreStateAction } from '../../Comparator/_duck/actions';

import { localStorageSetItem, localStorageGetItem, localStorageRemoveItem } from '../../../../app/LocalStorage/_duck/operations';

export const onKeepState = (localStorageItem: LocalStorageItemTypes, container: ComponentsContainers): any => (
    (dispatch: Dispatch, getState: ThunkGetStateType): boolean => (
        localStorageSetItem(localStorageItem, getState()[components][container])
    )
);

export const onRemoveState = (localStorageItem: LocalStorageItemTypes): any => (
    (dispatch: Dispatch, getState: ThunkGetStateType): boolean => (
        localStorageRemoveItem(localStorageItem)
));

export const onRestoreState = (
    localStorageItem: LocalStorageItemTypes,
    action: (data) => LessonRestoreStateAction | StatsRestoreStateAction | ComparatorRestoreStateAction,
    clearState: boolean = false
    ): any => (
        async (dispatch: Dispatch): Promise<boolean> => {
            let data = localStorageGetItem(localStorageItem);

            if (data) {
                let answer = await dispatch(action(data as LessonState | StatsState | ComparatorState));

                /**
                 * Comparator and stats require clearing state
                 * But it is done when new lesson is opened. Not here.
                 * */
                if (clearState) {
                    dispatch(onRemoveState(localStorageItem));
                }

                if (answer) {
                    data = null;
                    answer = null;
                    return true;
                }
            }

            return Promise.resolve(false);
        }
    );

export default {
    onKeepState,
    onRestoreState,
    onRemoveState
};