import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../redux/actions/actions';
import Paginado from './Paginado';
import Nav from './Nav';
import  "../css/homePage.css"
const HomePage = (props) => {

   //constante para despachar las acciones
   const dispatch = useDispatch();

   
   const allRecipes = useSelector((state) => state.recipes)

 
   useEffect(() => {
      dispatch(getAllRecipes())
   }, [])


   function handleClick(e) {
      e.preventDefault();
      dispatch(getAllRecipes())
   }

   return (
      <div>

         <Nav />

         <Paginado items={allRecipes} hadlerClickHome={handleClick} />
         
       
           <div>
            <button className='button_refresh' onClick={e => { handleClick(e) }}>Refresh all</button>
         </div>
</div>)

}




export default HomePage;