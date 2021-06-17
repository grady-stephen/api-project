"use strict";
$("#loading-pic").hide();

function getMovies() {
    $("#loading-pic").show();
    $.ajax({
            url: 'https://capable-habitual-contraption.glitch.me/movies',
            type: "GET",
            data: {},
            success: function (data) {
                console.log(data)
            },
            complete: function () {
                $("#loading-pic").hide();
            }

        }
    )
}

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