import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {Category} from "../../../../../core/interfaces/checklist";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import User = firebase.User;

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() editCategory: string | any;
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //RESULTS
  category = {} as Category;

  //VARIABLES
  today = new Date();

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editCategory) {
      this.checklistSvc.getCategoryById(this.editCategory).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.category = res;
        }
      );
    }
  }

  getEdit(user: User, editCategory: string) {
    this.category.name = this.category.name.toUpperCase();
    this.category.updatedBy = user.uid;
    // @ts-ignore
    this.category.updatedAt = this.today;
    this.checklistSvc.updateCategory(this.category, editCategory).then();
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
