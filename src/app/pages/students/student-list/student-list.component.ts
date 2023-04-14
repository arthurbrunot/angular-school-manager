import { Component, OnInit } from "@angular/core"
import { StudentService } from "../../../shared/services/crud/student.service"
import { Student } from "../../../shared/services/crud/types"
import { ToastrService } from "ngx-toastr"

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
})
export class StudentListComponent implements OnInit {
  constructor(
    public crudApi: StudentService,
    public toastr: ToastrService,
  ) { }

  p: number = 1
  Student: Student[]
  hideWhenNoStudent: boolean = false
  noData: boolean = false
  preLoader: boolean = true

  ngOnInit() {
    this.dataState()
    const s = this.crudApi.GetStudentsList()
    s.snapshotChanges().subscribe(data => {
      this.Student = []
      data.forEach(item => {
        const a = item.payload.toJSON() as Student

        if (item.key != null) {
          a["$key"] = item.key
        }
        this.Student.push(a as Student)
      })
    })
  }
  dataState() {
    this.crudApi.GetStudentsList().valueChanges().subscribe(data => {
      this.preLoader = false
      if (data.length <= 0) {
        this.hideWhenNoStudent = false
        this.noData = true
      } else {
        this.hideWhenNoStudent = true
        this.noData = false
      }
    })
  }
  deleteStudent(student: Student) {
    if (window.confirm("Are sure you want to delete this student ?")) {
      this.crudApi.DeleteStudent(student.$key)
      this.toastr.success(student.firstName + " successfully deleted!")
    }
  }
}
