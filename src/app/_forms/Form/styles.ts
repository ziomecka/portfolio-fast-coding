import {
    FC_FORM_WIDTH_XS,
    FC_FORM_WIDTH_SM
} from './constants';

const styles = theme => {
    return {
        FCForm: {
            minWidth: FC_FORM_WIDTH_XS,
            [ theme.breakpoints.up( 'sm' )]: {
                minWidth: FC_FORM_WIDTH_SM,
            },
            overflow: 'hidden'
        },
        FCFormButton: {
            width: '100%'
        }
    };
};

export default styles;