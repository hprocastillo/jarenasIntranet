import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {Category, Checklist, Question, Verification} from "../../../../../core/interfaces/checklist";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import User = firebase.User;

@Component({
  selector: 'app-view-verification',
  templateUrl: './view-verification.component.html',
  styleUrls: ['./view-verification.component.scss']
})
export class ViewVerificationComponent implements OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Input() verificationId: string | any;
  @Output() back = new EventEmitter<boolean>();

  //RESULTS
  verification = {} as Verification;
  checklist = {} as Checklist;
  listQuestions: Question[] = [];
  listCategories: Category[] = [];

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.verificationId) {
      this.checklistSvc.getVerificationById(this.verificationId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.verification = res;

          //get list questions
          this.checklistSvc.getQuestionsByChecklist(this.verification.checklistId).pipe(
            takeUntil(this.unsubscribe$)
          ).subscribe(
            (res: Question[]) => {
              this.listQuestions = res;
            }
          );

          //get checklist
          this.checklistSvc.getChecklistById(this.verification.checklistId).pipe(
            takeUntil(this.unsubscribe$)
          ).subscribe(
            (res: any) => {
              this.checklist = res;
            }
          );
        }
      );
    }
  }

  getPrint() {
    window.print();
  }

  getBack() {
    this.back.emit(true);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
