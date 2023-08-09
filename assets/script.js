var APIkey = "bccf102cf897ddc4659f3f10d43085ab";
var cityInput = document.querySelector(".form-control")
var searchBtn = document.querySelector(".searchBtn")


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
    })
}