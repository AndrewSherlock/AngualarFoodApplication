"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const film_service_1 = require("../film-service/film-service");
let FilmItemComponent = 
// Implement FilmItemComponent here.
class FilmItemComponent {
    ngOnInit() {
        this.imageUrl = "images/" + this.film.id + ".jpg";
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", film_service_1.Film)
], FilmItemComponent.prototype, "film", void 0);
FilmItemComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'film_section',
        templateUrl: './film-item.component.html',
        styleUrls: ['./film-item.component.css']
    })
    // Implement FilmItemComponent here.
], FilmItemComponent);
exports.default = FilmItemComponent;
//# sourceMappingURL=film-item.component.js.map