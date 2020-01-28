import React, { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import "./styles.scss"

import Phone from "atomic/atoms/Phone"

const Nav = () => {
  const router = useRouter()
  useEffect(() => {
    router.prefetch("/test")
  })
  return (
    <nav className="nav-elements">
      <Phone />
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/test">
        <a>Test</a>
      </Link>
      <Link href="/sub/test">
        <a>Sub Test</a>
      </Link>
    </nav>
  )
}

export default Nav
