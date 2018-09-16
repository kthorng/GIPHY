console.log('I been logged');

// Initial array of topics
var topics = ['Wolverine', 'Hulk', 'Iron Man', 'Spider-man', 'Thor', 'Groot', 'Loki', 'Quicksilver', 'Black Panther', 'Star-Lord', 'Magneto', 'Ant-man']
var offset = 0;
// var topicConfirm = 0 ;
// console.log('topic confirm = ' + topicConfirm);

// displayGif function re-renders the HTML to display the appropriate content
function displayGif() {

  var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jNTy87RK0F32LVQNU906RhHbGtNvto2S&q=" + topic + "&limit=12&offset=" + offset + "&rating=R&lang=en"
//   var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=jNTy87RK0F32LVQNU906RhHbGtNvto2S&tag=" + topic + "&rating=R"

    $("#gif-dump").empty();


  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    // Stor an array of results in a variable
    var results = response.data

    // looping over every result item
    for (var i = 0; i < results.length; i++) {
    
    // Creating a div to hold the movie
    var topicsDiv = $("<div class='col-md-3 text-center d-inline-block gifs'>");

    // Storing the rating data
    var rating = results[i].rating;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    topicsDiv.append(pOne);

    // Retrieving the URL for the image
    // var imgURL = results[i].images.fixed_height.url;
    var altImg = results[i].images.fixed_height_still.url

    // Creating an element to hold the image
    // var image = $("<img>").attr("src", altImg).attr("class", 'gif').attr("alt", 'Static Image').attr("data-alt", imgURL);
    var image = $("<img>").attr("src", altImg).attr("class", 'gif')


    // Appending the image
    topicsDiv.append(image);
        
    // function count() {
    //     topicConfirm = response.pagination.total_count;
    // } 
    

    // Putting the entire movie above the previous movies
    $("#gif-dump").prepend(topicsDiv);

    offset++;


    }
  });

}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#gif-buttons").empty();

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("topic-btn");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#gif-buttons").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-topic").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var topicInput = $("#topic-input").val().trim();

  if (topicInput === '') {
      alert('You need to type something Foo!')
  }

  else if (topics.indexOf(topicInput) ===-1) {
        // Adding movie from the textbox to our array
  topics.push(topicInput);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();

  } else {
     alert('item already on this list yo')

}
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".topic-btn", displayGif);
console.log(offset);

// Calling the renderButtons function to display the intial buttons
renderButtons();

$('#gif-dump').on('click', '.gif', function() {
    var src = $(this).attr("src");
  if($(this).hasClass('playing')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('playing');
  } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});
