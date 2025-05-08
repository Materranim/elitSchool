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
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { DashboardStudentProfComponent } from './components/dashboard-student-prof/dashboard-student-prof.component';
import { CoursComponent } from './components/cours/cours.component';
import { CoursEtudiantComponent } from './components/cours-etudiant/cours-etudiant.component';
import { DashboardProfComponent } from './components/dashboard-prof/dashboard-prof.component';
import { ProfStudentComponent } from './components/prof-student/prof-student.component';
import { NoteStudentComponent } from './components/note-student/note-student.component';
import { NotesComponent } from './components/notes/notes.component';
import { DashboardParentComponent } from './components/dashboard-parent/dashboard-parent.component';
import { NoteParentComponent } from './components/note-parent/note-parent.component';
import { ReclamationParentComponent } from './components/reclamation-parent/reclamation-parent.component';
import { TabReclamationComponent } from './components/tab-reclamation/tab-reclamation.component';
import { AddEmploiComponent } from './components/add-emploi/add-emploi.component';
import { EmploiStudentComponent } from './components/emploi-student/emploi-student.component';
import { EmploiParentComponent } from './components/emploi-parent/emploi-parent.component';

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
  {path:"note-student/:id/:matiereId",component:NoteStudentComponent  },
  {path:"add-cours",component:AddCoursComponent , canActivate :[AuthGuard] , data:{role : ['admin' , 'teacher']} },
  {path:"cours",component:CoursComponent , canActivate :[AuthGuard] , data: {role : 'teacher'}  },
  {path:"add-niveau",component:NiveauxComponent , canActivate :[AuthGuard] ,  data:{role : 'admin'} },
  {path:"login-role",component:LoginRoleComponent  , data: { hideHeaderFooter: true } },
  {path:"contact",component:ContactComponent  , data: { hideHeaderFooter: true } },
  {path:"unauthorized",component:UnauthorizedPageComponent  , data: { hideHeaderFooter: true } },
  {path:"dashboard-student",component:DashboardStudentComponent , canActivate :[AuthGuard] , data: {role : 'student'} },
  {path:"dashboard-studentProf",component:DashboardStudentProfComponent , canActivate :[AuthGuard] , data: {role : 'student'} },
  {path:"cours-student",component:CoursEtudiantComponent , canActivate :[AuthGuard] , data: {role : 'student'} },
  {path:"dashboard-prof",component:DashboardProfComponent , canActivate :[AuthGuard] , data: {role : 'teacher'} },
  {path:"profStudent",component:ProfStudentComponent , canActivate :[AuthGuard] , data: {role : 'teacher'} },
  {path:"notes",component:NotesComponent , canActivate :[AuthGuard] , data: {role : 'student'} },
  {path:"dashboard-parent",component:DashboardParentComponent , canActivate :[AuthGuard] , data: {role : 'parent'} },
  {path:"note-parent",component:NoteParentComponent , canActivate :[AuthGuard] , data: {role : 'parent'} },
  {path:"reclamation-parent",component:ReclamationParentComponent , canActivate :[AuthGuard] , data: {role : 'parent'} },
  {path:"reclamation-admin",component:TabReclamationComponent , canActivate :[AuthGuard] , data: {role : 'admin'} },
  {path:"emploi-admin",component:AddEmploiComponent , canActivate :[AuthGuard] , data: {role : 'admin'} },
  {path:"emploi-student",component:EmploiStudentComponent , canActivate :[AuthGuard] , data: {role : 'student'} },
  {path:"emploi-parent",component:EmploiParentComponent , canActivate :[AuthGuard] , data: {role : 'parent'} },








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
