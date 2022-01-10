import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as XLSX from "xlsx";
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {Checklist, Question} from "../../../../../core/interfaces/checklist";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import User = firebase.User;

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss']
})
export class ListQuestionsComponent implements OnInit {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() add = new EventEmitter<boolean>();
  @Output() back = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<any>();

  //RESULTS
  listChecklist: Checklist[] = [];
  listQuestions: Question[] = [];

  //CHECKLIST SELECTED
  checklistSelected: string | any;

  //PAGINATION
  page: number = 1;
  pageSize: number = 5;

  //VARIABLES
  fileName = 'Listado-Preguntas.xlsx';

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {
    this.checklistSvc.getChecklistsActive().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Checklist[]) => {
        this.listChecklist = res;
      }
    );
    this.checklistSvc.getQuestions().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Question[]) => {
        this.listQuestions = res;
      }
    );
  }

  getPrint() {
    window.print();
  }

  getBack() {
    this.back.emit(true);
  }

  getSelectedChecklist(event: any) {
    this.checklistSelected = event.value;
  }

  getNew(event: any) {
    this.add.emit(event.value);
  }

  getExportExcel(): void {
    let element = document.getElementById('exportExcel');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, this.fileName);
  }

  onEdit(id: any) {
    this.edit.emit(id);
  }

  onDelete(question: Question) {
    if (confirm("Desea eliminar la Pregunta: " + question.description + " ?")) {
      this.checklistSvc.deleteQuestion(question.id).then(r => console.log(r));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
