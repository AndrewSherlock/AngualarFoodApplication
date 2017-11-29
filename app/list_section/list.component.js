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
const county_service_1 = require("../countie_service/county_service");
let ListComponent = class ListComponent {
    constructor() {
        this.counties = [];
    }
    ngOnInit() {
        let county_service = new county_service_1.CountyService();
        this.counties = county_service.getCountieList();
    }
};
ListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'list_section',
        templateUrl: './list.component.html',
        styleUrls: ['../county_list/county_list.component.css']
    }),
    __metadata("design:paramtypes", [])
], ListComponent);
exports.default = ListComponent;
//# sourceMappingURL=list.component.js.map