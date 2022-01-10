import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import * as XLSX from "xlsx";
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {Checklist} from "../../../../../core/interfaces/checklist";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import User = firebase.User;

@Component({
  selector: 'app-list-checklist',
  templateUrl: './list-checklist.component.html',
  styleUrls: ['./list-checklist.component.scss']
})
export class ListChecklistComponent implements OnInit, OnDestroy {
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
  listChecklist: Checklist[] = [];

  //VARIABLES
  today = new Date();
  fileName = 'Listado-Checklist.xlsx';

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {
    this.checklistSvc.getChecklists().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Checklist[]) => {
        this.listChecklist = res;
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

  getDelete(checklist: Checklist) {
    if (confirm("Desea eliminar el checklist: " + checklist.description + " ?")) {
      this.checklistSvc.deleteChecklist(checklist.id).then();
    }
  }

  getEdit(id: any) {
    this.edit.emit(id);
  }

  getPublish(id: any) {
    const checklist = {} as Checklist;
    checklist.publish = true;
    // @ts-ignore
    checklist.publishAt = this.today;
    if (confirm("Desea publicar el checklist?")) {
      this.checklistSvc.updateChecklist(checklist, id).then();
    }
  }

  getFinish(id: any) {
    const checklist = {} as Checklist;
    checklist.active = false;
    if (confirm("Desea Terminar el checklist?")) {
      this.checklistSvc.updateChecklist(checklist, id).then();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
