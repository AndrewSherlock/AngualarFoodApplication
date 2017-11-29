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
const review_1 = require("../review/review");
let RestaurantService = class RestaurantService {
    constructor() {
        this.restaurantList = [];
        // this.getJsonText();
        this.restaurantList[0] = new Restaurant(0, "Macari", "Main street", "01-2222", "Dunboyne", 0, "Fast food");
        this.restaurantList[1] = new Restaurant(1, "La Bucca", "Main street", "01-2221", "Ashbourne", 0, "Italian");
        this.restaurantList[2] = new Restaurant(2, "Restaurant on dublin", "Main street", "01-2222", "Dunboyne", 1, "Fast food");
        this.restaurantList[3] = new Restaurant(3, "Restaurant in kildare", "Main street", "01-2222", "Dunboyne", 2, "Fast food");
        this.getJsonText();
    }
    getJsonText() {
        let text;
        var self = this;
        var request = new XMLHttpRequest();
        request.open('GET', '../../json/restaurants.json', true);
        request.responseType = 'blob';
        request.onload = function () {
            var reader = new FileReader();
            reader.readAsText(request.response);
            reader.onload = (e) => {
                text = reader.result;
                text = JSON.parse(text);
                for (let i = 0; i < text['rest_list']['restaurants'].length; i++) {
                    self.restaurantList[i] = new Restaurant(text['rest_list']['restaurants'][i].id, text['rest_list']['restaurants'][i].name, text['rest_list']['restaurants'][i].address, text['rest_list']['restaurants'][i].phone, text['rest_list']['restaurants'][i].town, text['rest_list']['restaurants'][i].countyid, text['rest_list']['restaurants'][i].cuisinetype);
                }
                console.log(self);
            };
        };
        request.send();
    }
    getRestaurantList() {
        return this.restaurantList;
    }
    getRestaurantByCounty(county) {
        let countyRestaurants = [];
        for (let i = 0; i < this.restaurantList.length; i++) {
            if (this.restaurantList[i].countyid == county) {
                countyRestaurants.push(this.restaurantList[i]);
            }
        }
        return this.getRestaurantList(); // needs to be changed back to work right
    }
    getRestaurantById(restId) {
        for (let i = 0; i < this.restaurantList.length; i++) {
            if (restId == this.restaurantList[i].id) {
                return this.restaurantList[i];
            }
        }
    }
    getRestaurantByRanking() {
        let max = 0;
        let temp = this.restaurantList;
        let rank = [];
        if (this.restaurantList.length > 10) {
            max = 10;
        }
        else {
            max = this.restaurantList.length;
        }
        for (let i = 0; i < max; i++) {
            let currentHighest = this.restaurantList[0];
            let element = 0;
            for (let p = 1; p < this.restaurantList.length; p++) {
                if (temp[p].getAverageReviewScore() > currentHighest.getAverageReviewScore()) {
                    element = p;
                    currentHighest = temp[p];
                }
            }
            rank[rank.length] = currentHighest;
            temp.splice(element, 1);
        }
        return rank;
    }
};
RestaurantService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], RestaurantService);
exports.RestaurantService = RestaurantService;
class Restaurant {
    constructor(id, name, address, phone, town, countyid, cuisineType) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.town = town;
        this.countyid = countyid;
        this.cuisineType = cuisineType;
        this.review = [new review_1.Review(3, "comment", "commenter"), new review_1.Review(3, "remark", "remarker")];
        this.openingTimes = [];
        this.score = this.getAverageReviewScore();
        this.menu = new Menu();
        /* this.getOpeningTimesFromFile(); */
        /* this.getReviewsFromFile(); */
        this.score = this.getAverageReviewScore();
    }
    getReviewsFromFile() {
        let text;
        var self = this;
        var request = new XMLHttpRequest();
        request.open('GET', '../../json/comments/comments' + this.id + '.json', true);
        request.responseType = 'blob';
        request.onload = function () {
            var reader = new FileReader();
            reader.readAsText(request.response);
            reader.onload = (e) => {
                text = reader.result;
                text = JSON.parse(text);
                for (let i = 0; i < text['commentList']['comment'].length; i++) {
                    self.review[i] = new review_1.Review(text['commentList']['comment'][i].rating, text['commentList']['comment'][i].comment, text['commentList']['comment'][i].commenter);
                }
            };
        };
        request.send();
    }
    getOpeningTimesFromFile() {
        let text;
        var self = this;
        var request = new XMLHttpRequest();
        request.open('GET', '../../json/openingTimes.json', true);
        request.responseType = 'blob';
        request.onload = function () {
            var reader = new FileReader();
            reader.readAsText(request.response);
            reader.onload = (e) => {
                text = reader.result;
                text = JSON.parse(text);
                for (let i = 0; i < text['openingTimes']['open'].length; i++) {
                    self.openingTimes[i] = text['openingTimes']['open'][i].value;
                }
            };
        };
        request.send();
    }
    getAverageReviewScore() {
        let total = 0;
        if (this.review.length == 0)
            return 0;
        for (let i = 0; i < this.review.length; i++) {
            total += this.review[i].numOfStars;
        }
        return total / this.review.length;
    }
    getReviews() {
        return this.review;
    }
    addReview(review) {
        this.review[this.review.length] = review;
    }
}
exports.Restaurant = Restaurant;
class Menu {
    constructor() {
        this.starters = [];
        this.dinners = [];
        this.deserts = [];
        this.drinks = [];
        this.menuAvg = 0;
        this.getMenuFromFile();
        this.getAveragePrice();
    }
    getMenuFromFile() {
        let text;
        var self = this;
        var request = new XMLHttpRequest();
        request.open('GET', '../../json/menu.json', true);
        request.responseType = 'blob';
        request.onload = function () {
            var reader = new FileReader();
            reader.readAsText(request.response);
            reader.onload = (e) => {
                text = reader.result;
                text = JSON.parse(text);
                for (let i = 0; i < text['menu']['starters'].length; i++) {
                    self.starters[i] = new Product(text['menu']['starters'][i].name, text['menu']['starters'][i].price);
                }
                for (let i = 0; i < text['menu']['main'].length; i++) {
                    self.dinners[i] = new Product(text['menu']['main'][i].name, text['menu']['main'][i].price);
                }
                for (let i = 0; i < text['menu']['deserts'].length; i++) {
                    self.deserts[i] = new Product(text['menu']['deserts'][i].name, text['menu']['deserts'][i].price);
                }
                for (let i = 0; i < text['menu']['drinks'].length; i++) {
                    self.drinks[i] = new Product(text['menu']['drinks'][i].name, text['menu']['drinks'][i].price);
                }
            };
        };
        request.send();
    }
    getAveragePrice() {
        let sum = 0;
        sum += this.avgArray(this.starters);
        sum += this.avgArray(this.dinners);
        sum += this.avgArray(this.deserts);
        sum += this.avgArray(this.drinks);
        this.menuAvg = sum / 4;
    }
    avgArray(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i].price;
        }
        return sum / array.length;
    }
}
exports.Menu = Menu;
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
exports.Product = Product;
//# sourceMappingURL=restaurant_service.js.map