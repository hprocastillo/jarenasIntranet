import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {EmployeeTypes} from "../../../../../core/interfaces/employee";
import {EmployeeService} from "../../../../../core/services/employee.service";

@Component({
  selector: 'app-employee-type-by-id',
  templateUrl: './employee-type-by-id.component.html',
  styleUrls: ['./employee-type-by-id.component.scss']
})
export class EmployeeTypeByIdComponent implements OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() employeeTypeId: string | any;

  //RESULTS
  employeeType = {} as EmployeeTypes;

  constructor(private employeeSvc: EmployeeService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.employeeTypeId) {
      this.employeeSvc.getEmployeesTypesById(this.employeeTypeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.employeeType = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
