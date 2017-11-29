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
const router_1 = require("@angular/router");
const restaurant_service_1 = require("../restaurant_service/restaurant_service");
let RestaurantChoiceComponent = class RestaurantChoiceComponent {
    constructor(route) {
        this.route = route;
        this.restaurants = [];
        this.towns = [];
    }
    ngOnInit() {
        this.subscriberParams = this.route.params.subscribe(params => {
            this.choiceId = +params['id'];
            this.countyChoice = this.getCountyChoice(this.choiceId);
        });
        let restaurant_service = new restaurant_service_1.RestaurantService();
        this.restaurants = restaurant_service.getRestaurantByCounty(this.choiceId);
        console.log(restaurant_service.getRestaurantList());
        this.towns = this.getListOfTowns();
    }
    filterByTown(town) {
        this.clear();
        if (town.toLowerCase() == "any") {
            this.clear();
            return;
        }
        let currentRestaurants = this.restaurants;
        let temp = [];
        for (let i = 0; i < currentRestaurants.length; i++) {
            if (currentRestaurants[i].town.toLowerCase() == town.toLowerCase()) {
                temp[temp.length] = currentRestaurants[i];
            }
            this.restaurants = temp;
        }
    }
    getListOfTowns() {
        let temp = [];
        for (let i = 0; i < this.restaurants.length; i++) {
            for (let p = 0; p < temp.length; p++) {
                if (temp[p] == this.restaurants[i].town) {
                    break;
                }
            }
            temp[temp.length] = this.restaurants[i].town;
        }
        return temp;
    }
    filter(townChoice, foodType, rating) {
        if (townChoice == undefined && foodType == undefined && rating == undefined) {
            alert("Nothing entered for search");
            return;
        }
        this.clear();
        let currentRestaurants = this.restaurants;
        if (townChoice != undefined) {
            let temp = [];
            for (let i = 0; i < currentRestaurants.length; i++) {
                if (currentRestaurants[i].town.toLowerCase() == townChoice.toLowerCase()) {
                    temp[temp.length] = currentRestaurants[i];
                }
            }
            currentRestaurants = temp;
        }
        if (foodType != undefined) {
            let temp = [];
            for (let i = 0; i < currentRestaurants.length; i++) {
                console.log(currentRestaurants[i].cuisineType, foodType);
                if (currentRestaurants[i].cuisineType.toLowerCase() == foodType.toLowerCase()) {
                    temp[temp.length] = currentRestaurants[i];
                }
            }
            currentRestaurants = temp;
        }
        if (rating != undefined && !isNaN(rating)) {
            let temp = [];
            for (let i = 0; i < currentRestaurants.length; i++) {
                if (currentRestaurants[i].getAverageReviewScore() >= rating) {
                    temp[temp.length] = currentRestaurants[i];
                }
            }
            currentRestaurants = temp;
        }
        if (currentRestaurants.length > 0) {
            this.restaurants = currentRestaurants;
        }
        else {
            alert("No restaurants found!");
            this.clear();
        }
    }
    clear() {
        let restaurant_service = new restaurant_service_1.RestaurantService();
        this.restaurants = restaurant_service.getRestaurantByCounty(this.choiceId);
    }
    getCountyChoice(id) {
        let countys = ["Meath", "Dublin", "Kildare"];
        return countys[id];
    }
    ngOnDestroy() {
        if (this.subscriberParams != null)
            this.subscriberParams.unsubscribe();
        if (this.subscriberData != null)
            this.subscriberData.unsubscribe();
    }
};
RestaurantChoiceComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'home_page',
        templateUrl: './restaurant_choice.component.html',
        styleUrls: ['./restaurant_choice.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute])
], RestaurantChoiceComponent);
exports.default = RestaurantChoiceComponent;
//# sourceMappingURL=restaurant_choice.component.js.map