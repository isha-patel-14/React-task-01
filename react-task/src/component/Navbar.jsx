import React from "react";
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav>

                <NavLink className={(e)=>{return e.isActive?"blue": "" }} to="/"><li>About Us</li></NavLink>
                <NavLink className={(e)=>{return e.isActive?"blue": "" }} to="/react01"><li>Website-1</li></NavLink>
                <NavLink className={(e)=>{return e.isActive?"blue": "" }} to="/react02"><li>Website-2</li></NavLink>
                <NavLink className={(e)=>{return e.isActive?"blue": "" }} to="/react03"><li>Website-3</li></NavLink>
                <NavLink className={(e)=>{return e.isActive?"blue": "" }} to="/react04"><li>Website-4</li></NavLink>


            </nav>

        </div>
    )
}

export default Navbar
