import { Component, OnInit,ViewChild } from '@angular/core';
import { RestapiserviceService } from '../restapiservice.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import {MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource,MatTable} from '@angular/material/table';
import {DialogEditClient} from './dialog-editClient';


import { FormBuilder, FormGroup } from '@angular/forms';

export interface clientData {
  clientId: number;
  clientName: string;
  clientIndustry: string;
  clientLogo: string;
  active: number;
  uploadFilePath:String; 

}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

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
 uploadPath:any;
  
  client: clientData[] = [];
  form: any = { active: 1,clientName:'',clientIndustry:''};
  message: any
  listStatus =[
    {name:'Active',value:1,checked:true},
    {name:'Inactive',value:0,checked:false}
  ];

  displayedColumns: string[] = ['clientId', 'clientName','clientIndustry','imageUrl', 'active','action'];
  dataSource = new MatTableDataSource(this.client);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  table: MatTable<any>

  clientNameInvalid :boolean
  clientIndustryInvalid:boolean

  constructor(private service: RestapiserviceService,private router:Router,public dialog: MatDialog, private formBuilder: FormBuilder) { }

  selectFile(event) {
     //Select File
     this.selectedFiles = event.target.files;
   }


 

  ngOnInit(): void {
    // this.dataSource.sort = this.sort;
    this.service.getClientData().subscribe(
      data => {
        this.client = data;
        this.dataSource = new MatTableDataSource(this.client);
        this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
       console.log("GET_CLIENT::"+JSON.stringify(data))
      }
    );
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);

    console.log("this.selectedFiles : ", this.currentFileUpload);
    this.service.pushFileToStorage(this.currentFileUpload).subscribe(result => {
    console.log("LOGOPARH:",result)
    setTimeout(() => {
          this.doSaveClient();
        }, 500);

    });
  }

  doSaveClient(){

    if(this.ValidateForm()){
     
       this.form.uploadFilePath = this.uploadPath;
     
     let resp = this.service.doSaveClient(this.form,{observe:'response'})

    .subscribe((response: any) => {



      
      if (response === 200) {
        const dialogRef = this.dialog.open(DialogClose, {
          width: '250px',

        });

      } else {
alert("Client not saved successfully")
       // this.message = 'Client not saved successfully';

      }
    });
  }
  }
  
   // let tabl = this.service.getUser();
   
  
    /*resp.subscribe(data => {
      this.message = data;
      console.log(data);
    });*/
    ngAfterViewInit() {
     
    }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }


    editClient(action,obj){
      obj.action=action;
      const dialogRef = this.dialog.open(DialogEditClient, {
        width: '250px',
      data:obj
      });
      dialogRef.afterClosed().subscribe(result=>{
        this.updateRow(result.data);
        
        //let resp = this.service.doEditRole(result.data);
      })
    
      }
      
      updateRow(row_obj){
    
        this.dataSource.data.filter((value,key)=>{
          if(value.clientId == row_obj.clientId){
            value.clientName = row_obj.clientName;
            value.clientIndustry= row_obj.clientIndustry;
            value.clientLogo=row_obj.clientLogo;
            value.active = row_obj.active;
            
          }
          
          return true;
          
        });
        this.service.doEditClient(row_obj);
        
      }
      ValidateForm() {
        let _isValid = true;
    
        this.clientNameInvalid = (!this.form.clientName || this.form.clientName == '')
        this.clientIndustryInvalid = (!this.form.clientIndustry || this.form.clientIndustry == '')
    
        if (this.clientNameInvalid || this.clientIndustryInvalid) {
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