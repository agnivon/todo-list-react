import { Button, Container, ProgressBar } from 'react-bootstrap';

const Toolbar = (props) => {
    const doneCount = props.doneCount;
    const taskCount = props.taskCount;
    const tasksDonePercentage = doneCount ? (doneCount / taskCount) * 100 : 0;
    return (
        <Container fluid className="my-3 d-flex justify-content-between">
            <div className="d-inline-block w-50">
                <ProgressBar now={tasksDonePercentage}/>
                {`${doneCount} out of ${taskCount} tasks completed`}
            </div>
            <Button variant="success" onClick={props.completedTaskDelete}><i className="bi bi-journal-x"></i> Remove Checked</Button>
        </Container>
    );
}

export default Toolbar;