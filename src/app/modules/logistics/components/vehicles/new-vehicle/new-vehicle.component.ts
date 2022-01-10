import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee, EmployeeTypes} from "../../../../../core/interfaces/employee";
import {Brand} from "../../../../../core/interfaces/vehicle";
import {EmployeeService} from "../../../../../core/services/employee.service";
import {VehicleService} from "../../../../../core/services/vehicle.service";
import User = firebase.User;

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.scss']
})
export class NewVehicleComponent implements OnInit, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();
  //NEW FORM
  newForm: FormGroup;
  //RESULTS
  listEmployees: Employee[] = [];
  listEmployeesTypes: EmployeeTypes[] = [];
  listBrands: Brand[] = [];
  //VARIABLES
  today = new Date();
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private employeeSvc: EmployeeService,
    private vehicleSvc: VehicleService) {
    this.newForm = this.fb.group({
      description: ['', [Validators.required]],
      badge: ['', [Validators.required]],
      birthDay: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      brandId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.employeeSvc.getEmployeesTypes().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: EmployeeTypes[]) => {
        this.listEmployeesTypes = res;
        this.listEmployeesTypes = this.listEmployeesTypes.filter(item => {
          return item.description === 'CONDUCTOR';
        });
        this.employeeSvc.getEmployeesByEmployeeType(this.listEmployeesTypes[0].id).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          (res: Employee[]) => {
            this.listEmployees = res;
          }
        );
      }
    );
    this.vehicleSvc.getBrands().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Brand[]) => {
        this.listBrands = res;
      }
    );
  }

  getSave(user: User) {
    if (this.newForm.valid) {
      const vehicle = this.newForm.value;
      const vehicleId = vehicle?.id || null;
      vehicle.description = vehicle.description.toUpperCase();
      vehicle.badge = vehicle.badge.toUpperCase();
      vehicle.createdBy = user.uid;
      vehicle.createdAt = this.today;
      this.vehicleSvc.saveVehicle(vehicle, vehicleId).then();
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
