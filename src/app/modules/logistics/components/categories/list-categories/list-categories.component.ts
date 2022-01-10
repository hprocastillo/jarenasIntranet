import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import * as XLSX from "xlsx";
import {Category} from "../../../../../core/interfaces/checklist";
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import User = firebase.User;

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit, OnDestroy {
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
  listCategories: Category[] = [];

  //VARIABLES
  fileName = 'Listado-Categorias.xlsx';

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {
    this.checklistSvc.getCategories().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Category[]) => {
        this.listCategories = res;
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

  getDelete(category: Category) {
    if (confirm("Desea eliminar la categoria: " + category.name + " ?")) {
      this.checklistSvc.deleteCategory(category.id).then();
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
