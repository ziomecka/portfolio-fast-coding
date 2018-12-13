import { Action, ActionCreator } from 'redux';
import { PasswordTypes } from './types';

import { PasswordTypes as _PasswordTypes } from '../../_common/';
import { AppContainers } from '../../_common';

import { invalidError } from '../../../shared/_types/';

const { confirmPass, currentPass, newPass, pass } = _PasswordTypes;

const {
    APP_PASSWORD_SET_PASSWORD_CURRENT,
    APP_PASSWORD_SET_PASSWORD_NEW,
    APP_PASSWORD_SET_PASSWORD_CONFIRM,
    APP_PASSWORD_SET_PASSWORD,
    APP_PASSWORD_VALIDATE_CURRENT,
    APP_PASSWORD_VALIDATE_NEW,
    APP_PASSWORD_VALIDATE_CONFIRM,
    APP_PASSWORD_VALIDATE
} = PasswordTypes;

const setPasswordCurrent: ActionCreator<SetPasswordAction> = (password: string, container: AppContainers) => ({
    type: APP_PASSWORD_SET_PASSWORD_CURRENT,
    password,
    container
});

const setPasswordNew: ActionCreator<SetPasswordAction> = (password: string, container: AppContainers) => ({
    type: APP_PASSWORD_SET_PASSWORD_NEW,
    password,
    container
});

const setPasswordConfirm: ActionCreator<SetPasswordAction> = (password: string, container: AppContainers) => ({
    type: APP_PASSWORD_SET_PASSWORD_CONFIRM,
    password,
    container
});

const _setPassword: ActionCreator<SetPasswordAction> = (password: string, container: AppContainers) => ({
    type: APP_PASSWORD_SET_PASSWORD,
    password,
    container
});

export const validatePasswordCurrent: ActionCreator<ValidatePasswordAction> = (passwordValid: invalidError, container: AppContainers) => ({
    type: APP_PASSWORD_VALIDATE_CURRENT,
    passwordValid,
    container
});

export const validatePasswordNew: ActionCreator<ValidatePasswordAction> = (passwordValid: invalidError, container: AppContainers) => ({
    type: APP_PASSWORD_VALIDATE_NEW,
    passwordValid,
    container
});

export const validatePasswordConfirm: ActionCreator<ValidatePasswordAction> = (passwordValid: invalidError, container: AppContainers) => ({
    type: APP_PASSWORD_VALIDATE_CONFIRM,
    passwordValid,
    container
});

export const _validatePassword: ActionCreator<ValidatePasswordAction> = (passwordValid: invalidError, container: AppContainers) => ({
    type: APP_PASSWORD_VALIDATE,
    passwordValid,
    container
});

const actionsMap = {
    [currentPass]: [ setPasswordCurrent, validatePasswordCurrent ],
    [newPass]: [ setPasswordNew, validatePasswordNew ],
    [confirmPass]: [ setPasswordConfirm, validatePasswordConfirm ],
    [pass]: [ _setPassword, _validatePassword ]
};

export const setPassword: ActionCreator<SetPasswordAction> = (password, passwordType: string, container: AppContainers) => (
    actionsMap[passwordType][0](password, container)
);

export const validatePassword: ActionCreator<ValidatePasswordAction> = (passwordValid: invalidError,  passwordType: string, container: AppContainers) => (
    actionsMap[passwordType][1](passwordValid, container) || (() => {})
);

export const actions = {
    setPassword,
    validatePassword
};

export interface SetPasswordAction extends Action {
    readonly type: string;
    password: string;
    container: AppContainers;
};

export interface ValidatePasswordAction extends Action {
    passwordValid: invalidError;
    container: AppContainers;
};

export type PasswordActions = SetPasswordAction | ValidatePasswordAction;