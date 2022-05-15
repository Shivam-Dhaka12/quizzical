import React from "react"

export default function Option(props){
    return(
        
        <button className={`option ${props.select?"selected":""} ${props.showCorrect? "showCorrect" : ""} ${props.showInCorrect?"showInCorrect":""}`} onClick={()=> props.handleClick()}>{props.value}</button>    

    )
}