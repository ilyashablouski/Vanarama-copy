import React, { Component } from "react";

import Header from '../partials/header';
import Link from "next/link"

const Home = () => (
<div className="init">
    <Header />
    <br/>
    <Link
      href={'/account/password-request'}
    >
      <a>Forgot password?</a>
    </Link>
</div>
);

export default Home;
