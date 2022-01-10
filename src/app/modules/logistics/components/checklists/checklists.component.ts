import {Component} from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-checklists',
  templateUrl: './checklists.component.html',
  styleUrls: ['./checklists.component.scss']
})
export class ChecklistsComponent {
  //INITIAL TAB
  active = 1;

  //VARIABLES
  editCategory: string | any;
  editChecklist: string | any;
  editQuestion: string | any;
  verificationId: string | any;

  //PAGES
  listPageQuestion: boolean = true;
  listPageCategory: boolean = true;
  listPageChecklist: boolean = true;
  listPageVerifications: boolean = true;

  newPageQuestion: boolean = false;
  newPageCategory: boolean = false;
  newPageChecklist: boolean = false;

  editPageChecklist: boolean = false;
  editPageQuestion: boolean = false;
  editPageCategory: boolean = false;

  viewPageVerification: boolean = false;

  constructor(public authSvc: AuthService) {
  }

  //PAGE CATEGORY
  showListPageCategory() {
    this.listPageCategory = true;
    this.newPageCategory = false;
    this.editPageCategory = false;
  }

  showNewPageCategory() {
    this.listPageCategory = false;
    this.newPageCategory = true;
    this.editPageCategory = false;
  }

  showEditPageCategory() {
    this.listPageCategory = false;
    this.newPageCategory = false;
    this.editPageCategory = true;
  }

  getEditCategory(event: any) {
    this.editCategory = event;
    this.showEditPageCategory();
  }

  //PAGE CHECKLIST
  showListPageChecklist() {
    this.listPageChecklist = true;
    this.newPageChecklist = false;
    this.editPageChecklist = false;
  }

  showNewPageChecklist() {
    this.listPageChecklist = false;
    this.newPageChecklist = true;
    this.editPageChecklist = false;
  }

  showEditPageChecklist() {
    this.listPageChecklist = false;
    this.newPageChecklist = false;
    this.editPageChecklist = true;
  }

  getEditChecklist(event: any) {
    this.editChecklist = event;
    this.showEditPageChecklist();
  }

  //PAGE QUESTION
  showListPageQuestion() {
    this.listPageQuestion = true;
    this.newPageQuestion = false;
    this.editPageQuestion = false;
  }

  showNewPageQuestion() {
    this.listPageQuestion = false;
    this.newPageQuestion = true;
    this.editPageQuestion = false;
  }

  showEditPageQuestion() {
    this.listPageQuestion = false;
    this.newPageQuestion = false;
    this.editPageQuestion = true;
  }

  getEditQuestion(event: any) {
    this.editQuestion = event;
    this.showEditPageQuestion();
  }

  //PAGE VERIFICATION
  showListPageVerifications() {
    this.listPageVerifications = true;
    this.viewPageVerification = false;
  }

  showViewPageVerification() {
    this.listPageVerifications = false;
    this.viewPageVerification = true;
  }

  getViewVerification(event: any) {
    this.verificationId = event;
    this.showViewPageVerification();
  }
}
