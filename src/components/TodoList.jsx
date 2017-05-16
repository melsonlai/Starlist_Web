import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import TodoItem from 'components/TodoItem.jsx';

import {List, ListItem} from 'material-ui/List';
import Checkbox from "material-ui/Checkbox";
import {Card, CardTitle} from "material-ui/Card";
import {CardActions, CardHeader, CardText} from 'material-ui/Card';

class TodoList extends React.Component {
    static propTypes = {
        todos: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {todos} = this.props;

        let children = (
			<ListItem>
                <br />
				<Card>
					<CardTitle className="d-flex justify-content-center align-items-center">
                		<div>All todos are accomplished.<br />Anything else?</div>
					</CardTitle>
				</Card>
                <br />
            </ListItem>
        );
        if (todos.length) {
            children = todos.map(t => (
                <ListItem key={t.id}>
                    <TodoItem {...t} />
                </ListItem>
            ));
        }

        return (
            <div>
                <List>{children}</List>
            </div>
        );
    }
}

export default connect()(TodoList);
