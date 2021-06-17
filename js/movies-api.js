"use strict";
$("#loading-pic").hide();
//loads our database**
function getMovies() {
    $("#loading-pic").show();
    $.ajax({
            url: 'https://capable-habitual-contraption.glitch.me/movies',
            type: "GET",
            data: {},
            success: function (data) {
                console.log(data)
                sortData(data)

            },
            complete: function () {
                $("#loading-pic").hide();
            }

        }
    )
}


// Get and retrieve updated movies;
getMovies()

function sortData(data) {
    data.forEach(function (movie){
        appendMovies(movie)
    })
}

function appendMovies(movie) {
    $("#poster").append(`<div id="movie-${movie.id}"><img src=${movie.poster} class="moviePictures"></div>`);
    firstClick(movie);

}
function firstClick(movie){
    $(`#movie-${movie.id}`).click(function (){
        $(`#movie-${movie.id}`).html(`<div class="movieDescription">
        <h1 class="display-6 text-center">${(movie.title).toUpperCase()}</h1>
        <h1 class="display-6 text-center">${movie.rating}/5 Stars</h1>
        <div class="border m-auto" style="width: 300px; height: 500px;">
            <div class="my-4 mx-2 innerText"> <strong>Released:</strong> ${movie.year} </div>
            <div class="my-4 mx-2 innerDescription"> <strong>Description:</strong> ${movie.plot}
            </div>
            <div class="my-4 mx-2 innerText"><strong>Directed by:</strong>${movie.director}</div>
            <div class="my-4 mx-2 innerText"><strong>Actors:</strong> ${movie.actors}</div>
            <div class="my-4 mx-2 innerText"><strong>Genres:</strong> ${movie.genre}</div>

        </div>
        </div>`)
        $(this).off("click");
        revertClick(movie);

    })
}
function revertClick(movie){
    $(`#movie-${movie.id}`).click(function (){

        $(`#movie-${movie.id}`).html(`<img src=${movie.poster} class="moviePictures">`)
        $(this).off("click");
        firstClick(movie);
    })
}


getFormData();
function getFormData(){
    $("#addMovie").click(function(){
       let title = $("#titleInput").val();
        let rating = $("#ratingInput").val();
        let object = {
            title: title,
            rating: rating,
        }
        postData(object);
    })
}
function postData(object){
    $.ajax({
        url: 'https://capable-habitual-contraption.glitch.me/movies',
        type: "POST",
        data: {
            title: object.title,
            rating: object.rating,
        },
        success: function (data) {
            getMovies();
            console.log(data);

        },
        complete: function () {
            $("#loading-pic").hide();
        }

    });
}

// (`<div class="movieDescription">
//         <h1 class="display-6 text-center">${(movie.title).toUpperCase()}</h1>
//         <h1 class="display-6 text-center">${movie.rating}/5 Stars</h1>
//         <div class="border m-auto" style="width: 300px; height: 500px;">
//             <div class="my-4 mx-2 innerText"> <strong>Released:</strong> ${movie.year} </div>
//             <div class="my-4 mx-2 innerDescription"> <strong>Description:</strong> 1${movie.plot}
//             </div>
//             <div class="my-4 mx-2 innerText"><strong>Directed by:</strong>${movie.director}</div>
//             <div class="my-4 mx-2 innerText"><strong>Actors:</strong> ${movie.actors}</div>
//             <div class="my-4 mx-2 innerText"><strong>Genres:</strong> ${movie.genre}</div>
//
//         </div>
//         </div>`)