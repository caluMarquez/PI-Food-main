import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import  "../css/navBar.css"
import  burgerIcon from"../assets/10.png"
import  heartIcon from"../assets/2.png"
import  homeIcon from"../assets/3.png"

const Nav = ()=>{
    return (
        <> 
        
       <body >
       <nav className="main-nav">
            <div className="toggle-menu">
               <img src={burgerIcon} alt=""/> 
            </div>
            <ul className="main-menu" >
                <li className="main-menu_items"><NavLink to="/home"><img src={homeIcon} alt="HeartIcon" width="40px"/></NavLink></li>
                <li className="main-menu_items"><NavLink to="/recipe-form">Add Recipe!</NavLink></li>
                <li className="main-menu_items"><NavLink to="/favorites"><img src={heartIcon} alt="HeartIcon" width="40px"/></NavLink></li>
            
            
            </ul>
            <SearchBar/>
            </nav>
       </body>
        </>
                )
}

export default Nav;