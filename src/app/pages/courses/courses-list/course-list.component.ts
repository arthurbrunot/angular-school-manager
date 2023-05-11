import { Component, OnInit } from "@angular/core"
import { CourseService } from "../../../shared/services/crud/course.service"
import { Course, Professor } from "../../../shared/types/types"
import { ToastrService } from "ngx-toastr"
import { ProfessorService } from "../../../shared/services/crud/professor.service"

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
})
export class CourseListComponent implements OnInit {
  constructor(
    public courseApi: CourseService,
    public professorApi: ProfessorService,
    public toastr: ToastrService,
  ) { }

  p: number = 1
  Course: Course[]
  hideWhenNoCourse: boolean = false
  noData: boolean = false
  preLoader: boolean = true

  ngOnInit() {
    this.dataState()
    const s = this.courseApi.GetCoursesList()
    s.snapshotChanges().subscribe(data => {
      this.Course = []
      data.forEach(item => {
        const a = item.payload.toJSON() as Course

        this.professorApi.GetProfessor(a.professorId).snapshotChanges().subscribe(data => {
          const professorName = data.payload.toJSON() as Professor
          a.professorId = professorName.firstName + " " + professorName.lastName
        })

        if (item.key != null) {
          a["$key"] = item.key
        }
        this.Course.push(a as Course)
      })
    })
  }
  dataState() {
    this.courseApi.GetCoursesList().valueChanges().subscribe(data => {
      this.preLoader = false
      if (data.length <= 0) {
        this.hideWhenNoCourse = false
        this.noData = true
      } else {
        this.hideWhenNoCourse = true
        this.noData = false
      }
    })
  }
  deleteCourse(course: Course) {
    if (window.confirm("Etes-vous sûr de vouloir supprimer ce cours?")) {
      this.courseApi.DeleteCourse(course.$key)
      this.toastr.success(course.name + " successfully deleted!")
    }
  }
}
