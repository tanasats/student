import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-activity-scanner',
  templateUrl: './activity-scanner.component.html',
  styleUrls: ['./activity-scanner.component.scss'],
})
export class ActivityScannerComponent {
  public id: any;
  public state: any;
  public item: any;
  public checkinlist:any[]=[];

  scannerEnabled = true;
  allowedFormats = [BarcodeFormat.QR_CODE];
  qrResultString: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.state = history.state;
    this.item = history.state.datas;
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.checkinlist.push({qrcode:this.qrResultString});
    this.qrResultString = null;
  }

}
