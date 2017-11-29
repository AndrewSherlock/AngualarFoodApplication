"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const restaurant_service_1 = require("../restaurant_service/restaurant_service");
let TopRatedComponent = class TopRatedComponent {
    ngOnInit() {
        let rest_service = new restaurant_service_1.RestaurantService();
        this.top_ranked = rest_service.getRestaurantByRanking();
    }
};
TopRatedComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'top_rated',
        templateUrl: './top_rated.component.html',
        styleUrls: ['./top_rated.component.css']
    })
], TopRatedComponent);
exports.default = TopRatedComponent;
//# sourceMappingURL=top_rated.component.js.map