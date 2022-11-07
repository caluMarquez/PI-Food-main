import { deleteFavorite } from "../redux/actions/actions";
import "../css/paginado.css"
import { useDispatch, useSelector } from "react-redux";
import Favorites from "./Favorites";
import Nav from "./Nav"

import { NavLink } from "react-router-dom";

const FavRecipe= () => {
   
    const dispatch = useDispatch();
  
    const stateFav = useSelector(state => state.favorites);

    console.log("FAV RECIPE", stateFav);

    const renderFav = stateFav.map(el=>  <Favorites name={el.name} diets={el.diets} id={el.id} healthScore={el.healthScore} image={el.image} key={el.id}   />)


      return (
          <>
          <Nav/>
        <div className="Recipes">
      {renderFav}
        </div>
      </>
      )


      

  }
  
  export default FavRecipe;