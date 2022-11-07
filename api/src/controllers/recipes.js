const axios = require('axios');
require('dotenv').config();
const {APIKEY,APIKEY2,APIKEY3,APIKEY4} = process.env;
const { Recipe,Diet } = require("../db")

const apiKey = APIKEY2;
//https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100
//https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5

//ME TRAIGO LOS DATOS NECESARIOS DE 100 RECETAS DE LA API
const getApiInfo = async () => {

    try {
       
        const apiUrl = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)

        const resultado = apiUrl.data.results;

       

        if (resultado.length > 0) {
            let response = await resultado.map((elemento) => {
                return {
                    name: elemento.title,
                    image: elemento.image,
                    id: elemento.id,
                    healthScore: elemento.healthScore,
                    diets: elemento.diets.map(e => e),
                    steps: (elemento.analyzedInstructions[0] && elemento.analyzedInstructions[0].steps ? elemento.analyzedInstructions[0].steps.map(item => item.step).join(" \n") : ''),
                    resume: elemento.summary,
                    
                }

            })

            
            return response;
        } else {
            throw new Error("ERROR: getApiInfo")
        }
    } catch (error) {
        console.log(error.mesagge);
    }
}
//TRAIGO LOS DATOS DE LA DB
const db = async () => {

    try {
        
    let db = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });

    let dbresponse = await db.map(receta => {
        return {
            id: receta.id,
            name: receta.name,
            healthScore: receta.healthScore,
            image: receta.image,
            steps: receta.steps,
            resume: receta.resume,
            ingredients: receta.ingredients,
            create: receta.create,
            diets: receta.diets.map(diet => diet.name)
        }
    })

    return dbresponse;
    } catch (error) {
        console.log(error.mesagge);
    }
}
//BUSCAR POR ID EN LA API 
const getApiId = async (id) => {
    try {
        
    const info = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
   
   

    if (!info.data.id) {throw new Error("Problema al buscar el id en la api ")}

    let response = info.data;

        response = {
            name: response.title,
            image: response.image,
            id: response.id,
           resume: response.summary,
            healthScore: response.healthScore,
            diets: response.diets.map(e => e),
            steps: (response.analyzedInstructions[0] && response.analyzedInstructions[0].steps ? response.analyzedInstructions[0].steps.map(item => item.step).join(" \n") : ''),
            
        }
      
        return response;
    } catch (error) {
        console.log(error.mesagge);
    }
   
}
//BUSCAR POR ID EN LA DB 
const getDbId = async (id) => {

   try {
    if (!id) {
        throw new Error("Problema al buscar el id en la DB")
    }

    const response = await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })

 if(!response){throw new Error("No se encuentra ese ID en la DB ")}

        let rta = {
            id: response.id,
            name: response.name,
            healthScore: response.healthScore,
            image: response.image,
            steps: response.steps,
            diets: response.diets.map(e => e.name),
            resume: response.resume,
            ingredients: response.ingredients
        }

        return rta;
   } catch (error) {
    console.log(error.mesagge);
   }
}
//BUSCO POR NOMBRE
const getByName = async (name) => {
    try {
       //const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${apiKey}`) 

const api = await getApiInfo()

const dbinfo = await db();

const rta =[...api,...dbinfo];

let recetasFiltradas = rta.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));


if(!recetasFiltradas){throw new Error("Ninguna busqueda encontro coincidencia")}

const finalInfo = recetasFiltradas.map(receta => {
    return {
        id: receta.id,
        name: receta.name,
        healtScore: receta.healtScore,
        image: receta.image,
        steps: receta.steps,
        resume: receta.resume,
        ingredients: receta.ingredients,
        create: receta.create,
        diets: receta.diets.map(diet => diet.name)
    }
})
return finalInfo;

    } catch (error) {
        console.log(error.mesagge);
    }
}
//DELETE  RECIPE
const deleteRecipe = async (id)=>{
    try {
        const deleteRecipe = await Recipe.destroy({
            where: {id}
        })

        if(deleteRecipe>0){
            console.log(`Recipe id: ${id} deleted successfully`);
        }else{
            console.log("Recipe does not exist");
        }
    } catch (error) {
        console.log(error.mesagge);
    }
}


module.exports = {
    getApiInfo,
    db,
    getApiId,
    getDbId,
    getByName,
    deleteRecipe

}