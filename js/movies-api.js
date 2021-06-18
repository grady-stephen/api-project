"use strict";



$("#loading-pic").hide();
//loads our database**
function getMovies() {
    $("#loading-pic").show();
    $("#poster").html("");
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
    $(`#movie-${movie.id} *:first-child`).first().click(function (){
        $(`#movie-${movie.id}`).html(`<div class="movieDescription">
        <h1 class="display-6 text-center movieTitle">${(movie.title).toUpperCase()}</h1>
        <h1 class="display-6 text-center movieRating">${movie.rating}/5 Stars</h1>
        <div class="border m-auto" style="width: 300px; height: 500px;">
            <div class="my-4 mx-2 innerText movieRelease"> <strong>Released:</strong> ${movie.year} </div>
            <div class="my-4 mx-2 innerDescription"> <strong>Description:</strong> ${movie.plot}
            </div>
            <div class="my-4 mx-2 innerText movieDirected"><strong>Directed by:</strong>${movie.director}</div>
            <div class="my-4 mx-2 innerText movieActors"><strong>Actors:</strong> ${movie.actors}</div>
            <div class="my-4 mx-2 innerText movieGenre"><strong>Genres:</strong> ${movie.genre}</div>
            
        </div>
      
        </div>`).append(`<div style="z-index: 1000; width: 100px; height: 100px">
            <button id="edit-btn-${movie.id}" class="editBtn">Edit</button>
            <button id="delete-btn-${movie.id}" class="deleteBtn">Delete</button>
</div>
`)
        addEditBtn(movie);
        addDeleteBtn();
        $(this).off("click");

        revertClick(movie);


    })
}
function revertClick(movie){
    $(`#movie-${movie.id} *:first-child`).first().click(function (){

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

function scrollToTarget() {
    $("html").animate(
        {
            scrollTop: $("#form-container").offset().top
        },
        1200 //speed
    );
}


function putData(movie){

    $.ajax({
        url: `https://capable-habitual-contraption.glitch.me/movies/${movie.id}`,
        type: "PUT",
        data: movie,
        success: function () {
            console.log("PUT");
            getMovies();
        }
    })

}



    function addDeleteBtn(){
        $('.deleteBtn').click(function (){
            $('#form-container').show();
            scrollToTarget();

        })

    }
    function addEditBtn (movie){
        $('.editBtn').click(function (){
            $('#form-container').show();
            scrollToTarget();
            $("#formTitle").text("Edit Movie:");
            console.log(movie.id);
            fillEditForm(movie);
        })
    }

    function fillEditForm(movie){
        $("#submitForm").attr('id', "putBtn");
        $("#titleInput").val( `${movie.title.toUpperCase()}`);
        $("#ratingInput").find(`#value${movie.rating}`).attr('selected', "selected");
        $("#actors-input").val( `${movie.actors}`);
        $("#directorInput").val( `${movie.director}`);
        $("#plotInput").val( `${movie.plot}`);
        $("#releaseInput").val( `${movie.year}`);
        $("#genreInput").val( `${movie.genre}`);
        buildPutMovie();

    }

    function buildPutMovie(){
    $("#putBtn").click(function(){
        let movie = {
            title: $("#titleInput").val(),
            rating: $("#ratingInput").val(),
            actors: $("#actors-input").val(),
            director: $("#directorInput").val(),
            plot: $("#plotInput").val(),
            year: $("#releaseInput").val(),
            genre: $("#genreInput").val(),
        }
        putData(movie)
    })
    }