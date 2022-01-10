import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {City} from "../../../../../core/interfaces/route";
import {RouteService} from "../../../../../core/services/route.service";
import User = firebase.User;

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.scss']
})
export class NewRouteComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //NEW FORM
  newForm: FormGroup;

  //RESULTS
  listCities: City[] = [];

  //VARIABLES
  today = new Date();

  constructor(private fb: FormBuilder, private routeSvc: RouteService) {
    this.newForm = this.fb.group({
      description: ['', [Validators.required]],
      originCity: ['', [Validators.required]],
      originAddress: ['', [Validators.required]],
      originLocation: ['', [Validators.required]],
      destinationCity: ['', [Validators.required]],
      destinationAddress: ['', [Validators.required]],
      destinationLocation: ['', [Validators.required]],
      timeOfArrival: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.routeSvc.getCities().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: City[]) => {
        this.listCities = res;
      }
    );
  }

  getSave(user: User) {
    if (this.newForm.valid) {
      const route = this.newForm.value;
      const routeId = route?.id || null;
      route.createdBy = user.uid;
      route.createdAt = this.today;
      route.status = true;
      this.routeSvc.saveRoute(route, routeId).then();
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
