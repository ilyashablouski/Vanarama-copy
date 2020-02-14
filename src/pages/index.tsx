import React, { Component } from "react";
import { Box } from 'react-raster';

import Layout from '../components/Layout';

import Header from '../partials/header';
import Link from "next/link"


const OlafHomePage = () => {

  return (
    <Layout title={`About You`}>

      <Box>

        <h1>Home Page : PLACEHOLDER</h1>

        <h2>IN PROGRESS</h2>

        <ul>
          <li><Link href='/auth/login'><a>Login</a></Link></li>
          <li><Link href='/auth/register'><a>Register</a></Link></li>
          <li><Link href='/olaf'><a>Olaf : Landing Page</a></Link></li>
          <li><Link href='/olaf/start'><a>Olaf : Start Page</a></Link></li>
          <li><Link href='/olaf/about'><a>Olaf : About You</a></Link></li>
          <li><Link href='/olaf/address_history'><a>Olaf : Address History</a></Link></li>
          <li><Link href='/olaf/employment_history'><a>Olaf : Employment History</a></Link></li>
          <li><Link href='/olaf/expenses'><a>Olaf : Expenses</a></Link></li>
          <li><Link href='/olaf/bank_details'><a>Olaf : Bank Details</a></Link></li>
          <li><Link href='/olaf/summary'><a>Olaf : Summary</a></Link></li>
        </ul>


        <h2>COMPLETED PAGES</h2>

      </Box>

    </Layout>
  )




}


export default OlafHomePage;


