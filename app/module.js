"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const application_component_1 = require("./application/application.component");
const header_component_1 = require("./header/header.component");
const home_page_component_1 = require("./home-page/home_page.component");
const county_list_component_1 = require("./county_list/county_list.component");
const contact_component_1 = require("./contact/contact.component");
const list_component_1 = require("./list_section/list.component");
const restaurant_choice_component_1 = require("./restaurant_choice/restaurant_choice.component");
const restaurantdetail_component_1 = require("./restaurant_detail/restaurantdetail.component");
const menu_display_component_1 = require("./menu_component/menu_display.component");
const top_rated_component_1 = require("./top_rated/top_rated.component");
const score_component_1 = require("./score/score.component");
const review_panel_component_1 = require("./review_panel/review_panel.component");
const map_component_1 = require("./map_component/map.component");
const footer_component_1 = require("./footer/footer.component");
const core_2 = require("@agm/core");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            router_1.RouterModule,
            forms_1.FormsModule,
            router_1.RouterModule.forRoot([
                { path: '', component: home_page_component_1.default },
                { path: 'counties', component: county_list_component_1.default },
                { path: 'toprated', component: top_rated_component_1.default },
                { path: 'contact', component: contact_component_1.default },
                { path: 'county/:id', component: restaurant_choice_component_1.default },
                { path: 'restaurant/:restid', component: restaurantdetail_component_1.default }
            ]),
            core_2.AgmCoreModule.forRoot({
                apiKey: 'AIzaSyA-rMwC85jsgThQ0K3xx64bIZLA2K8bHYQ'
            })
        ],
        declarations: [application_component_1.default, header_component_1.default, home_page_component_1.default, county_list_component_1.default, contact_component_1.default, list_component_1.default, restaurant_choice_component_1.default, footer_component_1.default, score_component_1.default, restaurantdetail_component_1.default, review_panel_component_1.default, menu_display_component_1.default, top_rated_component_1.default, map_component_1.default],
        bootstrap: [application_component_1.default]
    })
], AppModule);
exports.default = AppModule;
//# sourceMappingURL=module.js.map