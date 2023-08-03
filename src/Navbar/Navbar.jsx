import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './Navbar.css'
export const Navbar = () => {
  return (
    <nav className='navbar'>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
        </ul>
    </nav>
  )
}
