import { Component, OnInit, ViewChild, AfterViewInit, Optional, Inject } from '@angular/core';
import { RestapiserviceService } from '../restapiservice.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { DialogEdit } from './dialog-edit';

export interface roleData {

  roleName: string;
  roleId: number;
  active: number;
  Action: string;

}


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})

export class RoleComponent implements OnInit {


  form: any = { active: 1, roleName: '' };
  message: any
  users: roleData[] = [];
  displayedColumns: string[] = ['roleId', 'roleName', 'active', 'action'];
  dataSource = new MatTableDataSource(this.users);


  listStatus = [
    { name: 'Active', value: 1, checked: true },
    { name: 'Inactive', value: 0, checked: false }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  table: MatTable<any>

  //=============================================================

  roleNameInvalid: boolean;


  constructor(private service: RestapiserviceService, private router: Router, public dialog: MatDialog) { }

  onSubmit(form) {
    console.log(form.value)
  }
  ngOnInit(): void {


    this.service.getRoleData().subscribe(
      data => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        console.log("GETROLE" + JSON.stringify(data))
      }
    );
  }
  doSaveRole() {
    //this.form.valid
    debugger;
    if (this.ValidateForm()) {
      
      this.service.doSaveRole(this.form, { observe: 'response' })

        .subscribe((response: any) => {

          if (response === 200) {
            const dialogRef = this.dialog.open(DialogClose, {
              width: '250px',

            });

          } else {

            this.message = 'Role not saved successfully';

          }
        }

        );

    }

  }



  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  editValue(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogEdit, {
      width: '250px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateRow(result.data);
      //let resp = this.service.doEditRole(result.data);
    })
  }

  updateRow(row_obj) {

    this.dataSource.data.filter((value, key) => {
      if (value.roleId == row_obj.roleId) {
        value.roleName = row_obj.roleName;
        value.active = row_obj.active;

      }

      return true;

    });
    let resp = this.service.doEditRole(row_obj);

  }

  ValidateForm() {
    let _isValid = true;

    this.roleNameInvalid = (!this.form.roleName || this.form.roleName == '')

    if (this.roleNameInvalid) {
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

