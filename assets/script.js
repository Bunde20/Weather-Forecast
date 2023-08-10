var APIkey = "bccf102cf897ddc4659f3f10d43085ab";
var cityInput = document.querySelector(".form-control")
var searchBtn = document.querySelector(".searchBtn")
var cityInfo = document.querySelector(".cityInfo")
var icon = document.querySelector(".icon")
var temp = document.querySelector(".temp")
var wind = document.querySelector(".wind")
var humidity = document.querySelector(".humidity")
var forecast = document.querySelectorAll(".forecast")
var historyUl = document.querySelector(".historyUl")

searchBtn.addEventListener("click", function () {
    var history = JSON.parse(localStorage.getItem("cities")) || [];
    var cityName = cityInput.value.trim();
    if (!history.includes(cityName)) {
    getCity(cityName);
    getForecast(cityName);
    history.push(cityName);
    localStorage.setItem("cities", JSON.stringify(history));
    renderHistory();
    }
});

function getCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)
            var date = new Date()
            var month = date.getMonth() + 1
            var day = date.getDate()
            var year = date.getFullYear()
            cityInfo.innerHTML = `${data.name} - ${month}/${day}/${year}`
            icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            icon.setAttribute("alt", data.weather[0].description)
            temp.innerHTML = `Temp: ${data.main.temp}°F`
            wind.innerHTML = `Wind: ${data.wind.speed}mph`
            humidity.innerHTML = `Humidity: ${data.main.humidity}%`
        })
}

function getForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)
            for (var i = 0; i < forecast.length; i++) {
                forecast[i].innerHTML = ""
                var index = i * 8 + 4
                var date = new Date(data.list[index].dt * 1000)
                var month = date.getMonth() + 1
                var day = date.getDate()
                var year = date.getFullYear()
                var dateEl = document.createElement("h3")
                dateEl.innerHTML = `${month}/${day}/${year}`
                forecast[i].append(dateEl)
                var icon = document.createElement("img")
                icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`)
                icon.setAttribute("alt", data.list[index].weather[0].description)
                forecast[i].append(icon)
                var temp = document.createElement("p")
                temp.innerHTML = `Temp: ${data.list[index].main.temp}°F `
                forecast[i].append(temp)
                var wind = document.createElement("p")
                wind.innerHTML = `Wind: ${data.list[index].wind.speed}% `
                forecast[i].append(wind)
                var humidity = document.createElement("p")
                humidity.innerHTML = `Humidity: ${data.list[index].main.humidity}%`
                forecast[i].append(humidity)
            }
        })
}

function renderHistory() {
    var data = JSON.parse(localStorage.getItem("cities")) || []
    for (var i = 0; i < data.length; i++) {
        var li = document.createElement("li")
        li.innerHTML = data[i]
        historyUl.append(li)
        li.addEventListener("click", function (event) {
            var click = event.target.innerHTML
            getCity(click)
            getForecast(click)
        })
    }
}

renderHistory()
