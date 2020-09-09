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
    /// Grab the value from interview Obj and then use that value and then grab 
    // from the value in our interviewers Obj given by API
    newInterviewerObj.student = interview.student
    newInterviewerObj.interviewer = state.interviewers[interview.interviewer]
    
    return newInterviewerObj;
}

const  getInterviewersForDay = (state, day) => {
  const filteredAppointments = state.days.find(result => result.name === day);
  if(state.days.length === 0  || filteredAppointments === undefined){
      return [];
  }
  const returnInterviewer = filteredAppointments.interviewers.map(id => state.interviewers[id])
  return returnInterviewer;
}

export {getAppointmentsForDay, getInterview,  getInterviewersForDay }

