import * as manageKeydownListeners from '@app/KeyboardListener/_duck/operations';
import { isEnter, isEscape } from '@lesson/LessonComparator/';
import { AppRoutesEnum } from '@appTypes';
import { LessonContainersEnum } from '@lessonTypes';
import { Dispatch } from 'redux';
import history from '@shared/history';
import { onRestartLesson } from '@lesson/_operations/';

const { lessons } = AppRoutesEnum;
const { lessonComponent: container } = LessonContainersEnum;

let listenerId;

const escapeReturnListener = ( e: KeyboardEvent, dispatch: Dispatch ): void => {
    if ( isEscape( e.keyCode ) ) {
        // TODO reset everything
        history.push( lessons );
    }

    if ( isEnter( e.keyCode ) ) {
        dispatch( onRestartLesson() );
    }
};

export const addEscapeReturnListener = ( dispatch: Dispatch ): number => {
    listenerId = manageKeydownListeners.onAddListener( {
        container,
        listener: [ 'keydown', ( e: KeyboardEvent ) => {
            e.stopPropagation();
            return escapeReturnListener( e, dispatch );
        } ]
    } );
    return listenerId;
};

export const removeAllKeyDownListeners = (): boolean => manageKeydownListeners.onRemoveAllListeners( { container } );
