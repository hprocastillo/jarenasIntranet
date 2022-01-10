import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import firebase from "firebase";
import {Subject, takeUntil} from "rxjs";
import {Trip} from "../../../../../core/interfaces/route";
import {RouteService} from "../../../../../core/services/route.service";
import User = firebase.User;

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.scss']
})
export class ListTripsComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;

  //RESULTS
  listTrips: Trip[] = [];

  //PAGINATION
  page: number = 1;
  pageSize: number = 5;

  //VARIABLES
  fileName = 'Listado_Viajes.xlsx';

  constructor(private routeSvc: RouteService) {
  }

  ngOnInit(): void {
    this.routeSvc.getTrips().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Trip[]) => {
        this.listTrips = res;
      }
    );
  }

  getPrint() {
    window.print();
  }

  getExportExcel(): void {
    let element = document.getElementById('exportExcel');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, this.fileName);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
