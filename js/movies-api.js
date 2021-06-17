"use strict";
function getMovies() {
    $.ajax({
        url:'https://glitch.com/capable-habitual-contraption.me/movies',
        type: "GET",
        data: {

        },
        success: function (data){
        console.log(data)
    }}
)}

getMovies()


// console.log($.ajax('https://glitch.com/capable-habitual-contraption.me/movies'))

// function getForecast(coordinates) {
//     $.ajax({
//         url:"http://api.openweathermap.org/data/2.5/forecast",
//         type: "GET",
//         data: {
//             APPID: OPEN_WEATHERMAP_TOKEN,
//             lat: coordinates[1],
//             lon: coordinates[0],
//             units: "imperial",
//         },
//         success:function (data){
//             buildForecast(getFiveDayForecast(data.list));
//
//         }
//     })
// }