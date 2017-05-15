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
				<Card>
					<CardTitle /*className="d-flex justify-content-center align-items-center"*/>
                		<div>All todos are accomplished.<br />Anything else?</div>
					</CardTitle>
				</Card>
                <br />
                <Card>
                    <CardHeader
                        title="第一屆 軟實 廢文大賽"
                        subtitle="2017 May 16"
                        //className="d-flex justify-content-center align-items-left"
                    />
                </Card>
                <br />
                <Card>
                    <CardHeader
                        title="蹦蹦跳 姆咪~"
                        subtitle="2017 June 3"
                        //className="d-flex justify-content-center align-items-left"
                    />
                </Card>
                <br />
                <Card>
                    <CardHeader
                        title="Pipeline 大法好"
                        subtitle="2017 April 30"
                        //className="d-flex justify-content-center align-items-left"
                    />
                </Card>
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
