import { Component, Optional,Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestapiserviceService } from '../restapiservice.service';
import { Router } from '@angular/router';

@Component({
    selector: 'dialogOpen',
    templateUrl: 'dialogOpen.html',
    styleUrls: ['../role/role.component.css']
  })


  
  export class DialogOpen {
    form: any = { emailId: '' };

    constructor(private service: RestapiserviceService, private router: Router,
        public dialogRef: MatDialogRef<DialogOpen>) {
        
      }

  doSubmit(){

    console.log("email::",this.form.emailId)

    this.service.forgotPasswordEmail(this.form.emailId);
    this.dialogRef.close({});
    
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}