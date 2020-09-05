import React from "react"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE  = "ERROR_DELETE";


const Appointment = (props) => {

    const {mode,transition,back} = useVisualMode(props.interview ? SHOW : EMPTY);


    /////////// This is the save function ////////////////////
    const save = (name, interviewer) => {
        const interview = {student: name, interviewer};

        //transition to the SHOW mode after calling props.bookInterview.

        transition(SAVING);
        props.bookInterview(props.id, interview)
        .then(()=> transition(SHOW))
        .catch(err => transition(ERROR_SAVE, true));

    };

    ////////////////////////This is the Delete functions/////////////////

    const confirmDelete = () => {
        transition(CONFIRM)
    };

    const editAppointment = () => {
        transition(EDIT)
    };

    const deleteInterview = (id) => {
        transition(DELETING, true);
        props.cancelInterview(id)
        .then(() => transition(EMPTY))
        .catch(err => transition(ERROR_DELETE, true));
    };

    return (

        <article className="appointment">
            <Header time={props.time}/>
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onDelete = {confirmDelete}
                    onEdit = {editAppointment}
                />
            )}
            {mode === CREATE && (
                <Form 
                    interviewer={props.interviewer}
                    interviewers = {props.interviewers}
                    onCancel = {() => back()}
                    onSave ={save}
                />
            )} 
            {mode === SAVING && (
                <Status  message={"Wait!! It's Saving..."}/>
            )}
            {mode === DELETING && <Status message={"Wait It's Deleting"} />}
            {mode === CONFIRM && (
                <Confirm
                    message="Are you sure?"
                    onCancel = {()=> back()}
                    onConfirm={deleteInterview}
                />
            )}
            {mode === EDIT && (
                <Form
                    name={props.interview.student}
                    interviewer={props.interview.interviewer.id}
                    interviewers={props.interviewers}
                    onCancel={back}
                    onSave={save}
                />)}
            {mode === ERROR_SAVE && (
                <Error
                    message ="The interview was not saved..."
                    onClose={back}
                />
            )}
            {mode === ERROR_DELETE && (
                <Error
                    message ="The interview could not be deleted..."
                    onClose={back}
                />
            )}   


        </article>
    )
}

        export default Appointment