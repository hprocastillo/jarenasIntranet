import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {Category, Checklist, Question} from "../../../../../core/interfaces/checklist";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import User = firebase.User;

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit, OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() editQuestion: string | any;
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //VARIABLES
  today = new Date();

  //RESULTS
  question = {} as Question;
  listChecklist: Checklist[] = [];
  listCategories: Category[] = [];

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editQuestion) {
      this.checklistSvc.getQuestionById(this.editQuestion).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.question = res;
        }
      );
    }
  }

  ngOnInit(): void {
    // Get checklist
    this.checklistSvc.getChecklistsActive().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Checklist[]) => {
        this.listChecklist = res;
      }
    );
    // Get categories
    this.checklistSvc.getCategories().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Category[]) => {
        this.listCategories = res;
      }
    );
  }

  getEdit(user: User, editQuestion: string) {
    this.question.description = this.question.description.toUpperCase();
    this.question.updatedBy = user.uid;
    // @ts-ignore
    this.question.updatedAt = this.today;
    this.checklistSvc.updateQuestion(this.question, editQuestion).then(r => console.log(r));
    this.cancel.emit(false);
  }

  getCancel() {
    this.cancel.emit(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
