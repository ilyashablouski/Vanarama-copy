import React, { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const Title = (props) => {
  return <h1>{props.title}</h1>
}

export default Title
