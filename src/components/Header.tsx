'use client'
import { useState, useEffect } from 'react'
import {
  PopoverGroup
} from '@headlessui/react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import Logo from '../img/logo.png'
import '../styles/header.css'

export default function Header() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme

    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

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
        <div className="header-login-container" style={{ alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={toggleTheme}
            className="header-link"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem'
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-6 w-6" style={{ height: '1.5rem', width: '1.5rem' }} />
            ) : (
              <MoonIcon className="h-6 w-6" style={{ height: '1.5rem', width: '1.5rem' }} />
            )}
          </button>
          <a href="/login" className="header-login-btn">
            Log In<span aria-hidden="true" style={{ paddingLeft: '5px' }}>&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
