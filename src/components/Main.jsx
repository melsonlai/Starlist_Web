import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button
} from 'reactstrap';
import {connect} from 'react-redux';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Forecast from 'components/Forecast.jsx';
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
	            <Router>
	                <div className='main'>
	                    <div className='bg-faded'>
	                        <div className='container'>
	                            <Navbar color='faded' light toggleable>
	                                <NavbarToggler right onClick={this.handleNavbarToggle}/>
	                                <NavbarBrand className='text-info' href="/">WeatherMood</NavbarBrand>
	                                <Collapse isOpen={this.props.navbarToggle} navbar>
	                                    <Nav navbar>
	                                    </Nav>
	                                    <div className='search ml-auto'>
	                                        <Input className='ml-auto' type='text' placeholder='Search' onKeyPress={this.handleSearchKeyPress} getRef={e => this.searchEl = e}></Input>{
	                                            this.props.searchText &&
	                                            <i className='navbar-text fa fa-times' onClick={this.handleClearSearch}></i>
	                                        }
	                                    </div>
										<div>
											<IconMenu
												iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
												anchorOrigin={{horizontal: 'right', vertical: 'top'}}
												targetOrigin={{horizontal: 'right', vertical: 'top'}}
										    >
												<MenuItem primaryText="Refresh" />
												<MenuItem primaryText="Send feedback" />
												<MenuItem primaryText="Settings" />
												<MenuItem primaryText="Help" />
												<MenuItem primaryText="Sign out" />
										    </IconMenu>
										</div>
	                                </Collapse>
	                            </Navbar>
	                        </div>
	                    </div>
	                    <Forecast />
	                    <div className='footer'>
	                        DataLab.
	                    </div>
	                </div>
	            </Router>
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
