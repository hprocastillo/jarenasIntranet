import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import firebase from "firebase";
import {Subject, takeUntil} from "rxjs";
import {EmployeeTypes} from "../../../../../core/interfaces/employee";
import {EmployeeService} from "../../../../../core/services/employee.service";
import * as XLSX from "xlsx";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalDeleteEmployeeTypeComponent} from "../modal-delete-employee-type/modal-delete-employee-type.component";
import User = firebase.User;

@Component({
  selector: 'app-list-employees-types',
  templateUrl: './list-employees-types.component.html',
  styleUrls: ['./list-employees-types.component.scss']
})
export class ListEmployeesTypesComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<any>();

  //PAGINATION
  page: number = 1;
  pageSize: number = 5;

  //VARIABLES
  today = new Date();
  fileName = 'Listado-Tipos-Empleados.xlsx';

  //RESULTS
  listEmployeesType: EmployeeTypes[] = [];

  constructor(private modalService: NgbModal, private employeeSvc: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeSvc.getEmployeesTypes().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: EmployeeTypes[]) => {
        this.listEmployeesType = res;
      }
    );
  }

  getNew(event: any) {
    this.add.emit(event.value);
  }

  getModalDelete(employeeType: EmployeeTypes) {
    const modalRef = this.modalService.open(ModalDeleteEmployeeTypeComponent, {centered: true});
    modalRef.componentInstance.employeeTypeId = employeeType.id;
    modalRef.componentInstance.employeeTypeDescription = employeeType.description;
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

  getEdit(employeeTypeId: any) {
    this.edit.emit(employeeTypeId);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
