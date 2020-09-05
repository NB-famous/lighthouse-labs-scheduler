import { useEffect, useReducer } from "react";
import axios from "axios";

//////////////// Reducer function goes here ///////////////////////////

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }
    case SET_APPLICATION_DATA:
      return {  ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
    case SET_INTERVIEW: {
      let appointment = {}
      if (action.interview) {
        appointment = {...state.appointments[action.id], interview: { ...action.interview }}
      } else {
        appointment = {...state.appointments[action.id], interview: action.interview }
      }
      const appointments = {...state.appointments, [action.id]: appointment}
   
    const daysArray = state.days.map((day) => {
      for (let appointment of day.appointments) {
        if (action.id === appointment) {
          if (action.interview && !state.appointments[action.id].interview) {
            return { ...day, spots: day.spots - 1 };
          } else if (
            !action.interview && 
            state.appointments[action.id].interview)
          {
            return { ...day, spots: day.spots + 1};
          }
        }
      }
      return day
    })
      return { ...state,  appointments, days: daysArray }
  }
  default:
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  }
}

/////////////////////////////////////////////////////////////////////////////



const useApplicationData = (props) => {

    const [state, dispatch] = useReducer(reducer, {
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });

    const bookInterview = (id, interview) => {
        /// new appointment object//
        const appointment = {
          ...state.appointments[id], interview: {...interview}
        };
        /// Create an axios put request so when you refresh the page the booked interview remains
        return axios.put(`/api/appointments/${id}`, appointment)
        .then(()=> {
          dispatch({ type: SET_INTERVIEW,
            id: id,
            interview: interview
          });
        });
      }
      /// Create an axios put request to remove  the save page // mentor fix issue using closyre
      const cancelInterview = (id) => () => {
        return axios.delete(`/api/appointments/${id}`)
        .then(response => {
          dispatch({ type: SET_INTERVIEW,
          id: id,
          interview: null});
        });
      }

      const setDay = day => dispatch({ type: SET_DAY, day: day});
      useEffect(() => {
    
        console.log("Fetching Data.....")
    
        const getApiDays = axios.get(`/api/days`);
        const getApiAppointements = axios.get(`api/appointments`);
        const getApiInterviewers = axios.get(`api/interviewers`);
    
        Promise.all([getApiDays, getApiAppointements, getApiInterviewers])
          .then(all => {
            dispatch({ type: SET_APPLICATION_DATA,
              days: all[0].data,
              appointments: all[1].data,
              interviewers: all[2].data
            })
          })
          .catch(err => console.log(err));
    
      }, [])
    
    return { state, setDay, bookInterview, cancelInterview}
    
}

export default useApplicationData;