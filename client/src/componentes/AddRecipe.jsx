import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, createRecipe } from "../redux/actions/actions";
import Nav from "./Nav";
import {  validar, validarVacio } from "./validaciones";
import  noPhoto from"../assets/3.jpeg"
import  recipeIcon from"../assets/4.png"
import  "../css/addRecipe.css"


const AddRecipe = (props)=>{
   
    const diets = useSelector(state => state.diets);
     
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllDiets())
    },[])

    const [recipe, setRecipe]= useState({
    name:"",
    healthScore:"",
    steps:"",
    resume:"",
    ingredients:"",
    image:"",
    diets:[]
    })

    const [erroresForm, setErroresForm] = useState({})
    //const [errBoton, setErrBoton] = useState(Object.keys(erroresForm).length>1 ? true : false)
   



const handleChange = (e)=> {
const property = e.target.name;
const value = e.target.value;

setRecipe( {
        ...recipe,
    [property]:value}
)
setErroresForm(validar(recipe))
}

const handleDiets = (e)=>{
    setRecipe({ 
        ...recipe,
        diets: [...new Set([...recipe.diets, e.target.value])]
    })
    setErroresForm(validar(recipe))
    
}

const handleSubmit = (e)=>{
e.preventDefault();

setErroresForm(validar(recipe))
let check = validar(recipe);
if(check.hasOwnProperty("name") || check.hasOwnProperty("resume") || check.hasOwnProperty("steps") || check.hasOwnProperty("healthScore") || check.hasOwnProperty("ingredients")|| check.hasOwnProperty("diets")){
alert("Faltan datos ")

}else{
    
    if(!recipe.image){
        recipe.image=noPhoto
    }
    
    dispatch(createRecipe(recipe));
alert("Receta creada con exito!");
setRecipe({
    name:"",
    healthScore:"",
    steps:"",
    resume:"",
    ingredients:"",
    image:"",
    diets:[]
})
 }


 
}

return(
        <>
        <Nav/>
        
        <div className="form_body">
        <div className="form_add">
            <header>
                <span>
                    <img alt="iconRecipe" width="70px"  src={recipeIcon}/>
                </span>
            </header>
            <form className="contact" onSubmit={e => handleSubmit(e)}>
                
             
                    <div > 
                    <label className="title" for="">Nombre de receta</label>
                    <input name="name" value={recipe.name} onChange={handleChange} type="text" className="text" />
                    {erroresForm.name ? <h4><small>{erroresForm.name}</small></h4> : false}
                    {/* ------- */}
                    <label className="title" for="">Resumen</label>
                    <textarea name="resume" value={recipe.resume} onChange={handleChange}  className="text" />
                    {erroresForm.resume ? <h4><small>{erroresForm.resume}</small></h4> : false}
                    {/* ------- */}
                    <label className="title" for="">Ingredientes</label>
                    <input name="ingredients" value={recipe.ingredients} onChange={handleChange} type="text" className="text" />
                    {erroresForm.ingredients ? <h4><small>{erroresForm.ingredients}</small></h4> : false}
                    {/* ------- */}
                    <label  className="title"  for="">Health Score</label>
                    <input name="healthScore" value={recipe.healthScore} onChange={handleChange} type="number" className="text" />
                    {erroresForm.healthScore ? <h4><small>{erroresForm.healthScore}</small></h4> : false}
                    {/* ------- */}
                    <label className="title" for="">Steps</label>
                    <textarea name="steps" value={recipe.steps} onChange={handleChange}  className="text" />
                    {erroresForm.steps ? <h4><small>{erroresForm.steps}</small></h4> : false}
                    {/* ------- */}
                    <label className="title" for="">Imagen</label>
                    <input name="image" value={recipe.image} onChange={handleChange} type="text" className="text" />
                    {/* ------- */}
             
                </div>
                <div>
                <h4>Dietas</h4>
                <div className="diets">
                {diets.map((d)=> {
                    return(
                       
                         <div className="box">
                         <label  key={d.id} for="">
                            <input   selected={recipe.diets.includes(d)} type="checkbox" name={d.name} value={d.name} onChange={handleDiets} />{d.name}</label>
                         </div>
                      
                        
                    )
                })}
                </div>
                </div>
                <div>
                    <button className="button_enviar" type="submit" >ENVIAR</button>
                    {erroresForm.message ? <h4><small>{erroresForm.message}</small></h4> : false}
                </div>

            </form>
        </div>
        </div>
        </>
    )

                };
                //disabled={errBoton}

export default AddRecipe;