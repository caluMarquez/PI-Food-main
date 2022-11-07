import React from "react";
import { useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import "../css/recipe.css"
import { deleteFavorite } from "../redux/actions/actions";
import  heartIcon from"../assets/2.png"
import { useSelector } from "react-redux";

const Favorites = ({name, diets, healthScore, image, id})=>{
    const dispatch = useDispatch();

    const state = useSelector(state => state.favorites);
  
     const handleClick = (id)=>{
  
     dispatch(deleteFavorite(id));
    
     alert("Se elimino de favoritos ");
     
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
          <button onClick={()=> handleClick(id)} className="card_add_favorite">REMOVE ADD</button>
          </div>
      )
  }




export default Favorites;