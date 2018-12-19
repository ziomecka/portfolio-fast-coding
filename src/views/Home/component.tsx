import * as React from 'react';
import Nav from '../../app/Nav';

import { HomeViewProps } from './container';

import LocationChange from '../../app/LocationChange';

import Content from '../../app/Content/';
import TextGenerator from '../../components/TextGenerator/container';
import LessonsLoader from '../../components/LessonsLoader/container';
import User from '../../app/User/container';
import KeyboardListener from '../../app/KeyboardListener/container';

import { AppContainersEnum, AppRoutesEnum } from '@appTypes';;

const { content, welcome } = AppContainersEnum;

class HomeViewComponent extends React.Component<HomeViewProps> {
    homeUrl: string;
    constructor(props: HomeViewProps) {
        super(props);

        this.homeUrl = AppRoutesEnum.home;
    }

    render() {
        return (
            <>
            {/* Containers will be informed about location change before it happens, because
                LocationChange uses 'shouldComponentUpdate'
                */}
            <LocationChange containers={[
                content,
                welcome
            ]} />

            <User />

            <KeyboardListener />
            <LessonsLoader />

            <Nav />

            <Content>
                {/* TODO nie powinien byc tutaj tylko w lessons, zastanowic sie */}
                <TextGenerator />
                {this.props.children}
            </Content>
            </>
        );
    }
}

export default HomeViewComponent;