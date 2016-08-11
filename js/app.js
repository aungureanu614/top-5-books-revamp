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
        method: 'GET',

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


        $('#results').append('<th><img id="' + book.rank + '"src=' + book.book_image + '></th><br>' + '<td><p class="author">' + book.author + '</p></td><br>' + '<td><p class="description">' + book.description + '</p></td><br>' + '<td><a class="amazon-url" target =_blank href=' + book.amazon_product_url + '>Buy it!</a></td>');
        bookAuthors.push(book.author);



        /*$('#' + book.rank).mouseenter(function() {
            $(this).stop().animate({
                opacity: 0.2
            }, 200);
        }).mouseleave(function() {
            $(this).stop().animate({
                opacity: 1
            }, 200);
        });*/


    });
    //showBookInfo(topFive);
    callYTApi(bookAuthors);
}

function callYTApi(bookAuthors) {

    $.each(bookAuthors, function(index, author) {
        alert(author);

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
        $('#search-results').append('<img id="' + item.id.videoId + '"src=' + item.snippet.thumbnails.medium.url + '><br>');
        $('#' + item.id.videoId).click(function() {
            window.location.href = 'https://www.youtube.com/watch?v=' + item.id.videoId;
        });
    });
}

function clearPrevious() {
    $('#results').empty();
    $('#search-results').empty();

}
