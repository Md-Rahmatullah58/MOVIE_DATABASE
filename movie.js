const prompt = require("prompt-sync")({sigint: true}); 

const axios = require('axios');
const readline = require('readline');


const API_KEY = 'e65f9a3b';
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const searchMovie = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}&s=${encodeURIComponent(query)}`);
        const movies = response.data.Search;

        if (movies) {
            console.log('Movies found:');
            movies.forEach((movie, index) => {
                console.log(`${index + 1}. ${movie.Title} (${movie.Year})`);
            });
            rl.question('Enter the number of the movie to see details, or 0 to search again: ', async (number) => {
                if (number === '0') {
                    mainMenu();
                } else {
                    const selectedMovie = movies[number - 1];
                    await getMovieDetails(selectedMovie.imdbID);
                }
            });
        } else {
            console.log('No movies found.');
            mainMenu();
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        mainMenu();
    }
};

const getMovieDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}&i=${id}`);
        const movie = response.data;

        if (movie) {
            console.log(`
            Title: ${movie.Title}
            Year: ${movie.Year}
            Rated: ${movie.Rated}
            Released: ${movie.Released}
            Runtime: ${movie.Runtime}
            Genre: ${movie.Genre}
            Director: ${movie.Director}
            Writer: ${movie.Writer}
            Actors: ${movie.Actors}
            Plot: ${movie.Plot}
            Language: ${movie.Language}
            Country: ${movie.Country}
            Awards: ${movie.Awards}
            `);
        } else {
            console.log('Movie not found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    } finally {
        mainMenu();
    }
};

const mainMenu = () => {
    console.log(`
    Movie Database CLI:
    1. Search for a movie
    2. Exit
    `);
    rl.question('Select an option: ', (option) => {
        if (option === '1') {
            rl.question('Enter movie name: ', (query) => {
                searchMovie(query);
            });
        } else if (option === '2') {
            console.log('Exiting...');
            rl.close();
        } else {
            console.log('Invalid option, please try again.');
            mainMenu();
        }
    });
};

mainMenu();
