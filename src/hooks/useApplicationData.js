import React, { useState, useEffect } from "react";
import axios from "axios";


const useApplicationData = (props) => {

    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {}
    });

    const bookInterview = (id, interview) => {
        /// new appointment object//
        const appointment = {
          ...state.appointments[id], interview: {...interview}
        };
        /// new appointments object//
        const appointments = {
          ...state.appointments,[id]: appointment
        };
        /// Create an axios put request so when you refresh the page the booked interview remains
        return axios.put(`/api/appointments/${id}`, appointment)
        .then(()=> {
            setState({...state, appointments});
        });
      }
      /// Create an axios put request to remove  the save page // mentor fix issue using closyre
      const cancelInterview = (id) => () => {
        return axios.delete(`/api/appointments/${id}`)
      }
      const setDay = day => setState({ ...state,day});
      useEffect(() => {
    
        console.log("Fetching Data.....")
    
        const getApiDays = axios.get(`/api/days`);
        const getApiAppointements = axios.get(`api/appointments`);
        const getApiInterviewers = axios.get(`api/interviewers`);
    
        Promise.all([getApiDays, getApiAppointements, getApiInterviewers])
          .then(all => {
    
            //const [getApiDays, getApiAppointements] = all;
            setState(prev => ({
              ...prev,
              days: all[0].data,
              appointments: all[1].data,
              interviewers: all[2].data
            }));
          })
          .catch(err => console.log(err));
    
      }, [])
    
    return { state, setDay, bookInterview, cancelInterview}
    
}

export default useApplicationData;