import {Component, Input} from '@angular/core';
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  //INPUTS
  @Input() user = {} as User;

  //VARIABLES
  defaultLogo: string = '../../../../../assets/images/dashboard/user.png';
  defaultTypeBusiness: string = 'Type Business';
}
