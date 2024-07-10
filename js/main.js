let city = document.querySelector(".city");
let degree = document.querySelector(".degree");
let weatherCondition = document.querySelector(".weather-condation");
let humidity = document.querySelector(".details .humidity");
let wind = document.querySelector(".wind");
let windImg = document.querySelector(".wind .wind-img")
let weatherTrend = document.querySelector(".weather-trend");
let todayImg = document.querySelector(".todayImg");
let nameOfDay = document.querySelector(".name-day");
let month = document.querySelector(".date .month");
let dateNum = document.querySelector(".date .date-num");
let searchInput = document.querySelector("#search-inpute");
let weatherData;


async function getdata(key){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ab665c02dc384b38902150930242803&q=${key}&days=3`);
    let data = await response.json();
    return data
}

async function startApp(key){
    weatherData = await getdata(key)
    todayWeather()
    tomorrow()
     afterTomorrow()

}
function todayWeather(){
    let date = new Date(weatherData.location.localtime);
     nameOfDay.innerHTML = date.toLocaleString('en-us', { weekday: 'long' });
        month.innerHTML = date.toLocaleString('en-us', { month: 'short' });
        dateNum.innerHTML = date.getDate();


    city.innerHTML = weatherData.location.name;
    degree.innerHTML = weatherData.current.temp_c + "oC";
    weatherCondition.innerHTML = weatherData.current.condition.text
    todayImg.setAttribute("src","https:" +  weatherData.current.condition.icon) ;
    wind.innerHTML += weatherData.current.wind_kph + "km/h";
    weatherTrend.innerHTML += weatherData.current.wind_dir;
    humidity.innerHTML += weatherData.current.humidity + "%";

}

function tomorrow() {
    let date = new Date(weatherData.forecast.forecastday[1].date);
    document.querySelector(".day-two").innerHTML = date.toLocaleString('en-us', { weekday: 'long' });
    document.querySelector(".max-temp").innerHTML = weatherData.forecast.forecastday[1].day.maxtemp_c + "c";
    document.querySelector(".min-temp").innerHTML = weatherData.forecast.forecastday[1].day.mintemp_c + "c";
    document.querySelector(".img-day-two").setAttribute("src", "https:" + weatherData.forecast.forecastday[1].day.condition.icon);
    document.querySelector(".weather-condation-two").innerHTML = weatherData.forecast.forecastday[1].day.condition.text;
}

function afterTomorrow() {
    let date = new Date(weatherData.forecast.forecastday[2].date);
    document.querySelector(".day-three").innerHTML = date.toLocaleString('en-us', { weekday: 'long' });
    document.querySelector(".max-day-three").innerHTML = weatherData.forecast.forecastday[2].day.maxtemp_c + "c";
    document.querySelector(".min-temp-three").innerHTML = weatherData.forecast.forecastday[2].day.mintemp_c + "c";
    document.querySelector(".img-day-three").setAttribute("src", "https:" + weatherData.forecast.forecastday[2].day.condition.icon);
    document.querySelector(".weather-condation-three").innerHTML = weatherData.forecast.forecastday[2].day.condition.text;
}

 searchInput.addEventListener("keyup", () => {
    startApp(`${searchInput.value}`);
 });


 