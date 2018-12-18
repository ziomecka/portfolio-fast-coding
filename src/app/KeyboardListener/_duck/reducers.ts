import { Reducer } from 'redux';

import { KeyboardListenerListenersType } from './types';

import { KeyboardListenerActions } from './actions';
import { AppContainers, ComponentsContainersEnum, ViewsContainersEnum, MenuContainersEnum } from '@applicationTypes';

const { dialog, welcome } = AppContainers;
const { lesson } = ComponentsContainersEnum;
const { homeView } = ViewsContainersEnum;
const { languagesMenu, mainMenu, userMenu } = MenuContainersEnum;

export const INITIAL_STATE: KeyboardListenerState = {
    listeners: new Map([
        [ dialog, new Map() ],
        // @ts-ignore
        [ lesson, new Map([]) ],
        // @ts-ignore
        [ homeView, new Map([]) ],
        [ welcome, new Map([]) ],
        // @ts-ignore
        [ languagesMenu, new Map([]) ],
        // @ts-ignore
        [ mainMenu, new Map([]) ],
        // @ts-ignore
        [ userMenu, new Map([]) ]
    ])
};

const reducer: Reducer<KeyboardListenerState, KeyboardListenerActions> = (state = INITIAL_STATE) => {
    return { ...state };
}

export { reducer as keyboardListenerReducer };

export interface KeyboardListenerState {
    listeners: KeyboardListenerListenersType;
};