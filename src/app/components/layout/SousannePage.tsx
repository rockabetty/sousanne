import React, { useState, useEffect } from 'react'
import './global.css'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface SousanneLayoutProps {
  children: React.ReactNode
  requireLogin?: boolean
}

const SousanneLayout: React.FC<SousanneLayoutProps> = ({
  children,
  requireLogin = false,
}) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Sousanne</title>
        <meta
          name="description"
          content="Sousanne is a budget-friendly meal planner."
        />
        <meta
          name="keywords"
          content="meal prep, meal planning, budgeting, freezer meals, cheap recipes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sour+Gummy:ital,wght@0,600;1,600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="wrapper">
        <main>{children}</main>
      </div>
    </>
  )
}

export default SousanneLayout
