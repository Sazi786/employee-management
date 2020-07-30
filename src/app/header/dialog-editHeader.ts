import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestapiserviceService } from '../restapiservice.service';
//import { MustMatch } from './must-match.validator';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { CustomvalidationService } from './customValidationService';

export interface DialogData {
  userName: any;
  userPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'dialog-editHeader',
  templateUrl: 'dialog-editHeader.html',
  // styleUrls: ['./header.component.css']
})



export class DialogEditHeader implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  form: any = {};
  action: string;
  local_data: any;
  username: any;
  message:any;

  constructor(public service: RestapiserviceService, private formBuilder: FormBuilder,private router: Router, private customValidator: CustomvalidationService,
    public dialogRef: MatDialogRef<DialogEditHeader>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    //  this.local_data=data.newPassword
    //this.local_data=data.userPassword

  }


  ngOnInit() {
    this.username = JSON.parse(sessionStorage.getItem('UserNameInSession'));
   // this.username = history.state;

    this.registerForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', //[Validators.required, Validators.minLength(6)]],
      Validators.compose([Validators.required, this.customValidator.patternValidator()])],

      confirmPassword: ['', Validators.required],

    }, {
      validator: this.customValidator.MustMatch('newPassword', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log("FormControl Data", JSON.stringify(this.registerForm.value, null, 4))
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    

    let data = { username: this.username, password: this.registerForm.value }
    this.service.doChangePassword(data,{observe:'response'}).subscribe((response: any) => {

      if (response === 200) {
        this.message = 'Password Changed successfully';

        this.dialogRef.close();
        this.router.navigate(["wecaast/user/login"])
       

      } else {

        this.message = 'Old Password is wrong!';

      }
    }

    );
  
    
  }
   
  

 

  onNoClick(): void {
    this.dialogRef.close();
  }

}

