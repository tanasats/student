import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { EnrollService } from 'src/app/service/enroll.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent {
  scannerEnabled = true
  allowedFormats = [ BarcodeFormat.QR_CODE ];
  qrResultString: any;

  constructor(
    private enrollservice:EnrollService
  ){ }
 



  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    
  }

}
