import { Component, OnInit } from '@angular/core';
import { Restapi_auditScan_Service } from '../restapi_auditScan_Service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-for-audit-scan',
  templateUrl: './report-for-audit-scan.component.html',
  styleUrls: ['./report-for-audit-scan.component.css']
})
export class ReportAuditScanComponent implements OnInit {

  requestMapId:any;
  constructor(private service: Restapi_auditScan_Service, private router: Router) { }

  ngOnInit(): void {

    this.requestMapId= sessionStorage.getItem('requestMapId');

  }

  downloadReport(){
    debugger
    let resp = this.service.downloadReportAuditScan(this.requestMapId);
    
    resp.subscribe(result=>{
     
      console.log(" REPORRRRRRTTTTTTTTTTTTTT::::::: : ",result)
      // setTimeout(() => {
      //   this.loading=false;
      // }, 500);
    })
    
    
   
  }

}
