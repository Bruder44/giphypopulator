var reactions = ["happy", "silly", "bored", "enthusiastic", "depressed", "peaceful"];

// Creates buttons when the page loads so the user has some choices to pick from.
createReactionButtons();


// When the reaction button is clicked this creates a new variable, 
//which is saved as the value that the user entered with the excess spaces 
//trimmed off. This value is then pushed to the end of the reactions array and 
//the createReactionsButton.
$('#addReaction').on('click', function() {
    var reactionEntered = $('#reactionInput').val().trim();
    reactions.push(reactionEntered);
    $('#reactionInput').val('');
    createReactionButtons();

    return false;
});

//On click event to start, 
$(document.body).on('click', '.button-list', function() {
    // Creates a variable and assigns the value to the reaction clicked
    var reactionClicked = $(this).data('reaction');
    // Creates a variable to hold the query string for the Giphy API request and adds the reactions name to the query string.
    var query = 'https://api.giphy.com/v1/gifs/search?q=' + reactionClicked + '&limit=10&api_key=HshQJL3vVtLAN2CKpwsQsDCmQNMVJZnS';

    // Empties the reactions element so new gifs are loaded in on each click of a reactions button.
    $('#reactions').empty();


    //AJAX request using the query string outlined above.
    $.ajax({
        url: query,
        method: 'GET'
            //function for when the request is recieved back from the API.
    }).done(function(response) {
        // Creates a new variable and assigns its value to the response data.
        var results = response.data;

        // Loop for the Results
        for (i = 0; i < results.length; i++) {
            // Assigning new variable 
            var newGif = $('<div class="col-sm-4">');
            // Creates a new variable and assigns a rating from the response 
            var rating = results[i].rating.toUpperCase();
            // Displays Rating in Uppercase letter.
            var p = $('<p>').html('Rating: ' + rating);
            // Centers the text of the display
            p.addClass('text-center');
            // Creates a new variable and assigns an image
            var img = $('<img>');

            // Adds a src to the img variable of the gifs still image.
            img.attr('src', results[i].images.fixed_height_small_still.url);
            // Adds a data attribute to the img variable of the gifs still image.
            img.attr('data-still', results[i].images.fixed_height_small_still.url);
            // Adds a data attribute to the img variable of the gif.
            img.attr('data-animate', results[i].images.fixed_height_small.url);
            // Adds a data attribute to the img variable of the gifs state.
            img.attr('data-clicked', 'still');
            // Adds a classes to the img variable.
            img.addClass('gif-margin gif center-block panel');

            // Appends the p and img variables to the newGif variable.
            newGif.append(p);
            newGif.append(img);
            // Appends the newGif variable to the element with the reactions ID.
            $('#reactions').append(newGif);
        }
    });
});

// Making Gifs animate when clicked//still when loaded//
$(document.body).on('click', '.gif', function() {
    var click = $(this).attr('data-clicked');

    if (click === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-clicked', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-clicked', 'still');
    }
});


//CREATING BUTTON
// FUNCTIONS ---------------------------
function createReactionButtons() {
    $('#reactionButtons').empty();

    for (var i = 0; i < reactions.length; i++) {
        var button = $('<button>').addClass('btn btn-primary button-list');
        button.attr('data-reaction', reactions[i]).html(reactions[i]);
        $('#reactionButtons').append(button);
    }
}