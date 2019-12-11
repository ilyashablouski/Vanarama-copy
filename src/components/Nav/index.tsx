import React, { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import "./styles.scss"

const Nav = () => {
  const router = useRouter()
  useEffect(() => {
    router.prefetch("/test")
  })
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/test">
            <a>Test</a>
          </Link>
        </li>
        <li>
          <Link href="/sub/test">
            <a>Sub Test</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
