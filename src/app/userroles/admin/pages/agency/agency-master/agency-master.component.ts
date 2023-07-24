import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AgencyService } from 'src/app/service/agency.service';
import { FacultyService } from 'src/app/service/faculty.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { DialogWarningConfirmComponent } from 'src/app/shared/components/dialogs/confirm/dialog-warning-confirm/dialog-warning-confirm.component';
import { APPLABEL } from 'src/environments/environment';

@Component({
  selector: 'app-agency-master',
  templateUrl: './agency-master.component.html',
  styleUrls: ['./agency-master.component.scss'],
})
export class AgencyMasterComponent {
  public items: any;
  public itemEdit: any = null;
  public isCreate: boolean = false;

  public fc!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private agencyservice: AgencyService,
    private toaster: ToasterService,
    private dialog: MatDialog
  ) {
    this.initFormData();
    this.loadData();
  }

  initFormData() {
    this.fc = this.formbuilder.group({
      agency_id: [null, []],
      agency_code: [null, []],
      agency_name: [null, []],
      agency_name_en: [null, []],
      agency_faculty: [null, []],
    });
  }

  loadData() {
    this.agencyservice.getall().subscribe({
      next: (res) => {
        console.log('agency res:', res);
        this.items = res;
      },
      error: (err) => {
        this.toaster.show('error', err);
      },
    });
  }


  onEdit(item: any) {
    //this.itemEdit=item;
    this.fc.patchValue(item);
    this.isCreate = false;
    this.gotoTop();
  }

  onCancleEdit(event: any) {
    if (event) {
      this.initFormData();
    }
  }

  onSubmitEdit(event: any) {
    console.log('onSubmitEdit:', event);
    this.agencyservice.update(this.fc.getRawValue()).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.affectedRows==1){
          this.loadData();
          this.toaster.show("success",APPLABEL.UPDATE_SUCCESS);
          this.initFormData();
        }
      },
      error:(err)=>{
        console.log(err);
        this.toaster.show("error",APPLABEL.UPDATE_ERROR+err);
      }
    })
  }

  onCreate(isOnCreate: any) {
    if (isOnCreate) {
      this.initFormData();
      this.isCreate = true;
      this.itemEdit = null;
    }
  }

  onCancelCreate(event: any) {
    if (event) {
      this.isCreate = false;
    }
  }

  onSubmitCreate(event: any) {
    console.log(event);
    this.agencyservice.create(this.fc.getRawValue()).subscribe({
      next: (res) => {
        if (res.affectedRows == 1) {
          this.loadData();
          this.isCreate = false;
          this.toaster.show('success', APPLABEL.SAVE_SUCCESS);
        }
      },
      error: (err) => {
        console.log(err);
        this.toaster.show('error', APPLABEL.SAVE_ERROR + err);
      },
    });
  }

  onDelete(item: any) {
    console.log('onDelete()');
    this.dialog
      .open(DialogWarningConfirmComponent, {
        data: {
          title: 'โปรดยืนยันการลบรายการ',
          description: 'ชื่อกิจกรรม: ' + item.agency_name,
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          console.log(data);
          this.agencyservice.delete(item.agency_id).subscribe({
            next: (res) => {
              console.log(res);
              if (res.affectedRows === 1) {
                this.toaster.show('success', APPLABEL.DELETE_SUCCESS);
                this.loadData();
              }
            },
            error: (err) => {
              this.toaster.show('error', APPLABEL.DELETE_ERROR + err);
            },
          });
        }
      });
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
