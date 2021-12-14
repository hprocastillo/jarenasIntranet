import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  collapsed = true;

  constructor(public authSvc: AuthService, private router: Router) {
  }

  async logout() {
    try {
      this.collapsed = true;
      await this.authSvc.logout();
      await this.router.navigate(['auth']);
    } catch (error) {
      console.log(error);
    }
  }
}
