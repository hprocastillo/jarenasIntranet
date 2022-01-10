import {Component} from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent {
  //INITIAL TAB
  active = 1;

  //PAGES
  pageListRoutes: boolean = true;
  pageListTrips: boolean = true;
  pageListCities: boolean = true;

  pageNewRoute: boolean = false;
  pageNewTrip: boolean = false;
  pageNewCity: boolean = false;

  pageEditRoute: boolean = false;
  pageEditTrip: boolean = false;
  pageEditCity: boolean = false;

  //VARIABLES
  editRoute: string | any;
  editTrip: string | any;
  editCity: string | any;

  constructor(public authSvc: AuthService) {
  }

  //PAGE ROUTES
  showListRoutes() {
    this.pageListRoutes = true;
    this.pageNewRoute = false;
    this.pageEditRoute = false;
  }

  showNewRoute() {
    this.pageListRoutes = false;
    this.pageNewRoute = true;
    this.pageEditRoute = false;
  }

  showEditRoute() {
    this.pageListRoutes = false;
    this.pageNewRoute = false;
    this.pageEditRoute = true;
  }

  getEditRoute(event: any) {
    this.editRoute = event;
    this.showEditRoute();
  }

  //PAGE TRIPS
  showListTrips() {
    this.pageListTrips = true;
    this.pageNewTrip = false;
    this.pageEditTrip = false;
  }

  //PAGE CITIES
  showListCities() {
    this.pageListCities = true;
    this.pageNewCity = false;
    this.pageEditCity = false;
  }

  showNewCity() {
    this.pageListCities = false;
    this.pageNewCity = true;
    this.pageEditCity = false;
  }

  showEditCity() {
    this.pageListCities = false;
    this.pageNewCity = false;
    this.pageEditCity = true;
  }

  getEditCity(event: any) {
    this.editCity = event;
    this.showEditCity();
  }
}
