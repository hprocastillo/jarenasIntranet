import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import firebase from "firebase";
import {Subject, takeUntil} from "rxjs";
import {City} from "../../../../../core/interfaces/route";
import {RouteService} from "../../../../../core/services/route.service";
import User = firebase.User;

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() editCity: string | any;
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //RESULTS
  city = {} as City;

  //VARIABLES
  today = new Date();

  constructor(private routeSvc: RouteService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editCity) {
      this.routeSvc.getCityById(this.editCity).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.city = res;
        }
      );
    }
  }

  getEdit(user: User, editCity: string) {
    this.city.name = this.city.name.toUpperCase();
    this.city.updatedBy = user.uid;
    // @ts-ignore
    this.city.updatedAt = this.today;
    this.routeSvc.updateCity(this.city, editCity).then(r => console.log(r));
    this.cancel.emit(false);
  }

  getCancel() {
    this.cancel.emit(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
