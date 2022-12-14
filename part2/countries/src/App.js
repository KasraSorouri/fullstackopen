import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [serach, setSearch] = useState('')
  const [country, SetCountry] = useState([])

  const results = countries.filter(country => country.name.common.toLowerCase().includes(serach.toLocaleLowerCase()))
 // console.log('result ->',results);
  useEffect(() => {
    console.log('fetch')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountries(res.data)
      })
  },[])

  const clickHandler = (choose) => {
    console.log('click -> ',choose)
    SetCountry(countries.filter(country => country.cca2.includes(choose)))
  }
  
  return (
    <div>
      <Search search={serach} setSearch={setSearch}/>
      {(results.length !== 1 ) ? <Display  results={results}  clickHandler={clickHandler}  />: <Country country={results} />}
      {(results.length > 1 ) ? <Country country={country} /> : <p></p>}
    </div>
  );
}

export default App;

const Search = ({search,setSearch}) => {

  return(
    <div>
      find countries <input 
        value={search}
        onChange={(event) => setSearch(event.target.value)} 
      />
    </div>
  )
}

const Display = ({results, clickHandler}) => {
//  console.log('Search result length -> ', results.length);

  if (results.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  } else if (results.length > 1) {
    return (results.map(country => <Results key={country.cca2} country={country} clickHandler={clickHandler} />))
  } else {
    return <p>No result</p>
  }
}

const Results = ({country, clickHandler}) => {

  return(
    <div key={country.cca2} >
      <p>{country.name.common}
      <button onClick={()=>clickHandler(country.cca2)}> show </button>
      </p>
    </div>
  )
}

const Country = (props) => {
  console.log('** Country -> ',props);

  if (props.country.length === 1) {
    const country = props.country[0]
  return (
    <div key={country.cca2}>
        <h1>{country.name.common} </h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages:</h3>
        {Object.values(country.languages).map(lang =><li key={lang}>{lang}</li>)}
        <br />
        <img src={country.flags.png} alt="Flag" />
        <Weather capital={country.capital} />
    </div>
  );
  }
}

const Weather = ({capital}) => {
  const [weather, setWeather] = useState([])
//  console.log('weather -> ',weather);
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}`
    console.log('url ->', url);
    axios
      .get(url)
      .then(res => setWeather(res.data))
    },[capital])
    let temp;
    let icon;
    let description;
    let realfeel;
    let windSpeed;
  console.log(weather);
    if (weather.main) {
      temp = (weather.main.temp -273.15).toFixed(1)
      realfeel = (weather.main.feels_like -273.15).toFixed(1)
      icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
      description = weather.weather[0].description
      windSpeed = weather.wind.speed
    } else {
      temp = 0
      icon = null
    }
//    console.log('show wearher icon ->', icon);
  return(
    <>
    <h2>Weather of {weather.name}</h2>
    <p>temp : {temp} Celcius</p>
    <p>realfeel : {realfeel} Celcius</p>
    <img src={icon} alt={description} />
    <p>wind {windSpeed} m/s</p>
    </>
  )
}