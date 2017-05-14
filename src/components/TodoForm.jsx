import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardText, CardActions} from 'material-ui/Card';

import {getMoodIcon} from 'utilities/weather.js';
import {createTodo, inputTitle, inputTitleDanger, inputDescript} from 'states/todo-actions.js';

import './TodoForm.css';

const Add_Button ={
	margin: 18,
};


class TodoForm extends React.Component {
    static propTypes = {
        inputTitleValue: PropTypes.string,
        inputTitleDanger: PropTypes.bool,
		inputDescriptValue: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handleInputTitleChange = this.handleInputTitleChange.bind(this);
		this.handleInputDescriptChange = this.handleInputDescriptChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    render() {
        const {inputTitleValue, inputDescriptValue} = this.props;
        const inputTitleDanger = this.props.inputTitleDanger ? "Title is required" : "";

        return (
            <div className='post-form'>
                <Card color='info' className={`d-flex flex-column flex-sm-row justify-content-center`}>
					<CardText>
						<TextField className='input' type='textarea' value={inputTitleValue}  onChange={this.handleInputTitleChange} hintText="Coding At 4:00A.M....." floatingLabelText="What's next to do?" floatingLabelFixed errorText={inputTitleDanger}/>
					</CardText>
					<CardText>
						<TextField className='input' type='textarea' value={inputDescriptValue} onChange={this.handleInputDescriptChange} hintText="And Get Lots of Bugs" floatingLabelText="Description" floatingLabelFixed/>
					</CardText>
					<CardActions>
						<RaisedButton label="Add" primary={true} onClick={this.handlePost} style={Add_Button}/>
					</CardActions>
                </Card>
            </div>
        );
    }

    handleInputTitleChange(e, title) {
        this.props.dispatch(inputTitle(title));
        if (title && this.props.inputTitleDanger) {
            this.props.dispatch(inputTitleDanger(false));
        }
    }

	handleInputDescriptChange(e) {
        const text = e.target.value;
        this.props.dispatch(inputDescript(text));
    }

    handlePost() {
        const {inputTitleValue, inputDescriptValue, dispatch} = this.props;
        if (!inputTitleValue) {
            dispatch(inputTitleDanger(true));
            return;
        }
        dispatch(createTodo(inputTitleValue, inputDescriptValue));
        dispatch(inputTitle(''));
		dispatch(inputDescript(''));
    }
}

export default connect(state => ({
    ...state.todoForm
}))(TodoForm);
