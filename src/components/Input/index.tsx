import React from "react"

export default function({handleChange, handleBlur, value, type, name, id}){
    return(
        <input  id={id} type={type} name={name} value={value} onChange={handleChange}/>
    )
}

