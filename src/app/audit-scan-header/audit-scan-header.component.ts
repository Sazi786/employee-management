import { Component, OnInit } from '@angular/core';
import { Restapi_auditScan_Service } from '../restapi_auditScan_Service';
import { Router } from '@angular/router';



export interface ApplicationToFeature {
  applicationId:number;
	featureId:number;
	 featureName:String;
	 servicePath:String;
	 featureSequence:number;
	
 
}


@Component({
  selector: 'app-audit-scan-header',
  templateUrl: './audit-scan-header.component.html',
  styleUrls: ['./audit-scan-header.component.css']
})
export class AuditScanHeaderComponent implements OnInit {
  userName: String;
  appdata:any;
  username:String;
  constructor(private service: Restapi_auditScan_Service, private router: Router) { }
  ngOnInit(): void {

    this.userName = JSON.parse(sessionStorage.getItem('UserNameInSession'));
    let applicationId=JSON.parse(sessionStorage.getItem('applicationIdInSession'));
     
    let app =this.service.getApplicationToFeature(applicationId);
    app.subscribe(result=>{
      this.appdata = JSON.parse(JSON.stringify(result));
      console.log("ApplicationName DATTATATTATTATATTA : ",this.appdata)
      // setTimeout(() => {
      //   this.loading=false;
      // }, 500);
    })

  }

  doLogout(){
    sessionStorage.clear();
    this.userName = JSON.parse(sessionStorage.getItem('UserNameInSession'));
    this.router.navigate(["wecaast/user/login"])
  }

}
