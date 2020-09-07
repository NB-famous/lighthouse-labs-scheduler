import React, {useState} from "react"
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"

const Form = (props) => {

    const [name, setName] = useState(props.name || "")
    const [interviewer, setInterviewer] = useState(props.interviewer || null)
    //When the input is invalid, we need to change the error state to "Student name cannot be blank"
    const [error, setError] = useState("");


    //console.log("this is oncancel", props.onCancel)
    //console.log("this is onSave", props.onSave)

    /// this save function only calls name and interviewer to the onSave -> its not similar to the one inside application
    // This has been replace by validate function
    /* function save() {
        props.onSave(name, interviewer)
    } */

    const reset = () => {
        setName("");
        setInterviewer(null)
    }

    const cancel = () => {
        reset();
        props.onCancel()
    }

    const validate = () => {
        if (name === "") {
          setError("Student name cannot be blank");
          return;
        }
        
        setError("");
        props.onSave(name, interviewer);
      }


    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form 
                    onSubmit={event => event.preventDefault()}
                    autoComplete="off"
                >
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        type="text"
                        placeholder="Enter Student Name"
                        /*
                        This must be a controlled component
                        */
                        data-testid="student-name-input"
                    />
                </form>
                
                <section className="appointment__validation">{error}</section>

                <InterviewerList
                    interviewers={props.interviewers}
                    interviewer={interviewer}
                    setInterviewer={setInterviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                <Button danger onClick={cancel}>Cancel</Button>
                <Button confirm onClick={validate}>Save</Button>
                </section>
            </section>
        </main>

    )
}

export default Form