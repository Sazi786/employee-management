import { Observable } from "rxjs";
import { Component, OnInit } from '@angular/core';

import { HttpClientService, UserRequest } from '../service/http-client.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees:  Observable<UserRequest[]>;
   
  constructor(
    private httpClientService:HttpClientService, private router: Router
  ) { }




  ngOnInit() {
    this.httpClientService.getUserRequestList().subscribe(
     response =>this.handleSuccessfulResponse(response),
    );
  }

handleSuccessfulResponse(response)
{
    this.employees=response;
}

}