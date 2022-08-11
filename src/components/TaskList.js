import React from "react";
import Task from "./Task";

import { Container } from 'react-bootstrap';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tasks = this.props.tasks.map(task => {
            return (<Task task={task} key={task.id} taskStatusChange={this.props.taskStatusChange} taskDelete={this.props.taskDelete}/>);
        })
        return (
            <Container fluid className="my-3">
                {tasks}
            </Container>
        );
    }
}

export default TaskList;