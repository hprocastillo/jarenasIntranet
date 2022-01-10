import {Component, EventEmitter, Input, Output} from '@angular/core';
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import User = firebase.User;

@Component({
  selector: 'app-new-checklist',
  templateUrl: './new-checklist.component.html',
  styleUrls: ['./new-checklist.component.scss']
})
export class NewChecklistComponent {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //NEW FORM
  newForm: FormGroup;

  //VARIABLES
  today = new Date();

  constructor(private fb: FormBuilder, private checklistSvc: ChecklistService) {
    this.newForm = this.fb.group({
      description: ['', [Validators.required]],
    });
  }

  getSave(user: User) {
    if (this.newForm.valid) {
      const checklist = this.newForm.value;
      const checklistId = checklist?.id || null;
      checklist.description = checklist.description.toUpperCase();
      checklist.publish = false;
      checklist.active = true;
      checklist.createdBy = user.uid;
      checklist.createdAt = this.today;
      this.checklistSvc.saveChecklist(checklist, checklistId).then();
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }
}
