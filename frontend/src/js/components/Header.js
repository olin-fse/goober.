import React from 'react'
import {Navbar, NavItem} from 'react-materialize'
import { Link } from 'react-router-dom'
const Header = () => (
  <header>
    <Navbar className="blue" right>
        <NavItem><Link to='/' className="homeLink">Home</Link></NavItem>
        <NavItem><Link to='/newgoo' className="newGooLink">New Goo</Link></NavItem>
        <NavItem><a href='/login/facebook' className='loginLink'>Login</a></NavItem>
        <NavItem><a href='/logout' className='loginLink'>Logout</a></NavItem>
    </Navbar>
  </header>
)

export default Header
