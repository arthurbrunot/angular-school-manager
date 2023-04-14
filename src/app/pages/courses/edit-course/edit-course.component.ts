import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { CourseService } from "../../../shared/services/crud/course.service"
import { ActivatedRoute, Router } from "@angular/router"
import { Location } from "@angular/common"
import { ToastrService } from "ngx-toastr"
import { Professor } from "../../../shared/services/crud/types"
import { ProfessorService } from "../../../shared/services/crud/professor.service"
@Component({
  selector: "app-edit-course",
  templateUrl: "./edit-course.component.html",
})
export class EditCourseComponent implements OnInit {
  editForm: FormGroup
  Professors: Professor[]
  courseId: string
  constructor(
    private courseApi: CourseService,
    private professorApi: ProfessorService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {}
  ngOnInit() {
    this.updateCourseData()
    const id = this.actRoute.snapshot.paramMap.get("id")
    this.courseId = id as string
    this.courseApi
      .GetCourse(id)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue({ name: data.name, professor: data.professorId })
      })
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
  get name() {
    return this.editForm.get("name")
  }
  get professor() {
    return this.editForm.get("professor")
  }

  updateCourseData() {
    this.editForm = this.fb.group({
      name: [ "", [ Validators.required, Validators.minLength(2) ] ],
      professor: [ "" ],
    })
  }
  goBack() {
    this.location.back()
  }

  updateForm() {
    this.courseApi.UpdateCourse(this.editForm.value, this.courseId)
    this.toastr.success(
      this.editForm.controls["name"].value + " updated successfully",
    )
    this.router.navigate([ "view-courses" ])
  }
}
