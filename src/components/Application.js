import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";

////////// Appointment Components //////////////////

import Appointment from "components/Appointment/Index";

///////////////////////////////////////////////////

const appointments = [
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

    Promise.all([getApiDays, getApiAppointements])
    .then(all => {

      console.log("This is all", all)
      console.log(all[0].data)

      //const [getApiDays, getApiAppointements] = all;
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data}));
    })
    .catch(err => console.log(err));

  }, [])

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

      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointments.map(appointment => (
          <>
          <Appointment key={appointment.id} {...appointment} />
          {/* <Appointment key="last" time="5pm" />  */}
          </>
        ))}
      </section>
    </main>
  );
}
