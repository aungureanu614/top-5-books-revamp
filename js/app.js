$(function() {

    $('.dropdown-content li').on('click', function() {
        $('.about-myapp').remove();
        //$('.title').removeClass('hide');
        $('.dropbtn').text($(this).text());
        var input = $(this).text();
        callAPI(input);
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
        var topFive = result.books.slice(0, 5);
        showBookInfo(topFive);
        //console.log(result);
    });
}



function showBookInfo(topFive) {
    clearPrevious();


    $.each(topFive, function(index, book) {


        $('#results, tr').append('<th class=table-heading><img id="' + book.rank + '"src=' + book.book_image + '>' + '<div class="text-box-style"><p class="bold hide">' + "Rank: " + book.rank + '</p>' + '<p class="author bold hide">' + "Author: " + book.author + '</p>' + '<p class="description bold hide">' + book.description + '</p>' + '<a class="amazon-link" target =_blank href=' + book.amazon_product_url + '>Buy it</a>' + '</div></th>');
        $('#' + book.rank).mouseenter(function() {
            $(this).parent().find('p').removeClass('hide');
            $(this).parent().find('a').addClass('hide');

        }).mouseleave(function() {
            $(this).parent().find('p').addClass('hide');
            $(this).parent().find('a').removeClass('hide');
        });
    });


}

function clearPrevious() {
    $('#results').empty();
    $('#search-results').empty();

}
