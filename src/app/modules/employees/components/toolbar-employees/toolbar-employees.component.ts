import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar-employees',
  templateUrl: './toolbar-employees.component.html',
  styleUrls: ['./toolbar-employees.component.scss']
})
export class ToolbarEmployeesComponent {
  //BUTTON HOME
  @Input() btnHome: boolean | any;

  //BUTTON BACK
  @Input() btnBackIn: boolean | any;
  @Output() btnBackOut = new EventEmitter<boolean>();

  //BUTTON NEW
  @Input() btnNewIn: boolean | any;
  @Output() btnNewOut = new EventEmitter<boolean>();

  //BUTTON PRINT
  @Input() btnPrintIn: boolean | any;
  @Output() btnPrintOut = new EventEmitter<boolean>();

  //BUTTON EXCEL
  @Input() btnExcelIn: boolean | any;
  @Output() btnExcelOut = new EventEmitter<boolean>();

  //BUTTON PDF
  @Input() btnPdfIn: boolean | any;
  @Output() btnPdfOut = new EventEmitter<boolean>();

  //BUTTON SAVE
  @Input() btnSaveIn: boolean | any;
  @Output() btnSaveOut = new EventEmitter<boolean>();

  //BUTTON CANCEL
  @Input() btnCancelIn: boolean | any;
  @Output() btnCancelOut = new EventEmitter<boolean>();

  //BUTTON FINISH
  @Input() btnFinishIn: boolean | any;
  @Output() btnFinishOut = new EventEmitter<boolean>();

  constructor(private router: Router) {
  }

  getNew() {
    this.btnNewOut.emit(true);
  }

  getBack() {
    this.btnBackOut.emit(true);
  }

  getExcel() {
    this.btnExcelOut.emit(true);
  }

  getPdf() {
    this.btnPdfOut.emit(true);
  }

  getPrint() {
    this.btnPrintOut.emit(true);
  }

  getHome() {
    this.router.navigate(['dashboard']).then();
  }

  getSave() {
    this.btnSaveOut.emit(true);
  }

  getCancel() {
    this.btnCancelOut.emit(true);
  }

  getFinish() {
    this.btnFinishOut.emit(true);
  }
}
