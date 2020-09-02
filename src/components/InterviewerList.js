import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";


const InterviewerList = (props) => {

    const { interviewers } = props

    console.log("This is the interviewers", interviewers)

    return (

        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">

                {interviewers.map(interviewer => (
                    <InterviewerListItem
                        key={interviewer.id}
                        name={interviewer.name}
                        avatar={interviewer.avatar}
                        selected={props.interviewer === interviewer.id}
                        setInterviewer={event => props.setInterviewer(interviewer.id)}
                        />
                    ))}
            </ul>
        </section>
    )

}

export default InterviewerList