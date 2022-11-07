import {
    GET_ALL_RECIPES,
    FILTER_DIET,
    GET_BY_NAME,
    GET_DIETS,
    GET_RECIPE_BY_ID,
    CREATE_RECIPE,
    FILTER_CREATED,
    FILTER_HTOL,
    DELETE_RECIPE,
    CLEAN_DETAIL,
    ADD_FAV,
    DELETE_FAV
  
} from "../actions/actions";

const initialState = {
    recipes: [],
    diets: [],
    recipe: {},
    allRecipes: [],
    favorites: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                    allRecipes: action.payload
            };
        case GET_RECIPE_BY_ID:
            return {
                ...state,
                recipe: action.payload
            };
        case GET_DIETS: 
            return {
                ...state,
                diets: action.payload
            };
        case FILTER_DIET:
            let allRecipes = state.allRecipes;
            console.log("recipes.diet", allRecipes);

            let recetasFiltradas = allRecipes.filter((elemento) => {
                if (elemento.diets.includes(action.payload)) return elemento;
            })
            return {
                ...state,
                recipes: recetasFiltradas
            };
        case CREATE_RECIPE:
            return {
                ...state
            };
        case GET_BY_NAME:
            return {
                ...state,
                recipes: action.payload
            };
        case FILTER_CREATED:
                const todasRecipes = state.allRecipes;
                const createdFilter = action.payload === "Created" ? todasRecipes.filter(e => e.create) : todasRecipes.filter(e => !e.create)
            return {
                    ...state,
                    recipes: action.payload === "All" ? state.allRecipes : createdFilter
            };
        case FILTER_HTOL:
            console.log("LLEGO AL REDUCER",action.response);
                    
            return {
                        ...state,
                     recipes: action.response
                    };
    case DELETE_RECIPE:
        console.log(action.payload);
      return {
        ...state,
        recipes: state.recipes.filter((a) => a.id !== action.payload),
      };

      case ADD_FAV:

      return {
        ...state,
        favorites:[...state.favorites, action.payload]
      };
      case DELETE_FAV:
        return {
        ...state,
        favorites: state.favorites.filter((a) => a.id !== action.payload),
      };
      case CLEAN_DETAIL:
        
      return {
        ...state,
        recipe:{}
       };

        default:
                    return {
                        ...state
                    };
    };
};

export default rootReducer;

