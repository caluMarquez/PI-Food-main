import './App.css';
import { Route, Routes} from 'react-router-dom';
import Nav from './componentes/Nav';
import LandingPage from './componentes/LandingPage';
import HomePage from './componentes/HomePage';
import AddRecipe from './componentes/AddRecipe';
import RecipeDetails from './componentes/RecipeDetails'
import FavRecipe from './componentes/FavRecipe';

function App() {
  return (
    
    <div className="App">
      
      
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={HomePage}/>
      <Route exact path="/recipe-form" component={AddRecipe}/>
      <Route exact path="/home/:id" component={RecipeDetails}/>
      <Route exact path="/favorites" component={FavRecipe}/>
      
    </div>
    
  );
}

export default App;
