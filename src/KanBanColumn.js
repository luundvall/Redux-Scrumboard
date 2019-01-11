import React from 'react';
import KanbanCard from './KanbanCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as columnActions from './actions/columnActions';
import * as projectActions from './actions/projectActions';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import KanBanForm from './KanbanForm';
import Button from 'react-bootstrap/lib/Button';
import toastr from 'toastr';

class KanbanColumn extends React.Component {
	constructor(props) {
		super(props);
		this.state = ({
			mouseIsHovering: false,
			cardName: '',
			description: '',
			assignedMember: '',
			displayForm: false
		});
		this.deleteColumn = this.deleteColumn.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ mouseIsHovering: false });
	}

	generateKanbanCards() {
		return this.props.projects.slice(0).map((project) => {
			return (
				<KanbanCard
					assignedTo={project.assignedTo}
					project={project}
					key={project.name}
					onDragEnd={this.props.onDragEnd}
					mouseEvent={this.props.mouseEvent}
				/>
			);
		});
	}

	deleteColumn(id) {
		this.props.actions.deleteColumn(id);
	}

	handleChange(e) {
		let name = e.target.name
		this.setState({
			[name]: e.target.value
		})

	}

	handleSubmit(event) {
		event.preventDefault();
		let canBanCard = {
			name: this.state.cardName,
			description: this.state.description,
			project_stage: this.props.stage,
			assignedTo: parseInt(this.state.assignedMember, 0)
		};
		this.setState({
			cardName: '',
			description: ''
		})
		this.props.projectActions.addKanbanCard(canBanCard)
			.then(() => { toastr.success('Task added successfully') });
	}

	render() {
		const columnStyle = {
			'display': 'inline-block',
			'verticalAlign': 'top',
			'marginRight': '5px',
			'marginBottom': '5px',
			'width': '170px',
			'padding': '5px',
			'textAlign': 'left',
			'border': (this.props.mouseEvent) ? 'solid black 1px' : '',
			'backgroundColor': (this.state.mouseIsHovering) ? '#d3d3d3' : '#d3d3d3',
		};

		const glyphStyle = {
			'float': 'right'
		};

		return (
			<div
				style={columnStyle}
				onDragEnter={(e) => { this.setState({ mouseIsHovering: true }); this.props.onDragEnter(e, this.props.stage); }}
				onDragExit={(e) => { this.setState({ mouseIsHovering: false }); }}
			>
				<h4>{this.props.stage}. {this.props.name} ({this.props.projects.length}) <Glyphicon style={glyphStyle} key={this.props.id} onClick={(e) => this.deleteColumn(this.props.id)} glyph="remove" /></h4>

				{this.generateKanbanCards()}
				<Button
					style={{ marginBottom: '5px', width: '100%' }}
					bsStyle="primary"
					onClick={() => { this.setState({ displayForm: !this.state.displayForm }) }}
				> {this.state.displayForm ? 'Close' : 'Add new task'}</Button>

				{this.state.displayForm && <KanBanForm
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					state={this.state}
					members={this.props.members}
				/>}

				<br />
			</div>);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		columns: state.columns,
		members: state.members
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(columnActions, dispatch),
		projectActions: bindActionCreators(projectActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(KanbanColumn);