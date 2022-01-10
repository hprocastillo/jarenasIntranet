import {Component, EventEmitter, Input, Output} from '@angular/core';
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VehicleService} from "../../../../../core/services/vehicle.service";
import User = firebase.User;

@Component({
  selector: 'app-new-brand',
  templateUrl: './new-brand.component.html',
  styleUrls: ['./new-brand.component.scss']
})
export class NewBrandComponent {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //NEW FORM
  newForm: FormGroup;

  //VARIABLES
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private vehicleSvc: VehicleService) {
    this.newForm = this.fb.group({
      brand: ['', [Validators.required]],
    });
  }

  getSave(user: User) {
    if (this.newForm.valid) {
      const brand = this.newForm.value;
      const brandId = brand?.id || null;
      brand.brand = brand.brand.toUpperCase();
      brand.createdBy = user.uid;
      brand.createdAt = this.today;
      this.vehicleSvc.saveBrand(brand, brandId).then();
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }
}
