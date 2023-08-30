const cheerio = require("cheerio");
// Async import needed because require is depricated for node-fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const searchUrl = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';
const movieUrl = 'https://www.imdb.com/title/';

// Returns the imdbID of the movie, we need this because to access the movie via the URL imdb uses unique IDs
async function getIMDBId(movieName){

    const response = await fetch(`${searchUrl}${movieName.split(' ').join('%20')}`);
    const body = await response.text();
    const $ = cheerio.load(body);
    const element = $('.find-result-item').first();

    const $element = $(element);
    //  Need the title for the imdbID
    const $title = $element.find('.ipc-metadata-list-summary-item__t');

    const imdbID = $title.attr('href').match(/title\/(.*)\//)[1];
    return imdbID;
}

async function getPoster(imgUrl, imgID) {
    const response = await fetch(`${imgUrl}`);
    const body = await response.text();
    const $ = cheerio.load(body);

    return $(`[data-image-id="${imgID}-curr"]`).attr('src');
}

async function getMovie(imdbID) {
    const imdbLink = `${movieUrl}${imdbID}`;
    const response = await fetch(imdbLink);
    const body = await response.text();
    const $ = cheerio.load(body);

    const title = $('[data-testid="hero__pageTitle"]').text().trim();
    const rating = $('[data-testid="hero-rating-bar__aggregate-rating__score"] span').first().text();
    const year = $('.sc-acac9414-0 .ipc-inline-list__item').first().text();
    const runtime = $('.sc-acac9414-0 .ipc-inline-list__item').last().text();
    const posterID = $('.ipc-poster .ipc-lockup-overlay.ipc-focusable').attr('href').match(/mediaviewer\/(.*)\//)[1];
    const plot = $('[data-testid="plot"] span').first().text();

    const poster = await getPoster(`${movieUrl}${imdbID}/mediaviewer/${posterID}`, posterID)

    return {
        title: title,
        year: year,
        runTime: runtime,
        summary: plot,
        rating: rating,
        image: poster,
        link: imdbLink
    }
}

module.exports = {
    getIMDBId,
    getMovie
};