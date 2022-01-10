import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {Trip} from "../../../../../../core/interfaces/route";
import {RouteService} from "../../../../../../core/services/route.service";
import User = firebase.User;

@Component({
  selector: 'app-reports-by-vehicle-daily',
  templateUrl: './reports-by-vehicle-daily.component.html',
  styleUrls: ['./reports-by-vehicle-daily.component.scss']
})
export class ReportsByVehicleDailyComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;

  //VARIABLES
  today = new Date();
  totalMileage: number | any;
  totalTimeOnRoute: number | any;

  //RESULTS
  listTrips: Trip[] = [];

  constructor(private routeSvc: RouteService) {
  }

  ngOnInit(): void {
    this.routeSvc.getTrips().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Trip[]) => {
        let counter = 0;
        let totalMileage = 0;
        let totalTimeOnRoute = 0;

        if (counter === 0) {
          this.listTrips = res;

          this.listTrips = this.listTrips.filter(item => {
            return item.startDate.toDate().getDate() === this.today.getDate()
              && item.startDate.toDate().getMonth() === this.today.getMonth()
              && item.startDate.toDate().getFullYear() === this.today.getFullYear();
          });

          for (let i = 0; i < this.listTrips.length; i++) {
            totalMileage = totalMileage + this.listTrips[i].traveledMileage;
            totalTimeOnRoute = totalTimeOnRoute + this.listTrips[i].timeOnRoute;
          }
          this.totalMileage = totalMileage;
          this.totalTimeOnRoute = totalTimeOnRoute;
          counter++;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
