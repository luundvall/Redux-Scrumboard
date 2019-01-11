import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from './actions/projectActions';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import toastr from 'toastr';
import KanbanUpdateForm from './KanbanUpdateForm';

class KanbanCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: true,
			editOn: false,
			name: this.props.project.name || '',
			description: this.props.project.description || '',
			project_stage: this.props.project.project_stage || '',
			assignedTo: this.props.project.assignedTo || ''
		};

		this.deleteProject = this.deleteProject.bind(this);
		this.editProjectDetails = this.editProjectDetails.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	deleteProject(project) {
		this.props.actions.deleteProject(project)
			.then(() => toastr.success(project.name + ' has been deleted'));;
	}

	editProjectDetails() {
		this.setState({ editOn: !this.state.editOn });
	}

	getProjectMembers() {
		const members = this.props.members.filter(member =>
			member.id === this.props.assignedTo
		);

		return members.map((member) => {
			return <span key={member.id}>{member.name}</span>
		});
	}

	handleChange(e) {
		let name = e.target.name;
		this.setState({
			[name]: e.target.value
		})

	}

	handleSubmit(event) {
		var date = new Date();
		event.preventDefault();
		let canBanCard = {
			id: this.props.project.id,
			name: this.state.name,
			description: this.state.description,
			project_stage: this.state.project_stage,
			assignedTo: parseInt(this.state.assignedMember, 0),
			lastUpdate: date.toGMTString()
		};
		
		this.props.actions.updateKanbanCard(canBanCard)
			.then(() => { toastr.success('Task updated successfully');
			this.setState({ editOn: !this.state.editOn }); });
		
	}


	render() {
		const cardStyle = {
			'backgroundColor': '#f9f7f7',
			'padding': '5px',
			'marginLeft': '0px',
			'marginRight': '5px',
			'marginBottom': '5px'
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
						<p>{this.props.project.lastUpdate ? this.props.project.lastUpdate : null}</p>
						{this.state.editOn ? null : <Glyphicon style={glyphStyle} onClick={(e) => { this.deleteProject(this.props.project) }} glyph="remove" />}
					</h6>
				</div>
				{(this.state.collapsed)
					? null :
							<div>
								<KanbanUpdateForm
									handleChange={this.handleChange}
									handleSubmit={this.handleSubmit}
									members={this.props.members.filter(member => {
										return member.id !== this.state.assignedTo;
									})}
									state={this.state}
									project={this.project}
									editProjectDetails={this.editProjectDetails}
									assignedMember={this.props.members.filter((member) => {
										return member.id === this.state.assignedTo;
									})}
								/>

								</div> }
						
				<Glyphicon
					onClick={(e) => { this.setState({ collapsed: !this.state.collapsed, editOn: !this.state.editOn }) }}
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