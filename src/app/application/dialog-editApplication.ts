import { Component, Optional,Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface applicationData {
  applicationId: number;
  applicationName: string;
  active:number;
clientName:string;
clientId:any;
} 

@Component({
    selector: 'dialog-editApplication',
    templateUrl: 'dialog-editApplication.html',
    styleUrls: ['./application.component.css']
  })

 

  export class DialogEditApplication {
  
    action:string;
    local_data:any;
    drpClient: any;
    
   
  
    constructor(
      public dialogRef: MatDialogRef<DialogEditApplication>,
      //@Optional() is used to prevent error if no data is passed
      @Optional() @Inject(MAT_DIALOG_DATA) public data) {
      console.log(data);
      if(data){
      
        this.local_data=data.row;
        this.action = this.local_data.action;
        this.drpClient=data.clientName;
        
      }
      // this.local_data =data
      
    }
    doAction(){
      this.dialogRef.close({event:this.action,data:this.local_data});
      
    }
  
    closeDialog(){
      this.dialogRef.close({event:'Cancel'});
    }
  
  }
  

