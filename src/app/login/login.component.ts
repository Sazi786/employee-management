import { Component, OnInit } from '@angular/core';
import { RestapiserviceService } from '../restapiservice.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogOpen } from './dialogOpen';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imgCaptcha:any;
  captchaShow = false;
  hide = true;
  username: string;
  password: string;
  message: any
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = 'Bad Credentials';
  loginCounter = 1;
  counter: any;
  captchaStr: any;
  local_data:any;
  action:any;
  constructor(private service: RestapiserviceService, private router: Router,public dialog: MatDialog) { 
   // this.local_data =data;
   // this.action = this.local_data.action;
  }

  ngOnInit(): void {

    // console.log( sessionStorage.getItem('UserNameInSession'));
  }



  doLogin() {
    debugger;
    /* if(this.form.captchaText==this.imgCaptcha){
       console.log("EQUAL CAPTCH")
     }*/

    let resp = this.service.login(this.form);
    resp.subscribe(data => {
      this.message = data;
      console.log(data);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      sessionStorage.setItem('UserNameInSession', JSON.stringify(this.form.username))
      console.log(JSON.parse(sessionStorage.getItem('UserNameInSession')));

      sessionStorage.setItem('ROLEInSession', JSON.stringify(data))
      console.log("ROLENAME::", JSON.parse(sessionStorage.getItem('ROLEInSession')));

      if (data == "ROLE_ADMIN") {
        this.router.navigateByUrl('wecaast/user', { state: { obj: this.form } });

      }
      else if (data == "POC, ROLE_USER, SME") {
        this.router.navigate(["wecaast/user"]);

      }
      else if (data == "ROLE_USER") {
        this.router.navigate(["wecaast/user"]);

      }
      else if (data == "ROLE_USER, SME") {
        this.router.navigate(["wecaast/user"]);

      }
      else if (data == "POC, SME" || "SME, POC") {
        this.router.navigate(["wecaast/user"]);

      }
      else if (data == "SME") {
        this.router.navigate(["wecaast/user"]);

      }
      else if (data == "POC") {
        this.router.navigate(["wecaast/user"]);

      }
      else if (data == "POC, ROLE_USER") {
        this.router.navigate(["wecaast/user"]);

      }
      else{
        this.router.navigate(["wecaast/user/error"]);
      }
    },


      err => {

        this.errorMessage = "Username or Password is incorrect";
        this.isLoginFailed = true;
        //this.setLoginCounter(this.isLoginFailed);
        this.router.navigate(["wecaast/user/error"]);
      });



  }

  setLoginCounter(loginForm) {
    this.loginCounter = this.loginCounter + 1;
    localStorage.setItem('logCount', this.loginCounter.toString());

    if (this.loginCounter > 1) {
      //this.counter = 30 * (Math.pow(2, (this.loginCounter / 3) - 1));

      this.captchaLogo();
      this.captchaShow = true;
    }

  }


  captchaLogo() {

    this.service.captchaLogo().subscribe(data => {
      debugger;
      this.imgCaptcha=data

      this.captchaShow = true;
      //   this.captcha();

      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX : ",  event.preventDefault());

      event.preventDefault();

       console.log("Captcha", JSON.stringify(this.imgCaptcha));

    });
    return false;
     
  }

  
  forgotPassword(){
  
    const dialogRef = this.dialog.open(DialogOpen, {
      width: '250px',
     
    });
    dialogRef.afterClosed().subscribe(result => {
    
    })

   // this.router.navigate(["wecaast/user/login/resetPassword"])

  }

  
}