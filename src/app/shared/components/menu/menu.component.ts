import {Component, Input} from '@angular/core';
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  //Inputs and Outputs
  @Input() user = {} as User;
}
