import React from "react"
import Link from "next/link"

import "./styles.scss"

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/test/">
          <a>Test</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/sub/test/">
          <a>Sub Test</a>
        </Link>
      </li>
    </ul>
  </nav>
)

export default Nav
