import axios from 'axios';
export const GET_ALL_RECIPES= "GET_ALL_RECIPES";
export const CREATE_RECIPE= "CREATE_RECIPE";
export const GET_RECIPE_BY_ID= "GET_RECIPE_BY_ID";
export const DELETE_RECIPE= "DELETE_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const GET_BY_NAME = "GET_BY_NAME";
export const FILTER_DIET = "FILTER_DIET";
export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_HTOL = "FILTER_HTOL";
export const FILTER_AZZA ="FILTER_AZZA";
export const CLEAN_DETAIL ="CLEAN_DETAIL";
export const ADD_FAV= "ADD_FAV";
export const DELETE_FAV = "DELETE_FAV"


const ERROR = `Error en actions/`;

//OBTENER TODAS LAS RECETAS 
export const getAllRecipes=()=>{
   try {
    return (dispatch) => {
        fetch('http://localhost:3001/getAll')
        .then((response)=> response.json())
        .then((data)=> dispatch({type: GET_ALL_RECIPES, payload: data}))
    }
   } catch (e) {
    console.error(`${ERROR}getAllRecipes`)
   }}

//OBTENER RECETA POR ID 
export const getById = (id) =>{
  try {
    return(dispatch)=>{ 
        fetch(`http://localhost:3001/getById/${id}`)
        .then( (response) => response.json())
        .then((data) => dispatch({type: GET_RECIPE_BY_ID, payload: data}))
    }
  } catch (e) {
    console.error(`${ERROR}getById`) 
  }}

//TRAER TODAS LAS DIETAS 
export const getAllDiets =()=>{
    try {
        return (dispatch) => {
            fetch("http://localhost:3001/diets")
            .then((response)=> response.json())
            .then((data) => dispatch({type: GET_DIETS, payload: data}))
        }
    } catch (e) {
        console.error(`${ERROR}getAllDiets`) 
    }
}

//OBTENER RECETA POR NOMBRE QUERY 
export const getByName = (name) =>{
try {
    return(dispatch)=>{ 
        fetch(`http://localhost:3001/getAll?name=${name}`)
        .then( (response) => response.json())
        .then((data) => dispatch({type: GET_BY_NAME, payload: data}))
    }
} catch (e) {
    console.error(`${ERROR}getByName`) 
}}

//FILTRAR POR TIPO DE DIETA
export const filterByDiet = (payload) =>{
    try {
        return{
            type: FILTER_DIET,
            payload
        }
    } catch (e) {
        console.error(`${ERROR}filterByDiet`) 
    }

}

//FILTRAR POR CREADAS EN LA DB
export const filterByCreated = (payload)=>{
   try {
    return {
        type: FILTER_CREATED,
        payload
    }
   } catch (e) {
    console.error(`${ERROR}filterByCreated`) 
   }
}

//FILTRAR HEALTHSCORE
export const filterHealthScore =(payload)=>{
try {
     
    return async (dispatch)=>{
        const receta = await axios.post(`http://localhost:3001/filter`,{payload})
        
        return dispatch({type:FILTER_HTOL , response: receta.data})
            }
} catch (e) {
    console.error(`${ERROR}filterHealtScore`)  
}
   
}

//FILTRAR ALFABETICAMENTE
export const filterAlpha =(payload)=>{
    
try {
 
    return async (dispatch)=>{
        const receta = await axios.post(`http://localhost:3001/filteralpha`,{payload})
        
        return dispatch({type:FILTER_HTOL , response: receta.data})
            }
           
} catch (e) {
    console.error(`${ERROR}filterAlpha`) 
}
}

//CREAR UNA RECETA 
export const createRecipe = (payload)=>{
    // return(dispatch)=>{
    //     fetch(`http://localhost:3001/create`,payload)
    //     .then((response) => response.json())
    //     .then((data)=> dispatch({type: CREATE_RECIPE, payload: data}))
    // }

    try {
        return async(dispatch) => {
            await axios.post(`http://localhost:3001/create`,payload);
            return dispatch({ type: CREATE_RECIPE})
        }
    } catch (e) {
        //console.error(`${ERROR}createRecipe`)
    }
}

//ELIMINAR RECETA CREADA 
export const deleteRecipe = (id) => {
    return async function (dispatch) {
      try {
        
    const recipe = await axios.delete(`http://localhost:3001/delete/${id}`);
  
    return dispatch({
          type: DELETE_RECIPE,
          payload: recipe.data,
        });
      } catch (e) {
        console.error(`${ERROR}deleteRectas`);
      }
    };
  };
  
//LIMPIAR DETALLE DE RECETA
  export const cleanDetail = ()=>{
try {
    return { type: CLEAN_DETAIL}
} catch (e) {
    console.error(`${ERROR}cleanDetail`);
}
  }

//ADD FAV
export const addFavorite = (id)=>{
   try {
    return { type: ADD_FAV, payload: id}
   } catch (e) {
    console.error(`${ERROR}addFavorite`);
   }
}

//DELETE FAV 
export const deleteFavorite = (id)=> {
    try {
        return { type: DELETE_FAV, payload: id}
    } catch (e) {
        console.error(`${ERROR}deleteFavorite`);
    }
}