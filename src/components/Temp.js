import React, {useState,useEffect} from 'react'
import "./style.css"
import WeatherCard from './WeatherCard';


const Temp = () => {

    const [searchValue, setSearchValue] = useState("kolkata");
    const [tempInfo, setTempInfo] = useState({});

    //Fetch data from url/Api
    const getWeatherInfo = async () =>{
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=78eccd61de827cb2716a9ef55883fe53`;

            let res = await fetch(url);
            let data = await res.json();

            const {temp, humidity, pressure} = data.main;
            const {main: weatherMood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            const newWeatherInfo = {
                temp,
                humidity,
                pressure,
                weatherMood,
                name ,
                speed,
                country,
                sunset
            };
            setTempInfo(newWeatherInfo);

        } catch (error) {
          console.log(error);  
        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, [])
    

  return (
    <>
     <div className="wrap">
      <div className="search">
        <input type="search" name="searchBox" id="search" placeholder='search...' autoFocus className='searchTerm' value={searchValue} onChange={ (e) => setSearchValue(e.target.value)}/>
        <button className='searchButton' type='button' onClick={getWeatherInfo}> Search</button>
      </div>
     </div> 
        <WeatherCard tempInfo = {tempInfo}/>
    </>
  )
}

export default Temp
