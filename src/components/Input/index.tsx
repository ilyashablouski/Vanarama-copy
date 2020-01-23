import React from "react"

export default function({handleChange, handleBlur, value, type, name}){
    return(
        <input type={type} name={name} value={value} onChange={(e => {handleChange(e)})}/>
    )
}

