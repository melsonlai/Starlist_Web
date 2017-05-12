import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import uuid from "uuid/v4";

import {accomplishTodo} from 'states/todo-actions.js';

import './TodoItem.css';
import {List, ListItem} from 'material-ui/List';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class TodoItem extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        content: PropTypes.string,
        deadline: PropTypes.instanceOf(Date),
        starID: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.handleCheckboxCheck = this.handleCheckboxCheck.bind(this);
    }

    render() {
        const {} = this.props;

        return (
            <div className='todoItem' >
                <ListItem
				leftCheckbox={<Checkbox onCheck={this.handleCheckboxCheck}/>}
         		rightIconButton={rightIconMenu}
          		primaryText={title}
          		secondaryText={
            	<p>
              		<span style={{color: darkBlack}}>{deadline}</span><br />
              		I&apos;{content}		  
            	</p>
          		}
          		secondaryTextLines={5}
       			/>	
			</div>
        );
    }

    handleCheckboxCheck(e) {
        if (!this.props.doneTs) {
            this.props.dispatch(accomplishTodo(this.props.id));
        }
    }
}

export default connect()(TodoItem);
