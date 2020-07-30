import { Component, Optional,Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface roleData {

    roleName: string;
    roleId: number;
    active: number;
    Action:string;

}

@Component({
    selector: 'dialog-edit',
    templateUrl: 'dialog-edit.html',
    styleUrls: ['./role.component.css']
  })

 

  export class DialogEdit {
  
    action:string;
    local_data:any;
  
    constructor(
      public dialogRef: MatDialogRef<DialogEdit>,
      //@Optional() is used to prevent error if no data is passed
      @Optional() @Inject(MAT_DIALOG_DATA) public data: roleData) {
      console.log(data);
      this.local_data =data
      this.action = this.local_data.action;
    }
    doAction(){
      this.dialogRef.close({event:this.action,data:this.local_data});
      
    }
  
    closeDialog(){
      this.dialogRef.close({event:'Cancel'});
    }
  
  }
  
  