import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import firebase from "firebase";
import * as XLSX from "xlsx";
import {Employee} from "../../../../../core/interfaces/employee";
import {EmployeeService} from "../../../../../core/services/employee.service";
import {Subject, takeUntil} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalDeleteEmployeeComponent} from "../modal-delete-employee/modal-delete-employee.component";
import User = firebase.User;

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<any>();

  //VARIABLES
  today = new Date();
  fileName = 'Listado-Empleados.xlsx';

  //RESULTS
  listEmployees: Employee[] = [];

  //PAGINATION
  page: number = 1;
  pageSize: number = 5;

  constructor(
    private modalService: NgbModal,
    private employeeSvc: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeSvc.getEmployees().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Employee[]) => {
        this.listEmployees = res;
      }
    );
  }

  getModalDelete(employee: Employee) {
    const modalRef = this.modalService.open(ModalDeleteEmployeeComponent, {centered: true});
    modalRef.componentInstance.employeeId = employee.id;
    modalRef.componentInstance.employeeName = employee.name;
  }

  getEdit(employeeId: any) {
    this.edit.emit(employeeId);
  }

  //BUTTONS TOOLBAR
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

  getStatus(event: any, employeeId: string, userId: string) {
    let employee = {} as Employee;
    employee.status = event.value === 'true';
    employee.updatedBy = userId;
    // @ts-ignore
    employee.updatedAt = this.today;
    this.employeeSvc.updateEmployee(employee, employeeId).then();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
