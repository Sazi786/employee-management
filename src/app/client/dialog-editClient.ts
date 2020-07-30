import { Component, Optional, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormBuilder, FormGroup } from '@angular/forms';
import { RestapiserviceService } from '../restapiservice.service';

export interface clientData {
  clientId: number;
  clientName: string;
  clientIndustry: string;
  active: number;
  clientLogo: any;
}

@Component({
  selector: 'dialog-edit',
  templateUrl: 'dialog-edit.html',
  styleUrls: ['./client.component.css']
})



export class DialogEditClient {

  action: string;
  local_data: any;
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
  logo: any;
  clientLogo: any;

  constructor(
    public dialogRef: MatDialogRef<DialogEditClient>, private service: RestapiserviceService,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: clientData) {
    console.log(data);
    this.local_data = data;
    this.action = this.local_data.action;

    this.logo = this.currentFileUpload;
  }
  doAction() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);

    console.log("this.selectedFiles : ", this.currentFileUpload);


    debugger
    this.service.pushFileToStorage(this.currentFileUpload).subscribe(result => {
      console.log("LOGOPATHEDIT::", result);
      if (result) {
      this.currentFileUpload = result;
      this.local_data.clientLogo=result;
      }
      this.dialogRef.close({ event: this.action, data: this.local_data, logo: this.currentFileUpload });
    });

  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  selectFile(event) {
    //Select File
    this.selectedFiles = event.target.files;
  }
  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);

    console.log("this.selectedFiles : ", this.currentFileUpload);



    this.service.pushFileToStorage(this.currentFileUpload).subscribe(event => {

    }
    );
  }

}

