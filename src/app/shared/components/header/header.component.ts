import {Component, Input} from '@angular/core';
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;

  //VARIABLES
  defaultLogo: string = '../../../../../assets/images/dashboard/user.png';
}
