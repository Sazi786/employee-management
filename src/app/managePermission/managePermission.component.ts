import { Component, OnInit, Input, ViewChild, AfterViewInit, Optional, Inject } from '@angular/core';
import { RestapiserviceService } from '../restapiservice.service';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { Location } from '@angular/common';




export interface userData {

  userName: string;

}
interface Roles {
  roleName: string;

}
export class RoleFeature {
  featureId:number;
  roleId:number;
}

export class UserRoleMenus {
  userName: string;
  roleName: string;
  roleId: number;
  dyRows: Array<any>;
}

@Component({
  selector: 'app-managePermission',

  templateUrl: './managePermission.component.html',
  styleUrls: ['./managePermission.component.css']
})
export class ManagePermissionComponent implements OnInit {

  columns: any
  displayedColumns: any

  users: userData[] = [];

  local_data: any = {};
  userName: string;
  applicationName: string;
  userEmail: string;
  role: Roles[] = [];
  role_name: any = { userName: 'AAA' };
  clientName: string;
  roleName: string;
  featureData: any;
  username: string;
  checkBoxSelected: any;
  valueChecked: any;
  featureName: string;
  roleNamebyuserId: any;
  userId: any;

  //displayedColumns: string[] = ['userName', 'roleName','empLastName','userEmail'];
  // dataSource = new MatTableDataSource(this.role_name);
  listFeatureID: Array<RoleFeature> = new Array<RoleFeature>();

  listUserRoleMenus: Array<UserRoleMenus> = new Array<UserRoleMenus>();
  dataSource = new MatTableDataSource(this.listUserRoleMenus);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  table: MatTable<any>
  constructor(private service: RestapiserviceService, private router: Router, private location: Location) {
    //this.displaycolumndefs =this.role_name;


  }



  ngOnInit(): void {
   // this.local_data = history.state;
    this.userName = sessionStorage.getItem('SessionUserName');

    this.applicationName = sessionStorage.getItem('SessionApplicationName');
    this.userEmail = sessionStorage.getItem('SessionUserEmail');
    this.clientName =sessionStorage.getItem('SessionClientName');
    this.roleName = sessionStorage.getItem('SessionRoleName');



    //this is Api

    this.service.getRoleByUserId(this.userName).subscribe(
      data => {
        debugger;
        if (data) {
          this.roleNamebyuserId = data;

          this.roleNamebyuserId.forEach(roleItem => {
            let _userRoleMenus: UserRoleMenus = new UserRoleMenus();
            _userRoleMenus.userName = this.userName;
            _userRoleMenus.roleName = roleItem.roleName;
            _userRoleMenus.roleId = roleItem.roleId;
            _userRoleMenus.dyRows = new Array<any>();
            this.listUserRoleMenus.push(_userRoleMenus);
          });


        }
        this.BindFeatureData();
        console.log(this.roleNamebyuserId)
      }
    )










  }

  BindFeatureData() {
    this.service.getUserFeatureMapping(this.userName).subscribe(
      data => {
        debugger;
        this.listFeatureID = data;
        console.log(data);
        this.BindDataSource();

      }
    );

  }


  BindDataSource() {

    this.service.getFeatureData().subscribe(
      data => {

        this.featureData = data;
        //this.local_data = history.state;
        this.userName = sessionStorage.getItem('SessionUserName');

        this.userId = sessionStorage.getItem('SessionUserId');
       
        this.columns = [];
        this.columns.push({ columnDef: 'userName', columnId: 0, header: 'UserName', isCheckBox: false });
        this.columns.push({ columnDef: 'roleName', columnId: 0, header: 'Role', isCheckBox: false });
        data.map((a, e) => { return { columnDef: a.featureName, columnId: a.featureId, header: a.featureName, isCheckBox: true }; })
          .forEach(element => {
            this.columns.push(element);

          });


        this.listUserRoleMenus.forEach(x => {
          data.forEach(e => {
            debugger;

            var _markCheck = this.listFeatureID?.some((i) => (i.featureId ?? 0) == e.featureId && i.roleId == x.roleId);

            x.dyRows.push({ id: e.featureId, name: e.featureName, isChecked: _markCheck });
          });
        });

        this.dataSource.data = this.listUserRoleMenus;
      
        this.displayedColumns = this.columns.map(c => c.columnDef);

        console.log("getUserRoleFeatureData:::" + this.displayedColumns)
      }
    );
  }

  OnSave() {
    debugger;
    let columndata: any[] = [];

    var userName = this.userName;


    this.listUserRoleMenus.forEach(element => {
      var dyColumns = element.dyRows;

      var featureIdList = dyColumns
        .filter((x, i) => x.isChecked == true)
        .map((x, i) => { return x.id; });
      columndata.push({ userId: this.userId, roleId: element.roleId, featureIdList });
      console.log(columndata)

    });

    this.service.doSaveUserFeatureData(columndata);
  }
}
