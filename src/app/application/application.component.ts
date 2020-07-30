import { Component, OnInit, ViewChild, Input, AfterViewInit, Optional, Inject } from '@angular/core';
import { RestapiserviceService } from '../restapiservice.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { DialogEditApplication } from './dialog-editApplication';



interface Clients {
  name: string;

}
export interface applicationData {
  applicationId: number;
  applicationName: string;
  active: number;
  clientName: string;
  clientId: number;

}

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

 

  apps: applicationData[] = [];
  client: Clients[] = [];
  clientname: any
  form: any = { active: 1, applicationName:'',clientName:'' };
  displayedColumns: string[] = ['applicationId', 'clientName', 'applicationName', 'active', 'action'];
  dataSource = new MatTableDataSource(this.apps);

  listStatus = [
    { name: 'Active', value: 1, checked: true },
    { name: 'Inactive', value: 0, checked: false }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  table: MatTable<any>

  clientNameInvalid: boolean;
  applicationNameInvalid: boolean;
message:any

  constructor(private service: RestapiserviceService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.service.getClientName().subscribe(result => {
      this.clientname = result;
    }, error => console.error(error));

    this.service.getApplicationData().subscribe(
      data => {
        this.apps = data;
        this.dataSource = new MatTableDataSource(this.apps);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log("getApplicationData" + JSON.stringify(data))
      }
    );
  }
  doSaveApplication() {
    if (this.ValidateForm()) {


      let resp = this.service.doSaveApplication(this.form,{observe:'response'}).subscribe((response: any) => {

        if (response === 200) {
          const dialogRef = this.dialog.open(DialogClose, {
            width: '250px',

          });

        } else {

          this.message = 'Details not saved successfully';

        }
      }

      );
    }
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    //  this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  editApplication(action, obj) {

    obj.action = action;
    let params = {
      row: obj,
      clientName: this.clientname
    };

    const dialogRef = this.dialog.open(DialogEditApplication, {
      width: '250px',
      data: params
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateRow(result.data);
      //let resp = this.service.doEditRole(result.data);
    })
  }
  updateRow(row_obj) {

    this.dataSource.data.filter((value, key) => {
      if (value.applicationId == row_obj.applicationId) {
        value.applicationName = row_obj.applicationName;
        value.active = row_obj.active;

      }

      return true;

    });
    let resp = this.service.doEditApplication(row_obj);

  }


  ValidateForm() {
    let _isValid = true;

    this.clientNameInvalid = (!this.form.clientName || this.form.clientName == '')
    this.applicationNameInvalid = (!this.form.applicationName || this.form.applicationName == '')
    if (this.applicationNameInvalid || this.clientNameInvalid) {
      _isValid = false;
    }

    return _isValid;

  }


}


@Component({
  selector: 'dialog-open',
  templateUrl: 'dialog-open.html',
})
export class DialogClose {

  constructor(
    public dialogRef: MatDialogRef<DialogClose>) { }


  close() {
    this.dialogRef.close();
  }

}
