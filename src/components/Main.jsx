import React from 'react';
import PropTypes from 'prop-types';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Input
} from 'reactstrap';
import {connect} from 'react-redux';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionGrade from 'material-ui/svg-icons/action/grade';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';
import {fade} from 'material-ui/utils/colorManipulator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    indigo500,indigo400,

    grey900,grey800,grey700,

    indigoA100, indigoA200, indigoA400,

    fullWhite,


} from 'material-ui/styles/colors';

import Todo from 'components/Todo.jsx';
import {setSearchText} from 'states/post-actions.js';
import {toggleNavbar, openDialog, closeDialog} from 'states/main-actions.js';

import './Main.css';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,

    primary2Color: indigo500,

    primary3Color: grey700,

    accent1Color: indigoA200,

    accent2Color: indigoA400,

    accent3Color: indigoA100,

    textColor: indigo400,

    secondaryTextColor: fade(indigo400, 0.7),

    alternateTextColor: '#303030',

    canvasColor: '#303030',

    borderColor: fade(indigo400, 0.3),

    disabledColor: fade(indigo400, 0.3),

    pickerHeaderColor: fade(indigo400, 0.12),

    clockCircleColor: fade(indigo400, 0.12),
  },
});


class Main extends React.Component {
    static propTypes = {
        searchText: PropTypes.string,
        navbarToggle: PropTypes.bool,
        store: PropTypes.object,
        dispatch: PropTypes.func,
        dialogOpen: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.searchEl = null;

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Search"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
			<MuiThemeProvider muiTheme={muiTheme}>
                <div className='main'>
                    <div className='bg-faded'>
                        <AppBar
                            title="Starlist"
                            iconElementLeft={<IconButton><ActionGrade /></IconButton>}
                            iconElementRight={
										<IconMenu
											iconButtonElement={<IconButton><SettingIcon /></IconButton>}
											anchorOrigin={{horizontal: 'right', vertical: 'top'}}
											targetOrigin={{horizontal: 'right', vertical: 'top'}}
									    >
                                            <MenuItem primaryText="Search" onTouchTap={this.handleOpen}/>
                                            <Dialog
                                                title="Can't Find Your TODOs?? Try Search It!"
                                                actions={actions}
                                                modal={false}
                                                open={this.props.dialogOpen}
                                                onRequestClose={this.handleClose}
                                            >
                                                Enter Some Keywords and let Starlist to the Magic.<br />
                                                <TextField hintText="How Can I Leave Here?? HELP!!!" />

                                            </Dialog>

											<MenuItem primaryText="Account Settings" />
											<MenuItem primaryText="Help" />
											<MenuItem primaryText="Sign out" />
									    </IconMenu>
                                }
                        />
                    </div>
                    <Todo />
                    <div className='footer'>
                        T10.SS17
                    </div>
                </div>
			</MuiThemeProvider>
        );
    }

    handleOpen() {
        this.props.dispatch(openDialog());
    };

    handleClose() {
        this.props.dispatch(closeDialog());
    };


    handleNavbarToggle() {
        this.props.dispatch(toggleNavbar());
    }

    handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13){
            this.props.dispatch(setSearchText(e.target.value));
        }
    }

    handleClearSearch() {
        this.props.dispatch(setSearchText(''));
        this.searchEl.value = '';
    }
}

export default connect(state => ({
    ...state.main,
    searchText: state.searchText,
}))(Main);
