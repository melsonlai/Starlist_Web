import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';

import {accomplishTodo, DeleteDialogClose, DeleteDialogOpen} from 'states/todo-actions.js';

import Checkbox from "material-ui/Checkbox";
import {Card, CardText, CardHeader, CardActions} from "material-ui/Card";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class TodoItem extends React.Component {
    static propTypes = {
		id: PropTypes.string,
		title: PropTypes.string,
		content: PropTypes.string,
		deadline: PropTypes.number,
		importance: PropTypes.number,
		starID: PropTypes.string,
		ts: PropTypes.number,
		doneTs: PropTypes.number,
		del_Dialog_state: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.handleCheckboxCheck = this.handleCheckboxCheck.bind(this);
		this.handleDelClose = this.handleDelClose.bind(this);
		this.handleDelOpen = this.handleDelOpen.bind(this);
    }

    render() {
        const {title, content, deadline, starID, doneTs} = this.props;
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleDelClose}
			/>,
			<FlatButton
				label="Delete Anyway"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleDelClose}
			/>,
		];

        return (
			<Card>
				<CardActions>
					<Checkbox checked={!!doneTs} onCheck={this.handleCheckboxCheck} />
				</CardActions>
				<CardHeader title={title} subtitle={moment.unix(doneTs ? doneTs : deadline).format()} actAsExpander showExpandableButton />
				<CardText expandable>
					{content}
				</CardText>
				<CardActions expandable>
					<FlatButton label="Edit" />
					<FlatButton label="Delete" onTouchTap={this.handleDelOpen}/>
				</CardActions>
			</Card>
        );
    }
	handleDelClose(){
		this.props.dispatch(DeleteDialogClose());
	}

	handleDelOpen(){
		this.props.dispatch(DeleteDialogOpen());
	}

    handleCheckboxCheck(e) {
        if (!this.props.doneTs) {
            this.props.dispatch(accomplishTodo(this.props.id));
        }
    }
}

export default connect()(TodoItem);
