import React from "react"

const Input = ({ type, placeholder, defaultVal }) => {
  return (
      <input className="form--item" type={type} placeholder={placeholder} value={defaultVal} />
  )
}

export default Input
