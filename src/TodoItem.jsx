import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid/v4";

class TodoItem extends React.Component {
	static propTypes = {
		title: PropTypes.string,
		content: PropTypes.string,
		deadline: PropTypes.instanceOf(Date),
		starID: PropTypes.number
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (

		)
	}
}
