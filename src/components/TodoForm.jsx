import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardText, CardActions} from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {getMoodIcon} from 'utilities/weather.js';
import {createTodo, inputTitle, inputTitleDanger, inputDescript, setImportance} from 'states/todo-actions.js';

import './TodoForm.css';

const Add_Button ={
	margin: 18,
};


class TodoForm extends React.Component {
    static propTypes = {
        inputTitleValue: PropTypes.string,
        inputTitleDanger: PropTypes.bool,
		inputDescriptValue: PropTypes.string,
		inputImportance: PropTypes.number,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handleInputTitleChange = this.handleInputTitleChange.bind(this);
		this.handleInputDescriptChange = this.handleInputDescriptChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
		this.handleImportanceChange = this.handleImportanceChange.bind(this);
    }

	componentWillMount() {
		this.props.dispatch(setImportance(1));
	}

    render() {
        const {inputTitleValue, inputDescriptValue, inputImportance} = this.props;
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
					<CardText>
						<DropDownMenu value={inputImportance} onChange={this.handleImportanceChange}>
				          <MenuItem value={1} primaryText="Doesn't Matter" />
				          <MenuItem value={2} primaryText="Important" />
				        </DropDownMenu>
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

	handleImportanceChange(e, key, val) {
		this.props.dispatch(setImportance(val));
	}
}

export default connect(state => ({
    ...state.todoForm
}))(TodoForm);
