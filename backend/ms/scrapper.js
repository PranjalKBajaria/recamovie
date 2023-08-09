const cheerio = require("cheerio");
// Async import needed because require is depricated for node-fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const searchUrl = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';
const movieUrl = 'https://www.imdb.com/title/';

async function searchMovies(movieName){
    const response = await fetch(`${searchUrl}${movieName}`);
    const body = await response.text();
    const $ = cheerio.load(body);
    $('.find-result-item').each(function(i, element) {
        const $element = $(element);
        const $image = $element.find('.ipc-image');
        const $title = $element.find('.ipc-metadata-list-summary-item__t');

        const imdbID = $title.attr('href').match(/title\/(.*)\//)[1];

        const movie = {
          image: $image.attr('src'),
          title: $title.text(),
          imdbID,
        };
        console.log(movie);
    });
}

module.exports = {
    searchMovies
};