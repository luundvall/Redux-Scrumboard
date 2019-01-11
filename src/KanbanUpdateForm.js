import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const KanbanUpdateForm = ({ handleChange, handleSubmit, state, members, editProjectDetails, project, assignedMember }) => {

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <FormControl
                    name="name"
                    type="text"
                    value={state.name || ''}
                    onChange={handleChange}
                    placeholder="Task Name"
                />
            </FormGroup>
            <FormGroup>
                <FormControl
                    name="description"
                    componentClass="textarea"
                    placeholder="Description"
                    onChange={handleChange}
                    value={state.description || ''}
                />
            </FormGroup>
            <div className="form-group">
                <label htmlFor="sel1">Project member:</label>
                <select onChange={handleChange} name="assignedMember" value={state.assignedMember || ''} className="form-control" id="sel1">
                    <option value={assignedMember[0].id} defaultValue>{assignedMember[0].name}</option>
                    {members.map((member, index) => {
                        return <option value={member.id} key={index}>{member.name}</option>
                    })}
                </select>
            </div>
            <Button bsStyle="success" style={{ width: '100%' }} onClick={(e) => { editProjectDetails(project) }} type="submit"><Glyphicon style={{ color: 'white' }} glyph="ok" /></Button>
        </form>
    );
}

export default KanbanUpdateForm;