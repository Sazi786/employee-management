import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpEvent,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestapiserviceService {

  isPasswordEnter = false;
  isPasswordFailed = false;
  errorMessage = 'Bad Credentials';
  message:any;

  constructor(private http: HttpClient) { }
  url = "http://localhost:8000/wecaast/user";



  login(credentials): Observable<any> {

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password) });
    return this.http.get(`${this.url}/login`, { headers, responseType: 'text' as 'json' })
  }

  doChangePassword(paswdData,response:any){

    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(paswdData.username.obj.username + ':' + paswdData.password) });
    const data= {userName:paswdData.username,userPassword:paswdData.password.oldPassword,newPassword:paswdData.password.newPassword};
    return this.http.put(`${this.url}/changePassword`, data)
         
         

      

  }
  getClientName(): Observable<any> {

    return this.http.get(`${this.url}/getClientByActive`);

  }
  getApplicationName(): Observable<any> {

    return this.http.get(`${this.url}/getApplicationByActive`);

  }

  doSaveRole(roleData: any,response:any) {
    return this.http.post(`${this.url}/createRole`, roleData)
          
  }
  doSaveUser(userData: string,response:any) {


    return this.http.post(`${this.url}/createUser`, userData);
  }
  doSaveApplication(applicationData: string,response:any) {


    return this.http.post(`${this.url}/createApplication`, applicationData);
  }
  doSaveFeature(featureData: string,response:any) {


    return this.http.post(`${this.url}/createFeatures`, featureData);
  }


  doEditRole(row_obj: any) {


    return this.http.put(`${this.url}/editRole`, row_obj).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
  doEditFeature(row_obj: any) {


    return this.http.put(`${this.url}/editFeatures`, row_obj).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  doEditApplication(row_obj: any) {


    return this.http.put(`${this.url}/editApplication`, row_obj).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  doEditClient(row_obj: any) {


    return this.http.put(`${this.url}/editClient`, row_obj).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
  doEditUser(row_obj: any) {


    return this.http.put(`${this.url}/editUser`, row_obj).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  getRoleData(): Observable<any> {

    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password) });
    return this.http.get(`${this.url}/getRole`);

  }

  getUserData(): Observable<any> {

    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password) });
    return this.http.get(`${this.url}/getuser`);

  }

  getApplicationData(): Observable<any> {

    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password) });
    return this.http.get(`${this.url}/getApplication`);

  }
  getFeatureData(): Observable<any> {

    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password) });
    return this.http.get(`${this.url}/getFeatures`);

  }
  getRoleByUserId(userName){

    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password) });
    return this.http.get(`${this.url}/getRoleByUserId/`+userName);

  }
  
  doSaveClient(client: string,response:any) {
    //const body = {clientname: clientName, domainname: domain,clientlogo:clientLogo};

    return this.http.post(`${this.url}/createClient`,client);
  }


  // pushFileToStorage(file:File): Observable<HttpEvent<{}>> {
  //         const data: FormData = new FormData();
  //         data.append('file', file);
  //      
  //         console.log("DATAAAAAAAAA: " , data);
  //         const newRequest = new HttpRequest('POST', 'http://localhost:8000/wecaast/user/savefile', data, {
  //        // reportProgress: true,
  //        // responseType: 'json'
  //         });
  //         return this.http.request(newRequest);
  //         } 

  debugger
    pushFileToStorage(file:File): Observable<any> {
       const data: FormData = new FormData();
          data.append('file', file);
       
          console.log("DATAAAAAAAAA: " , data);
      return this.http.post('http://localhost:8000/wecaast/user/savefile', data,{responseType:'text' as 'json'});
    }


  getClientData(): Observable<any> {

    return this.http.get(`${this.url}/getClient`);

  }

  doSaveUserFeatureData(columnData){
    return this.http.post(`${this.url}/createUserFeatureMapping`, columnData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  getUserFeatureMapping(username): Observable<any> {

    return this.http.get(`${this.url}/getUserFeatureMapping/`+username);

  }
  
  getRoleName(): Observable<any> {

    return this.http.get(`${this.url}/getRoleByStatus`);

  }

  getApplicationTaggedToUser(username:String):Observable<any> {

    return this.http.get(`${this.url}/getApplicationTaggedToUser/`+username);

  }



/*********** 21 May ***********/


getUserToApplication(username:String): Observable<any> {

  return this.http.get(`${this.url}/getUserToApplication/`+username);

}


captchaLogo(): Observable<any> {
  return this.http.get(`${this.url}/getCaptcha`,{responseType: 'text' as 'json' });
}

forgotPasswordEmail(emailId){
  debugger
  return this.http.post(`${this.url}/forgotPassword/`+emailId, emailId).subscribe(
    (response) => console.log(response),
    (error) => console.log(error)
  );
}



}



