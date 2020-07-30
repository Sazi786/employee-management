import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import {DialogEditHeader} from './dialog-editHeader';
import { RestapiserviceService } from '../restapiservice.service';






export interface UserToApplication {
  applicationId: number;
  applicationName: string;
  servicePath: string;
  appSequence: number;
 
}





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  oldPassword: string;
  newPassword: string;
  role;
  data;
 paswdData;
username:string;
appdata:any;
showMenu:Boolean
  constructor(private router:Router,public dialog: MatDialog,private service:RestapiserviceService) { }
  local_data:any
  ngOnInit(): void {
    this.username = JSON.parse(sessionStorage.getItem('UserNameInSession'));
    let app =this.service.getUserToApplication(this.username);
    app.subscribe(result=>{
      this.appdata = JSON.parse(JSON.stringify(result));
      
      console.log("ApplicationName DATTATATTATTATATTA : ",this.appdata)
      console.log("ApllicationID:::",this.appdata[1].applicationId)
      // setTimeout(() => {
      //   this.loading=false;
      // }, 500);
    })

   

    this.local_data = history.state;
 // this.username=this.local_data.obj.username
    
    //sessionStorage.setItem('UserNameInSession',this.username)
    this.username = JSON.parse(sessionStorage.getItem('UserNameInSession'));
    
    console.log( this.username)
    this.role=JSON.parse(sessionStorage.getItem('ROLEInSession'));

    if(this.role=="ROLE_ADMIN"){
      this.showMenu=true;
    }
    
    console.log( "HEADER_ROLE::",this.role);




    /*********** 21 May ***********/


  // this.service.getUserToApplication(this.username).subscribe(
  // data => {
  //  console.log("MAPPING DATA : " , data);
  // }
  // );






  }
  applicationId:any;

  getApp(apps){

    this.applicationId=sessionStorage.setItem('applicationIdInSession',JSON.stringify(apps.applicationId))
    console.log(JSON.parse(sessionStorage.getItem('applicationIdInSession')));
  }
 
  doChangePassword(): void {
    const dialogRef = this.dialog.open(DialogEditHeader, {
      width: '250px',
      data: {oldPassword: this.oldPassword, newPassword: this.newPassword}
    });
    dialogRef.afterClosed().subscribe(result => {
     //this.oldPassword=result
      this.newPassword = result;
 // this.paswdData ={getUsername:this.username,getNewPassword:this.newPassword,getOldPassword:this.oldPassword};


    //  let resp=this.service.doChangePassword(this.paswdData);
      console.log('Newpaswd::',this.newPassword);
      console.log('old::',this.oldPassword)
      console.log('user::',this.username)
    });
  
  } 

  doLogout(){
    sessionStorage.clear();
    this.username = JSON.parse(sessionStorage.getItem('UserNameInSession'));
    this.router.navigate(["wecaast/user/login"])
  }




 





}



