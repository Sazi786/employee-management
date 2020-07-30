import { Component, Optional, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface userData {
  userId: number;
  userName: string;
  userFirstName: string;
  empLastName: string;
  userEmail: string;
  active: number;
  applicationName: string;
  applicationId: number
  clientName: string;
  role: Array<any>
  client: Array<any>
  application: Array<any> 
}

@Component({
  selector: 'dialog-editUser',
  templateUrl: 'dialog-editUser.html',
  styleUrls: ['./user.component.css']
})



export class DialogEditUser {

  action: string;
  local_data: any;
  drpApplication: any
  drpClients: any
  drpRoles = new Array();
  // selectedRole: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogEditUser>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data) {
    console.log(data);
    if (data) {
      this.local_data = data.row;
      this.action = this.local_data.action;
      this.drpApplication = data.applicationName;
      this.drpClients = data.clientName;
      this.drpRoles = data.role;
      this.local_data.role = data.row.roleName?.split(',');
      this.local_data.client = data.row.clientName?.split(',');
      this.local_data.application = data.row.applicationName?.split(',');
    }

  }
  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });

  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}

