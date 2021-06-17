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
                getPoster(data)
            },
            complete: function () {
                $("#loading-pic").hide();
            }

        }
    )
}

getMovies()

function getPoster(data) {
    data.forEach(function (movie){
        console.log(movie)
        appenedPoster(movie.poster)
    })
}

function appenedPoster(url) {
    $("#poster").append(`<img src=${url} class="moviePictures">`)
}


