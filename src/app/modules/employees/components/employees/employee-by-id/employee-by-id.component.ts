import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Employee} from "../../../../../core/interfaces/employee";
import {EmployeeService} from "../../../../../core/services/employee.service";

@Component({
  selector: 'app-employee-by-id',
  templateUrl: './employee-by-id.component.html',
  styleUrls: ['./employee-by-id.component.scss']
})
export class EmployeeByIdComponent implements OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() employeeId: string | any;

  //RESULTS
  employee = {} as Employee;

  constructor(private employeeSvc: EmployeeService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.employeeId) {
      this.employeeSvc.getEmployeeById(this.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.employee = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
