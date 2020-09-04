import React from "react"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";


const Appointment = (props) => {

    const {mode,transition,back} = useVisualMode(props.interview ? SHOW : EMPTY);


    /////////// This is the save function ////////////////////
    const save = (name, interviewer) => {
        const interview = {student: name, interviewer};

        //transition to the SHOW mode after calling props.bookInterview.

        transition(SAVING);
        props.bookInterview(props.id, interview).then(()=> transition(SHOW))

    }

    ////////////////////////This is the Delete functions/////////////////

    const confirmDelete = () => {
        transition(CONFIRM)
    }

    const deleteInterview = (id) => {
        transition(DELETING);
        props.cancelInterview(id).then(() => transition(EMPTY));
    }

    return (

        <article className="appointment">
            <Header time={props.time}/>
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onDelete = {confirmDelete}
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
                <Status  message="Wait!! It's Saving..."/>
            )}
            {mode === DELETING && <Status message={"Wait It's Deleting"} />}
            {mode === CONFIRM && (
                <Confirm
                    message="Are you sure?"
                    onCancel = {()=> back()}
                    onConfirm={deleteInterview}
                />
            )}   


        </article>
    )
}

        export default Appointment