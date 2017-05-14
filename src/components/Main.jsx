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

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';

import Todo from 'components/Todo.jsx';
import {setSearchText} from 'states/post-actions.js';
import {toggleNavbar} from 'states/main-actions.js';

import './Main.css';

injectTapEventPlugin();

class Main extends React.Component {
    static propTypes = {
        searchText: PropTypes.string,
        navbarToggle: PropTypes.bool,
        store: PropTypes.object,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.searchEl = null;

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
    }

    render() {
        return (
			<MuiThemeProvider>
                <div className='main'>
                    <div className='bg-faded'>
                        <div className='container'>
                            <Navbar color='faded' light toggleable>
                                <NavbarToggler right onClick={this.handleNavbarToggle}/>
                                <NavbarBrand className='text-info' href="/">Starlist</NavbarBrand>
                                <Collapse isOpen={this.props.navbarToggle} navbar>
                                    <div className='search ml-auto'>
                                        <TextField className='ml-auto' hintText="Search" onKeyPress={this.handleSearchKeyPress} getRef={e => this.searchEl = e}/>
                                        {
                                            this.props.searchText &&
                                            <i className='navbar-text fa fa-times' onClick={this.handleClearSearch}></i>
                                        }
                                    </div>
									<div>
										<IconMenu
											iconButtonElement={<IconButton><SettingIcon /></IconButton>}
											anchorOrigin={{horizontal: 'right', vertical: 'top'}}
											targetOrigin={{horizontal: 'right', vertical: 'top'}}
									    >
											<MenuItem primaryText="Account Settings" />
											<MenuItem primaryText="Help" />
											<MenuItem primaryText="Sign out" />
									    </IconMenu>
									</div>
                                </Collapse>
                            </Navbar>
                        </div>
                    </div>
                    <Todo />
                    <div className='footer'>
                        T10.SS17
                    </div>
                </div>
			</MuiThemeProvider>
        );
    }

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
