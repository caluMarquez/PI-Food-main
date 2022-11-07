const {
    Router
} = require('express');
const axios = require('axios');
require('dotenv').config();
const {
    APIKEY,
    APIKEY2,
    APIKEY3
} = process.env;
const {
    getApiInfo,
    db,
    getApiId,
    getDbId,
    getByName,
    filterHealthScore,
    deleteRecipe
} = require("../controllers/recipes.js");
const {
    Recipe,
    Diet
} = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


//BUSCA UNA RECETA POR QUERY NOMBRE O EN SU DEFECTO TRAE TODAS LAS RECETAS API+DB 
router.get("/getAll", async (req, res) => {
    try {

        const {name} = req.query;
        if(name){
           
            const rta = await getByName(name)  
             
        return res.status(200).send(rta)}
        
        const response = await getApiInfo();
        const dbresponse = await db(); 
        //para llenar la db con recetas de  la api
        //await Recipes.bulkCreate(response)
        //PERO TIENE QUE TENER EL FORMATO NECESARIO PARA QUE LO ACEPTE EL MODELO
        const finallyRes = [...response, ...dbresponse]

        res.status(200).send(finallyRes);

    } catch (error) {
        res.status(400).json("Error en /getAll: ",error.message)
    }
});

//CREAR RECETAS 
router.post("/create", async (req, res) => {
    try {
        const {
            name,
            healthScore,
            steps,
            resume,
            ingredients,
            image,
            diets
        } = req.body;
        if (!name || !healthScore || !steps || !resume || !ingredients || !diets) {
            throw new Error("Faltan datos")
        }

        parseInt(healthScore);

        let newRecipe = await Recipe.create({
            name,
            healthScore,
            steps,
            resume,
            ingredients,
            image
        })

        let dietasDB = await Diet.findAll({
            where: {
                name: diets
            }
        })


        const aux = Recipe.findByPk(newRecipe.id, {
            include: [{
                model: Diet
            }]
        })

        newRecipe.addDiets(dietasDB)

        res.status(200).send(newRecipe)
    } catch (error) {
        res.status(404).json("Error en /create",error.message)
    }
})
/
//LLENAR DIETAS 
router.get("/diets", async (req, res) => {
    try {
        const dietas = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian', 'ovo vegetarian', 'lacto ovo vegetarian', 'vegan', 'pescetarian', 'paleolithic', 'primal', 'low fodmap', 'whole 30', 'dairy free']

        dietas.forEach(e => {
            Diet.findOrCreate({
                where: {
                    name: e
                }
            })
        })

        const dietTypes = await Diet.findAll();

        res.status(200).send(dietTypes)


    } catch (error) {
        res.status(400).json("Error en /diets : ",error.message)
    }
})

//ENCONTRAR RECETA POR PARAMS POR :ID
router.get("/getById/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;

        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
            let DbId = await getDbId(id);

            return res.status(200).json(DbId)
        } else {
            let ApiId = await getApiId(id);
            return res.status(200).json(ApiId)
        }


    } catch (error) {
        res.status(400).json("Error en /getById:",error.message)
    }
})

//FILTRAR POR HEALTHSCORE
router.post("/filter", async (req,res)=>{
    try {
        
const {payload} = req.body;
console.log(payload);

        const response = await getApiInfo();
        const dbresponse = await db(); 
        const finallyRes = [...response, ...dbresponse]
        console.log(payload);

        if(payload !=="asc" &&  payload !== "des") { throw new Error("EL payload no es correcto")}
       
        console.log("hola");
       
        let sort = payload === 'asc' ? finallyRes.sort((a, b) => {
                 
     
                        if (a.healthScore > b.healthScore){ return 1};
                        if (b.healthScore > a.healthScore){ return -1};
                        return 0;
                    }) : finallyRes.sort((a,b)=>{
                       
                        if (a.healthScore > b.healthScore) return -1;
                        if (b.healthScore > a.healthScore) return 1;
                        return 0;
                    });

res.status(200).json(sort)
     

    } catch (error) {
        res.status(400).json("Error en /filter",error.message)
    }
})

//FILTRAR ALPHA
router.post("/filteralpha", async (req,res)=>{
    try {
        const {payload} = req.body;
    if(payload !=="asc" &&  payload !== "des") { throw new Error("EL payload no es correcto")}
    
    const response = await getApiInfo();
        const dbresponse = await db(); 
        const finallyRes = [...response, ...dbresponse]


        let sort = payload === 'asc' ? finallyRes.sort((a, b) => {
                 
     
            if (a.name> b.name){ return 1};
            if (b.name > a.name){ return -1};
            return 0;
        }) : finallyRes.sort((a,b)=>{
           
            if (a.name > b.name) return -1;
            if (b.name > a.name) return 1;
            return 0;
        });
        res.status(200).json(sort)
    } catch (error) {
        res.status(400).json("Error en /filteralpha",error.message)
    }

})

//ELIMINAR RECETA
router.delete("/delete/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        await deleteRecipe(id);
        res.send("Deleted")
    } catch (error) {
        res.status(400).send(`Error en /delete/:id`, error.message)
    }
})
///
//


//MODIFICAR RECETA
router.put("/modification/:id", async (req,res) => {
   try {
    const {id} = req.params;
    const {name, healthScore} = req.body;

    if(id.includes("-")){
       
        await Recipe.update({
        name: name,
        healthScore:healthScore},{
            where: {
                id: id
            }
        }
       )
       res.status(200).json("Se modifico tu recetaZ");
    }else{
        throw new Error ("La receta no se puede modificar ")
    }

    

   } catch (error) {
    res.status(400).json(error.message)
   }
})

module.exports = router;