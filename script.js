//Defining the API Key and URL 
var cityNameP = '';
var apiKey = "8dc615c0e18f5961506109a55060c458";

//Identifying Elements from HTML 
var searchBTNEL = $('.searchBTN');
var searchBarEL = $("#searchBAR");

//SEARCH BUTTON 
function btnOPS() {
  searchBTNEL.on("click", function (event) {
    event.preventDefault();
    cityNameP = searchBarEL.val();
    console.log(cityNameP);
    callAPI();
  })
}
btnOPS();

var newButtonsEL = $(".newButtons");
var currentDateEL = $(".currentDate");
var cDnameEL = $(".nameDate");
var cDtempEL = $(".tempCD");
var cDwindEL = $(".windCD");
var cDhumidityEL = $(".humidityCD");
var cDUVEL = $(".uVCD");
var uVIndex = 0.0;


function callAPI() {

  var mainURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameP + "&units=imperial&appid=8dc615c0e18f5961506109a55060c458";

  fetch(mainURL)//GET is the default.
    .then(function (response) { //GET responses
      return response.json();
    })//required 
    .then(function (data) { //Store this and create buttons in local Storage 
      localStorage.setItem(cityNameP, JSON.stringify(data));
      var cityBTNEL = localStorage.getItem(cityNameP);
      console.log(JSON.parse(cityBTNEL));
      newButtonsEL.append('<button class="btn btn-primary" type="button">' + cityNameP + '</button>')
      var newCityBtn = $(".newCity");
      newCityBtn.text(cityNameP);

      //STORE NEEDED DATA 
      var nameDate = data.city.name + " (" + moment(data.list[0].dt_txt).format('ll') + ")";
      var temp = data.list[0].main.temp + " °F";
      var wind = data.list[0].wind.speed + "MPH";
      var humidity = data.list[0].main.humidity + "%";
      var lat = data.city.coord.lat;
      var lon = data.city.coord.lon;
      uv(lat,lon);
      //PRINT ON CARD 
      cDnameEL.text(nameDate);
      cDtempEL.text("Temperature: " +temp);
      cDwindEL.text("Wind Speed: " +wind);
      cDhumidityEL.text("Humidity: " +humidity);
      cDUVEL.text("UV Index: " +uVIndex);
    });
}
function uv(lat,lon) {
  var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=8dc615c0e18f5961506109a55060c458";

  fetch(uvURL)
    .then(function (response) { //GET responses
      return response.json();
    })//required 
    .then(function (data) {
      console.log(data);
      uVIndex = data.current.uvi;
      console.log(uVIndex);
    });
  console.log("UV index: " + uVIndex);
}