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
let CountyService = class CountyService {
    constructor() {
        this.countyList = [];
    }
    getCountieList() {
        this.getJsonText();
        console.log(this);
        return this.countyList;
    }
    getJsonText() {
        let text;
        var self = this;
        var request = new XMLHttpRequest();
        request.open('GET', '../../json/counties.json', true);
        request.responseType = 'blob';
        request.onload = function () {
            var reader = new FileReader();
            reader.readAsText(request.response);
            reader.onload = (e) => {
                text = reader.result;
                text = JSON.parse(text);
                for (let i = 0; i < text['countyList']['counties'].length; i++) {
                    self.countyList[i] = new County(text['countyList']['counties'][i].name, text['countyList']['counties'][i].id, text['countyList']['counties'][i].img);
                }
            };
        };
        request.send();
    }
};
CountyService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], CountyService);
exports.CountyService = CountyService;
class County {
    constructor(countyName, countyId, imageLink) {
        this.countyName = countyName;
        this.countyId = countyId;
        this.imageLink = imageLink;
    }
}
exports.County = County;
//# sourceMappingURL=county_service.js.map