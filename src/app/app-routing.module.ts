import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { ViewStudentComponent } from './student/view-student/view-student.component';
const routes: Routes = [
  { path : '',component: StudentComponent },
  {path:'students',component:StudentComponent}
  ,{path:'students/:studentId',component:ViewStudentComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
