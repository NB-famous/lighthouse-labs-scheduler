



const getAppointmentsForDay = (state, day) => {

    

    const filteredAppointments = state.days.find(result => result.name === day);

    if(!filteredAppointments){
        return [];
    }

    const returnAppointment = filteredAppointments.appointments.map(id => state.appointments[id])

    return returnAppointment;
}

const getInterview = (state, interview) => {

    const newInterviewerObj = {};

    if(!interview){
        return null;
    }

    // from interview data Obj -> used as reference
    /* {
        "id":1,
        "time":"12pm",
        "interview": {
          "student": "Lydia Miller-Jones",
          "interviewer": {
            "id": 1,
            "name": "Sylvia Palmer",
            "avatar": "https://i.imgur.com/LpaY82x.png"
          }
        }
      } */



    /// Grab the value from interview Obj and then use that value and then grab 
    // from the value in our interviewers Obj given by API
    newInterviewerObj.student = interview.student
    newInterviewerObj.interviewer = state.interviewers[interview.interviewer]
    

    return newInterviewerObj;

}


export {getAppointmentsForDay, getInterview }

