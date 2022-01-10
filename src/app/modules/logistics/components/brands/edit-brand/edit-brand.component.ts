import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import firebase from "firebase";
import {Brand} from "../../../../../core/interfaces/vehicle";
import {VehicleService} from "../../../../../core/services/vehicle.service";
import User = firebase.User;

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnChanges, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() editBrand: string | any;
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();
  //VARIABLES
  today = new Date();
  //RESULTS
  brand = {} as Brand;
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(private vehicleSvc: VehicleService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editBrand) {
      this.vehicleSvc.getBrandById(this.editBrand).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.brand = res;
        }
      );
    }
  }

  getEdit(user: User, editBrand: string) {
    this.brand.brand = this.brand.brand.toUpperCase();
    this.brand.updatedBy = user.uid;
    // @ts-ignore
    this.brand.updatedAt = this.today;
    this.vehicleSvc.updateBrand(this.brand, editBrand).then();
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
