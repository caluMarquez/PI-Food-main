import Nav from "./Nav";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getById, getAllDiets, deleteRecipe, cleanDetail } from "../redux/actions/actions";
import  "../css/recipeDetail.css"


const RecipeDetail = (props) => {
   
    console.log(props );


    const id = props.match.params.id;
    const dispatch = useDispatch();


    const recipe = useSelector(state => state.recipe)

    
    useEffect(()=>{
        dispatch(getById(id))
        dispatch(getAllDiets)
        return function (){
            dispatch(cleanDetail())
        }
    },[dispatch]);

    

 

    const handleClick = (e)=>{
     console.log("id Recipe",id)
     dispatch(deleteRecipe(id))
     alert("successfully deleted");
     window.location.replace("http://localhost:3000/home")
     
    }
    

    console.log("RECETA",recipe.diets)
    //console.log(recipe.diets.join(","));
    return(
        <>
        <Nav/>
        <div className="detail_body">
        <div className="detail_card">
           <div>
            <h3 className="detail_name">{recipe.name}</h3>
            <p className="detail_health">Health Score {recipe.healthScore}</p>
            </div>
            <div className="detail_box_img">
                <img className="detail_img"src={recipe.image} alt=""/>
           </div>
           <div>
           <p className="detail_resume">Resume</p>
            <p className="detail_resume justify">{recipe.resume}</p>
            <p className="detail_resume">Ingredients</p>
            <ul> <li className="detail_resume">{recipe.ingredients} </li></ul>
            <p className="detail_resume">Steps</p>
            <p className="detail_resume justify">{recipe.steps}</p>
           </div>
           <button onClick={(e)=>{handleClick(e)}}> DELETE RECIPE</button>
           </div>
        </div>
     
        </>
    )
}

export default RecipeDetail;