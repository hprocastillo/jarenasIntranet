import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import * as XLSX from "xlsx";
import firebase from "firebase";
import {Subject, takeUntil} from "rxjs";
import {City} from "../../../../../core/interfaces/route";
import {RouteService} from "../../../../../core/services/route.service";
import User = firebase.User;

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.scss']
})
export class ListCitiesComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<any>();

  //PAGINATION
  page: number = 1;
  pageSize: number = 5;

  //RESULTS
  listCities: City[] = [];

  //VARIABLES
  fileName = 'Listado-Ciudades.xlsx';

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

  getNew(event: any) {
    this.add.emit(event.value);
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

  getDelete(city: City) {
    if (confirm("Desea eliminar la ciudad: " + city.name + " ?")) {
      this.routeSvc.deleteCity(city.id).then();
    }
  }

  getEdit(cityId: any) {
    this.edit.emit(cityId);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
