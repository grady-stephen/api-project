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
    $(`#movie-${movie.id}`).attr('class', 'my-5 col-12 col-md-6 d-flex justify-content-around');
    $(`#movie-${movie.id} *:first-child`).first().click(function (){
        $(`#movie-${movie.id}`).html(`
        <div class="movieDescription">
            <h1 class="display-6 text-center movieTitle">${(movie.title).toUpperCase()}</h1>
            <h1 class="display-6 text-center movieRating">${movie.rating}/5 Stars</h1>
            <div class="pictureBorder m-auto">
                <div class="my-4 mx-2 innerText movieRelease"> <strong>Released:</strong> ${movie.year} </div>
                <div class="my-4 mx-2 innerDescription"> <strong>Description:</strong> ${movie.plot}
                </div>
                <div class="my-4 mx-2 innerText movieDirected"><strong>Directed by:</strong>${movie.director}</div>
                <div class="my-4 mx-2 innerText movieActors"><strong>Actors:</strong> ${movie.actors}</div>
                <div class="my-4 mx-2 innerText movieGenre"><strong>Genres:</strong> ${movie.genre}</div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <button id="edit-btn-${movie.id}" class="editBtn btn text-white">Edit</button>
                <button id="delete-btn-${movie.id}" class="deleteBtn btn text-white">Delete</button>
            </div>
        </div>
        `).append()
        addDeleteBtn(movie);
        addEditBtn(movie);
        $(this).off("click");

        revertClick(movie);


    })
}
function revertClick(movie){
    $(`#movie-${movie.id} *:first-child`).first().click(function (){

        $(`#movie-${movie.id}`).html(`<img src=${movie.poster} class="moviePictures ">`)
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
function postData(movie){
    $.ajax({
        url: 'https://capable-habitual-contraption.glitch.me/movies',
        type: "POST",
        data: movie,
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
    console.log(movie)
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
addAddBtn()
    function addAddBtn(){
        $('#startAddMovie').click(function (){
            $('#form-container').show();
            scrollToTarget();
            buildAddForm()
        })
    }

    function addDeleteBtn (movie) {
    $(".deleteBtn").click(function (){
        if (confirm("Are you sure you want to delete?")){
        deleteMovie(movie)
        }
    })
    }
    function deleteMovie (movie){
        $.ajax({
            url: `https://capable-habitual-contraption.glitch.me/movies/${movie.id}`,
            type: "DELETE",
            success: function () {
                   getMovies()
            },

            }

        )}



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
        buildPutMovie(movie);
        $("#addBtn").hide();
        $("#putBtn").show();
    }

    function buildPutMovie(movie){
    $("#putBtn").off("click")
    $("#putBtn").click(function(){
        let movieObj = {
            title: $("#titleInput").val(),
            rating: $("#ratingInput").val(),
            actors: $("#actors-input").val(),
            director: $("#directorInput").val(),
            plot: $("#plotInput").val(),
            year: $("#releaseInput").val(),
            genre: $("#genreInput").val(),
            id: movie.id,
            poster: movie.poster
        }
        putData(movieObj)
        $("#putBtn").hide()
        clearForm()
    })
    }

    function buildAddForm () {
        $("#submitForm").attr('id', "addBtn");
        $("#titleInput").val("");
        $("#ratingInput").find(`#valueChoose`).attr('selected', "selected");
        $("#actors-input").val("");
        $("#directorInput").val("");
        $("#plotInput").val("");
        $("#releaseInput").val("");
        $("#genreInput").val("");
        buildAddMovie()
        $("#putBtn").hide()
        $("#addBtn").show()
    }

    function buildAddMovie() {
        $("#addBtn").off("click")
        $("#addBtn").click(function(){
            let movie = {
                title: $("#titleInput").val(),
                rating: $("#ratingInput").val(),
                actors: $("#actors-input").val(),
                director: $("#directorInput").val(),
                plot: $("#plotInput").val(),
                year: $("#releaseInput").val(),
                genre: $("#genreInput").val(),
            }
            postData(movie)
            $("#addBtn").hide()
            clearForm()
        })
}

function clearForm() {
        $("#titleInput").val("");
        $("#ratingInput").find(`#valueChoose`).attr('selected', "selected");
        $("#actors-input").val("");
        $("#directorInput").val("");
        $("#plotInput").val("");
        $("#releaseInput").val("");
        $("#genreInput").val("");
        $('#form-container').hide(500)
}