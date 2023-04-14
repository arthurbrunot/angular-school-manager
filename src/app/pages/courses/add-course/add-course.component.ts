import { Component, OnInit } from "@angular/core"
import { CourseService } from "../../../shared/services/crud/course.service"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ToastrService } from "ngx-toastr"
import { Location } from "@angular/common"
import { ProfessorService } from "../../../shared/services/crud/professor.service"
import { Professor } from "../../../shared/services/crud/types"
@Component({
  selector: "app-add-course",
  templateUrl: "./add-course.component.html",
})
export class AddCourseComponent implements OnInit {
  public courseForm: FormGroup
  Professors: Professor[]

  constructor(
    public courseApi: CourseService,
    public professorApi: ProfessorService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private location: Location,
  ) {}
  ngOnInit() {
    this.courseApi.GetCoursesList()
    this.useCourseForm()
    const s = this.professorApi.GetProfessorsList()
    s.snapshotChanges().subscribe(data => {
      this.Professors = []
      data.forEach(item => {
        const a = item.payload.toJSON() as Professor

        if (item.key != null) {
          a["$key"] = item.key
        }
        this.Professors.push(a)
      })
    })
  }
  useCourseForm() {
    this.courseForm = this.fb.group({
      name: [ "", [ Validators.required, Validators.minLength(2) ] ],
      professor: [ "" ],
    })
  }
  get name() {
    return this.courseForm.get("name")
  }
  get professor() {
    return this.courseForm.get("professor")
  }

  ResetForm() {
    this.courseForm.reset()
  }

  goBack() {
    this.location.back()
  }

  submitCourseData() {
    this.courseApi.AddCourse(this.courseForm.value, this.courseForm.value.professor)
    this.toastr.success(
      this.courseForm.controls["name"].value + " successfully added!",
    )
    this.ResetForm()
  }
}
