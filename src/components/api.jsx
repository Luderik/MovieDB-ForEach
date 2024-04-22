export const fetchMovies = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=2064b486f6100c93a5d3208db08639f6&language=fr-FR');
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des films');
    }
    const data = await response.json();
    return data.results;
};

export const fetchMoviesByGenre = async (genreId) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2064b486f6100c93a5d3208db08639f6&with_genres=${genreId}&language=fr-FR`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des films par genre');
    }
    const data = await response.json();
    return data.results;
};
