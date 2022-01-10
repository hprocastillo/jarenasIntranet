import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {VehicleService} from "../../../../../../core/services/vehicle.service";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() newList: any[] = [];

  //Chart1
  titleChart1: string = "KILÓMETROS RECORRIDOS POR VEHÍCULO";
  dataChart1 = [];
  //Chart2
  titleChart2: string = "HORAS EN RUTA POR VEHÍCULO";
  dataChart2 = [];
  optionsChart = {
    width: 500,
    height: 350,
    is3D: true
  };
  typeChart: any = 'PieChart';

  constructor(private vehicleSvc: VehicleService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.newList)
    if (this.newList.length > 0) {
      for (let i = 0; i < this.newList.length; i++) {
        this.vehicleSvc.getVehicleById(this.newList[i].vehicleId).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          (res: any) => {
            // @ts-ignore
            this.dataChart1.push([res.badge, this.newList[i].traveledMileage]);
            // @ts-ignore
            this.dataChart2.push([res.badge, this.newList[i].timeOnRoute]);
          }
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
