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
//   $('.btncontainer').empty()
  for (var i = 0; i < topics.length; i++) {
    var topicButtons = $("<button class='givenTopics btn btn-outline-dark'>").text(topics[i]).attr('data-topics', topics[i])
    $('.btncontainer').append(topicButtons)
  }
};

// This handles user input and creates a new button to add to other btns in container
// $('#searchSubmit').on('click', function (event) {
//   event.preventDefault()
//   var searchValue = $('#searchSubmit').val().trim()
//   var newButtons = $("<button class='givenTopics btn btn-outline-secondary'>").attr('data-topics', searchValue).text(searchValue);
//   console.log(searchValue);
//   console.log('does this work');
//   $('.btncontainer').append(newButtons);

  


// })

//   These are the event handler functions
$(document).ready(function () {
  createBtns()
  $(document).on('click', '.givenTopics', function (userButton) {
    $('.gifResults').empty();
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
        $('.gifResults').append(gifInfo)
        //   $(".givenTopics").append(topicButtons);
      }
    })
  })
  // This handles user input and creates a new button to add to other btns in container
  $('#searchSubmit').on('click', function (event) {
    event.preventDefault()
    var userInput = $('#searchSubmit').val().trim();
    topics.push(userInput);
    var newButtons = $("<button class='givenTopics btn btn-outline-dark'>").attr('data-topics', userInput).text(userInput)
    $('.btncontainer').append(newButtons);
    console.log(userInput);
    console.log('does this work')
  })

  $('.instructions').on('click', function () {
$('.panel').slideToggle('slow');
  })
})
