import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {Brand, Vehicle} from "../../../../../core/interfaces/vehicle";
import {Employee, EmployeeTypes} from "../../../../../core/interfaces/employee";
import {EmployeeService} from "../../../../../core/services/employee.service";
import {VehicleService} from "../../../../../core/services/vehicle.service";
import User = firebase.User;

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit, OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() editVehicle: string | any;
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //RESULTS
  vehicle = {} as Vehicle;
  listEmployees: Employee[] = [];
  listEmployeesTypes: EmployeeTypes[] = [];
  listBrands: Brand[] = [];

  //VARIABLES
  today = new Date();

  constructor(private employeeSvc: EmployeeService, private vehicleSvc: VehicleService) {
  }

  ngOnInit(): void {
    //GET EMPLOYEES LIST BY TYPE EMPLOYEE CONDUCTOR
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
    //GET BRANDS
    this.vehicleSvc.getBrands().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Brand[]) => {
        this.listBrands = res;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    //GET VEHICLE BY ID
    if (this.editVehicle) {
      this.vehicleSvc.getVehicleById(this.editVehicle).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.vehicle = res;
        }
      );
    }
  }

  getEdit(user: User, editVehicle: string) {
    this.vehicle.description = this.vehicle.description.toUpperCase();
    this.vehicle.badge = this.vehicle.badge.toUpperCase();
    this.vehicle.updatedBy = user.uid;
    // @ts-ignore
    this.vehicle.updatedAt = this.today;
    this.vehicleSvc.updateVehicle(this.vehicle, editVehicle).then();
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
