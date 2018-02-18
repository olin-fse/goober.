import React from 'react'
import {Navbar, NavItem} from 'react-materialize'
import { Link } from 'react-router-dom'
const Header = () => (
  <header>
    <Navbar className="blue" right>
        <NavItem><Link to='/'>Home</Link></NavItem>
        <NavItem><Link to='/newgoo'>New Goo</Link></NavItem>
    </Navbar>
  </header>
)

export default Header
