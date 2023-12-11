import React from "react";
import { Link } from "react-router-dom";
import Translate from "../translations";
import './style.css'

function Menu() {
  return(
    <nav className="Link">
      <Link to={'/'} className='link__item'><Translate text='main'/></Link>
    </nav>
  )
}

export default Menu