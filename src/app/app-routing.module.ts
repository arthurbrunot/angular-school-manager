import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AddStudentComponent } from "./pages/students/add-student/add-student.component"
import { StudentListComponent } from "./pages/students/student-list/student-list.component"
import { EditStudentComponent } from "./pages/students/edit-student/edit-student.component"
import { SignInComponent } from "./pages/auth/sign-in/sign-in.component"
import { ForgotPasswordComponent } from "./pages/auth/forgot-password/forgot-password.component"
import { SignUpComponent } from "./pages/auth/sign-up/sign-up.component"
import { VerifyEmailComponent } from "./pages/auth/verify-email/verify-email.component"
import { ProfilComponent } from "./pages/profil/profil.component"
import { AuthGuard } from "./shared/services/auth/auth.guard"
import { AddProfessorComponent } from "./pages/professors/add-professor/add-professor.component"
import { ProfessorListComponent } from "./pages/professors/professor-list/professor-list.component"
import { EditProfessorComponent } from "./pages/professors/edit-professor/edit-professor.component"
import { AddCourseComponent } from "./pages/courses/add-course/add-course.component"
import { EditCourseComponent } from "./pages/courses/edit-course/edit-course.component"
import { PlanningComponent } from "./pages/planning/planning.component"
import { CourseListComponent } from "./pages/courses/courses-list/course-list.component"
const routes: Routes = [
  { path: "", redirectTo: "/sign-in", pathMatch: "full" },
  { path: "sign-in", component: SignInComponent },
  { path: "register-user", component: SignUpComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "verify-email-address", component: VerifyEmailComponent },
  { path: "register-student", component: AddStudentComponent, canActivate: [ AuthGuard ]  },
  { path: "view-students", component: StudentListComponent, canActivate: [ AuthGuard ]  },
  { path: "edit-student/:id", component: EditStudentComponent, canActivate: [ AuthGuard ]  },
  { path: "profil", component: ProfilComponent, canActivate: [ AuthGuard ]  },
  { path: "add-professor", component: AddProfessorComponent, canActivate: [ AuthGuard ]  },
  { path: "view-professors", component: ProfessorListComponent, canActivate: [ AuthGuard ]  },
  { path: "edit-professor/:id", component: EditProfessorComponent, canActivate: [ AuthGuard ]  },
  { path: "add-course", component: AddCourseComponent, canActivate: [ AuthGuard ]  },
  { path: "view-courses", component: CourseListComponent, canActivate: [ AuthGuard ]  },
  { path: "edit-course/:id", component: EditCourseComponent, canActivate: [ AuthGuard ]  },
  { path: "planning", component: PlanningComponent, canActivate: [ AuthGuard ]  },
]
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
