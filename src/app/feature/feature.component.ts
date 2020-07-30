import { Component, OnInit, ViewChild, AfterViewInit,Optional,Inject } from '@angular/core';
import { RestapiserviceService } from '../restapiservice.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource,MatTable} from '@angular/material/table';
import{DialogEditFeature} from './dialog-editFeature'
interface Apps {
  name: string;
 
}
export interface featureData {
  featureId: number;
  featureName: string;
  active:number;
applicationName:string;
applicationId:number
}


@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})

export class FeatureComponent implements OnInit {
  app: Apps[] = [];
  applicationname:any
  form: any = {active:1,featureName:'',applicationName:''};
  message: any
 features: featureData[] = [];
 listStatus =[
  {name:'Active',value:1,checked:true},
  {name:'Inactive',value:0,checked:false}
];
  displayedColumns: string[] = ['featureId', 'applicationName','featureName',  'active', 'action'];
  dataSource = new MatTableDataSource(this.features);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  table: MatTable<any>


  featureNameInvalid:boolean
  applicationNameInvalid:boolean

  constructor(private service: RestapiserviceService,private router:Router,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.service.getApplicationName().subscribe(result => {
      this.applicationname = result;
      console.log("ApplicationName::"+JSON.stringify(this.applicationname))
    }, 
    error => console.error(error));

    this.service.getFeatureData().subscribe(
      data => {
        this.features = data;
        this.dataSource = new MatTableDataSource(this.features);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("getFeatureData" + JSON.stringify(data))
      }
    );
  }

  doSaveFeature(){
    if(this.ValidateForm()){
    let resp = this.service.doSaveFeature(this.form,{observe:'response'}).subscribe((response: any) => {

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
   // this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  

  editFeature(action, obj) {
    
    obj.action = action;
    let params = {
      row: obj,
      applicationName: this.applicationname
    };
    const dialogRef = this.dialog.open(DialogEditFeature, {
      width: '250px',
      data: params,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateRow(result.data);
      //let resp = this.service.doEditRole(result.data);
    })
  }
  updateRow(row_obj) {

  this.dataSource.data.filter((value, key) => {
      if (value.featureId == row_obj.featureId) {
        value.featureName = row_obj.featureName;
        value.active = row_obj.active;

      }

      return true;

    });
    let resp = this.service.doEditFeature(row_obj);

  }

  ValidateForm() {
    let _isValid = true;
    this.applicationNameInvalid = (!this.form.applicationName || this.form.applicationName == '')
    this.featureNameInvalid = (!this.form.featureName || this.form.featureName == '')
    
    if (this.applicationNameInvalid || this.featureNameInvalid) {
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
    public dialogRef: MatDialogRef<DialogClose>){}
   

   close() {
    this.dialogRef.close();
  }

}