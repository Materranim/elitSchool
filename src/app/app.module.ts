import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { InterfaceComponent } from './components/interface/interface.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllProfessorsComponent } from './components/all-professors/all-professors.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AllStudentsComponent } from './components/all-students/all-students.component';
import { AdminClassesComponent } from './components/admin-classes/admin-classes.component';
import { TabClasseComponent } from './components/tab-classe/tab-classe.component';
import { AddMatieresComponent } from './components/add-matieres/add-matieres.component';
import { TabMatieresComponent } from './components/tab-matieres/tab-matieres.component';
import { AffectationTeacherComponent } from './components/affectation-teacher/affectation-teacher.component';
import { TeachersListComponent } from './components/teachers-list/teachers-list.component';
import { AffectationStudentComponent } from './components/affectation-student/affectation-student.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { CoursComponent } from './components/cours/cours.component';
import { NiveauxComponent } from './components/niveaux/niveaux.component';
import { LoginRoleComponent } from './components/login-role/login-role.component';
import { ContactComponent } from './components/contact/contact.component';
import { UnauthorizedPageComponent } from './components/unauthorized-page/unauthorized-page.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { DashboardStudentProfComponent } from './components/dashboard-student-prof/dashboard-student-prof.component';
import { ViewerPipe } from './pipes/viewer.pipe';
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



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    HomeComponent,
    InterfaceComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    AllProfessorsComponent,
    AllStudentsComponent,
    AdminClassesComponent,
    TabClasseComponent,
    AddMatieresComponent,
    TabMatieresComponent,
    AffectationTeacherComponent,
    TeachersListComponent,
    AffectationStudentComponent,
    AddCoursComponent,
    CoursComponent,
    NiveauxComponent,
    LoginRoleComponent,
    ContactComponent,
    UnauthorizedPageComponent,
    DashboardStudentComponent,
    DashboardStudentProfComponent,
    ViewerPipe,
    CoursEtudiantComponent,
    DashboardProfComponent,
    ProfStudentComponent,
    NoteStudentComponent,
    NotesComponent,
    DashboardParentComponent,
    NoteParentComponent,
    ReclamationParentComponent,
    TabReclamationComponent,
    AddEmploiComponent,
    EmploiStudentComponent,
    EmploiParentComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  //TDF
    ReactiveFormsModule, //Reactive Form
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    SweetAlert2Module.forRoot(),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
