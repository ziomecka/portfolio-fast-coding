import * as React from 'react';

import { NavLink } from 'react-router-dom';

import { SubMenuProps } from './container';
import { AppRoutes, SubMenuRulesEnum, NavRulesEnum } from '../../_common/';

/* Materials */
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const SubMenuComponent: React.StatelessComponent<SubMenuProps> = props => {
    const {
      menuItems,
      menuItem,
      icon,
      setNavAnchorEl,
      container,
      classes
    } = props;

    const currentPathname = props.location.pathname;
    const { anchorEl = null} = Object(props[container]);

    const {
        onlyAuthorized,
        onlyUnauthorized,
        notCurrentLocation,
    } = SubMenuRulesEnum;

    const { lesson, demo, home, about } = AppRoutes;
    const { notLesson, notAnyLesson, notDemoLesson, notHome, onlyAbout, notAbout } = NavRulesEnum;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => (
      setNavAnchorEl(container, event.currentTarget)
    );

    const handleClose = (loc: string) => {
        props.history.push(loc);
        if (container) {
            setNavAnchorEl(container);
        }
    };

    const handleClickAway = () => {
      if (anchorEl) {
        setNavAnchorEl(container);
      }
    };

    // @ts-ignore
    const subMenuRules: {[key: SubMenuRulesEnum]: () => boolean} = {
        [onlyAuthorized]: () => props.authorized,
        [onlyUnauthorized]: () => !props.authorized,
        [notCurrentLocation]: (path: string) => path !== currentPathname
    };

    /** If function for rule is not implemented an error will be thrown */
    const areSubMenuRulesMet: (rules: SubMenuRulesEnum[] | null, pathname: string) => boolean = (rules, pathname) => {
        return (!rules || rules.every(rule => subMenuRules[rule](pathname)));
    };

    // @ts-ignore
    const navRules: {[key: NavRulesEnum]: () => boolean} = {
        [notLesson]: () => !RegExp(`${lesson}.*`,'gi').test(currentPathname),
        [notDemoLesson]: () => currentPathname !== demo,
        [notAnyLesson]: () => !RegExp(`${lesson}.*`,'gi').test(currentPathname) && currentPathname !== demo,
        [notHome]: () => currentPathname !== home,
        [onlyAbout]: () => currentPathname === about,
        [notAbout]: () => currentPathname !== about
    };

    /** If function for rule is not implemented an error will be thrown */
    const areNavRulesMet: (rules: NavRulesEnum[] | null) => boolean = (rules) => {
        return (!rules || rules.every(rule => navRules[rule]()));
    };

    if (areNavRulesMet(props.rules)) {
        /** Check if either menuItems or menuItem provided in props.
         *  If both or none then throw an error.
         *  */

        if (menuItems && container && !menuItem) {
            return (
                <ClickAwayListener onClickAway={handleClickAway}>
                    <IconButton
                        onClick={handleClick}
                        className={classes.menuIcon}
                    >
                        {icon}
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        className={classes.menu}
                    >
                        {menuItems.map((menuItem, ind) => {
                            if (areSubMenuRulesMet(menuItem[2], menuItem[1])) {
                                return (
                                    <MenuItem
                                        onClick={() => handleClose(menuItem[1])}
                                        key={`${menuItem[0]}-${ind}`}
                                        divider={true}
                                    >

                                        <NavLink to={menuItem[1]}>
                                            {menuItem[0]}
                                        </NavLink>

                                    </MenuItem>
                                );
                            }

                            /** Do not render if current pathname */
                            return null;
                        })}
                    </Menu>
                </ClickAwayListener>
            );
        }

        if (menuItem && !container && !menuItems) {
            /** Render if not current pathname */
            if (areSubMenuRulesMet(menuItem[2], menuItem[1])) {
                return (
                    <IconButton
                        onClick={() => handleClose(menuItem[1])}
                        className={classes.menuIcon}
                    >
                        {icon}
                    </IconButton>
                );
            }

            return null;
        }

        /** If both or neither menuItems nor menuIteme provided in props then throw an error. */
        throw new Error('SubMenu received incorrect props.');
    }

    return null;
};

export default withStyles(styles)(SubMenuComponent);