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
let RestaurantDetailComponent = class RestaurantDetailComponent {
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        this.subscriberParams = this.route.params.subscribe(params => {
            this.restaurantId = +params['restid'];
        });
        let rest_service = new restaurant_service_1.RestaurantService();
        this.restaurant = rest_service.getRestaurantById(this.restaurantId);
        console.log(this.restaurant);
    }
    ngOnDestroy() {
        if (this.subscriberParams != null)
            this.subscriberParams.unsubscribe();
        if (this.subscriberData != null)
            this.subscriberData.unsubscribe();
    }
};
RestaurantDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'home_page',
        templateUrl: './restaurantdetail.component.html',
        styleUrls: ['./restaurantdetail.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute])
], RestaurantDetailComponent);
exports.default = RestaurantDetailComponent;
//# sourceMappingURL=restaurantdetail.component.js.map