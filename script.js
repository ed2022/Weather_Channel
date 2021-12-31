//Defining the API Key and URL 
var cityNameP = '';
var apiKey = "8dc615c0e18f5961506109a55060c458";

//Identifying Elements from HTML 
var searchBTNEL = $('.searchBTN');
var searchBarEL = $("#searchBAR");
console.log(searchBarEL)

function btnOPS (){
  searchBTNEL.on("click",function(event){
    event.preventDefault();
    console.log("Sub Button Works!");
    cityNameP = searchBarEL.val();
    console.log(cityNameP);
    callAPI();
  })
}
btnOPS();

var newButtonsEL = $(".newButtons");
//First things first- Call on API and making sure that it works

function callAPI (){

  var mainURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityNameP +"&appid=8dc615c0e18f5961506109a55060c458";

  fetch(mainURL)//GET is the default.
      .then(function (response) {
        return response.json();
      })//required 
      .then(function (data) {
        localStorage.setItem(cityNameP,JSON.stringify(data));
        var cityBTNEL = localStorage.getItem(cityNameP);
        console.log(JSON.parse(cityBTNEL));
        newButtonsEL.append('<button class="btn btn-primary newCity" type="button">cityName</button>')
        var newCityBtn = $(".newCity");
        newCityBtn.text(cityNameP);
      });
}


// //Here is the funcation that can get the data from local storage and display it on to the screen
// function show(){
//   for (let i = 9; i < 18; i++) {
//     var keyVal = localStorage.getItem(i); //getting local storage only the Value 
//     var timeBlockSection = $("#" + i).children().eq(1); //calling in the ID from the area 
//     timeBlockSection.val(keyVal);//attaching the value to show this as display
//   }
// }
// show();//constant call on function 