import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex justify-around bg-[#52cc99] py-4">
      <div className="font-semibold text-xl">
        <h1>Mentee Pro</h1>
      </div>
        <div>
            <ul className="flex items-center gap-12 text-[17px]">
                <li>
                  <NavLink to="/" activeClassName="text-[#f74f4f]">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about" activeClassName="text-[#f74f4f]">MentalAwareness</NavLink>
                </li>
                <li>
                  <NavLink to="/mood-journal" activeClassName="text-[#f74f4f]">Mood Journal</NavLink>
                </li>
                <li>
                  <NavLink to="/contact" activeClassName="text-[#f74f4f]">Contact</NavLink>
                </li>
            </ul>
        </div>
        <div>
        <NavLink to="/anachat">
          <button className="bg-[#bff6df] py-1.5 px-4 border border-slate-200 rounded-2xl">
            ChatWithAna
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar