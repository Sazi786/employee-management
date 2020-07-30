import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestapiserviceService } from '../restapiservice.service';
//import { MustMatch } from './must-match.validator';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { CustomvalidationService } from '../header/customValidationService';


export interface DialogData {
    userName: any;
   // userPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

@Component({
    selector: 'resetPassword',
    templateUrl: './resetPassword.html',
    styleUrls: ['./resetPassword.css']
  })

export class ResetPasswordComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;
  
    form: any = {};
    action: string;
    local_data: any;
    username: any;
    message:any;

    constructor(public service: RestapiserviceService, private formBuilder: FormBuilder,private router: Router, private customValidator: CustomvalidationService) { 
        // this.local_data =data;
        // this.action = this.local_data.action;
       }
     
       ngOnInit(): void {
     
        this.username = JSON.parse(sessionStorage.getItem('UserNameInSession'));
   // this.username = history.state;

    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      newPassword: ['', //[Validators.required, Validators.minLength(6)]],
      Validators.compose([Validators.required, this.customValidator.patternValidator()])],

      confirmPassword: ['', Validators.required],

    }, {
      validator: this.customValidator.MustMatch('newPassword', 'confirmPassword')
    });
       }


// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

resetPassword(){
    this.submitted = true;
    console.log("FormControl Data", JSON.stringify(this.registerForm.value, null, 4))
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    

    let data = { username: this.registerForm.value.userName, password: this.registerForm.value }
    this.service.doChangePassword(data,{observe:'response'}).subscribe((response: any) => {

      if (response === 200) {
        this.message = 'Password Changed successfully';

       // this.dialogRef.close();
        this.router.navigate(["wecaast/user/login"])
       

      } else {

        this.message = 'Password is wrong!';

      }
    }

    );
}

}