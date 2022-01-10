import {Component, Input} from '@angular/core';
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-reports-by-vehicle',
  templateUrl: './reports-by-vehicle.component.html',
  styleUrls: ['./reports-by-vehicle.component.scss']
})
export class ReportsByVehicleComponent {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;

  //INITIAL TAB
  active = 1;
}
