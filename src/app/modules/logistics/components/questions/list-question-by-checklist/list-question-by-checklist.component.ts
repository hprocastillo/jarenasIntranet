import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {Question} from "../../../../../core/interfaces/checklist";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import User = firebase.User;

@Component({
  selector: 'app-list-question-by-checklist',
  templateUrl: './list-question-by-checklist.component.html',
  styleUrls: ['./list-question-by-checklist.component.scss']
})
export class ListQuestionByChecklistComponent implements OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() checklistSelected: string | any;
  @Input() user = {} as User;
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<any>();

  //PAGINATION
  page: number = 1;
  pageSize: number = 5;

  //RESULTS
  listQuestion: Question[] = [];

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.checklistSelected) {
      this.checklistSvc.getQuestionsByChecklist(this.checklistSelected).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Question[]) => {
          this.listQuestion = res;
        }
      );
    }
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
