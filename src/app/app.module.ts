import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { ResetPasswordComponent } from './login/resetPassword';

import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RestapiserviceService } from './restapiservice.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { RoleComponent } from './role/role.component';
import {ClientComponent } from './client/client.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { DialogEdit } from './role/dialog-edit';
import { DialogEditClient } from './client/dialog-editClient';
import { DialogEditUser } from './user/dialog-editUser';
import { DialogOpen } from './login/dialogOpen';
import { UserComponent } from './user/user.component';
import { ApplicationComponent } from './application/application.component';
import { DialogEditApplication } from './application/dialog-editApplication';
import { ManagePermissionComponent } from './managePermission/managePermission.component';
import { FeatureComponent } from './feature/feature.component';
import { DialogEditFeature } from './feature/dialog-editFeature';
import { AuditscanComponent } from './auditscan/auditscan.component';
import { DialogEditHeader } from './header/dialog-editHeader';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuditScanHeaderComponent } from './audit-scan-header/audit-scan-header.component';
import { ReportAuditScanComponent } from './report-for-audit-scan/report-for-audit-scan.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { TagSureComponent } from './tag-sure/tag-sure.component';
import { SchedularComponent } from './schedular/schedular.component';
import { UserJourneyComponent } from './user-journey/user-journey.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NgWizardModule, NgWizardConfig } from 'ng-wizard';
import { ErrorComponent } from './error/error.component';

import {THEME} from 'ng-wizard';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.arrows
};


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,

    RoleComponent,
    ClientComponent,
    UserComponent,
    DialogEdit, 
    DialogEditClient, 
    DialogOpen,
    UserComponent,
    DialogEditUser, 
    ApplicationComponent,
    DialogEditApplication, 
    ManagePermissionComponent, FeatureComponent,DialogEditFeature, AuditscanComponent
  ,DialogEditHeader, AuditScanHeaderComponent,ResetPasswordComponent, ReportAuditScanComponent, TagSureComponent, SchedularComponent, UserJourneyComponent, DashboardComponent, ErrorComponent, 
  
  
    
    
  ],
  imports: [
    NgWizardModule.forRoot(ngWizardConfig),

    MatProgressSpinnerModule ,
    NgxBootstrapSliderModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
   
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
   
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule
    
  ],
  entryComponents: [
    DialogEdit,
    DialogEditClient,
    DialogEditUser,DialogEditApplication, DialogEditFeature,DialogOpen
  ],
  providers: [RestapiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }


