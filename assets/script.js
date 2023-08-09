var APIkey = "bccf102cf897ddc4659f3f10d43085ab";
var cityInput = document.querySelector(".form-control")
var searchBtn = document.querySelector(".searchBtn")
var cityInfo = document.querySelector(".cityInfo")
var icon = document.querySelector(".icon")
var temp = document.querySelector(".temp")
var wind = document.querySelector(".wind")
var humidity = document.querySelector(".humidity")


searchBtn.addEventListener("click", function() {
    var cityName = cityInput.value
    getCity(cityName)
})

function getCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        console.log(data)
        var date = new Date()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var year = date.getFullYear()
        cityInfo.innerHTML = `${data.name} - ${month}/${day}/${year}`
        icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        icon.setAttribute("alt", data.weather[0].description)
    })
}