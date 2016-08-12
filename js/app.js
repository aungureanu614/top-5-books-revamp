$(function() {

    $('.dropdown-content li').on('click', function() {

        $('.dropbtn').text($(this).text());
        var input = $(this).text();
        callAPI(input);
    });
});

function init() {
    gapi.client.setApiKey('AIzaSyAAeEliIWNKfAlOjtTFoEfGoTtqt_RAF0I');
    gapi.client.load("youtube", "v3", function() {
        //yt api is ready
    });
}

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
        var topFive = result.books.slice(0, 5);
        showBookImage(topFive);
        //console.log(result);
    });
}



function showBookImage(topFive) {
    clearPrevious();
    var bookAuthors = [];

    $.each(topFive, function(index, book) {


        $('#results, tr').append('<th class=table-heading><img id="' + book.rank + '"src=' + book.book_image + '>' + '<div class="text-box-style"><p class="rank hide">' + "Rank: " + book.rank + '</p>' + '<p class="author hide">' + "Author: " + book.author + '</p>' + '<p class="description hide">' + book.description + '</p>' + '<a class="amazon-url" target =_blank href=' +  book.amazon_product_url + '>Buy it</a>' + '</div></th>');

        bookAuthors.push(book.author);



        $('#' + book.rank).mouseenter(function() {
            $(this).parent().find('p').removeClass('hide');
            $(this).parent().find('a').addClass('hide');
            
        }).mouseleave(function() {
            $(this).parent().find('p').addClass('hide');
            $(this).parent().find('a').removeClass('hide');
    
        });


    });
    //showBookInfo(topFive);
    callYTApi(bookAuthors);
}

function callYTApi(bookAuthors) {

    $.each(bookAuthors, function(index, author) {
        //alert(author);

        var request = gapi.client.youtube.search.list({
            q: author,
            part: 'snippet',
            type: "video",
            safeSearch: "strict",
            maxResults: 1
        }).execute(function(response) {

            var results = response.result;

            console.log(results);
            showYTResults(results);

        });
    });
}

/*function showBookInfo(topFive) {

}*/
function showYTResults(results) {
    $.each(results.items, function(index, item) {
        $('#search-results').append('<img id="' + item.id.videoId + '"src=' + item.snippet.thumbnails.medium.url + '>');
        $('#' + item.id.videoId).click(function() {
            window.location.href = 'https://www.youtube.com/watch?v=' + item.id.videoId;
        });
    });
}

function clearPrevious() {
    $('#results').empty();
    $('#search-results').empty();

}
