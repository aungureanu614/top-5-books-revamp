$(function() {

    // $('.dropdown-content li').on('click', function() {
    //     // $('.app-description').remove(); //clear app description
    //     $('.dropbtn').text($(this).text());
    //     var input = $(this).text();
    //     callAPI(input); //get user input and send it to the API function
    // });

    $('.dropdown-item').on('click', function(){
        $('#dropdownMenuButton').text($(this).text());
        var input = $(this).text();
        console.log(input);
        callAPI(input);
    })

});

function callAPI(input) {

    var url = "https://api.nytimes.com/svc/books/v3/lists/" + input + ".json";
    url += '?' + $.param({
        'api-key': "40ea26fc62c9450683c5d6183ac81f89"
    });
    $.ajax({
        url: url,
        method: 'GET'
    }).done(function(response) {

        var result = response.results;
        var topFive = result.books.slice(0, 5); //get only the top 5 books from the returned response
        showBookInfo(topFive);
    });
}

function showBookInfo(topFive) {
    clearPrevious(); //clear previous list information


    $.each(topFive, function(index, book) {

        //add results of API call to the page
        $('.row').append('<div class=col-xs-2 col-half-offset><img id="' + book.rank + '"src=' + book.book_image + '>' + '<div class=text-box-style><p>' + "Rank: " + book.rank + '</p>' 
            + '<p>' + "Author: " + book.author + '</p>' + '<p>' + book.description + '</p></div></div>');

       $('#' + book.rank).wrap('<a target=_blank href="' + book.amazon_product_url + '" />');
   
    });
}

function clearPrevious() {
    $('.row').empty();
}
