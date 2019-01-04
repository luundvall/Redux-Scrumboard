import React from 'react';
import KanbanBoard from './KanbanBoard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as columnActions from './actions/columnActions';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import toastr from 'toastr';

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
		this.setState({ columnName: e.target.value });
	}

	handleSubmit(event) {
		this.props.actions.addColumn(this.state.columnName)
		.then(() => { toastr.success('Column added successfully') });
		this.setState({ columnName: '' });
		event.preventDefault();
	}

	render() {
		const style = {
			'padding': '30px',
			'paddingTop': '5px',
		};
		return (
			<div style={style}>
				<div className="row">
					<div className="col-12">
						<h1>Project Kanban Board</h1>
					</div>
				</div>
				<div className="row mb-2">
					<div className="col-6">
				<form onSubmit={this.handleSubmit}>
							<FormGroup>
								<FormControl
									name="cardName"
									type="text"
									value={this.state.columnName || ''}
									onChange={this.handleChange}
									placeholder="Task Name"
								/>
							</FormGroup>
							<Button bsStyle="primary" type="submit">Add new column</Button>
						</form>
					</div>
				</div>
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