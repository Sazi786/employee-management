import { Component, OnInit } from '@angular/core';

import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';




@Component({
  selector: 'app-user-journey',
  templateUrl: './user-journey.component.html',
  styleUrls: ['./user-journey.component.css']
})
export class UserJourneyComponent implements OnInit {

  form: any = {}

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        { 
          text: 'Submit', 
          class: 'btn btn-info', 
          event: () => { 

console.log(this.form)

          alert("Finished!!!"+this.form.journeyName); 
        } 
      },
        {
          text: 'Reset',
          class: 'btn btn-danger',
          event: () => {

            this.form.reset();
            this.resetWizard();
          }
        }
      ]
    }
  };
 
  constructor(private ngWizardService: NgWizardService) {
  }
 
  ngOnInit() {
  }
 
  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }
 
  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }
 
  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }
 
  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }
 
  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }


  
}
