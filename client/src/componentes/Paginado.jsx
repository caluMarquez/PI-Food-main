import React from "react";
import { useState } from "react";
import "../css/paginado.css"
import Recipe from './Recipe';
import Filter from "./Filter";

const Paginado = ({items, hadlerClickHome}) => {
   
    
    
    //CONSTANTES
    const [currentPage, setCurrentPage]= useState(1);
    const paginado = 9;
    const pages =[];
    
    
    
    const handleClick = (e)=>{
        e.preventDefault()
        setCurrentPage(Number(e.target.id))
        
    }

    const renderRecipes = items.map(el=>  <Recipe name={el.name} diets={el.diets} id={el.id} healthScore={el.healthScore} image={el.image} key={el.id}   />)
    //Genero la cantidad de paginas segun mis recetas, redondeo para arriba
  
    for(let i=1; i<= Math.ceil(items.length/paginado); i++){
    pages.push(i);
    }
  
    const lasIndex =currentPage*paginado;
    const firtsIndex= lasIndex - paginado;
    const currentItems = renderRecipes.slice(firtsIndex,lasIndex);
   
    const renderPages = pages.map((e)=>{
        return (
            <li key={e} id={e} onClick={handleClick}
            className={currentPage === e ? "active" : null}>
                {e}
            </li>
        )
    })

    const nextHandler = ()=>{
        setCurrentPage(currentPage+1)
        console.log(currentPage);
        console.log((Math.ceil(items.length/paginado)));
       
    }

    const prevHandler = ()=>{
        setCurrentPage(currentPage-1)
        console.log(currentPage);
        console.log((Math.ceil(items.length/paginado)));
    }

    const next = ">"
    const prev = "<"

    return (

        <div>
            <div>
            <Filter />
            
            
      <div className="paginado_organizar">
      <ul className="pageNumbers">
                <li><button onClick={prevHandler} disabled={currentPage === pages[0]}>{prev}</button></li>

                {renderPages}

                <li><button  onClick={nextHandler} disabled={currentPage === pages.at(-1)}>{next}</button></li>
            </ul>
      </div>
            </div>
            <div>

            
              
              <div className="Recipes">
              {currentItems}
              </div>
         </div>
            
        </div>
    )
}

export default Paginado;