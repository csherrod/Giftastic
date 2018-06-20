// All these will be buttons pre-loaded on the page
var topics = [
  'Aresenal',
  'Aston Villa',
  'Bournemouth',
  'Burnley',
  'Chelsea',
  'Crystal Palace',
  'Everton',
  'Fulham',
  'Hull City',
  'Leicester City',
  'Liverpool',
  'Manchester City',
  'Manchester United',
  'New Castle United',
  'Stoke City',
  'Tottenham Hotspur'
]

// Creates new btns based on topics array
function createBtns () {
  $('.btncontainer').empty()
  for (var i = 0; i < topics.length; i++) {
    var topicButtons = $("<button class='givenTopics btn btn-outline-secondary'>").text(topics[i]).attr('data-topics', topics[i])
    $('.btncontainer').append(topicButtons);
  }
};

// This handles user input and creates a new button to add to other btns in container
$('#searchSubmit').on('click', function (event) {
  event.preventDefault()
  var searchValue = $('#searchSubmit').val().trim();
  var newButtons = $("<button class='givenTopics btn btn-outline-secondary'>").attr('data-topics', searchValue).text(searchValue)
  $('.btncontainer').append(newButtons)
  createBtns()
});

//   These are the event handler functions
$(document).ready(function () {
  $('.givenTopics').on('click', 'data-topics', function () {
    console.log('hey')
    console.log(this)
    var searchValue = $(this).attr('data-topics')
    console.log(searchValue)
    var queryURL =
      'https://api.giphy.com/v1/gifs/search?api_key=2gmU5dW54vDq1BJNHss3h7Mc4lgz12P2&q=' +
      searchValue +
      '&limit=10&offset=0&rating=PG-13&lang=en'
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (response) {
      var results = response.data
      for (var i = 0; i < results.length; i++) {
        var image = $("<img class='gifs'>")
        image.attr('src', results[i].images.fixed_height_still.url)
        image.attr('data-gif', results[i].images.fixed_height.url)
        image.attr('data-still', results[i].images.fixed_height_still.url)
        var rating = $('<p>' + results[i].rating + '</p>')
        var gifInfo = $("<div class='gifDiv'>")
        gifInfo.append(image)
        gifInfo.append(rating)
        $('#gifResults').append(gifInfo)
        //   $(".givenTopics").append(topicButtons);
      }
    })
  })
});
