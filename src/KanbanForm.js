import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

const KanbanForm = ({ handleChange, handleSubmit, state, members }) => {

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <FormControl
                    name="cardName"
                    type="text"
                    value={state.cardName || ''}
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
                    <option value="" defaultValue disabled hidden>Choose member</option>
                    {members.map((member, index) => {
                        return <option value={member.id} key={index}>{member.name}</option>
                    })}
                </select>
            </div>
            <Button bsStyle="primary" type="submit">Submit</Button>
        </form>
    );
}

export default KanbanForm;