import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(public afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  async loginGoogle() {
    try {
      await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
}
