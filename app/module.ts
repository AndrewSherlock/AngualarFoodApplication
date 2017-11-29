import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { HttpModule }      from '@angular/http';

import ApplicationComponent from './application/application.component';
import HeaderComponent from './header/header.component';
import HomePageComponent from './home-page/home_page.component';
import CountyListComponent from './county_list/county_list.component';
import ContactComponent from './contact/contact.component';
import ListComponent from './list_section/list.component';

import RestaurantChoiceComponent from './restaurant_choice/restaurant_choice.component';
import RestaurantDetailComponent from './restaurant_detail/restaurantdetail.component';
import MenuDisplayComponent from './menu_component/menu_display.component';
import TopRatedComponent from './top_rated/top_rated.component'


import ScoreComponent from './score/score.component';
import ReviewPanelComponent from './review_panel/review_panel.component';

import FooterComponent from './footer/footer.component';



@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        RouterModule.forRoot([
            {path: '', component: HomePageComponent},
            {path: 'counties', component: CountyListComponent},
            {path: 'toprated', component: TopRatedComponent},
            {path: 'contact', component: ContactComponent},
            {path: 'county/:id', component: RestaurantChoiceComponent},
            {path:'restaurant/:restid', component: RestaurantDetailComponent}
        ])

             ],
    declarations: [ApplicationComponent, HeaderComponent, HomePageComponent, CountyListComponent, ContactComponent, ListComponent, RestaurantChoiceComponent, FooterComponent, ScoreComponent, RestaurantDetailComponent, ReviewPanelComponent, MenuDisplayComponent, TopRatedComponent],
    bootstrap: [ApplicationComponent]
})
export default class AppModule {}


