import {Component, Input} from '@angular/core';
import {EmployeeService} from "../../../../../core/services/employee.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal-delete-employee',
  templateUrl: './modal-delete-employee.component.html',
  styleUrls: ['./modal-delete-employee.component.scss']
})
export class ModalDeleteEmployeeComponent {
  @Input() employeeId: string | any;
  @Input() employeeName: string | any;

  constructor(public activeModal: NgbActiveModal, private employeeSvc: EmployeeService) {
  }

  getDelete(employeeId: string) {
    this.employeeSvc.deleteEmployee(employeeId).then();
    this.activeModal.close();
  }
}
