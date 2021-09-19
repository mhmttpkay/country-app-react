import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
export default function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
      .catch(error => console.log({ error }));
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>
          React Router{" "}
          <img
            src="https://avatars3.githubusercontent.com/u/60869810?v=4"
            alt="React Dersleri"
          />{" "}
          React 
        </h1>
        <Route path="/" exact render={() => countries.map((country, i) => {
          return (
            <div key={i} className="country">
              <Link className='links' to={`/country/${country.alpha3Code}`} ><h3>{country.name}</h3>
              </Link>
            </div>
          );
        })}
        />
        <Route path="/country/:code"
          render={(renderProps) => {
            const country = countries.find(
              country => country.alpha3Code === renderProps.match.params.code
            );
            return <Country {...renderProps} country={country} />
          }}
        />


        <Link className='backLink' to='/'>Back</Link>


      </div>
    </Router>
  );
}

const Country = props => {
  const { country } = props;
  return <div className='country'>
    <img src={country.flag} alt={country.name} style={{ width: 250 }} />
    <h2>{country.name}</h2>
    <p>Capital: {country.capital || 'Başket yok'}</p>
    <p>Region: {country.region}</p>
    <p>Subregion: {country.subregion}</p>
    <p>Population: {country.population}</p>


  </div>;
};