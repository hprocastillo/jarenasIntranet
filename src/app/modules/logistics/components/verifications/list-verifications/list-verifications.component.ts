import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {Verification} from "../../../../../core/interfaces/checklist";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import * as XLSX from "xlsx";
import User = firebase.User;

@Component({
  selector: 'app-list-verifications',
  templateUrl: './list-verifications.component.html',
  styleUrls: ['./list-verifications.component.scss']
})
export class ListVerificationsComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() view = new EventEmitter<any>();

  //PAGINATION
  page: number = 1;
  pageSize: number = 5;

  //RESULTS
  listVerifications: Verification[] = [];

  //VARIABLES
  today = new Date();
  fileName = 'Listado-Checklist-Usuarios.xlsx';

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {
    this.checklistSvc.getVerifications().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Verification[]) => {
        this.listVerifications = res;
      }
    );
  }

  onView(verificationId: any) {
    this.view.emit(verificationId);
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
