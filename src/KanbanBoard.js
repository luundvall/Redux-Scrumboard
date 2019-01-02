import React from 'react';
import { connect } from 'react-redux';
import KanbanColumn from './KanBanColumn';
import { bindActionCreators } from 'redux';
import * as projectActions from './actions/projectActions';

class KanbanBoard extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
		this.handleOnDragEnd = this.handleOnDragEnd.bind(this);

		this.state = {
			projects: Object.assign({}, props.projects),
			columns: Object.assign({}, props.columns)
		}
	}

	handleOnDragEnter(e, stageValue) {
		this.setState({ draggedOverCol: stageValue });
	}

	handleOnDragEnd(e, project) {
		let projectToBeUpdated = this.props.projects.slice(0).find((projectObject) => { return projectObject.name === project.name });
		this.props.actions.updateProject(projectToBeUpdated, this.state.draggedOverCol);
	}

	render() {

		return (
			<div>

				{this.props.columns.map((column) => {
					return (
						
						<KanbanColumn
							name={column.name}
							stage={column.stage}
							projects={this.props.projects.filter((project) => { return parseInt(project.project_stage, 10) === column.stage; })}
							onDragEnter={this.handleOnDragEnter}
							onDragEnd={this.handleOnDragEnd}
							key={column.stage}
						/>
						
					);
				})}
				
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		projects: state.projects,
		columns: state.columns
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(projectActions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);