import React, { useEffect, useState } from "react";
import './react03.css';

const React03 = () => {
  const [data, setData] = useState([]);
  const [endpoint, setEndpoint] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("");


  useEffect(() => {
    if (!endpoint || !language) {
      return;
    }

    setLoading(true);
    setError(null);


    const BASE_URL = `https://potterapi-fedeperin.vercel.app/${language}`;

    fetch(`${BASE_URL}/${endpoint}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [endpoint, language]);

  return (
    <div className="HP-container">

      <div className="heading">Harry Potter</div>


      <div className="dropdown">
        <select
          className="dropdown-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Select Language</option>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="it">Italiano</option>
          <option value="pt">Português</option>
        </select>




        <select
          className="dropdown-select"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
        >
          <option value="">Look for</option>
          <option value="books">Books</option>
          <option value="characters">Characters</option>
          <option value="houses">Houses</option>
          <option value="spells">Spells</option>
        </select>
      </div>



      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}


      {error && (
        <p className="error">⚠️ Error: {error}</p>
      )}


      <div className="data-container">
        <div className="section-title">{endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}</div>

        <div className="grid">
          {data.length > 0 &&
            data.map((item, index) => (
              <div key={item._id || index} className="card">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name || "Unnamed"}
                    className="image"
                  />
                )}


                {endpoint === "books" && (
                  <>
                    {item.title && <h3 className="card-title">Title: {item.title}</h3>}
                    {item.cover && <img src={item.cover} alt="Book Cover" className="cover" />}
                    {item.originalTitle && <p className="card-text"><u>Original Title:</u> {item.originalTitle}</p>}
                    {item.releaseDate && <p className="card-text"><u>Release Date:</u> {item.releaseDate}</p>}
                    {item.description && <p className="card-text"><u>Description:</u> {item.description}</p>}
                    {item.pages && <p className="card-text"><u>Pages:</u> {item.pages}</p>}
                  </>
                )}

                {endpoint === "characters" && (
                  <>
                    {item.nickname && <h3 className="card-title">Name: {item.nickname}</h3>}
                    {item.hogwartsHouse && <p className="card-text"><u>House:</u> {item.hogwartsHouse}</p>}
                    {item.birthdate && <p className="card-text"><u>Birthdate:</u> {item.birthdate}</p>}
                    {item.interpretedBy && <p className="card-text"><u>Interpreted By:</u> {item.interpretedBy}</p>}
                  </>
                )}

                {endpoint === "houses" && (
                  <>
                  {item.house && <h3 className="card-title">House: {item.house}</h3>}
                  {item.emoji && <p className="card-text"><u>Symbol:</u> {item.emoji}</p>}
                  {item.founder && <p className="card-text"><u>Founder:</u> {item.founder}</p>}
                  {item.animal && <p className="card-text"><u>Animal:</u> {item.animal}</p>}
                  {item.colors && <p className="card-text"><u>Colors:</u> {item.colors.join(', ')}</p>}
                  </>
                )}

                {endpoint === "spells" && (
                  <>
                    {item.spell && <h3 className="card-title">Spell: {item.spell}</h3>}
                    {item.use && <p className="card-text"><u>Usage:</u> {item.use}</p>}
                  </>
                )}
              </div>
            ))}
        </div>

        {!loading && data.length === 0 && <p className="no-data">No data available for the selected category.</p>}
      </div>
    </div>
  );
};

export default React03;