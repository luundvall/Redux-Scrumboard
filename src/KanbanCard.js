import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from './actions/projectActions';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import toastr from 'toastr';

class KanbanCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: true,
		};

		this.deleteProject = this.deleteProject.bind(this);
	}

	deleteProject(project) {
		this.props.actions.deleteProject(project)
			.then(() => toastr.success(project.name + ' has been deleted'));;

	}

	getProjectMembers() {
		console.log(this.props.assignedTo);
		const members = this.props.members.filter(member =>
			member.id === this.props.assignedTo
	   );

		return members.map((member) => {
			return <span key={member.id}>{member.name}</span>
		});
	}


	render() {
		const cardStyle = {
			'backgroundColor': '#f9f7f7',
			'padding': '5px',
			'marginLeft': '0px',
			'marginRight': '5px',
			'marginBottom': '5px',
		};

		const glyphStyle = {
			'float': 'right'
		};

		return (
			<div
				style={cardStyle}
				draggable={true}
				onDragEnd={(e) => { this.props.onDragEnd(e, this.props.project); }}
			>
				<div>
					<h6>
						{this.props.project.name}
						<Glyphicon style={glyphStyle} onClick={(e) => { this.deleteProject(this.props.project) }} glyph="remove" />
					</h6>
				</div>
				{(this.state.collapsed)
					? null
					: (
						<div>
							<p><strong>Description: </strong>
							{this.props.project.description}</p>
							<p><strong>Assigned members: </strong>
							{this.getProjectMembers()}</p>
							<br />
						</div>)
				}
				<Glyphicon
					onClick={(e) => { this.setState({ collapsed: !this.state.collapsed }) }}
					glyph={this.state.collapsed ? 'chevron-down' : 'chevron-up'} />
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		projects: state.projects,
		members: state.members
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(projectActions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanCard);