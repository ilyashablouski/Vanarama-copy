import React, { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const ButtonLink = (props) => {
  return <a href={props.href}>{props.name}</a>
}

export default ButtonLink
