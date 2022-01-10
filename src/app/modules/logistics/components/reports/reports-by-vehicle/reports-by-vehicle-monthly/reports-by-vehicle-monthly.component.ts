import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {Trip} from "../../../../../../core/interfaces/route";
import {RouteService} from "../../../../../../core/services/route.service";
import User = firebase.User;

interface NewList {
  vehicleId: string;
  traveledMileage: number;
  timeOnRoute: number;
  iperc: number;
  checklist: number;
}

@Component({
  selector: 'app-reports-by-vehicle-monthly',
  templateUrl: './reports-by-vehicle-monthly.component.html',
  styleUrls: ['./reports-by-vehicle-monthly.component.scss']
})
export class ReportsByVehicleMonthlyComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() dataChart = new EventEmitter<NewList>();

  //VARIABLES
  today = new Date();
  totalMileage: number | any;
  totalTimeOnRoute: number | any;

  //RESULTS
  listTrips: Trip[] = [];
  newList: NewList[] = [];

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
            return item.startDate.toDate().getMonth() === this.today.getMonth()
              && item.startDate.toDate().getFullYear() === this.today.getFullYear();
          });

          for (let l = 0; l < this.listTrips.length; l++) {
            //If newList is empty
            if (this.newList.length === 0) {
              this.newList.push(
                {
                  vehicleId: this.listTrips[l].vehicleId,
                  traveledMileage: this.listTrips[l].traveledMileage,
                  timeOnRoute: this.listTrips[l].timeOnRoute,
                  iperc: 1,
                  checklist: 1
                }
              );
            } else {
              let add: boolean = false;
              for (let n = 0; n < this.newList.length; n++) {
                //if are equals
                if ((this.newList[n].vehicleId === this.listTrips[l].vehicleId)) {
                  this.newList[n].traveledMileage = this.newList[n].traveledMileage + this.listTrips[l].traveledMileage;
                  this.newList[n].timeOnRoute = this.newList[n].timeOnRoute + this.listTrips[l].timeOnRoute;
                  this.newList[n].iperc = this.newList[n].iperc + 1;
                  this.newList[n].checklist = this.newList[n].checklist + 1;
                  add = false;
                  break;
                } else {
                  //if are different
                  add = true;
                }
              }
              if (add) {
                this.newList.push(
                  {
                    vehicleId: this.listTrips[l].vehicleId,
                    traveledMileage: this.listTrips[l].traveledMileage,
                    timeOnRoute: this.listTrips[l].timeOnRoute,
                    iperc: 1,
                    checklist: 1
                  }
                );
              }
            }

            totalMileage = totalMileage + this.listTrips[l].traveledMileage;
            totalTimeOnRoute = totalTimeOnRoute + this.listTrips[l].timeOnRoute;
          }
          this.totalMileage = totalMileage;
          this.totalTimeOnRoute = totalTimeOnRoute;
          counter++;
        }
        // @ts-ignore
        this.dataChart.emit(this.newList);
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
