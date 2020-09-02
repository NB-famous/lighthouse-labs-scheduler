import React from "react";
import classNames from "classnames"
import "components/InterviewerListItem.scss";

const InterviewerListItem = (props) => {

    //console.log("this is my Interview props", props)
    const {name, avatar, selected, setInterviewer} = props

    const interviewerClass = classNames("interviewers__item", {
        "interviewers__item--selected": selected
    })



    return(

        <li 
            className={interviewerClass}
            onClick={ setInterviewer }>
            <img
                className="interviewers__item-image"
                src={avatar}
                alt={name}
            />
            {selected && name} {/* if selected is true show name */}
        </li>
    );


}

export default InterviewerListItem



