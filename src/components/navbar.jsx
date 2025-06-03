import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../assets/Vector.png"
export default function Navbar() {
  return (
    <div>
        <div>
            <img src={logo} alt="" />
        </div>
        <div>
            <Link>Bosh Sahifa</Link>
            <Link>Buyurtmalar</Link>
            <Link>Tarix</Link>
        </div>
    </div>
  )
}
