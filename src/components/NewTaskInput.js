import React from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';

/* const NewTaskInput = (props) => {
    return (
        <InputGroup className="mb-3">
            <FormControl placeholder="Enter new task" aria-label="Enter new task" size="lg"/>
            <Button as={InputGroup.Text} variant="primary" size="lg">Submit</Button>
        </InputGroup>
    );
} */

class NewTaskInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
        this.onInput = this.onInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onInput(event) {
        this.setState({
            input: event.target.value
        });
    }

    
    onSubmit(event) {
        if (event.key === 'Enter' || event.type === 'click') {
            const description = this.state.input;
            if (description) {
                this.props.newTask({
                    description: description,
                    isDone: false
                });
                this.setState({ input: '' });
            }
        }
    }

    /* componentDidUpdate() {
        console.log(this.state);
    } */

    render() {
        return (
            <InputGroup className="mb-3">
                <FormControl placeholder="Enter new task" aria-label="Enter new task" size="lg" value={this.state.input} onChange={this.onInput} onKeyPress={this.onSubmit} />
                <Button as={InputGroup.Text} variant="primary" size="lg" onClick={this.onSubmit}><i className="bi bi-plus fs-4"></i></Button>
            </InputGroup>
        );
    }
}

export default NewTaskInput;