import { AppRoutes, SubMenuRulesEnum } from '../../_common/';
import { SubMenuItemType } from '../SubMenu/container';

const { home, lessons, login, newuser, changePassword } = AppRoutes;
const { onlyAuthorized, onlyUnauthorized, notCurrentLocation } = SubMenuRulesEnum;

export const lessonsMenuItem: SubMenuItemType = {
    title: 'courses',
    appRoute: lessons,
    rules: [ notCurrentLocation ]
};

export const homeMenuItem: SubMenuItemType = {
    title: 'home',
    appRoute: home,
    rules: [ notCurrentLocation ]
};

export const mainMenuItems: SubMenuItemType[] = [
    {
        title: 'courses',
        appRoute: lessons,
        rules: [ notCurrentLocation ]
    }
];

export const userMenuItems: SubMenuItemType[] = [
    {
        title: 'subMenuUserLogin',
        appRoute: login,
        rules: [ onlyUnauthorized, notCurrentLocation ]
    },
    {
        title: 'subMenuUserNewUser',
        appRoute: newuser,
        rules: [ onlyUnauthorized, notCurrentLocation ]
    },
    {
        title: 'subMenuUserChangePassword',
        appRoute: changePassword,
        rules: [ onlyAuthorized, notCurrentLocation ]
    }
];