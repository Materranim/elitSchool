import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { InterfaceComponent } from './components/interface/interface.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AllProfessorsComponent } from './components/all-professors/all-professors.component';
import { AllStudentsComponent } from './components/all-students/all-students.component';
import { AdminClassesComponent } from './components/admin-classes/admin-classes.component';
import { TabClasseComponent } from './components/tab-classe/tab-classe.component';
import { AddMatieresComponent } from './components/add-matieres/add-matieres.component';
import { TabMatieresComponent } from './components/tab-matieres/tab-matieres.component';
import { AffectationTeacherComponent } from './components/affectation-teacher/affectation-teacher.component';
import { TeachersListComponent } from './components/teachers-list/teachers-list.component';
import { AffectationStudentComponent } from './components/affectation-student/affectation-student.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { NiveauxComponent } from './components/niveaux/niveaux.component';
import { LoginRoleComponent } from './components/login-role/login-role.component';
import { ContactComponent } from './components/contact/contact.component';
import { UnauthorizedPageComponent } from './components/unauthorized-page/unauthorized-page.component';
import { AuthGuard } from './services/services/auth.guard';

const routes: Routes = [
  {path:"",component:HomeComponent , data: { hideHeaderFooter: true }},
  {path:"interface",component:InterfaceComponent },
  {path:"header",component:HeaderComponent  },
  // {path:"Dashboard",component:DashboardComponent },
  {path:"signup",component:SignupComponent , data: { hideHeaderFooter: true } },
  {path:"login",component:LoginComponent , data: { hideHeaderFooter: true } },
  {path:"All-Professors",component:AllProfessorsComponent  , canActivate :[AuthGuard] ,  data:{role : 'admin'}},
  {path:"All-Students",component:AllStudentsComponent , canActivate :[AuthGuard] ,  data:{role : 'admin'}},
  {path:"admin-classes",component:AdminClassesComponent , canActivate :[AuthGuard] ,  data:{role : 'admin'}  },
  {path:"admin-classes/:id",component:AdminClassesComponent , canActivate :[AuthGuard] ,  data:{role : 'admin'}},
  {path:"tab-classe",component:TabClasseComponent  , canActivate :[AuthGuard] ,  data:{role : 'admin'}},
  {path:"add-matieres",component:AddMatieresComponent, canActivate :[AuthGuard] ,  data:{role : 'admin'} },
  {path:"add-matieres/:id",component:AddMatieresComponent , canActivate :[AuthGuard] ,  data:{role : 'admin'}},
  {path:"tab-matieres",component:TabMatieresComponent , canActivate :[AuthGuard] ,  data:{role : 'admin'} },
  {path:"affectation-teacher/:id",component:AffectationTeacherComponent, canActivate :[AuthGuard] ,  data:{role : 'admin'} },
  {path:"affectation-teacher/:id/edit",component:AffectationTeacherComponent ,canActivate :[AuthGuard] ,  data:{role : 'admin'} },
  {path:"teachers-list",component:TeachersListComponent , canActivate :[AuthGuard] ,  data:{role : 'admin'}},
  {path:"affectation-student/:id",component:AffectationStudentComponent  },
  {path:"add-cours",component:AddCoursComponent , canActivate :[AuthGuard] , data:{role : ['admin' , 'teacher']} },
  {path:"add-niveau",component:NiveauxComponent , canActivate :[AuthGuard] ,  data:{role : 'admin'} },
  {path:"login-role",component:LoginRoleComponent  , data: { hideHeaderFooter: true } },
  {path:"contact",component:ContactComponent  , data: { hideHeaderFooter: true } },
  {path:"unauthorized",component:UnauthorizedPageComponent  , data: { hideHeaderFooter: true } },






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
