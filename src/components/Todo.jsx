import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert, Label, Input} from 'reactstrap';

import TodoForm from 'components/TodoForm.jsx';
import TodoList from 'components/TodoList.jsx';
import {listTodos, toggleAndList} from 'states/todo-actions.js';

import Toggle from 'material-ui/Toggle';

import './Todo.css';

class Todo extends React.Component {
    static propTypes = {
        list: PropTypes.array,
        masking: PropTypes.bool,
        todoLoading: PropTypes.bool,
        todos: PropTypes.array,
        searchText: PropTypes.string,
        unaccomplishedOnly: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.toggleUnaccomplishedOnly = this.toggleUnaccomplishedOnly.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(listTodos(this.props.searchText));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.props.dispatch(listTodos(nextProps.searchText));
        }
    }

    render() {
        document.body.className = `weather-bg`;
        document.querySelector('.weather-bg .mask').className = `mask ${this.props.masking ? 'masking' : ''}`;

        return (
            <div className='todos'>
                <Toggle className='label d-flex justify-content-between align-items-end' toggled={this.props.unaccomplishedOnly} onToggle={this.toggleUnaccomplishedOnly} label="Unaccomplished"/>
                <TodoForm />
                <TodoList todos={this.props.todos} />{
                    this.props.todoLoading &&
                    <Alert color='warning' className='loading'>Loading...</Alert>
                }
            </div>
        );
    }

    toggleUnaccomplishedOnly(e, isChecked) {
        this.props.dispatch(toggleAndList());
    }
}

export default connect(state => ({
    ...state.todo,
    searchText: state.searchText
}))(Todo);
