import React from "react";  
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { filterByCreated, filterByDiet, getAllDiets, getAllRecipes, filterHealthScore, filterAlpha  } from "../redux/actions/actions";
import  "../css/filter.css"


const Filter = ()=>{


const dispatch = useDispatch();
const store = useSelector(state => state);

//const [diets, setDiets] = useState([])

    useEffect(()=>{
        dispatch(getAllDiets()) 
       
     },)

const handleHealthScore = (e)=>{
    e.preventDefault()
    dispatch(filterHealthScore(e.target.value))
   
}

const handlerFilterDiet = (e)=>{
    e.preventDefault()
    
    if(e.target.value === "All"){
        dispatch(getAllRecipes())
        
    }else{

     dispatch(filterByDiet(e.target.value))
     
    }}

const handlerFilterCreated = (e)=>{
        e.preventDefault();
        dispatch(filterByCreated(e.target.value))
    }

    const handleAlpha=(e)=>{
        e.preventDefault();   
        dispatch(filterAlpha(e.target.value))
    }

//console.log("nombre dietas",store.diets.map((d)=>d.name));

      return(
        <>
   <div className="filter">
   <div className="change_color">
   <label className="name">Dieta</label>
        <select onChange={e=> handlerFilterDiet(e)}>
        <option value="All">All</option>
        {store.diets.map((d) => 
        <option key={d.id} value={d.name}>
            {d.name}
        </option>)}
        
        </select>
        </div>

       <div className="change_color">
       <label className="name" htmlFor="">Health Score</label>
        <select onChange={e=> handleHealthScore(e)} name="" id="">
            <option value="asc">Lower to higher </option>
            <option value="des">Higher to lower</option>
        </select>
       </div>

       <div className="change_color">
        <label className="name" htmlFor="">Alphabetical order:</label>
        <select onChange={e=> handleAlpha(e)} name="" id="">
            <option value="asc">A to Z </option>
            <option value="des">Z to A</option>
        </select>
        </div>

        <div className="change_color">
        <label className="name" htmlFor="">Api/Created</label>
        <select onChange={e=> handlerFilterCreated(e)} name="" id="">
            <option value="All">All</option>
            <option value="Created">Created</option>
            <option value="Api">Api</option>
        </select>
</div>
   </div>
        </>
    )
}

export default Filter;