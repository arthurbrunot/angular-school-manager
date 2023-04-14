import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { AngularFireModule } from "@angular/fire/compat"
import { AngularFireAuthModule } from "@angular/fire/compat/auth"
import { AngularFireStorageModule } from "@angular/fire/compat/storage"
import { AngularFirestoreModule } from "@angular/fire/compat/firestore"
import { AngularFireDatabaseModule } from "@angular/fire/compat/database"
import { environment } from "../environments/environment"
import { AddStudentComponent } from "./pages/students/add-student/add-student.component"
import { EditStudentComponent } from "./pages/students/edit-student/edit-student.component"
import { StudentListComponent } from "./pages/students/student-list/student-list.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { ToastrModule } from "ngx-toastr"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { NgxPaginationModule } from "ngx-pagination"
import { SignInComponent } from "./pages/auth/sign-in/sign-in.component"
import { SignUpComponent } from "./pages/auth/sign-up/sign-up.component"
import { ForgotPasswordComponent } from "./pages/auth/forgot-password/forgot-password.component"
import { VerifyEmailComponent } from "./pages/auth/verify-email/verify-email.component"
import { AuthService } from "./shared/services/auth/auth.service"
import { MainLayoutComponent } from "./components/layouts/main-layout.component"
import { ProfilComponent } from "./pages/profil/profil.component"
import { AddProfessorComponent } from "./pages/professors/add-professor/add-professor.component"
import { ProfessorListComponent } from "./pages/professors/professor-list/professor-list.component"
import { EditProfessorComponent } from "./pages/professors/edit-professor/edit-professor.component"
import { AddCourseComponent } from "./pages/courses/add-course/add-course.component"
import { EditCourseComponent } from "./pages/courses/edit-course/edit-course.component"
import { FullCalendarModule } from "@fullcalendar/angular"
import { PlanningComponent } from "./pages/planning/planning.component"
import { NgbModal, NgbModalModule } from "@ng-bootstrap/ng-bootstrap"
import { EventCreateModalComponent } from "./pages/planning/modal/event-modal.component"
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { CourseListComponent } from "./pages/courses/courses-list/course-list.component"
import { EventEditModalComponent } from "./pages/planning/modal/event-modal-edit.component"
@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    EditStudentComponent,
    StudentListComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    MainLayoutComponent,
    ProfilComponent,
    AddProfessorComponent,
    ProfessorListComponent,
    EditProfessorComponent,
    AddCourseComponent,
    CourseListComponent,
    EditCourseComponent,
    PlanningComponent,
    EventCreateModalComponent,
    EventEditModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    FullCalendarModule,
    NgbModalModule,
    FontAwesomeModule,
  ],
  providers: [ AuthService ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
