import React from "react";
import classNames from "classnames"
import "components/Button.scss";
//let classNames = require('classnames')

export default function Button(props) {


   

   const buttonClass = classNames("button", {

      " button--confirm": props.confirm,
      " button--danger": props.danger

   });


   /* if (props.confirm){
      buttonClass += " button--confirm";
   }

   if(props.danger){
      buttonClass += " button--danger";
   }

   console.log("this is props:", props) */


   return(
   <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled} 
   >
      {props.children}

   </button>
   );
}
