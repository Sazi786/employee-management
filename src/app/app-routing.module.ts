import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import{ LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

import { RoleComponent } from './role/role.component';
import { ClientComponent } from './client/client.component';
import { UserComponent } from './user/user.component';
import { ApplicationComponent } from './application/application.component';
import {ManagePermissionComponent} from './managePermission/managePermission.component';

import { FeatureComponent } from './feature/feature.component';
import { AuditscanComponent } from './auditscan/auditscan.component';
import { ResetPasswordComponent } from './login/resetPassword';
import{ReportAuditScanComponent} from './report-for-audit-scan/report-for-audit-scan.component';
import { TagSureComponent } from './tag-sure/tag-sure.component';
import { SchedularComponent } from './schedular/schedular.component';
import { UserJourneyComponent } from './user-journey/user-journey.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
 {path: "", redirectTo: "/wecaast/user", pathMatch: "full" },
 {path: 'wecaast/user/error', component: ErrorComponent},
  {path: '', component: EmployeeComponent},
  {path: 'wecaast/user/userpage', component: LoginComponent},
  {path: 'wecaast/user/login', component: LoginComponent},
  {path: 'wecaast/user/welcome', component: LoginComponent},
  {path: 'wecaast/scan/seedUrlFunction', component: AuditscanComponent},
  //{path: 'wecaast/auditscan', component: AuditscanComponent},
  {path: 'user/managePermission', component: ManagePermissionComponent},
  {path: 'wecaast/scan/savefile', component: AuditscanComponent}, 
 // {path:'wecaast/scan/auditscan/reportAuditScan',component:ReportAuditScanComponent},
  {path:'wecaast/user/login/resetPassword',component:ResetPasswordComponent},

  {path:"wecaast/scan",component:TagSureComponent, children:[
    {
      path: 'auditscan',
      component: AuditscanComponent
    },
    {
      path: 'auditscan/reportAuditScan',
      component: ReportAuditScanComponent
    },
    

    {
      path: 'schedular',
      component: SchedularComponent
    },
    {
      path: 'Create_Journey',
      component: UserJourneyComponent
    },
    {
      path: 'Dashboard',
      component: DashboardComponent
    },
  ]},


  {path:"wecaast/user",component:AdminComponent, children:[
    {
      path: 'role',
      component: RoleComponent
    },
    {
      path: 'client',
      component: ClientComponent
    },
    {
      path: 'adduser',
      component: UserComponent
    },
    {
      path: 'application',
      component: ApplicationComponent
    },
    {
      path: 'feature',
      component: FeatureComponent
    },
    {
      path: 'adduser/managePermission',
      component: ManagePermissionComponent
    },
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }