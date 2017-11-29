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
// Implement ScoreComponent here.
const core_1 = require("@angular/core");
const restaurant_service_1 = require("../restaurant_service/restaurant_service");
let ScoreComponent = class ScoreComponent {
    ngOnInit() {
        this.star = this.restaurant.getAverageReviewScore();
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", restaurant_service_1.Restaurant)
], ScoreComponent.prototype, "restaurant", void 0);
ScoreComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'review',
        templateUrl: './score.component.html',
    })
], ScoreComponent);
exports.default = ScoreComponent;
//# sourceMappingURL=score.component.js.map