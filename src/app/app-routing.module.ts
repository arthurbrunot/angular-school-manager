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
  { path: "", pathMatch: "full", redirectTo: "/sign-in" },
  { component: SignInComponent, path: "sign-in" },
  { component: SignUpComponent, path: "register-user" },
  { component: ForgotPasswordComponent, path: "forgot-password" },
  { component: VerifyEmailComponent, path: "verify-email-address" },
  { canActivate: [ AuthGuard ], component: AddStudentComponent, path: "register-student"  },
  { canActivate: [ AuthGuard ], component: StudentListComponent, path: "view-students"  },
  { canActivate: [ AuthGuard ], component: EditStudentComponent, path: "edit-student/:id"  },
  { canActivate: [ AuthGuard ], component: ProfilComponent, path: "profil"  },
  { canActivate: [ AuthGuard ], component: AddProfessorComponent, path: "add-professor"  },
  { canActivate: [ AuthGuard ], component: ProfessorListComponent, path: "view-professors"  },
  { canActivate: [ AuthGuard ], component: EditProfessorComponent, path: "edit-professor/:id"  },
  { canActivate: [ AuthGuard ], component: AddCourseComponent, path: "add-course"  },
  { canActivate: [ AuthGuard ], component: CourseListComponent, path: "view-courses"  },
  { canActivate: [ AuthGuard ], component: EditCourseComponent, path: "edit-course/:id"  },
  { canActivate: [ AuthGuard ], component: PlanningComponent, path: "planning"  },
]
@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
