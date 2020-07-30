import { Component, Optional,Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface featureData {

  featureName: string;
  featureId: number;
    active: number;
   
    applicationName:any
applicationId:any;
}

@Component({
    selector: 'dialog-editFeature',
    templateUrl: 'dialog-editFeature.html',
    styleUrls: ['./feature.component.css']
  })

 

  export class DialogEditFeature {
  
    action:string;
    local_data:any;
    drpApplication:any;
    
    constructor(
      public dialogRef: MatDialogRef<DialogEditFeature>,
      //@Optional() is used to prevent error if no data is passed
      @Optional() @Inject(MAT_DIALOG_DATA) public data) {
      console.log(data);
      if(data){
        this.local_data =data.row
        this.action = this.local_data.action;
        this.drpApplication=data.applicationName;
      }
      
    }
    doAction(){
      this.dialogRef.close({event:this.action,data:this.local_data});
      
    }
  
    closeDialog(){
      this.dialogRef.close({event:'Cancel'});
    }
  
  }
  
  
