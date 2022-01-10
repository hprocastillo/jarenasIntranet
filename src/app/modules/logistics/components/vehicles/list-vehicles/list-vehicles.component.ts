import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import * as XLSX from "xlsx";
import firebase from "firebase";
import {Subject, takeUntil} from "rxjs";
import {Vehicle} from "../../../../../core/interfaces/vehicle";
import {VehicleService} from "../../../../../core/services/vehicle.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import User = firebase.User;
import {
  ModalDeleteEmployeeComponent
} from "../../../../employees/components/employees/modal-delete-employee/modal-delete-employee.component";
import {ModalDeleteVehicleComponent} from "../modal-delete-vehicle/modal-delete-vehicle.component";

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.scss']
})
export class ListVehiclesComponent implements OnInit, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<any>();
  //PAGINATION
  page: number = 1;
  pageSize: number = 5;
  //RESULTS
  listVehicles: Vehicle[] = [];
  //VARIABLES
  today = new Date();
  fileName = 'Listado-Vehiculos.xlsx';
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(private modalService: NgbModal, private vehicleSvc: VehicleService) {
  }

  ngOnInit(): void {
    this.vehicleSvc.getVehicles().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Vehicle[]) => {
        this.listVehicles = res;
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

  getNew(event: any) {
    this.add.emit(event.value);
  }

  getModalDelete(vehicle: Vehicle) {
    const modalRef = this.modalService.open(ModalDeleteVehicleComponent, {centered: true});
    modalRef.componentInstance.vehicleId = vehicle.id;
    modalRef.componentInstance.vehicleDescription = vehicle.description;
  }

  getDelete(vehicle: Vehicle) {
    if (confirm("Desea eliminar el vehiculo: " + vehicle.description + "?")) {
      this.vehicleSvc.deleteVehicle(vehicle.id).then(r => console.log(r));
    }
  }

  getEdit(vehicleId: any) {
    this.edit.emit(vehicleId);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
