import { Action, ActionCreator } from 'redux';
import { LessonButtonsActionsEnum } from './types';

const {
    COMPONENTS_LESSON_BUTTONS_MOVE,
    COMPONENTS_LESSON_DRAGABLE_TURNON,
    COMPONENTS_LESSON_DRAGABLE_TURNOFF,
    COMPONENTS_LESSON_DRAGABLE_RESET

} = LessonButtonsActionsEnum;

export const moveLessonButtons: ActionCreator<MoveLessonButtonsAction> = ( top, left ) => ( {
    type: COMPONENTS_LESSON_BUTTONS_MOVE,
    top,
    left
} );

export const turnOnDraggableLessonButtons: ActionCreator<Action> = () => ( {
    type: COMPONENTS_LESSON_DRAGABLE_TURNON
} );

export const turnOffDraggableLessonButtons: ActionCreator<Action> = () => ( {
    type: COMPONENTS_LESSON_DRAGABLE_TURNOFF
} );

export const resetDraggableLessonButtons: ActionCreator<Action> = () => ( {
    type: COMPONENTS_LESSON_DRAGABLE_RESET
} );

export interface MoveLessonButtonsAction extends Action {
    readonly type: string;
    top: number | 'auto';
    left: number | 'auto';
}

export type LessonButtonsActions = Action | MoveLessonButtonsAction;