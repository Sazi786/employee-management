import { Component, OnInit } from '@angular/core';
import { Restapi_auditScan_Service } from '../restapi_auditScan_Service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { analyzeAndValidateNgModules } from '@angular/compiler';



export interface AuditScanData {
  userName: String;
  projectName: String;
  selectScanOption: number;
  selectTagOption: number;
  pageDepth: number;
  pageUrl: String;
  txtPageURL: String;
  selectBrowser: number; 
  isAuthenticated:boolean;
 uploadFilePath:String; 
}




export interface ApplicationToFeature {
  applicationId: number;
  featureId: number;
  featureName: String;
  servicePath: String;
  featureSequence: number;


}


@Component({
  selector: 'app-auditscan',
  templateUrl: './auditscan.component.html',
  styleUrls: ['./auditscan.component.css'],
  template: `
    <div *ngIf="displayProgressSpinner; else spinner">
      
    </div>
    <ng-template #spinner>
      <spinner></spinner>
    </ng-template>
  `,
})
export class AuditscanComponent implements OnInit {

  formatLabel(value: number) {


    return value;
  }


  listStatus =[
    {name:'Chrome',value:1,checked:true},
    {name:'Mozilla',value:0,checked:false},
    {name:'IE',value:0,checked:false}
  ];


  form2: FormGroup;
  error: string;
  userId: number = 1;
  uploadResponse = { status: '', message: '', filePath: '' };
  title = 'File-Upload-Save';
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;

  userName: String;
  appdata: any;
  form: any = {};
  uploadPath:any;
  requestMapId:any;
  searchUrl:any;
  constructor(private service: Restapi_auditScan_Service, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {


    

    let resp=this.service.getRecentUrlSearch();
    resp.subscribe(data=>{
    console.log("getRecentUrlSearch::::::::",data)
    this.searchUrl=data;

    });

  }


 



  startScan() {
    console.log("UPLOAD FORM : " , this.form);
   this.userName = JSON.parse(sessionStorage.getItem('UserNameInSession'))
   this.form.uploadFilePath = this.uploadPath;
$('#overlay').fadeIn();
    let resp = this.service.startScan(this.form, this.userName).subscribe((result) => {
   
        
  
   // This code will be executed when the HTTP call returns successfully 
this.requestMapId=result;
this.requestMapId = sessionStorage.setItem('requestMapId', this.requestMapId);
console.log(this.requestMapId);

if(this.requestMapId!=0){
  $('#overlay').fadeOut();
  this.router.navigate(["wecaast/scan/auditscan/reportAuditScan"],this.requestMapId);
}

else{
  $('#overlay').fadeOut();
  this.router.navigate(["wecaast/scan/auditscan"]);
}


     }); 


    
  }
  
    upload() {
        let scanType = this.form.selectScanOption;
        if (scanType == "2") {
          this.currentFileUpload = this.selectedFiles.item(0);
          return this.service.pushFileToStorage(this.currentFileUpload).subscribe((result) => {
            console.log("resultresult : " , result);
          this.uploadPath = result;
          setTimeout(() => {
            this.startScan();
          }, 500);
    }); 

  } else {
          this.uploadPath = "URL_Based";
          setTimeout(() => {
            this.startScan();
          }, 500);
        }
      }
    

   selectFile(event) {
      this.selectedFiles = event.target.files;
      } 


  

}
