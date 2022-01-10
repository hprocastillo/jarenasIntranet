import {Component, EventEmitter, Input, Output} from '@angular/core';
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import User = firebase.User;

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //NEW FORM
  newForm: FormGroup;

  //VARIABLES
  today = new Date();

  constructor(private fb: FormBuilder, private checklistSvc: ChecklistService) {
    this.newForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  getSave(user: User) {
    if (this.newForm.valid) {
      const category = this.newForm.value;
      const categoryId = category?.id || null;
      category.name = category.name.toUpperCase();
      category.createdBy = user.uid;
      category.createdAt = this.today;
      this.checklistSvc.saveCategory(category, categoryId).then();
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }
}
