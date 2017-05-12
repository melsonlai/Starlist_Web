import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';

import {getMoodIcon} from 'utilities/weather.js';
import {createTodo, input, inputDanger} from 'states/todo-actions.js';

import './TodoForm.css';

const Add_Button ={
	margin: 18,
};


class TodoForm extends React.Component {
    static propTypes = {
        inputValue: PropTypes.string,
        inputDanger: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.inputEl = null;
        this.moodToggleEl = null;

        this.handleInputChange = this.handleInputChange.bind(this);

        this.handlePost = this.handlePost.bind(this);
    }

    render() {
        const {inputValue} = this.props;
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';

        return (
            <div className='post-form'>
                <Card color='info' className={`d-flex flex-column flex-sm-row justify-content-center ${inputDanger}`}>
                    <div className='mood align-self-start'>
                    </div>
					<TextField className='input' type='textarea' getRef={el => {this.inputEl = el}} value={this.props.inputValue} onChange={this.handleInputChange} hintText="Coding At 4:00A.M....." floatingLabelText="What's next to do?"/>

					<RaisedButton label="Add" primary={true} onClick={this.handlePost} style={Add_Button}/>
                </Card>
            </div>
        );
    }

    handleInputChange(e) {
        const text = e.target.value
        this.props.dispatch(input(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handlePost() {
        const {inputValue, dispatch} = this.props;
        if (!inputValue) {
            dispatch(inputDanger(true));
            return;
        }
//        dispatch(createTodo(mood, inputValue));
        dispatch(input(''));
    }
}

export default connect(state => ({
    ...state.todoForm
}))(TodoForm);
