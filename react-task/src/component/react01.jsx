// import React from 'react'
import React, { useState, useEffect } from "react";
import './react01.css'

function react01() {
  const [searchQuery, setSearchQuery] = useState("");
  const [area, setArea] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null); 
  const [showPopup, setShowPopup] = useState(false); 


  const areas = ["American", "British", "Canadian", "Chinese", "Croatian", "Dutch","Egyptian", "Filipino", "French", "Greek", "Indian", "Irish", "Italian", "Jamaican", "Japanese", "Kenyan", "Malaysian", "Mexican", "Moroccan", "Polish", "Portuguese", "Russian", "Spanish", "Thai", "Tunisian", "Turkish", "Ukrainian", "Unknown", "Vietnamese"];


  const ingredients = ["Chicken","Salmon","Beef","Pork","Avocado","Basil","Basmati Rice","Bay Leaf","Biryani Masala","Black Pepper","Bread","Butter","Cheddar Cheese","Cheese","Cheese Curds","Chocolate Chips","Egg Rolls","Egg White","Eggs", "Egg Yolks","Flour","Fries","Garlic","Ghee","Ginger","Ginger Garlic Paste","Honey","Ice Cream","Jalapeno","Lasagne Sheets","Onion","Peanuts","Peanut Butter"];


  useEffect(() => {
    const defaultSearch = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${defaultSearch}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals || []));
  }, []);


  const handleSearch = () => {
    setLoading(true);
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
    if (area) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    }
    if (ingredient) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (searchQuery || area || ingredient) {
      handleSearch();
    }
  }, [searchQuery, area, ingredient]);



  const handleInstructionClick = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedMeal(data.meals[0]); // Store the entire meal data
        setShowPopup(true);
      })
      .catch((error) => console.error('Error fetching meal details:', error));
  };


  const closePopup = () => {
    setShowPopup(false);
    setSelectedMeal(null);
  };

  return (
    <div className="meal-container">
      <div  className="heading">My meals</div>


      {/* search bar */}
      <input className="search-bar" type="text" placeholder="Seach for a meal" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>

      {/* area drop-down list */}
      <div className="area-list">
        <select onChange={(e)=>setArea(e.target.value)} value={area}>
          <option value="">Choose Area</option>
          {
            areas.map((areaOption,index)=>(
              <option key={index} value={areaOption}>
                {areaOption}
              </option>
            ))}
        </select>


        {/* ingredients drop-down list */}
        <select onChange={(e) => setIngredient(e.target.value)} value={ingredient}>
          <option value="">Seacrh by Ingredient</option>
          {
          ingredients.map((ingredientOption, index) => (
            <option key={index} value={ingredientOption}>
              {ingredientOption.replace('_', ' ').toUpperCase()}
            </option>
          ))}
        </select>
      </div>


      {/* Display Meals */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="meal-grid">
          {meals.length > 0 ? (
            meals.map((meal) => (
              <div key={meal.idMeal} className="meal-card">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h3>{meal.strMeal}</h3>
                <p>{meal.strArea}</p>
                <button  onClick={() => handleInstructionClick(meal.idMeal)}>Recipe</button>
              </div>
            ))
          ) : (
            <p>No meals found.</p>
          )}
        </div>
      )}

      {/* Popup for instructions */}
      {showPopup && selectedMeal && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={closePopup}>X</button>
            <div className="text">{selectedMeal.strMeal}</div>
            <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} className="popup-img"/>
          
            
            <div className="instructions-scroll">
              <p>{selectedMeal.strInstructions}</p>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

export default react01;