console.log('I been logged');

// Initial array of topics
var topics = ['WOLVERINE', 'HULK', 'IRON MAN', 'SPIDER-MAN', 'THOR', 'GROOT', 'LOKI', 'QUICKSILVER', 'BLACK PANTHER', 'STAR-LORD', 'MAGNETO', 'ANT-MAN']
var offset = 0;
// var clicked = [];
// var topicConfirm = 0 ;
// console.log('topic confirm = ' + topicConfirm);

// displayGif function re-renders the HTML to display the appropriate content
function displayGif() {

  var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jNTy87RK0F32LVQNU906RhHbGtNvto2S&q=" + topic + "&limit=12&offset=" + offset + "&rating=R&lang=en"
  // empty our gif-dump div before rendering new buttons
  $("#gif-dump").empty();

  // Creating an AJAX call for the specific hero button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    // Stor an array of results in a variable
    var results = response.data

    // looping over every result item
    for (var i = 0; i < results.length; i++) {
    
    // Creating a div to hold the hero
    var topicsDiv = $("<div class='col-md-3 text-center d-inline-block gifs'>");

    // Storing the rating data
    var rating = results[i].rating;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    topicsDiv.append(pOne);

    // Storing the title
    var titleTag = results[i].title;

    // Creating an element to have the title displayed
    var pTwo = $("<p>").text("Title: " + titleTag);

    // Displaying the title
    topicsDiv.append(pTwo);

    // Retrieving the URL for the image
    // var imgURL = results[i].images.fixed_height.url;
    var altImg = results[i].images.fixed_height_small_still.url

    // Creating an element to hold the image
    // var image = $("<img>").attr("src", altImg).attr("class", 'gif').attr("alt", 'Static Image').attr("data-alt", imgURL);
    var image = $("<img>").attr("src", altImg).attr("class", 'gif')

    // Appending the image
    topicsDiv.append(image);
        
    // function count() {
    //     topicConfirm = response.pagination.total_count;
    // } 
    // console.log(count());

    // dumping the hero gifs inside of the gif-dump div
    $("#gif-dump").prepend(topicsDiv);
    // increases our offset by each initial click to randomize the search
    offset++;
    
    $('#add-gifs').show();
    }
  });

}

// Function for displaying our hero buttons
function renderButtons() {

  // Deleting the heros prior to adding new heros
  $("#gif-buttons").empty();

  // Looping through the array of heros
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each hero in the array
    var a = $("<button>");
    // Adding a class of topic-btn to our button
    a.addClass("topic-btn");
    // Adding a data-attribute
    // a.attr("data-name", topics[i]).attr("onclick", "duplicate()");
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the gif-buttons div
    $("#gif-buttons").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-topic").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var topicInput = $("#topic-input").val().trim().toUpperCase();
  // checking to see user inputted any data
  if (topicInput === '') {
      alert('You need to type something Foo!')
  }
  // checking to see if topic is already in our array
  else if (topics.indexOf(topicInput) ===-1) {
  // Adding new topic from the textbox to our array
  topics.push(topicInput);
  // Calling renderButtons which handles the processing of our topic array
  renderButtons();
  // clearing textbox after submitting
  $('#topic-input').val('');
  // catch all
  } else {
    // will alert item is already on the list
     alert('item already on this list yo')
     // clearing textbox after submitting
      $('#topic-input').val('');
}
});

// Adding a click event listener to all elements with a class of "topic-btn"
$(document).on("click", ".topic-btn", displayGif);
console.log(offset);


// Calling the renderButtons function to display the intial buttons
renderButtons();
// since our gifs load in still _s.gif this on click function will swap the photos to nonstill images and will display the animated gif
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

// var i = 0;
// var original = document.getElementById('add-gifs');

// function duplicate() {
//     var clone = original.cloneNode(true); // "deep" clone
//     clone.id = "topic-btn";
//     // or clone.id = ""; if the divs don't need an ID
//     original.parentNode.appendChild(clone);
// }