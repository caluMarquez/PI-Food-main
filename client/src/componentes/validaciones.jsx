export const validString = (str)=> {   
    str.trim();
    if(typeof str !== "string") return true;
    if(!str.length) return true;
    }
    
export const validNum = (num)=>{
    parseInt(num);
    if(!num.length) return true;
        
    
        if(num <= 0 || num > 101) return true;
    }
    
    

export  const validar = (obj) => {
    let errores ={}
    if(validString(obj.name)) errores.name = "Debe contener un nombre valido!";
    if(validString(obj.steps)) errores.steps = "Debes llenar los pasos";
    if(validString(obj.resume)) errores.resume = "Debe contener un resumen valido";
    if(validString(obj.ingredients)) errores.ingredients = "Debe contener ingredientes";
    if(validNum(obj.healthScore)) errores.healthScore = "El Health Score debe estar entre 0 y 100";
if(!obj.diets.length) errores.diets = "Debe elegir uno o mas tipos de dieta"
    return errores;

}
