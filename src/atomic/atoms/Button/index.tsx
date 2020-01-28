import React, { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const Button = (props) => {
  return <button>{props.name}</button>
}

export default Button
