import React, { useState, useEffect } from "react";
import './react04.css'

function React04() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [centers, setCenters] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');



  useEffect(function fetchStates() {
    fetch('https://bank-apis.justinclicks.com/API/V1/STATE/')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) { setStates(data); })
      .catch(function (error) { console.error('Error fetching states:', error); })
  }, []);

  function handleStateChange(event) {
    const stateName = event.target.value;
    setSelectedState(stateName);
    setDistricts([]);
    setCities([]);
    setCenters([]);
    setBranches([]);
    if (stateName) {
      fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${stateName}/`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) { setDistricts(data); })
        .catch(function (error) { console.error('Error fetching districts:', error); })
    }
  }

  function handleDistrictChange(event) {
    const districtName = event.target.value;
    setSelectedDistrict(districtName);
    setCities([]);
    setCenters([]);
    setBranches([]);
    if (districtName) {
      fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${districtName}/`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) { setCities(data); })
        .catch(function (error) { console.error('Error fetching cities:', error); })
    }
  }

  function handleCityChange(event) {
    const cityName = event.target.value;
    setSelectedCity(cityName);
    setCenters([]);
    setBranches([]);
    if (cityName) {
      fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${cityName}/`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) { setCenters(data); })
        .catch(function (error) { console.error('Error fetching centers:', error); })
    }
  }

  function handleCenterChange(event) {
    const centerName = event.target.value;
    setSelectedCenter(centerName);
    setBranches([]);
    if (centerName) {
      fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/${centerName}/`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) { setBranches(data); })
        .catch(function (error) { console.error('Error fetching branches:', error); })
    }
  }

  function handleBranchChange(event) {
    const branchName = event.target.value;
    console.log('Selected Branch:', branchName);
  }




  return (
    <div className="bank-container">
      <div className="heading">Bank Details</div>

      <label>
        Select State:
        <select onChange={handleStateChange} value={selectedState}>
          <option value="">select state</option>
          {states.map(function (state) {
            return <option key={state} value={state}>
              {state}
            </option>
          })}
        </select>
      </label>


      <label>
        Select District:
        <select onChange={handleDistrictChange} value={selectedDistrict} disabled={!selectedState}>
          <option value="">select district</option>
          {districts.map(function (district) {
            return <option key={district} value={district}>
              {district}
            </option>
          })}
        </select>
      </label>

      <label>
        Select City:
        <select onChange={handleCityChange} value={selectedCity} disabled={!selectedDistrict}>
          <option value="">select city</option>
          {cities.map(function (city) {
            return <option key={city} value={city}>
              {city}
            </option>
          })}
        </select>
      </label>


      <label>
        Select Center:
        <select onChange={handleCenterChange} value={selectedCenter} disabled={!selectedCity}>
          <option value="">select center</option>
          {centers.map(function (center) {
            return <option key={center} value={center}>
              {center}
            </option>;
          })}
        </select>
      </label>

      <label>
        Select Branch:
        <select onChange={handleBranchChange} disabled={!selectedCenter}>
          <option value="">select branch</option>
          {branches.map(function (branch) {
            return <option key={branch} value={branch}>
              {branch}
            </option>;
          })}
        </select>
      </label>


    </div>
  )
}

export default React04;
