import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Answer} from "../../../../../core/interfaces/checklist";
import {ChecklistService} from "../../../../../core/services/checklist.service";

@Component({
  selector: 'app-view-answer',
  templateUrl: './view-answer.component.html',
  styleUrls: ['./view-answer.component.scss']
})
export class ViewAnswerComponent implements OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() questionId: string | any;
  @Input() categoryId: string | any;
  @Input() employeeId: string | any;
  @Input() checklistId: string | any;
  @Input() companyId: string | any;

  //RESULTS
  answer: Answer[] = [];

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.questionId) {
      this.checklistSvc.getAnswers(this.employeeId, this.checklistId, this.categoryId, this.questionId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Answer[]) => {
          this.answer = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
