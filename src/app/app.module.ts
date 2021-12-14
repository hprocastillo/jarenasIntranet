import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {MenuComponent} from './shared/components/menu/menu.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {ConfigComponent} from './shared/components/config/config.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    HeaderComponent,
    ConfigComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
