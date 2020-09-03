import React, {useState} from "react"
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"

const Form = (props) => {

    const [name, setName] = useState(props.name || "")
    const [interviewer, setInterviewer] = useState(props.interviewer || null)




    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form 
                    onSubmit={event=> event.preventDefault()}
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
                    />
                </form>

                <InterviewerList
                    interviewers={props.interviewers}
                    interviewer={interviewer}
                    setInterviewer={setInterviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                <Button danger onClick={props.onCancel}>Cancel</Button>
                <Button confirm onClick={props.onSave}>Save</Button>
                </section>
            </section>
        </main>

    )
}

export default Form