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


//SEARCH BUTTON 
function btnOPS() {
  searchBTNEL.on("click", function (event) {
    event.preventDefault();
    cityNameP = searchBarEL.val();
    console.log(cityNameP);
    fiveCardsEL.children().remove();//clears the 5 cards for new days!
    iconIMGDIVEL.children().remove();//clears images 
    callAPI();
  })
}
btnOPS();
//ORIGINAL API CALL 
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
      var mainDataList = data.list; 
      console.log(mainDataList);
      var mainDataCity = data.city.coord; 
      //ICON
      var iconE = data.list[0].weather[0].icon;
      var urlICON = "http://openweathermap.org/img/wn/"+iconE+"@2x.png";
      iconIMGDIVEL.append('<img alt = "Weather Icon" class="weatherIconI">').attr('src',urlICON);
      var imgICON = $(".weatherIconI")
      imgICON.attr('src',urlICON);
      //OTHER DATA
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
      console.log("DATA: " + mainDataList[0].main.temp);
      fiveDays(mainDataList,mainDataCity);
    });
}
// UV INDEX 2nd API CALL 
function uv(lat,lon) {
  var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=8dc615c0e18f5961506109a55060c458";

  fetch(uvURL)
    .then(function (response) { //GET responses
      return response.json();
    })//required 
    .then(function (data) {
      uVIndex = data.current.uvi;
    });
  console.log("UV index: " + uVIndex);
}
//FIVE DAY FORCAST 
function fiveDays(dataList,dataCity){
  //console.log("Five Day List: " +dataList[0].main.temp);
  
  console.log("LIST: " +dataList)
  var temp = moment(dataList[2].dt_txt).format('ll')
  console.log("Temp: " + temp)
  for (var i = 1; i < 6; i++) {
      //CREATE CARD
      fiveCardsEL.append('<div class="col-12 col-md-3 col-xl-2 fiveDayCards" style="padding:15px;"> <div class="card text-white bg-primary mb-3"><div class="card-body"><h3 class="card-title dateName"></h3><img alt = "Weather Icon" class="weatherIconFD"><ul><li class="icon"></li><li class="tempFD"></li> <li class="windFD"></li><li class="humidityFD"></li></ul></div></div></div>');
      var dateNameELH = $(".dateName");
      var iconIMGDIVEL = $(".weatherIconFD");
      var tempFDEL = $(".tempFD"); 
      var windFDEL = $(".windFD"); 
      var humFDEL = $(".humidityFD"); 
      //STORE NEEDED DATA 
      var nameDate = moment(dataList[i].dt_txt).format('ll');
      console.log(nameDate); 
      var icon = dataList[i].weather[0].icon;
      console.log(dataList[i].weather[0].icon)
      var temp = dataList[i].main.temp + " °F";
      var wind = dataList[i].wind.speed + " MPH";
      var humidity = dataList[i].main.humidity + "%";
      var lat = dataCity.lat;
      var lon = dataCity.lon;
      uv(lat,lon);
      //PRINT ON CARD 
      dateNameELH.text(nameDate);
      var urlICON = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      iconIMGDIVEL.attr('src',urlICON);
      tempFDEL.text("Temperature: " +temp);
      windFDEL.text("Wind Speed: " +wind);
      humFDEL.text("Humidity: " +humidity);
      console.log(i);
  }
  console.log("SUCCESS!"); 
}