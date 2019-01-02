import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from './actions/projectActions';

class KanbanCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: true,
		};

		this.deleteProject = this.deleteProject.bind(this);
	}

	deleteProject(project) {
		this.props.actions.deleteProject(project);
	}

	render() {
		const cardStyle = {
			'backgroundColor': '#f9f7f7',
			'paddingLeft': '0px',
			'paddingTop': '5px',
			'paddingBottom': '5px',
			'marginLeft': '0px',
			'marginRight': '5px',
			'marginBottom': '5px',
		};

		return (
			<div
				style={cardStyle}
				draggable={true}
				onDragEnd={(e) => { this.props.onDragEnd(e, this.props.project); }}
			>
				<div><h4>{this.props.project.name}</h4></div>
				{(this.state.collapsed)
					? null
					: (<div><strong>Description: </strong>{this.props.project.description}<br /></div>)
				}
				<div
					style={{ 'width': '100%' }}
					onClick={(e) => { this.deleteProject(this.props.project) }}
				>
					<h1>XXXXX</h1>
				</div>
				<div
					style={{ 'width': '100%' }}
					onClick={(e) => { this.setState({ collapsed: !this.state.collapsed }); }}
				>
					{(this.state.collapsed) ? String.fromCharCode('9660') : String.fromCharCode('9650')}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		projects: state.projects
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(projectActions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanCard);