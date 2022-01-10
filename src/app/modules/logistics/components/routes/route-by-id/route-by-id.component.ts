import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Route} from "../../../../../core/interfaces/route";
import {RouteService} from "../../../../../core/services/route.service";

@Component({
  selector: 'app-route-by-id',
  templateUrl: './route-by-id.component.html',
  styleUrls: ['./route-by-id.component.scss']
})
export class RouteByIdComponent implements OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() routeId: string | any;

  //RESULTS
  route = {} as Route;

  constructor(private routeSvc: RouteService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.routeId) {
      this.routeSvc.getRouteById(this.routeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.route = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
