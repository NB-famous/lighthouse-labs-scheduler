import React from "react";
import DayListItem from "./DayListItem";


const DayList = (props) => {
    //console.log("this is props", props)

    return (
        <ul>
         {props.days.map(day => (
            <DayListItem
                id={day.id} 
                name={day.name} 
                spots={day.spots} 
                selected={day.name === props.day}
                setDay={props.setDay}  />
         ))}

        </ul>
    )
}

export default DayList;

