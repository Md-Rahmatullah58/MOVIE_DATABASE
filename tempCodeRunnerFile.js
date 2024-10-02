ails, or 0 to search again: ', async (number) => {
                if (number === '0') {
                    mainMenu();
                } else {
                    const selectedMovie = movies[number - 1];
                    await getMovieDetails(selectedMovie.imdbID);
                }
            });
        } else {
            console.log('No movies found.');