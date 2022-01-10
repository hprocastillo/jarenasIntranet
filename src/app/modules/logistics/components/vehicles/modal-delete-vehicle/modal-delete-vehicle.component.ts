import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {VehicleService} from "../../../../../core/services/vehicle.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-modal-delete-vehicle',
  templateUrl: './modal-delete-vehicle.component.html',
  styleUrls: ['./modal-delete-vehicle.component.scss']
})
export class ModalDeleteVehicleComponent implements OnInit {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS
  @Input() vehicleId: string | any;
  @Input() vehicleDescription: string | any;

  //RESULTS
  isAssigned: boolean = false;

  constructor(public activeModal: NgbActiveModal, private vehicleSvc: VehicleService) {
  }

  ngOnInit(): void {
    if (this.vehicleId) {
      this.vehicleSvc.getVehicleById(this.vehicleId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          if (res.employeeId !== '0') {
            this.isAssigned = true;
          }
        }
      )
    }
  }

  getDelete(vehicleId: string) {
    this.vehicleSvc.deleteVehicle(vehicleId).then();
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
