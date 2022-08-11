import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

import EditTaskButton from './EditTaskButton';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readOnly: true,
            description: this.props.task.description,
            isDone: this.props.task.isDone
        }
        this.taskIsDoneChanged = this.taskIsDoneChanged.bind(this);
        this.setTaskDescriptionReadOnly = this.setTaskDescriptionReadOnly.bind(this);
        this.taskDescriptionChanged = this.taskDescriptionChanged.bind(this);
        this.deleteButtonClicked = this.deleteButtonClicked.bind(this);
    }

    setTaskDescriptionReadOnly(value) {
        this.setState({ readOnly: value });
        if (value) this.taskChanged();
    }

    taskDescriptionChanged(event) {
        console.log(event);
        if (this.state.readOnly === false) {
            if (event.key === 'Enter') {
                this.setTaskDescriptionReadOnly(true)
            } else {
                this.setState({ description: event.target.value });
            }
        }
    }

    taskIsDoneChanged(event) {
        if (event.type === 'change') {
            // this.setState({ isDone: event.target.checked });
            this.taskChanged(event.target.checked);
        } else if (this.state.readOnly) {
            // this.setState({ isDone: !this.state.isDone });
            this.taskChanged(!this.props.task.isDone);
        }
    }

    taskChanged(isDone=this.props.task.isDone) {
        const id = this.props.task.id;
        const description = this.state.description;
        // console.log(id, description, isDone);
        this.props.taskStatusChange(id, description, isDone);
        this.setState({ readOnly: true });
    }

    deleteButtonClicked() {
        this.props.taskDelete(this.props.task.id);
    }

    render() {
        const isDone = this.props.task.isDone;
        const description = this.state.description;
        const CheckIcon = (isDone ? <InputGroup.Text><i className="bi bi-clipboard-check"></i></InputGroup.Text> : <></>);
        const taskDescriptionClasses = 'task-description' + (isDone ? ' task-description-done' : '');

        return (
            <InputGroup className="mb-3 task" size="lg">
                <InputGroup.Checkbox aria-label="Checkbox for task done" checked={isDone} onChange={this.taskIsDoneChanged} />
                {CheckIcon}
                <FormControl aria-label="Task description" readOnly={this.state.readOnly} value={description} className={taskDescriptionClasses} onChange={this.taskDescriptionChanged} onKeyPress={this.taskDescriptionChanged} onClick={this.taskIsDoneChanged} />
                <EditTaskButton setTaskDescriptionReadOnly={this.setTaskDescriptionReadOnly} readOnly={this.state.readOnly} />
                <Button as={InputGroup.Text} variant="danger" aria-label="Delete task" onClick={this.deleteButtonClicked}><i className="bi bi-trash3"></i></Button>
            </InputGroup>
        );
    }
}

export default Task;