import React from 'react';
import {NavLink} from 'react-router-dom'
import "../css/landingPage.css"
const LandingPage = ()=> {


    return (
        <>
            <div className='body'>
        
            <section className="grid">
                <div className="grid_texts">
                    <h2 className="grid_title">The Grandma</h2>
                    <h2 className="grid_title">Marta's recipes</h2>
                <h2 className="grid_title grid_title-transform"> An amazing cookbook</h2>
                <h2 className="grid_title grid_title-transform"><small> For Henry food</small></h2>
                </div>

                <NavLink to="/home">
                <button className='button-83'>
                    HOME
                </button>
            </NavLink>

            </section>
            {/* <Link to="/home">
                <button>
                    VER RECETAS
                </button>
            </Link> */}
        
         </div>
         </>
    
    )
}

export default LandingPage;