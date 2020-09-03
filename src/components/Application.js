import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

////////// Appointment Components //////////////////

import Appointment from "components/Appointment/Index";

///////////////////////////////////////////////////

/* const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "2pm",
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Nikko Badoles",
      interviewer: {
        id: 2,
        name: "Mildred Nazir",
        avatar:"https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Jonny Johnson",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar:"https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: "last",
    time: "5pm",
  },


];
 */

export default function Application(props) {

  /*  /// Before combining them
  
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]); 
  
  */

 const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));


  useEffect(() => {

    console.log("Fetching Data.....")

    const getApiDays = axios.get(`/api/days`);
    const getApiAppointements = axios.get(`api/appointments`);
    const getApiInterviewers = axios.get(`api/interviewers`);

    Promise.all([getApiDays, getApiAppointements, getApiInterviewers])
    .then(all => {

      console.log("This is all", all)
      console.log(all[0].data)

      //const [getApiDays, getApiAppointements] = all;
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
    .catch(err => console.log(err));

  }, [])

  // This returns an array of Appointment objects -> Making this allows us to remove our 
  // hard coded appointments array of objects 
  const appointments = getAppointmentsForDay(state, state.day);



  // This was moved from within the return of Application function and just return the variable instead
  const schedule = appointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);

    return (
    <Appointment 
      key={appointment.id} 
      id={appointment.id}
      time={appointment.time}
      interview={interview} 
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
            {/* B4 usestate
            
              <DayList
              id={days} 
              days={days} 
              day={"Monday"} 
              setDay={day => console.log(day)}/> */}

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
}
