import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category, Checklist} from "../../../../../core/interfaces/checklist";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import User = firebase.User;

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //VARIABLES
  today = new Date();

  //NEW FORM
  newForm: FormGroup;

  //RESULTS
  listChecklist: Checklist[] = [];
  listCategories: Category[] = [];

  constructor(private fb: FormBuilder, private checklistSvc: ChecklistService) {
    this.newForm = this.fb.group({
      description: ['', [Validators.required]],
      checklistId: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
    });
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

  getSave(user: User) {
    if (this.newForm.valid) {
      const question = this.newForm.value;
      const questionId = question?.id || null;
      question.description = question.description.toUpperCase();
      question.createdBy = user.uid;
      question.createdAt = this.today;
      this.checklistSvc.saveQuestion(question, questionId).then();
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
