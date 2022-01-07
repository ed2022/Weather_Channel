//Defining the API Key and URL 
var cityNameP = '';
var apiKey = "8dc615c0e18f5961506109a55060c458";
//Identifying Elements from HTML 
var searchBTNEL = $('.searchBTN');
var searchBarEL = $("#searchBAR");
var newButtonsEL = $(".newButtons");
var currentDateEL = $(".currentDate");
var cDnameEL = $(".nameDate");
var cDtempEL = $(".tempCD");
var cDwindEL = $(".windCD");
var cDhumidityEL = $(".humidityCD");
var cDUVEL = $(".uVCD");
var uVIndex = 0.0;
var fiveCardsEL = $(".fiveCards");
var iconIMGDIVEL = $(".weatherICONCD");
var newCityBtn = $(".newCity");
var recentS = [];

function display() {
  var pullData = JSON.parse(localStorage.getItem("cityNames"));
  if (pullData != null) {
    for (var i = 0; i < pullData.length; i++) {
      newButtonsEL.append('<button class="btn btn-primary" type="button"'+'id='+'"'+pullData[i]+'"'+'>' + pullData[i] + '</button>');
    }
  }
  cityNameP = "Atlanta"; //Default
  callAPI();
}
display(); 

// Eixisting Button Listener
newButtonsEL.on("click",function(event){
  console.log(event.target);
  cityNameP = event.target.id;
  console.log(cityNameP);
  fiveCardsEL.children().remove();//clears the 5 cards for new days!
  iconIMGDIVEL.children().remove();//clears images 
  callAPI();
})

//SEARCH BUTTON 
searchBTNEL.on("click", function (event) {
  event.preventDefault();
  cityNameP = searchBarEL.val.trim(); //Get value
  recentS.push(cityNameP);//update array 
  localStorage.setItem('cityNames', JSON.stringify(recentS));//store in local 
  newButtonsEL.append('<button class="btn btn-primary" type="button">' + cityNameP + '</button>');//create button
  newCityBtn.text(cityNameP);
  fiveCardsEL.children().remove();//clears the 5 cards for new days!
  iconIMGDIVEL.children().remove();//clears images 
  callAPI();
})
//ORIGINAL API CALL 
function callAPI() {
  var mainURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameP + "&units=imperial&appid=8dc615c0e18f5961506109a55060c458";
  fetch(mainURL)//GET is the default.
    .then(function (response) { //GET responses
      return response.json();
    })//required 
    .then(function (data) { //Store this and create buttons in local Storage 
      //ICON
      var iconE = data.weather[0].icon;
      var urlICON = "http://openweathermap.org/img/wn/" + iconE + "@2x.png";
      iconIMGDIVEL.append('<img alt = "Weather Icon" class="weatherIconI">').attr('src', urlICON);
      var imgICON = $(".weatherIconI")
      imgICON.attr('src', urlICON);
      //OTHER DATA
      var nameDate = data.name + " (" + moment.unix(data.dt).format('MMM Do, YYYY')+ ")";
      var temp = data.main.temp + " °F";
      var wind = data.wind.speed + "MPH";
      var humidity = data.main.humidity + "%";
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      uv(lat, lon);  //I promise this works 
      //PRINT ON CARD 
      cDnameEL.text(nameDate);
      cDtempEL.text("Temperature: " + temp);
      cDwindEL.text("Wind Speed: " + wind);
      cDhumidityEL.text("Humidity: " + humidity);
      cDUVEL.text("UV Index: " + uVIndex);
    });
}
// UV INDEX 2nd API CALL 
function uv(lat, lon) {
  var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=8dc615c0e18f5961506109a55060c458&exclude=minutely,hourly";
  fetch(uvURL)
    .then(function (response) { //GET responses
      return response.json();
    })//required 
    .then(function (data) {

      uVIndex = data.current.uvi;
      fiveDays(data.daily)
    });
}
//FIVE DAY FORCAST 
function fiveDays(dataList) {
  var temp = moment(dataList[5].dt_txt).format('ll');
  for (var i = 1; i < 6; i++) {
    //CREATE CARD
    fiveCardsEL.append(`<div class="col-12 col-md-3 col-xl-2 fiveDayCards" style="padding:15px;"> <div class="card text-white bg-primary mb-3"><div class="card-body"><h3 class="card-title" id="dateName${i}"></h3><img alt="Weather" id ="weatherIconFD${i}" ><li id="tempFD${i}"></li><li id="windFD${i}"></li><li id="humidityFD${i}"></li></ul></div></div></div>`);
    var dateNameELH = $(`#dateName${i}`);
    var iconIMGDIVEL = $(`#weatherIconFD${i}`);
    var tempFDEL = $(`#tempFD${i}`);
    var windFDEL = $(`#windFD${i}`);
    var humFDEL = $(`#humidityFD${i}`);
    //STORE NEEDED DATA 
    var nameDate = moment.unix(dataList[i].dt).format('MMM Do, YYYY');
    var icon = dataList[i].weather[0].icon;
    var temp = dataList[i].temp.day + " °F";
    var wind = dataList[i].wind_speed + " MPH";
    var humidity = dataList[i].humidity + "%";
   
    //PRINT ON CARD 
    dateNameELH.text(nameDate);
    var urlICON = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    iconIMGDIVEL.attr('src', urlICON);
    tempFDEL.text("Temperature: " + temp);
    windFDEL.text("Wind Speed: " + wind);
    humFDEL.text("Humidity: " + humidity);
  }
  console.log("SUCCESS!");
}