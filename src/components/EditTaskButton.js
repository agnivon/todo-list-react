import React from 'react';
import { Button, InputGroup } from 'react-bootstrap';

class EditTaskButton extends React.Component {
    constructor(props) {
        super(props);
        this.buttonClicked = this.buttonClicked.bind(this);
    }

    buttonClicked() {
        if (this.props.readOnly) {
            this.props.setTaskDescriptionReadOnly(false);
        } else {
            this.props.setTaskDescriptionReadOnly(true);
        }
    }

    render() {
        if(this.props.readOnly) {
            return (<Button as={InputGroup.Text} aria-label="Edit task description" onClick={this.buttonClicked}><i className="bi bi-pencil-square"></i></Button>);
        } else {
            return (<Button as={InputGroup.Text} variant="success" aria-label="Confirm task description change" onClick={this.buttonClicked}><i className="bi bi-check-circle"></i></Button>);
        }
    }
}

export default EditTaskButton;