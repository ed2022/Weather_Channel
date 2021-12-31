var cityNameP = 'London';
var apiKey = "8dc615c0e18f5961506109a55060c458";
var mainURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityNameP +"&appid=8dc615c0e18f5961506109a55060c458"


//First things first- Call on API and making sure that it works

function callAPI (){

    fetch(mainURL, {
        method: 'GET', //GET is the default.
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
}

callAPI();