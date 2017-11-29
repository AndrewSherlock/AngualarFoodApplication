"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Film {
    constructor(id, title, blurb, price, score, genres) {
        this.id = id;
        this.title = title;
        this.blurb = blurb;
        this.price = price;
        this.score = score;
        this.genres = genres;
    }
}
exports.Film = Film;
class FilmService {
    getFilms() {
        var films = [
            new Film(0, 'Spectre', 'Bond is back in a frantic battle against his classic foe and his white cat', 8.99, 4.9, ['action', 'spy']),
            new Film(1, 'The Hateful Eight', 'Classic Quentin Tarantino sensory indulgence in the wild west', 7.59, 3.8, ['western', 'action']),
            new Film(2, 'Paddington', 'Furry fun and frosty fridge adventures for all the family', 5.50, 4.2, ['children', 'humour']),
            new Film(3, 'Jaws', 'Blood-curdling shark fest that spooked a generation', 3.55, 4.1, ['drama', 'shark']),
            new Film(4, 'Star Wars', 'A long time ago in a galaxy far far away, etc etc etc ...', 8.99, 4.9, ['action', 'spy']),
            new Film(5, 'The Hunger Games', 'Post apocalyptic action adventure, reality TV with a macabre twist', 9.99, 4.5, ['action', 'teen']),
            new Film(6, 'The Martian', 'One man\'s determination to survive on the red planet', 7.99, 3.9, ['drama', 'space']),
            new Film(7, 'Minions', 'Three unlikely minion heroes out to save Minionkind', 6.25, 3.1, ['children', 'animation']),
            new Film(8, 'Love Actually', 'Heart-warming yarn of love found and lost at Christmastime', 5.99, 5.0, ['romcom', 'chickflick']),
        ];
        return films;
    }
}
exports.FilmService = FilmService;
//# sourceMappingURL=film-service.js.map