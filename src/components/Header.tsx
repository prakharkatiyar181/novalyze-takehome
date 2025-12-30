'use client'

import {
  PopoverGroup
} from '@headlessui/react'
import Logo from '../img/logo.png'
import '../styles/header.css'

export default function Header() {

  return (
    <header className="header-bg">
      <nav aria-label="Global" className="header-nav">
        <div className="header-logo-container">
          <div className="header-logo-wrapper">
            <a href="#">
              <img
                alt="Novalyze logo"
                src={Logo}
                className="header-logo"
              />
            </a>
            <div className="header-underline" />
          </div>
        </div>
        <PopoverGroup className="header-menu">

          <a href="/" className="header-link">
            Home
          </a>
          <a href="#" className="header-link">
            Marketplace
          </a>
          <a href="#" className="header-link">
            Company
          </a>
        </PopoverGroup>
        <div className="header-login-container">
          <a href="/login" className="header-login-btn">
            Log In<span aria-hidden="true" style={{ paddingLeft: '5px' }}>&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
