import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import firebase from "firebase";
import * as XLSX from "xlsx";
import {Employee} from "../../../../../core/interfaces/employee";
import {EmployeeService} from "../../../../../core/services/employee.service";
import {Subject, takeUntil} from "rxjs";
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

  constructor(private employeeSvc: EmployeeService) {
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

  getDelete(employee: Employee) {
    if (confirm("Desea eliminar el empleado: " + employee.name + "?")) {
      this.employeeSvc.deleteEmployee(employee.id).then(r => console.log(r));
    }
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
