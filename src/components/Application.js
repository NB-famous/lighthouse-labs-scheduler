import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "helpers/selectors";
///// import hooks useApplicationData 
import  useApplicationData  from "../hooks/useApplicationData";
////////// Appointment Components //////////////////
import Appointment from "components/Appointment/Index";

export default function Application(props) {

  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();

  // This returns an array of Appointment objects -> Making this allows us to remove our 
  // hard coded appointments array of objects 
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);



  // This was moved from within the return of Application function and just return the variable instead
  const schedule = appointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id} 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewer = {interviewers[0].id}
        interviewers={interviewers} 
        bookInterview ={bookInterview}
        cancelInterview ={cancelInterview(appointment.id)}
      />
      )
    });

  return (
    <main className="layout">
      <section className="sidebar">
        {
          <>
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
              <DayList
              days={state.days} 
              day={state.day} 
              setDay={setDay}
              /> 
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
          </>
        }
      </section>

      <section className="schedule" >
        {schedule}
      </section>
    </main>
  );
};