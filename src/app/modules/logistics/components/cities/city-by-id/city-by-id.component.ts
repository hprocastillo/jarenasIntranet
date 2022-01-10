import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {City} from "../../../../../core/interfaces/route";
import {RouteService} from "../../../../../core/services/route.service";

@Component({
  selector: 'app-city-by-id',
  templateUrl: './city-by-id.component.html',
  styleUrls: ['./city-by-id.component.scss']
})
export class CityByIdComponent implements OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() cityId: string | any;

  //RESULTS
  city = {} as City;

  constructor(private routeSvc: RouteService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.cityId) {
      this.routeSvc.getCityById(this.cityId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.city = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
