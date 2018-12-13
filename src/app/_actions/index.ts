import { Action } from 'redux';

import { actions as dialogActions, DialogActions } from '../Dialog/_duck/actions';
import { actions as newUserFormActions, NewUserFormActions } from '../NewUserForm/_duck/actions';
import { actions as notificationActions, NotificationActions } from '../Notification/_duck/actions';
import { actions as passwordActions, PasswordActions } from '../Password/_duck/actions';
import { actions as formHelperTextActions, FormHelperTextActions } from '../FormHelperText/_duck/actions';
import { actions as welcomeActions, WelcomeActions } from '../Welcome/_duck/actions';
import { actions as submenuActions, SubMenuActions } from '../SubMenu/_duck/actions';
import { actions as appmenuActions, AppMenuActions } from '../AppMenu/_duck/actions';

export const actions = {
    ...dialogActions,
    ...newUserFormActions,
    ...notificationActions,
    ...passwordActions,
    ...formHelperTextActions,
    ...welcomeActions,
    ...submenuActions,
    ...appmenuActions
};

export type AppActions = Action |
    DialogActions |
    NewUserFormActions |
    NotificationActions |
    PasswordActions |
    FormHelperTextActions |
    WelcomeActions |
    SubMenuActions |
    AppMenuActions;
