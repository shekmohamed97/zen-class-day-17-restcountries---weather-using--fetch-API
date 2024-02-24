//fetch countries data :

fetch ('https://restcountries.com/v3.1/all')
   .then(response=>response.json())
   .then(countries=>{
       countries.forEach(country => {
         const{name,population,capital,region,flags}=country
         const flagUrl=flags.svg;
         const countryCard=`
         <div class="background">
            <div class="country-card">
                <img class="flag" src="${flagUrl}" alt="${name} Flag">
                <hr>
                <h2>${name.common}</h2>
                <p>Region: ${region}</p>
                <p>Population: ${population}</p>
                <p>Capital: ${capital}</p>
                <div id="${name.common.replace(/\s+/g, '-').toLowerCase()}-weather"></div>
            </div>
         </div>         
        `;
        document.getElementById('countries').innerHTML+=countryCard;

        //fetch weather data

        fetchWeather(name.common);
       });
   })
   .catch(error=>console.log(`Error fetching countries data:`,error))

   
   //Fetching to featch weather data

   function fetchWeather(countryName){
    const apiKey='8af022713a473ca7d604d6d3dc2ee0ac';
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}`;
    fetch(apiUrl)
    .then(response=>response.json())
    .then(data=>{
        const weatherInfo=`
                        <p>Weather: ${data.weather[0].main}</p>
                        <p>Description: ${data.weather[0].description}</p>
                        <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind Speed: ${data.wind.speed} m/s</p>
                        `;
                        document.getElementById(`${countryName.replace(/\s+/g, '-').toLowerCase()}-weather`).innerHTML = weatherInfo
                    })
                        .catch(error => console.log(`Error fetching weather data for ${countryName}:`, error));
    
   }
