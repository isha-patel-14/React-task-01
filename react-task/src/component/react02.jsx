import React, { useEffect, useState } from 'react';
import './react02.css';

function CocktailApp() {
  const [randomCocktail, setRandomCocktail] = useState(null);
  const [searchedCocktail, setSearchedCocktail] = useState([]);
  const [cocktailsByLetter, setCocktailsByLetter] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('Select Letter');
  const [showPopup, setShowPopup] = useState(false);

  // Fetch random cocktail
  const fetchRandomCocktail = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(response => response.json())
      .then(data => {
        setRandomCocktail(data.drinks[0]);
        setShowPopup(true);
      })
      .catch(error => console.error('Error fetching random cocktail:', error));
  };

  // Fetch cocktail by name
  const handleSearch = () => {
    if (!searchTerm) return;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setSearchedCocktail(data.drinks || []);
      })
      .catch(error => console.error('Error fetching searched cocktail:', error));
  };

  // Fetch cocktails by first letter
  useEffect(() => {
    if (selectedLetter === 'Select Letter') return;
    const url = selectedLetter === 'All' 
      ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a' // default to 'a' to load something initially
      : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${selectedLetter}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCocktailsByLetter(data.drinks || []);
      })
      .catch(error => console.error('Error fetching cocktails by letter:', error));
  }, [selectedLetter]);

  return (
    <div className="cocktail-app">
      <div className='heading-1'>Cocktails</div>

      <section className="random-cocktail-section">
        <button onClick={fetchRandomCocktail}>Get Random Cocktail</button>
        {showPopup && randomCocktail && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-btn" onClick={() => setShowPopup(false)}>X</button>
              <h3>{randomCocktail.strDrink}</h3>
              <img src={randomCocktail.strDrinkThumb} alt={randomCocktail.strDrink} />
              <p><strong>Category:</strong> {randomCocktail.strCategory}</p>
              <p><strong>Instructions:</strong> {randomCocktail.strInstructions}</p>
            </div>
          </div>
        )}
      </section>


      <section className="search-section">
        <input
          type="text" 
          placeholder="Search for cocktail" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button onClick={handleSearch}>Search</button>
      </section>

      <section className="search-results">
        {searchedCocktail.length > 0 ? (
          <div className="cocktail-list">
            {searchedCocktail.map(cocktail => (
              <div key={cocktail.idDrink} className="cocktail-item">
                <h4>{cocktail.strDrink}</h4>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              </div>
            ))}
          </div>
        ) : (
          <p>No results found</p>
        )}
      </section>

      <section className="letter-selection">
        <select onChange={(e) => setSelectedLetter(e.target.value)} value={selectedLetter}>
          <option value="Select Letter">Select Letter</option>
          {Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).map(letter => (
            <option key={letter} value={letter}>{letter.toUpperCase()}</option>
          ))}
        </select>
        <div className="cocktail-list">
          {cocktailsByLetter.map(cocktail => (
            <div key={cocktail.idDrink} className="cocktail-item">
              <h4>{cocktail.strDrink}</h4>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}

export default CocktailApp;
