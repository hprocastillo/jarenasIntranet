import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {Route} from "../../../../../core/interfaces/route";
import {RouteService} from "../../../../../core/services/route.service";
import * as XLSX from "xlsx";
import User = firebase.User;

@Component({
  selector: 'app-list-routes',
  templateUrl: './list-routes.component.html',
  styleUrls: ['./list-routes.component.scss']
})
export class ListRoutesComponent implements OnInit, OnDestroy {
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
  listRoutes: Route[] = [];

  //VARIABLES
  today = new Date();
  fileName = 'Listado-Rutas.xlsx';

  constructor(private routeSvc: RouteService) {
  }

  ngOnInit(): void {
    this.routeSvc.getRoutes().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Route[]) => {
        this.listRoutes = res;
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

  getDelete(route: Route) {
    if (confirm("Desea eliminar la Ruta: " + route.description + " ?")) {
      this.routeSvc.deleteRoute(route.id).then(r => console.log(r));
    }
  }

  getEdit(routeId: any) {
    this.edit.emit(routeId);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
