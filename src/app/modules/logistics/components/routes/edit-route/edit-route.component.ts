import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {City, Route} from "../../../../../core/interfaces/route";
import {RouteService} from "../../../../../core/services/route.service";
import User = firebase.User;

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.scss']
})
export class EditRouteComponent implements OnInit, OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() editRoute: string | any;
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //RESULTS
  route = {} as Route;
  listCities: City[] = [];

  //VARIABLES
  today = new Date();

  constructor(private routeSvc: RouteService) {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editRoute) {
      this.routeSvc.getRouteById(this.editRoute).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.route = res;
        }
      );
    }
  }

  getEdit(user: User, editRoute: string) {
    this.route.updatedBy = user.uid;
    // @ts-ignore
    this.route.updatedAt = this.today;
    this.routeSvc.updateRoute(this.route, editRoute).then();
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
