import {Component, EventEmitter, Input, Output} from '@angular/core';
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RouteService} from "../../../../../core/services/route.service";
import User = firebase.User;

@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.scss']
})
export class NewCityComponent {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //NEW FORM
  newForm: FormGroup;

  //VARIABLES
  today = new Date();

  constructor(private fb: FormBuilder, private routeSvc: RouteService) {
    this.newForm = this.fb.group({
      name: ['', [Validators.required]],
      coordinatesUrl: ['', [Validators.required]],
    });
  }

  getSave(user: User) {
    if (this.newForm.valid) {
      const city = this.newForm.value;
      const cityId = city?.id || null;
      city.name = city.name.toUpperCase();
      city.createdBy = user.uid;
      city.createdAt = this.today;
      this.routeSvc.saveCity(city, cityId).then();
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }
}
