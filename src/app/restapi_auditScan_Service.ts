import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpEvent, HttpErrorResponse, HttpEventType,HttpRequest} from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Restapi_auditScan_Service {

  constructor(private http: HttpClient,private https: HttpClient,private router: Router) { }
  url = "http://localhost:8002/wecaast/scan";


   startScan(auditInput,userName){
        return this.http.post(`${this.url}/seedUrlFunction/`+userName,auditInput);
      } 


  getApplicationToFeature(applicationId:String): Observable<any> {
   
    return this.http.get(`${this.url}/getApplicationToFeature/`+applicationId);
  
  }


  downloadReportAuditScan(requestMapId): Observable<any>{
   
    return this.http.get(`${this.url}/downloadReportForAuditScan/`+requestMapId);
  }


  getRecentUrlSearch(){
    return this.http.get(`${this.url}/getRecentUrlSearch`);
  }


   pushFileToStorage(file:File): Observable<any> {
          const data: FormData = new FormData();
          data.append('file', file);
       
          console.log("DATAAAAAAAAA: " , data);
          return this.http.post('http://localhost:8002/wecaast/scan/savefile', data,{responseType:'text' as 'json'}
      );
    } 




}