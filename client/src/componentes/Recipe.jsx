import React from "react";
import { useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import "../css/recipe.css"
import { addFavorite } from "../redux/actions/actions";
import  heartIcon from"../assets/2.png"
import { useSelector } from "react-redux";


const Recipe = ({name, diets, healthScore, image, id}) => {
   
  const dispatch = useDispatch();

  

   const handleClick = ({name, diets, healthScore, image, id})=>{
    
    console.log("HANDLECLICK EN RECIPE, ADD BUTTON",id);
 dispatch(addFavorite({name, diets, healthScore, image, id}));
 
  }

   return (
        
        <div className="Recipe">
         <div className="card_body">
       <img src={image}  className="image" alt="Error"  />
        <h4 className="card_name"> <NavLink  to={`/home/${id}`}>
        {name}
        </NavLink></h4>
        <p className="card_score">Health Score: {healthScore}</p>
        <p className="card_diets">{diets.join(" - \n")} </p>
        </div>
        <button onClick={()=>handleClick({name, diets, healthScore, image, id})} className="card_add_favorite"><img src={heartIcon} alt="HeartIcon" width="40px"/></button>
        </div>
    )
}

export default Recipe;