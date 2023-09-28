import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
const App = () => {
  const [recipedata, setRecipeData] = useState([]);
  const [searchrecipe, setSearchRecipe] = useState("");
  const RecipeData = async (name) => {
    const url = `https://api.edamam.com/search?q=${name}&app_key=c9cce8a9575c938334139c8526e942be&app_id=c775ffc0&limit=100`;
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data.hits);
        setRecipeData(response.data.hits);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    RecipeData();
  }, []);
  const inputbtn = (e) => {
    setSearchRecipe(e.target.value);
  };
  const searchbtn = () => {
    RecipeData(searchrecipe);
  };
  useEffect(()=>{
    AOS.init({
      delay:150,
    })
  },[]);
  return (
    <div>
      <div className="container">
      <div className="input">
        <h1>Find Your Recipe!</h1>
        <input
          type="search"
          placeholder="enter your recipe here"
          onChange={inputbtn}
        />
        <button onClick={searchbtn}>let's Find it.</button>
      </div>
      <div className="disaplay-recipe">
        <div className="recipe-content" >
          {recipedata.map((items) => (
            <div>
              <div className="recipe-components" data-aos='zoom-in'>
                <h2 className="label">{items?.recipe?.label}</h2>
                <img src={items?.recipe?.image} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default App;
