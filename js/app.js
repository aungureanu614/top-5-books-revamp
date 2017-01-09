$(function() {

    $('.dropdown-content li').on('click', function() {
        // $('.app-description').remove(); //clear app description
        $('.dropbtn').text($(this).text());
        var input = $(this).text();
        callAPI(input); //get user input and send it to the API function
    });
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
        $('#results, tr').append('<th class=table-heading><img id="' + book.rank + '"src=' + book.book_image + '>' + 
            '<div class="text-box-style"><p class="hide-txt">' + "Rank: " + book.rank + '</p>' + 
            '<p class="author hide-txt">' + "Author: " + book.author + '</p>' + '<p class="description hide-txt">' + 
            book.description + '</p>' + '</div></th>');
        $('#' + book.rank).wrap('<a target=_blank href="' + book.amazon_product_url + '" />');
        //hide and unhide book info on image hover
        // $('#' + book.rank).mouseenter(function() {
        //     $(this).parent().find('p').removeClass('hide-txt');
        //     $(this).parent().find('a').addClass('hide-txt');

        // }).mouseleave(function() {
        //     $(this).parent().find('p').addClass('hide-txt');
        //     $(this).parent().find('a').removeClass('hide-txt');
        // });
    });
}

function clearPrevious() {
    $('#results').empty();
}
