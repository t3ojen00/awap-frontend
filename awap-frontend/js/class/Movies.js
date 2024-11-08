import { Movie } from "./movie";

class Movies {
    #movies = [];  
    #backend_url = '';

    constructor(url) {
        this.#backend_url = url;
    }

    // Fetch movies data from backend
    getMovies = async () => {
        try {
            const response = await fetch(this.#backend_url);
            const json = await response.json();
            this.#readJson(json);
            return this.#movies;
        } catch (error) {
            throw error;
        }
    };

    // Private method to read and parse JSON into Movie objects
    #readJson = (json) => {
        json.forEach(node => {
            const movie = new Movie(
                node.id,
                node.title,
                node.genres, 
                node.length,
                node.theatre,
                node.auditorium,
                node.presentationMethod,
                node.spokenLanguage,
                node.subtitleLanguage,
                node.ratingImageUrl,
                node.showStartTime
            );
            this.#movies.push(movie);
        });
    };
}

export { Movies };
