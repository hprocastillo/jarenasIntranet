import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import * as XLSX from "xlsx";
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {Brand} from "../../../../../core/interfaces/vehicle";
import {VehicleService} from "../../../../../core/services/vehicle.service";
import User = firebase.User;

@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.scss']
})
export class ListBrandsComponent implements OnInit, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<any>();
  //PAGINATION
  page: number = 1;
  pageSize: number = 5;
  //RESULTS
  listBrands: Brand[] = [];
  //VARIABLES
  fileName = 'Listado-Marcas.xlsx';
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(private vehicleSvc: VehicleService) {
  }

  ngOnInit(): void {
    this.vehicleSvc.getBrands().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Brand[]) => {
        this.listBrands = res;
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

  getDelete(brand: Brand) {
    if (confirm("Desea eliminar la marca: " + brand.brand + " ?")) {
      this.vehicleSvc.deleteBrand(brand.id).then();
    }
  }

  getEdit(id: any) {
    this.edit.emit(id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
