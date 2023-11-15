const ApiKey = '37cc86979138d53b410e900ea9c59de3'
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
//const axios = require('axios');

const search = document.querySelector('.search')
const searchBtn = document.querySelector('.fa-solid')
const contDay = document.querySelector('.day')
const weatherImg = document.querySelector('.img-meteo')

// const { DateTime } = require('luxon');
const favoriteCity = []
let map = null


function dayWeather(city) {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=37cc86979138d53b410e900ea9c59de3&units=metric`)
        .then(function (res) {
            console.log(res)

            if (res.status === 200) {

                for (let i = 0; i < res.data.list.length - 20; i++) {
                    const contentDay = document.createElement('div')
                    contentDay.classList.add('card-day')

                    const dayDate = document.createElement('p')
                    dayDate.textContent = luxon.DateTime.fromSeconds(res.data.list[i].dt).toFormat('dd LLLL HH:mm')
                    contentDay.appendChild(dayDate)

                    const imgDay = document.createElement('img')
                    if (res.data.list[i].weather[0].main === 'Clouds') {
                        imgDay.src = './weather-img/cloudy.png'

                    } else if (res.data.list[i].weather[0].main === 'Clear') {
                        imgDay.src = './weather-img/sunny.png'

                    } else if (res.data.list[i].weather[0].main === 'Rain') {
                        imgDay.src = './weather-img/raining.png'

                    } else if (res.data.list[i].weather[0].main === 'Drizzle') {
                        imgDay.src = './weather-img/rainy.png'

                    } else if (res.data.list[i].weather[0].main === 'Mist') {
                        imgDay.src = './weather-img/mist.png'

                    }
                    contentDay.appendChild(imgDay)

                    const tempDay = document.createElement('span')
                    tempDay.textContent = Math.round(res.data.list[i].main.temp) + '°C'
                    contentDay.appendChild(tempDay)

                    document.querySelector('.day').appendChild(contentDay)

                    document.querySelector('.row-meteo').style.display = 'flex'
                    document.querySelector('.error').style.display = 'none'
                }

            }
        })
        .catch(function (error) {
            if (city.includes(" ") === true || city.length === 0) {
                document.querySelector('.error').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ' + ' inserisci un città' + ' <i class="fa-solid fa-triangle-exclamation"></i>'
                document.querySelector('.error').style.display = 'block'
                document.querySelector('.row-meteo').style.display = 'none'
            } else {

                document.querySelector('.error').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ' + city + ' non esiste inserisci un città valida' + ' <i class="fa-solid fa-triangle-exclamation"></i>'
                document.querySelector('.error').style.display = 'block'
                document.querySelector('.row-meteo').style.display = 'none'
            }

            console.log(city.includes(""))
        })
}

function nextElement() {
    if (currentIndex < res.data.list.length - 1) {
        currentIndex++
    }
}

function CheckWeather(city) {
    axios.get(`${ApiUrl}${city}&appid=${ApiKey}&units=metric`)
        .then(function (res) {
            console.log(res)

            if (res.status === 200) {

                // MAPPA
                document.querySelector('.city').innerHTML = res.data.name
                document.querySelector('.umidity').innerHTML = res.data.main.humidity + '%'
                document.querySelector('.wind').innerHTML = res.data.wind.speed + 'km/h'
                document.querySelector('.temp').innerHTML = Math.round(res.data.main.temp) + '°C'
                document.querySelector('.temp-min').innerHTML = Math.round(res.data.main.temp_min) + '°C' + ' ' + ' / ' + ' '
                document.querySelector('.temp-max').innerHTML = Math.round(res.data.main.temp_max) + '°C'
                document.querySelector('.date').innerHTML = luxon.DateTime.fromSeconds(res.data.dt).toFormat('dd LLLL')

                if (res.data.weather[0].main === 'Clouds') {
                    weatherImg.src = './weather-img/cloudy.png'

                } else if (res.data.weather[0].main === 'Clear') {
                    weatherImg.src = './weather-img/sunny.png'

                } else if (res.data.weather[0].main === 'Rain') {
                    weatherImg.src = './weather-img/raining.png'

                } else if (res.data.weather[0].main === 'Drizzle') {
                    weatherImg.src = './weather-img/rainy.png'

                } else if (res.data.weather[0].main === 'Mist') {
                    weatherImg.src = './weather-img/mist.png'

                }

                document.querySelector('.row-meteo').style.display = 'flex'
                document.querySelector('.error').style.display = 'none'

                if (map) {
                    map.remove()
                }

                map = L.map('map').setView([res.data.coord.lat, res.data.coord.lon], 13);
                console.log(map)
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                    maxZoom: 18,
                }).addTo(map);

                L.marker([res.data.coord.lat, res.data.coord.lon]).addTo(map);


            }

        })
        .catch(function (error) {
            if (city.includes(" ") === true) {
                document.querySelector('.error').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ' + ' inserisci un città' + ' <i class="fa-solid fa-triangle-exclamation"></i>'
                document.querySelector('.error').style.display = 'block'
                document.querySelector('.row-meteo').style.display = 'none'
            } else {

                document.querySelector('.error').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ' + city + ' non esiste inserisci un città valida' + ' <i class="fa-solid fa-triangle-exclamation"></i>'
                document.querySelector('.error').style.display = 'block'
                document.querySelector('.row-meteo').style.display = 'none'
            }
        })

}

search.addEventListener('keyup', () => {
    if (event.key === "Enter") {
        CheckWeather(search.value)
        dayWeather(search.value)
        search.value = ''
        contDay.innerHTML = ''

    }

})

searchBtn.addEventListener('click', () => {

    CheckWeather(search.value)
    dayWeather(search.value)
    search.value = ''
    contDay.innerHTML = ''

})
