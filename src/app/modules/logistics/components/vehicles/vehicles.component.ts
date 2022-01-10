import {Component} from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
  //INITIAL TAB
  active = 1;

  //PAGES
  pageListVehicles: boolean = true;
  pageListBrands: boolean = true;
  pageNewVehicle: boolean = false;
  pageNewBrand: boolean = false;
  pageEditVehicle: boolean = false;
  pageEditBrand: boolean = false;

  //VARIABLES
  editVehicle: string | any;
  editBrand: string | any;

  constructor(public authSvc: AuthService) {
  }

  //PAGES VEHICLES
  showListVehicles() {
    this.pageListVehicles = true;
    this.pageNewVehicle = false;
    this.pageEditVehicle = false;
  }

  showNewVehicle() {
    this.pageListVehicles = false;
    this.pageNewVehicle = true;
    this.pageEditVehicle = false;
  }

  showEditVehicle() {
    this.pageListVehicles = false;
    this.pageNewVehicle = false;
    this.pageEditVehicle = true;
  }

  getEditVehicle(event: any) {
    this.editVehicle = event;
    this.showEditVehicle();
  }

  //PAGES BRANDS
  showListBrands() {
    this.pageListBrands = true;
    this.pageNewBrand = false;
    this.pageEditBrand = false;
  }

  showNewBrand() {
    this.pageListBrands = false;
    this.pageNewBrand = true;
    this.pageEditBrand = false;
  }

  showEditBrand() {
    this.pageListBrands = false;
    this.pageNewBrand = false;
    this.pageEditBrand = true;
  }

  getEditBrand(event: any) {
    this.editBrand = event;
    this.showEditBrand();
  }
}
