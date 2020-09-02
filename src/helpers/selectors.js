



const getAppointmentsForDay = (state, day) => {

    

    const filteredAppointments = state.days.find(result => result.name === day);

    if(!filteredAppointments){
        return [];
    }

    const returnAppointment = filteredAppointments.appointments.map(id => state.appointments[id])

    return returnAppointment;
}


export {getAppointmentsForDay}

