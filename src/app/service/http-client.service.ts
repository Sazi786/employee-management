import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class UserRequest{

  //private baseUrl = '/wecaast/user';

  userId:string;
   userName:string;
   userEmail:string;
     
  constructor(
    private _userId:string,
    public _userName:string,
    private _userEmail:string
   
  ) {
	   this.userId = _userId;
       this.userName = _userName;
	   this.userEmail = _userEmail;
      
  }
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  url = 'http://localhost:8000/wecaast/user/getName';  

  constructor(private http:HttpClient) { }

 getUserRequestList(): Observable<UserRequest[]> {  
  var response = this.http.get<UserRequest[]>(this.url);  
  console.log("DATA:", response);
  return response;
}  
}