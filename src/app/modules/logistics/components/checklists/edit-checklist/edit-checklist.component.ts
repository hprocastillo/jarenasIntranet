import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {Checklist} from "../../../../../core/interfaces/checklist";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import User = firebase.User;

@Component({
  selector: 'app-edit-checklist',
  templateUrl: './edit-checklist.component.html',
  styleUrls: ['./edit-checklist.component.scss']
})
export class EditChecklistComponent implements OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() editChecklist: string | any;
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //RESULTS
  checklist = {} as Checklist;

  //VARIABLES
  today = new Date();

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editChecklist) {
      this.checklistSvc.getChecklistById(this.editChecklist).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.checklist = res;
        }
      );
    }
  }

  getEdit(user: User, editChecklist: string) {
    this.checklist.description = this.checklist.description.toUpperCase();
    this.checklist.updatedBy = user.uid;
    // @ts-ignore
    this.checklist.updatedAt = this.today;
    this.checklistSvc.updateChecklist(this.checklist, editChecklist).then();
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
