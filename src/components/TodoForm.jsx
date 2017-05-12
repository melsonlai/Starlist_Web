import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {getMoodIcon} from 'utilities/weather.js';
import {createTodo, input, inputDanger, toggleMood, setMoodToggle, selectMood} from 'states/todo-actions.js';

import './PostForm.css';

const Add_Button ={
	margin: 18,
};


class TodoForm extends React.Component {
    static propTypes = {
        inputValue: PropTypes.string,
        inputDanger: PropTypes.bool,
        moodToggle: PropTypes.bool,
        mood: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.inputEl = null;
        this.moodToggleEl = null;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.handleMoodToggle = this.handleMoodToggle.bind(this);

        this.handlePost = this.handlePost.bind(this);
    }

    render() {
        const {inputValue, moodToggle, mood} = this.props;
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';

        return (
            <div className='post-form'>
                <Alert color='info' className={`d-flex flex-column flex-sm-row justify-content-center ${inputDanger}`}>
                    <div className='mood align-self-start'>
                    </div>
					<TextField className='input' type='textarea' getRef={el => {this.inputEl = el}} value={this.props.inputValue} onChange={this.handleInputChange} hintText="Coding At 4:00A.M....." floatingLabelText="What's next to do?"/>
                    
					<RaisedButton label="Add" primary={true} onClick={this.handlePost} style={Add_Button}/>
                </Alert>
            </div>
        );
    }

    handleDropdownSelect(mood) {
        this.props.dispatch(selectMood(mood));
    }

    handleInputChange(e) {
        const text = e.target.value
        this.props.dispatch(input(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleMoodToggle(e) {
        this.props.dispatch(toggleMood());
    }

    handlePost() {
        const {mood, inputValue, dispatch} = this.props;
        if (mood === 'na') {
            dispatch(setMoodToggle(true));
            return;
        }
        if (!inputValue) {
            dispatch(inputDanger(true));
            return;
        }

        dispatch(createTodo(mood, inputValue));
        dispatch(input(''));
        dispatch(selectMood('na'));
    }
}

export default connect(state => ({
    ...state.todoForm
}))(TodoForm);
