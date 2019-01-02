import React from 'react';
import KanbanBoard from './KanbanBoard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as columnActions from './actions/columnActions';

class Kanban extends React.Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			columnName: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({columnName: e.target.value});
	}

	handleSubmit(event) {
		this.props.actions.addColumn(this.state.columnName);
		this.setState({columnName: ''});
		event.preventDefault();
	  }

	render() {
		const style = {
			'padding': '30px',
			'paddingTop': '5px',
		};
		return (
			<div style={style}>
				<h1>Project Kanban Board</h1>
				Add new column
				<form onSubmit={this.handleSubmit}>
						<input type="text" placeholder="Column name" value={this.state.columnName} onChange={this.handleChange}/>
					<input type="submit" value="Submit" />
				</form>
				<KanbanBoard />
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		columns: state.columns
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(columnActions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);