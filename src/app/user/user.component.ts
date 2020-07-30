import { Component, OnInit, ViewChild, ChangeDetectorRef, Optional, Inject } from '@angular/core';
import { RestapiserviceService } from '../restapiservice.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { DialogEditUser } from './dialog-editUser';
import { FormControl } from '@angular/forms';


interface Apps {
  name: string;

}

export interface userData {
  userId: number;
  userName: string;
  userFirstName: string;
  empLastName: string;
  userEmail: string;
  active: any;
  applicationName: string;
  applicationId: number;
  clientName: string;
  roleName: string;
  role: Array<any>;
  client: Array<any>;
  application:Array<any>;
}



@Component({
  selector: 'app-user',

  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  statusCheck: boolean;

  userId: any;
  userName: any
  applicationName: any;
  userEmail: any;
  clientName: any;
  roleName: any;
  users: userData[] = [];
  app: Apps[] = [];
  applicationname: any
  form: any = { active: 1, userName: '', userFirstName: '', empLastName: '', userEmail: '', application: '', client: '', role: '' };
  message: any
  listStatus = [
    { name: 'Active', value: 1, checked: true },
    { name: 'Inactive', value: 0, checked: false }
  ];

  displayedColumns: string[] = ['userId', 'userName', 'userFirstName', 'empLastName', 'userEmail', 'applicationName', 'clientName', 'roleName', 'active', 'action', 'permission'];
  dataSource = new MatTableDataSource(this.users);

  role_name: any
  clientname: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  table: MatTable<any>



  userEmailInvalid: boolean
  userNameInvalid: boolean
  applicationNameInvalid: boolean
  roleInvalid: boolean
  clientNameInvalid: boolean
  userFirstNameInvalid: boolean
  empLastNameInvalid: boolean


  constructor(private service: RestapiserviceService, private router: Router, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.users);





    this.service.getApplicationName().subscribe(result => {
      this.applicationname = result;

    }, error => console.error(error));

    this.service.getClientName().subscribe(result => {
      this.clientname = result;
    }, error => console.error(error));

    this.service.getRoleName().subscribe(result => {
      this.role_name = result;
    }, error => console.error(error));

    this.service.getUserData().subscribe(
      data => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
        sessionStorage.setItem('UserDataInSession', JSON.stringify(this.users));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        sessionStorage.setItem('ROLE_NAME_MAPPING_in_Session', JSON.stringify(this.users));
      }
    );
  }

  doSaveUser() {
    if (this.ValidateForm()) {
      let resp = this.service.doSaveUser(this.form, { observe: 'response' }).subscribe((response: any) => {

        if (response === 200) {
          const dialogRef = this.dialog.open(DialogClose, {
            width: '250px',

          });

        } else {

          this.message = 'Details not saved successfully';

        }
      }

      );
    }
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  editUser(action, obj) {
    obj.action = action;
    let params = {
      row: obj,
      applicationName: this.applicationname,
      clientName: this.clientname,
      role: this.role_name,
      
    };
    const dialogRef = this.dialog.open(DialogEditUser, {
      width: '250px',
      data: params,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateRow(result.data);
      //let resp = this.service.doEditRole(result.data);
    })
  }

  editPermission(action, obj) {

    this.router.navigateByUrl('wecaast/user/adduser/managePermission', { state: { obj } });
    this.userName = sessionStorage.setItem('SessionUserName', obj.userName);
    this.applicationName = sessionStorage.setItem('SessionApplicationName', obj.applicationName);
    this.userEmail = sessionStorage.setItem('SessionUserEmail', obj.userEmail);
    this.clientName = sessionStorage.setItem('SessionClientName', obj.clientName);
    this.roleName = sessionStorage.setItem('SessionRoleName', obj.roleName);
    this.userId = sessionStorage.setItem('SessionUserId', obj.userId);
  }


  updateRow(row_obj) {


    this.dataSource.data.filter((value, key) => {
      if (value.userId == row_obj.userId) {
        value.userName = row_obj.userName;
        value.userFirstName = row_obj.userFirstName;
        value.empLastName = row_obj.empLastName;
        value.userEmail = row_obj.userEmail;
        value.active = row_obj.active;
        value.applicationName = row_obj.applicationName;
        value.clientName = row_obj.clientName;
        value.roleName = row_obj.roleName;

      }

      return true;

    });

    let resp = this.service.doEditUser(row_obj);


  }


  ValidateForm() {
    let _isValid = true;
    this.userFirstNameInvalid = (!this.form.userFirstName || this.form.userFirstName == '')
    this.empLastNameInvalid = (!this.form.empLastName || this.form.empLastName == '')
    this.userEmailInvalid = (!this.form.userEmail || this.form.userEmail == '')
    this.userNameInvalid = (!this.form.userName || this.form.userName == '')
    this.applicationNameInvalid = (!this.form.application || this.form.application == '')
    this.roleInvalid = (!this.form.role || this.form.role == '')
    this.clientNameInvalid = (!this.form.client || this.form.client == '')

    if (this.userFirstNameInvalid || this.empLastNameInvalid || this.userEmailInvalid || this.userNameInvalid || this.applicationNameInvalid || this.roleInvalid || this.clientNameInvalid) {
      _isValid = false;
    }

    return _isValid;

  }

}


@Component({
  selector: 'dialog-open',
  templateUrl: 'dialog-open.html',
})
export class DialogClose {

  constructor(
    public dialogRef: MatDialogRef<DialogClose>) { }


  close() {
    this.dialogRef.close();
  }

}
