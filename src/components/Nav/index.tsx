import React from "react"
import Link from "next/link"

import "./styles.scss"

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/test/">
          <a>Test</a>
        </Link>
      </li>
      <li>
        <Link href="/sub/test/">
          <a>Sub Test</a>
        </Link>
      </li>
    </ul>
  </nav>
)

export default Nav
